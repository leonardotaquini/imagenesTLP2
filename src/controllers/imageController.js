import cloudinary from "cloudinary";
import fs from "fs";
import Imagen from "../models/Imagen.js";

const uploadImage = async (req, res) => {
  try {
    if (!req.files || !req.files.photo) {
      return res
        .status(400)
        .json({ message: "No se proporcionó ningún archivo" });
    }

    const image = req.files.photo;
    const imageName = image.name;
    const buffer = image.data;
    const tempPath = "./temp_image.jpg";

    //Verifico si existe la imagen en la db por su nombre

    const imagenDb = await Imagen.findOne({ nombre: imageName });
    if (imagenDb) {
      return res.status(400).json({ message: "La imagen ya existe" });
    }

    fs.writeFileSync(tempPath, buffer);

    const { url } = await cloudinary.uploader.upload(tempPath, {
      folder: "ipf",
      public_id: image.name,
    });

    fs.unlinkSync(tempPath);

    // Guardar la imagen en la db
    const imagen = new Imagen({
      nombre: image.name,
      url,
    });

    const imageSaved = await imagen.save();

    return res.status(201).json({ imageSaved });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await Imagen.find();
    if (!images) {
      return res.status(404).json({ message: "No hay imagenes" });
    }
    return res.status(200).json({ images });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const deleteImage = async (req, res) => {
  try {
    const id = req.params.id;
    const imageDeleted = await Imagen.findByIdAndDelete(id);
    if (!imageDeleted) {
      return res.status(404).json({ message: "No existe la imagen" });
    }
    return res.status(200).json({ msg: "Imagen eliminada" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
    
  }
}



export { uploadImage, getAllImages, deleteImage };
