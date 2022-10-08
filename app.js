let elQuestionScreen = document.getElementById("questionscreen");
let elScreenResult = document.getElementById("resultscreen");
// funciones
const variables = {
    newuser: null,
    prevRanking: [],
    userNamePrev: null,
    setUser: new GetUsers(),
    form: {
        selectForm: document.querySelector(".formUser"),
        input: document.querySelector("#nameUser"),
    },
    btn: {
        selectBtn: document.querySelector("#welcome_btn"),
    },
    showRanking: document.querySelector(".quiz__btn__showRanking"),
    elWelcomeScr: document.getElementById("welcomescreen"),
    questions: []
};
const inicio = {
    init: function() {
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

                quiz.showCurrentQuestion();
                variables.form.input.value = ''

            }, 1000);
        }
    },
    clickBtn: function(action) {

        console.log(action);
        console.log(variables.setUser.users);
        // variables.newuser.users.length === 0 &&
        //     variables.showRanking.classList.add("show");
        // let elWelcomeScr = document.getElementById("welcomescreen");
        // // elWelcomeScr.style.display = 'none'
        // elWelcomeScr.classList.add("hidden");

        // elQuestionScreen.style.display = "block";

        // quiz.showCurrentQuestion();
    },
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
        if (this.indexCurrentQuestion < this.questions.length) {
            this.questions[this.indexCurrentQuestion].getElement();
        } else {
            elQuestionScreen.classList.add("hidden");

            let elCorrectAnswers = document.querySelector("#correctAnswers");
            elCorrectAnswers.innerHTML = quiz.counter;

            // elScreenResult.classList.add('block')
            elScreenResult.style.display = "block";
            // console.log(variables.prevRanking)
            variables.newuser = new SetUser(variables.userNamePrev, variables.prevRanking, quiz.counter);
            variables.setUser.addUsers(variables.newuser)
                // console.log(variables.newuser)
            variables.newuser = null
            variables.prevRanking = []
            quiz.counter = 0;
            quiz.indexCurrentQuestion = 0;
            // console.log(variables.newuser)
            setTimeout(() => {
                elScreenResult.style.display = "none";
                variables.elWelcomeScr.classList.remove("hidden");
                inicio.showInit()

            }, 1000)



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
        questionNumber.textContent = `Pregunta ${(quiz.indexCurrentQuestion + 1)}/${quiz.questions.length}`;
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
            quiz.counter++;
        } else {
            anwserSelected.classList.add("answer--wrong");
            let elCorrectAnswer = document.getElementById(this.correctAnswer);
            elCorrectAnswer.classList.add("answer--correct");
        }

        setTimeout(() => {
            elQuestionScreen.textContent = "";
            quiz.indexCurrentQuestion++;
            quiz.showCurrentQuestion();
            let prevDataUser = {
                titleAnswers: title,
                Answer: parseInt(anwserSelected.id),
                correctAnswer: this.correctAnswer,
                isCorrect: parseInt(anwserSelected.id) === this.correctAnswer ? true : false,
                // counter: this.counter
            }
            variables.prevRanking.push(prevDataUser)
                // console.log('VARIABLES', variables.prevRanking);
        }, 1000);
    };
}

let question1 = new Question(
    "What is the only thing that computers understand?", ["Machine Code", "High Level Languages", "Low Level Languages", "Algorithms"],
    1
);
let question2 = new Question(
    "A list of instructions that enable a computer to perform a specific task is a...", ["Computer Program", "Machine Code", "Algorithm", "Binary Code"],
    3
);
let question3 = new Question(
    "Before a computer can understand a program it must be...", [
        "Translated into its machine code",
        "Translated into a low level language",
        "Translated into a high level language",
    ],
    1
);
let question4 = new Question("Pregunta 4", ["op1", "op2"], 1);

let quiz = new Quiz();
quiz.addQuestion(question1);
quiz.addQuestion(question2);
quiz.addQuestion(question3);
quiz.addQuestion(question4);
// quiz.launch()
console.log(quiz.questions)
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
    elnumberofquestions.textContent = quiz.questions.length;
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