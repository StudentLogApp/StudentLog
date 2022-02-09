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

import { showCheckboxes } from "./funcionesProfesor.js";

//Conexión a la base de datos.
const db = getFirestore(app);

const d = document;

export const plantillaCrearCurso = () => {
  const divCurso = d.createElement("div");
  divCurso.classList.add("cardPrincipal");
  divCurso.style = "width: 20rem";
  divCurso.innerHTML = `<div class="headCard" style="width: 20rem">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="currentColor"
    class="bi bi-bookmark-plus"
    viewBox="0 0 16 16"
  >
    <path
      d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
    />
    <path
      d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"
    />
  </svg>
  <h5 class="card-title">CREA UN CURSO</h5>
</div>
<div class="card-body">
  <p class="card-text">
    Crea el curso en el que impartes clase para poder utilizar todas las
    herramientas que StudentLog te ofrece para gestionar tus clases.
  </p>
  <a
    class="btn btn-primary"
    data-bs-toggle="collapse"
    href="#crearCurso"
    role="button"
    aria-expanded="false"
    aria-controls="crearCurso"
    >Crear curso</a
  >
  <div class="collapse" id="crearCurso">
    <div class="card card-body">
      <form class="row g-3">
        <div class="col-md-4">
          <label for="cursoNombre" class="form-label"
            >Nombre del curso</label
          >
          <input
            type="text"
            class="form-control"
            id="cursoNombre"
            required
          />
        </div>
        <div class="col-md-3" id="cargarAsignaturasCurso">
          <label for="cursoAsignatura" class="form-label"
            >Selecciona asignatura</label
          >
        </div>
        <div class="col-md-3" id="cargarAlumnosCurso">
          <label for="cursoAlumno" class="form-label"
            >Selecciona alumno</label
          >
        </div>
        <div class="col-12">
          <button class="btn btn-primary" type="submit" id="botonCrearCurso">Crear</button>
        </div>
      </form>
    </div>
  </div>
</div>`;
  return divCurso;
};

export const plantillaCrearAsignatura = () => {
  const divAsignatura = d.createElement("div");
  divAsignatura.classList.add("cardPrincipal");
  divAsignatura.style = "width: 20rem";
  divAsignatura.innerHTML = `<div class="headCard" style="width: 20rem">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="currentColor"
    class="bi bi-journal-plus"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"
    />
    <path
      d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"
    />
    <path
      d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"
    />
  </svg>
  <h5 class="card-title">CREA UNA ASIGNATURA</h5>
</div>
<div class="card-body">
  <p class="card-text">
    Añade la asignaturas que impartes al curso correspondiente para
    poder introducir la matería de las clases y añadir a los alumnos
    correspondientes.
  </p>
  <a
    class="btn btn-primary"
    data-bs-toggle="collapse"
    href="#crearAsignatura"
    role="button"
    aria-expanded="false"
    aria-controls="crearAsignatura"
    >Crear asignatura</a
  >
  <div class="collapse" id="crearAsignatura">
    <div class="card card-body">
      <form class="row g-3">
        <div class="col-md-4">
          <label for="asignaturaNombre" class="form-label"
            >Nombre de la asignatura</label
          >
          <input
            type="text"
            class="form-control"
            id="asignaturaNombre"
            required
          />
        </div>
        <div class="col-md-3" id="cargarAlumnos">
          <label for="asignaturaAlumno" class="form-label"
            >Selecciona alumno</label
          >
        </div>
        <div class="col-md-3" id="cargarCurso">
          <label for="asignaturaCurso" class="form-label"
            >Selecciona curso</label
          >
        </div>
        <div class="col-12">
          <button class="btn btn-primary" type="submit" id="botonCrearAsignatura">Crear</button>
        </div>
      </form>
    </div>
  </div>
</div>`;
  return divAsignatura;
};

