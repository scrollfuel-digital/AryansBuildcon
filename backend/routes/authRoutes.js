import express from 'express';
import rateLimit from 'express-rate-limit';
import { body } from 'express-validator';
import { loginAdmin, signupAdmin, verifyToken } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// ── Rate Limiters ─────────────────────────────────────────
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  skipSuccessfulRequests: true,
  message: { success: false, message: 'Too many login attempts. Try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: { success: false, message: 'Too many signup attempts. Try again in 1 hour.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Validators ────────────────────────────────────────────
const loginValidation = [
  body('username').trim().notEmpty().withMessage('Username is required.').isLength({ max: 50 }),
  body('password').notEmpty().withMessage('Password is required.').isLength({ max: 128 }),
];

const signupValidation = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required.')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be 3–30 characters.')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores.'),
  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
    .matches(/[0-9]/).withMessage('Password must contain at least one number.')
    .isLength({ max: 128 }),
  body('signupSecret').notEmpty().withMessage('Signup secret is required.'),
];

// ── Routes ────────────────────────────────────────────────
router.post('/login', loginLimiter, loginValidation, loginAdmin);
router.post('/signup', signupLimiter, signupValidation, signupAdmin);
router.get('/verify', authMiddleware, verifyToken);

export default router;
