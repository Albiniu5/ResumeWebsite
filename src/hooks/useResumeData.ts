"use client";
import { useLang } from "@/context/LanguageContext";
import * as en from "@/data/resume";
import * as nl from "@/data/resume-nl";

export function useResumeData() {
    const { lang } = useLang();

    if (lang === "nl") {
        return {
            siteConfig: nl.siteConfigNL,
            aboutData: nl.aboutDataNL,
            skillsData: nl.skillsDataNL,
            experienceData: nl.experienceDataNL,
            projectsData: nl.projectsDataNL,
            educationData: nl.educationDataNL,
            languagesData: nl.languagesDataNL,
            philosophyData: nl.philosophyDataNL,
            techStackData: en.techStackData, // tech names stay same
            ui: nl.uiLabelsNL,
        };
    }

    return {
        siteConfig: en.siteConfig,
        aboutData: en.aboutData,
        skillsData: en.skillsData,
        experienceData: en.experienceData,
        projectsData: en.projectsData,
        educationData: en.educationData,
        languagesData: en.languagesData,
        philosophyData: en.philosophyData,
        techStackData: en.techStackData,
        ui: nl.uiLabelsEN,
    };
}
