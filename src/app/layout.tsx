import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Dimitri Jeleznov — IT Infrastructure & Network Engineer",
  description:
    "Personal portfolio of Dimitri Jeleznov — Technical Consultant, Network Engineer, and Systems Builder based in Belgium. Combining hands-on networking expertise with software development skills.",
  keywords: [
    "Dimitri Jeleznov",
    "IT Consultant",
    "Network Engineer",
    "CCNA",
    "Python",
    "SAP",
    "Linux",
    "Belgium",
    "Portfolio",
  ],
  openGraph: {
    title: "Dimitri Jeleznov — IT Infrastructure & Network Engineer",
    description:
      "Building reliable systems, automating workflows, and bridging the gap between infrastructure and code.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased overflow-x-hidden w-full">
        <SmoothScroll>
          <Providers>{children}</Providers>
        </SmoothScroll>
      </body>
    </html>
  );
}
