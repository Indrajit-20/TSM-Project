const jwt = require("jsonwebtoken");

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  
  const authHeader = req.header("Authorization") || req.header("authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Login required! No token found." });
  }

  
  const token =
    typeof authHeader === "string" && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

  try {
    const verified = jwt.verify(token, "tsm"); 
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
