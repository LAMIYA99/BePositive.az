"use client";
import { CheckCircle2, X } from "lucide-react";
import { motion } from "framer-motion";

export const Notification = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20, scale: 0.9 }}
    className="fixed bottom-8 right-8 z-50 bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl p-6 rounded-3xl flex items-center gap-4 min-w-[320px]"
  >
    <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-slate-900">Success!</h4>
      <p className="text-slate-600 text-sm">{message}</p>
    </div>
    <button
      onClick={onClose}
      className="p-2 hover:bg-slate-100 rounded-xl transition-all"
    >
      <X className="w-4 h-4 text-slate-400" />
    </button>
  </motion.div>
);
