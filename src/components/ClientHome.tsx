"use client";

import { useState } from "react";
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

  const toggleWindow = (title: string) => {
    if (openWindows.includes(title)) {
      setOpenWindows(openWindows.filter((w) => w !== title));
    } else {
      setOpenWindows([...openWindows, title]);
    }
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
