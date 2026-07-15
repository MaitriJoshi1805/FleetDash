const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try{
    const{name, email, password} = req.body;

    if(!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const existUser = await User.findOne({ email });

    if(existUser){
      return res.status(400).json({
        success: false,
        message: "Already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Register Successfully",
      user,
    });
  }
  catch(err){
    res.status(500).json({ 
      success: false,
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try{
    const { email,password } = req.body;

    if(!email || !password){
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(
        {
          id:"admin",
          email: process.env.ADMIN_EMAIL,
        },
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
      );

      return res.status(200).json({
        success: true,
        message: "Admin Login Successful",
        token,
        user: {
          id: "admin",
          name: "System Admin",
          email: process.env.ADMIN_EMAIL,
        },
      });
    }

    const user = await User.findOne({ email });

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token =  jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {expiresIn: "7d"}
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }
  catch(err){
    res.status(500).json({ 
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  register,
  login,
};