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

//Importamos algunas funciones de las plantillas.
import {
  plantillaTituloCurso,
  plantillaNavCurso,
  plantillaTablaCurso,
  plantillaAlumnosCurso,
  plantillaTablaAsignaturasCurso,
  divElemento,
  plantillaAsignaturasCurso,
  plantillaProfesoresCurso,
  plantillaNavCursoAlumno,
  plantillaAlumnosCursoSinBotones,
  plantillaTablaCursoSinHerramientas,
  plantillaProfesoresCursoSinBotones,
} from "./funcionesPlantillas.js";

const d = document;

//Conexión a la base de datos.
const db = getFirestore(app);

//Colección de las listas de FireBase.
const cursosColeccion = collection(db, "cursos");

//Función que utilizaremos para cargar las plantillas que se verán en curso.
export const cargarCurso = async (id, nombreCurso) => {
  //Filtraremos el curso con el nombre obtenido por parámetro.
  //Para recorrer este curso y mostrar algunas de sus propiedades.
  const consultaCurso = query(
    cursosColeccion,
    where("nombre", "==", nombreCurso)
  );
  const cursoFiltrado = await getDocs(consultaCurso);

  //Filtraremos el usuario que tenga la id de autentificación.
  //Para cargar dependiendo si es profesor o no.
  const consulta = query(collection(db, "usuarios"), where("id", "==", id));
  const usuarioFiltrado = await getDocs(consulta);

  usuarioFiltrado.docs.map(async (documento) => {
    const usuario = documento.data();

    if (usuario.rol == "profesor") {
      //Filtraremos el profesor que tenga la id de autentificación.
      //Para saber los datos que hay que cargar en los elementos de la página.
      const consultaProfe = query(
        collection(db, "profesores"),
        where("id", "==", id)
      );
      const profesorFiltrado = await getDocs(consultaProfe);

      //Cargaremos las plantillas que verá el profesor seleccionado.
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
    } else {
      plantillaNavCursoAlumno().then((nodo) =>
        d.getElementById("navHome").appendChild(nodo)
      );
      //LLamaremos a esta función que cargará las plantillas que verá el alumno.
      listarCurso(nombreCurso);
    }
  });

  //En curso, agregaremos el siguiente evento al logo para volver al home.
  d.getElementById("icon").addEventListener(
    "click",
    (ev) => {
      location.href = "../home.html?id=" + id;
    },
    false
  );
};

//Función que nos permitirá guardar el curso en firestore.
export const guardarCurso = async (curso) => {
  const cursoGuardado = await addDoc(cursosColeccion, curso);
};

//Función que listará todos los cursos para que lo visualice el alumno
export const listarCurso = async (nombreCurso) => {
  //Filtraremos el curso con el nombre obtenido por parámetro.
  //Para recorrer este curso y mostrar algunas de sus propiedades.
  const consultaCurso = query(
    cursosColeccion,
    where("nombre", "==", nombreCurso)
  );
  const cursoFiltrado = await getDocs(consultaCurso);
  cursoFiltrado.docs.map((documento) => {
    const curso = documento.data();
    const titulo = plantillaTituloCurso(nombreCurso);
    d.getElementById("mostrarCurso").appendChild(titulo);
    d.getElementById("mostrarCurso").appendChild(
      plantillaTablaCursoSinHerramientas("mostrarAlumnos")
    );
    d.getElementById("mostrarCurso").appendChild(divElemento("Profesores"));
    d.getElementById("mostrarCurso").appendChild(
      plantillaTablaCursoSinHerramientas("mostrarProfesores")
    );
    d.getElementById("mostrarCurso").appendChild(divElemento("Asignaturas"));
    d.getElementById("mostrarCurso").appendChild(
      plantillaTablaAsignaturasCurso()
    );

    const alumnos = plantillaAlumnosCursoSinBotones(curso);
    const profesores = plantillaProfesoresCursoSinBotones(curso);
    const asignaturas = plantillaAsignaturasCurso(curso);
  });
};
