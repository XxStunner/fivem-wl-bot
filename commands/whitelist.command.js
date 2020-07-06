const Whitelist = require('../classes/whitelist.class')
const config = require('../config/whitelist.config')

const usersCooldown = {}
const whitelists = {}

module.exports = ({ client, message }) => {
	if(typeof whitelists[message.author.id] === 'undefined') {
		console.log(`[PA] CREATING NEW CHANNEL FOR DISCORD: ${message.author.username}`)
		const whitelist = new Whitelist({
			message,
			client
		})
		
		whitelist.on('finished', (data) => {
			console.log(data) // @todo: log data into mongodb.
			delete whitelists[message.author.id]
		})
		
		whitelists[message.author.id] = whitelist
	} else {
		message.reply("você só pode fazer uma whitelist por vez!")
	}
	message.delete()
}