/**
 * Load .env
 */
const Discord = require("discord.js")
const client = new Discord.Client()
const leaveEvent = require('./events/leave.event')

const commands = {
	// 'wm': require('./commands/welcome.command'),
	'whitelist': require('./commands/whitelist.command')
}
client.on("ready", () => {
    console.log(`[PA] BOT ONLINE WITH NAME: ${client.user.tag}!`)
})

client.on("message", message => {
    const content = message.content
    if(content.charAt(0) === "!") {
        const command = content.substr(1).toLowerCase()
        if(typeof commands[command] === 'function') {
            commands[command]({ message, client })
        } 
    }
})

client.on("guildMemberRemove", (member) => {
    leaveEvent(member)
})
client.login("NTE2MjkwNTQ1MDczNTIwNjYw.XwDy0Q.EdkLTuSSJDFlwnHgFj2V9M_ubWY")