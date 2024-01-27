//Llamamos a todos los input desde el html y los declaramos en una variable para su uso posterior
let formUser = document.querySelector("#form-user");
let nombreUser = document.querySelector("#nombre-user");
let edadUser = document.querySelector("#edad-user");
let ubicacionUser = document.querySelector("#ubicacion-user");
let generoUser = document.querySelector("#genero-user");
let dniUser = document.querySelector("#dni-user"); 
let celUser = document.querySelector("#cel-user");
let emailUser = document.querySelector("#email-user");
let userContenedor = document.querySelector(".user-contenedor");

export default {
    formUser,
    nombreUser,
    edadUser,
    ubicacionUser,
    generoUser,
    dniUser,
    celUser,
    emailUser,
    userContenedor
}