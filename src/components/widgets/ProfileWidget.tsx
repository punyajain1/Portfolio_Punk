"use client";

import { User } from "lucide-react";

export default function ProfileWidget() {
  return (
    <div className="w-80 bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-default">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 border-2 border-black flex items-center justify-center bg-gray-100 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-50"></div>
            <User size={48} className="text-black z-10" />
        </div>
        <div className="flex flex-col">
            <h3 className="font-bold font-mono text-2xl leading-none">Punya Jain</h3>
            <span className="text-sm font-mono text-gray-500 mt-2 border-b border-black w-fit">Full Stack Dev</span>
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <div className="h-3 w-3 bg-black rounded-full"></div>
        <div className="h-3 w-3 bg-gray-400 rounded-full"></div>
        <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}
