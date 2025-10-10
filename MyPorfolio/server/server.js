import dotenv from "dotenv";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// -------------------
// 🔐 CARGAR VARIABLES DE ENTORNO
// -------------------
dotenv.config({ path: path.resolve(process.cwd(), ".env") }); // <-- garantiza la ruta correcta

// Verificar que la variable se haya leído correctamente
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();

// -------------------
// 🧩 MIDDLEWARES
// -------------------
app.use(cors());
app.use(express.json()); // necesario para leer JSON en req.body

// -------------------
// 📦 Conexión a MongoDB
// -------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error de conexión:", err));

// -------------------
// 🚀 RUTAS PRINCIPALES
// -------------------
import contactRoutes from "./routes/contacts.js";
import projectRoutes from "./routes/projects.js";
import educationRoutes from "./routes/educations.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// -------------------
// 🧠 Ruta de prueba
// -------------------
app.get("/", (req, res) => {
  res.send("<h1>Portfolio Backend Running Successfully!</h1>");
});

// -------------------
// ❌ Manejo de rutas no encontradas
// -------------------
app.use((req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// -------------------
// 🔥 Iniciar servidor
// -------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
