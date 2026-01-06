"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLocale } from "next-intlayer";
import { getTranslation } from "intlayer";
import { API_URL } from "@/lib/api";

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
  showDelay: number;
  type?: "survey" | "info";
  link?: string;
}

export default function PushNotification() {
  const { locale } = useLocale();
  const [notification, setNotification] = useState<NotificationData | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);
  const [customResponse, setCustomResponse] = useState("");

  const t = (content: LocalizedString) => getTranslation(content, locale);

  useEffect(() => {
    const respondedId = localStorage.getItem("notification_responded_id");

    const fetchNotification = async () => {
      try {
        const res = await fetch(`${API_URL}/api/notifications/active`);
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched active notification:", data);
          if (data) {
            if (respondedId && respondedId === data._id) {
              setHasResponded(true);
              return;
            }
            setNotification(data);
            setTimeout(() => {
              setIsVisible(true);
            }, data.showDelay || 3000);
          }
        } else {
          console.warn(
            "Active notification fetch returned non-ok status",
            res.status
          );
        }
      } catch (error) {
        console.error("Failed to fetch notification:", error);
      }
    };

    fetchNotification();

    const onCreated = (e: any) => {
      const data = e.detail;

      const resp = localStorage.getItem("notification_responded_id");
      if (!data) return;
      if (resp && resp === data._id) return;
      setNotification(data);
      setTimeout(() => setIsVisible(true), data.showDelay || 3000);
    };

    const onUpdated = (e: any) => {
      const data = e.detail;

      const resp = localStorage.getItem("notification_responded_id");
      if (!data) return;
      if (resp && resp === data._id) return;
      setNotification(data);
      setTimeout(() => setIsVisible(true), data.showDelay || 3000);
    };

    window.addEventListener("notification:created", onCreated as EventListener);
    window.addEventListener("notification:updated", onUpdated as EventListener);

    return () => {
      window.removeEventListener(
        "notification:created",
        onCreated as EventListener
      );
      window.removeEventListener(
        "notification:updated",
        onUpdated as EventListener
      );
    };
  }, []);

  const handleResponse = async (value: string) => {
    try {
      await fetch(`${API_URL}/api/notifications/response`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: value,
          notificationId: notification?._id,
        }),
      });
      if (notification && notification._id) {
        localStorage.setItem("notification_responded_id", notification._id);
      }
      setIsVisible(false);
      setHasResponded(true);
    } catch (error) {
      console.error("Failed to save response:", error);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    if (notification && notification._id) {
      localStorage.setItem("notification_responded_id", notification._id);
    }
    setHasResponded(true);
  };

  if (!notification || hasResponded) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white w-full max-w-lg rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden "
          >
            <div className="bg-linear-to-br from-[#0808C1] to-[#060689] p-10 h-32 flex items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

              <h3 className="text-white text-3xl font-bold relative z-10 leading-tight">
                {t(notification.title)}
              </h3>

              <button
                onClick={handleClose}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md z-20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-10 space-y-8">
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                {t(notification.message)}
              </p>

              {notification.type !== "info" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {notification.options.map((option, index) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleResponse(option.value)}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "rgba(8, 8, 193, 0.03)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="group flex items-center justify-between px-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-left transition-all hover:border-[#0808C1]/30"
                    >
                      <span className="font-bold text-[#0808C1]">
                        {t(option.label)}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0808C1] group-hover:bg-[#0808C1] group-hover:text-white transition-colors shadow-sm">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 6H11M11 6L6 1M11 6L6 11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </motion.button>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="sm:col-span-2 mt-4"
                  >
                    <input
                      type="text"
                      value={customResponse}
                      onChange={(e) => setCustomResponse(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && customResponse.trim()) {
                          handleResponse(customResponse.trim());
                        }
                      }}
                      placeholder={
                        locale === "az"
                          ? "Öz cavabınızı yazın..."
                          : "Type your own response..."
                      }
                      className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-slate-700 font-medium placeholder:text-slate-400 outline-none focus:border-[#0808C1]/30 focus:bg-white transition-all shadow-sm"
                    />
                    <p className="mt-3 text-center text-xs text-slate-400 font-medium">
                      {locale === "az"
                        ? "Cavab vermək üçün Enter düyməsini basın"
                        : "Press Enter to submit your response"}
                    </p>
                  </motion.div>
                </div>
              ) : (
                notification.link && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <a
                      href={notification.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-3 w-full py-5 bg-[#0808C1] hover:bg-[#060689] text-white rounded-3xl font-extrabold text-lg transition-all shadow-[0_20px_40px_-12px_rgba(8,8,193,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(8,8,193,0.4)] hover:-translate-y-0.5 active:translate-y-0"
                    >
                      {locale === "az" ? "Daha çox" : "Learn More"}
                      <svg
                        className="group-hover:translate-x-1 transition-transform"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </a>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
