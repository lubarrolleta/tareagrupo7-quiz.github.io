export let questions = [{
        title: "titulo pregunta 1",
        condiciones: [{
                title: 'opcion 1',
                condition: 2 //lleva al index de la pregunta
            },
            {
                title: 'opcion 2',
                condition: null //lleva al index de la pregunta

            },

        ],
        isCondition: false
    }, {
        title: "titulo pregunta 2",
        condiciones: [{
                title: 'opcion 1',
                condition: null //lleva al index de la pregunta
            },
            {
                title: 'opcion 2',
                condition: null //lleva al index de la pregunta

            },

        ],
        isCondition: false
    },
    {
        title: "titulo pregunta 3 CONDICION",
        condiciones: [{
                title: 'opcion 1',
                condition: null //lleva al index de la pregunta
            },
            {
                title: 'opcion 2',
                condition: null //lleva al index de la pregunta

            },

        ],
        isCondition: true
    }
]