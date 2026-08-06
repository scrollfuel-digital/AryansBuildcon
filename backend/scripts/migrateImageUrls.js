// Run once: node backend/scripts/migrateImageUrls.js
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import mongoose from 'mongoose';
import ProjectModel from '../models/Project.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const updates = [
  {
    title: 'Govindraj Nagari',
    imageUrl: 'https://res.cloudinary.com/ds1y9wivv/image/upload/v1786015615/govindraj_uz2ohu.png',
  },
  {
    title: 'Amrutsiddhi',
    imageUrl: 'https://res.cloudinary.com/ds1y9wivv/image/upload/v1786015613/amrutsiddhi_mgfq9i.png',
  },
];

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('[DB] Connected');

  for (const { title, imageUrl } of updates) {
    const result = await ProjectModel.findOneAndUpdate(
      { title: { $regex: new RegExp(title, 'i') } },
      { imageUrl },
      { returnDocument: 'after' }
    );
    console.log(result ? `✓ "${result.title}" → ${result.imageUrl}` : `✗ Not found: "${title}"`);
  }

  await mongoose.disconnect();
  console.log('[DB] Done');
}

migrate().catch(console.error);
