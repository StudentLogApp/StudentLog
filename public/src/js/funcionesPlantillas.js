"use strict";
//Importamos los datos de conexión de firebase.
import { app } from "./datosFirebase.js";

//Importamos algunas funciones de firebase.
import {
  getFirestore,
  collection,
  getDocs,
  arrayRemove,
  query,
  where,
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

//Importamos algunas funciones de profesor.
import { showCheckboxes } from "./funcionesProfesor.js";

import { actualizarUsuario } from "./funcionesUsuario.js";

//Conexión a la base de datos.
const db = getFirestore(app);

const d = document;

//Obtenemos la id recibida en la url mediante estos pasos.
let params = new URLSearchParams(location.search);

//Creación de plantilla para el formulario de inserción de cursos.
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
        <div class="col-md-3" id="cargarProfesoresCurso">
          <label for="cursoProfesor" class="form-label"
            >Selecciona profesor</label
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

//Creación de plantilla para el formulario de inserción de asignaturas.
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
        <div class="col-md-4">
        <label for="asignaturaHoras" class="form-label"
          >Nº de horas de la asignatura</label
        >
        <input
          type="number"
          class="form-control"
          id="asignaturaHoras"
          required
        />
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

//Creación de plantilla para el formulario de matriculación de alumnos.
export const plantillaMatricularAlumno = () => {
  const divAlumno = d.createElement("div");
  divAlumno.classList.add("cardPrincipal");
  divAlumno.style = "width: 20rem";
  divAlumno.innerHTML = `<div class="headCard" style="width: 20rem">
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
            <label for="matriculaCursoAsignatura" class="form-label"
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

//Creación de plantilla para mostrar el perfil del usuario en el home.
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

//Creación de plantilla para el nav de cursos de la página.
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
    curso.addEventListener(
      "click",
      (ev) => {
        location.href =
          "./curso.html?id=" + profesor.id + "?curso=" + ev.target.textContent;
      },
      false
    );
    listaCurso.appendChild(curso);
  });

  navCurso.appendChild(listaCurso);
  return navCurso;
};

export const plantillaNavCursoAlumno = async () => {
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

  const cursos = await getDocs(collection(db, "cursos"));
  cursos.docs.map((documento) => {
    const dato = documento.data();

    const curso = d.createElement("li");
    curso.innerHTML = `<a class="dropdown-item" href="#">${dato.nombre}</a>`;
    curso.addEventListener(
      "click",
      (ev) => {
        location.href =
          "./curso.html?id=" +
          params.get("id").split("?")[0] +
          "?curso=" +
          ev.target.textContent;
      },
      false
    );
    listaCurso.appendChild(curso);
  });

  navCurso.appendChild(listaCurso);
  return navCurso;
};

//Creación de plantillas que nos servirá para crear los elementos de forma dinámica y cargar los datos que requeriremos.
export const crearFormulariosDinamico = async (profesor) => {
  //Cargados cursos para la creación de la asignatura.
  const selectCurso = plantillaSelect("asignaturaCurso");

  //Cargados cursos para la matriculación de alumnos en curso.
  const selectCurso2 = plantillaSelect("matriculaCursoAsignatura");

  //Cargados cursos para la matriculación de alumnos en asignatura.
  const selectCurso3 = plantillaSelect("matriculaCurso");

  //He repetido tres veces este bucle, porque al parecer da conflicto si incluyo el appendchild para el curso en los tres select a la vez.
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
    const labelCheckbox = d.createElement("label");
    labelCheckbox.classList.add("form-check-label");
    labelCheckbox.innerHTML = `<input class="form-check-input" type="checkbox"/>${
      element.data().nombre
    }`;
    divCheckbox2.appendChild(labelCheckbox);
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
    const labelCheckbox = d.createElement("label");
    labelCheckbox.classList.add("form-check-label");
    labelCheckbox.innerHTML = `<input class="form-check-input" type="checkbox"/>${
      element.data().nombre
    }`;
    divCheckbox3.appendChild(labelCheckbox);
  });

  multiSelect3.appendChild(divCheckbox3);
  d.getElementById("cargarAsignaturasCurso").appendChild(multiSelect3);

  //Cargados profesores para la creación del curso.
  const multiSelect5 = multiselectCursoProfesor();

  const divCheckbox5 = d.createElement("div");
  divCheckbox5.id = "checkboxesProfesor";
  divCheckbox5.classList.add("hide");

  const profesores = await getDocs(collection(db, "profesores"));

  profesores.forEach((element) => {
    const labelCheckbox = d.createElement("label");
    labelCheckbox.classList.add("form-check-label");
    labelCheckbox.innerHTML = `<input class="form-check-input" type="checkbox"/>${
      element.data().nombre
    }`;
    divCheckbox5.appendChild(labelCheckbox);
  });

  multiSelect5.appendChild(divCheckbox5);

  d.getElementById("cargarProfesoresCurso").appendChild(multiSelect5);

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

  //Cargadas asignaturas para la matriculación de alumnos en asignatura.
  const multiSelect4 = multiselectMatriculaAsignatura();

  const divCheckbox4 = d.createElement("div");
  divCheckbox4.id = "checkboxesAsignatura";
  divCheckbox4.classList.add("hide");

  //Cargadas asignaturas dependiendo del curso seleccionado para la matriculación de alumnos en asignatura.
  d.getElementById("matriculaCursoAsignatura").addEventListener(
    "change",
    async () => {
      //Limpiaremos el div de los checkbox para que no se acumulen asignaturas repetidas.
      if (d.getElementById("matriculaAsignatura") != null) {
        d.getElementById("checkboxesAsignatura").innerHTML = "";
      }

      const inputCurso = d.getElementById("matriculaCursoAsignatura").value;

      //Filtraremos el curso que seleccionemos en el select.
      const consulta = query(
        collection(db, "cursos"),
        where("nombre", "==", inputCurso)
      );
      //Para el curso que seleccionamos, recorremos las asignaturas que tiene y las pintamos.
      const cursoSeleccionado = await getDocs(consulta);
      cursoSeleccionado.docs.map((documento) => {
        const curso = documento.data();
        curso.asignaturas.forEach((element) => {
          const asignatura = d.createElement("label");
          asignatura.classList.add("form-check-label");
          asignatura.innerHTML = `<input class="form-check-input" type="checkbox"/>${element}`;
          divCheckbox4.appendChild(asignatura);
        });

        multiSelect4.appendChild(divCheckbox4);
      });

      d.getElementById("cargarMatriculaAsignaturas").appendChild(multiSelect4);

      //Agregamos el evento del multiselect para mostrar los input checkbox de las asignaturas.
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

//Creación de plantilla para hacer un elemento select.
const plantillaSelect = (idNombre) => {
  const select = d.createElement("select");
  select.classList.add("form-select");
  select.id = idNombre;
  select.required = true;
  select.innerHTML = `<option selected disabled value="">Elige</option>`;
  return select;
};

//Creación de plantilla para hacer un multiselect.
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
    <option selected disabled value="0">Elige</option>
  </select>
  <div class="overSelect"></div>
</div>`;
  return divMultiselect;
};

//Creación de plantilla para hacer un multiselect.
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
    <option selected disabled value="0">Elige</option>
  </select>
  <div class="overSelect"></div>
</div>`;
  return divMultiselect;
};

//Creación de plantilla para hacer un multiselect.
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
    <option selected disabled value="0">Elige</option>
  </select>
  <div class="overSelect"></div>
</div>`;
  return divMultiselect;
};

