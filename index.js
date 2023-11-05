import express from "express";
import dotenv from "dotenv";
dotenv.config();
//Routes
import authRoutes from "./routes/authRoutes.js";
import conexionDB from "./config/db.js";

const app = express();

//Base de datos
await conexionDB();

//Habilitar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use("/api/auth", authRoutes);

const PORT = 6000;
app.listen(PORT, () => {
  console.log(`Escuchando servidor desde el puerto ${PORT}`);
});
