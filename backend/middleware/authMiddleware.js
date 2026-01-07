const jwt = require("jsonwebtoken");

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  // Read header (frontend may send 'Bearer <token>' or the raw token)
  const authHeader = req.header("Authorization") || req.header("authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Login required! No token found." });
  }

  // Support both 'Bearer <token>' and raw token formats
  const token =
    typeof authHeader === "string" && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

  try {
    const verified = jwt.verify(token, "tsm"); // consider moving secret to env var
    req.user = verified;
    return next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

// isadmin middleware
const isadmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({ message: "Admin access required" });
};

module.exports = { authMiddleware, isadmin };
