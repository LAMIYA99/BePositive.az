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
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppLoading } from "@/Provider/AppLoaderProvider";
import { API_URL } from "@/lib/api";
import { Sidebar } from "../components/Sidebar";
import { Notification } from "../components/Notification";
import dynamic from "next/dynamic";
const NotificationCharts = dynamic(() => import("@/components/NotificationCharts").then(mod => mod.NotificationCharts), { ssr: false });

interface LocalizedString {
  en: string;
  az: string;
}

interface NotificationOption {
  label: LocalizedString;
  value: string;
}

interface NotificationData {
  _id: string;
  title: LocalizedString;
  message: LocalizedString;
  options: NotificationOption[];
  isActive: boolean;
  showDelay: number;
  stats?: { counts: Record<string, number>; total: number };
}

type NotificationFormData = Omit<NotificationData, "_id">;

const defaultOptions: NotificationOption[] = [
  { label: { en: "Google", az: "Google" }, value: "google" },
  { label: { en: "Facebook", az: "Facebook" }, value: "facebook" },
  { label: { en: "Instagram", az: "Instagram" }, value: "instagram" },
  { label: { en: "LinkedIn", az: "LinkedIn" }, value: "linkedin" },
];

export default function NotificationAdmin() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNotification, setCurrentNotification] =
    useState<NotificationData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotificationMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"en" | "az">("en");
  const { setLoading } = useAppLoading();

  const [formData, setFormData] = useState<NotificationFormData>({
    title: { en: "", az: "" },
    message: { en: "", az: "" },
    options: defaultOptions,
    isActive: true,
    showDelay: 3000,
  });

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/notifications`);
      if (res.ok) {
        const data = await res.json();
        // fetch stats for each notification in parallel
        const withStats = await Promise.all(
          data.map(async (n: NotificationData) => {
            try {
              const r = await fetch(`${API_URL}/api/notifications/${n._id}/stats`);
              if (r.ok) {
                const stats = await r.json();
                return { ...n, stats };
              }
            } catch (e) {
              console.error("Failed to fetch stats for", n._id, e);
            }
            return { ...n, stats: { counts: {}, total: 0 } };
          })
        );
        setNotifications(withStats);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchNotifications();

    const onCreated = () => fetchNotifications();
    const onUpdated = () => fetchNotifications();

    window.addEventListener("notification:created", onCreated as EventListener);
    window.addEventListener("notification:updated", onUpdated as EventListener);

    return () => {
      window.removeEventListener("notification:created", onCreated as EventListener);
      window.removeEventListener("notification:updated", onUpdated as EventListener);
    };
  }, [fetchNotifications]);

  const showNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 5000);
  };

  const handleNew = () => {
    setFormData({
      title: { en: "", az: "" },
      message: { en: "", az: "" },
      options: defaultOptions,
      isActive: true,
      showDelay: 3000,
    });
    setCurrentNotification(null);
    setIsEditing(true);
    setActiveTab("en");
  };

  const handleEdit = (notif: NotificationData) => {
    setFormData({
      title: notif.title,
      message: notif.message,
      options: notif.options,
      isActive: notif.isActive,
      showDelay: notif.showDelay,
    });
    setCurrentNotification(notif);
    setIsEditing(true);
    setActiveTab("en");
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const url = currentNotification
        ? `${API_URL}/api/notifications/${currentNotification._id}`
        : `${API_URL}/api/notifications`;

      const method = currentNotification ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showNotification(
          currentNotification
            ? "Notification updated successfully!"
            : "New notification created successfully!"
        );
        fetchNotifications();
        setIsEditing(false);
        setCurrentNotification(null);
      }
    } catch (error) {
      console.error("Failed to save notification:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/notifications/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          showNotification("Notification deleted successfully");
          fetchNotifications();
        }
      } catch (error) {
        console.error("Failed to delete notification:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredNotifications = notifications.filter((n) =>
    n.title.en.toLowerCase().includes(searchTerm.toLowerCase())
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
                    Push Notifications
                  </h2>
                  <p className="text-slate-500">Manage visitor notifications</p>
                </div>
                <button
                  onClick={handleNew}
                  className="group flex items-center gap-2 bg-slate-900 hover:bg-violet-600 text-white font-bold px-8 py-4 rounded-3xl transition-all shadow-xl shadow-slate-200 hover:shadow-violet-200 hover:-translate-y-1 active:scale-95"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  Create Notification
                </button>
              </div>

              <div className="bg-white rounded-4xl p-6 shadow-2xl shadow-slate-100 mb-8">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-violet-500 rounded-2xl outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {filteredNotifications.map((notif, idx) => (
                  <motion.div
                    key={notif._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white rounded-[40px] p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-violet-200/50 transition-all border border-slate-50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-2xl font-bold">
                            {notif.title.en}
                          </h3>
                          {notif.isActive ? (
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">
                              Active
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
                              Inactive
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 mb-4">
                          {notif.message.en}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {notif.options.map((opt) => (
                            <span
                              key={opt.value}
                              className="px-3 py-1 bg-violet-50 text-violet-600 text-xs font-semibold rounded-lg"
                            >
                              {opt.label.en}
                            </span>
                          ))}
                        </div>

                        {/* Stats / Score bar */}
                        <div className="mt-4">
                          <label className="block text-sm font-bold text-slate-500">
                            Responses ({notif.stats?.total ?? 0})
                          </label>
                          <div className="space-y-2 mt-2">
                            {notif.options.map((opt) => {
                              const count = notif.stats?.counts?.[opt.value] || 0;
                              const total = notif.stats?.total || 0;
                              const percent = total > 0 ? Math.round((count / total) * 100) : 0;
                              return (
                                <div key={opt.value} className="flex items-center gap-3">
                                  <div className="flex-1">
                                    <div className="w-full bg-slate-100 h-3 rounded overflow-hidden">
                                      <div
                                        className="bg-violet-600 h-3"
                                        style={{ width: `${percent}%` }}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-24 text-right text-sm text-slate-600">
                                    {percent}% ({count})
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Charts */}
                        <div className="mt-6">
                          {/* @ts-ignore - dynamic import for chart components */}
                          <NotificationCharts notification={notif as any} />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(notif)}
                          className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-violet-600 rounded-xl transition-all"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(notif._id)}
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
                    {currentNotification
                      ? "Save Changes"
                      : "Create Notification"}{" "}
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
                      placeholder="Notification Title..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                      Message ({activeTab.toUpperCase()})
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message[activeTab]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: {
                            ...formData.message,
                            [activeTab]: e.target.value,
                          },
                        })
                      }
                      className="w-full text-base bg-slate-50 p-4 rounded-2xl outline-none placeholder:text-slate-300 resize-none"
                      placeholder="Notification message..."
                    />
                  </div>

                  <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">
                        Active Status
                      </label>
                      <p className="text-xs text-slate-500">
                        Show this notification to visitors
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

                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                      Show Delay (milliseconds)
                    </label>
                    <input
                      type="number"
                      value={formData.showDelay}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          showDelay: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none"
                      min="0"
                      step="1000"
                    />
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
