"use client";

import { useEffect, useRef, useState } from "react";

export type SnakeDirection = "up" | "right" | "down" | "left";
export type SnakeTurnDirection = "right" | "left";
export type SnakeGameStatus = "idle" | "playing" | "gameOver";

export interface SnakePoint {
    x: number;
    y: number;
}

const BOARD_SIZE = 14;
export const SNAKE_GAME_STORAGE_KEY = "snake-but-worse-best-score";

function createInitialSnake(): SnakePoint[] {
    const centerY = Math.floor(BOARD_SIZE / 2);
    const startX = Math.floor(BOARD_SIZE / 2) - 2;

    return [
        { x: startX + 2, y: centerY },
        { x: startX + 1, y: centerY },
        { x: startX, y: centerY },
    ];
}

function createFood(snake: SnakePoint[]): SnakePoint {
    const occupied = new Set(snake.map((segment) => `${segment.x},${segment.y}`));
    const available: SnakePoint[] = [];

    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            if (!occupied.has(`${x},${y}`)) {
                available.push({ x, y });
            }
        }
    }

    if (available.length === 0) {
        return { x: 0, y: 0 };
    }

    return available[Math.floor(Math.random() * available.length)];
}

function rotateDirection(direction: SnakeDirection, turn: SnakeTurnDirection): SnakeDirection {
    const directions: SnakeDirection[] = ["up", "right", "down", "left"];
    const currentIndex = directions.indexOf(direction);
    const offset = turn === "right" ? 1 : -1;
    return directions[(currentIndex + offset + directions.length) % directions.length];
}

function getNextHead(head: SnakePoint, direction: SnakeDirection): SnakePoint {
    if (direction === "up") return { x: head.x, y: head.y - 1 };
    if (direction === "right") return { x: head.x + 1, y: head.y };
    if (direction === "down") return { x: head.x, y: head.y + 1 };
    return { x: head.x - 1, y: head.y };
}

function wrapPoint(point: SnakePoint): SnakePoint {
    return {
        x: (point.x + BOARD_SIZE) % BOARD_SIZE,
        y: (point.y + BOARD_SIZE) % BOARD_SIZE,
    };
}

function getSpeed(score: number) {
    return Math.max(95, 232 - score * 16);
}

interface UseSnakeGameOptions {
    initialBestScore?: number;
    onBestScoreChange?: (score: number) => void;
}

export function useSnakeGame({ initialBestScore = 0, onBestScoreChange }: UseSnakeGameOptions = {}) {
    const [snake, setSnake] = useState<SnakePoint[]>(() => createInitialSnake());
    const [food, setFood] = useState<SnakePoint>(() => createFood(createInitialSnake()));
    const [direction, setDirection] = useState<SnakeDirection>("right");
    const [nextTurn, setNextTurn] = useState<SnakeTurnDirection>("right");
    const [status, setStatus] = useState<SnakeGameStatus>("idle");
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(initialBestScore);

    const snakeRef = useRef(snake);
    const foodRef = useRef(food);
    const directionRef = useRef(direction);
    const scoreRef = useRef(score);
    const statusRef = useRef(status);
    const turnQueuedRef = useRef(false);

    useEffect(() => {
        snakeRef.current = snake;
    }, [snake]);

    useEffect(() => {
        foodRef.current = food;
    }, [food]);

    useEffect(() => {
        directionRef.current = direction;
    }, [direction]);

    useEffect(() => {
        scoreRef.current = score;
    }, [score]);

    useEffect(() => {
        statusRef.current = status;
    }, [status]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            const stored = window.localStorage.getItem(SNAKE_GAME_STORAGE_KEY);
            if (!stored) return;
            const parsed = Number(stored);
            if (!Number.isNaN(parsed)) {
                setBestScore((current) => Math.max(current, parsed));
            }
        } catch {
            // Storage is optional.
        }
    }, []);

    useEffect(() => {
        onBestScoreChange?.(bestScore);
    }, [bestScore, onBestScoreChange]);

    const persistBestScore = (value: number) => {
        setBestScore((current) => {
            const nextValue = Math.max(current, value);

            if (nextValue !== current) {
                if (typeof window !== "undefined") {
                    try {
                        window.localStorage.setItem(SNAKE_GAME_STORAGE_KEY, String(nextValue));
                    } catch {
                        // Ignore storage failures.
                    }
                }
            }

            return nextValue;
        });
    };

    const resetBoard = (nextStatus: SnakeGameStatus) => {
        const nextSnake = createInitialSnake();
        setSnake(nextSnake);
        setFood(createFood(nextSnake));
        setDirection("right");
        setNextTurn("right");
        setScore(0);
        setStatus(nextStatus);
        turnQueuedRef.current = false;
    };

    const startGame = () => {
        resetBoard("playing");
    };

    const restartGame = () => {
        startGame();
    };

    const queueTurn = () => {
        if (statusRef.current === "idle") {
            startGame();
            return;
        }

        if (statusRef.current !== "playing" || turnQueuedRef.current) {
            return;
        }

        turnQueuedRef.current = true;
        const queuedTurn = nextTurn;
        const nextDirection = rotateDirection(directionRef.current, queuedTurn);
        directionRef.current = nextDirection;
        setDirection(nextDirection);
        setNextTurn((current) => (current === "right" ? "left" : "right"));
    };

    useEffect(() => {
        if (status !== "playing") return;

        const tick = window.setInterval(() => {
            const currentSnake = snakeRef.current;
            const nextHead = wrapPoint(getNextHead(currentSnake[0], directionRef.current));

            const ateFood = nextHead.x === foodRef.current.x && nextHead.y === foodRef.current.y;
            const collisionBody = ateFood ? currentSnake : currentSnake.slice(0, -1);
            const hitSelf = collisionBody.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y);

            if (hitSelf) {
                setStatus("gameOver");
                persistBestScore(scoreRef.current);
                turnQueuedRef.current = false;
                return;
            }

            const nextSnake = [nextHead, ...currentSnake];
            if (!ateFood) {
                nextSnake.pop();
            }

            setSnake(nextSnake);

            if (ateFood) {
                const nextScore = scoreRef.current + 1;
                setScore(nextScore);
                scoreRef.current = nextScore;
                setFood(createFood(nextSnake));
                persistBestScore(nextScore);
            }

            turnQueuedRef.current = false;
        }, getSpeed(score));

        return () => window.clearInterval(tick);
    }, [score, status]);

    return {
        boardSize: BOARD_SIZE,
        snake,
        food,
        direction,
        nextTurn,
        status,
        score,
        bestScore,
        startGame,
        restartGame,
        queueTurn,
    };
}
