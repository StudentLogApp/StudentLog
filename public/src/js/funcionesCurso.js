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
import {
  plantillaTituloCurso,
  plantillaNavCurso,
  plantillaTablaCurso,
  plantillaAlumnosCurso,
  plantillaTablaAsignaturasCurso,
  divElemento,
  plantillaAsignaturasCurso,
  plantillaProfesoresCurso,
} from "./funcionesPlantillas.js";

const d = document;

//Conexión a la base de datos.
const db = getFirestore(app);

//Colección de las listas de FireBase.
const cursosColeccion = collection(db, "cursos");

export const cargarCurso = async (id, nombreCurso) => {
  //Filtraremos el usuario que tenga la id de autentificación.
  const consulta = query(collection(db, "usuarios"), where("id", "==", id));
  const usuarioFiltrado = await getDocs(consulta);

  //Filtraremos el profesor que tenga la id de autentificación.
  const consultaProfe = query(
    collection(db, "profesores"),
    where("id", "==", id)
  );
  const profesorFiltrado = await getDocs(consultaProfe);

  //Filtraremos el curso con el nombre obtenido por parámetro.
  const consultaCurso = query(
    collection(db, "cursos"),
    where("nombre", "==", nombreCurso)
  );
  const cursoFiltrado = await getDocs(consultaCurso);

  usuarioFiltrado.docs.map((documento) => {
    const usuario = documento.data();

    if (usuario.rol == "profesor") {
      profesorFiltrado.docs.map((documento) => {
        const profesor = documento.data();
        const titulo = plantillaTituloCurso(nombreCurso);
        const navCurso = plantillaNavCurso(profesor);
        d.getElementById("navHome").appendChild(navCurso);
        d.getElementById("mostrarCurso").appendChild(titulo);
      });
      cursoFiltrado.docs.map((documento) => {
        const curso = documento.data();
        d.getElementById("mostrarCurso").appendChild(
          plantillaTablaCurso("mostrarAlumnos")
        );
        d.getElementById("mostrarCurso").appendChild(divElemento("Profesores"));
        d.getElementById("mostrarCurso").appendChild(
          plantillaTablaCurso("mostrarProfesores")
        );
        d.getElementById("mostrarCurso").appendChild(
          divElemento("Asignaturas")
        );
        d.getElementById("mostrarCurso").appendChild(
          plantillaTablaAsignaturasCurso()
        );
        const alumnos = plantillaAlumnosCurso(curso);
        const profesores = plantillaProfesoresCurso(curso);
        const asignaturas = plantillaAsignaturasCurso(curso);
      });
    }
  });

  d.getElementById("icon").addEventListener(
    "click",
    (ev) => {
      location.href = "../home.html?id=" + id;
    },
    false
  );
};

export const guardarCurso = async (curso) => {
  const cursoGuardado = await addDoc(cursosColeccion, curso);
};
