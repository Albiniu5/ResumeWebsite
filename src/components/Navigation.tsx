"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { useResumeData } from "@/hooks/useResumeData";
import Link from "next/link";

const navItems = [
    { id: "hero", en: "Home", nl: "Home" },
    { id: "about", en: "About", nl: "Over mij" },
    { id: "skills", en: "Skills", nl: "Vaardigheden" },
    { id: "experience", en: "Experience", nl: "Ervaring" },
    { id: "projects", en: "Projects", nl: "Projecten" },
    { id: "demo", en: "Demo", nl: "Demo" },
    { id: "education", en: "Education", nl: "Opleiding" },
    { id: "contact", en: "Contact", nl: "Contact" },
];

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const [mobileOpen, setMobileOpen] = useState(false);
    const { lang, toggle } = useLang();
    const { ui } = useResumeData();

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
            const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean);
            for (const sec of sections.reverse()) {
                if (sec && sec.getBoundingClientRect().top <= 120) {
                    setActiveSection(sec.id);
                    break;
                }
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5 shadow-lg" : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
                {/* Logo */}
                <a href="#hero" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center text-white font-bold text-sm">
                        DJ
                    </div>
                    <span className="text-white font-semibold text-sm group-hover:text-[#00d4ff] transition-colors">
                        Dimitri.dev
                    </span>
                </a>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                        >
                            {lang === "nl" ? item.nl : item.en}
                        </a>
                    ))}
                </div>

                {/* Right side: Language toggle + CTA */}
                <div className="hidden md:flex items-center gap-3">
                    {/* Language toggle */}
                    <button
                        onClick={toggle}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all text-sm"
                        aria-label="Toggle language"
                    >
                        <span className={`font-medium transition-colors ${lang === "en" ? "text-[#00d4ff]" : "text-gray-500"}`}>EN</span>
                        <span className="text-gray-600">/</span>
                        <span className={`font-medium transition-colors ${lang === "nl" ? "text-[#00d4ff]" : "text-gray-500"}`}>NL</span>
                    </button>

                    <Link
                        href="/resume"
                        className="px-4 py-1.5 rounded-lg border border-white/10 text-white text-sm font-semibold hover:bg-white/5 transition-colors"
                    >
                        {lang === "nl" ? "CV Downloaden" : "Download CV"}
                    </Link>

                    <a
                        href="#contact"
                        className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white text-sm font-semibold hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-shadow"
                    >
                        {ui.nav.getInTouch}
                    </a>
                </div>

                {/* Mobile menu toggle */}
                <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white p-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/5"
                    >
                        <div className="px-6 py-4 space-y-1">
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block py-2 text-sm font-medium transition-colors ${activeSection === item.id ? "text-[#00d4ff]" : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {lang === "nl" ? item.nl : item.en}
                                </a>
                            ))}
                            <Link 
                                href="/resume"
                                onClick={() => setMobileOpen(false)}
                                className="block py-2 text-sm font-medium text-white hover:text-[#00d4ff] transition-colors"
                            >
                                {lang === "nl" ? "📄 CV Downloaden" : "📄 Download CV"}
                            </Link>
                            <button onClick={toggle} className="block py-2 text-sm font-medium text-[#a855f7]">
                                {lang === "en" ? "🇳🇱 Nederlands" : "🇬🇧 English"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
