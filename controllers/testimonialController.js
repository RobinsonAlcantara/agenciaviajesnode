import {Testimonial} from "../models/Testimoniales.js";

const guardarTestimonial = async (request,response)=>{

    //validar...
    const {nombre, correo, mensaje} = request.body;

    const errores = [];
    
    if(nombre.trim() === ""){
        errores.push({mensaje: "El nombre esta vacio"});
    }

    if(correo.trim() === ""){
        errores.push({mensaje: "El correo esta vacio"});
    }
    
    if(mensaje.trim() === ""){
        errores.push({mensaje: "El mensaje esta vacio"});
    }

    if(errores.length>0){
        const testimoniales = await Testimonial.findAll();

        response.render("testimoniales",{
            pagina : "Testimoniales",
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    }else{
        //  Almacenar en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            response.redirect("/testimoniales");

        } catch (error) {
            console.log(error);
        }
    }

}

export {
    guardarTestimonial
}