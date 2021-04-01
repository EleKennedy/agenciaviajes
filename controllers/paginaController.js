import { Viaje } from "../models/Viaje.js";
import { Testimonio } from "../models/Testimonios.js";

const paginaInicio = async (req, res) => {
  //consultar 3 viajes del modelo Viaje y 3 testimonios de Testimonios

  try {
    const viajes = Viaje.findAll({ limit: 3 });
    const testimonios = Testimonio.findAll({ limit: 3 });
    const test = await Promise.all([viajes, testimonios]);
    res.render("inicio", {
      pagina: "Inicio",
      clase: "home",
      viajes: test[0],
      testimonios: test[1]
    });
  } catch (error) {
    console.log(`error`, error);
  }
};
const paginaNosotros = (req, res) => {
  res.render("nosotros", {
    pagina: "Nosostros"
  });
};
const paginaViajes = async (req, res) => {
  //ConsultarBD
  try {
    const viajes = await Viaje.findAll();
    res.render("viajes", {
      pagina: "Próximos Viajes",
      viajes
    });
  } catch (error) {
    console.log(`error`, error);
  }
};
const paginaTestimonios = async (req, res) => {
  try {
    const testimonios = await Testimonio.findAll();
    res.render("testimonios", {
      pagina: "Testimonios",
      testimonios
    });
  } catch (error) {
    console.log("error :>> ", error);
  }
};
//mostrar pag detalle viaje por slug
const paginaDetalleViaje = async (req, res) => {
  const { slug } = req.params;
  try {
    const viaje = await Viaje.findOne({ where: { slug } });
    res.render("viaje", {
      pagina: "Info Viajes",
      viaje
    });
  } catch (error) {
    console.log(`error`, error);
  }
};

export { paginaInicio, paginaNosotros, paginaViajes, paginaTestimonios, paginaDetalleViaje };
