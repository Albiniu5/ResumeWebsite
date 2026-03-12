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
        <div className="min-h-screen bg-neutral-900 py-12 px-4 print:bg-white print:p-0 print:m-0">
            {/* Toolbar — hidden on print */}
            <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between print:hidden">
                <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <FiArrowLeft /> {ui.nav.home}
                </Link>
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] rounded-lg text-white font-medium hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all"
                >
                    <FiDownload /> Download PDF
                </button>
            </div>

            {/* A4 Page */}
            <div className="max-w-[210mm] mx-auto bg-white rounded-xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
                <div
                    ref={componentRef}
                    className="bg-white text-neutral-800 px-10 py-8 box-border"
                    style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", width: '210mm', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
                >
                    {/* Header */}
                    <header className="mb-4">
                        <h1 className="text-3xl font-extrabold text-[#0f172a] tracking-tight leading-none">
                            {siteConfig.name}
                        </h1>
                        <p className="text-xs font-semibold mt-1" style={{ color: '#0891b2' }}>
                            {siteConfig.hero.subtitle}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-neutral-500">
                            <span>{siteConfig.email}</span>
                            <span className="text-neutral-300">|</span>
                            <span>{siteConfig.phone}</span>
                            <span className="text-neutral-300">|</span>
                            <span>{siteConfig.location}</span>
                        </div>
                        <div className="mt-2 h-[1.5px] w-full bg-gradient-to-r from-[#00d4ff] via-[#a855f7] to-transparent rounded-full" />
                    </header>

                    {/* Summary */}
                    <section className="mb-4">
                        <p className="text-[10px] leading-relaxed text-neutral-600">
                            {aboutData.paragraphs[0]}
                        </p>
                    </section>

                    {/* Two-column body */}
                    <div className="grid grid-cols-[1fr_220px] gap-8">

                        {/* LEFT — Experience + Education */}
                        <div>
                            <h3 className="text-[11px] font-bold text-[#0f172a] uppercase tracking-[0.15em] mb-2 flex items-center gap-2">
                                <span className="w-4 h-[1.5px] bg-gradient-to-r from-[#00d4ff] to-[#a855f7] rounded-full" />
                                {ui.nav.experience}
                            </h3>
                            <div className="space-y-3">
                                {experienceData.map((exp: any, i: number) => (
                                    <div key={i} className="relative pl-3 border-l border-neutral-200">
                                        <div className="absolute w-1.5 h-1.5 rounded-full -left-[3.5px] top-[4px]" style={{ background: 'linear-gradient(135deg, #00d4ff, #a855f7)' }} />
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="text-[11px] font-bold text-neutral-800">{exp.role}</h4>
                                            <span className="text-[9px] text-neutral-400 whitespace-nowrap ml-2">{exp.period}</span>
                                        </div>
                                        <p className="text-[9.5px] font-medium mb-1" style={{ color: '#0891b2' }}>{exp.company}</p>
                                        <ul className="text-[9.5px] text-neutral-600 space-y-0 list-disc pl-3">
                                            {exp.achievements.slice(0, 2).map((a: string, j: number) => (
                                                <li key={j} className="leading-snug">{a}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Education — below experience */}
                            <h3 className="text-[11px] font-bold text-[#0f172a] uppercase tracking-[0.15em] mt-5 mb-2 flex items-center gap-2">
                                <span className="w-4 h-[1.5px] bg-gradient-to-r from-[#00d4ff] to-[#a855f7] rounded-full" />
                                {ui.nav.education}
                            </h3>
                            <div className="space-y-1.5">
                                {educationData.map((edu: any, i: number) => (
                                    <div key={i} className="relative pl-3 border-l border-neutral-200">
                                        <div className="absolute w-1.5 h-1.5 rounded-full -left-[3.5px] top-[4px]" style={{ background: 'linear-gradient(135deg, #00d4ff, #a855f7)' }} />
                                        <h4 className="text-[10px] font-bold text-neutral-800 leading-tight">{edu.degree}</h4>
                                        <p className="text-[9px] font-medium" style={{ color: '#0891b2' }}>{edu.institution}</p>
                                        <p className="text-[8.5px] text-neutral-400">{edu.period}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT — Skills, Education, Languages */}
                        <div className="space-y-4">

                            {/* Skills */}
                            <section>
                                <h3 className="text-[11px] font-bold text-[#0f172a] uppercase tracking-[0.15em] mb-2">
                                    {ui.nav.skills}
                                </h3>
                                <div className="space-y-2">
                                    {skillsData.slice(0, 4).map((category: any) => (
                                        <div key={category.category}>
                                            <h4 className="text-[9px] font-bold text-neutral-600 mb-1 uppercase tracking-wide">{category.category}</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {category.skills.slice(0, 5).map((skill: string) => (
                                                    <span key={skill} className="text-[8px] font-medium text-neutral-600 bg-neutral-100 px-1.5 py-[1px] rounded border border-neutral-200">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>


                            {/* Languages */}
                            <section>
                                <h3 className="text-[11px] font-bold text-[#0f172a] uppercase tracking-[0.15em] mb-2">
                                    Languages
                                </h3>
                                <div className="space-y-1">
                                    {languagesData.map((lang: any) => (
                                        <div key={lang.name} className="flex justify-between items-center">
                                            <span className="text-[10px] font-semibold text-neutral-700">{lang.name}</span>
                                            <span className="text-[8px] font-semibold text-white px-1.5 py-[1px] rounded-full" style={{ background: 'linear-gradient(135deg, #00d4ff, #a855f7)' }}>
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

            <style>{`
                @media print {
                    @page { size: A4; margin: 0; }
                    body { background: white !important; }
                }
            `}</style>
        </div>
    );
}
