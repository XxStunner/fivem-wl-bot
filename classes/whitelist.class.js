const questions = require('../config/questions.config')
const config = require('../config/whitelist.config')
const { MessageEmbed } = require('discord.js')

module.exports = class Whitelist {
    events = {}
    answers = []
    grade = 0

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
                
                ${config.welcomeMessage}
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
    
                this.channel.send(embed)
    
                this.answers[i] = await this.getQuestionResponse(question)
            }

            this.reviewWhitelist()
        } catch (err) {
            console.error(err)
            this.channel.delete()
            this.message.reply("você demorou mais de 1 minuto para responder a pergunta!")
            this.emit('finished', false)
        }
    }

    getQuestionResponse(question) {
        return new Promise((resolve, reject) => {
            const readMessage = message => {
                if(message.content) {
                    // if(question.type === 'number') {

                    // } 
                    
                    this.channel.bulkDelete(99)
                    this.client.removeListener('message', readMessage)
                    resolve({ answer: message.content })
                } 
            }
    
            this.client.on('message', readMessage)

            setTimeout(reject, question.timer * 60000)
        })
    }

    async reviewWhitelist() {
        console.log('[PA] REVIEWING WHITELIST AND DELETING CHANNEL')
        await this.channel.delete()
        this.emit('finished', {
            answers: this.answers,
            grade: this.grade
        })
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