"use strict";
//Importamos los datos de conexión de firebase.
import { autentificacion } from "./datosFirebase.js";

//Importamos algunas funciones de firebase.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

//Importamos algunas funciónes de usuarios.
import { guardarUsuario } from "./funcionesUsuario.js";

import { alert } from "./funcionesPlantillas.js";

const d = document;

//Función que usaremos para crear un usuario.
export const crearUsuario = (datos) => {
  //Creamos el usuario en la autentificación con los datos requeridos.
  createUserWithEmailAndPassword(autentificacion, datos.correo, datos.contra)
    .then((credenciales) => {
      //Asignamos la id de la autentificación a la id de usuario que guardaremos en firestore.
      datos.id = credenciales.user.uid;

      //Guardaremos el usuario creado en firestore.
      guardarUsuario(datos);
    })
    .catch((error) => {
      console.log(error);
      if (error.message == "Firebase: Error (auth/invalid-email).") {
        //Mostramos un aviso del error de la acción al intentar registrarse.
       alert(
         "Error, has introducido un correo repetido",
         "danger"
       );
       } else {
         //Mostramos un aviso del error de la acción al intentar registrarse.
       alert(
         "Error, has introducido una contraseña invalida",
         "danger"
       );
       }
    });
};

//Función que usaremos para iniciar sesión en la página.
export const iniciarSesion = (usuario, contra) => {
  //Iniciamos sesión con los datos que tiene guardados la autentificación.
  signInWithEmailAndPassword(autentificacion, usuario, contra)
    .then((credenciales) => {
      //Pasamos la id al home por url para cargar los datos del usuario.
      window.location.href = './home.html?id=' + credenciales.user.uid;
    })
    //En el caso de que no exista el usuario, no iniciará sesión.
    .catch((error) => {
      alert(
        "Error, no has introducido datos válidos.",
        "danger"
      );
      console.log("No se ha iniciado sesión");
    });
};

//Función que usaremos para cerrar sesión.
export const cerrarSesion = () => {
  autentificacion
    .signOut()
    .then(() => {
      console.log("Se ha cerrado la conexión correctamente.");
      location.href = '/';
    })
    .catch((error) => {
      console.log(error);
    });
};
