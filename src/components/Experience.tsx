"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import TiltCard from "./TiltCard";
import { useResumeData } from "@/hooks/useResumeData";
import ScrambleText from "./ScrambleText";

export default function Experience() {
    const [expanded, setExpanded] = useState<number | null>(0);
    const { experienceData, ui } = useResumeData();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    return (
        <section id="experience" className="section-padding relative scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <p className="text-[#00d4ff] text-sm font-semibold tracking-widest uppercase mb-4">{ui.experience.sectionLabel}</p>
                        <h2 className="section-title"><ScrambleText text={ui.experience.sectionTitle} /></h2>
                        <p className="section-subtitle mx-auto">{ui.experience.subtitle}</p>
                    </div>
                </AnimatedSection>

                <div className="relative" ref={containerRef}>
                    <div className="absolute left-[36px] md:left-[48px] top-0 bottom-0 w-[2px] bg-white/5">
                        <motion.div
                            className="w-full bg-gradient-to-b from-transparent via-[#00d4ff] to-[#00d4ff] origin-top"
                            style={{ height: "100%", scaleY: scrollYProgress }}
                        />
                    </div>
                    <div className="space-y-6">
                        {experienceData.map((exp, i) => (
                            <AnimatedSection key={i} delay={i * 0.12}>
                                <div className="timeline-content">
                                    <div className="timeline-dot" style={{ top: "24px" }} />
                                    <TiltCard
                                        className="glass-card glow-border overflow-hidden"
                                        onClick={() => setExpanded(expanded === i ? null : i)}
                                    >
                                        <div className="p-6">
                                            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                                                <div>
                                                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                                                    <p className="text-[#00d4ff] text-sm font-medium">{exp.company}</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-xs text-gray-500 font-mono">{exp.period}</span>
                                                    <div className="mt-1">
                                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${exp.type === "Volunteer" || exp.type === "Vrijwillig"
                                                            ? "bg-[#f59e0b]/10 text-[#f59e0b]"
                                                            : "bg-[#10b981]/10 text-[#10b981]"
                                                            }`}>
                                                            {exp.type}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>

                                            <div className="flex items-center gap-2 mt-3 text-gray-600 text-xs">
                                                <motion.svg
                                                    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                    animate={{ rotate: expanded === i ? 180 : 0 }}
                                                >
                                                    <path d="M6 9l6 6 6-6" />
                                                </motion.svg>
                                                {expanded === i ? ui.experience.lessDetails : ui.experience.moreDetails}
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {expanded === i && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-6 pb-6 pt-2 border-t border-white/5">
                                                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                                            {ui.experience.achievements}
                                                        </h4>
                                                        <ul className="space-y-2 mb-4">
                                                            {exp.achievements.map((a, j) => (
                                                                <motion.li
                                                                    key={j}
                                                                    initial={{ x: -10, opacity: 0 }}
                                                                    animate={{ x: 0, opacity: 1 }}
                                                                    transition={{ delay: j * 0.08 }}
                                                                    className="flex items-start gap-2 text-sm text-gray-400"
                                                                >
                                                                    <span className="text-[#10b981] mt-1 shrink-0">▹</span>
                                                                    {a}
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                        <div className="flex flex-wrap gap-2">
                                                            {exp.technologies.map((t) => (
                                                                <span key={t} className="tech-chip text-[11px]">{t}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </TiltCard>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
