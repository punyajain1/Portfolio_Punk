"use client";

import { useState } from "react";
import DesktopIcon from "./DesktopIcon";
import Window from "../window/Window";
import ProfileWidget from "../widgets/ProfileWidget";
import StatusWidget from "../widgets/StatusWidget";

interface DesktopProps {
  openWindows: string[];
  toggleWindow: (title: string) => void;
}

type IconType = "file" | "folder";

interface IconItem {
    label: string;
    type: IconType;
}

export default function Desktop({ openWindows, toggleWindow }: DesktopProps) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const icons: IconItem[] = [
    { label: "About Me.txt", type: "file" },
    { label: "Education.txt", type: "file" },
    { label: "Work Experience.txt", type: "file" },
    { label: "Projects & Skills.txt", type: "file" },
    { label: "Contact Info.txt", type: "file" },
  ];

  return (
    <div
      className="flex-1 relative p-4 overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
        backgroundSize: "4px 4px",
        backgroundColor: "#e5e5e5", // Light gray background
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
                <p>Hello! I'm Punya Jain, a passionate Full Stack Developer based in the digital realm.</p>
                <p>I love building retro-inspired interfaces and modern web applications. My goal is to bridge the gap between nostalgia and cutting-edge technology.</p>
                <p>When I'm not coding, you can find me exploring vintage tech or listening to synthwave.</p>
            </div>
          )}
          {title === "Education.txt" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Education</h2>
                <div className="border-l-2 border-black pl-4">
                    <h3 className="font-bold">Bachelor of Science in Computer Science</h3>
                    <p className="text-sm text-gray-600">University of Technology • 2019 - 2023</p>
                    <p className="mt-2">Focus on Software Engineering and Human-Computer Interaction.</p>
                </div>
            </div>
          )}
          {title === "Work Experience.txt" && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Work Experience</h2>
              <div className="flex flex-col gap-4">
                <div className="border-2 border-black p-3 hover:bg-black hover:text-white transition-colors cursor-default group">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">Senior Developer</h3>
                        <span className="text-xs font-mono border border-black px-1 group-hover:border-white">2023 - Present</span>
                    </div>
                    <p className="font-mono text-sm opacity-70">Tech Corp</p>
                    <ul className="list-disc list-inside mt-2 text-sm">
                        <li>Led a team of 5 developers.</li>
                        <li>Architected scalable microservices.</li>
                    </ul>
                </div>
                <div className="border-2 border-black p-3 hover:bg-black hover:text-white transition-colors cursor-default group">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">Frontend Engineer</h3>
                        <span className="text-xs font-mono border border-black px-1 group-hover:border-white">2021 - 2023</span>
                    </div>
                    <p className="font-mono text-sm opacity-70">Startup Inc</p>
                    <ul className="list-disc list-inside mt-2 text-sm">
                        <li>Built responsive UI components.</li>
                        <li>Optimized performance by 40%.</li>
                    </ul>
                </div>
              </div>
            </div>
          )}
          {title === "Projects & Skills.txt" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Projects & Skills</h2>
                
                <div>
                    <h3 className="font-bold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "PostgreSQL", "Framer Motion"].map(skill => (
                            <span key={skill} className="px-2 py-1 border border-black text-xs font-bold hover:bg-black hover:text-white transition-colors cursor-default">{skill}</span>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold mb-2">Projects</h3>
                    <div className="grid grid-cols-1 gap-2">
                        <div className="border border-black p-2">
                            <h4 className="font-bold">Retro Portfolio</h4>
                            <p className="text-xs">A Mac OS 9 inspired portfolio website.</p>
                        </div>
                        <div className="border border-black p-2">
                            <h4 className="font-bold">E-commerce Dashboard</h4>
                            <p className="text-xs">Admin panel for managing online stores.</p>
                        </div>
                    </div>
                </div>
            </div>
          )}
          {title === "Contact Info.txt" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Contact Info</h2>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="font-bold w-20">Email:</span>
                        <a href="mailto:hello@punyajain.com" className="underline hover:no-underline">hello@punyajain.com</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold w-20">Twitter:</span>
                        <a href="#" className="underline hover:no-underline">@punyajain</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold w-20">GitHub:</span>
                        <a href="#" className="underline hover:no-underline">github.com/punyajain</a>
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
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square border-2 border-black bg-gray-200 flex items-center justify-center relative overflow-hidden group">
                            <span className="text-xs text-gray-500 z-10">Photo {i}</span>
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                            {/* Placeholder for actual images */}
                        </div>
                    ))}
                </div>
            </div>
          )}
        </Window>
      ))}
    </div>
  );
}
