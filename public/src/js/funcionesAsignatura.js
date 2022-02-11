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
const asignaturasColeccion = collection(db, "asignaturas");

export const guardarCurso = async (asignatura) => {
  const asignaturaGuardada = await addDoc(asignaturasColeccion, asignatura);
};
