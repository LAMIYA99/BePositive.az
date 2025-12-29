"use client";

import Image from "next/image";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Sparkles,
  X,
  Search,
  CheckCircle2,
  FileText,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useAppLoading } from "@/Provider/AppLoaderProvider";
import { API_URL, UPLOADS_URL } from "@/lib/api";
import { Sidebar } from "./components/Sidebar";
import { Notification } from "./components/Notification";
import { StatCard } from "./components/StatCard";

interface LocalizedString {
  en: string;
  az: string;
}

interface Section {
  content: LocalizedString;
  image: string;
}

interface Blog {
  _id: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString;
  sections?: Section[];
  author: string;
  createdAt: string;
  status: "draft" | "published";
  views: number;
  likes: number;
  category: string[];
  image: string;
  image2: string;
}

type BlogFormData = Omit<Blog, "_id" | "createdAt" | "views" | "likes">;

const isValidUrl = (url: string) => {
  if (!url) return false;
  return url.startsWith("http") || url.startsWith("/");
};

export default function BePositiveAdmin() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"en" | "az">("en");
  const { setLoading } = useAppLoading();
  
  

  const withLoading = useCallback(
    async (fn: () => Promise<void>) => {
      setLoading(true);
      try {
        await fn();
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const [formData, setFormData] = useState<BlogFormData>({
    title: { en: "", az: "" },
    excerpt: { en: "", az: "" },
    content: { en: "", az: "" },
    sections: [],
    author: "",
    image: "",
    image2: "",
    category: ["Marketing"],
    status: "draft",
  });

  const [imageModes, setImageModes] = useState<{
    image: "url" | "upload";
    sections: ("url" | "upload")[];
  }>({
    image: "url",
    sections: [],
  });

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/blogs`);
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }

  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleNew = () => {
    setFormData({
      title: { en: "", az: "" },
      excerpt: { en: "", az: "" },
      content: { en: "", az: "" },
      sections: [],
      author: "",
      image: "",
      image2: "",
      category: ["Marketing"],
      status: "draft",
    });
    setCurrentBlog(null);
    setIsEditing(true);
    setActiveTab("en");
    setImageModes({ image: "url", sections: [] });
  };

  const handleEdit = (blog: Blog) => {
    setFormData({
      title:
        typeof blog.title === "string"
          ? { en: blog.title, az: "" }
          : { ...blog.title },
      excerpt:
        typeof blog.excerpt === "string"
          ? { en: blog.excerpt, az: "" }
          : { ...blog.excerpt },
      content:
        typeof blog.content === "string"
          ? { en: blog.content, az: "" }
          : { ...blog.content },
      sections: blog.sections || [],
      author: blog.author,
      image: blog.image || "",
      image2: blog.image2 || "",
      category: blog.category,
      status: blog.status,
    });
    setCurrentBlog(blog);
    setIsEditing(true);
    setActiveTab("en");
    setImageModes({
      image: blog.image?.startsWith(UPLOADS_URL) ? "upload" : "url",
      sections: (blog.sections || []).map((s) =>
        s.image?.startsWith(UPLOADS_URL) ? "upload" : "url"
      ),
    });
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "image" | "image2"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    withLoading(async () => {
      const formDataUpload = new FormData();
      formDataUpload.append("image", file);

      try {
        const res = await fetch(`${API_URL}/api/upload`, {
          method: "POST",
          body: formDataUpload,
        });
        if (res.ok) {
          const data = await res.json();
          setFormData((prev) => ({ ...prev, [field]: data.url }));
          showNotification("Image uploaded successfully!");
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    });
  };

  const handleSectionImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    withLoading(async () => {
      const formDataUpload = new FormData();
      formDataUpload.append("image", file);

      try {
        const res = await fetch(`${API_URL}/api/upload`, {
          method: "POST",
          body: formDataUpload,
        });
        if (res.ok) {
          const data = await res.json();
          const newSections = [...(formData.sections || [])];
          newSections[index].image = data.url;
          setFormData((prev) => ({ ...prev, sections: newSections }));
          showNotification("Section image uploaded!");
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    });
  };

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [
        ...(prev.sections || []),
        { content: { en: "", az: "" }, image: "" },
      ],
    }));
    setImageModes((prev) => ({
      ...prev,
      sections: [...prev.sections, "url"],
    }));
  };

  const removeSection = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections?.filter((_, i) => i !== index),
    }));
    setImageModes((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    withLoading(async () => {
      try {
        const url = currentBlog
          ? `${API_URL}/api/blogs/${currentBlog._id}`
          : `${API_URL}/api/blogs`;

        const method = currentBlog ? "PUT" : "POST";

        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          showNotification(
            currentBlog
              ? "Blog updated successfully!"
              : "New blog published successfully!"
          );
          fetchBlogs();
          setIsEditing(false);
          setCurrentBlog(null);
        }
      } catch (error) {
        console.error("Failed to save blog:", error);
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      withLoading(async () => {
        try {
          const res = await fetch(`${API_URL}/api/blogs/${id}`, {
            method: "DELETE",
          });
          if (res.ok) {
            showNotification("Blog deleted successfully");
            fetchBlogs();
          }
        } catch (error) {
          console.error("Failed to delete blog:", error);
        }
      });
    }
  };

  const stats = {
    total: blogs.length,
    published: blogs.filter((b) => b.status === "published").length,
    totalViews: blogs.reduce((sum, b) => sum + (b.views || 0), 0),
    totalLikes: blogs.reduce((sum, b) => sum + (b.likes || 0), 0),
  };

  const filteredBlogs = blogs.filter((blog) => {
    const s = searchTerm.toLowerCase();

    const titleEn =
      typeof blog.title === "string" ? blog.title : blog.title?.en || "";
    const titleAz = typeof blog.title === "string" ? "" : blog.title?.az || "";
    const categories = Array.isArray(blog.category) ? blog.category : [];

    return (
      titleEn.toLowerCase().includes(s) ||
      titleAz.toLowerCase().includes(s) ||
      categories.some((cat) => cat.toLowerCase().includes(s))
    );
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-violet-100 selection:text-violet-600">
      <AnimatePresence>
        {notification && (
          <Notification
            message={notification}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {!isEditing ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                  <div>
                    <h2 className="text-4xl font-extrabold tracking-tight mb-2">
                      Editor Dashboard
                    </h2>
                  </div>
                  <button
                    onClick={handleNew}
                    className="group flex items-center gap-2 bg-slate-900 hover:bg-violet-600 text-white font-bold px-8 py-4 rounded-3xl transition-all shadow-xl shadow-slate-200 hover:shadow-violet-200 hover:-translate-y-1 active:scale-95"
                  >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    Create New Post
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  <StatCard
                    icon={<FileText />}
                    label="Total Posts"
                    value={stats.total}
                    color="violet"
                  />
                  <StatCard
                    icon={<CheckCircle2 />}
                    label="Published"
                    value={stats.published}
                    color="emerald"
                  />
                </div>

                <div className="bg-white rounded-4xl p-6 shadow-2xl shadow-slate-100 mb-8 flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search across all languages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-16 pr-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-violet-500 rounded-2xl outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {filteredBlogs.map((blog, idx) => (
                    <motion.div
                      key={blog._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group bg-white rounded-[40px] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-violet-200/50 transition-all border border-slate-50"
                    >
                      <div className="flex flex-col md:flex-row h-full">
                        {blog.image && isValidUrl(blog.image) && (
                          <div className="md:w-56 relative h-56 md:h-auto overflow-hidden">
                            <Image
                              src={blog.image}
                              alt={
                                typeof blog.title === "string"
                                  ? blog.title
                                  : blog.title.en
                              }
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out will-change-transform"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        )}
                        <div className="flex-1 p-8 flex flex-col">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex flex-wrap gap-2">
                              {blog.category?.map((cat) => (
                                <span
                                  key={cat}
                                  className="px-4 py-1.5 bg-violet-50 text-violet-600 text-[10px] font-bold rounded-full uppercase tracking-wider"
                                >
                                  {cat}
                                </span>
                              ))}
                              <span
                                className={`px-4 py-1.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                                  blog.status === "published"
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-amber-50 text-amber-600"
                                }`}
                              >
                                {blog.status}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleEdit(blog)}
                                className="p-2 hover:bg-slate-50 text-slate-400 hover:text-violet-600 rounded-xl transition-all"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(blog._id)}
                                className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition-all"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold mb-3 line-clamp-1 group-hover:text-violet-600 transition-colors">
                            {typeof blog.title === "string"
                              ? blog.title
                              : blog.title.en}
                          </h3>
                          <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                            {typeof blog.excerpt === "string"
                              ? blog.excerpt
                              : blog.excerpt.en}
                          </p>

                          <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                            <div className="flex items-center gap-6 text-sm font-bold text-slate-400">
                              <span className="flex items-center gap-2">
                                <Eye className="w-4 h-4" /> {blog.views}
                              </span>
                              <span className="flex items-center gap-2">
                                ❤️ {blog.likes}
                              </span>
                            </div>
                            <div className="flex items-center -space-x-2">
                              <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                                EN
                              </div>
                              <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                                AZ
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="editor"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="max-w-5xl mx-auto"
              >
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="p-4 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100 transition-all shadow-sm"
                    >
                      <X className="w-6 h-6 text-slate-600" />
                    </button>
                    <div>
                      <h2 className="text-3xl font-extrabold">
                        {currentBlog ? "Refine Post" : "Draft New Post"}
                      </h2>
                      <p className="text-slate-500 font-medium">
                        Create a multi-lingual experience 🌍
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as "draft" | "published",
                        })
                      }
                      className="px-6 py-4 bg-white border border-slate-100 rounded-3xl font-bold text-sm outline-none focus:ring-2 ring-violet-500/20"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold px-10 py-4 rounded-3xl transition-all shadow-xl shadow-violet-200"
                    >
                      {currentBlog ? "Save Updates" : "Publish Content"}{" "}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-8">
                    <div className="flex p-1.5 bg-slate-100 rounded-2xl w-fit">
                      <button
                        onClick={() => setActiveTab("en")}
                        className={`px-8 py-3 rounded-xl font-bold transition-all ${
                          activeTab === "en"
                            ? "bg-white shadow-lg text-violet-600"
                            : "text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => setActiveTab("az")}
                        className={`px-8 py-3 rounded-xl font-bold transition-all ${
                          activeTab === "az"
                            ? "bg-white shadow-lg text-violet-600"
                            : "text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        Azerbaijani
                      </button>
                    </div>

                    <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-100 space-y-8 border border-slate-50">
                      <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                          Title ({activeTab.toUpperCase()})
                        </label>
                        <input
                          type="text"
                          value={formData.title[activeTab]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              title: {
                                ...formData.title,
                                [activeTab]: e.target.value,
                              },
                            })
                          }
                          className="w-full text-4xl font-extrabold border-none outline-none placeholder:text-slate-100"
                          placeholder="Enter Headline..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                          Excerpt ({activeTab.toUpperCase()})
                        </label>
                        <textarea
                          value={formData.excerpt[activeTab]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              excerpt: {
                                ...formData.excerpt,
                                [activeTab]: e.target.value,
                              },
                            })
                          }
                          rows={2}
                          className="w-full text-lg font-medium border-none outline-none placeholder:text-slate-100 resize-none text-slate-600"
                          placeholder="Brief summary to hook the reader..."
                        />
                      </div>

                      <div className="pt-8 border-t border-slate-50 space-y-12">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">
                            Blog Sections ({activeTab.toUpperCase()})
                          </label>
                          <button
                            onClick={addSection}
                            className="flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-600 rounded-xl font-bold text-xs hover:bg-violet-100 transition-all"
                          >
                            <Plus className="w-4 h-4" /> Add Section
                          </button>
                        </div>

                        <div className="space-y-12">
                          {(formData.sections || []).map((section, idx) => (
                            <div
                              key={idx}
                              className="relative p-8 bg-slate-50 rounded-4xl border border-slate-100 space-y-6 group/section"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                  Section {idx + 1}
                                </span>
                                <button
                                  onClick={() => removeSection(idx)}
                                  className="p-2 hover:bg-rose-100 text-rose-500 rounded-lg transition-all opacity-0 group-hover/section:opacity-100"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    Section Text
                                  </label>
                                  <textarea
                                    value={section.content[activeTab]}
                                    onChange={(e) => {
                                      const newSections = [
                                        ...(formData.sections || []),
                                      ];
                                      newSections[idx].content[activeTab] =
                                        e.target.value;
                                      setFormData((prev) => ({
                                        ...prev,
                                        sections: newSections,
                                      }));
                                    }}
                                    rows={6}
                                    className="w-full text-base bg-white p-4 rounded-2xl border-none outline-none placeholder:text-slate-100 resize-none leading-relaxed"
                                    placeholder="Enter section content..."
                                  />
                                </div>

                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                      Section Photo
                                    </label>
                                    <div className="flex bg-white p-1 rounded-lg border border-slate-100">
                                      <button
                                        onClick={() => {
                                          const newModes = [
                                            ...imageModes.sections,
                                          ];
                                          newModes[idx] = "url";
                                          setImageModes((prev) => ({
                                            ...prev,
                                            sections: newModes,
                                          }));
                                        }}
                                        className={`px-2 py-1 text-[8px] font-bold rounded-md transition-all ${
                                          imageModes.sections[idx] === "url"
                                            ? "bg-slate-900 text-white shadow-sm"
                                            : "text-slate-400"
                                        }`}
                                      >
                                        URL
                                      </button>
                                      <button
                                        onClick={() => {
                                          const newModes = [
                                            ...imageModes.sections,
                                          ];
                                          newModes[idx] = "upload";
                                          setImageModes((prev) => ({
                                            ...prev,
                                            sections: newModes,
                                          }));
                                        }}
                                        className={`px-2 py-1 text-[8px] font-bold rounded-md transition-all ${
                                          imageModes.sections[idx] === "upload"
                                            ? "bg-slate-900 text-white shadow-sm"
                                            : "text-slate-400"
                                        }`}
                                      >
                                        Upload
                                      </button>
                                    </div>
                                  </div>

                                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-white flex items-center justify-center border-2 border-dashed border-slate-200 group">
                                    {section.image &&
                                    isValidUrl(section.image) ? (
                                      <>
                                        <Image
                                          src={section.image}
                                          alt={`Section ${idx + 1}`}
                                          fill
                                          className="object-cover"
                                        />
                                        <button
                                          onClick={() => {
                                            const newSections = [
                                              ...(formData.sections || []),
                                            ];
                                            newSections[idx].image = "";
                                            setFormData((prev) => ({
                                              ...prev,
                                              sections: newSections,
                                            }));
                                          }}
                                          className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                                        >
                                          <Trash2 className="w-3 h-3 text-rose-500" />
                                        </button>
                                      </>
                                    ) : (
                                      <div className="text-center p-4">
                                        {imageModes.sections[idx] ===
                                        "upload" ? (
                                          <>
                                            <input
                                              type="file"
                                              accept="image/*"
                                              className="hidden"
                                              id={`section-upload-${idx}`}
                                              onChange={(e) =>
                                                handleSectionImageUpload(e, idx)
                                              }
                                            />
                                            <label
                                              htmlFor={`section-upload-${idx}`}
                                              className="cursor-pointer"
                                            >
                                              <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                                                <Plus className="w-4 h-4 text-slate-300" />
                                              </div>
                                              <p className="text-[10px] font-bold text-slate-400">
                                                Select Image File
                                              </p>
                                            </label>
                                          </>
                                        ) : (
                                          <>
                                            <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                                              <Plus className="w-4 h-4 text-slate-300" />
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-400">
                                              Paste URL below
                                            </p>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </div>

                                  {imageModes.sections[idx] === "url" && (
                                    <input
                                      type="text"
                                      value={section.image}
                                      onChange={(e) => {
                                        const newSections = [
                                          ...(formData.sections || []),
                                        ];
                                        newSections[idx].image = e.target.value;
                                        setFormData((prev) => ({
                                          ...prev,
                                          sections: newSections,
                                        }));
                                      }}
                                      placeholder="Paste image URL..."
                                      className="w-full px-4 py-2 bg-white border border-slate-100 rounded-xl outline-none focus:border-violet-300 transition-all font-medium text-[10px] text-slate-500"
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}

                          {(formData.sections || []).length === 0 && (
                            <div className="text-center py-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-100">
                              <Sparkles className="w-8 h-8 text-slate-200 mx-auto mb-4" />
                              <p className="text-slate-400 font-bold">
                                No sections added yet.
                              </p>
                              <button
                                onClick={addSection}
                                className="mt-4 text-violet-600 font-bold text-sm hover:underline"
                              >
                                Create your first section
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-100 border border-slate-50 space-y-6">
                      <h3 className="font-bold text-lg mb-2">Metadata</h3>

                      <div>
                        <label className="block text-sm font-bold text-slate-600 mb-2">
                          Author Name
                        </label>
                        <input
                          type="text"
                          value={formData.author}
                          onChange={(e) =>
                            setFormData({ ...formData, author: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-violet-300 transition-all font-medium"
                        />
                      </div>

                      <div>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            "Marketing",
                            "Design",
                            "Business",
                            "Branding",
                            "Strategy",
                            "Development",
                          ].map((cat) => (
                            <button
                              key={cat}
                              onClick={() => {
                                const currentCats = formData.category || [];
                                const newCats = currentCats.includes(cat)
                                  ? currentCats.filter((c) => c !== cat)
                                  : [...currentCats, cat];
                                setFormData({ ...formData, category: newCats });
                              }}
                              className={`px-4 py-3 rounded-xl border transition-all text-xs font-bold ${
                                formData.category?.includes(cat)
                                  ? "bg-violet-600 border-violet-600 text-white"
                                  : "bg-slate-50 border-slate-100 text-slate-600 hover:border-violet-200"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-100 border border-slate-50 space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg">Image 1 (Main)</h3>
                          <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button
                              onClick={() =>
                                setImageModes((prev) => ({
                                  ...prev,
                                  image: "url",
                                }))
                              }
                              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                                imageModes.image === "url"
                                  ? "bg-white text-violet-600 shadow-sm"
                                  : "text-slate-500"
                              }`}
                            >
                              URL
                            </button>
                            <button
                              onClick={() =>
                                setImageModes((prev) => ({
                                  ...prev,
                                  image: "upload",
                                }))
                              }
                              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                                imageModes.image === "upload"
                                  ? "bg-white text-violet-600 shadow-sm"
                                  : "text-slate-500"
                              }`}
                            >
                              Upload
                            </button>
                          </div>
                        </div>

                        <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-200 group">
                          {formData.image && isValidUrl(formData.image) ? (
                            <>
                              <Image
                                src={formData.image}
                                alt="Preview"
                                fill
                                className="object-cover"
                              />
                              <button
                                onClick={() =>
                                  setFormData({ ...formData, image: "" })
                                }
                                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                              >
                                <Trash2 className="w-4 h-4 text-rose-500" />
                              </button>
                            </>
                          ) : (
                            <div className="text-center p-4">
                              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                                <Plus className="w-6 h-6 text-slate-300" />
                              </div>
                              <p className="text-xs font-bold text-slate-400">
                                {imageModes.image === "url"
                                  ? "Paste URL below"
                                  : "Click to upload"}
                              </p>
                            </div>
                          )}
                        </div>

                        {imageModes.image === "url" ? (
                          <input
                            type="text"
                            value={formData.image}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                image: e.target.value,
                              })
                            }
                            placeholder="Paste Image URL (Unsplash recommended)"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-violet-300 transition-all font-medium text-xs text-slate-500"
                          />
                        ) : (
                          <div className="flex items-center gap-4">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e, "image")}
                              className="hidden"
                              id="image-upload-1"
                            />
                            <label
                              htmlFor="image-upload-1"
                              className="flex-1 text-center py-3 bg-slate-900 hover:bg-violet-600 text-white font-bold rounded-xl cursor-pointer transition-all text-xs"
                            >
                              Select Image File
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
