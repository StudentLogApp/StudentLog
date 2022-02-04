"use strict";
import { crearUsuario, iniciarSesion } from '../../src/js/funcionesAutentificacion.js';

var d = document;
/*Entrar*/
d.getElementById("entrar").addEventListener("click", (ev) => {
  ev.preventDefault();
});
/*Ir a registro*/
d.getElementById("irRegistro").addEventListener("click", (ev) => {
  ev.preventDefault();
  window.location.href = "./registro.html";
});
/*Volver*/
d.getElementById("volver").addEventListener("click", (ev) => {
  ev.preventDefault();
  window.location.href = "./index.html";
});
/*Registrarse*/
d.getElementById("registrarse").addEventListener("click", (ev) => {
  ev.preventDefault();
  var datos = {
    correo: d.getElementById("correo").value,
    nombre: d.getElementById("nombre").value,
    contra: d.getElementById("contrasenya").value,
    rol: d.getElementById("select").value,
  };
});
