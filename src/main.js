//Imports
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import {v2 as cloudinary} from 'cloudinary';
import cors from 'cors';
import dotenv from 'dotenv';
import imagenesRoutes from './routes/imagenesRoutes.js';
import { fileURLToPath } from 'url';
import homeRoutes from './routes/homeRoutes.js';


//Configuraciones
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

//Instancia de la aplicacion.
const app = express();
const PORT = process.env.PORT || 4000;
//Configuracion ejs
app.set('view engine', 'ejs');

//Middlewares
app.use(cors());
app.use(morgan());
app.use(helmet());
app.use(express.json());

//Public
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

//Rutas,
app.use('/api/imagenes', imagenesRoutes);
app.use( homeRoutes );

app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});
          
