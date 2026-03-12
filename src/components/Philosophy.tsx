"use client";
import AnimatedSection from "./AnimatedSection";
import { useResumeData } from "@/hooks/useResumeData";

const iconMap: Record<string, React.ReactNode> = {
    wrench: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>,
    refresh: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" /></svg>,
    bridge: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 18V12a8 8 0 0116 0v6" /><path d="M2 18h20" /><path d="M12 4v8" /><path d="M8 8v4" /><path d="M16 8v4" /></svg>,
    shield: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
};

const colors = ["#00d4ff", "#a855f7", "#10b981", "#f59e0b"];

export default function Philosophy() {
    const { philosophyData, ui } = useResumeData();

    return (
        <section id="philosophy" className="section-padding relative">
            <div className="max-w-5xl mx-auto px-6">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <p className="text-[#00d4ff] text-sm font-semibold tracking-widest uppercase mb-4">{ui.philosophy.sectionLabel}</p>
                        <h2 className="section-title">{ui.philosophy.sectionTitle}</h2>
                        <p className="section-subtitle mx-auto">{ui.philosophy.subtitle}</p>
                    </div>
                </AnimatedSection>

                <div className="grid sm:grid-cols-2 gap-6">
                    {philosophyData.map((item, i) => (
                        <AnimatedSection key={item.title} delay={i * 0.1}>
                            <div className="glass-card glow-border p-6 flex items-start gap-5 h-full">
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                                    style={{ background: `${colors[i]}10`, color: colors[i] }}
                                >
                                    {iconMap[item.icon]}
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
