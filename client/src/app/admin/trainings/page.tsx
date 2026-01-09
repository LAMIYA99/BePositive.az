"use client";

import Image from "next/image";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Search,
  CheckCircle2,
  FileText,
  Briefcase,
  ArrowRight,
  Upload,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppLoading } from "@/Provider/AppLoaderProvider";
import { API_URL, UPLOADS_URL } from "@/lib/api";
import { getImageUrl } from "@/lib/utils";
import { Sidebar } from "../components/Sidebar";
import { Notification } from "../components/Notification";
import { StatCard } from "../components/StatCard";

interface LocalizedString {
  en: string;
  az: string;
}

interface Tag {
  en: string;
  az: string;
}

interface Training {
  _id: string;
  title: LocalizedString;
  image: string;
  link?: string;
  tags: Tag[];
}

type TrainingFormData = Omit<Training, "_id">;

const isValidUrl = (url: string) => {
  return !!url && url.trim().length > 0;
};

export default function TrainingAdmin() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTraining, setCurrentTraining] = useState<Training | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"en" | "az">("en");
  const { setLoading } = useAppLoading();

  const [formData, setFormData] = useState<TrainingFormData>({
    title: { en: "", az: "" },
    image: "",
    link: "",
    tags: [],
  });

  const [tagInput, setTagInput] = useState<{ en: string; az: string }>({
    en: "",
    az: "",
  });

  const [imageMode, setImageMode] = useState<"url" | "upload">("url");

  const fetchTrainings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/trainings`);
      if (res.ok) {
        const data = await res.json();
        setTrainings(data);
      }
    } catch (error) {
      console.error("Failed to fetch trainings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrainings();
  }, [fetchTrainings]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleNew = () => {
    setFormData({
      title: { en: "", az: "" },
      image: "",
      link: "",
      tags: [],
    });
    setCurrentTraining(null);
    setIsEditing(true);
    setActiveTab("en");
    setImageMode("url");
  };

  const handleEdit = (training: Training) => {
    let cleanImage = training.image;
    if (
      cleanImage &&
      cleanImage.includes("/uploads/") &&
      cleanImage.startsWith("http")
    ) {
      cleanImage = `/uploads/${cleanImage.split("/uploads/")[1]}`;
    }

    setFormData({
      title: training.title,
      image: cleanImage,
      link: training.link || "",
      tags: training.tags,
    });
    setCurrentTraining(training);
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
        setFormData((prev) => ({ ...prev, image: data.url }));
        showNotification("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput.en && tagInput.az) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, { ...tagInput }],
      }));
      setTagInput({ en: "", az: "" });
    }
  };

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const url = currentTraining
        ? `/api/trainings/${currentTraining._id}`
        : `/api/trainings`;

      const method = currentTraining ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showNotification(
          currentTraining
            ? "Training updated successfully!"
            : "New training added successfully!"
        );
        fetchTrainings();
        setIsEditing(false);
        setCurrentTraining(null);
      }
    } catch (error) {
      console.error("Failed to save training:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this training?")) {
      setLoading(true);
      try {
        const res = await fetch(`/api/trainings/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          showNotification("Training deleted successfully");
          fetchTrainings();
        }
      } catch (error) {
        console.error("Failed to delete training:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredTrainings = trainings.filter((t) =>
    t.title.en.toLowerCase().includes(searchTerm.toLowerCase())
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
                    Training Management
                  </h2>
                </div>
                <button
                  onClick={handleNew}
                  className="group flex items-center gap-2 bg-slate-900 hover:bg-violet-600 text-white font-bold px-8 py-4 rounded-3xl transition-all shadow-xl shadow-slate-200 hover:shadow-violet-200 hover:-translate-y-1 active:scale-95"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  Add New Training
                </button>
              </div>

              <div className="bg-white rounded-4xl p-6 shadow-2xl shadow-slate-100 mb-8 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search trainings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-violet-500 rounded-2xl outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredTrainings.map((training, idx) => (
                  <motion.div
                    key={training._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white rounded-[40px] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-violet-200/50 transition-all border border-slate-50"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {training.image && isValidUrl(training.image) && (
                        <Image
                          src={getImageUrl(training.image)}
                          alt={training.title.en}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out will-change-transform"
                          sizes="(max-width: 768px) 100vw, (max-width: 1215px) 50vw, 384px"
                        />
                      )}
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(training)}
                          className="p-2 bg-white/90 backdrop-blur hover:bg-white text-slate-600 hover:text-violet-600 rounded-xl transition-all shadow-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(training._id)}
                          className="p-2 bg-white/90 backdrop-blur hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-xl transition-all shadow-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">
                        {training.title.en}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {training.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded"
                          >
                            {tag.en}
                          </span>
                        ))}
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
                    {currentTraining ? "Save Changes" : "Create Training"}{" "}
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
                        className="w-full text-2xl font-bold border-b border-slate-100 pb-4 outline-none placeholder:text-slate-200"
                        placeholder="Training Title..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                        Redirect Link (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.link || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, link: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-violet-500/20"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-100 space-y-8 border border-slate-50">
                    <h4 className="font-bold text-lg">Tags</h4>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        value={tagInput.en}
                        onChange={(e) =>
                          setTagInput((p) => ({ ...p, en: e.target.value }))
                        }
                        placeholder="Tag (EN)"
                        className="flex-1 px-4 py-3 bg-slate-50 rounded-xl"
                      />
                      <input
                        value={tagInput.az}
                        onChange={(e) =>
                          setTagInput((p) => ({ ...p, az: e.target.value }))
                        }
                        placeholder="Tag (AZ)"
                        className="flex-1 px-4 py-3 bg-slate-50 rounded-xl"
                      />
                      <button
                        onClick={addTag}
                        className="bg-violet-600 text-white px-6 rounded-xl font-bold"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-sm"
                        >
                          <span className="font-medium text-slate-700">
                            {tag[activeTab]}
                          </span>
                          <button
                            onClick={() => removeTag(i)}
                            className="text-slate-400 hover:text-rose-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-100 border border-slate-50 space-y-6">
                    <h3 className="font-bold text-lg">Image</h3>
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

                    <div
                      className={`relative aspect-video rounded-3xl overflow-hidden bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-200 ${
                        imageMode === "upload"
                          ? "cursor-pointer hover:border-violet-500 hover:bg-slate-50 transition-all"
                          : ""
                      }`}
                    >
                      {formData.image && isValidUrl(formData.image) ? (
                        <>
                          <Image
                            src={getImageUrl(formData.image)}
                            alt="Preview"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                          {imageMode === "upload" && (
                            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                              <p className="text-white font-bold">
                                Click to Change
                              </p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center p-4">
                          {imageMode === "upload" ? (
                            <>
                              <Upload className="w-8 h-8 text-violet-500 mx-auto mb-3" />
                              <p className="text-sm font-bold text-slate-600">
                                Click to upload
                              </p>
                              <p className="text-xs text-slate-400 mt-1">
                                SVG, PNG, JPG
                              </p>
                            </>
                          ) : (
                            <>
                              <Plus className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                              <p className="text-xs text-slate-400">No Image</p>
                            </>
                          )}
                        </div>
                      )}

                      {imageMode === "upload" && (
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/*"
                        />
                      )}
                    </div>

                    {imageMode === "url" && (
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        placeholder="Image URL..."
                        className="w-full px-4 py-3 bg-slate-50 rounded-xl text-xs outline-none focus:ring-2 focus:ring-violet-500/20"
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
