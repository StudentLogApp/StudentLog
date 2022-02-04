import express from "express";
const app = express();

//settings
app.set("port", 8080);

app.listen(app.get("port"), () => {
  console.log(`Aplicación desplegada en el puerto ${app.get("port")}`);
});

//middlewares
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
