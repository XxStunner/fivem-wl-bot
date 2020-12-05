module.exports = [
    {
        title: 'Nome completo (vida real):',
        limit: 40,
        timer: 1
    },
    {
        title: 'Idade (vida real): ',
        type: 'number',
        limit: 2,
        minimum: 13,
        timer: 1
    },
    {
        title: 'Possui microfone ?',
        answers: [
            {
                title: 'Sim',
                reaction: '👍',
                correct: true
            },
            {
                title: 'Não',
                reaction: '👎',
            }
        ],
        timer: 1
    },
    {
        title: 'Horário mais ativo ?',
        answers: [
            {
                title: 'Manhã',
                reaction: '1️⃣',
                correct: true
            },
            {
                title: 'Tarde',
                reaction: '2️⃣',
                correct: true
            },
            {
                title: 'Noite',
                reaction: '3️⃣',
                correct: true
            },
        ],
        timer: 1
    },
    {
        title: 'Frequência de jogo:',
        answers: [
            {
                title: '1 - 2 horas',
                reaction: '1️⃣',
                correct: true
            },
            {
                title: '3 - 5 horas',
                reaction: '2️⃣',
                correct: true
            },
            {
                title: '6 - 8 horas',
                reaction: '3️⃣',
                correct: true
            },
            {
                title: '8 horas +',
                reaction: '4️⃣',
                correct: true
            },
        ],
        timer: 1
    },
    {
        title: 'Como conheceu o servidor:',
        answers: [
            {
                title: 'Lista de servidores FiveM',
                reaction: '1️⃣',
                correct: true
            },
            {
                title: 'Amigos',
                reaction: '2️⃣',
                correct: true
            },
            {
                title: 'Facebook',
                reaction: '3️⃣',
                correct: true
            },
            {
                title: 'Discord',
                reaction: '4️⃣',
                correct: true
            },
            {
                title: 'Youtube',
                reaction: '5️⃣',
                correct: true
            },
            {
                title: 'Twitch',
                reaction: '6️⃣',
                correct: true
            },
            {
                title: 'Instagram',
                reaction: '7️⃣',
                correct: true
            },
        ],
        timer: 1
    },
    {
        title: 'Qual plataforma você comprou seu jogo ?',
        answers: [
            {
                title: 'Steam',
                reaction: '1️⃣',
                correct: true
            },
            {
                title: 'Epic Store',
                reaction: '2️⃣',
                correct: true
            },
            {
                title: 'Rockstar Club',
                reaction: '3️⃣',
                correct: true
            },
        ],
        timer: 1
    },
    {
        title: 'ID (in-game):',
        type: 'id',
        timer: 1
    },
    {
        title: 'Nome completo (personagem):',
        limit: 40,
        type: 'username',
        timer: 1
    },
    {
        title: 'Idade (personagem):',
        type: 'number',
        limit: 2,
        minimum: 15,
        timer: 1
    },
    {
        title: 'Qual organização deseja participar:',
        answers: [
            {
                title: 'L.S.P.D.',
                reaction: '1️⃣',
                correct: true
            },
            {
                title: 'L.S.M.C.',
                reaction: '2️⃣',
                correct: true
            },
            {
                title: 'Gangues',
                reaction: '3️⃣',
                correct: true
            },
            {
                title: 'Máfias',
                reaction: '4️⃣',
                correct: true
            },
            {
                title: 'San News',
                reaction: '5️⃣',
                correct: true
            },
            {
                title: 'Mecânicos',
                reaction: '6️⃣',
                correct: true
            },
            {
                title: 'Civil',
                reaction: '7️⃣',
                correct: true
            },
        ],
        timer: 1
    },
    {
        title: 'Em quais situações o atropelamento NÃO é considerado Anti-RP?',
        answers: [
            {
                title: 'Quando está sendo assaltado e atropela o assaltante.',
                reaction: '1️⃣',
            },
            {
                title: 'Quando atropela alguém por diversão.',
                reaction: '2️⃣',
            },
            {
                title: 'Quando a vítima pede para que você faça isso.',
                reaction: '3️⃣',
            },
            {
                title: 'Se for por acidente, sem a intenção de atropelar.',
                reaction: '4️⃣',
                correct: true
            },
            {
                title: 'Quando atropela um americano (NPC).',
                reaction: '5️⃣',
            },
        ],
        timer: 1
    },
    {
        title: 'Dentro dessas opções, qual delas MELHOR define o que é RDM?',
        answers: [
            {
                title: 'Matar um membro de outra gangue.',
                reaction: '1️⃣',
            },
            {
                title: 'Matar sem motivo aparente.',
                correct: true,
                reaction: '2️⃣',
            },
            {
                title: 'Matar usando armas brancas.',
                reaction: '3️⃣',
            },
            {
                title: 'Matar durante um assalto.',
                reaction: '4️⃣',
            },
            {
                title: 'Matar um americano (NPC).',
                reaction: '5️⃣',
            },
        ],
        timer: 1
    },
    {
        title: 'Dentro dessas situações, qual delas possuem informações que PODEM ser utilizadas dentro do RP?',
        answers: [
            {
                title: 'Fórum do Play Action.',
                reaction: '1️⃣',
            },
            {
                title: 'Assistindo um vídeo no YouTube da cidade.',
                reaction: '2️⃣',
            },
            {
                title: 'Aba de noticias da cidade no Discord (San News).',
                correct: true,
                reaction: '3️⃣',
            },
            {
                title: 'Saber a profissão de alguém ao olhar no Discord.',
                reaction: '4️⃣',
            },
            {
                title: 'Assistindo a live de alguém que está na cidade.',
                reaction: '5️⃣',
            },
        ],
        timer: 1
    },
    {
        title: 'Dentro dessas situações, qual delas NÃO ocorre POWERGAMING?',
        answers: [
            {
                title: 'Ficar pulando com uma bmx com o intuito de andar mais rápido.',
                reaction: '1️⃣',
            },
            {
                title: 'Jogar o carro de um local alto e continuar dirigindo.',
                reaction: '2️⃣',
            },
            {
                title: 'Escalar uma montanha sem veículo ou equipamento necessário.',
                reaction: '3️⃣',
            },
            {
                title: 'Dirigir em uma estrada de terra com um veiculo Off-road.',
                correct: true,
                reaction: '4️⃣',
            },
            {
                title: 'Pegar um item do porta-malas do carro que está atrás de uma parede.',
                reaction: '5️⃣',
            },
        ],
        timer: 1
    },
    {
        title: 'Marque todas as safes zones do servidor:',
        answers: [
            {
                title: 'Delegacia, hospital e praça do lago.',
                correct: true,
                reaction: '1️⃣',
            },
            {
                title: 'Praça do centro, delegacia e hospital.',
                reaction: '2️⃣',
            },
            {
                title: 'Concessionaria, praça do centro e oficina.',
                reaction: '3️⃣',
            },
            {
                title: 'Hospital, praça do centro e praça do lago.',
                reaction: '4️⃣',
            },
            {
                title: 'Delegacia, hospital e concessionaria.',
                reaction: '5️⃣',
            },
        ],
        timer: 1
    },
    {
        title: 'Você compreende que qualquer tipo de preconceito contra etnia, gênero, religião, atributos físicos, classe social, diferenças linguísticas ou de cultura é repudiado dentro da comunidade Play Action é que será cabível de banimento?',
        answers: [
            {
                title: 'Sim',
                reaction: '👍',
                correct: true
            },
            {
                title: 'Não',
                reaction: '👎',
            }
        ],
        timer: 1
    },
]