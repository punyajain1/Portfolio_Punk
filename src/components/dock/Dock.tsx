"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Folder, Mail } from "lucide-react";

interface DockProps {
  onOpenWindow: (title: string) => void;
  isSynthwave?: boolean;
}

const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const SpotifyIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

export default function Dock({ onOpenWindow, isSynthwave }: DockProps) {
  const icons = [
    { icon: Folder, label: "Files", action: () => onOpenWindow("Macintosh HD") },
    { icon: XIcon, label: "X", action: () => window.open("https://x.com/PunkCompiler", "_blank") },
    { icon: SpotifyIcon, label: "Spotify", action: () => window.open("https://open.spotify.com/track/3hRV0jL3vUpRrcy398teAU?si=8dedccd90cc14e0b", "_blank") },
    { icon: Mail, label: "Mail", action: () => window.location.href = "mailto:punya01155@gmail.com" },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 md:px-0">
      <motion.div
        className={`flex items-end justify-center gap-2 md:gap-4 px-4 py-2 md:px-6 md:py-3 backdrop-blur-md border-2 rounded-2xl shadow-lg w-fit mx-auto transition-colors duration-500 ${isSynthwave ? 'bg-black/80 border-[#00f7ff] shadow-[0_0_20px_rgba(0,247,255,0.3)]' : 'bg-white/80 border-black'}`}
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
            <div className={`p-2 md:p-3 rounded-xl border-2 shadow-sm group-hover:shadow-md transition-all ${isSynthwave ? 'bg-black border-[#ff0055] text-[#00f7ff] hover:bg-[#ff0055] hover:text-black hover:border-[#00f7ff] shadow-[0_0_10px_#ff0055]' : 'bg-white border-black hover:bg-black hover:text-white'}`}>
              <item.icon size={20} className="md:w-6 md:h-6" />
            </div>
            <span className={`absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 rounded font-mono whitespace-nowrap hidden md:block ${isSynthwave ? 'bg-[#00f7ff] text-black border border-[#ff0055]' : 'bg-black text-white'}`}>
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
