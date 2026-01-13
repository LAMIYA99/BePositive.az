"use client";

import Image from "next/image";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Search,
  ArrowRight,
  Upload,
  Users,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppLoading } from "@/Provider/AppLoaderProvider";
import { API_URL } from "@/lib/api";
import { getImageUrl } from "@/lib/utils";
import { Sidebar } from "../components/Sidebar";
import { Notification } from "../components/Notification";

interface LocalizedString {
  en: string;
  az: string;
}

interface TeamMember {
  _id: string;
  name: string;
  role: LocalizedString;
  image: string;
  order?: number;
}

type TeamFormData = Omit<TeamMember, "_id">;

export default function TeamAdmin() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"en" | "az">("en");
  const { setLoading } = useAppLoading();

  const [formData, setFormData] = useState<TeamFormData>({
    name: "",
    role: { en: "", az: "" },
    image: "",
    order: 0,
  });

  const [imageMode, setImageMode] = useState<"url" | "upload">("url");

  const fetchTeam = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/team`);
      if (res.ok) {
        const data = await res.json();
        setTeam(data);
      }
    } catch (error) {
      console.error("Failed to fetch team members:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleNew = () => {
    setFormData({
      name: "",
      role: { en: "", az: "" },
      image: "",
      order: team.length,
    });
    setCurrentMember(null);
    setIsEditing(true);
    setActiveTab("en");
    setImageMode("url");
  };

  const handleEdit = (member: TeamMember) => {
    setFormData({
      name: member.name,
      role: member.role,
      image: member.image,
      order: member.order || 0,
    });
    setCurrentMember(member);
    setIsEditing(true);
    setActiveTab("en");
    setImageMode(member.image.startsWith("http") ? "url" : "upload");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("image", file);

    try {
      const res = await fetch("/api/upload", {
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

  const handleSave = async () => {
    setLoading(true);
    try {
      const url = currentMember
        ? `/api/team/${currentMember._id}`
        : `/api/team`;

      const method = currentMember ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showNotification(
          currentMember
            ? "Member updated successfully!"
            : "New member added successfully!"
        );
        fetchTeam();
        setIsEditing(false);
        setCurrentMember(null);
      }
    } catch (error) {
      console.error("Failed to save team member:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      setLoading(true);
      try {
        const res = await fetch(`/api/team/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          showNotification("Team member deleted successfully");
          fetchTeam();
        }
      } catch (error) {
        console.error("Failed to delete team member:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredTeam = team.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                    Team Management
                  </h2>
                </div>
                <button
                  onClick={handleNew}
                  className="group flex items-center gap-2 bg-slate-900 hover:bg-violet-600 text-white font-bold px-8 py-4 rounded-3xl transition-all shadow-xl shadow-slate-200 hover:shadow-violet-200 hover:-translate-y-1 active:scale-95"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  Add New Member
                </button>
              </div>

              <div className="bg-white rounded-4xl p-6 shadow-2xl shadow-slate-100 mb-8 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-violet-500 rounded-2xl outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredTeam.map((member, idx) => (
                  <motion.div
                    key={member._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white rounded-[40px] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-violet-200/50 transition-all border border-slate-50"
                  >
                    <div className="relative h-64 overflow-hidden">
                      {member.image && (
                        <Image
                          src={getImageUrl(member.image)}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                          unoptimized={true}
                          sizes="(max-width: 768px) 100vw, (max-width: 1215px) 50vw, 384px"
                          priority={idx < 4}
                        />
                      )}
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(member)}
                          className="p-2 bg-white/90 backdrop-blur hover:bg-white text-slate-600 hover:text-violet-600 rounded-xl transition-all shadow-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(member._id)}
                          className="p-2 bg-white/90 backdrop-blur hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-xl transition-all shadow-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-slate-500 font-medium">
                        {member.role.en}
                      </p>
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
                    {currentMember ? "Save Changes" : "Create Member"}{" "}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-100 space-y-8 border border-slate-50">
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full text-2xl font-bold border-b border-slate-100 pb-4 outline-none placeholder:text-slate-200"
                        placeholder="Alamdar Manafov..."
                      />
                    </div>

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

                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                        Role ({activeTab.toUpperCase()})
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
                        className="w-full text-xl font-bold border-b border-slate-100 pb-4 outline-none placeholder:text-slate-200"
                        placeholder="CEO / MERN Stack Developer..."
                      />
                    </div>

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
                        className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-violet-500/20"
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

                    <div
                      className={`relative aspect-square rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-200 ${
                        imageMode === "upload"
                          ? "cursor-pointer hover:border-violet-500 hover:bg-slate-50 transition-all"
                          : ""
                      }`}
                    >
                      {formData.image ? (
                        <>
                          <Image
                            src={getImageUrl(formData.image)}
                            alt="Preview"
                            fill
                            className="object-cover"
                            unoptimized={true}
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                          {imageMode === "upload" && (
                            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                              <p className="text-white font-bold">Change</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center p-4">
                          {imageMode === "upload" ? (
                            <>
                              <Upload className="w-8 h-8 text-violet-500 mx-auto mb-3" />
                              <p className="text-xs font-bold text-slate-600">
                                Upload Avatar
                              </p>
                            </>
                          ) : (
                            <p className="text-xs text-slate-400">No Image</p>
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
