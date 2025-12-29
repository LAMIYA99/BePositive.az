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
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 right-4 z-9999 max-w-[calc(100vw-2rem)] sm:max-w-md w-full mx-auto sm:mx-0 left-4 sm:left-auto"
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
            <div className="bg-linear-to-r from-violet-600 to-indigo-600 p-4 sm:p-6 relative">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </button>
              <h3 className="text-white font-bold text-lg sm:text-xl pr-8 sm:pr-10 leading-tight">
                {t(notification.title)}
              </h3>
            </div>

            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {t(notification.message)}
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1 sm:pt-2">
                {notification.options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    onClick={() => handleResponse(option.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-3 py-2.5 sm:px-4 sm:py-3 bg-slate-50 hover:bg-violet-50 text-slate-700 hover:text-violet-600 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all border border-slate-200 hover:border-violet-300 truncate"
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
