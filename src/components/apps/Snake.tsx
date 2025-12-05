"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface SnakeProps {
  onClose: () => void;
}

type Point = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const GRID_SIZE = 20;
const CELL_SIZE = 15;
const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 20;

export default function Snake({ onClose }: SnakeProps) {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback((): Point => {
    return {
      x: Math.floor(Math.random() * BOARD_WIDTH),
      y: Math.floor(Math.random() * BOARD_HEIGHT),
    };
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection("RIGHT");
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
        case " ":
            setIsPaused(prev => !prev);
            break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = { ...head };

        switch (direction) {
          case "UP":
            newHead.y -= 1;
            break;
          case "DOWN":
            newHead.y += 1;
            break;
          case "LEFT":
            newHead.x -= 1;
            break;
          case "RIGHT":
            newHead.x += 1;
            break;
        }

        // Check collisions
        if (
          newHead.x < 0 ||
          newHead.x >= BOARD_WIDTH ||
          newHead.y < 0 ||
          newHead.y >= BOARD_HEIGHT ||
          prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
        ) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 1);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    gameLoopRef.current = setInterval(moveSnake, 150);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [direction, food, gameOver, isPaused, generateFood]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#9bbc0f] p-4 font-mono border-4 border-[#0f380f]">
      <div className="mb-2 flex justify-between w-full max-w-[300px] text-[#0f380f] font-bold">
        <span>SCORE: {score}</span>
        <span>{isPaused ? "PAUSED" : "PLAYING"}</span>
      </div>
      
      <div 
        className="relative bg-[#8bac0f] border-4 border-[#0f380f]"
        style={{ 
            width: BOARD_WIDTH * CELL_SIZE, 
            height: BOARD_HEIGHT * CELL_SIZE 
        }}
      >
        {snake.map((segment, i) => (
          <div
            key={i}
            className="absolute bg-[#0f380f]"
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          />
        ))}
        <div
          className="absolute bg-[#0f380f] rounded-full"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        />
        
        {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#9bbc0f]/80 text-[#0f380f] font-bold">
                <p className="text-xl mb-2">GAME OVER</p>
                <button 
                    onClick={resetGame}
                    className="border-2 border-[#0f380f] px-4 py-1 hover:bg-[#0f380f] hover:text-[#9bbc0f] transition-colors"
                >
                    RESTART
                </button>
            </div>
        )}
      </div>
      
      <div className="mt-4 text-[#0f380f] text-xs text-center">
        <p>Use Arrow Keys to Move</p>
        <p>Space to Pause</p>
      </div>
    </div>
  );
}
