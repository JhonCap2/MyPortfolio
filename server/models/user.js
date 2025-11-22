import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // 👇 Campo agregado para roles
  role: { 
    type: String, 
    enum: ["user", "admin"], 
    default: "user" 
  },

  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
