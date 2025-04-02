const { createToken } = require("../utils/jwt");

const Users = require("../models/Users.models");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      res.status(400).json({
        message: "Please provide required input [name, email, password]",
      });

    const isUserExist = await Users.findOne({ email });

    if (isUserExist)
      res.status(401).json({
        message: "Employee has been already exist. ",
      });

    const isFirstAdmin = (await Users.countDocuments({})) === 0;

    const role = isFirstAdmin ? "admin" : "employee";

    const position = role === "admin" ? "DB Adminstrator" : "Intern";

    const user = await Users.create({
      name,
      email,
      password,
    });
    const token = await createToken(user);

    res.cookie("access_workH_tkn", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 2,
    });

    res.status(201).json({
      message: "User Registered Successfully.",
      user,
      accessTkn: token,
    });
  } catch (error) {
    console.log("SignUp Error", error);
    res.status(400).json({ message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      res.status(400).json({
        message: "Please provide required input [email, password]",
      });

    const user = await Users.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: " User not found",
      });

    if (!(await user.comparePassword(password)))
      return res.status(401).json({
        message: "Wrong password.",
      });

    const token = await createToken(user);

    res.cookie("access_workH_tkn", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 2,
    });

    res.status(200).json({
      message: "User Registered Successfully.",
      user,
      accessTkn: token,
    });
  } catch (error) {
    console.log("Login Error", error);
    res.status(400).json({ message: error.message });
  }
};

const checkMe = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await Users.findById({ _id: userId });

    if (!user) res.status(404).json({ message: "No user found." });

    res.status(200).json({ message: "Token authenticated.", user });
  } catch (error) {
    console.log(error);
    res.status(200).json({});
  }
};

const logout = async (req, res) => {
  try {
    console.log(req.user);
    if (req.user) {
      res.clearCookie("access_workH_tkn");
    }

    res.status(200).json({ message: "You have been logged out." });
  } catch (error) {
    console.log("Error from logout", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login, logout, checkMe };
