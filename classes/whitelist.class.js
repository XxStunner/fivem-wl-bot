const questions = require('../config/questions.config')
const config = require('../config/whitelist.config')
const { MessageEmbed } = require('discord.js')
const Game = require('../classes/game.class')

module.exports = class Whitelist {
    events = {}
    answers = []

    constructor({ client, message }) {
        this.client = client
        this.message = message
        this.init()
    }

    async init() {
        await this.createChannel()
        await this.loopTroughQuestions()
    }

    async createChannel() {
        try {
            this.channel = await this.message.guild.channels.create(`📋│whitelist-${this.message.author.id}`, {
                type: "text",
                parent: this.message.channel.parentID,
                permissionOverwrites: [
                    {
                        id: this.message.guild.roles.everyone,
                        deny: 'VIEW_CHANNEL'
                    }, 
                    {
                        id: this.client.user,
                        allow: 'VIEW_CHANNEL'
                    }, 
                    {
                        id: this.message.author,
                        allow: 'VIEW_CHANNEL'
                    }
                ]
            })
        } catch (err) {
            throw Error(err)
        }
    }

    sendWelcomeMessage() {
        return new Promise((resolve, reject) => {
            const embed = this.getEmbed().setDescription(`
                Olá <@${this.message.author.id}> ! Tudo bem ?
                
                ${config.messages.welcome}
            `)

            this.channel.send({
                content: `<@${this.message.author.id}>`,
                embed
            })

            const readMessage = message => {
                if(message.content === 'iniciar') {
                    this.channel.bulkDelete(99)
                    this.client.removeListener('message', readMessage)
                    resolve()
                } 
            }
    
            this.client.on('message', readMessage)

            setTimeout(reject, config.startCooldown * 60000)
        })
    }

    async loopTroughQuestions() {
        try {
            await this.sendWelcomeMessage()
            
            for(let i = 0; i < questions.length; i++) {
                const question = questions[i]
                
                const embed = this.getEmbed().setDescription(`
                    ${config.serverName}
    
                    ${question.title}

                    Você tem ${question.timer} minutos para responder essa pergunta.
                `)
    
                const embedMessage = await this.channel.send(embed)

                if(question.answers) {
                    await Promise.all(question.answers.map(answer => embedMessage.react(answer.reaction)))
                }

                this.answers[i] = await (question.answers ? this.getReactionQuestionAnswer(question, embedMessage) : this.getTextQuestionAnswer(question))
            }

            this.reviewWhitelist()
        } catch (err) {
            console.error(err)
            this.channel.delete()
            this.message.reply("você demorou mais de 1 minuto para responder a pergunta!")
            this.emit('finished', false)
        }
    }

    /**
     * @todo improve this code to make it dynamic
     */
    getTextQuestionAnswer(question) {
        return new Promise((resolve, reject) => {
            const readMessage = message => {
                if(message.content) {
                    this.channel.bulkDelete(99)
                    this.client.removeListener('message', readMessage)
                    let valid = true
                    
                    if(question.type === 'number') {
                        const reg = new RegExp(/^\d+$/)
                        valid = reg.test(message.content)
                    }

                    resolve({ 
                        answer: message.content,
                        correct: true,
                        question,
                        valid
                    })
                } 
            }
    
            this.client.on('message', readMessage)

            setTimeout(reject, question.timer * 60000)
        })
    }

    getReactionQuestionAnswer(question, message) {
        return new Promise(resolve => {
            const timer = question.timer * 60000
            const reactionsFilter = (reaction, user) => question.answers.map(answer => answer.reaction).includes(reaction.emoji.name) && user.id === this.message.author.id
            message.awaitReactions(reactionsFilter, { max: 1, time: timer, errors: ['time'] })
                .then(collected => {
                    this.channel.bulkDelete(99)
                    const reaction = collected.first()
                    resolve({ 
                        ...question.answers.find(answer => answer.reaction === reaction.emoji.name),
                        question,
                        valid: true 
                    })
                })
                .catch(() => {
                    resolve({ 
                        question,
                        valid: false 
                    })
                })
        })
    }

    async reviewWhitelist() {
        console.log('[PA] REVIEWING WHITELIST')
        this.grade = await this.getUserGrade()
        this.passedWhitelist = this.grade > config.minimumGrade

        if(this.passedWhitelist) {
            this.sendSuccessMessage()
            if(config.roles.whitelisted) {
                this.addRoleToUser(config.roles.whitelisted)
                this.setGameWhitelist(this.answers.find(answer => answer.question.type === 'id').answer, 1)
            }
        } else {
            this.sendFailureMessage()
            if(config.roles.unwhitelisted) {
                this.addRoleToUser(config.roles.unwhitelisted)
            }
        }
        
        console.log('[PA] REMOVING WHITELIST')
        await this.channel.delete()
        this.emit('finished', {
            answers: this.answers,
            grade: this.grade,
            passed: this.passedWhitelist
        })
    }

    addRoleToUser(roleName) {
        const role = this.message.guild.roles.cache.find(role => role.name === roleName)
        if(role) {
            return this.message.member.roles.add(role)
        }
    }

    setGameWhitelist(userId, whitelisted) {
        return new Promise((resolve, reject) => {
            const dbConnection = Game.getDatabaseConnection()
            dbConnection.query(`UPDATE ${config.databaseTable} SET ${config.databaseColumn} = ${whitelisted} WHERE id = ${userId}`, (err, results) => {
                if(err) {
                    return reject(err)
                }

                return resolve(results)
            })
        })
    }

    async sendSuccessMessage() {
        const channel = this.message.guild.channels.cache.find(channel => channel.name === config.successChannel)
        if(!channel) {
            throw Error('Success channel not found!')
        }

        const embed = await this.getEmbed()
            .setDescription(`
                Bem-Vindo a nossa cidade <@${this.message.author.id}>!
                
                ${config.messages.success}
            `)

        channel.send(embed)
    }

    async sendFailureMessage() {
        const channel = this.client.guild.channels.cache.find(channel => channel.name === config.successChannel)
        if(!channel) {
            throw Error('Failure channel not found!')
        }

        const embed = await this.getEmbed()
            .setDescription(`
                Você foi reprovado em nossa whitelist <@${this.message.author.id}>!
                
                Nota: ${this.grade.toFixed()} / Mínimo: ${config.minimumGrade}

                ${config.messages.failure}

                **Você só pode realizar a whitelist ${config.maximumTries} vezes cada ${config.cooldown / 60} horas!
            `)

        channel.send(embed)
    }

    async getUserGrade() {
        const correctAnswers = this.answers.filter(answer => answer.correct)
        return Math.round(questions.length / correctAnswers.length * 10)
    }

    getEmbed() {
        return new MessageEmbed()
            .setTitle(`${config.serverName} - Whitelist`)
            .setColor(config.embedColor)
            .setThumbnail(config.serverIcon)
    }

    on(eventName, eventMethod) {
        if(typeof this.events[eventName] === 'undefined') {
            this.events[eventName] = []
        }
        this.events[eventName].push(eventMethod)
    }

    emit(eventName, data) {
        if(Array.isArray(this.events[eventName])) {
            this.events[eventName].forEach(eventMethod => eventMethod(data))
        }
    }
}