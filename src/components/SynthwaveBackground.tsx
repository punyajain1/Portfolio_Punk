"use client";

import React from 'react';
import { motion } from 'framer-motion';





export default function SynthwaveBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#050011] pointer-events-none">
      {/* Stars */}
      <div className="absolute inset-0 opacity-70">
        {[...Array(70)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              scale: Math.random() * 0.8 + 0.2,
              opacity: Math.random(),
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
            }}
          />
        ))}
      </div>

      {/* Retro Sun */}
      <motion.div 
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full z-0"
        animate={{
            boxShadow: [
                "0 0 100px rgba(255,0,85,0.6)",
                "0 0 150px rgba(255,0,85,0.8)",
                "0 0 100px rgba(255,0,85,0.6)"
            ]
        }}
        transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
        }}
      >
         <div className="w-full h-full rounded-full bg-gradient-to-b from-[#ffd700] via-[#ff0055] to-[#9900ff] relative overflow-hidden">
            {/* Sun Stripes (Masking) */}
            <motion.div 
                className="absolute inset-0"
                initial={{ backgroundPosition: "0 0" }}
                animate={{ backgroundPosition: "0 -60px" }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                style={{
                    background: `repeating-linear-gradient(
                        to bottom,
                        transparent 0px,
                        transparent 40px,
                        #050011 40px,
                        #050011 45px
                    )`,
                    backgroundSize: "100% 60px",
                    maskImage: "linear-gradient(to bottom, transparent 20%, black 60%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, black 60%)"
                }}
            />
         </div>
      </motion.div>



      {/* Moving Grid (Terrain) */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[50vh] origin-bottom z-10"
        style={{
            perspective: '500px',
            transformStyle: 'preserve-3d',
        }}
      >
        <div 
            className="absolute inset-0 w-[200%] -left-[50%] h-[200%]"
            style={{
                background: `
                    linear-gradient(transparent 0%, #ff0055 2%, transparent 3%),
                    linear-gradient(90deg, transparent 0%, #00f7ff 2%, transparent 3%)
                `,
                backgroundSize: '60px 60px',
                transform: 'rotateX(60deg)',
                transformOrigin: 'bottom center',
                animation: 'gridMove 1s linear infinite',
                boxShadow: '0 0 100px #ff0055',
                maskImage: 'linear-gradient(to bottom, transparent, black 20%)'
            }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0014] via-transparent to-transparent" />
      </div>



      <style jsx>{`
        @keyframes gridMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 60px;
          }
        }
      `}</style>
    </div>
  );
}