export const plantillaMatricularAlumno = () => {
  const divAlumno = d.createElement("div");
  divAlumno.classList.add("cardPrincipal");
  divAlumno.style = "width: 20rem";
  divAlumno.innerHTML = `        <div class="headCard" style="width: 20rem">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="currentColor"
    class="bi bi-person-plus"
    viewBox="0 0 16 16"
  >
    <path
      d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
    />
    <path
      fill-rule="evenodd"
      d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
    />
  </svg>
  <h5 class="card-title">MATRICULA UN ALUMNO</h5>
</div>
<div class="card-body">
  <p class="card-text">
    Matricula a tus alumnos en el curso que les impartes, de esta manera
    podrás ponerles notas, flatas o mandarles la materia de la
    asignatura entre otros.
  </p>
  <div class="botones">
    <div id="botonMatriculaCurso">
      <a
        class="btn btn-primary"
        data-bs-toggle="collapse"
        href="#matricularAlumnoCurso"
        role="button"
        aria-expanded="false"
        aria-controls="matricularAlumnoCurso"
        >En curso</a
      >
      <div class="collapse" id="matricularAlumnoCurso">
        <div class="card card-body">
          <form class="row g-3">
            <div class="col-md-3" id="cargarAlumnosMatricula2">
              <label for="matriculaAlumno" class="form-label"
                >Selecciona alumno</label
              >
            </div>
            <div class="col-md-3" id="cargarCursosMatricula">
              <label for="matriculaCurso" class="form-label"
                >Selecciona curso</label
              >
            </div>
            <div class="col-12">
              <button class="btn btn-primary" type="submit" id="botonMatricularCurso">
                Matricular
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div id="botonMatriculaAsignatura">
    <a
      class="btn btn-primary"
      data-bs-toggle="collapse"
      href="#matricularAlumnoAsignatura"
      role="button"
      aria-expanded="false"
      aria-controls="matricularAlumnoAsignatura"
      >En asignatura del curso</a
    >
    <div class="collapse" id="matricularAlumnoAsignatura">
      <div class="card card-body">
        <form class="row g-3">
          <div class="col-md-3" id="cargarAlumnosMatricula">
            <label for="matriculaAlumnoAsignatura" class="form-label"
              >Selecciona alumno</label
            >
          </div>
          <div class="col-md-3" id="cargarCursosMatricula2">
            <label for="matriculaAsignaturaAsignatura" class="form-label"
              >Selecciona curso</label
            >
          </div>
          <div class="col-md-3" id="cargarMatriculaAsignaturas">
          <label for="matriculaAsignatura" class="form-label"
            >Selecciona asignatura</label
          >
          </div>
          <div class="col-12">
            <button class="btn btn-primary" type="submit" id="botonMatricularAsignatura">
              Matricular
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>`;
  return divAlumno;
};

export const plantillaPerfil = (usuario) => {
  const divPerfil = d.createElement("div");
  divPerfil.classList.add("cardPrincipal");
  divPerfil.style = "width: 20rem";
  divPerfil.innerHTML = `<div class="headCard" style="width: 20rem">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="currentColor"
    class="bi bi-person-circle"
    viewBox="0 0 16 16"
  >
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
    <path
      fill-rule="evenodd"
      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
    />
  </svg>
  <h5 class="card-title">TU PERFIL</h5>
</div>
<div class="card-body">
<p class="card-text">Nombre: ${usuario.nombre}</p>
<p class="card-text">Correo: ${usuario.correo}</p>
<p class="card-text">Rol: ${usuario.rol}</p>
</div>`;
  return divPerfil;
};

export const plantillaNavCurso = (profesor) => {
  const navCurso = d.createElement("li");
  navCurso.classList.add("nav-item", "dropdown");
  navCurso.innerHTML = `<a
  class="nav-link dropdown-toggle"
  href="#"
  id="cursos"
  role="button"
  data-bs-toggle="dropdown"
  aria-expanded="false"
>
  Cursos
</a>`;

  const listaCurso = d.createElement("ul");
  listaCurso.classList.add("dropdown-menu");
  listaCurso.ariaLabel = "cursos";

  profesor.curso.forEach((element) => {
    const curso = d.createElement("li");
    curso.innerHTML = `<a class="dropdown-item" href="#">${element}</a>`;
    listaCurso.appendChild(curso);
  });

  navCurso.appendChild(listaCurso);

  return navCurso;
};

