const express = require("express");
const router = express.Router();

const {
  getPackages,
  addPackage,
  packageById,
  updatePackage,
  deletePackage,
  getAdminStats,
} = require("../controller/packageControler");
const { authMiddleware, isadmin } = require("../middleware/authMiddleware");

router.get("/", getPackages); //get all packages
router.post("/add", authMiddleware, isadmin, addPackage); //add package post request
router.get("/:id", packageById); //get package by id
router.put("/:id", authMiddleware, isadmin, updatePackage); //update package by id
router.delete("/:id", authMiddleware, isadmin, deletePackage); //delete package by id
router.get("/admin/stats", getAdminStats);

module.exports = router;
