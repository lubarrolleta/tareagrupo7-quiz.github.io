let elQuestionScreen = document.getElementById("questionscreen");
let elScreenResult = document.getElementById("resultscreen");
// const data = require("./data");
import { data } from './tareagrupo7-quiz/data.js'
// import {} from './data.json';
// console.log(datos);
// console.log(JSON.stringify(data));

// funciones
const variables = {
    newuser: null,
    prevRanking: [],
    userNamePrev: null,
    setUser: new GetUsers(),
    quiz: null,
    isCondition: false,
    currentQuestion: 0,
    main: document.querySelector('main.quiz'),
    titles: {
        pregunta: 'preguntas',
        respuestas: 'respuestas',
        titleEncuesta: 'encuesta de atencion al cliente',
        subTitle: `son ${this?.quiz.questions.length}`
    },
    form: {
        selectForm: null,
        input: null,
    },
    btn: {
        botonShowMoreResults: null,
        botonShowInit: null,
        selectBtn: null,
    },
    sectionResultadosUser: null,
    encuesta: null,
    showRanking: document.querySelector(".quiz__btn__showRanking"),
    sectionRanking: document.querySelector('#respuestasUsers'),
    elWelcomeScr: null,
    QuestionScreen: document.getElementById("questionscreen"),
    questions: []
};
const inicio = {
    init: function() {
        inicio.addQuestions()
        inicio.renderInit()
        variables.form.selectForm.addEventListener(
            "submit",
            (e) =>
            inicio.validaForm(e),
            false
        );
        // variables.btn.selectBtn.addEventListener("click", inicio.validaForm, false);
        // variables.showRanking.addEventListener("click", () => inicio.clickBtn('show'), false);
        variables.btn.botonShowMoreResults.addEventListener('click', () => { inicio.clickBtn('more') }, false)
        variables.btn.botonShowInit.addEventListener('click', () => inicio.clickBtn('inicio'), false)
        inicio.showInit()

    },
    showInit: function() {
        variables.newuser = null
        variables.prevRanking = []
        variables.sectionRanking.textContent = "";
        variables.currentQuestion = 0
        variables.quiz = null
        inicio.addQuestions()
        variables.setUser.users.length !== 0 && variables.elWelcomeScr.appendChild(variables.btn.botonShowMoreResults)

        // quiz.counter = 0;
        // quiz.indexCurrentQuestion = 0;
        if (variables.setUser.users.length === 0) {

            // variables.showRanking.classList.add("hidden")
        } else {
            // variables.showRanking.classList.remove("hidden")

            // variables.showRanking.classList.add("show");
        }
    },
    validaForm: function(e) {
        console.log(e);
        e.preventDefault();
        if (variables.form.input.value !== "") {
            // console.log(variables.form.input.value);
            // variables.newuser = new SetUser(variables.form.input.value);
            variables.userNamePrev = variables.form.input.value
            console.log(variables.userNamePrev);
            // let getUser = new GetUsers()
            // getUser.addUsers(user)

            // variables.setUser.addUsers(variables.newuser);
            setTimeout(() => {
                console.log(variables.setUser.users);
                // console.log(variables.newuser.users);

                // elWelcomeScr.style.display = 'none'
                variables.elWelcomeScr.classList.replace('show', 'hidden');
                // variables.elWelcomeScr.textContent = ''
                // elQuestionScreen.style.display = "block";

                // variables.quiz.showCurrentQuestion();
                inicio.renderEncuesta()
                variables.form.input.value = ''
                    // variables.sectionRanking.textContent = "";


            }, 1000);
        }
    },
    resultUsers: function(user, parent) {
        if (user) {
            const { answers, name, idUsers } = user

            const cardUser = document.createElement('article')
            cardUser.classList.add('cardUser')
            const nameTitles = document.createElement('h3')
            nameTitles.textContent = name
            cardUser.append(nameTitles)
                // const 
            answers.forEach((answer) => {
                    const answers = document.createElement('section')
                    answers.classList.add('answers')
                    const titleAnswers = document.createElement('h4')
                    titleAnswers.innerHTML = `<span class='pregunta'>${variables.titles.pregunta}: </span>${answer.titleAnswers}`
                    answers.append(titleAnswers)
                    const responseUser = document.createElement('h4')
                    responseUser.textContent = answer.Answer
                    responseUser.innerHTML = `<span class='respuestas'>${variables.titles.respuestas}: </span>${answer.Answer}`

                    answers.append(responseUser)

                    cardUser.append(answers)
                })
                // result.append(cardUser)
            return cardUser

        }
    },
    renderInit: function() {
        console.log(variables.main);
        const welcomeScreen = document.createElement('section')
        welcomeScreen.setAttribute('class', 'welcomeScreen show')
        variables.elWelcomeScr = welcomeScreen
        const encuesta = document.createElement('section')
        encuesta.classList.add('encuesta')
        encuesta.classList.add('hidden')
        variables.encuesta = encuesta
            // creacion title de formulario 
        const titleEncuesta = document.createElement('h1')
        titleEncuesta.innerHTML = `${variables.titles.titleEncuesta}`
        welcomeScreen.appendChild(titleEncuesta)
            // creacion del suntitle
        const subTitle = document.createElement('h2')
        variables.titles.subTitle = `son ${variables.quiz.questions.length} preguntas`
        subTitle.textContent = variables.titles.subTitle
        welcomeScreen.appendChild(subTitle)
            // 
            // 
        const form = document.createElement('form')
        variables.form.selectForm = form
        form.classList.add('formUser')
            // creando la seccion de resultados
        const sectionResultadosUser = document.createElement('section')
        sectionResultadosUser.setAttribute('class', 'sectionResultadosUser hidden')
        variables.sectionResultadosUser = sectionResultadosUser
            // 👉creando el boton de ver mas entradas
        const botonShowMoreResults = document.createElement('button')
        botonShowMoreResults.textContent = 'show more results'
            // console.log(variables.setUser.users.length)
        botonShowMoreResults.classList.add('btn')
        const botonShowInit = document.createElement('button')
        botonShowInit.textContent = 'inicio'
        botonShowInit.classList.add('btn')

        // const botonGoInit = document.createElement('button')
        variables.btn.botonShowInit = botonShowInit
        variables.btn.botonShowMoreResults = botonShowMoreResults

        // creando el input
        const input = document.createElement('input')
        input.setAttribute('type', 'text')
        input.setAttribute('required', true)
        input.setAttribute('autocomplete', 'off')
        input.setAttribute('placeholder', 'username')
        input.id = 'nameUser'
        input.name = 'user'
        variables.form.input = input

        form.append(input)
        const botonWelcome = document.createElement('button')
        botonWelcome.setAttribute('type', 'submit')
        botonWelcome.setAttribute('class', 'quiz__btn')
        botonWelcome.id = 'welcome_btn'
        botonWelcome.textContent = 'ok'
        variables.btn.selectBtn = botonWelcome
        form.append(botonWelcome)
            // form.innerHTML = `<input type='text' id='nameUser' name='user' required placeholder='username' autocomplete='off'>
            // <button id="welcome_btn" class="quiz__btn" type="submit">Ok</button>`



        welcomeScreen.append(form)
        variables.main.replaceChildren(welcomeScreen)
        variables.main.appendChild(encuesta)
        variables.main.appendChild(sectionResultadosUser)


    },
    showResult: function(user) {
        console.log(user, 'USER');
        const result = document.createElement('section')
        result.classList.add('result')
        const title = document.createElement('h2')
        title.textContent = 'your resultados'
        result.append(title)

        // if (user) {
        //     const { answers, name, idUsers } = user

        //     const cardUser = document.createElement('article')
        //     const nameTitles = document.createElement('h3')
        //     nameTitles.textContent = name
        //     cardUser.append(nameTitles)
        //         // const 
        //     answers.forEach((answer) => {
        //         const answers = document.createElement('section')
        //         answers.classList.add('answers')
        //         const titleAnswers = document.createElement('h4')
        //         titleAnswers.textContent = answer.titleAnswers
        //         answers.append(titleAnswers)
        //         const responseUser = document.createElement('h4')
        //         responseUser.textContent = answer.Answer
        //         answers.append(responseUser)

        //         cardUser.append(answers)
        //     })

        // }
        result.append(inicio.resultUsers(user, result))
            // const botonShowMoreResults = document.createElement('button')
            // botonShowMoreResults.textContent = 'show more results'
            // console.log(variables.setUser.users.length)
            // const botonShowInit = document.createElement('button')
            // botonShowInit.textContent = 'inicio'
            //     // const botonGoInit = document.createElement('button')
            // variables.botonShowInit = botonShowInit
            // variables.botonShowMoreResults = botonShowMoreResults
        const botonShow = document.createElement('button')
        botonShow.textContent = 'ver mas resultados'
        botonShow.classList.add('btn')
            // variables.btn.botonShowMoreResults = botonShow
        botonShow.addEventListener('click', () => { inicio.clickBtn('more') }, false)
        console.log(variables.btn.botonShowMoreResults, variables.setUser.users.length);
        variables.setUser.users.length > 1 ? result.append(botonShow) : result.append(variables.btn.botonShowInit)
        result.append(variables.btn.botonShowMoreResults)
        return result

    },
    clickBtn: function(action) {

        console.log(action);
        console.log(variables.setUser.users);
        if (action === 'show') {
            // variables.showRanking
            variables.showRanking.classList.remove('show')
            variables.showRanking.classList.add('hidden')

            variables.sectionRanking.classList.replace("hidden", 'show');


            variables.setUser.users.map((user) => {
                const card = document.createElement('articles');
                card.classList.add('card')
                const title = document.createElement('h2')
                title.classList.add('title')
                title.innerHTML = `${user.name} <span class='counter'>${user.counter}</span>`
                card.appendChild(title)
                user.answers.map((answer, i) => {
                    const anwserTitle = document.createElement('h3')
                    anwserTitle.classList.add('anwserTitle')
                    const responseUser = document.createElement('h4')
                    responseUser.classList.add('responseUser')

                    anwserTitle.innerHTML = `<span class='span'>Question ${i+1} : </span> ${answer.titleAnswers}`
                    card.append(anwserTitle)
                    responseUser.textContent = 'Response: ' + answer.Answer
                    card.append(responseUser)
                })
                variables.sectionRanking.appendChild(card)

            })

        } else if (action === 'inicio') {
            // variables.main.replaceChildren()
            variables.encuesta.classList.replace('show', 'hidden')
            variables.elWelcomeScr.classList.replace('hidden', 'show')
                // inicio.renderInit()
            variables.sectionResultadosUser.classList.replace('show', 'hidden')
            variables.sectionResultadosUser.textContent = ''
                // inicio.showInit()
                // variables.quiz = null
                // inicio.addQuestions()

        } else if (action === 'more') {
            console.log('more')
            variables.sectionResultadosUser.classList.replace('hidden', 'show')
            const title = document.createElement('h2')
            title.textContent = 'all responses'
            variables.sectionResultadosUser.appendChild(title)
            variables.encuesta.textContent = ''
            variables.encuesta.classList.replace('show', 'hidden')
            variables.elWelcomeScr.classList.replace('show', 'hidden')
            variables.setUser.users.reverse().forEach((user) => {

                variables.sectionResultadosUser.append(inicio.resultUsers(user, null))
            })
            variables.sectionResultadosUser.appendChild(variables.btn.botonShowInit)
        }
        // variables.newuser.users.length === 0 &&
        //     variables.showRanking.classList.add("show");
        // let elWelcomeScr = document.getElementById("welcomescreen");
        // // elWelcomeScr.style.display = 'none'
        // elWelcomeScr.classList.add("hidden");

        // elQuestionScreen.style.display = "block";

        // quiz.showCurrentQuestion();
    },
    addEncuesta: function() {
        const cardQuestion = document.createElement("div");
        cardQuestion.classList.add('cardQuestion')
        const titleCardQuestion = document.createElement('h2');
        cardQuestion.appendChild(titleCardQuestion)

        console.log(variables.QuestionScreen)
        console.log(variables.currentQuestion);
        titleCardQuestion.textContent = variables.quiz.questions[variables.currentQuestion].title
        const lista = document.createElement('ul')
        lista.classList.add('lista')
        variables.quiz.questions[variables.currentQuestion].answers.forEach((answer, i) => {
            const condition = document.createElement('li')
            condition.textContent = answer
            condition.id = i
            condition.classList.add('item')
            condition.addEventListener('click', (event) => {
                console.log(event.target)
                let prevDataUser = {
                    titleAnswers: titleCardQuestion.textContent,
                    AnswerId: parseInt(event.target.id),
                    Answer: event.target.textContent,
                    // correctAnswer: this.correctAnswer,
                    // isCorrect: parseInt(anwserSelected.id) === this.correctAnswer ? true : false,
                    // counter: this.counter
                }
                variables.prevRanking.push(prevDataUser)
                console.log('VARIABLES', variables.prevRanking);
                if (variables.quiz.questions[variables.currentQuestion].correctAnswer && variables.quiz.questions[variables.currentQuestion].correctAnswer.includes(parseInt(event.target.id))) {
                    console.log('si');
                    // console.log(variables.quiz.questions[variables.currentQuestion].conditions)
                    variables.currentQuestion = variables.quiz.questions[variables.currentQuestion].conditions
                    variables.quiz.questions[variables.currentQuestion].conditions = true
                    console.log(variables.currentQuestion);
                    inicio.renderEncuesta()
                } else {
                    console.log('no')
                    variables.currentQuestion++
                        inicio.renderEncuesta()
                }
                // console.log('HOLA');
                // setTimeout(() => {}, )

            }, false)
            lista.append(condition)
                // variables.QuestionScreen.append(lista)
        })
        cardQuestion.appendChild(lista)
        return cardQuestion;
    },
    renderEncuesta: () => {


        // if (variables.quiz.questions[variables.currentQuestion].conditions === null) {
        //     variables.currentQuestion++
        //         inicio.renderEncuesta()

        // } else {
        //     console.log(variables.quiz.questions.length)
        //     if (variables.currentQuestion !== variables.quiz.questions.length) {
        //         variables.QuestionScreen.replaceChildren(inicio.addEncuesta())
        //     } else {
        //         console.log('final');

        //     }
        // }
        // 👉👉👉
        const encuesta = variables.encuesta
        variables.encuesta.classList.replace('hidden', 'show')

        // variables.encuesta.classList.add = 'block'

        if (variables.currentQuestion !== variables.quiz.questions.length) {
            // variables.QuestionScreen.replaceChildren(inicio.addEncuesta())
            encuesta.replaceChildren(inicio.addEncuesta())
            if (variables.quiz.questions[variables.currentQuestion].conditions === null) {
                variables.currentQuestion++
                    inicio.renderEncuesta()

            }
        } else {
            console.log('final', variables.prevRanking);
            variables.newuser = new SetUser(variables.userNamePrev, variables.prevRanking, null);
            variables.setUser.addUsers(variables.newuser)
            console.log(variables.newuser)
            encuesta.replaceChildren(inicio.showResult(variables.newuser))
            inicio.showInit()

            // variables.QuestionScreen.replaceChildren(inicio.showResult(variables.newuser))



        }

    },

    addQuestions: function() {
        // data.flatMap((a) => {
        //     console.log(a)
        // })
        variables.quiz = new Quiz()
        data.forEach((answer) => {
            const question = new Question(answer.title, answer.answers, answer.correctAnswer, answer.conditions)
            variables.quiz.addQuestion(question)
        })
        console.log(variables.quiz.questions, 'answer');
    }
};
inicio.init();

