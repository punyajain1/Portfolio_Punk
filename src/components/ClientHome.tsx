"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import MenuBar from "@/components/layout/MenuBar";
import Desktop from "@/components/desktop/Desktop";
import Dock from "@/components/dock/Dock";

interface ClientHomeProps {
  photos: string[];
}

export default function ClientHome({ photos }: ClientHomeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [openWindows, setOpenWindows] = useState<string[]>(["About Me.txt"]);

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
  }, [openWindows]); // Add openWindows to dependency if toggleWindow depends on it, or use functional update in toggleWindow

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
    <main className="h-screen w-screen overflow-hidden flex flex-col font-sans text-black bg-white selection:bg-black selection:text-white">
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <MenuBar 
            onOpenContact={() => toggleWindow("Contact Info.txt")} 
            onOpenMessage={() => toggleWindow("Leave a Message")}
            onOpenPhotos={() => toggleWindow("Photos")}
          />
          <div className="flex-1 pt-8 flex flex-col relative">
            <Desktop openWindows={openWindows} toggleWindow={toggleWindow} photos={photos} />
            <Dock onOpenWindow={toggleWindow} />
          </div>
        </>
      )}
    </main>
  );
}
