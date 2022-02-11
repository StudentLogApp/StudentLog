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
  arrayUnion,
  arrayRemove,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

//Importamos algunas funciones de alumnos.
import { guardarAlumno, cargarAlumno } from "./funcionesAlumno.js";

//Importamos algunas funciones de profesores.
import { guardarProfesor, cargarProfesor } from "./funcionesProfesor.js";

//Importamos algunas funciones de plantillas.
import {
  plantillaNavCurso,
  plantillaNavCursoAlumno,
  plantillaPerfilNueva,
  alert,
} from "./funcionesPlantillas.js";

//Importamos algunas funciones de autentificación.
import { cerrarSesion } from "./funcionesAutentificacion.js";

const d = document;

//Conexión a la base de datos.
const db = getFirestore(app);

//Colección de las listas de FireBase.
const usuariosColeccion = collection(db, "usuarios");

//Obtenemos la id recibida en la url mediante estos pasos.
let params = new URLSearchParams(location.search);

//Función que guardará el usuario creado en la colección de firestore.
export const guardarUsuario = async (usuario) => {
  const usuarioGuardado = await addDoc(usuariosColeccion, usuario);
  console.log(
    `Usuario creado correctamente con id ${usuarioGuardado.id}. Inicia sesión para comenzar.`
  );

  //Dependiendo del rol del usuario, se guardará en profesores o en alumnos.
  if (usuario.rol == "profesor") {
    console.log("creando profesor");
    guardarProfesor(usuario)
      //Mostramos un aviso del éxito de la acción y recargamos la página.
      .then(() => {
        alert("Enhorabuena, te has registrado correctamente!", "success");
      })
      .then(() => {
        setTimeout(() => {
          location.href = "./index.html";
        }, 2000);
      });
  } else {
    console.log("creando alumno");
    guardarAlumno(usuario)
      //Mostramos un aviso del éxito de la acción y recargamos la página.
      .then(() => {
        alert("Enhorabuena, te has registrado correctamente!", "success");
      })
      .then(() => {
        setTimeout(() => {
          location.href = "./index.html";
        }, 2000);
      });
  }
};

//Función que utilizaremos para encontrar el usuario.
export const encontrarUsuario = async (id) => {
  //Filtraremos el usuario que tenga la id de autentificación.
  const consulta = query(usuariosColeccion, where("id", "==", id));
  const usuarioFiltrado = await getDocs(consulta);
  usuarioFiltrado.docs.map((documento) => {
    const usuario = documento.data();
    console.log(`Sesión iniciado correctamente. Bienvenido ${usuario.nombre}.`);

    //Cuando lo encontremos, cargaremos el home de profesor o alumno.
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

//Función que utilizaremos en el perfil, para cargar los datos del usuario.
export const cargarUsuario = async (id) => {
  //Filtraremos el usuario que tenga la id de autentificación.
  const consulta = query(usuariosColeccion, where("id", "==", id));
  const usuarioFiltrado = await getDocs(consulta);

  //Realizaremos una consulta u otra, dependiendo del rol.
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

    //Como se ha comentado, cargaremos el perfil dependiedo del rol.
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
        plantillaNavCursoAlumno().then((nodo) =>
          d.getElementById("navHome").appendChild(nodo)
        );
      });
    }
    //Añadiremos la plantilla según el tipo de usuario.
    d.getElementById("plantillaPerfil").appendChild(plantilla);

    //Agregamos un evento al boton, el cuál insertará un input para añadir una url con tu imagen, y subiremos la imagen a firestore.
    d.getElementById("enviarImagen").addEventListener(
      "click",
      () => {
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
            })
              .then(() => {
                alert(
                  "Enhorabuena, has cambiado tu imagen de perfil!",
                  "success"
                );
              })
              .then(() => {
                setTimeout(() => {
                  location.href = "../perfil.html?id=" + id;
                }, 2000);
              });
          });
        } else {
          alumnoFiltrado.docs.map(async (documento) => {
            const alumnoId = documento.id;
            const imagenRef = await doc(collection(db, "alumnos"), alumnoId);
            await updateDoc(imagenRef, {
              imagen: imagenRecogida,
            })
              .then(() => {
                alert(
                  "Enhorabuena, has cambiado tu imagen de perfil!",
                  "success"
                );
              })
              .then(() => {
                setTimeout(() => {
                  location.href = "../perfil.html?id=" + id;
                }, 2000);
              });
          });
        }
      },
      false
    );
  });

  //En perfil, agregaremos el siguiente evento al logo para volver al home.
  d.getElementById("icon").addEventListener(
    "click",
    () => {
      location.href = "../home.html?id=" + id;
    },
    false
  );

  //También agregaremos este evento para cerrar sesión, al botón nuevo de la plantilla perfil.
  d.getElementById("cerrarSesionPerfil").addEventListener(
    "click",
    () => {
      cerrarSesion();
    },
    false
  );
};

