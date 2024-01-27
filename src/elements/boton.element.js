//Creamos la funcionalidad de crear botones html con texto y estilo que pasemos por parametro
export const crearBoton = (texto, estilos) => {
    let boton = document.createElement("button");
    boton.innerText = texto;
    boton.className = estilos

    return boton;
}