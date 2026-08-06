import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * PUBLIC ROUTES
 */
// GET /api/projects - Get all project layouts
router.get('/', getAllProjects);

// GET /api/projects/:id - Get single project details by ID
router.get('/:id', getProjectById);

/**
 * PROTECTED ADMIN ROUTES (Require Bearer Token)
 */
// POST /api/projects - Create a new project layout
router.post('/', authMiddleware, createProject);

// PUT /api/projects/:id - Update an existing project layout
router.put('/:id', authMiddleware, updateProject);

// DELETE /api/projects/:id - Delete a project layout
router.delete('/:id', authMiddleware, deleteProject);

export default router;

