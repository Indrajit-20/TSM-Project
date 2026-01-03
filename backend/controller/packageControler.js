const TourPackage = require("../model/TourPackage");


//get all packages
const getPackages = async (req, res) => {
  try {
    const packages = await TourPackage.find();
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

//get one package by id
const packageById = async (req, res) => {
  try {
    const pkg = await TourPackage.findById(req.params.id);
    if(!pkg){
       res.status(200).json({ message: "Package not found" });
    }
    res.status(200).json(pkg);  
  } catch (err) {
    res.status(500).json({ message: "error", error: err.message });

  }
};

//add package
const addPackage = async (req, res) => {
  try {
    //get all detail form page
    const {
      name,
      destination,
      price,
      duration,
      image_url,
      package_type,
      description,
    } = req.body;

    const newpackage = new TourPackage({
      name,
      destination,
      price,
      duration,
      image_url,
      package_type,
      description,
    });

    await newpackage.save();
    res.status(201).json(newpackage);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

//update package
const updatePackage = async (req, res) => {
  const { id } = req.params;
  try {
    const updatePackage = await TourPackage.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatePackage);
  } catch (err) {
    res.status(500).json({ message: "Update Failed" }, err.message);
  }
};

//delete package
const deletePackage = async (req, res) => {
  try {
    await TourPackage.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Package Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete Faild" }, err.message);
  }
};

module.exports = { getPackages, addPackage ,deletePackage,updatePackage, packageById};