//Función que utilizaremos para actualizar el usuario en firestore.
export const actualizarUsuario = async (usuario) => {
  const cadenaNombre =
    d.getElementById("nombreAlumnoCurso").value +
    " " +
    d.getElementById("primerApellido").value +
    " " +
    d.getElementById("segundoApellido").value;

  //Filtraremos el curso con el nombre obtenido del parámetro.
  const consultaCurso = query(
    collection(db, "cursos"),
    where("nombre", "==", params.get("id").split("=")[1])
  );

  //Filtraremos el usuario con la id de autentificación.
  const consultaUsuario = query(
    collection(db, "usuarios"),
    where("id", "==", usuario.id)
  );

  const usuarioFiltrado = await getDocs(consultaUsuario);

  if (usuario.rol == "profesor") {
    console.log("actualizando profesor");
    //Filtraremos el profesor que tenga la id de autentificación.
    const consultaProfe = query(
      collection(db, "profesores"),
      where("id", "==", usuario.id)
    );
    const profesorFiltrado = await getDocs(consultaProfe);

    //Actualizaremos el profesor en la colección de profesores.
    profesorFiltrado.docs.map(async (documento) => {
      const profesorId = documento.id;
      const docRef = await doc(collection(db, "profesores"), profesorId);
      await updateDoc(docRef, {
        nombre: cadenaNombre,
        correo: d.getElementById("correoAlumnoCurso").value,
      });
    });
    //Actualizaremos el profesor en la colección del curso.
    //Recorreremos a este curso y sacaremos la id de ese documento del curso.
    const cursoFiltrado = await getDocs(consultaCurso);
    cursoFiltrado.docs.map(async (documento) => {
      const cursoDocId = documento.id;
      //Eliminaremos el profesor que se ha modificado.
      await updateDoc(doc(collection(db, "cursos"), cursoDocId), {
        profesores: arrayRemove(usuario.nombre),
      });

      //Para luego con la id del documento y la colección de cursos, actualizar los profesores del curso seleccionado.
      await updateDoc(doc(collection(db, "cursos"), cursoDocId), {
        profesores: arrayUnion(cadenaNombre),
      });
    });
  } else {
    console.log("actualizando alumno");
    //Filtraremos el alumno que tenga la id de autentificación.
    const consultaAlumno = query(
      collection(db, "alumnos"),
      where("id", "==", usuario.id)
    );
    const alumnoFiltrado = await getDocs(consultaAlumno);

    //Actualizaremos el alumno en la colección de alumnos.
    alumnoFiltrado.docs.map(async (documento) => {
      const alumnoId = documento.id;
      const docRef = await doc(collection(db, "alumnos"), alumnoId);
      await updateDoc(docRef, {
        nombre: cadenaNombre,
        correo: d.getElementById("correoAlumnoCurso").value,
      });
    });

    //Actualizaremos el alumno en la colección del curso.
    //Recorreremos a este curso y sacaremos la id de ese documento del curso.
    const cursoFiltrado = await getDocs(consultaCurso);
    cursoFiltrado.docs.map(async (documento) => {
      const cursoDocId = documento.id;
      //Eliminaremos el alumno que se ha modificado.
      await updateDoc(doc(collection(db, "cursos"), cursoDocId), {
        alumnos: arrayRemove(usuario.nombre),
      });

      //Para luego con la id del documento y la colección de cursos, actualizar los alumnos del curso seleccionado.
      await updateDoc(doc(collection(db, "cursos"), cursoDocId), {
        alumnos: arrayUnion(cadenaNombre),
      });
    });
  }

  usuarioFiltrado.docs.map(async (documento) => {
    const usuarioId = documento.id;
    //Actualizaremos el usuario en la coleccón de usuarios.
    await updateDoc(doc(collection(db, "usuarios"), usuarioId), {
      nombre: cadenaNombre,
    });
  });

  alert("Enhorabuena, has actualizado el usuario correctamente!", "success");

  setTimeout(() => {
    location.href =
      "../curso.html?id=" +
      params.get("id").split("?")[0] +
      "?curso=" +
      params.get("id").split("=")[1];
  }, 2000);
};
