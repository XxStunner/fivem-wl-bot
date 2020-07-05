module.exports = [
    {
        title: 'Nome completo:',
        type: 'string',
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
        type: 'multiple',
        answers: [
            {
                title: 'Sim',
                correct: true
            },
            {
                title: 'Não'
            }
        ],
        timer: 1
    },
]