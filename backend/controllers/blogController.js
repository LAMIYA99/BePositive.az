const Blog = require("../models/Blog");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBlog = async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    excerpt: req.body.excerpt,
    content: req.body.content,
    author: req.body.author,
    image: req.body.image,
    image2: req.body.image2,
    sections: req.body.sections,
    category: req.body.category,
    status: req.body.status,
  });

  try {
    const newBlog = await blog.save();

    if (req.io) {
      req.io.emit("blogCreated", {
        title: newBlog.title,
        id: newBlog._id,
      });
    }

    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (req.io) {
      req.io.emit("blogUpdated", {
        title: updatedBlog.title,
        id: updatedBlog._id,
      });
    }

    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