function SetUser(name, answers, counter) {
    this.name = name;
    this.idUsers = Math.random();
    this.answers = answers;
    this.counter = counter;
}

function GetUsers() {
    this.users = [];
    this.addUsers = function(user) {
        this.users.push(user);
    };
}

function Quiz() {
    this.questions = [];
    this.counter = 0;
    this.indexCurrentQuestion = 0;
    this.addQuestion = function(question) {
        this.questions.push(question);
    };
    this.showCurrentQuestion = function() {
        console.log(this.indexCurrentQuestion, this.questions.length)
        if (this.indexCurrentQuestion === (this.questions.length)) {

            elQuestionScreen.classList.add("hidden");

            let elCorrectAnswers = document.querySelector("#correctAnswers");
            elCorrectAnswers.innerHTML = variables.quiz.counter;

            // elScreenResult.classList.add('block')
            elScreenResult.style.display = "block";
            // console.log(variables.prevRanking)
            variables.newuser = new SetUser(variables.userNamePrev, variables.prevRanking, variables.quiz.counter);
            variables.setUser.addUsers(variables.newuser)
                // console.log(variables.newuser)

            // console.log(variables.newuser)
            setTimeout(() => {
                elScreenResult.style.display = "none";
                variables.elWelcomeScr.classList.remove("hidden");
                inicio.showInit()

                variables.quiz.counter = 0;
                variables.quiz.indexCurrentQuestion = 0;


            }, 1000)
        } else {
            // console.log(variables.isCondition)
            // console.log(this.questions[this.indexCurrentQuestion].conditions)
            // variables.isCondition ? this.questions[this.indexCurrentQuestion].getElement() : this.questions[this.indexCurrentQuestion].getElement();
            this.questions[this.indexCurrentQuestion].getElement();

        }

    };
}

