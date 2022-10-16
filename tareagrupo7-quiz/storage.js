export function setStorageUser(user, data, isTerminado) {
    const dataUser = getStorageUser()
        // console.log(Boolean(dataUser))
    let respuestasUser = []
    if (!dataUser) {

        localStorage.setItem('USER', JSON.stringify({ nameUser: user, status: isTerminado, respuestas: [] }))
        console.log('CONDICION1')
    } else {
        // respuestasUser.push(data)
        //const data = 
        //console.log(datos)
        console.log(JSON.parse(dataUser)?.respuestas, 'ANTES');
        JSON.parse(dataUser)?.respuestas?.push(data)
        console.log(JSON.parse(dataUser)?.respuestas, 'DESPUES');
        const datos = JSON.parse(dataUser)?.respuestas
	console.log(datos,'nuevos datos')
        localStorage.setItem('USER', JSON.stringify({ nameUser: user, status: isTerminado, respuestas: data }))
        console.log('CONDICION 2')

    }

}
export function getStorageUser() {
    return localStorage.getItem('USER')
}
// SETEA USERS EN LOCAL STORAGE
export function setStorageUsers(users) {
    const dataUsers = getStorageUsers()
    localStorage.setItem('USERS', JSON.stringify(users))


}
export function getStorageUsers() {
    return localStorage.getItem('USERS')
}
// sesion storage

export function setSesionUser() {
    const dataUser = getStorageUser()
    console.log(dataUser);

    // const sesion = 
    sessionStorage.setItem('USER', dataUser)
        // return sesion
}
export function getSesionUser() {
    return sessionStorage.getItem('USER')
}