"use strict";

import { encontrarUsuario } from "../src/js/funcionesUsuario.js";

window.onload = () => {
  const d = document;
  //Obtenemos la id recibida en la url mediante estos pasos.
  let params = new URLSearchParams(location.search);
  //Buscaremos el usuario para saber que rol tiene.
  encontrarUsuario(params.get("id"));
};