//Creación de plantilla para hacer un multiselect.
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
    <option selected disabled value="0">Elige</option>
    <option selected value="">Elige</option>
  </select>
  <div class="overSelect"></div>
</div>`;
  return divMultiselect;
};

//Creación de plantilla para hacer un multiselect.
const multiselectCursoProfesor = () => {
  const divMultiselect = d.createElement("div");
  divMultiselect.classList.add("multiselect");
  divMultiselect.innerHTML = `<div class="selectBox" id="eventoSelectProfesor">
  <select
    class="form-select"
    aria-label="Elige"
    id="cursoProfesor"
    required
  >
    <option selected disabled value="0">Elige</option>
    <option selected value="">Elige</option>
  </select>
  <div class="overSelect"></div>
</div>`;
  return divMultiselect;
};

//Creación de plantilla para añadir el título en la página de curso.
export const plantillaTituloCurso = (nombre) => {
  const divTitulo = d.createElement("div");
  divTitulo.classList.add("two", "alt-two");
  divTitulo.innerHTML = `<h1>
  ${nombre}
  <span>Alumnos</span>
</h1>`;

  return divTitulo;
};

//Creación de plantilla para añadir un subtítulo a otros elementos en la página de curso.
export const divElemento = (elemento) => {
  const div = d.createElement("div");
  div.classList.add("two", "alt-two");
  div.innerHTML = `<h1><span>${elemento}</span></h1>`;
  return div;
};

//Creación de plantilla para las tablas(headers) de alumnos y profesores.
export const plantillaTablaCurso = (elemento) => {
  const tabla = d.createElement("table");
  tabla.classList.add("table", "table-hover");
  tabla.innerHTML = `<thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">Nombre</th>
    <th scope="col">Apellidos</th>
    <th scope="col">Correo</th>
    <th scope="col">Asignaturas</th>
    <th scope="col">Herramientas</th>
  </tr>
