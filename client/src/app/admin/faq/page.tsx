"use client";

import {
  Plus,
  Edit,
  Trash2,
  X,
  Search,
  ArrowRight,
  ToggleLeft,
  ToggleRight,
  HelpCircle,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppLoading } from "@/Provider/AppLoaderProvider";
import { API_URL } from "@/lib/api";
import { Sidebar } from "../components/Sidebar";
import { Notification } from "../components/Notification";

interface LocalizedString {
  en: string;
  az: string;
}

interface Faq {
  _id: string;
  question: LocalizedString;
  answer: LocalizedString;
  order: number;
  isActive: boolean;
  createdAt: string;
}

type FaqFormData = Omit<Faq, "_id" | "createdAt">;

export default function FaqAdmin() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<Faq | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotificationMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"en" | "az">("en");
  const { setLoading } = useAppLoading();

  const [formData, setFormData] = useState<FaqFormData>({
    question: { en: "", az: "" },
    answer: { en: "", az: "" },
    order: 0,
    isActive: true,
  });

  const fetchFaqs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/faqs`);
      if (res.ok) {
        const data = await res.json();
        setFaqs(data);
      }
    } catch (error) {
      console.error("Failed to fetch faqs:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  const showNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 5000);
  };

  const handleNew = () => {
    setFormData({
      question: { en: "", az: "" },
      answer: { en: "", az: "" },
      order: faqs.length,
      isActive: true,
    });
    setCurrentFaq(null);
    setIsEditing(true);
    setActiveTab("en");
  };

  const handleEdit = (faq: Faq) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      order: faq.order || 0,
      isActive: faq.isActive ?? true,
    });
    setCurrentFaq(faq);
    setIsEditing(true);
    setActiveTab("en");
  };

  const handleSave = async () => {
    if (!formData.question.en && !formData.question.az) {
      alert("Please enter a question");
      return;
    }

    setLoading(true);
    try {
      const url = currentFaq ? `/api/faqs/${currentFaq._id}` : `/api/faqs`;

      const method = currentFaq ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showNotification(
          currentFaq
            ? "FAQ updated successfully!"
            : "New FAQ created successfully!"
        );
        fetchFaqs();
        setIsEditing(false);
        setCurrentFaq(null);
      }
    } catch (error) {
      console.error("Failed to save faq:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      setLoading(true);
      try {
        const res = await fetch(`/api/faqs/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          showNotification("FAQ deleted successfully");
          fetchFaqs();
        }
      } catch (error) {
        console.error("Failed to delete faq:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredFaqs = faqs.filter(
    (n) =>
      n.question.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.question.az.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-violet-100 selection:text-violet-600 flex">
      <AnimatePresence>
        {notification && (
          <Notification
            message={notification}
            onClose={() => setNotificationMsg(null)}
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
                    FAQ Management
                  </h2>
                  <p className="text-slate-500">
                    Manage frequently asked questions
                  </p>
                </div>
                <button
                  onClick={handleNew}
                  className="group flex items-center gap-2 bg-slate-900 hover:bg-violet-600 text-white font-bold px-8 py-4 rounded-3xl transition-all shadow-xl shadow-slate-200 hover:shadow-violet-200 hover:-translate-y-1 active:scale-95"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  Add New FAQ
                </button>
              </div>

              <div className="bg-white rounded-4xl p-6 shadow-2xl shadow-slate-100 mb-8">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-violet-500 rounded-2xl outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {filteredFaqs.map((faq, idx) => (
                  <motion.div
                    key={faq._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white rounded-[40px] p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-violet-200/50 transition-all border border-slate-50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <HelpCircle className="w-6 h-6 text-violet-600" />
                          <h3 className="text-2xl font-bold">
                            {faq.question.en}
                          </h3>
                          {faq.isActive ? (
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">
                              Active
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
                              Inactive
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 mb-4 line-clamp-2">
                          {faq.answer.en}
                        </p>
                        <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                          <span>Order: {faq.order}</span>
                          <span>
                            Created:{" "}
                            {new Date(faq.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(faq)}
                          className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-violet-600 rounded-xl transition-all"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(faq._id)}
                          className="p-3 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-xl transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
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
                    {currentFaq ? "Save Changes" : "Create FAQ"}{" "}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-8">
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
                      Question ({activeTab.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={formData.question[activeTab]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          question: {
                            ...formData.question,
                            [activeTab]: e.target.value,
                          },
                        })
                      }
                      className="w-full text-2xl font-bold border-b border-slate-100 pb-4 outline-none placeholder:text-slate-200"
                      placeholder="Enter question..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                      Answer ({activeTab.toUpperCase()})
                    </label>
                    <textarea
                      rows={6}
                      value={formData.answer[activeTab]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          answer: {
                            ...formData.answer,
                            [activeTab]: e.target.value,
                          },
                        })
                      }
                      className="w-full text-base bg-slate-50 p-4 rounded-2xl outline-none placeholder:text-slate-300 resize-none"
                      placeholder="Enter answer..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                        Display Order
                      </label>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            order: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none"
                      />
                    </div>
                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">
                          Active Status
                        </label>
                        <p className="text-xs text-slate-500">
                          Show this FAQ to visitors
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setFormData({
                            ...formData,
                            isActive: !formData.isActive,
                          })
                        }
                        className="relative"
                      >
                        {formData.isActive ? (
                          <ToggleRight className="w-12 h-12 text-emerald-500" />
                        ) : (
                          <ToggleLeft className="w-12 h-12 text-slate-300" />
                        )}
                      </button>
                    </div>
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
