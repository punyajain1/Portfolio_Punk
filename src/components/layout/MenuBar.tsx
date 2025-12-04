"use client";

import { useState, useEffect } from "react";

interface MenuBarProps {
  onOpenContact: () => void;
  onOpenMessage: () => void;
  onOpenPhotos: () => void;
}

export default function MenuBar({ onOpenContact, onOpenMessage, onOpenPhotos }: MenuBarProps) {
  const [time, setTime] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-white border-b-2 border-black flex items-center justify-between px-4 z-40 font-mono text-sm select-none" onClick={() => setActiveMenu(null)}>
      <div className="flex items-center gap-6 relative">
        <span className="text-lg"></span>
        <span className="font-bold cursor-pointer hover:underline">File</span>
        
        <div className="relative" onClick={(e) => e.stopPropagation()}>
            <span className={`cursor-pointer hover:underline ${activeMenu === 'edit' ? 'bg-black text-white px-1' : ''}`} onClick={() => toggleMenu('edit')}>Edit</span>
            {activeMenu === 'edit' && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] py-1 z-50">
                    <div className="px-4 py-2 hover:bg-black hover:text-white cursor-pointer" onClick={() => { onOpenMessage(); setActiveMenu(null); }}>
                        Leave a Message
                    </div>
                </div>
            )}
        </div>

        <div className="relative" onClick={(e) => e.stopPropagation()}>
            <span className={`cursor-pointer hover:underline ${activeMenu === 'view' ? 'bg-black text-white px-1' : ''}`} onClick={() => toggleMenu('view')}>View</span>
            {activeMenu === 'view' && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] py-1 z-50">
                    <div className="px-4 py-2 hover:bg-black hover:text-white cursor-pointer" onClick={() => { onOpenPhotos(); setActiveMenu(null); }}>
                        Photos
                    </div>
                </div>
            )}
        </div>

        <span className="cursor-pointer hover:underline" onClick={onOpenContact}>Help</span>
      </div>
      <div className="flex items-center gap-4">
        <button 
            className="bg-black text-white px-3 py-0.5 hover:bg-gray-800 transition-colors uppercase text-xs font-bold tracking-wider"
            onClick={onOpenContact}
        >
            Hire Me
        </button>
        <span>{time}</span>
      </div>
    </div>
  );
}
