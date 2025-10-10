import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  title: String,
  firstname: String,
  lastname: String,
  email: String,
  completion: Date,
  description: String,
});

const Education = mongoose.model("Education", educationSchema);
export default Education;
