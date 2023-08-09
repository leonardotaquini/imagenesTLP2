//Imports
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import {v2 as cloudinary} from 'cloudinary';
import cors from 'cors';
import dotenv from 'dotenv';
import imagenesRoutes from './routes/imagenesRoutes.js';

//Configuraciones
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

//Instancia de la aplicacion.
const app = express();
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 4000;

//Middlewares
app.use(cors());
app.use(morgan());
app.use(helmet());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//Rutas,
app.use('/api/imagenes', imagenesRoutes);

app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});
          
