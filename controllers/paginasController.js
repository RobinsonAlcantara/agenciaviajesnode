import { Viaje } from "../models/Viaje.js";
import {Testimonial} from "../models/Testimoniales.js";

const paginaInicio = async (request,response)=>{ //Request: lo que enviamos y response: Lo que express nos responde
    
    
    //Utilizando promises para ejecutar las consultas al mismo tiempo
    const promiseDB =[];
    //Consultar 3 viajes del modelo viaje
    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Testimonial.findAll({limit:3}));

    try {
        //Ejecucion de los promises al mismo tiempo ya que ninguno depende del otro
        const resultado = await Promise.all(promiseDB);       

        response.render("inicio",{
            pagina : "Inicio",
            clase: "home",
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }
    
};

const paginaNosotros = (request,response)=>{ //Request: lo que enviamos y response: Lo que express nos responde    
    response.render("nosotros",{
        pagina : "Nosotros"
    });
};

const paginaViajes = async (request,response)=>{ //Request: lo que enviamos y response: Lo que express nos responde

    //Consultando la base de datos
    const viajes = await Viaje.findAll();

    response.render("viajes",{
        pagina : "Proximos viajes",
        viajes
    });
};

const paginaTestimoniales = async (request,response)=>{ //Request: lo que enviamos y response: Lo que express nos responde

    try {
        const testimoniales = await Testimonial.findAll();

        response.render("testimoniales",{
            pagina : "Testimoniales",
            testimoniales
        });

    } catch (error) {
        console.log(error)
    }
    
};

//Muestra un viaje por su slug
const paginaDetalleViaje = async (request,response)=>{ 
    const {slug} = request.params;
    try {
        const viaje = await Viaje.findOne({where : {slug}});
        response.render("viaje", {
            pagina: "Informacion Viaje",
            viaje
        })
    } catch (error) {
        console.log(error);
    }
    
    
};

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}
