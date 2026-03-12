"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth spring physics for the trailing circle
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Only show on devices with a fine pointer (mouse/trackpad, not touch)
        if (window.matchMedia("(pointer: fine)").matches) {
            setIsVisible(true);
        }

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16); // offset by half the width/height
            mouseY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Detect clickable elements
            if (
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        // Optional: Hide cursor when mouse leaves the window
        const handleMouseOut = (e: MouseEvent) => {
            if (!e.relatedTarget) {
                setIsVisible(false);
            }
        };
        const handleMouseEnter = () => {
            if (window.matchMedia("(pointer: fine)").matches) {
                setIsVisible(true);
            }
        };

        window.addEventListener("mouseout", handleMouseOut);
        window.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mouseout", handleMouseOut);
            window.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* The trailing spring-animated hollow circle */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#00d4ff]/50 pointer-events-none z-[100]"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? "rgba(0, 212, 255, 0.1)" : "transparent",
                    borderColor: isHovering ? "rgba(0, 212, 255, 0.8)" : "rgba(0, 212, 255, 0.5)",
                }}
                transition={{ duration: 0.2 }}
            />
            {/* The instant following solid dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-[#00d4ff] rounded-full pointer-events-none z-[100] mix-blend-screen"
                style={{
                    x: mouseX,
                    y: mouseY,
                    transform: "translate(12px, 12px)" // Center the 8px dot inside the 32px circle
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
            />
        </>
    );
}
