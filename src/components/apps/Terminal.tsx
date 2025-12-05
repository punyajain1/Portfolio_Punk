"use client";

import { useState, useEffect, useRef } from "react";

interface TerminalProps {
  onClose: () => void;
  onMatrix: () => void;
  onOpenSnake: () => void;
  onGravity: () => void;
}

export default function Terminal({ onClose, onMatrix, onOpenSnake, onGravity }: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Welcome to PortfolioOS Terminal v∞",
    "Type 'help' for a list of commands.",
    "",
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
    inputRef.current?.focus();
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, `> ${cmd}`];

    switch (trimmedCmd) {
      case "help":
        newHistory.push(
          "Available commands:",
          "  about     - Who am I?",
          "  projects  - List projects",
          "  skills    - List skills",
          "  contact   - Contact info",
          "  clear     - Clear terminal",
          "  exit      - Close terminal",
          "  sudo      - ???",
          "  matrix    - Enter the Matrix",
          "  snake     - Play a game",
          "  gravity   - ???",
          "  date      - Current date/time"
        );
        break;
      case "about":
        newHistory.push(
          "Name: Punk (Maintaining Anonymity)",
          "Role: Full Stack + AI Developer",
          "Mission: Building cool stuff on the internet."
        );
        break;
      case "projects":
        newHistory.push(
          "1. Portfolio (You are here)",
          "2. Financial AI Advisor",
          "3. Winter Arc App",
          "Type 'open <project_name>' to view details (Coming soon)"
        );
        break;
      case "skills":
        newHistory.push(
          "Frontend: React, Next.js, Tailwind, TypeScript",
          "Backend: Node.js, Python, PostgreSQL",
          "Tools: Git, Docker, AWS"
        );
        break;
      case "contact":
        newHistory.push(
          "Email: punya01155@gmail.com",
          "Twitter: @PunkCompiler"
        );
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "exit":
        onClose();
        return;
      case "sudo":
        newHistory.push("Nice try. You have no power here.");
        break;
      case "matrix":
        newHistory.push("Wake up, Neo...");
        setTimeout(() => {
            onMatrix();
        }, 1000);
        break;
      case "snake":
        newHistory.push("Launching Snake.exe...");
        setTimeout(() => {
            onOpenSnake();
        }, 500);
        break;
      case "gravity":
        newHistory.push("Warning: Artificial Gravity Generator failing...");
        setTimeout(() => {
            onGravity();
        }, 1000);
        break;
      case "date":
        newHistory.push(new Date().toString());
        break;
      case "":
        break;
      default:
        newHistory.push(`Command not found: ${cmd}`);
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <div 
      className="h-full bg-black text-green-500 font-mono p-4 text-sm overflow-y-auto custom-scrollbar"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="space-y-1">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {line}
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <span className="mr-2">{">"}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-green-500 focus:ring-0 p-0"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
