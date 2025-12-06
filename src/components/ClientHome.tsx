"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import MenuBar from "@/components/layout/MenuBar";
import Desktop from "@/components/desktop/Desktop";
import Dock from "@/components/dock/Dock";
import MatrixRain from "@/components/MatrixRain";

interface ClientHomeProps {
  photos: string[];
}

export default function ClientHome({ photos }: ClientHomeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [openWindows, setOpenWindows] = useState<string[]>(["About Me.txt"]);
  const [isRetro, setIsRetro] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [isSynthwave, setIsSynthwave] = useState(false);

  // Konami Code Easter Egg
  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let cursor = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[cursor]) {
        cursor++;
        if (cursor === konamiCode.length) {
          toggleWindow("Secrets.txt");
          cursor = 0;
        }
      } else {
        cursor = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Console Easter Egg
  useEffect(() => {
    console.log("%cHello, curious developer 👀", "color:#6cf; font-size:16px;");
    console.log("Explorers are my favorite kind of people.");
  }, []);

  const toggleWindow = (title: string) => {
    setOpenWindows((prev) => {
      if (prev.includes(title)) {
        return prev.filter((w) => w !== title);
      } else {
        return [...prev, title];
      }
    });
  };

  return (
    <main className={`h-screen w-screen overflow-hidden flex flex-col font-sans text-black bg-white selection:bg-black selection:text-white ${isRetro ? 'crt-mode' : ''}`}>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <MenuBar 
            onOpenContact={() => toggleWindow("Contact Info.txt")} 
            onOpenMessage={() => toggleWindow("Leave a Message")}
            onOpenPhotos={() => toggleWindow("Photos")}
            onOpenTerminal={() => toggleWindow("Terminal")}
            toggleRetro={() => setIsRetro(!isRetro)}
            isSynthwave={isSynthwave}
          />
          <div className="flex-1 pt-8 flex flex-col relative">
            <Desktop 
                openWindows={openWindows} 
                toggleWindow={toggleWindow} 
                photos={photos} 
                onMatrix={() => setShowMatrix(true)}
                isSynthwave={isSynthwave}
                setIsSynthwave={setIsSynthwave}
            />
            <Dock onOpenWindow={toggleWindow} isSynthwave={isSynthwave} />
          </div>
          {showMatrix && <MatrixRain onClose={() => setShowMatrix(false)} />}
        </>
      )}
    </main>
  );
}
