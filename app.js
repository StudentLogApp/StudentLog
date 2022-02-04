import express from "express";
const app = express();

//settings
app.set("port", 8080);

app.listen(app.get("port"), () => {
  console.log(`Aplicación desplegada en el puerto ${app.get("port")}`);
});

app.set("views", "./vistas");
app.set("view engine", "ejs");

//middlewares
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", async (req, res) => {
  const peticion = await getDocs(usuariosColeccion);
  const { docs } = peticion;
  const usuarios = docs.map((usuario) => ({
    id: usuario.id,
    datos: usuario.data(),
  }));
  console.log(usuarios);
  res.render("index");
});

app.post("/registrar", async (req, res) => {
  const usuario = {
    correo: req.body.correo,
    nombre: req.body.nombre,
    contra: req.body.contra,
    rol: req.body.rol,
  };

  await addDoc(usuariosColeccion, usuario);
  res.redirect("/");
});
