"use client";

import { Folder, FileText, Mail } from "lucide-react";
import { MouseEvent } from "react";

interface DesktopIconProps {
  label: string;
  type: "folder" | "file" | "mail";
  onClick?: (e: MouseEvent) => void;
  selected?: boolean;
}

export default function DesktopIcon({ label, type, onClick, selected }: DesktopIconProps) {
  const Icon = type === "folder" ? Folder : type === "mail" ? Mail : FileText;

  return (
    <div
      className={`flex flex-col items-center gap-1 w-24 p-2 cursor-pointer group gravity-element ${
        selected ? "" : "hover:bg-gray-200"
      }`}
      onClick={onClick}
    >
      <div className={`p-2 border-2 border-black bg-white ${selected ? "invert" : ""}`}>
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <span className={`text-xs text-center font-mono bg-white px-1 border border-transparent ${selected ? "bg-black text-white border-black border-dashed" : "group-hover:border-black"}`}>
        {label}
      </span>
    </div>
  );
}
