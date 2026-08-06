import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// List ALL resources, no prefix filter
const result = await cloudinary.api.resources({
  type: 'upload',
  max_results: 50,
});

if (result.resources.length === 0) {
  console.log('No resources found.');
} else {
  result.resources.forEach(r => console.log(r.public_id, '\n  ->', r.secure_url, '\n'));
}
