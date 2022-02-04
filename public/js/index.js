"use strict";
import { crearUsuario, iniciarSesion } from '../../src/js/funcionesAutentificacion.js';

var d = document;
/*Entrar*/
d.getElementById("entrar").addEventListener("click", (ev) => {
  ev.preventDefault();
  var correo = d.getElementById("correoLogin").value;
  var contra = d.getElementById("contrasenyaLogin").value;
  iniciarSesion(correo, contra);
});
/*Ir a registro*/
d.getElementById("irRegistro").addEventListener("click", (ev) => {
  ev.preventDefault();
  d.getElementById("formLogin").classList.add("logueado");
  d.getElementById("formRegistro").classList.add("aparecer");
});
/*Volver*/
d.getElementById("volver").addEventListener("click", (ev) => {
  ev.preventDefault();
  window.location.reload();
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
  crearUsuario(datos);
  d.getElementById("formRegistro").classList.remove("aparecer");
  d.getElementById("formLogin").classList.remove("logueado");
});
