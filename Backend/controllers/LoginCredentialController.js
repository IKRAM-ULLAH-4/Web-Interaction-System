import LoginCredentials from "../models/LoginCredentials.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || "token";

function parseCookieMaxAge(exp) {
  if (typeof exp === "number") return exp * 1000;
  const m = (exp || "").toString().match(/^(\d+)(s|m|h|d)$/);
  if (!m) return 60 * 60 * 1000;
  const val = Number(m[1]);
  switch (m[2]) {
    case "s": return val * 1000;
    case "m": return val * 60 * 1000;
    case "h": return val * 60 * 60 * 1000;
    case "d": return val * 24 * 60 * 60 * 1000;
    default: return 60 * 60 * 1000;
  }
}

export const createCredentials = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) return res.status(400).json({ message: "Missing required fields" });

    const existing = await LoginCredentials.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = new LoginCredentials({
      fullName,
      email,
      password: hashed,
      avatar: "/uploads/Ikram.jpeg",
    });

    await newUser.save();

    const payload = { id: newUser._id, email: newUser.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: parseCookieMaxAge(JWT_EXPIRES_IN),
    });

    res.status(201).json({
      message: "User created",
      user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email, avatar: newUser.avatar },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Error saving user" });
  }
};

export const getLoginCredentials = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing email or password" });

    const user = await LoginCredentials.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: parseCookieMaxAge(JWT_EXPIRES_IN),
    });

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, fullName: user.fullName, email: user.email, avatar: user.avatar },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.json({ message: "Logged out" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    const user = await LoginCredentials.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error("Get current user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};