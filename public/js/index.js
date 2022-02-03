"use strict";
var d = document;

/*Entrar*/
d.getElementById("entrar").addEventListener("click", (ev) => {
  ev.preventDefault();
  var correo = d.getElementById("correoLogin");
  var contra = d.getElementById("contrasenyaLogin");
  //iniciarSesion(correo, contra);
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
    correo: d.getElementById("correo"),
    nombre: d.getElementById("nombre"),
    contra: d.getElementById("contrasenya"),
    rol: d.getElementById("rol"),
  };
  //crearUsuario(datos);
  console.log(datos);
  d.getElementById("formRegistro").classList.remove("aparecer");
  d.getElementById("formLogin").classList.remove("logueado");
});
