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
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

import { guardarAlumno, cargarAlumno } from "./funcionesAlumno.js";

import { guardarProfesor, cargarProfesor } from "./funcionesProfesor.js";
import {
  plantillaPerfil,
  plantillaNavCurso,
  plantillaPerfilNueva,
} from "./funcionesPlantillas.js";
import { cerrarSesion } from "./funcionesAutentificacion.js";

const d = document;

//Conexión a la base de datos.
const db = getFirestore(app);

//Colección de las listas de FireBase.
const usuariosColeccion = collection(db, "usuarios");

//Función que guardará el usuario creado en la colección de firestore.
export const guardarUsuario = async (usuario) => {
  const usuarioGuardado = await addDoc(usuariosColeccion, usuario);
  console.log(
    `Usuario creado correctamente con id ${usuarioGuardado.id}. Inicia sesión para comenzar.`
  );

  if (usuario.rol == "profesor") {
    console.log("creando profesor");
    guardarProfesor(usuario);
  } else {
    console.log("creando alumno");
    guardarAlumno(usuario);
  }

  window.location.href = "./index.html";
};

//Función que utilizaremos para encontrar el usuario.
export const encontrarUsuario = async (id) => {
  //Filtraremos el usuario que tenga la id de autentificación.
  const consulta = query(usuariosColeccion, where("id", "==", id));
  const usuarioFiltrado = await getDocs(consulta);
  usuarioFiltrado.docs.map((documento) => {
    const usuario = documento.data();
    console.log(`Sesión iniciado correctamente. Bienvenido ${usuario.nombre}.`);

    console.log(usuario);

    if (usuario.rol == "profesor") {
      console.log("cargando profesor");
      cargarProfesor(id);
    } else {
      console.log("cargando alumno");
      cargarAlumno(id);
    }

    return usuario;
  });
};

export const cargarUsuario = async (id) => {
  //Filtraremos el usuario que tenga la id de autentificación.
  const consulta = query(usuariosColeccion, where("id", "==", id));
  const usuarioFiltrado = await getDocs(consulta);

  //Filtraremos el profesor que tenga la id de autentificación.
  const consultaProfe = query(
    collection(db, "profesores"),
    where("id", "==", id)
  );
  const profesorFiltrado = await getDocs(consultaProfe);

  //Filtraremos el alumno que tenga la id de autentificación.
  const consultaAlumno = query(
    collection(db, "alumnos"),
    where("id", "==", id)
  );
  const alumnoFiltrado = await getDocs(consultaAlumno);

  usuarioFiltrado.docs.map((documento) => {
    let plantilla = "";
    const usuario = documento.data();
    console.log(usuario);

    if (usuario.rol == "profesor") {
      profesorFiltrado.docs.map((documento) => {
        const profesor = documento.data();
        plantilla = plantillaPerfilNueva(profesor);
        const navCurso = plantillaNavCurso(profesor);
        d.getElementById("navHome").appendChild(navCurso);
      });
    } else {
      alumnoFiltrado.docs.map((documento) => {
        const alumno = documento.data();
        plantilla = plantillaPerfilNueva(alumno);
      });
    }
    d.getElementById("plantillaPerfil").appendChild(plantilla);
    d.getElementById("enviarImagen").addEventListener(
      "click",
      (ev) => {
        var imagenRecogida = d.getElementById("inputImagen").value;
        if (usuario.rol == "profesor") {
          profesorFiltrado.docs.map(async (documento) => {
            const profesorId = documento.id;
            const imagenRef = await doc(
              collection(db, "profesores"),
              profesorId
            );
            await updateDoc(imagenRef, {
              imagen: imagenRecogida,
            }).then(() => {
              location.href = "../perfil.html?id=" + id;
            });
          });
        } else {
          //TODO listarCursos() podrá ver en el html curso, los distintos cursos con sus asignaturas
          alumnoFiltrado.docs.map(async (documento) => {
            const alumnoId = documento.id;
            const imagenRef = await doc(collection(db, "alumnos"), alumnoId);
            await updateDoc(imagenRef, {
              imagen: imagenRecogida,
            }).then(() => {
              location.href = "../perfil.html?id=" + id;
            });
          });
        }
      },
      false
    );
  });
  d.getElementById("icon").addEventListener(
    "click",
    () => {
      location.href = "../home.html?id=" + id;
    },
    false
  );
  d.getElementById("cerrarSesionPerfil").addEventListener(
    "click",
    () => {
      cerrarSesion();
    },
    false
  );
};