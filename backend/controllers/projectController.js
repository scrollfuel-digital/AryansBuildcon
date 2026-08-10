import mongoose from 'mongoose';
import ProjectModel from '../models/Project.js';

const isDBConnected = () => mongoose.connection.readyState === 1;

const CDN = 'https://res.cloudinary.com/ds1y9wivv/image/upload/aryans-buildcon';

const defaultProjects = [
  {
    title: 'Govindraj Nagari',
    category: 'Premium Layout',
    location: 'Mouza-Tamaswadi, Wardha Road Corridor, Nagpur',
    area: '97 Plots | 23,856 SQ.M.',
    price: '22.5',
    priceUnit: 'Lakhs onwards',
    status: 'Ongoing',
    imageUrl: `${CDN}/govindraj.png`,
    googleMapsUrl: 'https://maps.google.com/?q=Mouza+Tamaswadi+Wardha+Road+Nagpur',
    sanctionStatus: 'NATP SANCTIONED',
    description: 'Govindraj Nagari is an NATP Sanctioned residential layout situated on Kh.No. 31, 32, 33 at Mouza-Tamaswadi, just 2 KM from Wardha-Nagpur Road.',
    features: ['Grand Entrance Gate', 'Wide Tar Road Network', 'Electric Pole Network', 'Lush Plantation', 'Landscaped Garden Park'],
  },
  {
    title: 'Amrutsiddhi',
    category: 'Investment Layout',
    location: 'Mouza Deoli (Nistane), Kh. No. 21/1,4,5, Nagpur',
    area: '47 Acres | 463 Plots',
    price: '18.9',
    priceUnit: 'Lakhs onwards',
    status: 'Ongoing',
    imageUrl: `${CDN}/amrutsiddhi.png`,
    googleMapsUrl: 'https://maps.google.com/?q=Mouza+Deoli+Nistane+Nagpur',
    sanctionStatus: 'NATP SANCTIONED',
    description: 'Amrutsiddhi is a sprawling 47-acre gated plotted community featuring 463 premium demarcated plots at Mouza Deoli (Nistane).',
    features: ['NATP Sanctioned', 'Wide Tar Roads', 'Electricity Points', 'Common Well Water', 'Grand Security Gate'],
  },
];

async function seedIfEmpty() {
  if (!isDBConnected()) return;
  const count = await ProjectModel.countDocuments();
  if (count === 0) {
    await ProjectModel.insertMany(defaultProjects);
    console.log('[DB] Seeded default projects into MongoDB');
  }
}

export async function getAllProjects(req, res) {
  try {
    await seedIfEmpty();
    if (isDBConnected()) {
      const projects = await ProjectModel.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: projects.length, data: projects });
    }
    return res.json({ success: true, count: 0, data: [] });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getProjectById(req, res) {
  try {
    const { id } = req.params;
    if (isDBConnected()) {
      // Try MongoDB _id first, then fall back to slug-based title match
      let project = await ProjectModel.findById(id).catch(() => null);
      if (!project) {
        // Convert slug like 'proj-amrutsiddhi' → 'amrutsiddhi' → match title
        const titleSlug = id.replace(/^proj-/, '').replace(/-/g, ' ');
        project = await ProjectModel.findOne({
          title: { $regex: new RegExp(titleSlug, 'i') }
        });
      }
      if (project) return res.json({ success: true, data: project });
    }
    return res.status(404).json({ success: false, message: 'Project not found' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function createProject(req, res) {
  try {
    const { title, category, location, area, price, priceUnit, status, imageUrl, googleMapsUrl, sanctionStatus, description, features } = req.body;

    if (!title || !location || !area) {
      return res.status(400).json({ success: false, message: 'Title, location, and area are required.' });
    }

    const payload = {
      title,
      category: category || 'Plotted Layout',
      location,
      area,
      price: price || 'Price on Request',
      priceUnit: priceUnit || 'Lakhs',
      status: status || 'Ongoing',
      imageUrl: imageUrl || '',
      googleMapsUrl: googleMapsUrl || '',
      sanctionStatus: sanctionStatus || 'NATP Sanctioned',
      description: description || '',
      features: Array.isArray(features) ? features : (features ? features.split(',').map(f => f.trim()) : []),
    };

    if (!isDBConnected()) {
      return res.status(503).json({ success: false, message: 'Database not connected' });
    }
    const created = await ProjectModel.create(payload);

    return res.status(201).json({ success: true, message: 'Project added successfully!', data: created });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateProject(req, res) {
  try {
    const { id } = req.params;
    if (!isDBConnected()) {
      return res.status(503).json({ success: false, message: 'Database not connected' });
    }
    const updated = await ProjectModel.findByIdAndUpdate(id, req.body, { returnDocument: 'after' });
    if (!updated) return res.status(404).json({ success: false, message: 'Project not found' });
    return res.json({ success: true, message: 'Project updated successfully!', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    if (!isDBConnected()) {
      return res.status(503).json({ success: false, message: 'Database not connected' });
    }
    const result = await ProjectModel.findByIdAndDelete(id, { returnDocument: 'after' });
    if (!result) return res.status(404).json({ success: false, message: 'Project not found' });
    return res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
