const jwt = require("jsonwebtoken");

//Authentication Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Login required! No token found." });
  }
  try {
    const verified = jwt.verify(token, "tsm"); // seceret key tsm we crate in authController.js
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "inavlid token or expired " });
  }
};

//isadmin middleware

const isadmin = (req,res,next)=>{
  if(req.user && req.user.role === "admin"){
    next();
  }else
  {

    res.status(403).json({ message: "Admin access required" });
  }
  
};

module.exports = { authMiddleware, isadmin };