"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import TiltCard from "./TiltCard";
import { useResumeData } from "@/hooks/useResumeData";
import ScrambleText from "./ScrambleText";

const iconMap: Record<string, React.ReactNode> = {
    network: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="5" r="3" /><circle cx="5" cy="19" r="3" /><circle cx="19" cy="19" r="3" /><path d="M12 8v4M8.5 17L10.5 14M15.5 17l-2-3" /></svg>,
    code: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    server: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><circle cx="6" cy="6" r="1" /><circle cx="6" cy="18" r="1" /></svg>,
    cpu: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" /></svg>,
};

export default function Projects() {
    const [activeProject, setActiveProject] = useState<string | null>(null);
    const [expandedState, setExpandedState] = useState<{ images: string[]; index: number } | null>(null);
    const { projectsData, ui } = useResumeData();

    // Group projects by category
    const groupedProjects = projectsData.reduce((acc, project) => {
        // @ts-ignore - category added recently, might not be fully typed yet
        const category = project.category || "Other";
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(project);
        return acc;
    }, {} as Record<string, typeof projectsData>);

    return (
        <section id="projects" className="section-padding relative scroll-mt-24">
            <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <p className="text-[#00d4ff] text-sm font-semibold tracking-widest uppercase mb-4">{ui.projects.sectionLabel}</p>
                        <h2 className="section-title"><ScrambleText text={ui.projects.sectionTitle} /></h2>
                        <p className="section-subtitle mx-auto">{ui.projects.subtitle}</p>
                    </div>
                </AnimatedSection>

                <div className="space-y-16">
                    {Object.entries(groupedProjects).map(([category, projects], categoryIndex) => (
                        <div key={category}>
                            <AnimatedSection delay={categoryIndex * 0.1}>
                                <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">{category}</h3>
                            </AnimatedSection>
                            <div className="grid lg:grid-cols-2 gap-6">
                                {projects.map((project, i) => (
                                    <AnimatedSection key={project.title} delay={i * 0.1} className="w-full min-w-0 max-w-full">
                                        <div className="h-full w-full min-w-0 max-w-full">
                                            <TiltCard
                                                className="glass-card glow-border h-full w-full cursor-pointer overflow-hidden"
                                                onClick={() => setActiveProject(activeProject === project.title ? null : project.title)}
                                            >
                                                <div className="p-5 sm:p-6 h-full flex flex-col overflow-hidden w-full max-w-full">
                                                    {/* @ts-ignore */}
                                                    {project.images && project.images.length > 0 ? (
                                                        <div className="w-full max-w-full h-[180px] sm:h-[220px] md:h-[260px] mb-5 sm:mb-6 relative group overflow-hidden rounded-xl bg-[#0a0a0f] py-4 border border-white/5 flex items-center shrink-0">
                                                            <div className="flex h-full w-max animate-scroll-gallery hover:pause-scroll items-center">
                                                                {/* First Set */}
                                                                <div className="flex h-full items-center">
                                                                    {/* @ts-ignore */}
                                                                    {project.images.map((imgUrl: string, idx: number) => {
                                                                        // @ts-ignore
                                                                        const isLandscape = project.imageStyle === "landscape";
                                                                        const aspectClass = isLandscape ? "aspect-video" : "aspect-[1/2]";
                                                                        return (
                                                                        <div 
                                                                            key={`set1-${idx}`} 
                                                                            className={`shrink-0 h-full ${aspectClass} mr-4 rounded-xl overflow-hidden border border-white/10 bg-black/50 relative flex items-center justify-center cursor-zoom-in group/img z-10`}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                // @ts-ignore
                                                                                setExpandedState({ images: project.images, index: idx });
                                                                            }}
                                                                        >
                                                                            <img src={imgUrl} alt={`${project.title} preview ${idx + 1}`} className="w-full h-full object-contain rounded-xl transition-transform duration-300 group-hover/img:scale-105" />
                                                                        </div>
                                                                    )})}
                                                                </div>
                                                                {/* Second Set */}
                                                                <div className="flex h-full items-center">
                                                                    {/* @ts-ignore */}
                                                                    {project.images.map((imgUrl: string, idx: number) => {
                                                                        // @ts-ignore
                                                                        const isLandscape = project.imageStyle === "landscape";
                                                                        const aspectClass = isLandscape ? "aspect-video" : "aspect-[1/2]";
                                                                        return (
                                                                        <div 
                                                                            key={`set2-${idx}`} 
                                                                            className={`shrink-0 h-full ${aspectClass} mr-4 rounded-xl overflow-hidden border border-white/10 bg-black/50 relative flex items-center justify-center cursor-zoom-in group/img z-10`}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                // @ts-ignore
                                                                                setExpandedState({ images: project.images, index: idx });
                                                                            }}
                                                                        >
                                                                            <img src={imgUrl} alt={`${project.title} preview ${idx + 1}`} className="w-full h-full object-contain rounded-xl transition-transform duration-300 group-hover/img:scale-105" />
                                                                        </div>
                                                                    )})}
                                                                </div>
                                                            </div>
                                                            {/* Gradient fade edges */}
                                                            <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none"></div>
                                                            <div className="absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none"></div>
                                                        </div>
                                                    ) : /* @ts-ignore */ project.imagePlaceholder ? (
                                                        <div className="w-full max-w-full h-48 bg-white/5 border border-white/10 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden group">
                                                            <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                            <span className="text-gray-500 text-sm font-medium px-4 text-center flex flex-col items-center gap-2">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                                                                {/* @ts-ignore */}
                                                                {project.imagePlaceholder}
                                                            </span>
                                                        </div>
                                                    ) : null}

                                                    <div className="flex items-start gap-4 mb-4 min-w-0 w-full">
                                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#00d4ff] shrink-0">
                                                            {iconMap[project.icon]}
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <h3 className="text-lg font-bold text-white truncate">{project.title}</h3>
                                                            <p className="text-xs text-[#00d4ff] font-medium truncate">{project.context}</p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3 text-sm flex-grow min-w-0 w-full">
                                                        <div className="min-w-0">
                                                            <span className="text-gray-500 font-semibold text-xs uppercase block truncate">{ui.projects.challenge}</span>
                                                            <p className="text-gray-400 mt-1 break-words leading-relaxed">{project.problem}</p>
                                                        </div>
                                                        <div className="min-w-0">
                                                            <span className="text-gray-500 font-semibold text-xs uppercase block truncate">{ui.projects.solution}</span>
                                                            <p className="text-gray-400 mt-1 break-words leading-relaxed">{project.solution}</p>
                                                        </div>
                                                    </div>

                                                    <AnimatePresence>
                                                        {activeProject === project.title && (
                                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden min-w-0 w-full">
                                                                <div className="mt-4 pt-4 border-t border-white/5 min-w-0">
                                                                    <span className="text-gray-500 font-semibold text-xs uppercase block truncate">{ui.projects.outcome}</span>
                                                                    <p className="text-[#10b981] text-sm mt-1 break-words leading-relaxed">{project.outcome}</p>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>

                                                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5 min-w-0 w-full">
                                                        {project.technologies.map((t) => (
                                                            <span key={t} className="tech-chip text-[11px] truncate max-w-full">{t}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </TiltCard>
                                        </div>
                                    </AnimatedSection>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Expanded Image Modal */}
            <AnimatePresence>
                {expandedState && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                        onClick={() => setExpandedState(null)}
                    >
                        <button 
                            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/50 p-3 sm:p-4 rounded-full backdrop-blur-md transition-colors z-50 hover:scale-110 hover:bg-black/80 ring-1 ring-white/10"
                            onClick={(e) => {
                                e.stopPropagation();
                                setExpandedState(prev => prev ? { ...prev, index: prev.index === 0 ? prev.images.length - 1 : prev.index - 1 } : null);
                            }}
                        >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                        </button>
                        
                        <motion.img
                            key={expandedState.index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            src={expandedState.images[expandedState.index]}
                            alt={`Expanded view ${expandedState.index + 1}`}
                            className="max-w-[85vw] max-h-[90vh] object-contain rounded-xl shadow-2xl border border-white/10 cursor-zoom-out"
                            onClick={(e) => { e.stopPropagation(); setExpandedState(null); }} 
                        />

                        <button 
                            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/50 p-3 sm:p-4 rounded-full backdrop-blur-md transition-colors z-50 hover:scale-110 hover:bg-black/80 ring-1 ring-white/10"
                            onClick={(e) => {
                                e.stopPropagation();
                                setExpandedState(prev => prev ? { ...prev, index: prev.index === prev.images.length - 1 ? 0 : prev.index + 1 } : null);
                            }}
                        >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                        </button>

                        <button 
                            className="absolute top-6 right-6 text-white/50 hover:text-white bg-black/50 p-2 sm:p-3 rounded-full backdrop-blur-md transition-colors z-50 ring-1 ring-white/10"
                            onClick={(e) => { e.stopPropagation(); setExpandedState(null); }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>
                        
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 bg-black/60 px-5 py-2 rounded-full backdrop-blur-md font-semibold text-sm tracking-widest ring-1 ring-white/10">
                            {expandedState.index + 1} / {expandedState.images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
