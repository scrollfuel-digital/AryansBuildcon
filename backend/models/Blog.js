import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
      default: '',
    },
    slug: {
      type: String,
      required: [true, 'Blog slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Blog content HTML is required'],
    },
    imageUrl: {
      type: String,
      default: '',
    },
    metaTitle: {
      type: String,
      trim: true,
      default: '',
    },
    metaDescription: {
      type: String,
      trim: true,
      default: '',
    },
    keywords: [
      {
        type: String,
        trim: true,
      },
    ],
    isPublished: {
      type: Boolean,
      default: true,
    },
    author: {
      type: String,
      default: 'Aryans Buildcons Research Desk',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Blog', blogSchema);
