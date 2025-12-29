"use client";

import Image from "next/image";
import { Plus, Edit, Trash2, X, Search, ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppLoading } from "@/Provider/AppLoaderProvider";
import { API_URL, UPLOADS_URL } from "@/lib/api";
import { Sidebar } from "../components/Sidebar";
import { Notification } from "../components/Notification";

interface LocalizedString {
  en: string;
  az: string;
}

interface Review {
  _id: string;
  name: LocalizedString;
  role: LocalizedString;
  text: LocalizedString;
  avatar: string;
}

type ReviewFormData = Omit<Review, "_id">;

const isValidUrl = (url: string) => {
  if (!url) return false;
  return url.startsWith("http") || url.startsWith("/");
};

export default function ReviewAdmin() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReview, setCurrentReview] = useState<Review | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"en" | "az">("en");
  const { setLoading } = useAppLoading();

  const [formData, setFormData] = useState<ReviewFormData>({
    name: { en: "", az: "" },
    role: { en: "", az: "" },
    text: { en: "", az: "" },
    avatar: "",
  });

  const [imageMode, setImageMode] = useState<"url" | "upload">("url");

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleNew = () => {
    setFormData({
      name: { en: "", az: "" },
      role: { en: "", az: "" },
      text: { en: "", az: "" },
      avatar: "",
    });
    setCurrentReview(null);
    setIsEditing(true);
    setActiveTab("en");
    setImageMode("url");
  };

  const handleEdit = (review: Review) => {
    // Auto-fix legacy localhost URLs to relative paths
    let cleanImage = review.avatar;
    if (
      cleanImage &&
      cleanImage.includes("/uploads/") &&
      cleanImage.startsWith("http")
    ) {
      cleanImage = `/uploads/${cleanImage.split("/uploads/")[1]}`;
    }

    setFormData({
      name: review.name,
      role: review.role,
      text: review.text,
      avatar: cleanImage,
    });
    setCurrentReview(review);
    setIsEditing(true);
    setActiveTab("en");
    setImageMode(cleanImage.startsWith("http") ? "url" : "upload");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("image", file);

    try {
      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formDataUpload,
      });
      if (res.ok) {
        const data = await res.json();
        setFormData((prev) => ({ ...prev, avatar: data.url }));
        showNotification("Avatar uploaded successfully!");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const url = currentReview
        ? `/api/reviews/${currentReview._id}`
        : `/api/reviews`;

      const method = currentReview ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showNotification(
          currentReview
            ? "Review updated successfully!"
            : "New review added successfully!"
        );
        fetchReviews();
        setIsEditing(false);
        setCurrentReview(null);
      }
    } catch (error) {
      console.error("Failed to save review:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setLoading(true);
      try {
        const res = await fetch(`/api/reviews/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          showNotification("Review deleted successfully");
          fetchReviews();
        }
      } catch (error) {
        console.error("Failed to delete review:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredReviews = reviews.filter((r) =>
    r.name.en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-violet-100 selection:text-violet-600 flex">
      <AnimatePresence>
        {notification && (
          <Notification
            message={notification}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>

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
                    Reviews Management
                  </h2>
                </div>
                <button
                  onClick={handleNew}
                  className="group flex items-center gap-2 bg-slate-900 hover:bg-violet-600 text-white font-bold px-8 py-4 rounded-3xl transition-all shadow-xl shadow-slate-200 hover:shadow-violet-200 hover:-translate-y-1 active:scale-95"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  Add New Review
                </button>
              </div>

              <div className="bg-white rounded-4xl p-6 shadow-2xl shadow-slate-100 mb-8 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search reviews (by name)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-violet-500 rounded-2xl outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredReviews.map((review, idx) => (
                  <motion.div
                    key={review._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white rounded-[40px] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-violet-200/50 transition-all border border-slate-50"
                  >
                    <div className="p-8 flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full border-2 border-slate-100 overflow-hidden mb-4 relative">
                        {review.avatar && isValidUrl(review.avatar) ? (
                          <Image
                            src={review.avatar}
                            alt="Avatar"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-50" />
                        )}
                      </div>

                      <h3 className="text-xl font-bold mb-1">
                        {review.name.en}
                      </h3>
                      <p className="text-violet-600 font-bold text-xs uppercase tracking-widest mb-4">
                        {review.role.en}
                      </p>
                      <p className="text-slate-500 text-sm line-clamp-3">
                        "{review.text.en}"
                      </p>

                      <div className="mt-6 flex gap-2">
                        <button
                          onClick={() => handleEdit(review)}
                          className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-violet-600 rounded-xl transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="p-2 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-between mb-12">
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-4 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100 transition-all shadow-sm"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
                <div className="flex gap-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold px-10 py-4 rounded-3xl transition-all shadow-xl shadow-violet-200"
                  >
                    {currentReview ? "Save Changes" : "Create Review"}{" "}
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
                        Name ({activeTab.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={formData.name[activeTab]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: {
                              ...formData.name,
                              [activeTab]: e.target.value,
                            },
                          })
                        }
                        className="w-full text-2xl font-bold border-b border-slate-100 pb-4 outline-none placeholder:text-slate-200"
                        placeholder="Reviewer Name..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                        Role/Job ({activeTab.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={formData.role[activeTab]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            role: {
                              ...formData.role,
                              [activeTab]: e.target.value,
                            },
                          })
                        }
                        className="w-full text-lg font-medium border-b border-slate-100 pb-4 outline-none placeholder:text-slate-200 text-slate-600"
                        placeholder="e.g. CEO of Company"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                        Review Text ({activeTab.toUpperCase()})
                      </label>
                      <textarea
                        rows={4}
                        value={formData.text[activeTab]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            text: {
                              ...formData.text,
                              [activeTab]: e.target.value,
                            },
                          })
                        }
                        className="w-full text-base bg-slate-50 p-4 rounded-2xl outline-none placeholder:text-slate-300 resize-none"
                        placeholder="Write the review here..."
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-100 border border-slate-50 space-y-6">
                    <h3 className="font-bold text-lg">Avatar</h3>
                    <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
                      <button
                        onClick={() => setImageMode("url")}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                          imageMode === "url"
                            ? "bg-white shadow-sm text-violet-600"
                            : "text-slate-500"
                        }`}
                      >
                        URL
                      </button>
                      <button
                        onClick={() => setImageMode("upload")}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                          imageMode === "upload"
                            ? "bg-white shadow-sm text-violet-600"
                            : "text-slate-500"
                        }`}
                      >
                        Upload
                      </button>
                    </div>

                    <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-200">
                      {formData.avatar && isValidUrl(formData.avatar) ? (
                        <Image
                          src={formData.avatar}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <Plus className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                        </div>
                      )}
                    </div>

                    {imageMode === "url" ? (
                      <input
                        type="text"
                        value={formData.avatar}
                        onChange={(e) =>
                          setFormData({ ...formData, avatar: e.target.value })
                        }
                        placeholder="Avatar URL..."
                        className="w-full px-4 py-3 bg-slate-50 rounded-xl text-xs"
                      />
                    ) : (
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="w-full text-xs"
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
