"use client";

import { motion } from "framer-motion";
import { X, Minus, Square } from "lucide-react";
import { ReactNode, useRef, useState, useEffect } from "react";

interface WindowProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  center?: boolean;
  index?: number;
}

export default function Window({ title, children, isOpen, onClose, className = "", center = false, index = 0 }: WindowProps) {
  const initialIndex = useRef(index);
  const [isMobile, setIsMobile] = useState(false);
  
  // Add some randomness to the scatter so even same-index windows don't perfectly overlap
  const randomOffset = useRef({
    x: Math.random() * 40 - 20,
    y: Math.random() * 40 - 20
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isOpen) return null;

  // Calculate position offsets
  // On mobile, we keep it tighter. On desktop, we scatter more.
  const baseOffset = isMobile ? 20 : 40;
  const scatterX = center ? "-50%" : (initialIndex.current * baseOffset) + randomOffset.current.x;
  const scatterY = center ? "-50%" : (initialIndex.current * baseOffset) + randomOffset.current.y;

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0, x: scatterX, y: scatterY }}
      animate={{ scale: 1, opacity: 1, x: scatterX, y: scatterY }}
      exit={{ scale: 0.9, opacity: 0, x: scatterX, y: scatterY }}
      className={`absolute ${center ? "top-1/2 left-1/2" : "top-10 left-2 md:top-20 md:left-20"} bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-[95vw] md:w-[600px] max-w-[95vw] z-30 gravity-element ${className}`}
    >
      {/* Title Bar */}
      <div className="h-8 border-b-2 border-black flex items-center justify-between px-2 bg-white handle cursor-move">
        <div className="w-4 h-4 border-2 border-black bg-white flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors" onClick={onClose}>
          <X size={10} />
        </div>
        <span className="font-mono font-bold text-sm uppercase tracking-widest bg-white px-2">
          {title}
        </span>
        <div className="flex gap-1">
            <div className="w-4 h-4 border-2 border-black bg-white flex items-center justify-center">
                <Minus size={10} />
            </div>
            <div className="w-4 h-4 border-2 border-black bg-white flex items-center justify-center">
                <Square size={8} />
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 font-mono text-sm h-[60vh] md:h-[400px] overflow-y-auto custom-scrollbar">
        {children}
      </div>
    </motion.div>
  );
}
