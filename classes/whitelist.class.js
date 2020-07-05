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
            const embed = new MessageEmbed()
                .setTitle('Play Action - Whitelist')
                .setColor(0xEf2172)
                .setThumbnail('http://brasilplayaction.com.br/cdn/misc/player.jpg')
                .setDescription(`
                    Olá <@${this.message.author.id}> ! Tudo bem ?
                    
                    Primeiramente agradecemos o seu interesse em fazer parte da nossa cidade. Ficaremos muito felizes em ter você conosco.
                    
                    Para liberação do seu passaporte, pedimos que preencha algumas informações que serão solicitadas a seguir. 
                    
                    As perguntas relacionadas as regras da cidade são simples e objetivas, que nos ajudam a manter uma convivência saudável entre nossos moradores. Recomendamos que leia atentamente as regras do servidor antes mesmo de fazer a whitelist: http://brasilplayaction.com.br/index.php?/forum/34-rules-of-server/
                    
                    Qualquer dúvida estamos a disposição no Discord, onde será divulgado o resultado da sua solicitação de 
                    passaporte.
                    
                    Para pegar o ID, utilize nosso launcher: https://bit.ly/2Zv31go
                    
                    Tudo pronto, para começar digite:
                    
                    \`\`\`\iniciar\`\`\`\
        
                    Boa sorte!
                `)
            this.channel.send({
                content: `<@${this.message.author.id}>`,
                embed
            })
    
            this.client.on('message', message => {
                if(message.content === 'iniciar') {
                    embed.delete()
                    resolve()
                }
            })

            setTimeout(reject, config.startCooldown * 60000)
        })
    }

    async loopTroughQuestions() {
        try {
            await this.sendWelcomeMessage()
            
            for(let question of questions) {
                // const embed = 
                console.log(question)
            }

        } catch (err) {
            console.error(err)
            this.channel.delete()
            this.message.reply("você demorou mais de 1 minuto para responder a pergunta!")
            this.emit('finished', false)
        }
    }

    async reviewWhitelist() {
        console.log('[PA] REVIEWING WHITELIST AND DELETING CHANNEL')
        await this.channel.delete()
        this.emit('finished', {
            answers: this.answers,
            grade: this.grade
        })
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