import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './database/connectDB.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const app = express();
  const PORT = process.env.PORT || 5000;

  // STEP 1: Connect to MongoDB
  await connectDB();
  console.log('[Server] MongoDB ready, starting HTTP server...');

  const allowedOrigins = [
    process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://aryansbuildcon.onrender.com',
    'https://aryansbuildconproject-seven.vercel.app',
  ];

  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: Origin ${origin} not allowed`));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // STEP 3: Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Aryans Buildcon Backend Server',
      database: 'MongoDB (Mongoose)',
      timestamp: new Date().toISOString(),
    });
  });

  // STEP 4: API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/inquiries', inquiryRoutes);
  app.use('/api/upload', uploadRoutes);

  // STEP 6: Global Error Handler
  app.use(errorHandler);

  // STEP 7: Serve Production Build
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, '../frontend/dist');
    app.use(express.static(distPath));
    app.get('/{*any}', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // STEP 8: Start Server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} → http://127.0.0.1:${PORT}`);
  });
})();
