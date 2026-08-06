import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema(
  {
    name:         { type: String, required: true },
    email:        { type: String, default: 'Not Provided' },
    phone:        { type: String, required: true },
    projectTitle: { type: String, default: 'General Inquiry' },
    message:      { type: String, required: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Site Visit Scheduled', 'Closed'],
      default: 'New',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
