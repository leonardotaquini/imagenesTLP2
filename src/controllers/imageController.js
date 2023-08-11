import cloudinary from "cloudinary";

const uploadImage = async (req, res) => {
  try {   
    // // Validaciones
    if (!req.files) {
      return res.status(400).json({ msg: "No hay archivos que subir" });
    }

    const file = req.files.photo;
    console.log(file);
   

    if (!file.mimetype.startsWith("image")) {
      return res.status(400).json({ msg: "El archivo no es una imagen" });
    }
    

  } catch (error) {
    res.status(error.status || 500).json({ msg: error });
  }
};

export { uploadImage };
