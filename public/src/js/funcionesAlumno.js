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

import { plantillaNavCursoAlumno, plantillaPerfil } from "./funcionesPlantillas.js";

const d = document;

//Conexión a la base de datos.
const db = getFirestore(app);

//Colección de las listas de FireBase.
const alumnosColeccion = collection(db, "alumnos");

//Función que nos permitirá guardar el usuario recibido, con algunas propiedades añadidas, a alumnos.
export const guardarAlumno = async (usuario) => {
  console.log("guardando alumno");
  usuario.asignaturas = [];
  usuario.curso = "";
  usuario.imagen = "";
  const alumnoGuardado = await addDoc(alumnosColeccion, usuario);
};

//Función que utilizaremos para cargar las plantillas que verá el alumno.
export const cargarAlumno = async (id) => {
  console.log("cargando alumno");
  //Filtraremos el alumno que tenga la id de autentificación.
  const consulta = query(alumnosColeccion, where("id", "==", id));
  const alumnoFiltrado = await getDocs(consulta);
  alumnoFiltrado.docs.map((documento) => {
    const alumno = documento.data();
    crearPlantillasAlumno(alumno);
  });
};

//Función que usaremos para añadir la plantilla a la página.
const crearPlantillasAlumno = (alumno) => {
  const divPerfil = plantillaPerfil(alumno);
  d.getElementById("plantillas").appendChild(divPerfil);
  plantillaNavCursoAlumno().then(nodo => d.getElementById("navHome").appendChild(nodo));
};
