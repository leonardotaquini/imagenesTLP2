import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const conectarDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            dbName:process.env.DB_NAME
        });

        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MongoDB conectado en ${url}`)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default conectarDB;