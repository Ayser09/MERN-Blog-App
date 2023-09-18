const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

//create user register user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "PLEASE FILL ALL DETAILS",
      });
    }
    //existing usercase
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "USER ALREADY EXISTS",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    //SAVE NEW USER
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "USER CREATED SUCCESSFULLY",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error in register callback",
      success: false,
      error,
    });
  }
};
//get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "USER CREATED SUCCESSFULLY",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error in getting all users",
      success: false,
      error,
    });
  }
};
//login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "PLEASE ENTER VALID CREDS",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email not registered",
      });
    }
    //password validation
    // password validation
    const isMatch = await bcrypt.compare(password, user.password); // Corrected typo 'passworwd' to 'password'
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "invalid password or creds",
      });
    }
    return res.status(200).send({
      success: true,
      message: "login succesfuly",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error in LOGIN try again",
      success: false,
      error,
    });
  }
};
