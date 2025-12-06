"use client";

import { useEffect, useState } from "react";
import { Power } from "lucide-react";

interface BSODProps {
  onClose: () => void;
}

export default function BSOD({ onClose }: BSODProps) {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handlePowerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setClickCount(prev => prev + 1);
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center cursor-default backdrop-blur-sm font-sans"
      onClick={onClose}
    >
      <div className="bg-[#1c1c1c] text-white p-8 md:p-12 rounded-xl shadow-2xl max-w-2xl w-[90%] flex flex-col items-center text-center space-y-8 border border-gray-800 relative overflow-hidden">
        
        <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8">
            <div 
                className={`w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-full flex items-center justify-center text-black mb-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-transform active:scale-95 cursor-pointer ${clickCount >= 5 ? 'animate-spin' : ''}`}
                onClick={handlePowerClick}
            >
                <Power size={40} strokeWidth={3} className="md:w-12 md:h-12" />
            </div>
            
            {clickCount < 5 ? (
                <div className="space-y-4 md:space-y-6 font-medium tracking-wide text-sm md:text-lg leading-relaxed select-none">
                    <p>
                        You need to restart your computer. Hold down the Power button until it turns off, then press the Power button again.
                    </p>
                    <p className="text-gray-400">
                        Veuillez redémarrer votre ordinateur. Maintenez la touche de démarrage enfoncée jusqu'à ce qu'il s'éteigne, puis appuyez à nouveau dessus.
                    </p>
                    <p className="text-gray-400">
                        Debe reiniciar el ordenador. Mantenga pulsado el botón de arranque hasta que se apague y vuelva a pulsarlo.
                    </p>
                    <p className="text-gray-400">
                        Sie müssen Ihren Computer neu starten. Halten Sie den Ein-/Ausschalter gedrückt bis das Gerät ausgeschaltet ist und drücken Sie ihn dann erneut.
                    </p>
                </div>
            ) : (
                <div className="space-y-6 font-medium tracking-wide text-lg md:text-xl leading-relaxed text-yellow-400 animate-pulse">
                    <p className="text-2xl font-bold">
                        Have you tried turning it off and on again?
                    </p>
                    <p className="text-gray-400 text-sm">
                        (Just kidding, click anywhere to close)
                    </p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
