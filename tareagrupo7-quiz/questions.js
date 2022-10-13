export let questions = [{
        title: "¿Cómo evaluarías tu nivel de satisfacción con la empresa?",
        condiciones: [{
                title: "Muy satisfecho",
                condition: null //lleva al index de la pregunta
            },

            {
                title: "Satisfecho",
                condition: null //lleva al index de la pregunta

            },
            {
                title: "Ni satisfecho ni insatisfecho",
                condition: null //lleva al index de la pregunta

            },
            {
                title: "Insatisfecho",
                condition: 1 //lleva al index de la pregunta

            },
            {
                title: "Muy insatisfecho",
                condition: 1 //lleva al index de la pregunta

            },

        ],
        isCondition: false
    }, {
        title: "¿Qué motivo o motivos le han llevado a cancelar el servicio?",
        condiciones: [{
                title: "La atención al cliente no ha cubierto mis expectativas",
                condition: null //lleva al index de la pregunta
            },
            {
                title: "La facilidad de uso del servicio no ha cubierto mis expectativas",
                condition: null //lleva al index de la pregunta

            },
            {
                title: "He encontrado otra alternativa que cubre mejor mis necesidades",
                condition: null //lleva al index de la pregunta
            },
            {
                title: " La calidad del servicio no ha cubierto mis expectativas",
                condition: null //lleva al index de la pregunta

            },
            {
                title: "Ya no necesito el servicio",
                condition: null //lleva al index de la pregunta

            }, {
                title: "El precio es muy elevado para mi presupuesto",
                condition: 0 //lleva al index de la pregunta

            },

        ],
        isCondition: true
    },
    {
        title: "¿Cuánto tiempo llevas utilizando los productos/servicios de la empresa?",
        condiciones: [{
                title: "Menos de un mes",
                condition: null //lleva al index de la pregunta
            },
            {
                title: "Entre 1 y 3 meses",
                condition: null //lleva al index de la pregunta

            },
            {
                title: "Entre 3 y 6 meses",
                condition: null //lleva al index de la pregunta
            },
            {
                title: "Entre 6 meses y un año",
                condition: null //lleva al index de la pregunta

            },
            {
                title: "Más de un año",
                condition: null //lleva al index de la pregunta

            },

        ],
        isCondition: false
    },
    {
        title: "¿Cuáles son los tipos de fallas que tienen nuestros productos que te han provocado una mala experiencia?",
        condiciones: [{
                title: "Defectos de fábrica",
                condition: null //lleva al index de la pregunta
            },
            {
                title: "Cajas vienen abiertas",
                condition: null //lleva al index de la pregunta

            },
            {
                title: "Productos usados",
                condition: null //lleva al index de la pregunta
            },
            {
                title: "Se dañan rápido",
                condition: null //lleva al index de la pregunta

            },


        ],
        isCondition: false
    }
]