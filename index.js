/**
 * Load .env
 */
const Discord = require("discord.js")
const client = new Discord.Client()
const leaveEvent = require('./events/leave.event')
const config = require('./config/whitelist.config')

const commands = {
	'wm': require('./commands/welcome.command'),
	'whitelist': require('./commands/whitelist.command')
}

client.on("ready", () => {
    console.log(`[PA] BOT ONLINE WITH NAME: ${client.user.tag}!`)
})

client.on("message", message => {
	const channel = message.guild.channels.cache.find(channel => channel.name === config.workChannel)
	if(channel && channel.id === message.channel.id && message.author.id !== client.user.id) { 
        const content = message.content 
        if(content.charAt(0) === "!") {
            const command = content.substr(1).toLowerCase()
            if(typeof commands[command] === 'function') {
                commands[command]({ message, client })
            } 
        }
        message.delete()
    }
})

client.on("guildMemberRemove", (member) => {
    leaveEvent(member)
})
client.login("NTE2MjkwNTQ1MDczNTIwNjYw.XwDy0Q.EdkLTuSSJDFlwnHgFj2V9M_ubWY")