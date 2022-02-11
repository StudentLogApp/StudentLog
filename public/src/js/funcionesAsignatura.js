"use strict";

//Importamos los datos de conexión de firebase.
import { app } from "./datosFirebase.js";

//Importamos algunas funciones de firebase.
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const d = document;

//Conexión a la base de datos.
const db = getFirestore(app);

//Colección de las listas de FireBase.
const asignaturasColeccion = collection(db, "asignaturas");

//Función que nos permitirá guardar la asignaturas en firestore.
export const guardarAsignatura = async (asignatura) => {
  console.log("guardando asignatura");
  const asignaturaGuardada = await addDoc(asignaturasColeccion, asignatura);
};
