import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  getBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'aryans-buildcon/blogs',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, crop: 'limit', quality: 'auto' }],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

const router = express.Router();

// PUBLIC ROUTES
router.get('/', getBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/:id', getBlogById);

// PROTECTED ROUTES
router.post('/', authMiddleware, upload.single('image'), createBlog);
router.put('/:id', authMiddleware, upload.single('image'), updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

export default router;
