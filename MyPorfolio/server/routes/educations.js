import express from "express";
import mongoose from "mongoose";
import Education from "../models/Education.js";

const router = express.Router();

// GET todas las educaciones
router.get("/", async (req, res) => {
  try {
    const educations = await Education.find();
    res.json(educations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST crear educación
router.post("/", async (req, res) => {
  try {
    const newEducation = await Education.create(req.body);
    res.status(201).json(newEducation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT actualizar educación
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID de educación inválido" });
  }

  try {
    const updated = await Education.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Educación no encontrada" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE eliminar educación
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID de educación inválido" });
  }

  try {
    const deleted = await Education.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Educación no encontrada" });
    }

    res.json({ message: "Educación eliminada correctamente", deleted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
