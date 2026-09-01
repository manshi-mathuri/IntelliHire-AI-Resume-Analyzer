const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


async function registerUser(req, res) {

  const { name, email, password } = req.body;

  const existingUser = await UserModel.findOne({ email: email });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserModel.create({
    name: name,
    email: email,
    password: hashedPassword
  });

  return res.status(201).json({
    message: "User registered successfully"
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.status(400).json({
      message: "User not found"
    })
    
  }
  
  
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Invalid password"
    });
  }
  
  const token = jwt.sign(
    {
      userId: user._id},
    process.env.JWT_SECRET
  );
  
  return res.status(200).json({
    message: "Login successful",
    token: token
  });
}

async function getProfile(req, res) {
  const user = await UserModel.findById(req.userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  return res.status(200).json({
    name: user.name,
    email: user.email
  });
}

module.exports = {
  registerUser, loginUser,getProfile
};