import jwt from "jsonwebtoken";
import User from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "clave_super_secreta";

// Autenticación general
export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2) return res.status(401).json({ message: "Token error" });

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ message: "Malformed token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Find the user by ID from the token and attach it to the request
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user; // Now req.user contains the full user object (including role)
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Verificar si es admin
export const isAdmin = (req, res, next) => {
  // This will now work correctly because req.user is the full user object
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado: solo admin" });
  }
  next();
};
