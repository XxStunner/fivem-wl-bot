const { MessageEmbed } = require('discord.js')

module.exports = ({ message }) => {
    const embed = new MessageEmbed()
        .setTitle('Play Action - Whitelist')
        .setColor(0xEf2172)
        .setThumbnail('http://brasilplayaction.com.br/cdn/misc/player.jpg')
        .setDescription(`
            Olá !
            Tudo bem ?
            
            Para realizar whitelist em nosso servidor, digite: 

            \`\`\`\!whitelist\`\`\`\

            E aguarde as instruções do BOT.
        `)
    message.channel.send(embed)
}