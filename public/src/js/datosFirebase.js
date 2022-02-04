"use strict";
// Importar las funcones necesarias desde su biblioteca.
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Configurar el objeto con los datos de acceso de Firesbase.
const firebaseConfig = {
  apiKey: "AIzaSyBSAE3aO0lvL4CWw5PRtNf3guIU_1fOff0",
  authDomain: "studentlog-a078e.firebaseapp.com",
  projectId: "studentlog-a078e",
  storageBucket: "studentlog-a078e.appspot.com",
  messagingSenderId: "231869574348",
  appId: "1:231869574348:web:c78e9a2e143ac974856669",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const autentificacion = getAuth(app);