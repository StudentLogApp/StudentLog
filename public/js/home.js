"use strict";

import { cerrarSesion } from "../src/js/funcionesAutentificacion.js";
import { encontrarUsuario } from "../src/js/funcionesUsuario.js";

window.onload = () => {
  const d = document;
  //Obtenemos la id recibida en la url mediante estos pasos.
  let params = new URLSearchParams(location.search);
  //Buscaremos el usuario para saber que rol tiene.
  encontrarUsuario(params.get("id"));

  d.getElementById("cerrarSesion").addEventListener(
    "click",
    () => {
      cerrarSesion();
    },
    false
  );

  d.getElementById("perfil").addEventListener(
    "click",
    () => {
      window.location.href = "./perfil.html?id=" + params.get("id");
    },
    false
  );
};
