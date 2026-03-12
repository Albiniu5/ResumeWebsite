"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function TiltCard({ children, className = "", onClick }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position relative to the card center (from -0.5 to 0.5)
    const xPct = useMotionValue(0);
    const yPct = useMotionValue(0);

    const mouseXSpring = useSpring(xPct, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(yPct, { stiffness: 300, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

    // Calculate percentage coordinates for CSS radial gradient (from 0 to 100)
    const gradientX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
    const gradientY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        xPct.set(mouseX / width - 0.5);
        yPct.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        xPct.set(0);
        yPct.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`cursor-pointer ${className}`}
        >
            <div style={{ transform: "translateZ(30px)" }} className="w-full h-full relative">
                <motion.div
                    className="absolute inset-0 z-[-1] opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                    style={{
                        background: useMotionTemplate`radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(0, 212, 255, 0.1), transparent 50%)`,
                    }}
                />
                {children}
            </div>
        </motion.div>
    );
}
