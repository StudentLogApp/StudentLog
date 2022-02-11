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
  arrayUnion,
  doc,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

import {
  plantillaCrearCurso,
  plantillaCrearAsignatura,
  plantillaMatricularAlumno,
  plantillaPerfil,
  plantillaNavCurso,
  crearFormulariosDinamico,
} from "./funcionesPlantillas.js";

import { guardarCurso } from "./funcionesCurso.js";

const d = document;

//Conexión a la base de datos.
const db = getFirestore(app);

//Colección de las listas de FireBase.
const profesoresColeccion = collection(db, "profesores");

export const guardarProfesor = async (usuario) => {
  usuario.asignaturas = [];
  usuario.curso = [];
  usuario.imagen = "";
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
    agregarEventosProfesor(profesor);
  });
};

const agregarEventosProfesor = (profesor) => {
  eventoCrearCurso(profesor);

  eventoCrearAsignatura(profesor);

  eventoMatricularCurso();

  eventoMatricularAsignatura();
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

  d.getElementById("eventoSelectProfesor").addEventListener("click", (ev) => {
    ev.preventDefault();
    showCheckboxes(document.getElementById("checkboxesProfesor"));
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

const eventoCrearCurso = (profesor) => {
  d.getElementById("botonCrearCurso").addEventListener(
    "click",
    (ev) => {
      ev.preventDefault();
      console.log("creando curso");
      let arrayAlumnos = [];
      let arrayAsignaturas = [];
      let arrayProfesores = [];

      //Creamos un array con los input de tipo checkbox, que estén seleccionados y sean hijos de las asignaturas.
      var checkboxAsignaturasSeleccionados = Array.from(
        document.getElementsByTagName("INPUT")
      ).filter(
        (cur) =>
          cur.type === "checkbox" &&
          cur.checked &&
          cur.parentNode.parentNode.id == "checkboxes"
      );

      //Creamos un array con los input de tipo checkbox, que estén seleccionados y sean hijos de los alumnos.
      var checkboxAlumnosSeleccionados = Array.from(
        document.getElementsByTagName("INPUT")
      ).filter(
        (cur) =>
          cur.type === "checkbox" &&
          cur.checked &&
          cur.parentNode.parentNode.id == "checkboxesAlumno"
      );

      //Creamos un array con los input de tipo checkbox, que estén seleccionados y sean hijos de los profesores.
      var checkboxProfesoresSeleccionados = Array.from(
        document.getElementsByTagName("INPUT")
      ).filter(
        (cur) =>
          cur.type === "checkbox" &&
          cur.checked &&
          cur.parentNode.parentNode.id == "checkboxesProfesor"
      );

      if (d.getElementById("cursoNombre").value == "") {
        console.log("Introduce un nombre para el curso");
      } else if (checkboxAsignaturasSeleccionados.length == 0) {
        console.log("Introduce asignaturas en el curso");
      } else if (checkboxAlumnosSeleccionados.length == 0) {
        console.log("Introduce alumnos en el curso");
      } else if (checkboxProfesoresSeleccionados.length == 0) {
        console.log("Introduce profesores en el curso");
      } else {
        //Por cada checkbox seleccionado, añadiremos ese texto acoplado al array.
        checkboxAsignaturasSeleccionados.forEach((element) => {
          arrayAsignaturas.push(element.nextSibling.textContent);
        });

        //Por cada checkbox seleccionado, añadiremos ese texto acoplado al array.
        checkboxAlumnosSeleccionados.forEach(async (element) => {
          arrayAlumnos.push(element.nextSibling.textContent);
          //Filtraremos el alumno con el nombre del texto acoplado al input.
          const consulta = query(
            collection(db, "alumnos"),
            where("nombre", "==", element.nextSibling.textContent)
          );
          //Recorreremos a este alumno y sacaremos la id de ese documento del alumno.
          const alumnoFiltrado = await getDocs(consulta);
          alumnoFiltrado.docs.map(async (documento) => {
            const alumnoDocId = documento.id;
            //Para luego con la id del documento y la colección de alumnos, actualizar los cursos de los alumnos seleccionados.
            await updateDoc(doc(collection(db, "alumnos"), alumnoDocId), {
              curso: d.getElementById("cursoNombre").value,
            });
          });
        });

        //Por cada checkbox seleccionado, añadiremos ese texto acoplado al array.
        checkboxProfesoresSeleccionados.forEach(async (element) => {
          arrayProfesores.push(element.nextSibling.textContent);
          //Filtraremos el profesor con el nombre del texto acoplado al input.
          const consulta = query(
            profesoresColeccion,
            where("nombre", "==", element.nextSibling.textContent)
          );
          //Recorreremos a este profesor y sacaremos la id de ese documento del profesor.
          const profesorFiltrado = await getDocs(consulta);
          profesorFiltrado.docs.map(async (documento) => {
            const profesorDocId = documento.id;
            //Para luego con la id del documento y la colección de profesores, actualizar los cursos de los profesores seleccionados.
            await updateDoc(doc(profesoresColeccion, profesorDocId), {
              curso: arrayUnion(d.getElementById("cursoNombre").value),
            });
          });
        });

        let curso = {
          nombre: d.getElementById("cursoNombre").value,
          asignaturas: arrayAsignaturas,
          alumnos: arrayAlumnos,
          profesores: arrayProfesores,
        };

        //Guardaremos el objeto en cursos y actualizamos la página después.
        guardarCurso(curso).then(
          () => (location.href = "./home.html?id=" + profesor.id)
        );
      }
    },
    false
  );
};

const eventoCrearAsignatura = (profesor) => {
  d.getElementById("botonCrearAsignatura").addEventListener(
    "click",
    async (ev) => {
      ev.preventDefault();
      let arrayAlumnos = [];

      //Creamos un array con los input de tipo checkbox, que estén seleccionados y sean hijos de los alumnos.
      var checkboxSeleccionadosAlumnos = Array.from(
        document.getElementsByTagName("INPUT")
      ).filter(
        (cur) =>
          cur.type === "checkbox" &&
          cur.checked &&
          cur.parentNode.parentNode.id == "checkboxesAlumno2"
      );

      if (d.getElementById("asignaturaNombre").value == "") {
        console.log("Introduce un nombre para la asignatura");
      } else if (checkboxSeleccionadosAlumnos.length == 0) {
        console.log("Introduce alumnos a la asignatura");
      } else if (d.getElementById("asignaturaCurso").value == "") {
        console.log("Introduce el curso de la asignatura");
      } else if (d.getElementById("asignaturaHoras").value == "") {
        console.log("Introduce el número de horas de la asignatura");
      } else {
        checkboxSeleccionadosAlumnos.forEach(async (element) => {
          arrayAlumnos.push(element.nextSibling.textContent);
          //Guardaremos la asignatura en los alumnos que la van a cursar.
          //Filtraremos los alumnos con los nombres obtenidos del multiselect.
          const consulta = query(
            collection(db, "alumnos"),
            where("nombre", "==", element.nextSibling.textContent)
          );
          //Recorreremos estos alumnos y sacaremos la id de sus respectivos documentos.
          const alumnoFiltrado = await getDocs(consulta);
          alumnoFiltrado.docs.map(async (documento) => {
            const alumnoDocId = documento.id;
            //Para luego con la id del documento y la colección de alumnos, actualizar la asignatura que cursarán.
            await updateDoc(doc(collection(db, "alumnos"), alumnoDocId), {
              asignaturas: arrayUnion(d.getElementById("asignaturaNombre").value),
            });
          });
        });

        let asignatura = {
          nombre: d.getElementById("asignaturaNombre").value,
          alumnos: arrayAlumnos,
          horas: Number(d.getElementById("asignaturaHoras").value)
        };

        guardarAsignatura(asignatura);

        //Guardaremos la asignatura en el curso seleccionado.
        //Filtraremos el curso con el nombre obtenido del select curso.
        const consultaCurso = query(
          collection(db, "cursos"),
          where("nombre", "==", d.getElementById("asignaturaCurso").value)
        );
        //Recorreremos a este curso y sacaremos la id de ese documento del curso.
        const cursoFiltrado = await getDocs(consultaCurso);
        cursoFiltrado.docs.map(async (documento) => {
          const cursoDocId = documento.id;
          //Para luego con la id del documento y la colección de cursos, actualizar las asignaturas del curso seleccionado.
          await updateDoc(doc(collection(db, "cursos"), cursoDocId), {
            asignaturas: arrayUnion(d.getElementById("asignaturaNombre").value),
          });
        });

        //Guardaremos también la asignatura en el profesor que la crea, como que la impartirá.
        //Filtraremos el profesor con la id obtenida por parámetro.
        const consultaProfe = query(
          profesoresColeccion,
          where("id", "==", profesor.id)
        );
        //Recorreremos a este profesor y sacaremos la id de ese documento del profesor.
        const profesorFiltrado = await getDocs(consultaProfe);
        profesorFiltrado.docs.map(async (documento) => {
          const profesorDocId = documento.id;
          //Para luego con la id del documento y la colección de profesores, actualizar las asignaturas impartidas.
          await updateDoc(doc(profesoresColeccion, profesorDocId), {
            asignaturas: arrayUnion(d.getElementById("asignaturaNombre").value),
          });
        });
      }
      console.log("creando asignatura");
    },
    false
  );
};

export const eventoMatricularCurso = () => {
  d.getElementById("botonMatricularCurso").addEventListener(
    "click",
    async (ev) => {
      ev.preventDefault();
      if (d.getElementById("matriculaAlumno").value == "") {
        console.log("Selecciona a un alumno");
      } else if (d.getElementById("matriculaCurso").value == "") {
        console.log("Selecciona el curso");
      } else {
        console.log("matriculando en curso");

        //Filtraremos el curso con el nombre obtenido del select curso.
        const consultaCurso = query(
          collection(db, "cursos"),
          where("nombre", "==", d.getElementById("matriculaCurso").value)
        );
        //Recorreremos a este curso y sacaremos la id de ese documento del curso.
        const cursoFiltrado = await getDocs(consultaCurso);
        cursoFiltrado.docs.map(async (documento) => {
          const cursoDocId = documento.id;
          //Para luego con la id del documento y la colección de cursos, actualizar los alumnos del curso seleccionado.
          await updateDoc(doc(collection(db, "cursos"), cursoDocId), {
            alumnos: arrayUnion(d.getElementById("matriculaAlumno").value),
          });
        });

        //Filtraremos el alumno con el nombre obtenido del select alumno.
        const consulta = query(
          collection(db, "alumnos"),
          where("nombre", "==", d.getElementById("matriculaAlumno").value)
        );
        //Recorreremos estos alumnos y sacaremos la id de sus respectivos documentos.
        const alumnoFiltrado = await getDocs(consulta);
        alumnoFiltrado.docs.map(async (documento) => {
          const alumnoDocId = documento.id;
          //Para luego con la id del documento y la colección de alumnos, actualizar la asignatura que cursarán.
          await updateDoc(doc(collection(db, "alumnos"), alumnoDocId), {
            curso: d.getElementById("matriculaCurso").value,
          });
        });
      }
    },
    false
  );
};

export const eventoMatricularAsignatura = () => {
  d.getElementById("botonMatricularAsignatura").addEventListener(
    "click",
    (ev) => {
      ev.preventDefault();
      //Creamos un array con los input de tipo checkbox, que estén seleccionados y sean hijos de las asignaturas.
      var checkboxAsignaturasSeleccionados = Array.from(
        document.getElementsByTagName("INPUT")
      ).filter(
        (cur) =>
          cur.type === "checkbox" &&
          cur.checked &&
          cur.parentNode.parentNode.id == "checkboxesAsignatura"
      );
      if (d.getElementById("matriculaAlumnoAsignatura").value == "") {
        console.log("Selecciona a un alumno");
      } else if (d.getElementById("matriculaCursoAsignatura").value == "") {
        console.log("Selecciona el curso");
      } else if (checkboxAsignaturasSeleccionados == 0) {
        console.log("Selecciona alguna asignatura");
      } else {
        checkboxAsignaturasSeleccionados.forEach(async (element) => {
          //Guardaremos la asignatura en los alumnos que la van a cursar.
          //Filtraremos los alumnos con el nombre obtenido del select.
          const consulta = query(
            collection(db, "alumnos"),
            where(
              "nombre",
              "==",
              d.getElementById("matriculaAlumnoAsignatura").value
            )
          );
          //Recorreremos este alumno y sacaremos la id del documento.
          const alumnoFiltrado = await getDocs(consulta);
          alumnoFiltrado.docs.map(async (documento) => {
            const alumnoDocId = documento.id;
            //Para luego con la id del documento y la colección de alumnos, actualizar la asignatura que cursarán.
            await updateDoc(doc(collection(db, "alumnos"), alumnoDocId), {
              asignaturas: arrayUnion(element.nextSibling.textContent),
            });
          });
        });
      }
    },
    false
  );
};
