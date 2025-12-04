"use client";

import { useState } from "react";
import Image from "next/image";
import DesktopIcon from "./DesktopIcon";
import Window from "../window/Window";
import ProfileWidget from "../widgets/ProfileWidget";
import StatusWidget from "../widgets/StatusWidget";

interface DesktopProps {
  openWindows: string[];
  toggleWindow: (title: string) => void;
  photos: string[];
}

type IconType = "file" | "folder";

interface IconItem {
    label: string;
    type: IconType;
}

export default function Desktop({ openWindows, toggleWindow, photos }: DesktopProps) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const icons: IconItem[] = [
    { label: "About Me.txt", type: "file" },
    { label: "Education.txt", type: "file" },
    { label: "Work Experience.txt", type: "file" },
    { label: "Skills.txt", type: "file" },
    { label: "Projects", type: "folder" },
    { label: "Contact Info.txt", type: "file" },
  ];

  const projectIcons: IconItem[] = [
    { label: "Portfolio.txt", type: "file" },
    { label: "Financial AI Advisor.txt", type: "file" },
    { label: "Winter Arc App.txt", type: "file" },
    { label: "More Projects.txt", type: "file" },
  ];

  return (
    <div
      className="flex-1 relative p-4 overflow-hidden"
      style={{
        backgroundImage: "url('/Background.png'), radial-gradient(rgba(0, 0, 0, 0.5) 1px, transparent 1px)",
        backgroundSize: "35%, 20px 20px",
        backgroundPosition: "center, 0 0",
        backgroundRepeat: "no-repeat, repeat",
        backgroundColor: "#FFFFFF"
      }}
      onClick={() => setSelectedIcon(null)}
    >
      {/* Widgets Area */}
      <div className="absolute top-4 right-4 flex flex-col gap-4 items-end z-10 pointer-events-none">
        <div className="pointer-events-auto">
            <ProfileWidget />
        </div>
        <div className="pointer-events-auto">
            <StatusWidget />
        </div>
      </div>

      {/* Icons Grid */}
      <div className="absolute top-4 left-4 flex flex-col flex-wrap gap-4 h-[calc(100%-2rem)] content-start items-start w-fit">
         {icons.map((icon) => (
          <div key={icon.label} onDoubleClick={() => toggleWindow(icon.label)}>
              <DesktopIcon
                label={icon.label}
                type={icon.type}
                selected={selectedIcon === icon.label}
                onClick={() => setSelectedIcon(icon.label)}
              />
          </div>
        ))}
      </div>


      {/* Windows */}
      {openWindows.map((title) => (
        <Window
          key={title}
          title={title}
          isOpen={true}
          onClose={() => toggleWindow(title)}
          center={title === "About Me.txt"}
        >
          {title === "About Me.txt" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">About Me</h2>
                <p>I am a developer focused on Full-Stack Engineering and Generative AI, actively exploring modern web technologies and AI-driven development workflows.</p>
                <p>My profile highlights hands-on experience building full-stack projects, combining frontend, backend, and AI integration skills to create practical, functional applications. I position myself as someone who is constantly learning, experimenting, and improving through real projects rather than theory alone.</p>
                <p>I am also open to internship opportunities, especially in SDE, Full-Stack, or GenAI roles, showing a strong desire to work in fast-moving, impact-driven environments.</p>
                <p>I am a motivated developer who enjoys building, shipping, and exploring cutting-edge AI technologies while contributing to meaningful product ideas.</p>
            </div>
          )}
          {title === "Education.txt" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Education</h2>
                <div className="border-l-2 border-black pl-4">
                    <h3 className="font-bold">Bachelor of Technology in Computer Science Engineering</h3>
                    <p className="text-sm text-gray-600">2023 - 2027</p>
                    <p className="text-xs text-gray-500 mt-1">Noida, Uttar Pradesh</p>
                    <div className="mt-2 space-y-1">
                        <p className="text-sm"><strong>CGPA:</strong> 8.00</p>
                        <p className="text-sm"><strong>Expected Graduation:</strong> Aug 2027</p>
                    </div>
                </div>
            </div>
          )}
          {title === "Work Experience.txt" && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Work Experience</h2>
              <div className="flex flex-col gap-4">
                {/* Starportal */}
                <div className="border-2 border-black p-3 hover:bg-black hover:text-white transition-colors cursor-default group">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">Frontend Developer</h3>
                        <span className="text-xs font-mono border border-black px-1 group-hover:border-white">June 2025 - July 2025</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-mono text-sm opacity-70">Starportal (Freelance)</p>
                    </div>
                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                        <li>Developed the frontend for a fast-paced startup using React, TypeScript, and Framer Motion to deliver a smooth, responsive user experience.</li>
                        <li>Implemented interactive UI components, micro-animations, and dynamic layouts to enhance user engagement.</li>
                        <li>Worked closely with the CEO and design team to build pixel-perfect, performant interfaces aligned with the brand vision.</li>
                        <li>Redesigned the entire frontend architecture to improve user experience and performance.</li>
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-1">
                        {["Next.js", "shadcn/ui", "TypeScript", "Tailwind CSS", "Framer Motion", "GitHub"].map(tech => (
                            <span key={tech} className="text-[10px] border border-black px-1 group-hover:border-white">{tech}</span>
                        ))}
                    </div>
                </div>

                {/* Anonymous */}
                <div className="border-2 border-black p-3 hover:bg-black hover:text-white transition-colors cursor-default group">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">Backend Developer</h3>
                        <span className="text-xs font-mono border border-black px-1 group-hover:border-white">June 2025 - June 2025</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-mono text-sm opacity-70">Anonymous (Freelance)</p>
                    </div>
                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                        <li>Migrated backend database from MongoDB with Mongoose to PostgreSQL.</li>
                        <li>Utilized Prisma ORM for schema definition and database management.</li>
                        <li>Ensured data integrity and safety during migration process.</li>
                        <li>Maintained schema consistency across different environments.</li>
                        <li>Optimized queries and relations for PostgreSQL performance.</li>
                        <li>Implemented safety checks to prevent data loss or corruption.</li>
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-1">
                        {["PostgreSQL", "Node.js", "TypeScript", "Prisma", "MongoDB", "Mongoose", "Express"].map(tech => (
                            <span key={tech} className="text-[10px] border border-black px-1 group-hover:border-white">{tech}</span>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          )}
          {title === "Skills.txt" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Skills</h2>
                
                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold mb-2 border-b border-black w-fit">Programming Languages</h3>
                        <div className="flex flex-wrap gap-2">
                            {["C++", "Python", "JavaScript", "TypeScript", "Java"].map(skill => (
                                <span key={skill} className="px-2 py-1 border border-black text-xs font-bold hover:bg-black hover:text-white transition-colors cursor-default">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2 border-b border-black w-fit">Frameworks & Libraries</h3>
                        <div className="flex flex-wrap gap-2">
                            {["React", "Next.js", "LangChain", "OpenAI SDK", "Anthropic SDK", "Gemini SDK", "Tailwind CSS", "Framer Motion", "shadcn/ui", "Radix UI", "Zod"].map(skill => (
                                <span key={skill} className="px-2 py-1 border border-black text-xs font-bold hover:bg-black hover:text-white transition-colors cursor-default">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2 border-b border-black w-fit">Databases</h3>
                        <div className="flex flex-wrap gap-2">
                            {["MongoDB", "PostgreSQL", "MySQL", "Supabase"].map(skill => (
                                <span key={skill} className="px-2 py-1 border border-black text-xs font-bold hover:bg-black hover:text-white transition-colors cursor-default">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2 border-b border-black w-fit">Tools & Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                            {["Node.js", "Vite", "Git", "GitHub", "Prisma", "Mongoose", "Bcrypt", "Figma"].map(skill => (
                                <span key={skill} className="px-2 py-1 border border-black text-xs font-bold hover:bg-black hover:text-white transition-colors cursor-default">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div className="p-2 border border-black bg-gray-100">
                        <p className="text-sm font-mono"><strong>Current Focus:</strong> Data Structures & Algorithms (DSA)</p>
                    </div>
                </div>
            </div>
          )}
          {title === "Projects" && (
             <div className="grid grid-cols-3 gap-4">
                {projectIcons.map((icon) => (
                    <div key={icon.label} className="flex flex-col items-center cursor-pointer hover:bg-gray-200 p-2 rounded" onDoubleClick={() => toggleWindow(icon.label)}>
                        <div className="w-10 h-10 border border-black flex items-center justify-center bg-white mb-1">
                            <span className="text-xs">{icon.type === 'folder' ? 'DIR' : 'FILE'}</span>
                        </div>
                        <span className="text-xs text-center">{icon.label}</span>
                    </div>
                ))}
             </div>
          )}
          {title === "Portfolio.txt" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Portfolio</h2>
                <p>This is a retro-styled portfolio website inspired by Mac OS 9, built with Next.js, Tailwind CSS, and Framer Motion.</p>
                <p>It features a functional window system, drag-and-drop interface (simulated), and a nostalgic design that pays homage to the classic computing era.</p>
                <div className="mt-4">
                    <h3 className="font-bold">Tech Stack:</h3>
                    <ul className="list-disc list-inside text-sm">
                        <li>Next.js 14 (App Router)</li>
                        <li>Tailwind CSS</li>
                        <li>Framer Motion</li>
                        <li>Lucide React Icons</li>
                    </ul>
                </div>
            </div>
          )}
          {title === "Financial AI Advisor.txt" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Financial AI Advisor</h2>
                <p>An AI-powered financial adviser built with Node.js, Express, TypeScript, and Google Gemini AI with Google Search grounding. Provides real-time analysis, recommendations, and investment guidance for cryptocurrencies and precious metals.</p>
                
                <div className="space-y-2">
                    <h3 className="font-bold border-b border-black w-fit">Features</h3>
                    <ul className="list-disc list-inside text-sm space-y-1">
                        <li><strong>Portfolio Management System:</strong> Add/update assets, Automated analysis, AI recommendations, Technical analysis, Sentiment analysis, Risk assessment.</li>
                        <li><strong>Real-Time News Aggregation:</strong> Multi-source fetching, Sentiment analysis, SSE updates, Filtering, Deduplication.</li>
                        <li><strong>Intelligent Chatbot:</strong> Gemini AI with grounding, Real-time web info, Citations, Context-aware, Personalized advice.</li>
                    </ul>
                </div>

                <div className="space-y-2">
                    <h3 className="font-bold border-b border-black w-fit">Tech Stack</h3>
                    <div className="flex flex-wrap gap-1">
                        {["Node.js", "TypeScript", "Express.js", "PostgreSQL", "Prisma", "Google Gemini AI", "HuggingFace FinBERT", "CoinGecko API", "NewsAPI"].map(tech => (
                            <span key={tech} className="text-[10px] border border-black px-1 bg-gray-100">{tech}</span>
                        ))}
                    </div>
                </div>
            </div>
          )}
          {title === "Winter Arc App.txt" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Winter Arc App</h2>
                <p>A personal life-alignment companion that acts as your "big brother" during your Winter Arc journey. Built with React Native, Expo, and AI-powered harsh motivation.</p>
                
                <div className="space-y-2">
                    <h3 className="font-bold border-b border-black w-fit">Features</h3>
                    <ul className="list-disc list-inside text-sm space-y-1">
                        <li><strong>Core Features:</strong> Onboarding Flow, Daily Check-ins, Streak System, Goals Management, Story/Journey Timeline, Settings & Profile, AI Backend, Minimalistic UI.</li>
                        <li><strong>Data Persistence:</strong> AsyncStorage, Offline-first.</li>
                        <li><strong>Push Notifications:</strong> Daily check-in reminders, harsh AI reminders.</li>
                    </ul>
                </div>

                <div className="space-y-2">
                    <h3 className="font-bold border-b border-black w-fit">Tech Stack</h3>
                    <div className="flex flex-wrap gap-1">
                        {["React Native", "Expo SDK 54", "expo-router", "Node.js", "TypeScript", "Express", "Google Gemini AI", "AsyncStorage"].map(tech => (
                            <span key={tech} className="text-[10px] border border-black px-1 bg-gray-100">{tech}</span>
                        ))}
                    </div>
                </div>
            </div>
          )}
          {title === "More Projects.txt" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">More Projects</h2>
                <div className="p-4 border-2 border-black bg-gray-100 text-center">
                    <p className="font-bold text-lg mb-2">Want to see more?</p>
                    <p>DM me on X <a href="https://x.com/PunkCompiler" className="underline font-bold">@PunkCompiler</a> to get access to my full GitHub repositories and other portfolio projects that contain all my detailed information.</p>
                </div>
            </div>
          )}
          {title === "Contact Info.txt" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Contact Info</h2>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="font-bold w-20">Email:</span>
                        <a href="mailto:punya01155@gmail.com" className="underline hover:no-underline">punya01155@gmail.com</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold w-20">X:</span>
                        <a href="https://x.com/PunkCompiler" className="underline hover:no-underline">@PunkCompiler</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold w-20">GitHub:</span>
                        <a href="https://x.com/PunkCompiler" className="underline hover:no-underline">DM on X for GitHub(just to mentain annonymity of myself)</a>
                    </div>
                </div>
                <div className="mt-4 p-4 border-2 border-black bg-gray-100 text-center">
                    <p className="font-bold">Available for freelance work!</p>
                </div>
            </div>
          )}
          {title === "Macintosh HD" && (
             <div className="grid grid-cols-3 gap-4">
                {icons.map((icon) => (
                    <div key={icon.label} className="flex flex-col items-center cursor-pointer hover:bg-gray-200 p-2 rounded" onDoubleClick={() => toggleWindow(icon.label)}>
                        <div className="w-10 h-10 border border-black flex items-center justify-center bg-white mb-1">
                            <span className="text-xs">{icon.type === 'folder' ? 'DIR' : 'FILE'}</span>
                        </div>
                        <span className="text-xs text-center">{icon.label}</span>
                    </div>
                ))}
             </div>
          )}
          {title === "Leave a Message" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Leave a Message</h2>
                <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert("Message Sent! (Simulation)"); toggleWindow("Leave a Message"); }}>
                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-sm">Name:</label>
                        <input type="text" className="border-2 border-black p-2 focus:outline-none focus:bg-gray-100" placeholder="Your Name" required />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-sm">Message:</label>
                        <textarea className="border-2 border-black p-2 h-32 focus:outline-none focus:bg-gray-100 resize-none" placeholder="Type your message here..." required></textarea>
                    </div>
                    <button type="submit" className="bg-black text-white py-2 font-bold hover:bg-gray-800 transition-colors border-2 border-transparent hover:border-black">
                        SEND MESSAGE
                    </button>
                </form>
            </div>
          )}
          {title === "Photos" && (
            <div className="space-y-4">
                <div className="border-b-2 border-black pb-2 flex justify-between items-end">
                    <h2 className="text-xl font-bold uppercase">Photos</h2>
                    <span className="text-xs font-mono italic">"i love clicking pics"</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {photos.map((photo) => (
                        <div 
                            key={photo} 
                            className="aspect-square border-2 border-black bg-gray-200 flex items-center justify-center relative overflow-hidden group cursor-pointer"
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            <Image 
                                src={`/photos/${photo}`}
                                alt={photo}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        </div>
                    ))}
                    {photos.length === 0 && (
                        <p className="col-span-2 text-center text-gray-500 italic">No photos found in public/photos</p>
                    )}
                </div>
            </div>
          )}
        </Window>
      ))}

      {/* Full Screen Photo View */}
      {selectedPhoto && (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-8"
            onClick={() => setSelectedPhoto(null)}
        >
            <div className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                 <Image 
                    src={`/photos/${selectedPhoto}`}
                    alt={selectedPhoto}
                    fill
                    className="object-contain"
                />
                <button 
                    className="absolute -top-10 right-0 text-white font-bold text-xl hover:text-gray-300"
                    onClick={() => setSelectedPhoto(null)}
                >
                    CLOSE [X]
                </button>
            </div>
        </div>
      )}
    </div>
  );
}
