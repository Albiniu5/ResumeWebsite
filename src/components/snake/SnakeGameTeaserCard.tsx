"use client";

import { useEffect, useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import Magnetic from "@/components/Magnetic";
import SnakeGameBoard from "./SnakeGameBoard";

type TurnDirection = "right" | "left";

interface SnakeGameTeaserCardProps {
    labels: {
        sectionLabel: string;
        title: string;
        teaser: string;
        helper: string;
        play: string;
        bestScore: string;
        nextTap: string;
        right: string;
        left: string;
        sideQuest: string;
    };
    bestScore: number;
    onPlay: () => void;
}

const previewPath = [
    { x: 2, y: 6 },
    { x: 3, y: 6 },
    { x: 4, y: 6 },
    { x: 5, y: 6 },
    { x: 6, y: 6 },
    { x: 7, y: 6 },
    { x: 8, y: 6 },
    { x: 8, y: 5 },
    { x: 8, y: 4 },
    { x: 8, y: 3 },
    { x: 7, y: 3 },
    { x: 6, y: 3 },
    { x: 5, y: 3 },
    { x: 4, y: 3 },
    { x: 4, y: 4 },
    { x: 4, y: 5 },
    { x: 5, y: 5 },
    { x: 6, y: 5 },
];

const previewFood = [
    { x: 8, y: 4 },
    { x: 4, y: 3 },
    { x: 6, y: 5 },
];

function getDirection(current: { x: number; y: number }, next: { x: number; y: number }) {
    if (!next || next.x > current.x) return "right" as const;
    if (next.x < current.x) return "left" as const;
    if (next.y > current.y) return "down" as const;
    return "up" as const;
}

export default function SnakeGameTeaserCard({ labels, bestScore, onPlay }: SnakeGameTeaserCardProps) {
    const [frame, setFrame] = useState(0);
    const [nextTurn, setNextTurn] = useState<TurnDirection>("right");

    useEffect(() => {
        const tick = window.setInterval(() => {
            setFrame((current) => (current + 1) % previewPath.length);
        }, 260);

        const turnTick = window.setInterval(() => {
            setNextTurn((current) => (current === "right" ? "left" : "right"));
        }, 1200);

        return () => {
            window.clearInterval(tick);
            window.clearInterval(turnTick);
        };
    }, []);

    const previewSnake = Array.from({ length: 4 }, (_, index) => {
        const pathIndex = (frame - index + previewPath.length) % previewPath.length;
        return previewPath[pathIndex];
    });

    const previewHead = previewSnake[0];
    const previewNext = previewPath[(frame + 1) % previewPath.length];
    const direction = getDirection(previewHead, previewNext);
    const currentFood = previewFood[Math.floor((frame / 6) % previewFood.length)];

    return (
        <section className="relative pb-24">
            <div className="max-w-7xl mx-auto px-6">
                <AnimatedSection delay={0.08}>
                    <div
                        className="glass-card glow-border relative overflow-hidden cursor-pointer"
                        onClick={onPlay}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                            if (event.key === " " || event.key === "Enter") {
                                event.preventDefault();
                                onPlay();
                            }
                        }}
                        aria-label={`${labels.play} ${labels.title}`}
                    >
                        <div className="relative z-10 grid gap-8 p-6 md:grid-cols-[1.2fr_0.9fr] md:p-8">
                            <div className="flex flex-col justify-between gap-6">
                                <div>
                                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#00d4ff]">
                                        <span className="h-2 w-2 rounded-full bg-[#10b981]" />
                                        {labels.sectionLabel}
                                    </div>
                                    <div className="mb-2 flex flex-wrap items-center gap-3">
                                        <h3 className="text-2xl font-bold text-white sm:text-3xl">{labels.title}</h3>
                                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-400">
                                            {labels.sideQuest}
                                        </span>
                                    </div>
                                    <p className="max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base">
                                        {labels.teaser}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white">
                                        <span className="text-gray-400">{labels.nextTap}</span>
                                        <span className={`rounded-full px-2 py-0.5 ${nextTurn === "right" ? "bg-[#00d4ff]/12 text-[#00d4ff]" : "bg-[#a855f7]/12 text-[#d6b4ff]"}`}>
                                            {nextTurn === "right" ? labels.right : labels.left}
                                        </span>
                                    </div>
                                    <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-gray-400">
                                        {labels.bestScore}: <span className="font-semibold text-white">{bestScore}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                                    <Magnetic>
                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                onPlay();
                                            }}
                                            className="rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#a855f7] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_36px_rgba(0,212,255,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,212,255,0.24)] focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/40"
                                        >
                                            {labels.play}
                                        </button>
                                    </Magnetic>
                                    <p className="text-sm text-gray-500">{labels.helper}</p>
                                </div>
                            </div>

                            <div className="relative pointer-events-none">
                                <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.12),transparent_58%)]" />
                                <div className="relative mx-auto max-w-sm rounded-[1.75rem] border border-white/10 bg-black/20 p-4 backdrop-blur-sm">
                                    <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                                        <span>{labels.title}</span>
                                        <span className="rounded-full border border-white/10 px-2 py-1">{labels.helper}</span>
                                    </div>
                                    <SnakeGameBoard
                                        boardSize={10}
                                        snake={previewSnake}
                                        food={currentFood}
                                        direction={direction}
                                        interactive={false}
                                        compact
                                        className="pointer-events-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
