export function addCuestionario(data, cuestionario) {
    // console.log(cuestionario)
    cuestionario = new AddQuestion()
        // console.log(cuestionario);
    data.forEach((answer) => {
            // console.log(answer)
            const preguntas = new SetPreguntas(answer.title, answer.condiciones, answer.isCondition)
            cuestionario.addPreguntas(preguntas)
        })
        // console.log(cuestionario.preguntas);
    return cuestionario

    function AddQuestion() {

        this.preguntas = []
        this.addPreguntas = function(pregunta) {
            this.preguntas.push(pregunta)
        }
    }

    function SetPreguntas(title, condiciones, isCondition) {
        this.title = title
        this.condiciones = condiciones
        this.isCondition = isCondition
    }
}


export function GetUsers() {
    this.users = []
    this.addUsers = function(user) {
        this.users.push(user)
    }
}
export function SetUser(name, respuestas) {
    this.nameUser = name
    this.respuestas = respuestas
}