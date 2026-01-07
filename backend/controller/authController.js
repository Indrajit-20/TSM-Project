const User = require("../model/Custmer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register

const register = async (req, res) => {
  try {
    const { name, email, phone_no, password, gender, address, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new Customer or Admin
    const newUser = new User({
      name,
      email,
      phone_no,
      password: hashedPassword,
      gender,
      address,
      role: role || "customer", // Defaults to customer unless specified
    });

    await newUser.save();
    // Step 2: Return Result
    res.status(201).json({
      message: "Registration Successfully",
      user: newUser,
    });

    // This part is inside your 'catch' block
  } catch (err) {
    // Log full error on server for easier debugging
    console.error(err);
    // If it's a Mongoose validation error, return 400 with details
    if (err.name === "ValidationError") {
      const errors = Object.keys(err.errors).reduce((acc, key) => {
        acc[key] = err.errors[key].message;
        return acc;
      }, {});
      return res.status(400).json({ message: "Validation Failed", errors });
    }

    res.status(500).json({
      message: "Registration Failed",
      error: err.message,
    });
  }
};

//Login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ messsage: "invalid email or password" });
    }

    // Compare the plain text password with the encrypted one in DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Login Failed" });
    }

    // We create the token now because the user is verified.
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Payload: Data hidden in the token
      "tsm", //  Secret Key
      { expiresIn: "1h" } // Expiry time
    );

    // send the response with the token
    return res.status(200).json({
      message: `welcome ${user.role}`,
      token: token, // Sending the key to the frontend
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Logiin Failed ",
      error: err.message,
    });
  }
};

module.exports = { register, login };
