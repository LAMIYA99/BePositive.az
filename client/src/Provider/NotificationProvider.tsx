"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { API_URL } from "@/lib/api";

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const socket = io(API_URL);

    socket.on("connect", () => {
      console.log("Connected to notification server");
    });

    socket.on("blogCreated", (data) => {
      const title = typeof data.title === "string" ? data.title : data.title.en;
      toast.success(`New Blog: ${title}`, {
        duration: 5000,
        icon: "🚀",
        style: {
          borderRadius: "16px",
          background: "#1e293b",
          color: "#fff",
          fontWeight: "bold",
        },
      });
    });

    socket.on("blogUpdated", (data) => {
      const title = typeof data.title === "string" ? data.title : data.title.en;
      toast.success(`Updated: ${title}`, {
        duration: 5000,
        icon: "📝",
        style: {
          borderRadius: "16px",
          background: "#4f46e5",
          color: "#fff",
          fontWeight: "bold",
        },
      });
    });

    socket.on("notificationCreated", (data) => {
      console.log("Socket: notificationCreated", data);
      try {
        window.dispatchEvent(new CustomEvent("notification:created", { detail: data }));
      } catch (err) {
        console.error("Failed to dispatch notification:created event", err);
      }
    });

    socket.on("notificationUpdated", (data) => {
      console.log("Socket: notificationUpdated", data);
      try {
        window.dispatchEvent(new CustomEvent("notification:updated", { detail: data }));
      } catch (err) {
        console.error("Failed to dispatch notification:updated event", err);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <>{children}</>;
};
