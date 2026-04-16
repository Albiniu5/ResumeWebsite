"use client";

import { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SnakeGameBoard from "./SnakeGameBoard";
import { useSnakeGame } from "@/hooks/useSnakeGame";

interface SnakeGameModalProps {
    open: boolean;
    onClose: () => void;
    bestScore: number;
    onBestScoreChange: (score: number) => void;
    labels: {
        title: string;
        modalText: string;
        nextTap: string;
        right: string;
        left: string;
        score: string;
        bestScore: string;
        play: string;
        retry: string;
        close: string;
        intro: string;
        idleHint: string;
        gameOverTitle: string[];
        gameOverSummary: string;
        keyboardHint: string;
    };
}

function useFocusTrap(active: boolean, containerRef: React.RefObject<HTMLDivElement | null>, onClose: () => void) {
    useEffect(() => {
        if (!active || !containerRef.current) return;

        const container = containerRef.current;
        const selectors = [
            "button",
            "[href]",
            "input",
            "select",
            "textarea",
            "[tabindex]:not([tabindex='-1'])",
        ].join(",");

        const focusables = Array.from(container.querySelectorAll<HTMLElement>(selectors)).filter(
            (element) => !element.hasAttribute("disabled")
        );

        focusables[0]?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key !== "Tab" || focusables.length === 0) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [active, containerRef, onClose]);
}

export default function SnakeGameModal({ open, onClose, bestScore, onBestScoreChange, labels }: SnakeGameModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const titleId = useId();
    const descriptionId = useId();

    const {
        boardSize,
        snake,
        food,
        direction,
        nextTurn,
        status,
        score,
        bestScore: liveBestScore,
        startGame,
        restartGame,
        queueTurn,
    } = useSnakeGame({
        initialBestScore: bestScore,
        onBestScoreChange,
    });

    useFocusTrap(open, dialogRef, onClose);

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === " " || event.key === "Enter") {
                const target = event.target as HTMLElement | null;
                const isTypingSurface = !!target?.closest("button, input, textarea, select, a");

                if (!isTypingSurface) {
                    event.preventDefault();
                    queueTurn();
                }
            }
        };

        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, queueTurn]);

    const gameOverTitle = labels.gameOverTitle[score % labels.gameOverTitle.length];

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-3 backdrop-blur-md sm:items-center sm:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={titleId}
                        aria-describedby={descriptionId}
                        className="relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0d12]/95 shadow-[0_30px_120px_rgba(0,0,0,0.5)]"
                        initial={{ opacity: 0, y: 26, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 18, scale: 0.98 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.14),transparent_45%)]" />

                        <div className="relative overflow-y-auto p-5 sm:p-7">
                            <div className="mb-6 flex items-start justify-between gap-4">
                                <div>
                                    <h3 id={titleId} className="text-2xl font-bold text-white sm:text-3xl">
                                        {labels.title}
                                    </h3>
                                    <p id={descriptionId} className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
                                        {labels.modalText}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/40"
                                    aria-label={labels.close}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 6 6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex flex-col">
                                <div className="order-2 mb-5 grid gap-3 sm:order-1 sm:grid-cols-3">
                                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                                        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">{labels.nextTap}</div>
                                        <div className={`mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${nextTurn === "right" ? "bg-[#00d4ff]/12 text-[#00d4ff]" : "bg-[#a855f7]/12 text-[#d6b4ff]"}`}>
                                            <span className="text-base">{nextTurn === "right" ? "↱" : "↰"}</span>
                                            {nextTurn === "right" ? labels.right : labels.left}
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                                        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">{labels.score}</div>
                                        <motion.div
                                            key={score}
                                            initial={{ opacity: 0.5, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-2 text-2xl font-bold text-white"
                                        >
                                            {score}
                                        </motion.div>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                                        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">{labels.bestScore}</div>
                                        <div className="mt-2 text-2xl font-bold text-white">{liveBestScore}</div>
                                    </div>
                                </div>

                                <div className="order-1 relative mx-auto w-full max-w-[460px] sm:order-2">
                                    <SnakeGameBoard
                                        boardSize={boardSize}
                                        snake={snake}
                                        food={food}
                                        direction={direction}
                                        onInteract={queueTurn}
                                        className="aspect-square"
                                    />

                                    <AnimatePresence>
                                        {status !== "playing" && (
                                            <motion.div
                                                className="absolute inset-0 flex items-center justify-center rounded-[1.5rem] bg-[#06080d]/78 p-6 backdrop-blur-sm"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <div className="max-w-sm text-center">
                                                    <div className="mb-3 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#00d4ff]">
                                                        {status === "idle" ? labels.intro : gameOverTitle}
                                                    </div>
                                                    <p className="mb-6 text-sm leading-relaxed text-gray-300">
                                                        {status === "idle" ? labels.idleHint : `${labels.gameOverSummary} ${labels.score}: ${score}.`}
                                                    </p>
                                                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                                                        <button
                                                            type="button"
                                                            onClick={status === "idle" ? startGame : restartGame}
                                                            className="w-full rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#a855f7] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,212,255,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,212,255,0.24)] focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/40 sm:w-auto"
                                                        >
                                                            {status === "idle" ? labels.play : labels.retry}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={onClose}
                                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 sm:w-auto"
                                                        >
                                                            {labels.close}
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500">
                                <p>{labels.keyboardHint}</p>
                                {status === "playing" && (
                                    <button
                                        type="button"
                                        onClick={restartGame}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                                    >
                                        {labels.retry}
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
