import htmlElements from "./elements/html.elements.js";
import userManager from "./managers/user.managers.js";

//Ejecutamos la funcionalidad general de la aplicacion
export const app = () => {
    console.log("Ejecutando aplicacion usuarios");
    htmlElements.formUser.onsubmit = (event) => {
        event.preventDefault ();
        userManager.agregarUsuario();
    }

    userManager.mostrarUsuario(userManager.usuarios);

}