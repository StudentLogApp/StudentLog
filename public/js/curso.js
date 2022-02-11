"use strict";

import { cerrarSesion } from "../src/js/funcionesAutentificacion.js";
import { cargarCurso } from "../src/js/funcionesCurso.js";
window.onload = () => {
  const d = document;

  //Obtenemos la id recibida en la url mediante estos pasos.
  let params = new URLSearchParams(location.search);
  //Dividiremos la cadena para obtener los datos que necesitamos, el primero será la id, el segundo el nombre del curso.
  cargarCurso(params.get("id").split('?')[0], params.get("id").split('=')[1]);

  d.getElementById("cerrarSesion").addEventListener(
    "click",
    () => {
      cerrarSesion();
    },
    false
  );

  d.getElementById("home").addEventListener(
    "click",
    () => {
      window.location.href = "./home.html?id=" + params.get("id").split('?')[0];
    },
    false
  );

  d.getElementById("perfil").addEventListener(
    "click",
    () => {
      window.location.href = "./perfil.html?id=" + params.get("id").split('?')[0];
    },
    false
  );
};
