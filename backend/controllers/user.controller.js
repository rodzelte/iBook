import bcrypt from "bcrypt";
import User from "../models/user.schema.js";
import mongoose from "mongoose";

export const getUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log("Error in fetching users: ", error.message);
  }
};

export const createUser = async (req, res) => {
  const { name, password, email, address, age, username } = req.body;

  // Check if all required fields are provided
  if (!name || !password || !email || !address || !age || !username) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Email and password validation (optional but recommended)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password should be at least 6 characters",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or username already exists",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      password: hashedPassword, // Save the hashed password
      email,
      address,
      age,
      username,
    });

    // Save user to database
    await newUser.save();

    // Return success response
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error in saving user:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid or Not Found User ID",
      error: err.message,
    });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.error(`Error deleting user with id ${id}:`, err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: err.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid or Not Found User ID",
      error: err.message,
    });
  }

  try {
    const updateUser = await User.findByIdAndUpdate(id, product, { new: true });
    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (err) {
    console.error(`Error update user with id ${id}:`, err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: err.message,
    });
  }
};
