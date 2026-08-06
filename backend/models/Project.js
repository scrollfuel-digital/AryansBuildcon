import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title:          { type: String, required: true },
    category:       { type: String, default: 'Residential Layout' },
    location:       { type: String, required: true },
    area:           { type: String, required: true },
    price:          { type: String, default: 'Price on Request' },
    priceUnit:      { type: String, default: 'Lakhs onwards' },
    status:         { type: String, enum: ['Ongoing', 'Completed', 'Upcoming'], default: 'Ongoing' },
    imageUrl:       { type: String, default: '' },
    googleMapsUrl:  { type: String, default: '' },
    sanctionStatus: { type: String, default: 'NATP & NMRDA SANCTIONED' },
    description:    { type: String, default: '' },
    features:       [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
