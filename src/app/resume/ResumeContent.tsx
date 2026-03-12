"use client";

import { useResumeData } from "@/hooks/useResumeData";
import { useRef } from "react";
// @ts-ignore
import { useReactToPrint } from "react-to-print";
// @ts-ignore
import { FiDownload, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function ResumeContent() {
    const {
        siteConfig,
        aboutData,
        skillsData,
        experienceData,
        educationData,
        languagesData,
        ui
    } = useResumeData();
    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        // @ts-ignore
        content: () => componentRef.current,
        contentRef: componentRef,
        documentTitle: `Resume_${siteConfig.name.replace(" ", "_")}`,
    });

    return (
        <div className="min-h-screen bg-neutral-900 py-12 px-4 selection:bg-[#00d4ff]/30 selection:text-white print:bg-white print:p-0 print:m-0">
            {/* Toolbar — hidden on print */}
            <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between print:hidden">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <FiArrowLeft /> {ui.nav.home}
                </Link>
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] rounded-lg text-white font-medium hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all"
                >
                    <FiDownload /> Download PDF
                </button>
            </div>

            {/* ───── A4 Page ───── */}
            <div className="max-w-[210mm] mx-auto bg-white rounded-xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
                <div
                    ref={componentRef}
                    className="w-[210mm] min-h-[297mm] bg-white text-neutral-800 px-14 py-10 box-border"
                    style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
                >
                    {/* ── Header ── */}
                    <header className="mb-6">
                        <h1 className="text-4xl font-extrabold text-[#0f172a] tracking-tight leading-none">
                            {siteConfig.name}
                        </h1>
                        <p className="text-sm font-semibold mt-1.5" style={{ color: '#0891b2' }}>
                            {siteConfig.hero.subtitle}
                        </p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-neutral-500">
                            <span>{siteConfig.email}</span>
                            <span className="text-neutral-300">|</span>
                            <span>{siteConfig.phone}</span>
                            <span className="text-neutral-300">|</span>
                            <span>{siteConfig.location}</span>
                        </div>
                        <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-[#00d4ff] via-[#a855f7] to-transparent rounded-full" />
                    </header>

                    {/* ── Summary ── */}
                    <section className="mb-5">
                        <p className="text-[11.5px] leading-relaxed text-neutral-600">
                            {aboutData.paragraphs[0]}
                        </p>
                    </section>

                    {/* ── Two-column body ── */}
                    <div className="grid grid-cols-[1fr_260px] gap-10">

                        {/* ═══ LEFT COLUMN ═══ */}
                        <div className="space-y-5">

                            {/* Experience */}
                            <section>
                                <h3 className="text-[13px] font-bold text-[#0f172a] uppercase tracking-[0.15em] mb-3 flex items-center gap-2">
                                    <span className="w-5 h-[2px] bg-gradient-to-r from-[#00d4ff] to-[#a855f7] rounded-full" />
                                    {ui.nav.experience}
                                </h3>
                                <div className="space-y-4">
                                    {experienceData.map((exp: any, i: number) => (
                                        <div key={i} className="relative pl-3.5 border-l border-neutral-200">
                                            <div className="absolute w-2 h-2 rounded-full -left-[4.5px] top-[5px]" style={{ background: 'linear-gradient(135deg, #00d4ff, #a855f7)' }} />
                                            <div className="flex justify-between items-baseline">
                                                <h4 className="text-[12.5px] font-bold text-neutral-800">{exp.role}</h4>
                                                <span className="text-[10px] font-medium text-neutral-400 whitespace-nowrap ml-2">{exp.period}</span>
                                            </div>
                                            <p className="text-[10.5px] font-medium mb-1.5" style={{ color: '#0891b2' }}>{exp.company}</p>
                                            <ul className="text-[10.5px] text-neutral-600 space-y-0.5 list-disc pl-3.5">
                                                {exp.achievements.slice(0, 3).map((a: string, j: number) => (
                                                    <li key={j} className="leading-snug">{a}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* ═══ RIGHT COLUMN ═══ */}
                        <div className="space-y-5">

                            {/* Skills */}
                            <section>
                                <h3 className="text-[13px] font-bold text-[#0f172a] uppercase tracking-[0.15em] mb-3">
                                    {ui.nav.skills}
                                </h3>
                                <div className="space-y-3">
                                    {skillsData.slice(0, 4).map((category: any) => (
                                        <div key={category.category}>
                                            <h4 className="text-[10px] font-bold text-neutral-700 mb-1.5 uppercase tracking-wide">{category.category}</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {category.skills.slice(0, 6).map((skill: string) => (
                                                    <span
                                                        key={skill}
                                                        className="text-[9px] font-medium text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Education */}
                            <section>
                                <h3 className="text-[13px] font-bold text-[#0f172a] uppercase tracking-[0.15em] mb-3">
                                    {ui.nav.education}
                                </h3>
                                <div className="space-y-2.5">
                                    {educationData.map((edu: any, i: number) => (
                                        <div key={i}>
                                            <h4 className="text-[11px] font-bold text-neutral-800 leading-tight">{edu.degree}</h4>
                                            <p className="text-[10px] font-medium" style={{ color: '#0891b2' }}>{edu.institution}</p>
                                            <p className="text-[9.5px] text-neutral-400">{edu.period}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Languages */}
                            <section>
                                <h3 className="text-[13px] font-bold text-[#0f172a] uppercase tracking-[0.15em] mb-3">
                                    Languages
                                </h3>
                                <div className="space-y-1.5">
                                    {languagesData.map((lang: any) => (
                                        <div key={lang.name} className="flex justify-between items-center">
                                            <span className="text-[11px] font-semibold text-neutral-700">{lang.name}</span>
                                            <span
                                                className="text-[9px] font-semibold text-white px-2 py-0.5 rounded-full"
                                                style={{ background: 'linear-gradient(135deg, #00d4ff, #a855f7)' }}
                                            >
                                                {lang.level}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print overrides */}
            <style>{`
                @media print {
                    @page { size: A4; margin: 0; }
                    body { background: white !important; }
                    .print\\:hidden { display: none !important; }
                }
            `}</style>
        </div>
    );
}
