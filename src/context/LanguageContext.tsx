"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "nl";

interface LanguageContextType {
    lang: Lang;
    toggle: () => void;
    t: (en: string, nl: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: "nl",
    toggle: () => { },
    t: (_en, nl) => nl,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>("nl");
    const toggle = () => setLang((prev) => (prev === "en" ? "nl" : "en"));
    const t = (en: string, nl: string) => (lang === "en" ? en : nl);

    return (
        <LanguageContext.Provider value={{ lang, toggle, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLang() {
    return useContext(LanguageContext);
}