function Question(title, answers, correctAnswer, conditions) {
    this.title = title;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
    this.conditions = conditions
    this.getBody = function() {
        let body = this.title.toUpperCase() + "\n";
        for (let i = 0; i < this.answers.length; i++) {
            body += i + 1 + ". " + this.answers[i] + "\n";
        }
        return body;
    };
    this.addAnswer = function(answer) {
        // this.answers[this.answers.length] = answer
        this.answers.push(answer);
    };
    this.isCorrectAnswer = function(userAnswer) {
        if (this.correctAnswer == userAnswer) return true;
        else return false;
    };
    this.getElement = function() {
        console.log(this.title);
        // if (this.conditions !== null) {

        // } else {
        if (this.correctAnswer) {

            let questionNumber = document.createElement("h2");
            questionNumber.textContent = `Pregunta ${(variables.quiz.indexCurrentQuestion + 1)}/${variables.quiz.questions.length}`;
            questionNumber.textContent = `Pregunta ${(variables.quiz.indexCurrentQuestion + 1)}/${variables.quiz.questions.length}`;
            elQuestionScreen.append(questionNumber);
            let questionTitle = document.createElement("h3");
            questionTitle.textContent = this.title;
            elQuestionScreen.append(questionTitle);

            let questionAnswers = document.createElement("ul");
            questionAnswers.classList.add("question__awswers");

            this.answers.forEach((answer, index) => {
                let elAnswer = document.createElement("li");
                elAnswer.classList.add("awswer");
                elAnswer.textContent = answer;
                elAnswer.id = index;
                elAnswer.addEventListener("click", this.checkAnswer, false);
                questionAnswers.append(elAnswer);
            });

            elQuestionScreen.append(questionAnswers);
        } else {
            // variables.quiz.indexCurrentQuestion += 1
            variables.quiz.showCurrentQuestion();

        }
        // } else {
        // }
        // }
    };

    this.checkAnswer = (event, title = this.title) => {
        let anwserSelected = event.target;
        // console.log(this.correctAnswer)
        // console.log(anwserSelected.id)

        // console.log(this.correctAnswer.includes(parseInt(anwserSelected.id)))
        let nextAnswer = false;
        if (this.correctAnswer !== null && this.correctAnswer.includes(parseInt(anwserSelected.id))) {
            // anwserSelected.classList.add("answer--correct");
            console.log('VARIABLES', );
            const array = [this.conditions]
            console.log(this.conditions);
            nextAnswer = true;
            // array[0].getElement()
            // this.conditions[0].this.getElement
            variables.isCondition = true;

            // variables.quiz.counter++;
        } else {
            nextAnswer = false
            variables.isCondition = false;

            // anwserSelected.classList.add("answer--wrong");
            // let elCorrectAnswer = document.getElementById(this.correctAnswer);
            // elCorrectAnswer.classList.add("answer--correct");
        }

        setTimeout(() => {
            elQuestionScreen.textContent = "";
            // console.log('conteo beefor ', variables.quiz.indexCurrentQuestion);
            console.log(variables.quiz.indexCurrentQuestion);
            // console.log('conteo after ', variables.quiz.indexCurrentQuestion);
            variables.isCondition ? variables.quiz.indexCurrentQuestion = this.conditions : variables.quiz.indexCurrentQuestion += 1;
            // variables.quiz.indexCurrentQuestion += 1
            console.log('conteo after ', variables.quiz.indexCurrentQuestion);

            variables.quiz.showCurrentQuestion();
            let prevDataUser = {
                titleAnswers: title,
                AnswerId: parseInt(anwserSelected.id),
                Answer: anwserSelected.textContent,
                correctAnswer: this.correctAnswer,
                isCorrect: parseInt(anwserSelected.id) === this.correctAnswer ? true : false,
                // counter: this.counter
            }
            variables.prevRanking.push(prevDataUser)
            console.log('VARIABLES', variables.prevRanking);
        }, 1000);
    };
}



