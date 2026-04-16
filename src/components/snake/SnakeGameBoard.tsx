"use client";

import { motion } from "framer-motion";
import { SnakeDirection, SnakePoint } from "@/hooks/useSnakeGame";

interface SnakeGameBoardProps {
    boardSize: number;
    snake: SnakePoint[];
    food: SnakePoint;
    direction: SnakeDirection;
    onInteract?: () => void;
    interactive?: boolean;
    compact?: boolean;
    className?: string;
}

export default function SnakeGameBoard({
    boardSize,
    snake,
    food,
    direction,
    onInteract,
    interactive = true,
    compact = false,
    className = "",
}: SnakeGameBoardProps) {
    const snakeLookup = new Map(snake.map((segment, index) => [`${segment.x},${segment.y}`, index]));
    const head = snake[0];
    const cells = [];

    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            const key = `${x},${y}`;
            const segmentIndex = snakeLookup.get(key);
            const isFood = food.x === x && food.y === y;
            const isHead = head?.x === x && head?.y === y;

            cells.push(
                <div
                    key={key}
                    className={`relative aspect-square rounded-[0.45rem] border ${compact ? "border-white/[0.03]" : "border-white/[0.04]"} bg-white/[0.02]`}
                >
                    {segmentIndex !== undefined && (
                        <div
                            className={`absolute inset-[10%] rounded-[0.42rem] ${isHead
                                ? "bg-gradient-to-br from-[#00d4ff] via-[#4ddfff] to-[#a855f7] shadow-[0_0_24px_rgba(0,212,255,0.22)]"
                                : segmentIndex === snake.length - 1
                                    ? "bg-[#00d4ff]/35"
                                    : "bg-[#00d4ff]/55"
                                }`}
                        >
                            {isHead && (
                                <div
                                    className={`absolute inset-0 flex items-center justify-center gap-[10%] text-[0.32rem] text-[#031018]
                                        ${direction === "up" ? "flex-row pt-[16%]" : ""}
                                        ${direction === "down" ? "flex-row pb-[16%]" : ""}
                                        ${direction === "left" ? "flex-col pl-[16%]" : ""}
                                        ${direction === "right" ? "flex-col pr-[16%]" : ""}
                                    `}
                                >
                                    <span className="h-[14%] w-[14%] rounded-full bg-current" />
                                    <span className="h-[14%] w-[14%] rounded-full bg-current" />
                                </div>
                            )}
                        </div>
                    )}

                    {isFood && (
                        <motion.div
                            className="absolute inset-[22%] rounded-full bg-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.32)]"
                            animate={{ scale: [1, 1.12, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                        />
                    )}
                </div>
            );
        }
    }

    return (
        <div
            className={`relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#090b10]/90 p-2.5 shadow-[0_18px_80px_rgba(0,0,0,0.35)] ${interactive ? "cursor-pointer" : ""} ${className}`}
            onPointerDown={interactive ? onInteract : undefined}
            role={interactive ? "button" : undefined}
            tabIndex={interactive ? 0 : -1}
            onKeyDown={interactive ? (event) => {
                if (event.key === " " || event.key === "Enter") {
                    event.preventDefault();
                    onInteract?.();
                }
            } : undefined}
            aria-label={interactive ? "Snake game board" : undefined}
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.09),transparent_50%)]" />
            <div
                className="relative grid gap-1"
                style={{ gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))` }}
            >
                {cells}
            </div>
        </div>
    );
}
