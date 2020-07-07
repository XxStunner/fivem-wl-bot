const Game = require('../classes/game.class')

module.exports = (member) => {
    const dbConnection = Game.getDatabaseConnection()
    
    dbConnection.query(`SELECT * FROM vrp_user_ids WHERE identifier = "discord:${member.id}"`, function(err, results) {
        if(err) {
            throw Error(err)
        }

        if(results.length) {
            console.log(`[PA] REMOVING PLAYER WHITELIST FROM ID: ${results[0].user_id}`)
            dbConnection.query(`UPDATE vrp_users SET whitelisted = 0 WHERE id = ${results[0].user_id}`)
        }
    })
}