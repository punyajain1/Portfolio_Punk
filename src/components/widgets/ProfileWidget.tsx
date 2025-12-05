"use client";

import { User } from "lucide-react";
import Image from "next/image";

export default function ProfileWidget() {
  return (
    <div className="w-full max-w-[240px] md:max-w-[320px] bg-white border-2 border-black p-4 md:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-default gravity-element">
      <div className="">
        <div className="w-full h-40 md:h-60 border-2 border-black  bg-gray-100 overflow-hidden relative mb-4">
            <Image 
              src="/avatar.png" 
              alt="PunkCompiler Avatar" 
              fill 
              className="object-cover z-10"
            />
        </div>
        <div className="flex flex-col">
            <h3 className="font-bold font-mono text-xl md:text-2xl leading-none">PunkCompiler</h3>
            <span className="text-xs md:text-sm font-mono text-gray-500 mt-2 border-b border-black w-fit">Broke, confused, but too stubborn to quit</span>
        </div>
      </div>
      <div className="mt-4 md:mt-6 flex gap-3">
        <div className="h-3 w-3 bg-black rounded-full"></div>
        <div className="h-3 w-3 bg-gray-400 rounded-full"></div>
        <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}
