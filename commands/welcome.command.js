const { MessageEmbed } = require('discord.js')

module.exports = ({ message }) => {
    const embed = new MessageEmbed()
        .setTitle('Play Action - Whitelist')
        .setColor(0xEf2172)
        .setThumbnail('http://brasilplayaction.com.br/cdn/misc/player.jpg')
        .setDescription(`
            Olá !
            Tudo bem ?
            
            Primeiramente agradecemos o seu interesse em fazer parte da nossa cidade. Ficaremos muito felizes em ter você conosco.
            
            Para liberação do seu passaporte, pedimos que preencha algumas informações que serão solicitadas a seguir. 
            
            As perguntas relacionadas as regras da cidade são simples e objetivas, que nos ajudam a manter uma convivência saudável entre nossos moradores. Recomendamos que leia atentamente as regras do servidor antes mesmo de fazer a whitelist: http://brasilplayaction.com.br/index.php?/forum/34-rules-of-server/
            
            Qualquer dúvida estamos a disposição no Discord, onde será divulgado o resultado da sua solicitação de 
            passaporte.
            
            Para pegar o ID, utilize nosso launcher: https://bit.ly/2Zv31go
            
            Tudo pronto, vamos começar ?

            Digite: 
            
            \`\`\`\!whitelist\`\`\`\

            Boa sorte!
        `)
    message.channel.send(embed)
}