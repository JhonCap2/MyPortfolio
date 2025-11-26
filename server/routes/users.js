import express from "express";
import User from "../models/user.js";
import { authenticate, isAdmin } from "../middlewares/auth.js";
import mongoose from "mongoose";

const router = express.Router();

// Obtener todos los usuarios (protegido para admin)
router.get("/", authenticate, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a user (Admin only)
router.put("/:id", authenticate, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body; // Admin can change name, email, or role

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Find the user and update their details
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true } // Return the updated document
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Eliminar usuario por id
router.delete("/:id", authenticate, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado correctamente", user: deletedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
