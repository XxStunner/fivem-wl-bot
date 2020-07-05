module.exports = [
    {
        title: 'Nome completo:',
        type: 'string',
        limit: 40,
    },
    {
        title: 'Idade:',
        type: 'number',
        limit: 2,
        minimum: 15
    },
    {
        title: 'Possui microfone ?',
        type: 'string',
        answers: [
            {
                title: 'Sim',
                correct: true
            },
            {
                title: 'Não'
            }
        ]
    },
]