"use strict";

import { cerrarSesion } from "../src/js/funcionesAutentificacion.js";
import { cargarUsuario } from "../src/js/funcionesUsuario.js";
window.onload = () => {
  const d = document;

  //Obtenemos la id recibida en la url mediante estos pasos.
  let params = new URLSearchParams(location.search);
  //Cargaremos el usuario para saber sus datos y pintar el perfil.
  cargarUsuario(params.get("id"));

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
      window.location.href = "./home.html?id=" + params.get("id");
    },
    false
  );
};