export const crearFormulariosDinamico = async (profesor) => {
  //Cargados cursos para la creación de la asignatura.
  const selectCurso = plantillaSelect("asignaturaCurso");

  //Cargados cursos para la matriculación de alumnos en curso.
  const selectCurso2 = plantillaSelect("matriculaAsignaturaAsignatura");

  //Cargados cursos para la matriculación de alumnos en asignatura.
  const selectCurso3 = plantillaSelect("matriculaCurso");

  //He repetido tres veces este bucle, porque al parecer da conflicto si incluyo el curso en los tres select a la vez.
  profesor.curso.forEach((element) => {
    const curso = d.createElement("option");
    curso.innerHTML = `${element}`;
    selectCurso.appendChild(curso);
  });

  profesor.curso.forEach((element) => {
    const curso = d.createElement("option");
    curso.innerHTML = `${element}`;
    selectCurso2.appendChild(curso);
  });

  profesor.curso.forEach((element) => {
    const curso = d.createElement("option");
    curso.innerHTML = `${element}`;
    selectCurso3.appendChild(curso);
  });

  d.getElementById("cargarCurso").appendChild(selectCurso);
  d.getElementById("cargarCursosMatricula2").appendChild(selectCurso2);
  d.getElementById("cargarCursosMatricula").appendChild(selectCurso3);

  //Cargados alumnos para la creación de la asignatura.
  const multiSelect = multiselectAlumnoAsignatura();

  const divCheckbox = d.createElement("div");
  divCheckbox.id = "checkboxesAlumno2";
  divCheckbox.classList.add("hide");

  const alumnos = await getDocs(collection(db, "alumnos"));

  alumnos.forEach((element) => {
    const labelCheckbox = d.createElement("label");
    labelCheckbox.classList.add("form-check-label");
    labelCheckbox.innerHTML = `<input class="form-check-input" type="checkbox"/>${
      element.data().nombre
    }`;
    divCheckbox.appendChild(labelCheckbox);
  });

  multiSelect.appendChild(divCheckbox);

  d.getElementById("cargarAlumnos").appendChild(multiSelect);

  //Cargados alumnos para la creación del curso.
  const multiSelect2 = multiselectAlumnoCurso();

  const divCheckbox2 = d.createElement("div");
  divCheckbox2.id = "checkboxesAlumno";
  divCheckbox2.classList.add("hide");

  alumnos.forEach((element) => {
    const labelCheckbox2 = d.createElement("label");
    labelCheckbox2.classList.add("form-check-label");
    labelCheckbox2.innerHTML = `<input class="form-check-input" type="checkbox"/>${
      element.data().nombre
    }`;
    divCheckbox2.appendChild(labelCheckbox2);
  });

  multiSelect2.appendChild(divCheckbox2);
  d.getElementById("cargarAlumnosCurso").appendChild(multiSelect2);

  //Cargadas asignaturas para la creación del curso.
  const multiSelect3 = multiselectAsignaturaCurso();

  const divCheckbox3 = d.createElement("div");
  divCheckbox3.id = "checkboxes";
  divCheckbox3.classList.add("hide");

  const asignaturas = await getDocs(collection(db, "asignaturas"));

  asignaturas.forEach((element) => {
    const labelCheckbox3 = d.createElement("label");
    labelCheckbox3.classList.add("form-check-label");
    labelCheckbox3.innerHTML = `<input class="form-check-input" type="checkbox"/>${
      element.data().nombre
    }`;
    divCheckbox3.appendChild(labelCheckbox3);
  });

  multiSelect3.appendChild(divCheckbox3);
  d.getElementById("cargarAsignaturasCurso").appendChild(multiSelect3);

  //Cargados alumnos para la matriculación de alumnos en curso.
  const selectAlumno = plantillaSelect("matriculaAlumnoAsignatura");

  //Cargados alumnos para la matriculación de alumnos en asignatura.
  const selectAlumno2 = plantillaSelect("matriculaAlumno");

  alumnos.forEach((element) => {
    const alumno = d.createElement("option");
    alumno.innerHTML = `${element.data().nombre}`;
    selectAlumno.appendChild(alumno);
  });

  alumnos.forEach((element) => {
    const alumno = d.createElement("option");
    alumno.innerHTML = `${element.data().nombre}`;
    selectAlumno2.appendChild(alumno);
  });

  d.getElementById("cargarAlumnosMatricula").appendChild(selectAlumno);
  d.getElementById("cargarAlumnosMatricula2").appendChild(selectAlumno2);

  const multiSelect4 = multiselectMatriculaAsignatura();

  const divCheckbox4 = d.createElement("div");
  divCheckbox4.id = "checkboxesAsignatura";
  divCheckbox4.classList.add("hide");

  //Cargadas asignaturas dependiendo del curso seleccionado para la matriculación de alumnos en asignatura.
  d.getElementById("matriculaAsignaturaAsignatura").addEventListener(
    "change",
    async () => {
      //Limpiaremos el div de los checkbox para que no se acumulen asignaturas repetidas.
      if (d.getElementById("matriculaAsignatura") != null) {
        d.getElementById("checkboxesAsignatura").innerHTML = "";
      }

      const inputCurso = d.getElementById(
        "matriculaAsignaturaAsignatura"
      ).value;

      //Filtraremos el alumno que tenga la id de autentificación.
      const consulta = query(
        collection(db, "cursos"),
        where("nombre", "==", inputCurso)
      );
      const cursoSeleccionado = await getDocs(consulta);
      cursoSeleccionado.docs.map((documento) => {
        const curso = documento.data();
        console.log(curso);
        curso.asignaturas.forEach((element) => {
          const asignatura = d.createElement("label");
          asignatura.classList.add("form-check-label");
          asignatura.innerHTML = `<input class="form-check-input" type="checkbox"/>${element}`;
          divCheckbox4.appendChild(asignatura);
        });

        multiSelect4.appendChild(divCheckbox4);
      });

      d.getElementById("cargarMatriculaAsignaturas").appendChild(multiSelect4);

      d.getElementById("eventoSelectAsignatura").addEventListener(
        "click",
        (ev) => {
          ev.preventDefault();
          showCheckboxes(document.getElementById("checkboxesAsignatura"));
        }
      );
    }
  );
};

