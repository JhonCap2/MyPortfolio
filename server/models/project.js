import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  completion: { type: Date },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // quien lo creó
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);
export default Project;
