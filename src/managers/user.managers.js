import { crearUsuario } from "../models/usuario.model.js";
import htmlElements from "../elements/html.elements.js";
import { crearBoton } from "../elements/boton.element.js";
import Swal from "sweetalert2";

//Creamos las funcionalidades de la aplicacion

//Parseamos los usuarios nuevos registrados en el local storage
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [] ;

//Llamamos a una API mediante el metodo fetch para usar sus fotos para cada usuario registrado
fetch("https://rickandmortyapi.com/api/character/")
    .then((resp) => resp.json())
    .then((data) => console.log(data.results))

const mostrarUsuario = (usuarios) => {
    htmlElements.userContenedor.innerHTML = "";
    
    //Creamos una tarjeta por cada usuario nuevo registrado
    usuarios.forEach((usuario) => {
        let card = document.createElement("div");
        card.className = "card-user";
        card.innerHTML = `<img class="foto-usuario" src= ${usuario.imagen}<img/>`;
        
        //Creamos un contenedor para los textos dentro de la tarjeta
        let textoContenedor = document.createElement("div");
        textoContenedor.className = "contenedor-texto";
        textoContenedor.innerHTML = `
        <p class="texto-usuario">${usuario.data.nombre}</p>
        <p class="texto-usuario">${usuario.data.edad}</p>
        <p class="texto-usuario">${usuario.data.dni}</p>
        <p class="texto-usuario">${usuario.data.email}</p>
        <p class="texto-usuario">${usuario.data.ubicacion}<p>
        `;
        
        card.appendChild(textoContenedor)

        //Creeamos un contenedor del boton eliminar dentro de la tarjeta
        let btnContenedor = document.createElement("div");
        btnContenedor.className = "contenedor-boton";
        
        card.appendChild(btnContenedor);
        
        //Creamos un boton para eliminar usuarios dentro del contenedor de boton
        let btnEliminar = crearBoton("Eliminar", "boton-eliminar");
        //Agregamos un evento de click de elimar el usuario al boton de eliminar
        btnEliminar.onclick = () => eliminarUsuario(usuario.id);
        //Agregamos el boton de eliminar al boton de contenedor
        btnContenedor.appendChild(btnEliminar);
        
        //Agregamos la tarjeta en general de los usuarios al div contenedor del index html
        htmlElements.userContenedor.appendChild(card);
    });
};

const agregarUsuario = () => {
    //Creamos una variable donde se utiliza la funcionalidad de crear un usuario que pasamos por parametro los value de los input
    let userNuevo = crearUsuario(
        htmlElements.nombreUser.value, 
        htmlElements.edadUser.value, 
        htmlElements.dniUser.value,
        htmlElements.emailUser.value,
        htmlElements.ubicacionUser.value
    );
    //Agregamos a el array vacio de usuarios la variable inicializada de arriba y lo guardamos en el local storage
    usuarios.push(userNuevo);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    console.log(usuarios);
    
    mostrarUsuario(usuarios);    
};

const cambiarEstadoUsuario = (idUser) => {
        //Nos detecta la posicion de cada usuario
        let index = usuarios.findIndex((user)=> user.id === idUser);
        
        //Con la variable inicializada de arriba, le cambiamos el estado de actividad al usuario
        usuarios[index].actividad = !usuarios[index].actividad;
        
        //Guardamos el usuario en el local storage con el nuevo estado de actividad
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        mostrarUsuario(usuarios);
};

const eliminarUsuario = (idUser) => {
    //Agregamos un alert para eliminar un usuario
    Swal.fire({
        icon: "error",
        title: "¿Estas seguro que deseas eliminar este usuario?",
        showConfirmButton: true,
        confirmButtonColor: "green",
        confirmButtonText: "Si",
        showCancelButton: true,
        cancelButtonColor: "red",
        cancelButtonText: "No"
    //Tomamos la respuesta si es confirmada
    }) .then((resp) => {
        if (resp.isConfirmed) {
            //Con el metodo filter nos genera un array con los id que no coincidan 
            usuarios = usuarios.filter((user) => user.id !== idUser);
            
            //Modificamos el local storage con los usuarios eliminados
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            
            //Confirmamos la eliminacion del usuario
            Swal.fire({
                icon: "success",
                title: "Usuario eliminado con exito",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 1500
            })

            mostrarUsuario(usuarios);
        }
    })
};

export default {
    usuarios,
    mostrarUsuario,
    agregarUsuario,
    cambiarEstadoUsuario,
    eliminarUsuario
};