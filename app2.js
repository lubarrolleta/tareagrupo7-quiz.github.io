import { addCuestionario, GetUsers, SetUser } from "./tareagrupo7-quiz/addCuestionario.js"
import { questions } from "./tareagrupo7-quiz/questions.js"
import { getSesionUser, getStorageUser, getStorageUsers, setSesionUser, setStorageUser, setStorageUsers } from "./tareagrupo7-quiz/storage.js"
const variables = {
    cuestionario: null,
    preguntaActual: 0,
    preguntaPrevia: null,
    namePrev: null,
    dataUserPrev: JSON.parse(getStorageUser())?.respuestas || [],
    users: new GetUsers(),
    app: {
        main: document.querySelector('.main'),
        form: null,
        input: null,
        sectionResultados: null,
        sectionPreguntas: null,
        btns: {
            btnInit: null,
            btnShowResults: null,
            goInit: null,
            showResultados: null,

        }

    }


}
export const metodos = {
    init: function() {
        variables.cuestionario = addCuestionario(questions, variables.cuestionario)
        console.log(variables.cuestionario)
        this.renderInit()
        this.showIsTrue()
            // lleno el array users con lo almacenado en el localStorage
        JSON.parse(getStorageUsers())?.users?.forEach((user) => {
                console.log(user, 'user✅✅');
                variables.users.addUsers(user)
            })
            // defino eventos
        variables.app.form.addEventListener('submit', this.validaForm, false)
        variables.app.btns.goInit.addEventListener('click', () => metodos.clickBtn('init'), false)
        variables.app.btns.btnShowResults.addEventListener('click', () => metodos.clickBtn('show'), false)
        variables.app.btns.showResultados.addEventListener('click', () => metodos.clickBtn('show'), false)

    },
    inicializa: function() {
        console.log('FIN👊')
        variables.app.sectionPreguntas.textContent = ''
        variables.app.sectionPreguntas.classList.replace('show', 'hidden')

        variables.preguntaActual = 0

        variables.cuestionario = addCuestionario(questions, variables.cuestionario)
        const user = new SetUser(variables.namePrev, variables.dataUserPrev)
            // GUARDA EN EL LOCAL_STORAGE TODO Y EL STATUS
        variables.users.addUsers(user)
        setStorageUser(variables.namePrev, user.respuestas, true)
            // GUARDA EL USER EN LA LISTA DE USERS
        setStorageUsers(variables.users)
            // GUARDA ENE L SESION STORAGE
        setSesionUser()
        metodos.renderResultadosPrevios(user)
            // metodos.renderResultados(user)
        variables.namePrev = null
        variables.dataUserPrev = []
        variables.app.btns.btnShowResults.setAttribute('class', variables.users.users.length === 0 ? 'btn hidden' : 'btn show')
        variables.app.form.appendChild(variables.app.btns.btnShowResults)
        console.log(variables.users.users)


    },
    renderInit: () => {
        // variables. = document.createElement('section')
        variables.app.form = document.createElement('form')
        variables.app.main.appendChild(variables.app.form)
        variables.app.form.setAttribute('class', 'main__section__form show')
        variables.app.form.setAttribute('name', 'form')

        variables.app.input = `<input type="text" class="main__section__form__input" autocomplete="off" name="username"/>`
        variables.app.btns.btnInit = `<button type="submit" class="main__section__form__btn btn">init</button>`
        variables.app.btns.btnShowResults = document.createElement('button')
        variables.app.btns.btnShowResults.textContent = 'ver otros resultados'
        variables.app.btns.btnShowResults.classList.add('btn')
        variables.app.title = `<h1 class='title'>bienvenido a la encuesta de verificacion</h1>`
        variables.app.sub_title = `<h2 class='subtitle'> son ${variables.cuestionario.preguntas.length} preguntas condicionales</h2>`
        variables.app.form.innerHTML = variables.app.title + variables.app.sub_title + variables.app.input + variables.app.btns.btnInit
        variables.app.sectionResultados = document.createElement('section')
        variables.app.sectionResultados.setAttribute('class', 'main__section__resultados hidden')
        variables.app.main.appendChild(variables.app.sectionResultados)
        variables.app.sectionPreguntas = document.createElement('section')
        variables.app.sectionPreguntas.setAttribute('class', 'main__section__preguntas hidden')
        variables.app.main.appendChild(variables.app.sectionPreguntas)

        // CREANDO BOTONES
        variables.app.btns.goInit = document.createElement('button')
        variables.app.btns.goInit.setAttribute('class', ' btn')
        variables.app.btns.goInit.textContent = 'ir al inicio'
        variables.app.btns.showResultados = document.createElement('button')
        variables.app.btns.showResultados.setAttribute('class', 'btn')
        variables.app.btns.showResultados.textContent = 'ver resultados de otros usuarios'
            // CRENADO SECTION DE RESULADOS PREVIOS
        variables.app.sectionResultPrevios = document.createElement('section')
        variables.app.sectionResultPrevios.setAttribute('class', 'main__section__resultadosprevios hidden')
        variables.app.main.appendChild(variables.app.sectionResultPrevios)
    },
    showIsTrue: function() {
	//setStorageUser(null,[],false)
        const dataUser = JSON.parse(getSesionUser()) || JSON.parse(getStorageUser())
        console.log(dataUser)
        if (dataUser !== null && dataUser?.status) {
            this.clickBtn('showUser')
        } else {
            // this.clickBtn('init')
            console.log('USER existe')
            if (dataUser !== null && dataUser?.respuestas?.length !== 0) {
                console.log(dataUser?.respuestas?.length)
                variables.namePrev = dataUser?.nameUser
                    // if()
                variables.preguntaActual = dataUser?.respuestas?.indexOf(dataUser?.respuestas?.at(-1))
                variables.preguntaActual++
                    variables.app.form.classList.replace('show', 'hidden')
                variables.app.sectionPreguntas.classList.replace('hidden', 'show')
                    //console.log(dataUser?.respuestas[dataUser?.respuestas?.indexOf(dataUser?.respuestas?.at(-1))])
                    //console.log(dataUser?.respuestas ? .indexOf(dataUser ? .respuestas ? .at(-1)))
                this.renderPreguntas()
            } else {
                console.log(document.form.username)
                console.log(dataUser?.respuestas?.length)
                document.form.username.value = dataUser?.nameUser || ''
            }
        }

    },
    validaForm: (e) => {
        e.preventDefault()
            // console.log(e.target.querySelector('input'));
        if (e.target.querySelector('input').value !== '') {
		 if(JSON.parse(getStorageUsers())?.users.some(user => user.nameUser === e.target.querySelector('input').value)){
                metodos.clickBtn('showUser')
            }else{

            
            variables.namePrev = e.target.querySelector('input').value
            console.log(variables.namePrev)
            variables.app.form.classList.replace('show', 'hidden')
            variables.app.sectionPreguntas.classList.replace('hidden', 'show')
            e.target.querySelector('input').value = ''
            setStorageUser(variables.namePrev, [], false)
            metodos.renderPreguntas()
                // console.log(variables.preguntaActual);
}
        }
    },
    renderPreguntas: () => {
        // if(variables.cuestionario.preguntas[variables.preguntaActual].isCondition !== true){

        // }
        console.log(variables.preguntaActual);
        console.log(variables.cuestionario.preguntas[variables.preguntaActual]);

        if ((variables.preguntaActual !== variables.cuestionario.preguntas.length)) {

            // variables.preguntaActual
            if (variables.cuestionario.preguntas[variables.preguntaActual].isCondition === false) {

                metodos.renderOpciones()
            } else {
                variables.preguntaActual++
                    metodos.renderOpciones()

            }




        } else {
            metodos.inicializa()
        }
    },
    renderOpciones: () => {
        console.log(variables.cuestionario.preguntas[variables.preguntaActual].title)
        const title = document.createElement('h1')
        title.innerHTML = variables.cuestionario.preguntas[variables.preguntaActual].title
        const container_title = document.createElement('div')
        const card = document.createElement('article')
        card.appendChild(container_title)
        container_title.appendChild(title)
        container_title.classList.add('container__title')
        const lista = document.createElement('ul')
        lista.classList.add('choices-container')
        variables.cuestionario.preguntas[variables.preguntaActual].condiciones.forEach((answer, i) => {
            const pregunta = document.createElement("li")
            pregunta.classList.add('pregunta')
            const opcion = document.createElement('span')
            opcion.classList.add('choice-prefix')
            pregunta.id = i
            pregunta.addEventListener('click', (e) => metodos.clickPregunta(e, title.textContent), false)
            pregunta.textContent = answer.title
            lista.appendChild(pregunta)
            pregunta.appendChild(opcion)
        })
        card.appendChild(lista)
        variables.app.sectionPreguntas.replaceChildren(card)
    },
    clickPregunta: function(e, title) {
        let pregunta = e.target
        console.log(pregunta);
        const prevDataUser = {
            titlePregunta: title,
            respuestaUser: pregunta.textContent
        }
        variables.dataUserPrev.push(prevDataUser)
            // SETSTORAGE
	console.log(JSON.parse(getStorageUser()))
        setStorageUser(variables.namePrev, variables.dataUserPrev, false)
        console.log(variables.dataUserPrev);
        if (variables.cuestionario.preguntas[variables.preguntaActual].condiciones[parseInt(pregunta.id)].condition !== null) {
            console.log('NO ES NULL ✅');

            variables.preguntaPrevia = variables.preguntaActual
            variables.preguntaActual = variables.cuestionario.preguntas[variables.preguntaActual].condiciones[parseInt(pregunta.id)].condition //midifica el indice
            variables.cuestionario.preguntas[variables.preguntaActual].isCondition = false
            variables.cuestionario.preguntas[variables.preguntaActual].custom = true
            console.log(variables.preguntaPrevia)
            metodos.renderPreguntas()
        } else {
            if (variables.cuestionario.preguntas[variables.preguntaActual].custom) {
                console.log('CUSTOM🔴')
                    // variables.cuestionario.preguntas[variables.preguntaPrevia].isCondition = true
                variables.cuestionario.preguntas[variables.preguntaActual].isCondition = true

                variables.preguntaActual = variables.preguntaPrevia
                variables.preguntaActual++
                    metodos.renderPreguntas()


            } else {

                console.log('ES NULL❌')
                console.log(variables.preguntaActual)
                variables.preguntaActual++
                    metodos.renderPreguntas()
            }

        }
    },
    renderResultados: function(user) {
        console.log(user);
        const title = document.createElement('h2')
            // title.textContent = variables.users.users.length === 1 ? `tus respuestas ${user.nameUser}` : 'respuestas de otros usuarios'
        title.textContent = `tus respuestas ${user.nameUser}`
        const contenedorResult = document.createElement('div')
        contenedorResult.classList.add('div')

        variables.app.sectionResultados.appendChild(title)
            // variables.app.sectionResultados.appendChild(variables.users.users.length === 1 ? variables.app.btns.goInit : variables.app.btns.showResultados)
        variables.app.sectionResultados.appendChild(variables.app.btns.goInit)
        contenedorResult.appendChild(metodos.renderResultadosUser(user))
        variables.app.sectionResultados.appendChild(contenedorResult)
            // variables.app.sectionResultados.appendChild(title)
            // variables.app.btns.goInit.

    },
    renderResultadosUser: function(user) {
        const card = document.createElement('article')
        card.classList.add('cardUser')
            // variables.users.users.forEach((user) => {
        const titleUser = document.createElement("h3")
        titleUser.textContent = user.nameUser
        titleUser.classList.add('title')
        card.appendChild(titleUser)
        user.respuestas.forEach((answer) => {
                const cardPregunta = document.createElement('div')
                cardPregunta.classList.add('cardPregunta')
                const titlePregunta = document.createElement("h2")
                titlePregunta.innerHTML = `<span class='titlePregunta'>pregunta: </span>${answer.titlePregunta}`
                cardPregunta.appendChild(titlePregunta)
                const respuestaUser = document.createElement("h3")
                respuestaUser.innerHTML = `<span class='respuestaUser'>respuesta: </span>${answer.respuestaUser}`
                cardPregunta.appendChild(respuestaUser)
                card.appendChild(cardPregunta)

                // })
            })
            // card.appendChild()
        return card

    },
    renderResultadosPrevios: function(user) {
        if (user) {
            variables.app.sectionResultPrevios.classList.replace('hidden', 'show')
            variables.app.sectionResultPrevios.appendChild(variables.users.users.length === 1 ? variables.app.btns.goInit : variables.app.btns.showResultados)
            variables.app.sectionResultPrevios.appendChild(metodos.renderResultadosUser(user))

        }
    },
    clickBtn: function(action) {
        console.log(action);
        if (action === 'init') {
            variables.app.sectionResultPrevios.textContent = ''
            variables.app.sectionResultados.textContent = ''
            variables.app.sectionResultPrevios.classList.replace('show', 'hidden')
            variables.app.sectionResultados.classList.replace('show', 'hidden')

            variables.app.form.classList.replace('hidden', 'show')
        }
        if (action === 'show') {
            variables.app.sectionResultados.classList.replace('hidden', 'show')
            variables.app.form.classList.replace('show', 'hidden')
            variables.app.sectionResultPrevios.classList.replace('show', 'hidden')
            variables.app.sectionResultPrevios.textContent = ''
            const title = document.createElement('h2')
            title.textContent = 'respuestas de otros usuarios'
            variables.app.sectionResultados.appendChild(title)
            variables.app.sectionResultados.appendChild(variables.app.btns.goInit)
                // console.log(JSON.parse(getStorageUsers()));
            variables.users.users.length === 0 ? JSON.parse(getStorageUsers())?.users?.forEach((user) => {
                    variables.app.sectionResultados.appendChild(metodos.renderResultadosUser(user))

                }) :
                variables.users.users.forEach((user) => {
                    variables.app.sectionResultados.appendChild(metodos.renderResultadosUser(user))

                })

        }
        if (action === 'showUser') {
            // variables.app.sectionResultados.classList.replace('hidden', 'show')
            variables.app.form.classList.replace('show', 'hidden')
                // variables.app.sectionResultPrevios.classList.replace('show', 'hidden')
                // variables.app.sectionResultPrevios.textContent = ''
            const title = document.createElement('h2')
            title.textContent = 'Tus respuestas'
            variables.app.sectionResultPrevios.appendChild(title)
                // variables.app.sectionResultados.appendChild(variables.app.btns.goInit)
            this.renderResultadosPrevios(JSON.parse(getSesionUser()))
                // console.log(JSON.parse(getStorageUsers()));
                // variables.users.users.length === 0 ? JSON.parse(getStorageUsers())?.users?.forEach((user) => {
                //     variables.app.sectionResultados.appendChild(metodos.renderResultadosUser(user))

            // }) : variables.users.users.forEach((user) => {
            //     variables.app.sectionResultados.appendChild(metodos.renderResultadosUser(user))

            // })
        }
    }
}
