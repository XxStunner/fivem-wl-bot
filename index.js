const Discord = require("discord.js")
const client = new Discord.Client()

const commands = {
	'wm': require('./commands/welcome')
}

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
	const message = msg.content;
	if(message.charAt(0) === "!") {
		const command = message.substr(1);
		if(typeof commands[command] === 'function') {
			commands[command](msg)
		}
	}
})

client.login("NTE2MjkwNTQ1MDczNTIwNjYw.XwDy0Q.EdkLTuSSJDFlwnHgFj2V9M_ubWY")