const plantillaSelect = (idNombre) => {
  const select = d.createElement("select");
  select.classList.add("form-select");
  select.id = idNombre;
  select.required = true;
  select.innerHTML = `<option selected disabled value="">Elige</option>`;
  return select;
};

const multiselectAlumnoAsignatura = () => {
  const divMultiselect = d.createElement("div");
  divMultiselect.classList.add("multiselect");
  divMultiselect.innerHTML = `  <div class="selectBox" id="eventoSelectAlumno2">
  <select
    class="form-select"
    aria-label="Elige"
    id="asignaturaAlumno"
    required
  >
    <option selected disabled value="">Elige</option>
  </select>
  <div class="overSelect"></div>
</div>`;
  return divMultiselect;
};

const multiselectAlumnoCurso = () => {
  const divMultiselect = d.createElement("div");
  divMultiselect.classList.add("multiselect");
  divMultiselect.innerHTML = `  <div class="selectBox" id="eventoSelectAlumno">
  <select
    class="form-select"
    aria-label="Elige"
    id="cursoAlumno"
    required
  >
    <option selected disabled value="">Elige</option>
  </select>
  <div class="overSelect"></div>
</div>`;
  return divMultiselect;
};

const multiselectAsignaturaCurso = () => {
  const divMultiselect = d.createElement("div");
  divMultiselect.classList.add("multiselect");
  divMultiselect.innerHTML = `<div class="selectBox" id="eventoSelect">
  <select
    class="form-select"
    aria-label="Elige"
    id="cursoAsignatura"
    required
  >
    <option selected disabled value="">Elige</option>
  </select>
  <div class="overSelect"></div>
</div>`;
  return divMultiselect;
};

const multiselectMatriculaAsignatura = () => {
  const divMultiselect = d.createElement("div");
  divMultiselect.classList.add("multiselect");
  divMultiselect.innerHTML = `<div class="selectBox" id="eventoSelectAsignatura">
  <select
    class="form-select"
    aria-label="Elige"
    id="matriculaAsignatura"
    required
  >
    <option selected disabled value="">Elige</option>
    <option selected value="">Elige</option>
  </select>
  <div class="overSelect"></div>
</div>`;
  return divMultiselect;
};
