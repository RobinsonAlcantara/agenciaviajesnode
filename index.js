//const express = require('express'); //Common JS
import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

const app = express();


//Conectar la base de datos
db.authenticate()
    .then(()=> console.log("Base de datos conectada"))
    .catch(error =>console.log(error));

//Definir puerto
const port = process.env.PORT || 4000;

//habilitar PUG
app.set("view engine","pug");

//Obtener el año actual
app.use((req, res, next)=>{
    const year = new Date();

    res.locals.nombreSitio = "Agencia de Viajes";
    res.locals.actualYear=year.getFullYear();

    next();
})

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//Definir la carpeta public
app.use(express.static("public"));

//Agregar router
app.use("/",router);


app.listen(port, ()=>{
    console.log(`El servidor se esta ejecutando en el puerto ${port}`);
})