import Sequelize from "sequelize";
import db from "../config/db.js";

//Definiendo el modelo
export const Testimonial = db.define("testimoniales",{
    nombre: {type: Sequelize.STRING},
    correo : {type: Sequelize.STRING},
    mensaje: {type: Sequelize.STRING}    
});