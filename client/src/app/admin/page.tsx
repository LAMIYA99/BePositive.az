"use client";

import Image from "next/image";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Sparkles,
  TrendingUp,
  Users,
  BarChart3,
  X,
  Search,
} from "lucide-react";
import { useState } from "react";

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  status: "draft" | "published";
  views: number;
  likes: number;
  category: string;
  image: string;
}

type BlogFormData = Omit<Blog, "id" | "date" | "views" | "likes">;

export default function BePositiveAdmin() {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: 1,
      title: "The Power of Positive Thinking",
      excerpt:
        "Discover how shifting your mindset can transform your life and unlock your true potential.",
      content: "Positive thinking is more than just a feel-good phrase...",
      author: "Sarah Johnson",
      date: "2024-12-10",
      status: "published",
      views: 1247,
      likes: 89,
      category: "Mindset",
      image:
        "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=400&fit=crop",
    },
    {
      id: 2,
      title: "5 Morning Habits for Success",
      excerpt:
        "Start your day right with these powerful morning routines that successful people swear by.",
      content:
        "The way you start your morning sets the tone for the entire day...",
      author: "Michael Chen",
      date: "2024-12-09",
      status: "draft",
      views: 0,
      likes: 0,
      category: "Productivity",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop",
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    image: "",
    category: "Mindset",
    status: "draft",
  });

  const stats = {
    total: blogs.length,
    published: blogs.filter((b) => b.status === "published").length,
    totalViews: blogs.reduce((sum, b) => sum + b.views, 0),
    totalLikes: blogs.reduce((sum, b) => sum + b.likes, 0),
  };

  const handleNew = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      image: "",
      category: "Mindset",
      status: "draft",
    });
    setCurrentBlog(null);
    setIsEditing(true);
  };

  const handleEdit = (blog: Blog) => {
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      image: blog.image,
      category: blog.category,
      status: blog.status,
    });
    setCurrentBlog(blog);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (currentBlog) {
      setBlogs(
        blogs.map((blog) =>
          blog.id === currentBlog.id ? { ...blog, ...formData } : blog
        )
      );
    } else {
      const newBlog: Blog = {
        id: blogs.length + 1,
        ...formData,
        date: new Date().toISOString().split("T")[0],
        views: 0,
        likes: 0,
      };
      setBlogs([newBlog, ...blogs]);
    }
    setIsEditing(false);
    setCurrentBlog(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isEditing) {
    return (
      <div className="min-h-screen bg-linear-to-br from-violet-50 via-pink-50 to-amber-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
                {currentBlog ? "Edit Post" : "Create New Post"}
              </h1>
              <p className="text-slate-600">
                Share positivity with the world ✨
              </p>
            </div>
            <button
              onClick={() => setIsEditing(false)}
              className="p-3 hover:bg-white rounded-xl transition-all"
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-violet-100/50 p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-violet-500 transition-all"
                  placeholder="An inspiring title..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-violet-500 transition-all resize-none"
                  placeholder="A brief summary..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={10}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-violet-500 transition-all resize-none"
                  placeholder="Write your positive message..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-violet-500 transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-violet-500 transition-all"
                >
                  <option>Mindset</option>
                  <option>Productivity</option>
                  <option>Wellness</option>
                  <option>Motivation</option>
                  <option>Success</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-violet-500 transition-all"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as "draft" | "published",
                    })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-violet-500 transition-all"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50"
              >
                {currentBlog ? "Update Post" : "Publish Post"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-8 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-4 rounded-xl transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-pink-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-linear-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Be Positive
              </h1>
              <p className="text-slate-600">Admin Dashboard</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-violet-100/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.total}
                </p>
                <p className="text-xs text-slate-600">Total Posts</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-fuchsia-100/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-fuchsia-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-fuchsia-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.published}
                </p>
                <p className="text-xs text-slate-600">Published</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-amber-100/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.totalViews}
                </p>
                <p className="text-xs text-slate-600">Total Views</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-rose-100/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.totalLikes}
                </p>
                <p className="text-xs text-slate-600">Total Likes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-violet-100/50 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 transition-all"
              />
            </div>
            <button
              onClick={handleNew}
              className="flex items-center gap-2 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" /> New Post
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-violet-100/50 hover:shadow-xl hover:shadow-violet-200/50 transition-all group"
            >
              {blog.image && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority={false}
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-linear-to-r from-violet-100 to-fuchsia-100 text-violet-700 text-xs font-semibold rounded-full">
                    {blog.category}
                  </span>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      blog.status === "published"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {blog.status === "published" ? "● Live" : "● Draft"}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>

                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {blog.views}
                  </span>
                  <span>❤️ {blog.likes}</span>
                  <span>👤 {blog.author}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="flex-1 flex items-center justify-center gap-2 bg-violet-50 hover:bg-violet-100 text-violet-600 font-medium py-2.5 rounded-xl transition-all"
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="px-4 bg-rose-50 hover:bg-rose-100 text-rose-600 py-2.5 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-linear-to-br from-violet-100 to-fuchsia-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-violet-600" />
            </div>
            <p className="text-slate-600 text-lg mb-2">No posts found</p>
            <p className="text-slate-400 text-sm">
              Start creating positive content!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
