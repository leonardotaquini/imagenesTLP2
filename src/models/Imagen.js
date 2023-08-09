import mongoose, { Mongoose } from "mongoose";

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

const Imagen = mongoose.model("Imagen", imagenSchema);

export default Imagen;