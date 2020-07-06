module.exports = [
    {
        title: 'Nome completo:',
        limit: 40,
        timer: 1
    },
    {
        title: 'Idade:',
        type: 'number',
        limit: 2,
        minimum: 15,
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
]