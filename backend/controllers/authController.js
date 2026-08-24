const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/token");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;  // Store the refresh token in the database
    await user.save();  // Save the user with the new refresh token

    res.cookie("refreshToken", refreshToken, {   // Set the refresh token as an HTTP-only cookie
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",

      accessToken,   // Return the access token in the response body

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const {refreshToken} = req.cookies;   // Get the refresh token from the HTTP-only cookie

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token missing",
      });
    }

    const decoded = jwt.verify(   // Verify the refresh token using the secret key
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const newAccessToken = generateAccessToken(user);   // Generate a new access token for the user

    res.json({
      accessToken: newAccessToken,   // Return the new access token in the response body
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
};

const logout = async (req, res) => {
  try {
    const {refreshToken} = req.cookies;

    if (refreshToken) {
      const user = await User.findOne({
        refreshToken,
      });

      if (user) {
        user.refreshToken = null;    // Clear the refresh token from the user's record in the database
        await user.save();
      }
    }

    res.clearCookie("refreshToken", {   // Clear the refresh token cookie from the client
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  register,
  login,
  refreshAccessToken,
  logout,
};