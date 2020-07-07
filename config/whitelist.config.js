module.exports = {
    minimumGrade: 8.5,
    maximumTime: 5,
    maximumTries: 2,
    cooldown: 480,
    startCooldown: 1,
    serverName: 'Play Action',
    serverIcon: 'http://brasilplayaction.com.br/cdn/misc/player.jpg',
    embedColor: 0xEf2172,
    messages: {
        welcome: `
            Primeiramente agradecemos o seu interesse em fazer parte da nossa cidade. Ficaremos muito felizes em ter você conosco.
                        
            Para liberação do seu passaporte, pedimos que preencha algumas informações que serão solicitadas a seguir. 
            
            As perguntas relacionadas as regras da cidade são simples e objetivas, que nos ajudam a manter uma convivência saudável entre nossos moradores. Recomendamos que leia atentamente as regras do servidor antes mesmo de fazer a whitelist: http://brasilplayaction.com.br/index.php?/forum/34-rules-of-server/
            
            Qualquer dúvida estamos a disposição no Discord, onde será divulgado o resultado da sua solicitação de 
            passaporte.
            
            Para pegar o ID, utilize nosso launcher: https://bit.ly/2Zv31go.
            
            Tudo pronto, para começar digite:
            
            \`\`\`\iniciar\`\`\`\

            Boa sorte!
        `,
        success: `
            Para entrar, baixe nosso launcher: https://bit.ly/2Zv31go.

            Caso você tenha alguma dúvida, sinta-se livre para utilizar o canal de dúvidas e abuse do /ajuda in-game.

            Aproveitando, conheça nosso fórum e siga-nos em nossas redes sociais:

            - Fórum: http://brasilplayaction.com.br/
            - Facebook: https://www.facebook.com/playactionrp
            - Instagram: http://instagram.com/playactionrp
            - Youtube: https://www.youtube.com/channel/UCa-buRqBUqgphVEV0GvUoVg
        `,
        failure: `
            Leia nossas regras nos canais de regras.
        `,
        idNotFound: `
            ID não encontrado no servidor!
        `
    },
    roles: {
        whitelisted: "Civil",
        unwhitelisted: "Em espera"
    },
    successChannel: 'aprovado',
    failureChannel: 'recusado',
    databaseTable: 'vrp_users',
    databaseColumn: 'whitelisted',
    workChannel: 'whitelist'
}