import Blog from '../models/Blog.js';

// GET /api/blogs - Get all blogs
export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/blogs/:id - Get single blog by ID
export const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// GET /api/blogs/slug/:slug - Get single blog by Slug
export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// POST /api/blogs - Create blog (Admin only)
export const createBlog = async (req, res, next) => {
  try {
    let { title, subtitle, slug, content, metaTitle, metaDescription, keywords, isPublished, imageUrl } = req.body;

    // Handle image file upload if uploaded via multer
    if (req.file) {
      imageUrl = req.file.path || `/uploads/${req.file.filename}`;
    }

    // Parse keywords array if passed as JSON string in FormData
    if (typeof keywords === 'string') {
      try {
        keywords = JSON.parse(keywords);
      } catch {
        keywords = keywords.split(',').map((k) => k.trim()).filter(Boolean);
      }
    }

    if (!title || !slug || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title, slug, and content are required fields',
      });
    }

    // Check duplicate slug
    const existingSlug = await Blog.findOne({ slug: slug.toLowerCase() });
    if (existingSlug) {
      slug = `${slug.toLowerCase()}-${Date.now().toString().slice(-4)}`;
    }

    const blog = await Blog.create({
      title,
      subtitle: subtitle || '',
      slug: slug.toLowerCase(),
      content,
      imageUrl: imageUrl || '',
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || subtitle,
      keywords: Array.isArray(keywords) ? keywords : [],
      isPublished: isPublished === 'false' || isPublished === false ? false : true,
    });

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/blogs/:id - Update blog (Admin only)
export const updateBlog = async (req, res, next) => {
  try {
    let { title, subtitle, slug, content, metaTitle, metaDescription, keywords, isPublished, imageUrl } = req.body;

    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    if (req.file) {
      imageUrl = req.file.path || `/uploads/${req.file.filename}`;
    }

    if (typeof keywords === 'string') {
      try {
        keywords = JSON.parse(keywords);
      } catch {
        keywords = keywords.split(',').map((k) => k.trim()).filter(Boolean);
      }
    }

    const updateFields = {
      ...(title && { title }),
      ...(subtitle !== undefined && { subtitle }),
      ...(slug && { slug: slug.toLowerCase() }),
      ...(content && { content }),
      ...(imageUrl && { imageUrl }),
      ...(metaTitle !== undefined && { metaTitle }),
      ...(metaDescription !== undefined && { metaDescription }),
      ...(keywords && { keywords: Array.isArray(keywords) ? keywords : [] }),
      ...(isPublished !== undefined && {
        isPublished: isPublished === 'false' || isPublished === false ? false : true,
      }),
    };

    blog = await Blog.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/blogs/:id - Delete blog (Admin only)
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
