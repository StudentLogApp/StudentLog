"use strict";
//Importamos los datos de conexión de firebase.
import { app } from "./datosFirebase.js";

//Importamos algunas funciones de firebase.
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const d = document;

//Conexión a la base de datos.
const db = getFirestore(app);

//Colección de las listas de FireBase.
const usuariosColeccion = collection(db, "usuarios");

//Función que guardará el usuario creado en la colección de firestore.
export const guardarUsuario = async (usuario) => {
  const usuarioGuardado = await addDoc(usuariosColeccion, usuario);
  console.log(`Usuario creado correctamente con id ${usuarioGuardado.id}. Inicia sesión para comenzar.`);
};

//Función que utilizaremos para encontrar el usuario.
export const encontrarUsuario = async (id) => {
  //Filtraremos el usuario que tenga la id de autentificación.
  const consulta = query(usuariosColeccion, where("id", "==", id));
  const usuarioFiltrado = await getDocs(consulta);
  usuarioFiltrado.docs.map((documento) => {
    const usuario = documento.data();
    console.log(`Sesión iniciado correctamente. Bienvenido ${usuario.nombre}.`);

    //Creamos las opciones de las listas, formularios y eventos.
    //crearListas(usuario);

    //Inicializamos la carga de las listas del usuario.
    //obtenerListas(usuario);

    //Inicializamos la carga de productos, según el rol.
    //obtenerProductos(usuario);
    return usuario;
  });
};