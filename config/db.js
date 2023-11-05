import mongoose from "mongoose";

const conexionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conexion exitosa a la base de datos");
  } catch (error) {
    console.log(error);
  }
};

export default conexionDB;
