"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useResumeData } from "@/hooks/useResumeData";
import SnakeGameTeaserCard from "./snake/SnakeGameTeaserCard";
import { SNAKE_GAME_STORAGE_KEY } from "@/hooks/useSnakeGame";

const SnakeGameModal = dynamic(() => import("./snake/SnakeGameModal"), {
    ssr: false,
});

export default function SnakeGameSection() {
    const { ui } = useResumeData();
    const [open, setOpen] = useState(false);
    const [bestScore, setBestScore] = useState(0);

    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            const stored = window.localStorage.getItem(SNAKE_GAME_STORAGE_KEY);
            if (!stored) return;
            const parsed = Number(stored);
            if (!Number.isNaN(parsed)) {
                setBestScore(parsed);
            }
        } catch {
            // Ignore storage failures.
        }
    }, []);

    return (
        <>
            <SnakeGameTeaserCard labels={ui.snakeGame} bestScore={bestScore} onPlay={() => setOpen(true)} />
            <SnakeGameModal
                open={open}
                onClose={() => setOpen(false)}
                bestScore={bestScore}
                onBestScoreChange={setBestScore}
                labels={ui.snakeGame}
            />
        </>
    );
}
