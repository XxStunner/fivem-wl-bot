const gameConfig = require('../config/game.config')
const mysql = require('mysql')

module.exports = class Game {
    static getDatabaseConnection() {
        return mysql.createConnection(gameConfig.mysql)
    }
}