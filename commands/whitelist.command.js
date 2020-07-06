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
		
		whitelist.on('finished', (whitelist) => {
			delete whitelists[message.author.id]
			const data = {
				whitelist,
				date: new Date
			}

			console.log(data) // @todo: log data into mongodb.
			
			if(!data.passed) {

				if(typeof usersCooldown[message.author.id] === 'undefined') {
					usersCooldown[message.author.id] = [data]
					return
				}

				usersCooldown[message.author.id].push(data)
			}
		})
		
		whitelists[message.author.id] = whitelist
	} else {
		message.reply("você só pode fazer uma whitelist por vez!")
	}

	message.delete()
}