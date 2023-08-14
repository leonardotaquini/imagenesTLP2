import mongoose from "mongoose";
import { body } from "express-validator";



const imagenSchema = new mongoose.Schema({
    url: {
        type: String,
        required:true,
        trim:true,
    },
    nombre:{
        type: String,
        required: true,
        trim:true,
    }
});

export const createImageSchema = [
    body("url").not().isEmpty().withMessage("La url es obligatoria"),
    body("nombre").not().isEmpty().withMessage("El nombre es obligatorio"),

]

const Imagen = mongoose.model("Imagen", imagenSchema);

export default Imagen;