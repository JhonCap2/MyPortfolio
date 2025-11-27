import express from "express";
import mongoose from "mongoose";
import Project from "../models/project.js";
import { authenticate, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// GET todos los proyectos (público para que todos puedan verlos)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST crear proyecto (solo admin)
router.post("/", authenticate, isAdmin, async (req, res) => {
  try {
    const newProject = await Project.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT actualizar proyecto (solo admin)
router.put("/:id", authenticate, isAdmin, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID de proyecto inválido" });
  }

  try {
    const updated = await Project.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Proyecto no encontrado" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE eliminar proyecto (solo admin)
router.delete("/:id", authenticate, isAdmin, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID de proyecto inválido" });
  }

  try {
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Proyecto no encontrado" });

    res.json({ message: "Proyecto eliminado correctamente", deleted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
