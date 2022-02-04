"use strict";
var d = document;

/*Entrar*/
d.getElementById("entrar").addEventListener("click", (ev) => {
  ev.preventDefault();
  var correo = d.getElementById("correoLogin");
  var contra = d.getElementById("contrasenyaLogin");
  //iniciarSesion(correo, contra);
  window.location.href = "./home.html";
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
    correo: d.getElementById("correo"),
    nombre: d.getElementById("nombre"),
    contra: d.getElementById("contrasenya"),
    rol: d.getElementById("rol"),
  };
  //crearUsuario(datos);
  console.log(datos);
});
