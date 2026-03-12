"use client";
import AnimatedSection from "./AnimatedSection";
import { useResumeData } from "@/hooks/useResumeData";
import ScrambleText from "./ScrambleText";

const iconMap: Record<string, React.ReactNode> = {
    network: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#00d4ff]">
            <circle cx="12" cy="5" r="3" /><circle cx="5" cy="19" r="3" /><circle cx="19" cy="19" r="3" />
            <path d="M12 8v4M8.5 17L10.5 14M15.5 17l-2-3" />
        </svg>
    ),
    code: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#a855f7]">
            <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
        </svg>
    ),
    globe: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#10b981]">
            <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    ),
    fire: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#f59e0b]">
            <path d="M12 2c.5 2.5 2 4.5 3 6 1.5 2-1 5-3 5s-4.5-3-3-5c1-1.5 2.5-3.5 3-6z" />
            <path d="M12 22c-4.97 0-9-2-9-6 0-3.5 3-6 5-8 .5 2.5 2 4 3 5 1-1 2.5-2.5 3-5 2 2 5 4.5 5 8 0 4-4.03 6-9 6z" />
        </svg>
    ),
    shield: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#3b82f6]">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    cpu: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#f43f5e]">
            <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
        </svg>
    ),
};

export default function About() {
    const { aboutData, ui } = useResumeData();

    return (
        <section id="about" className="section-padding relative scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <p className="text-[#00d4ff] text-sm font-semibold tracking-widest uppercase mb-4">{ui.about.sectionLabel}</p>
                        <h2 className="section-title"><ScrambleText text={ui.about.sectionTitle} /></h2>
                        <p className="section-subtitle mx-auto">{ui.about.subtitle}</p>
                    </div>
                </AnimatedSection>

                <div className="grid lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-3 space-y-5">
                        {aboutData.paragraphs.map((p, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <p className="text-gray-400 leading-relaxed text-[15px]">{p}</p>
                            </AnimatedSection>
                        ))}
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                        {aboutData.highlights.map((h, i) => (
                            <AnimatedSection key={h.label} delay={0.2 + i * 0.1} direction="right">
                                <div className="glass-card glow-border p-5 flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                        {iconMap[h.icon]}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-sm mb-1">{h.label}</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">{h.desc}</p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
