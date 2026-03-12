"use client";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { useResumeData } from "@/hooks/useResumeData";

export default function Education() {
    const { educationData, ui } = useResumeData();

    return (
        <section id="education" className="section-padding relative">
            <div className="max-w-5xl mx-auto px-6">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <p className="text-[#00d4ff] text-sm font-semibold tracking-widest uppercase mb-4">{ui.education.sectionLabel}</p>
                        <h2 className="section-title">{ui.education.sectionTitle}</h2>
                        <p className="section-subtitle mx-auto">{ui.education.subtitle}</p>
                    </div>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {educationData.map((edu, i) => (
                        <AnimatedSection key={edu.degree} delay={i * 0.1}>
                            <motion.div
                                className={`glass-card glow-border p-6 h-full flex flex-col ${edu.highlight ? "ring-1 ring-[#00d4ff]/20" : ""}`}
                                whileHover={{ scale: 1.02 }}
                            >
                                {edu.highlight && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-0.5 rounded-full self-start mb-3">
                                        {ui.education.current}
                                    </span>
                                )}
                                <h3 className="text-white font-bold text-sm mb-1">{edu.degree}</h3>
                                <p className="text-[#00d4ff] text-xs font-medium mb-1">{edu.institution} — {edu.location}</p>
                                <p className="text-gray-600 text-xs font-mono mb-3">{edu.period}</p>
                                <p className="text-gray-400 text-sm leading-relaxed mt-auto">{edu.description}</p>
                            </motion.div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
