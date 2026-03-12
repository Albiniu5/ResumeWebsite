"use client";
import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

interface ScrambleTextProps {
    text: string;
    className?: string;
}

export default function ScrambleText({ text, className = "" }: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState(text.replace(/./g, "\u00A0"));
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    useEffect(() => {
        if (!isInView) return;

        let frame: number;
        let iteration = 0;
        const totalDuration = 1000; // ms
        const fps = 30;
        const totalFrames = (totalDuration / 1000) * fps;
        let start = performance.now();

        const animate = (now: number) => {
            if (now - start > 1000 / fps) {
                start = now;
                setDisplayText(text.split("").map((char, index) => {
                    if (char === " ") return " ";
                    if (index < iteration) {
                        return text[index];
                    }
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                }).join(""));

                if (iteration >= text.length) {
                    cancelAnimationFrame(frame);
                    return;
                }

                iteration += text.length / totalFrames;
            }
            frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frame);
    }, [text, isInView]);

    return (
        <span ref={ref} className={`font-mono inline-block ${className}`}>
            {displayText}
        </span>
    );
}
