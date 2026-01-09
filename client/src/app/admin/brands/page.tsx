"use client";

import Image from "next/image";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Search,
  ArrowRight,
  Building2,
  Upload,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppLoading } from "@/Provider/AppLoaderProvider";
import { API_URL, UPLOADS_URL } from "@/lib/api";
import { getImageUrl } from "@/lib/utils";
import { Sidebar } from "../components/Sidebar";
import { Notification } from "../components/Notification";

interface Brand {
  _id: string;
  imageUrl: string;
}

type BrandFormData = Omit<Brand, "_id">;

const isValidUrl = (url: string) => {
  return !!url && url.trim().length > 0;
};

export default function BrandAdmin() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState<string | null>(null);
  const { setLoading } = useAppLoading();

  const [formData, setFormData] = useState<BrandFormData>({
    imageUrl: "",
  });

  const [imageMode, setImageMode] = useState<"url" | "upload">("url");

  const fetchBrands = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/brands`);
      if (res.ok) {
        const data = await res.json();
        setBrands(data);
      }
    } catch (error) {
      console.error("Failed to fetch brands:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleNew = () => {
    setFormData({
      imageUrl: "",
    });
    setCurrentBrand(null);
    setIsEditing(true);
    setImageMode("url");
  };

  const handleEdit = (brand: Brand) => {
    let cleanImage = brand.imageUrl;
    if (
      cleanImage &&
      cleanImage.includes("/uploads/") &&
      cleanImage.startsWith("http")
    ) {
      cleanImage = `/uploads/${cleanImage.split("/uploads/")[1]}`;
    }

    setFormData({
      imageUrl: cleanImage,
    });
    setCurrentBrand(brand);
    setIsEditing(true);
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
        setFormData((prev) => ({ ...prev, imageUrl: data.url }));
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
      const url = currentBrand
        ? `${API_URL}/api/brands`
        : `${API_URL}/api/brands`;

      const method = "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showNotification("New brand added successfully!");
        fetchBrands();
        setIsEditing(false);
        setCurrentBrand(null);
      }
    } catch (error) {
      console.error("Failed to save brand:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/brands/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          showNotification("Brand deleted successfully");
          fetchBrands();
        }
      } catch (error) {
        console.error("Failed to delete brand:", error);
      } finally {
        setLoading(false);
      }
    }
  };

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
                    Brands Management
                  </h2>
                </div>
                <button
                  onClick={handleNew}
                  className="group flex items-center gap-2 bg-slate-900 hover:bg-violet-600 text-white font-bold px-8 py-4 rounded-3xl transition-all shadow-xl shadow-slate-200 hover:shadow-violet-200 hover:-translate-y-1 active:scale-95"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  Add New Brand
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8">
                {brands.map((brand, idx) => (
                  <motion.div
                    key={brand._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white rounded-[40px] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-violet-200/50 transition-all border border-slate-50 relative"
                  >
                    <div className="relative h-32 overflow-hidden flex items-center justify-center p-4 bg-gray-50">
                      {brand.imageUrl && isValidUrl(brand.imageUrl) && (
                        <Image
                          src={getImageUrl(brand.imageUrl)}
                          alt="Brand Logo"
                          fill
                          className="object-contain p-2 group-hover:scale-110 transition-transform duration-300 ease-out will-change-transform"
                          sizes="(max-width: 768px) 50vw, 160px"
                          priority={idx < 12}
                        />
                      )}

                      <button
                        onClick={() => handleDelete(brand._id)}
                        className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-full transition-all shadow-lg opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
                    {currentBrand ? "Update Brand" : "Add Brand"}{" "}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-100 border border-slate-50 space-y-6">
                  <h3 className="font-bold text-lg">Brand Logo</h3>
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
                    {formData.imageUrl && isValidUrl(formData.imageUrl) ? (
                      <>
                        <Image
                          src={getImageUrl(formData.imageUrl)}
                          alt="Preview"
                          fill
                          className="object-contain p-4"
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
                      value={formData.imageUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, imageUrl: e.target.value })
                      }
                      placeholder="Image URL..."
                      className="w-full px-4 py-3 bg-slate-50 rounded-xl text-xs outline-none focus:ring-2 focus:ring-violet-500/20"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
