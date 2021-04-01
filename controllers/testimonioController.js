import { Testimonio } from "../models/Testimonios.js";
const guardarTestimonio = async (req, res) => {
  //validar formulario
  const { nombre, correo, mensaje } = req.body;
  const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  const errores = [];

  if (nombre.trim() === "") {
    errores.push({ mensaje: "El nombre está vacio" });
  }
  if (correo.trim() === "") {
    errores.push({ mensaje: "El correo está vacio" });
  }
  if (!emailRegex.test(correo)) {
    errores.push({ mensaje: "El correo es inválido" });
  }
  if (mensaje.trim() === "") {
    errores.push({ mensaje: "El mensaje está vacio" });
  }
  if (errores.length > 0) {
    //consultar testimoniales existentes
    const testimonios = await Testimonio.findAll();
    //mostrar errores en la vista
    res.render("testimonios", {
      pagina: "Testimonios",
      errores,
      nombre,
      correo: correo.toLowerCase(),
      mensaje,
      testimonios
    });
  } else {
    // guardar en DB
    try {
      await Testimonio.create({
        nombre,
        correo: correo.toLowerCase(),
        mensaje
      });

      res.redirect("/testimonios");
    } catch (error) {
      console.log("error :>> ", error);
    }
  }
};
export { guardarTestimonio };
