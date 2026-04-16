"use client";
import { ReactLenis } from 'lenis/react';
import { ReactNode, useEffect, useState } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const [useLenis, setUseLenis] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

        setUseLenis(!prefersReducedMotion && hasFinePointer);
    }, []);

    if (!useLenis) {
        return <>{children}</>;
    }

    return (
        <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
