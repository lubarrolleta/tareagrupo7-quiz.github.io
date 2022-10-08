let elQuestionScreen = document.getElementById("questionscreen");
let elScreenResult = document.getElementById("resultscreen");
// const data = require("./data");
import { data } from './tareagrupo7-quiz/data.js'
// import {} from './data.json';
// console.log(datos);
console.log(JSON.stringify(data));

// funciones
const variables = {
    newuser: null,
    prevRanking: [],
    userNamePrev: null,
    setUser: new GetUsers(),
    quiz: new Quiz(),
    form: {
        selectForm: document.querySelector(".formUser"),
        input: document.querySelector("#nameUser"),
    },
    btn: {
        selectBtn: document.querySelector("#welcome_btn"),
    },
    showRanking: document.querySelector(".quiz__btn__showRanking"),
    sectionRanking: document.querySelector('#respuestasUsers'),
    elWelcomeScr: document.getElementById("welcomescreen"),
    questions: []
};
const inicio = {
    init: function() {
        inicio.addQuestions()
        variables.form.selectForm.addEventListener(
            "submit",
            inicio.validaForm,
            false
        );
        variables.btn.selectBtn.addEventListener("click", inicio.validaForm, false);
        variables.showRanking.addEventListener("click", () => inicio.clickBtn('show'), false);

        inicio.showInit()

    },
    showInit: function() {
        variables.newuser = null
        variables.prevRanking = []
        variables.sectionRanking.textContent = "";

        // quiz.counter = 0;
        // quiz.indexCurrentQuestion = 0;
        if (variables.setUser.users.length === 0) {

            variables.showRanking.classList.add("hidden")
        } else {
            variables.showRanking.classList.remove("hidden")

            variables.showRanking.classList.add("show");
        }
    },
    validaForm: function(e) {
        // console.log(e);
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
                variables.elWelcomeScr.classList.add("hidden");

                elQuestionScreen.style.display = "block";

                variables.quiz.showCurrentQuestion();
                variables.form.input.value = ''
                variables.sectionRanking.textContent = "";


            }, 1000);
        }
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
                title.textContent = user.name
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

        }
        // variables.newuser.users.length === 0 &&
        //     variables.showRanking.classList.add("show");
        // let elWelcomeScr = document.getElementById("welcomescreen");
        // // elWelcomeScr.style.display = 'none'
        // elWelcomeScr.classList.add("hidden");

        // elQuestionScreen.style.display = "block";

        // quiz.showCurrentQuestion();
    },
    addQuestions: function() {
        data.forEach((answer) => {
            console.log(answer);
            const question = new Question(answer.title, answer.answers, answer.correctAnswer)
            variables.quiz.addQuestion(question)
        })
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

            this.questions[this.indexCurrentQuestion].getElement();
        }

    };
}

function Question(title, answers, correctAnswer) {
    this.title = title;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
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
        let questionNumber = document.createElement("h2");
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
            elAnswer.id = index + 1;
            elAnswer.addEventListener("click", this.checkAnswer, false);
            questionAnswers.append(elAnswer);
        });

        elQuestionScreen.append(questionAnswers);
    };

    this.checkAnswer = (event, title = this.title) => {
        let anwserSelected = event.target;
        if (this.isCorrectAnswer(anwserSelected.id)) {
            anwserSelected.classList.add("answer--correct");
            variables.quiz.counter++;
        } else {
            anwserSelected.classList.add("answer--wrong");
            let elCorrectAnswer = document.getElementById(this.correctAnswer);
            elCorrectAnswer.classList.add("answer--correct");
        }

        setTimeout(() => {
            elQuestionScreen.textContent = "";
            console.log('conteo beefor ', variables.quiz.indexCurrentQuestion);

            variables.quiz.indexCurrentQuestion += 1;
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