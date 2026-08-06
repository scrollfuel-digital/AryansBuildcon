import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import User from '../models/User.js';

export async function loginAdmin(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }

  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username.toLowerCase().trim() });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      // Same message for both — don't reveal which field is wrong
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({
      success: true,
      token,
      admin: { username: user.username, role: user.role },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Authentication failed.' });
  }
}

export async function signupAdmin(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }

  // Signup requires a secret key — prevents public account creation
  const { username, password, signupSecret } = req.body;
  if (!signupSecret || signupSecret !== process.env.SIGNUP_SECRET) {
    return res.status(403).json({ success: false, message: 'Invalid signup secret.' });
  }

  try {
    const normalizedUsername = username.toLowerCase().trim();
    const existing = await User.findOne({ username: normalizedUsername });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Username already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await User.create({ username: normalizedUsername, passwordHash, role: 'admin' });

    return res.status(201).json({ success: true, message: 'Admin account created successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Signup failed.' });
  }
}

export async function verifyToken(req, res) {
  return res.json({ success: true, user: req.user });
}
