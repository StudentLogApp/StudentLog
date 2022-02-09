"use strict";
import { iniciarSesion } from "../../src/js/funcionesAutentificacion.js";

var d = document;

window.onload = () => {
  /Entrar/;
  d.getElementById("entrar").addEventListener("click", (ev) => {
    ev.preventDefault();
    const correo = d.getElementById("correoLogin").value;
    const contra = d.getElementById("contrasenyaLogin").value;
    iniciarSesion(correo, contra);
  });
  /Ir a registro/;
  d.getElementById("irRegistro").addEventListener("click", (ev) => {
    ev.preventDefault();
    window.location.href = "./registro.html";
  });
};
