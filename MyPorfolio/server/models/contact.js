import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
