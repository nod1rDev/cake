import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Product from "../models/Product.js";

export const user = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const bakers = async (req, res) => {
  try {
    const bakers = await User.find({ role: "admin" }).select("-password");
    if (bakers.length === 0) {
      return res.status(404).json({ msg: "No bakers found" });
    }
    res.json(bakers);
  } catch (error) {
    console.error("Error fetching bakers:", error);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const baker = async (req, res) => {
  const { bakerId } = req.params;
  try {
    const products = await Product.find({ baker: bakerId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getBakerById = async (req, res) => {
  const { id } = req.params;
  try {
    const baker = await User.findById(id).select("-password");
    if (!baker) return res.status(404).json({ message: "Baker not found" });
    res.json(baker);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const register = async (req, res) => {
  const { name, email, password, role, bio, phone } = req.body;
  const image = req.file
    ? `/uploads/${req.file.filename}`
    : "/uploads/default.png";

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      image,
      bio,
      phone,
    });
    await user.save();

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const userData = {
      name: user.name,
      email: user.email,
      role: user.role || "user",
      bio: user.bio,
      phone: user.phone,
      image: user.image,
      _id: user._id,
    };

    res.json({ success: true, token, userData });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found with this email",
      });
    }

    // Debug log for password comparison
    console.log("Attempting password comparison for user:", email);

    // Use try-catch specifically for password comparison
    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        console.log("Password comparison failed");
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }
    } catch (bcryptError) {
      console.error("bcrypt comparison error:", bcryptError);
      return res.status(500).json({
        success: false,
        message: "Error verifying password",
      });
    }

    // If we get here, password matched
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, bio } = req.body;
    const userId = req.user.id;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;

    // Update image if uploaded
    if (req.file) {
      user.image = `/uploads/${req.file.filename}`;
    }

    // Save the updated user
    await user.save();

    // Return updated user data (without password)
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      bio: user.bio,
      image: user.image,
      role: user.role,
    };

    res.json({
      success: true,
      message: "Profile updated successfully",
      userData,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
