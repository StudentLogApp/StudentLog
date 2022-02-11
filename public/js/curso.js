"use strict";

import { cerrarSesion } from "../src/js/funcionesAutentificacion.js";
import { cargarCurso } from "../src/js/funcionesCurso.js";

window.onload = async () => {
  const d = document;

  //Obtenemos la id recibida en la url mediante estos pasos.
  let params = new URLSearchParams(location.search);

  //En el caso que reciba dos argumentos por url, para el profesor, (id+nombreCurso).
  //Dividiremos la cadena para obtener los datos que necesitamos, el primero será la id, el segundo el nombre del curso.
  cargarCurso(params.get("id").split("?")[0], params.get("id").split("=")[1]);

  //Agregamos un evento al enlace para cerrar la sesión.
  d.getElementById("cerrarSesion").addEventListener(
    "click",
    () => {
      cerrarSesion();
    },
    false
  );

  //Agregamos un evento al enlace para volver a la página principal.
  d.getElementById("home").addEventListener(
    "click",
    () => {
      window.location.href = "./home.html?id=" + params.get("id").split("?")[0];
    },
    false
  );

  //Agregamos un evento al enlace para ir al perfil del usuario.
  d.getElementById("perfil").addEventListener(
    "click",
    () => {
      window.location.href =
        "./perfil.html?id=" + params.get("id").split("?")[0];
    },
    false
  );
};
