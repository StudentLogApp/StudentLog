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

import { plantillaPerfil } from "./funcionesPlantillas.js";

const d = document;

//Conexión a la base de datos.
const db = getFirestore(app);

//Colección de las listas de FireBase.
const alumnosColeccion = collection(db, "alumnos");

export const guardarAlumno = async(usuario) => {
    usuario.asignaturas = [];
    usuario.curso = "";
    const alumnoGuardado = await addDoc(alumnosColeccion, usuario);
}

export const cargarAlumno = async(id) => {
  //Filtraremos el alumno que tenga la id de autentificación.
  const consulta = query(alumnosColeccion, where("id", "==", id));
  const alumnoFiltrado = await getDocs(consulta);
  alumnoFiltrado.docs.map((documento) => {
    const alumno = documento.data();
    crearPlantillasAlumno(alumno);
  })
}

export const mostrarAlumnos = async() => {
  const alumnos = await getDocs(alumnosColeccion);
  alumnos.forEach((doc) => {
    //console.log(doc.data());
  })
}

const crearPlantillasAlumno = (alumno) => {
  const divPerfil = plantillaPerfil(alumno);
  d.getElementById("plantillas").appendChild(divPerfil);
}