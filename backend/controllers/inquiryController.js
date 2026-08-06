import mongoose from 'mongoose';
import InquiryModel from '../models/Inquiry.js';

const isDBConnected = () => mongoose.connection.readyState === 1;

// In-Memory Fallback Store
let inMemoryInquiries = [
  {
    _id: 'inq-101',
    id: 'inq-101',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@gmail.com',
    phone: '+91 98230 11223',
    projectTitle: 'Govindraj Nagari (Wardha Road)',
    message: 'Looking for 1500 sq.ft corner plot for immediate residential construction.',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    _id: 'inq-102',
    id: 'inq-102',
    name: 'Priya Deshmukh',
    email: 'priya.d@yahoo.com',
    phone: '+91 94221 88776',
    projectTitle: 'Amrutsiddhi (Deoli)',
    message: 'Inquiring about site visit on coming Saturday and available bank loan options.',
    status: 'Site Visit Scheduled',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
];

export async function createInquiry(req, res) {
  try {
    const { name, email, phone, projectTitle, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone number, and message are required.',
      });
    }

    const payload = {
      name,
      email: email || 'Not Provided',
      phone,
      projectTitle: projectTitle || 'General Site Inquiry',
      message,
      status: 'New',
    };

    let newInquiry;

    if (isDBConnected()) {
      newInquiry = await InquiryModel.create(payload);
    } else {
      const id = 'inq-' + Date.now();
      newInquiry = { _id: id, id, ...payload, createdAt: new Date().toISOString() };
      inMemoryInquiries.unshift(newInquiry);
    }

    return res.status(201).json({
      success: true,
      message: 'Inquiry received! Our sales manager will call you shortly.',
      data: newInquiry,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getInquiries(req, res) {
  try {
    if (isDBConnected()) {
      const inquiries = await InquiryModel.find().sort({ createdAt: -1 });
      if (inquiries.length > 0) {
        return res.json({ success: true, count: inquiries.length, data: inquiries });
      }
    }
    return res.json({ success: true, count: inMemoryInquiries.length, data: inMemoryInquiries });
  } catch (error) {
    return res.json({ success: true, count: inMemoryInquiries.length, data: inMemoryInquiries });
  }
}

export async function updateInquiryStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    let updated = null;

    if (isDBConnected()) {
      updated = await InquiryModel.findByIdAndUpdate(id, { status }, { new: true }).catch(() => null);
    }

    if (!updated) {
      const idx = inMemoryInquiries.findIndex((i) => i.id === id || i._id === id);
      if (idx !== -1) {
        inMemoryInquiries[idx].status = status;
        updated = inMemoryInquiries[idx];
      }
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    return res.json({ success: true, message: `Status updated to ${status}`, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function deleteInquiry(req, res) {
  try {
    const { id } = req.params;
    let deleted = false;

    if (isDBConnected()) {
      const result = await InquiryModel.findByIdAndDelete(id).catch(() => null);
      if (result) deleted = true;
    }

    const idx = inMemoryInquiries.findIndex((i) => i.id === id || i._id === id);
    if (idx !== -1) {
      inMemoryInquiries.splice(idx, 1);
      deleted = true;
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    return res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
