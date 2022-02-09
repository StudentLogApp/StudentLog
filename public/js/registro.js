"use strict";
import { crearUsuario } from "../../src/js/funcionesAutentificacion.js";

var d = document;

/Volver/;
d.getElementById("volver").addEventListener("click", (ev) => {
  ev.preventDefault();
  window.location.href = "./index.html";
});
/Registrarse/;
d.getElementById("registrarse").addEventListener("click", (ev) => {
  ev.preventDefault();
  if (d.getElementById("nombre").value == "") {
    console.log("Escribe un nombre de usuario");
  } else if (d.getElementById("select").value == "elegir") {
    console.log("Selecciona una opción válida");
  } else {
    var datos = {
      correo: d.getElementById("correo").value,
      nombre: d.getElementById("nombre").value,
      contra: d.getElementById("contrasenya").value,
      rol: d.getElementById("select").value,
    };
    crearUsuario(datos);
  }
});
