import Project from "../models/project.js";

// Obtener todos los proyectos (todos los usuarios autenticados pueden leer)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener proyectos" });
  }
};

// Crear un proyecto (solo admin)
export const createProject = async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      createdBy: req.user.id // guardamos quién creó el proyecto
    });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Error al crear proyecto" });
  }
};

// Eliminar un proyecto (solo admin)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });
    res.json({ message: "Proyecto eliminado" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar proyecto" });
  }
};
