"use client";

import { motion } from "framer-motion";
import { Folder, Twitter, Music, Mail } from "lucide-react";

interface DockProps {
  onOpenWindow: (title: string) => void;
}

export default function Dock({ onOpenWindow }: DockProps) {
  const icons = [
    { icon: Folder, label: "Files", action: () => onOpenWindow("Macintosh HD") },
    { icon: Twitter, label: "Twitter", action: () => window.open("https://twitter.com", "_blank") },
    { icon: Music, label: "Spotify", action: () => window.open("https://spotify.com", "_blank") },
    { icon: Mail, label: "Mail", action: () => window.location.href = "mailto:hello@punyajain.com" },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        className="flex items-end gap-4 px-6 py-3 bg-white/80 backdrop-blur-md border-2 border-black rounded-2xl shadow-lg"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 200, damping: 20 }}
      >
        {icons.map((item, index) => (
          <motion.div
            key={index}
            className="relative group flex flex-col items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.2, y: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={item.action}
          >
            <div className="p-3 bg-white border-2 border-black rounded-xl shadow-sm group-hover:shadow-md transition-all">
              <item.icon size={24} />
            </div>
            <span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded font-mono whitespace-nowrap">
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
