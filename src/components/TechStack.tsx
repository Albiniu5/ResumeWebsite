"use client";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { useResumeData } from "@/hooks/useResumeData";

const categoryLabels: Record<string, { label: string; color: string }> = {
    languages: { label: "Languages", color: "#00d4ff" },
    networking: { label: "Networking", color: "#a855f7" },
    systems: { label: "Systems & Virtualization", color: "#10b981" },
    platforms: { label: "Platforms", color: "#f59e0b" },
    tools: { label: "Tools & Design", color: "#ec4899" },
    emerging: { label: "Emerging Tech", color: "#f97316" },
};

export default function TechStack() {
    const { techStackData, languagesData, ui } = useResumeData();

    return (
        <section id="techstack" className="section-padding relative">
            <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <p className="text-[#00d4ff] text-sm font-semibold tracking-widest uppercase mb-4">{ui.techstack.sectionLabel}</p>
                        <h2 className="section-title">{ui.techstack.sectionTitle}</h2>
                        <p className="section-subtitle mx-auto">{ui.techstack.subtitle}</p>
                    </div>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {Object.entries(techStackData).map(([key, items], i) => {
                        const meta = categoryLabels[key];
                        return (
                            <AnimatedSection key={key} delay={i * 0.08}>
                                <div className="glass-card p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full" style={{ background: meta.color }} />
                                        <h4 className="text-sm font-semibold text-white">{meta.label}</h4>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {items.map((item, j) => (
                                            <motion.span
                                                key={item}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.1 + j * 0.04 }}
                                                className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg"
                                                style={{
                                                    background: `${meta.color}10`,
                                                    border: `1px solid ${meta.color}25`,
                                                    color: meta.color,
                                                }}
                                            >
                                                {item}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </AnimatedSection>
                        );
                    })}
                </div>

                <AnimatedSection delay={0.3}>
                    <div className="glass-card p-6 max-w-3xl mx-auto">
                        <div className="flex items-center gap-2 mb-5">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#10b981]">
                                <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                            <h4 className="text-sm font-semibold text-white">{ui.techstack.languagesSpoken}</h4>
                            <span className="text-xs text-gray-500 ml-auto">{ui.techstack.langCount}</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {languagesData.map((lang, i) => (
                                <motion.div
                                    key={lang.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="flex items-center justify-between p-3 rounded-lg bg-white/3 hover:bg-white/5 transition-colors"
                                >
                                    <span className="text-sm text-white font-medium">{lang.name}</span>
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${lang.level === "Native" || lang.level === "Moedertaal"
                                            ? "bg-[#10b981]/10 text-[#10b981]"
                                            : lang.level === "Fluent" || lang.level === "Vloeiend"
                                                ? "bg-[#00d4ff]/10 text-[#00d4ff]"
                                                : "bg-[#f59e0b]/10 text-[#f59e0b]"
                                        }`}>
                                        {lang.level}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
