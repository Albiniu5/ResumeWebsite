"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { useResumeData } from "@/hooks/useResumeData";
import ScrambleText from "./ScrambleText";

const categoryIcons: Record<string, React.ReactNode> = {
    network: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="5" r="3" /><circle cx="5" cy="19" r="3" /><circle cx="19" cy="19" r="3" /><path d="M12 8v4M8.5 17L10.5 14M15.5 17l-2-3" /></svg>,
    code: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    server: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><circle cx="6" cy="6" r="1" /><circle cx="6" cy="18" r="1" /></svg>,
    briefcase: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>,
    palette: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="8" r="1.5" fill="currentColor" /><circle cx="8" cy="13" r="1.5" fill="currentColor" /><circle cx="16" cy="13" r="1.5" fill="currentColor" /><circle cx="14" cy="17" r="1.5" fill="currentColor" /></svg>,
    cpu: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" /></svg>,
};

export default function Skills() {
    const [activeIndex, setActiveIndex] = useState(0);
    const { skillsData, ui } = useResumeData();

    return (
        <section id="skills" className="section-padding relative scroll-mt-24">
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <p className="text-[#00d4ff] text-sm font-semibold tracking-widest uppercase mb-4">{ui.skills.sectionLabel}</p>
                        <h2 className="section-title"><ScrambleText text={ui.skills.sectionTitle} /></h2>
                        <p className="section-subtitle mx-auto">{ui.skills.subtitle}</p>
                    </div>
                </AnimatedSection>

                <div className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-5 space-y-3">
                        {skillsData.map((cat, i) => (
                            <AnimatedSection key={cat.category} delay={i * 0.08} direction="left">
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
                                        className={`w-full text-left p-5 rounded-xl transition-all duration-300 flex items-center gap-4 group ${activeIndex === i
                                            ? "bg-white/5 border border-white/10 shadow-lg"
                                            : "hover:bg-white/3 border border-transparent"
                                            }`}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors shrink-0"
                                            style={{
                                                background: activeIndex === i ? `${cat.color}15` : "rgba(255,255,255,0.03)",
                                                color: activeIndex === i ? cat.color : "#6b7280",
                                            }}
                                        >
                                            {categoryIcons[cat.icon]}
                                        </div>
                                        <div className="flex-1">
                                            <div className={`font-semibold text-base transition-colors ${activeIndex === i ? "text-white" : "text-gray-400 group-hover:text-gray-300"}`}>
                                                {cat.category}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-0.5">{cat.skills.length} {ui.skills.skillsCount}</div>
                                        </div>
                                        {/* Mobile chevron indicator */}
                                        <div className="lg:hidden text-gray-500 transition-transform duration-300" style={{ transform: activeIndex === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                                        </div>
                                        {/* Desktop side indicator */}
                                        {activeIndex === i && (
                                            <motion.div layoutId="skillIndicator" className="hidden lg:block ml-auto w-1.5 h-10 rounded-full" style={{ background: cat.color }} />
                                        )}
                                    </button>

                                    {/* Mobile Accordion Content (Visible only on small screens) */}
                                    <AnimatePresence>
                                        {activeIndex === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="lg:hidden overflow-hidden"
                                            >
                                                <div className="glass-card p-5 sm:p-6 mt-1 mb-2 mx-1 border-t-0 rounded-t-none rounded-b-xl" style={{ borderTop: `2px solid ${cat.color}50` }}>
                                                    <p className="text-sm text-gray-400 mb-5 leading-relaxed">{cat.description}</p>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                                        {cat.skills.map((skill, j) => (
                                                            <div key={skill} className="flex items-center gap-3 p-2.5 sm:p-3 rounded-lg bg-white/3 border border-white/5">
                                                                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }} />
                                                                <span className="text-sm text-gray-200">{skill}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>

                    {/* Desktop Side Content (Visible only on large screens) */}
                    <div className="hidden lg:block lg:col-span-7">
                        <AnimatePresence mode="wait">
                            {activeIndex !== -1 && skillsData[activeIndex] && (
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="glass-card p-8 min-h-[400px]"
                                >
                                    <div className="flex items-center gap-4 mb-6 relative">
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10"
                                            style={{ background: `${skillsData[activeIndex].color}15`, color: skillsData[activeIndex].color }}
                                        >
                                            {categoryIcons[skillsData[activeIndex].icon]}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold tracking-tight text-white mb-1">{skillsData[activeIndex].category}</h3>
                                            <div className="h-0.5 w-12 rounded-full" style={{ background: skillsData[activeIndex].color }}></div>
                                        </div>
                                    </div>
                                    <p className="text-[15px] leading-relaxed text-gray-400 mb-8 max-w-2xl">{skillsData[activeIndex].description}</p>

                                    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                                        {skillsData[activeIndex].skills.map((skill, i) => (
                                            <motion.div
                                                key={skill}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.04 }}
                                                className="flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/5 hover:border-white/10 transition-colors group"
                                            >
                                                <div className="w-2 h-2 rounded-full shrink-0 transition-transform group-hover:scale-150" style={{ background: skillsData[activeIndex].color, boxShadow: `0 0 10px ${skillsData[activeIndex].color}` }} />
                                                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{skill}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
