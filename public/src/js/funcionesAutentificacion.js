"use strict";
//Importamos los datos de conexión de firebase.
import { autentificacion } from "./datosFirebase.js";

//Importamos algunas funciones de firebase.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

//Importamos algunas funciónes de usuarios.
import { guardarUsuario } from "./funcionesUsuario.js";

const d = document;

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
        console.log("Introduce un correo de usuario.")
      } else {
        console.log("Introduce un contraseña de usuario.")
      }
    });
};

export const iniciarSesion = (usuario, contra) => {
  //Iniciamos sesión con los datos que tiene guardados la autentificación.
  signInWithEmailAndPassword(autentificacion, usuario, contra)
    .then((credenciales) => { 
      //Pasamos la id al home por url para cargar los datos del usuario.
      window.location.href = './home.html?id=' + credenciales.user.uid;
    })
    //En el caso de que no exista el usuario, se realizarán estas acciones.
    .catch((error) => {
      console.log("No se ha iniciado sesión");
    });
};

export const cerrarSesion = () => {
  autentificacion
    .signOut()
    .then(() => {
      console.log("Se ha cerrado la conexión correctamente.");
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};
