"use client";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";

export default function TypingTerminal() {
    const [step, setStep] = useState(0);

    // Sequence timing
    useEffect(() => {
        const timings = [
            1000, // Wait before typing whoami
            800,  // Wait after whoami
            600,  // Wait before typing cat skills
            1000, // Wait after skills
            800,  // Wait before uptime
        ];

        let timeout: NodeJS.Timeout;

        const advanceStep = (currentStep: number) => {
            if (currentStep < timings.length) {
                timeout = setTimeout(() => {
                    setStep(currentStep + 1);
                    advanceStep(currentStep + 1);
                }, timings[currentStep]);
            }
        };

        advanceStep(0);

        return () => clearTimeout(timeout);
    }, []);

    const typeAnimation: Variants = {
        hidden: { width: 0, opacity: 0 },
        visible: {
            width: "100%",
            opacity: 1,
            transition: { duration: 0.8, ease: "linear" }
        }
    };

    const revealAnimation: Variants = {
        hidden: { opacity: 0, y: 5 },
        visible: {
            opacity: 1, y: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <div className="terminal mt-8">
            <div className="terminal-header">
                <div className="terminal-dot bg-[#ff5f57]" />
                <div className="terminal-dot bg-[#febc2e]" />
                <div className="terminal-dot bg-[#28c840]" />
                <span className="text-[11px] text-gray-500 ml-2 font-mono">dimitri@enterprise:~</span>
            </div>
            <div className="terminal-body text-[13px] font-mono whitespace-nowrap overflow-hidden">
                {/* Step 0: Type whoami */}
                {step >= 0 && (
                    <motion.div initial="hidden" animate="visible" variants={typeAnimation} className="text-gray-500 overflow-hidden border-r-2 border-transparent">
                        <span className="text-gray-500 select-none">$ </span>whoami
                    </motion.div>
                )}

                {/* Step 1: Show whoami result */}
                {step >= 1 && (
                    <motion.div initial="hidden" animate="visible" variants={revealAnimation} className="text-[#00d4ff] mt-1">
                        dimitri.jeleznov
                    </motion.div>
                )}

                {/* Step 2: Type cat skills.txt */}
                {step >= 2 && (
                    <motion.div initial="hidden" animate="visible" variants={typeAnimation} className="text-gray-500 mt-2 overflow-hidden border-r-2 border-transparent">
                        <span className="text-gray-500 select-none">$ </span>cat skills.txt
                    </motion.div>
                )}

                {/* Step 3: Show skills result */}
                {step >= 3 && (
                    <motion.div initial="hidden" animate="visible" variants={revealAnimation} className="text-[#10b981] mt-1 whitespace-normal">
                        networking, python, linux, sap, abap, flutter, next.js, n8n, supabase, vercel, resend, github, cursor/vscode, mcp, blockchain
                    </motion.div>
                )}

                {/* Step 4: Type uptime */}
                {step >= 4 && (
                    <motion.div initial="hidden" animate="visible" variants={typeAnimation} className="text-gray-500 mt-2 overflow-hidden border-r-2 border-transparent">
                        <span className="text-gray-500 select-none">$ </span>uptime
                    </motion.div>
                )}

                {/* Step 5: Show uptime result and blinking cursor */}
                {step >= 5 && (
                    <motion.div initial="hidden" animate="visible" variants={revealAnimation} className="text-[#f59e0b] mt-1 whitespace-normal">
                        10+ years in IT, 6 languages, always learning
                    </motion.div>
                )}

                {/* Blinking cursor at the end */}
                <div className="mt-1">
                    <motion.span
                        className="inline-block w-2 h-4 bg-[#00d4ff]"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    />
                </div>
            </div>
        </div>
    );
}
