// // sintaxis common.js --> const express = require("express");
import express from "express"; //agregar type module en el json
import router from "./routes/index.js";
import db from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
//conectar database
db.authenticate()
  .then(() => console.log("DB conected"))
  .catch(error => console.log(error, "error"));

//definir puerto
const port = process.env.PORT || 4000;

const host = process.env.HOST || "0.0.0.0";

//habilitar pug
app.set("view engine", "pug");

// obtener año actual
app.use((req, res, next) => {
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombreSitio = "Agencia de viajes";

  next();
});
//add body parser para leer datos de form
app.use(express.urlencoded({ extended: true }));

//definir carpeta publica
app.use(express.static("public/"));
//add router
app.use("/", router);
app.listen(port, host, () => {
  console.log(`Server is in the port ${port}`);
});
