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
  plantillaCrearCurso,
  plantillaCrearAsignatura,
  plantillaMatricularAlumno,
  plantillaPerfil,
  plantillaNavCurso,
  crearFormulariosDinamico,
} from "./funcionesPlantillas.js";

const d = document;

//Conexión a la base de datos.
const db = getFirestore(app);

//Colección de las listas de FireBase.
const profesoresColeccion = collection(db, "profesores");

export const guardarProfesor = async (usuario) => {
  usuario.asignaturas = [];
  usuario.curso = [];
  const profesorGuardado = await addDoc(profesoresColeccion, usuario);
};

export const cargarProfesor = async (id) => {
  //Filtraremos el profesor que tenga la id de autentificación.
  const consulta = query(profesoresColeccion, where("id", "==", id));
  const profesorFiltrado = await getDocs(consulta);
  profesorFiltrado.docs.map((documento) => {
    const profesor = documento.data();
    crearPlantillasProfesor(profesor);
  });
};

const crearPlantillasProfesor = (profesor) => {
  const divCurso = plantillaCrearCurso();
  const divAsignatura = plantillaCrearAsignatura();
  const divAlumno = plantillaMatricularAlumno();
  const divPerfil = plantillaPerfil(profesor);
  const navCurso = plantillaNavCurso(profesor);
  d.getElementById("plantillas").appendChild(divCurso);
  d.getElementById("plantillas").appendChild(divAsignatura);
  d.getElementById("plantillas").appendChild(divAlumno);
  d.getElementById("plantillas").appendChild(divPerfil);
  d.getElementById("navHome").appendChild(navCurso);

  //Primero crearemos los formularios dinámicos, y cargaremos los respectivos datos, y luego habilitaremos los eventos.
  crearFormulariosDinamico(profesor).then(() => {
    agregarEventosSelect();
    agregarEventosProfesor();
  });
};

const agregarEventosProfesor = () => {
  d.getElementById("botonCrearAsignatura").addEventListener(
    "click",
    (ev) => {
      ev.preventDefault();
      let arrayAlumnos = [];
      if (d.getElementById("asignaturaNombre").value == "") {
        console.log("Introduce un nombre para la asignatura");
      } else if (d.getElementById("asignaturaCurso").value == "") {
        console.log("Introduce el curso de la asignatura");
      } else {
        //Creamos un array con los input de tipo checkbox y que estén seleccionados.
        var checkboxSeleccionados = Array.from(
          document.getElementsByTagName("INPUT")
        ).filter(
          (cur) =>
            cur.type === "checkbox" &&
            cur.checked &&
            cur.parentNode.parentNode.id == "checkboxesAlumno2"
        );

        checkboxSeleccionados.forEach((element) => {
          arrayAlumnos.push(element.nextSibling.textContent);
        });

        let asignatura = {
          nombre: d.getElementById("asignaturaNombre").value,
          alumnos: arrayAlumnos,
        };

        console.log(asignatura);
        //guardarAsignatura(asignatura);
      }
      console.log("creando asignatura");
    },
    false
  );

  d.getElementById("botonCrearCurso").addEventListener(
    "click",
    (ev) => {
      ev.preventDefault();
      console.log(d.getElementById("cursoNombre").value);
      console.log("creando curso");
    },
    false
  );

  d.getElementById("botonMatricularCurso").addEventListener(
    "click",
    (ev) => {
      ev.preventDefault();
      console.log("matriculando en curso");
    },
    false
  );

  d.getElementById("botonMatricularAsignatura").addEventListener(
    "click",
    (ev) => {
      ev.preventDefault();
      console.log("matriculando en curso");
    },
    false
  );
};

const agregarEventosSelect = () => {
  d.getElementById("eventoSelect").addEventListener("click", (ev) => {
    ev.preventDefault();
    showCheckboxes(document.getElementById("checkboxes"));
  });

  d.getElementById("eventoSelectAlumno").addEventListener("click", (ev) => {
    ev.preventDefault();
    showCheckboxes(document.getElementById("checkboxesAlumno"));
  });

  d.getElementById("eventoSelectAlumno2").addEventListener("click", (ev) => {
    ev.preventDefault();
    showCheckboxes(document.getElementById("checkboxesAlumno2"));
  });
};

export const showCheckboxes = (checkboxes) => {
  if (checkboxes.classList.contains("hide")) {
    checkboxes.classList.remove("hide");
  } else {
    checkboxes.classList.add("hide");
  }
};

export const matricularAlumno = async () => {
  const alumnos = await getDocs(collection(db, "alumnos"));
  alumnos.forEach((doc) => {
    console.log(doc.data());
    //return doc.data();
  });
};

export const crearCurso = async () => {
  const alumnos = await getDocs(collection(db, "alumnos"));
  alumnos.forEach((doc) => {
    console.log(doc.data());
  });

  const asignaturas = await getDocs(collection(db, "asignaturas"));
  asignaturas.forEach((doc) => {
    console.log(doc.data());
  });
};

export const crearAsignatura = async (id) => {
  const alumnos = await getDocs(collection(db, "alumnos"));
  alumnos.forEach((doc) => {
    console.log(doc.data());
  });

  //Filtrar cursos del profesor
  //consulta
  const cursosFiltrados = await getDocs(collection(db, "cursos"));
  cursosFiltrados.forEach((doc) => {
    console.log(doc.data());
  });

  //addDoc nombre.value, alumnos array, teoria, practica
};

export const cargarDatosFormulario = async (id) => {
  //Filtraremos el profesor que tenga la id de autentificación.
  const consulta = query(profesoresColeccion, where("id", "==", id));
  const profesorFiltrado = await getDocs(consulta);
  profesorFiltrado.docs.map((documento) => {
    const profesor = documento.data();
    console.log(profesor);
  });
};
