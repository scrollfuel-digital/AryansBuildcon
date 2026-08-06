import express from 'express';
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from '../controllers/inquiryController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * PUBLIC ROUTE - Customer Contact Form Submission
 */
// POST /api/inquiries - Submit an inquiry/lead
router.post('/', createInquiry);

/**
 * PROTECTED ADMIN ROUTES (Require Bearer Token)
 */
// GET /api/inquiries - Retrieve all customer leads
router.get('/', authMiddleware, getInquiries);

// PUT /api/inquiries/:id - Update lead status (e.g., 'New', 'Contacted', 'Site Visit Scheduled', 'Closed')
router.put('/:id', authMiddleware, updateInquiryStatus);

// DELETE /api/inquiries/:id - Delete an inquiry record
router.delete('/:id', authMiddleware, deleteInquiry);

export default router;

