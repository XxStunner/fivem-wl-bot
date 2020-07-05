const Discord = require("discord.js")
const client = new Discord.Client()

const commands = {
	'wm': require('./commands/welcome.command'),
	'whitelist': require('./commands/whitelist.command')
}

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", message => {
	const content = message.content;
	if(content.charAt(0) === "!") {
		const command = content.substr(1);
		if(typeof commands[command] === 'function') {
			commands[command]({ message, client })
		} else {
			message.reply("comando não encontrado!")
		}
	}
})

client.login("NTE2MjkwNTQ1MDczNTIwNjYw.XwDy0Q.EdkLTuSSJDFlwnHgFj2V9M_ubWY")