// let quiz = new Quiz();
// quiz.addQuestion(question1);
// quiz.addQuestion(question2);
// quiz.addQuestion(question3);
// quiz.addQuestion(question4);
// quiz.launch()
console.log(variables.quiz.questions)
let users = new GetUsers();
// console.log(users);

// // let elCorrectAnswers = document.getElementById("correctAnswers")
// let elCorrectAnswers = document.querySelector("#correctAnswers")
// // console.log(elCorrectAnswers)
// // elCorrectAnswers.textContent = quiz.counter
// elCorrectAnswers.innerHTML = quiz.counter

// let elNumberOfQuestions = document.getElementsByClassName("numberOfQuestions")
let elNumberOfQuestions = document.querySelectorAll(".numberOfQuestions");
// for (let i=0; i<elNumberOfQuestions.length; i++) {
//     elNumberOfQuestions[i].textContent = quiz.questions.length
// }

elNumberOfQuestions.forEach(function(elnumberofquestions) {
    elnumberofquestions.textContent = variables.quiz.questions.length;
});

function seeFirstQuestion() {
    let elWelcomeScr = document.getElementById("welcomescreen");
    // elWelcomeScr.style.display = 'none'
    elWelcomeScr.classList.add("hidden");

    elQuestionScreen.style.display = "block";

    quiz.showCurrentQuestion();
}

let elWelcomeBtn = document.getElementById("welcome_btn");
// elWelcomeBtn.addEventListener("click", seeFirstQuestion)