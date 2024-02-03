import { v4 as generarIDs } from "uuid";

// Creamos el modelo del usuario nuevo registrado con un id unico, con la data que pasemos en los input y con el estado de su actividad
export const crearUsuario = (nombre, edad, dni, email, ubicacion) => {
    let nuevoUsuario = {
        id: generarIDs(),
        data: {nombre,
            edad, 
            dni, 
            email, 
            ubicacion},
        actividad: true
    }

    return nuevoUsuario;
}