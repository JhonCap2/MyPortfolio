import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import bcrypt from "bcrypt";

// -------------------
// Cargar variables de entorno
// -------------------
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// -------------------
// Conexión a MongoDB
// -------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error de conexión:", err));

// -------------------
// Modelo User
// -------------------
import User from "./models/user.js"; // ajusta la ruta si es necesario

// -------------------
// Función para actualizar contraseña
// -------------------
async function updatePassword(email, newPassword) {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      console.log("Usuario no encontrado");
      return;
    }

    console.log(`Contraseña actualizada para ${user.email}`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// -------------------
// Ejecutar script
// -------------------
const email = "adamesjcp@gmail.com"; // tu usuario
const newPassword = "Jh0nAd@m32.";   // la misma contraseña que usas

updatePassword(email, newPassword);