</thead>
<tbody id="${elemento}">
</tbody>`;
  return tabla;
};

//Creación de plantilla para las tablas(headers) de alumnos y profesores sin herramientas.
export const plantillaTablaCursoSinHerramientas = (elemento) => {
  const tabla = d.createElement("table");
  tabla.classList.add("table", "table-hover");
  tabla.innerHTML = `<thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">Nombre</th>
    <th scope="col">Apellidos</th>
    <th scope="col">Correo</th>
    <th scope="col">Asignaturas</th>
  </tr>
</thead>
<tbody id="${elemento}">
</tbody>`;
  return tabla;
};

//Creación de plantilla para las tabla(header) de asignaturas.
export const plantillaTablaAsignaturasCurso = () => {
  const tabla = d.createElement("table");
  tabla.classList.add("table", "table-hover");
  tabla.innerHTML = `<thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">Nombre</th>
    <th scope="col">Horas</th>
  </tr>
</thead>
<tbody id="mostrarAsignaturas">
</tbody>`;
  return tabla;
};

//Creación de plantilla para crear la tabla(body) de los alumnos.
export const plantillaAlumnosCurso = (curso) => {
  //Numerado de filas dinámico.
  let num = 1;
  curso.alumnos.forEach(async (element) => {
    //Filtraremos el alumno para obtener los correos y poder incluirlos en la web.
    const consulta = query(
      collection(db, "alumnos"),
      where("nombre", "==", element)
    );
    const usuarioFiltrado = await getDocs(consulta);

    usuarioFiltrado.docs.map((documento) => {
      const usuario = documento.data();
      const tr = d.createElement("tr");
      //Dividiremos el nombre completo del usuario para separa el nombre y los apellidos.
      tr.innerHTML = `<th scope="row">${num}</th>
      <td>${element.split(" ")[0]}</td>
      <td>${element.split(" ")[1] + " " + element.split(" ")[2]}</td>
      <td>${usuario.correo}</td>
      <td>${usuario.asignaturas}</td>`;

      //Añadiremos los siguientes botones con sus respectivos eventos.
      const td = d.createElement("td");
      let buttonEditar = plantillaBotonEditar(usuario);
      let buttonEliminar = plantillaBotonEliminar(usuario);
      td.appendChild(buttonEditar);
      td.appendChild(buttonEliminar);
      tr.appendChild(td);
      d.getElementById("mostrarAlumnos").appendChild(tr);
      num++;
    });
  });
};

//Creación de plantilla para crear la tabla(body) de los alumnos sin botones.
export const plantillaAlumnosCursoSinBotones = (curso) => {
  //Numerado de filas dinámico.
  let num = 1;
  curso.alumnos.forEach(async (element) => {
    //Filtraremos el alumno para obtener los correos y poder incluirlos en la web.
    const consulta = query(
      collection(db, "alumnos"),
      where("nombre", "==", element)
    );
    const usuarioFiltrado = await getDocs(consulta);

    usuarioFiltrado.docs.map((documento) => {
      const usuario = documento.data();
      const tr = d.createElement("tr");
      //Dividiremos el nombre completo del usuario para separa el nombre y los apellidos.
      tr.innerHTML = `<th scope="row">${num}</th>
      <td>${element.split(" ")[0]}</td>
      <td>${element.split(" ")[1] + " " + element.split(" ")[2]}</td>
      <td>${usuario.correo}</td>
      <td>${usuario.asignaturas}</td>`;

      d.getElementById("mostrarAlumnos").appendChild(tr);
      num++;
    });
  });
};

//Creación de plantilla para crear la tabla(body) de los profesores.
export const plantillaProfesoresCurso = (curso) => {
  //Numerado de filas dinámico.
  let num = 1;
  curso.profesores.forEach(async (element) => {
    //Filtraremos el profesor para obtener los correos y poder incluirlos en la web.
    const consulta = query(
      collection(db, "profesores"),
      where("nombre", "==", element)
    );
    const usuarioFiltrado = await getDocs(consulta);

    usuarioFiltrado.docs.map((documento) => {
      const usuario = documento.data();
      const tr = d.createElement("tr");
      //Dividiremos el nombre completo del usuario para separa el nombre y los apellidos.
      tr.innerHTML = `<th scope="row">${num}</th>
      <td>${element.split(" ")[0]}</td>
      <td>${element.split(" ")[1] + " " + element.split(" ")[2]}</td>
      <td>${usuario.correo}</td>
      <td>${usuario.asignaturas}</td>`;

      //Añadiremos los siguientes botones con sus respectivos eventos.
      const td = d.createElement("td");
      let buttonEditar = plantillaBotonEditar(usuario);
      let buttonEliminar = plantillaBotonEliminar(usuario);
      td.appendChild(buttonEditar);
      td.appendChild(buttonEliminar);
      tr.appendChild(td);
      d.getElementById("mostrarProfesores").appendChild(tr);
      num++;
    });
  });
};

//Creación de plantilla para crear la tabla(body) de los profesores sin botones.
export const plantillaProfesoresCursoSinBotones = (curso) => {
  //Numerado de filas dinámico.
  let num = 1;
  curso.profesores.forEach(async (element) => {
    //Filtraremos el profesor para obtener los correos y poder incluirlos en la web.
    const consulta = query(
      collection(db, "profesores"),
      where("nombre", "==", element)
    );
    const usuarioFiltrado = await getDocs(consulta);

    usuarioFiltrado.docs.map((documento) => {
      const usuario = documento.data();
      const tr = d.createElement("tr");
      //Dividiremos el nombre completo del usuario para separa el nombre y los apellidos.
      tr.innerHTML = `<th scope="row">${num}</th>
      <td>${element.split(" ")[0]}</td>
      <td>${element.split(" ")[1] + " " + element.split(" ")[2]}</td>
      <td>${usuario.correo}</td>
      <td>${usuario.asignaturas}</td>`;
      d.getElementById("mostrarProfesores").appendChild(tr);
      num++;
    });
  });
};

//Creación de plantilla para crear la tabla(body) de las asignaturas.
export const plantillaAsignaturasCurso = (curso) => {
  //Numerado de filas dinámico.
  let num = 1;
  curso.asignaturas.forEach(async (element) => {
    //Filtraremos el alumno para obtener los correos y poder incluirlos en la web.
    const consulta = query(
      collection(db, "asignaturas"),
      where("nombre", "==", element)
    );
    const asignaturaFiltrada = await getDocs(consulta);

    asignaturaFiltrada.docs.map((documento) => {
      const asignatura = documento.data();
      const tr = d.createElement("tr");
      tr.innerHTML = `<th scope="row">${num}</th>
      <td>${asignatura.nombre}</td>
      <td>${asignatura.horas}</td>`;
      d.getElementById("mostrarAsignaturas").appendChild(tr);
      num++;
    });
  });
};

//Creación de plantilla para crear el botón eliminar.
const plantillaBotonEliminar = (usuario) => {
  //Obtenemos la id recibida en la url mediante estos pasos.
  let params = new URLSearchParams(location.search);

  let buttonEliminar = d.createElement("button");
  buttonEliminar.classList.add("btn", "btn-danger");
  buttonEliminar.innerHTML = "Eliminar";
  buttonEliminar.addEventListener(
    "click",
    async () => {
      console.log("eliminando");

      if (usuario.rol == "profesor") {
        //Filtraremos el curso seleccionado.
        usuario.curso.forEach(async (element) => {
          const consulta = query(
            collection(db, "cursos"),
            where("nombre", "==", element)
          );
          //Recorreremos a este curso y sacaremos la id de ese documento del curso.
          const cursoFiltrado = await getDocs(consulta);
          cursoFiltrado.docs.map(async (documento) => {
            const cursoDocId = documento.id;
            //Para luego con la id del documento y la colección de cursos, actualizar las profesores del curso seleccionado.
            await updateDoc(doc(collection(db, "cursos"), cursoDocId), {
              profesores: arrayRemove(usuario.nombre),
            })
              .then(() => {
                alert(
                  "Enhorabuena, has eliminado el alumno correctamente!",
                  "success"
                );
              })
              .then(() => {
                setTimeout(() => {
                  location.href =
                    "../curso.html?id=" +
                    params.get("id").split("?")[0] +
                    "?curso=" +
                    params.get("id").split("=")[1];
                }, 2000);
              });
          });
        });
      } else {
        const consulta = query(
          collection(db, "cursos"),
          where("nombre", "==", usuario.curso)
        );
        //Recorreremos a este curso y sacaremos la id de ese documento del curso.
        const cursoFiltrado = await getDocs(consulta);
        cursoFiltrado.docs.map(async (documento) => {
          const cursoDocId = documento.id;
          //Para luego con la id del documento y la colección de cursos, actualizar las alumnos del curso seleccionado.
          await updateDoc(doc(collection(db, "cursos"), cursoDocId), {
            alumnos: arrayRemove(usuario.nombre),
          })
            .then(() => {
              alert(
                "Enhorabuena, has eliminado el alumno correctamente!",
                "success"
              );
            })
            .then(() => {
              setTimeout(() => {
                location.href =
                  "../curso.html?id=" +
                  params.get("id").split("?")[0] +
                  "?curso=" +
                  params.get("id").split("=")[1];
              }, 2000);
            });
        });
      }
    },
    false
  );
  return buttonEliminar;
};

//Creación de plantilla para crear el botón editar.
const plantillaBotonEditar = (usuario) => {
  let buttonEditar = d.createElement("button");
  buttonEditar.classList.add("btn", "btn-primary");
  buttonEditar.innerHTML = "<a href='#editarFormulario'>Editar</a>";
  buttonEditar.addEventListener(
    "click",
    () => {
      console.log("editando");
      d.getElementById("nombreAlumnoCurso").value =
        usuario.nombre.split(" ")[0];
      d.getElementById("primerApellido").value = usuario.nombre.split(" ")[1];
      d.getElementById("segundoApellido").value = usuario.nombre.split(" ")[2];
      d.getElementById("correoAlumnoCurso").value = usuario.correo;
      d.getElementById("editarFormulario").classList.toggle("aparecer");

      d.getElementById("actualizarEditar").addEventListener(
        "click",
        (ev) => {
          ev.preventDefault();
          actualizarUsuario(usuario);
        },
        false
      );
    },
    false
  );
  return buttonEditar;
};

//Creación de plantilla para mostrar el perfil del usuario en perfil.
export const plantillaPerfilNueva = (usuario) => {
  const divPerfil = d.createElement("div");
  divPerfil.classList.add("cardPrincipal");
  divPerfil.style = "width: 20rem";
  imagenVacia(usuario);
  divPerfil.innerHTML = `<div class="primary card" style="width: 18rem">
    <div class="img-content">
      <img src="${usuario.imagen}" class="card-img-top"/>
    </div>
    <div class="card-body">
      <h5 class="card-nombre">${usuario.nombre}</h5>
      <br>
      <p class="card-correo">
      ${usuario.correo}
      </p>
      <br>
      <p class="card-rol">
      ${usuario.rol}
      </p>
      <a class="btn btn-info" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"">Añadir imagen</a>
      <div class="collapse" id="collapseExample">
        <div class="card card-body secundary">
          <input id="inputImagen" type="text" placeholder="Introduce el enlace de la imagen." />
          <button type="button" id="enviarImagen" class="btn btn-primary btn-sm">Enviar</button>
        </div>
      </div>
      <br><br>
      <a href="#" id="cerrarSesionPerfil" class="btn btn-primary">Cerrar Sesión</a>
    </div>
  </div>`;
  return divPerfil;
};

//En el caso de que el profesor o el alumno no tenga la propiedad imagen con un enlace, se rellenará con esta por defecto.
const imagenVacia = (usuario) => {
  if (usuario.imagen == "") {
    usuario.imagen =
      "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg";
  }
};

//Función que utilizaremos para mostrar mensajes por pantalla.
export const alert = (message, type) => {
  var wrapper = document.createElement("div");
  wrapper.innerHTML =
    '<div class="alert alert-' +
    type +
    ' alert-dismissible" role="alert">' +
    message +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

  document.getElementById("contenedorAlerta").appendChild(wrapper);
};
