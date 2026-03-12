"use client";

import { useResumeData } from "@/hooks/useResumeData";
import { useRef } from "react";
// @ts-ignore
import { useReactToPrint } from "react-to-print";
// @ts-ignore
import { FiDownload, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function ResumePDF() {
    const { 
        siteConfig, 
        aboutData, 
        skillsData, 
        experienceData, 
        projectsData, 
        educationData, 
        languagesData, 
        ui 
    } = useResumeData();
    const componentRef = useRef<HTMLDivElement>(null);
    
    const handlePrint = useReactToPrint({
        // @ts-ignore
        content: () => componentRef.current,
        contentRef: componentRef, // To ensure v3 compatibility
        documentTitle: `Resume_${siteConfig.name.replace(" ", "_")}`,
    });

    return (
        <div className="min-h-screen bg-neutral-900 py-12 px-4 selection:bg-[#00d4ff]/30 selection:text-white">
            <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between">
                <Link 
                    href="/"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <FiArrowLeft /> {ui.nav.home} {/* Using Home as Back label */}
                </Link>
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] rounded-lg text-white font-medium hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all"
                >
                    <FiDownload /> Download PDF
                </button>
            </div>

            {/* A4 Print Container */}
            <div className="max-w-[210mm] mx-auto bg-white rounded-xl shadow-2xl overflow-hidden print:shadow-none print:w-[210mm] print:h-[297mm]">
                <div 
                    ref={componentRef} 
                    className="w-[210mm] min-h-[297mm] bg-white text-neutral-900 p-12 pr-14 box-border font-sans"
                    style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
                >
                    {/* Header */}
                    <div className="border-b-2 border-neutral-200 pb-8 mb-8 flex justify-between items-end">
                        <div className="flex-1">
                            <h1 className="text-5xl font-extrabold text-[#0f172a] mb-2 tracking-tight">
                                {siteConfig.name}
                            </h1>
                            <h2 className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#a855f7]">
                                {siteConfig.hero.subtitle}
                            </h2>
                        </div>
                        <div className="text-right text-sm text-neutral-500 space-y-1">
                            <p>{siteConfig.email}</p>
                            <p>{siteConfig.phone}</p>
                            <p>{siteConfig.location}</p>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="mb-8">
                        <p className="text-neutral-600 leading-relaxed text-sm">
                            {aboutData.paragraphs[0]}
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-12">
                        {/* Main Content (Left: 2 Cols) */}
                        <div className="col-span-2 space-y-8">
                            
                            {/* Experience */}
                            <section>
                                <h3 className="text-xl font-bold text-[#0f172a] mb-5 uppercase tracking-wider flex items-center gap-3">
                                    <span className="w-6 h-[2px] bg-gradient-to-r from-[#00d4ff] to-[#a855f7]"></span>
                                    {ui.nav.experience}
                                </h3>
                                <div className="space-y-6">
                                    {experienceData.map((exp: any, i: number) => (
                                        <div key={i} className="relative pl-4 border-l-2 border-neutral-100">
                                            <div className="absolute w-3 h-3 bg-white border-2 border-[#a855f7] rounded-full -left-[7.5px] top-1.5" />
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h4 className="font-bold text-neutral-800 text-lg">{exp.role}</h4>
                                                <span className="text-xs font-semibold text-[#00d4ff] bg-[#00d4ff]/10 px-2.5 py-1 rounded-full">{exp.period}</span>
                                            </div>
                                            <div className="text-neutral-500 font-medium mb-3">{exp.company}</div>
                                            <ul className="text-sm text-neutral-600 space-y-1.5 list-disc pl-4 marker:text-[#a855f7]">
                                                {exp.achievements.slice(0, 3).map((achievement: string, j: number) => (
                                                    <li key={j}>{achievement}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Projects Showcase */}
                            <section>
                                <h3 className="text-xl font-bold text-[#0f172a] mb-5 uppercase tracking-wider flex items-center gap-3">
                                    <span className="w-6 h-[2px] bg-gradient-to-r from-[#00d4ff] to-[#a855f7]"></span>
                                    {ui.nav.projects}
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {projectsData.slice(0, 4).map((project: any, i: number) => (
                                        <div key={i} className="bg-neutral-50 p-4 rounded-lg border border-neutral-100">
                                            <h4 className="font-bold text-neutral-800 mb-1">{project.title}</h4>
                                            <p className="text-[11px] leading-snug text-neutral-500 mb-2 line-clamp-2">{project.description}</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.tech.slice(0, 3).map((t: string, j: number) => (
                                                    <span key={j} className="text-[9px] font-medium text-neutral-500 bg-neutral-200/50 px-2 py-0.5 rounded-md">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar (Right: 1 Col) */}
                        <div className="col-span-1 space-y-8">
                            
                            {/* Skills */}
                            <section>
                                <h3 className="text-xl font-bold text-[#0f172a] mb-5 uppercase tracking-wider">
                                    {ui.nav.skills}
                                </h3>
                                <div className="space-y-4 text-sm">
                                    {skillsData.slice(0, 4).map((category: any) => (
                                        <div key={category.category}>
                                            <h4 className="text-xs font-bold text-neutral-800 mb-2">{category.category}</h4>
                                            <div className="flex flex-wrap gap-1.5">
                                                {category.skills.slice(0, 5).map((skill: string) => (
                                                    <span key={skill} className="text-[10px] font-medium text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-md border border-neutral-200">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Certifications & Education */}
                            <section>
                                <h3 className="text-xl font-bold text-[#0f172a] mb-5 uppercase tracking-wider">
                                    {ui.nav.education}
                                </h3>
                                <div className="space-y-4">
                                    {educationData.map((edu: any, i: number) => (
                                        <div key={i}>
                                            <h4 className="font-bold text-neutral-800 text-sm mb-1">{edu.degree}</h4>
                                            <p className="text-xs text-[#a855f7] font-medium mb-1">{edu.institution}</p>
                                            <p className="text-xs text-neutral-500">{edu.period}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Languages */}
                            <section>
                                <h3 className="text-xl font-bold text-[#0f172a] mb-5 uppercase tracking-wider">
                                    Languages
                                </h3>
                                <div className="space-y-2">
                                    {languagesData?.map((lang: any) => (
                                        <div key={lang.name} className="flex justify-between items-center text-sm">
                                            <span className="font-semibold text-neutral-700">{lang.name}</span>
                                            <span className="text-[10px] font-medium text-white bg-gradient-to-r from-[#00d4ff] to-[#a855f7] px-2 py-0.5 rounded shadow-sm">{lang.level}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            </div>
            
            {/* Global Print Styles to enforce A4 size and hide everything else */}
            <style jsx global>{`
                @media print {
                    @page { 
                        size: A4; 
                        margin: 0mm; /* Let the component handle margins */
                    }
                    body {
                        background: white;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }
            `}</style>
        </div>
    );
}
