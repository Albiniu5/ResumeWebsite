"use client";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { useResumeData } from "@/hooks/useResumeData";

export default function Contact() {
    const { siteConfig, ui } = useResumeData();

    return (
        <section id="contact" className="section-padding relative scroll-mt-24">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <AnimatedSection>
                    <div className="text-center mb-12">
                        <p className="text-[#00d4ff] text-sm font-semibold tracking-widest uppercase mb-4">{ui.contact.sectionLabel}</p>
                        <h2 className="section-title">{ui.contact.sectionTitle}</h2>
                        <p className="section-subtitle mx-auto">{ui.contact.subtitle}</p>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <div className="glass-card p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-2">{ui.contact.readyToCollaborate}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{ui.contact.openTo}</p>
                                </div>

                                <div className="space-y-4">
                                    <a
                                        href={`mailto:${siteConfig.email}`}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white/3 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center text-[#00d4ff]">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                <polyline points="22,6 12,13 2,6" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500">{ui.contact.email}</div>
                                            <div className="text-sm text-white group-hover:text-[#00d4ff] transition-colors">{siteConfig.email}</div>
                                        </div>
                                    </a>

                                    <a
                                        href={`tel:${siteConfig.phone}`}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white/3 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-[#a855f7]/10 flex items-center justify-center text-[#a855f7]">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500">Phone</div>
                                            <div className="text-sm text-white group-hover:text-[#a855f7] transition-colors">{siteConfig.phone}</div>
                                        </div>
                                    </a>

                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/3">
                                        <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500">Location</div>
                                            <div className="text-sm text-white">{siteConfig.location}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    window.location.href = `mailto:${siteConfig.email}`;
                                }}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="text-xs text-gray-500 font-semibold block mb-1.5">{ui.contact.name}</label>
                                    <input
                                        type="text"
                                        placeholder={ui.contact.yourName}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#00d4ff]/30 focus:ring-1 focus:ring-[#00d4ff]/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 font-semibold block mb-1.5">{ui.contact.email}</label>
                                    <input
                                        type="email"
                                        placeholder={ui.contact.yourEmail}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#00d4ff]/30 focus:ring-1 focus:ring-[#00d4ff]/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 font-semibold block mb-1.5">{ui.contact.message}</label>
                                    <textarea
                                        rows={4}
                                        placeholder={ui.contact.tellMe}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#00d4ff]/30 focus:ring-1 focus:ring-[#00d4ff]/20 transition-all resize-none"
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white font-semibold text-sm hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] transition-shadow"
                                >
                                    {ui.contact.send}
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </AnimatedSection>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-16 pb-8"
                >
                    <p className="text-gray-600 text-xs">
                        © {new Date().getFullYear()} Dimitri Jeleznov. {ui.contact.footer}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
