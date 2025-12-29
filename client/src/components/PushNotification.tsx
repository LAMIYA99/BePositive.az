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
}

export default function PushNotification() {
  const { locale } = useLocale();
  const [notification, setNotification] = useState<NotificationData | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);

  const t = (content: LocalizedString) => getTranslation(content, locale);

  useEffect(() => {
    const responded = localStorage.getItem("notification_responded");
    if (responded) {
      setHasResponded(true);
      return;
    }

    const fetchNotification = async () => {
      try {
        const res = await fetch(`${API_URL}/api/notifications/active`);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setNotification(data);
            setTimeout(() => {
              setIsVisible(true);
            }, data.showDelay || 3000);
          }
        }
      } catch (error) {
        console.error("Failed to fetch notification:", error);
      }
    };

    fetchNotification();
  }, []);

  const handleResponse = async (value: string) => {
    try {
      await fetch(`${API_URL}/api/notifications/response`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: value }),
      });
      localStorage.setItem("notification_responded", "true");
      setIsVisible(false);
      setHasResponded(true);
    } catch (error) {
      console.error("Failed to save response:", error);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("notification_responded", "true");
    setHasResponded(true);
  };

  if (!notification || hasResponded) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-9999 max-w-md w-full mx-4 sm:mx-0"
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <h3 className="text-white font-bold text-xl pr-10">
                {t(notification.title)}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-slate-600 text-base leading-relaxed">
                {t(notification.message)}
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {notification.options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    onClick={() => handleResponse(option.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-4 py-3 bg-slate-50 hover:bg-violet-50 text-slate-700 hover:text-violet-600 rounded-xl font-semibold text-sm transition-all border border-slate-200 hover:border-violet-300"
                  >
                    {t(option.label)}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
