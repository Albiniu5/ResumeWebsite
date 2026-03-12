"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useResumeData } from "@/hooks/useResumeData";
import TypingTerminal from "./TypingTerminal";
import Magnetic from "./Magnetic";
import NetworkCanvas from "./NetworkCanvas";

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
    const numericPart = parseInt(value.replace(/[^0-9]/g, "")) || 0;
    const nonNumeric = value.replace(/[0-9]/g, "");
    const [count, setCount] = useState(0);

    useEffect(() => {
        let frame: number;
        const duration = 2000;
        const start = performance.now();
        const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * numericPart));
            if (progress < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [numericPart]);

    return (
        <span>
            {count}{nonNumeric}{suffix}
        </span>
    );
}

function GridBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.06)_0%,transparent_70%)]" />
            <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.04)_0%,transparent_70%)]" />
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <motion.line x1="10%" y1="20%" x2="40%" y2="80%" stroke="rgba(0,212,255,0.06)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut" }} />
                <motion.line x1="60%" y1="10%" x2="90%" y2="70%" stroke="rgba(168,85,247,0.05)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3.5, delay: 0.5, ease: "easeInOut" }} />
                <motion.line x1="80%" y1="5%" x2="20%" y2="60%" stroke="rgba(0,212,255,0.04)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4, delay: 1, ease: "easeInOut" }} />
            </svg>
            {[
                { x: "15%", y: "30%", delay: 0 },
                { x: "75%", y: "20%", delay: 0.5 },
                { x: "85%", y: "60%", delay: 1 },
                { x: "25%", y: "70%", delay: 1.5 },
                { x: "50%", y: "15%", delay: 0.8 },
            ].map((node, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-[#00d4ff]/20"
                    style={{ left: node.x, top: node.y }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
                />
            ))}
        </div>
    );
}

export default function Hero() {
    const { siteConfig, ui } = useResumeData();
    const { hero, name, title } = siteConfig;
    const floatingSkills = ["Python", "CCNA", "Linux", "Docker", "SAP", "ABAP", "Flutter", "Solidity", "Next.js", "Supabase", "n8n", "Vercel", "Blockchain", "MCP", "GitHub"];

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <GridBackground />
            <NetworkCanvas />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full flex flex-col items-center justify-center">
                <div className="grid lg:grid-cols-5 gap-12 items-center w-full max-w-4xl lg:max-w-none mx-auto text-center lg:text-left">
                    {/* Left content */}
                    <div className="lg:col-span-3 flex flex-col items-center lg:items-start w-full mx-auto">
                        {/* Subtitle pill */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="inline-flex items-center justify-center w-max max-w-full flex-wrap sm:flex-nowrap gap-2 px-4 sm:px-6 py-2.5 rounded-2xl sm:rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 overflow-hidden mx-auto lg:mx-0"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse flex-shrink-0" />
                            <span className="text-xs sm:text-sm md:text-base leading-snug truncate sm:whitespace-normal text-center">{hero.subtitle}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="text-[11vw] leading-[1.1] sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-[100vw] overflow-wrap-anywhere break-words hyphens-auto text-center lg:text-left mx-auto lg:mx-0"
                        >
                            <span className="text-white block truncate w-full text-center lg:text-left">{name.split(" ")[0]}</span>
                            <span className="gradient-text block truncate w-full text-center lg:text-left">{name.split(" ")[1]}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="text-base sm:text-lg text-gray-400 max-w-full lg:max-w-xl mb-4 font-medium break-words text-center lg:text-left mx-auto lg:mx-0"
                        >
                            {title}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="text-sm sm:text-base text-gray-500 max-w-full lg:max-w-lg mb-10 leading-relaxed break-words text-center lg:text-left mx-auto lg:mx-0"
                        >
                            {hero.description}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10 max-w-full w-full"
                        >
                            <Magnetic>
                                <a
                                    href="#projects"
                                    className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white font-semibold hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    {ui.hero.viewProjects}
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </Magnetic>
                            <div className="flex w-full sm:w-auto gap-4">
                                <Magnetic>
                                    <a
                                        href="#skills"
                                        className="inline-flex flex-1 justify-center items-center gap-2 px-6 py-3.5 rounded-lg border border-white/10 text-white font-semibold hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                                    >
                                        {ui.hero.exploreSkills}
                                    </a>
                                </Magnetic>
                                <Magnetic>
                                    <a
                                        href="#contact"
                                        className="inline-flex flex-1 justify-center items-center gap-2 px-6 py-3.5 rounded-lg border border-white/10 text-gray-400 font-semibold hover:bg-white/5 hover:border-white/20 hover:text-white transition-all duration-300"
                                    >
                                        {ui.hero.contactMe}
                                    </a>
                                </Magnetic>
                            </div>
                        </motion.div>

                        {/* Floating Skill Badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mt-4 max-w-[100vw] sm:max-w-full px-4 lg:px-0"
                        >
                            {floatingSkills.map((skill, i) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1 + i * 0.1 }}
                                    className="tech-chip"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right side — Stats + Terminal preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="lg:col-span-2 flex flex-col items-center lg:items-stretch w-full mx-auto"
                    >
                        {/* Stats cards */}
                        <div className="grid grid-cols-3 gap-3 mb-8 w-full max-w-sm lg:max-w-none mx-auto lg:mx-0">
                            {hero.stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + i * 0.15 }}
                                    className="glass-card p-4 text-center flex flex-col justify-center min-h-[100px]"
                                >
                                    <div className="text-2xl font-bold text-[#00d4ff]">
                                        <AnimatedCounter value={stat.value} />
                                    </div>
                                    <div className="text-[11px] text-gray-500 mt-2 leading-tight">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        <TypingTerminal />
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
                    <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]"
                        animate={{ y: [0, 16, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section >
    );
}
