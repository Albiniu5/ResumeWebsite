export const siteConfig = {
    name: "Dimitri Jeleznov",
    title: "IT Infrastructure & Network Engineer",
    tagline: "Building reliable systems, automating workflows, and bridging the gap between infrastructure and code.",
    email: "jeleznov@gmail.com",
    phone: "+32 473 32 42 03",
    location: "Tongeren, Belgium",
    hero: {
        subtitle: "Technical Consultant · Network Engineer · Systems Builder",
        description:
            "I combine hands-on networking expertise with software development skills to design, deploy, and automate modern IT infrastructure. From Cisco routing to Python scripting, from SAP integrations to Linux servers — I solve real problems with practical solutions.",
        stats: [
            { label: "Years in IT", value: "10+" },
            { label: "Languages Spoken", value: "6" },
            { label: "Technical Domains", value: "8+" },
        ],
    },
};

export const aboutData = {
    paragraphs: [
        "Born in Belarus and raised in Belgium, I've always been driven by curiosity and the desire to understand how things work — from basketball strategy at the professional level to the inner workings of network protocols and operating systems.",
        "My path into IT started with hands-on experimentation: building PCs, running homelabs with virtual machines and Linux, and diving deep into blockchain development. That foundation of self-directed learning evolved into professional roles spanning technical consulting, network management, and enterprise server rooms.",
        "At Pikon NV, I served as a Technical Consultant managing IT infrastructure, networks, and SharePoint environments while developing custom ABAP solutions for SAP clients. I bring a rare combination of infrastructure knowledge, programming ability, and business communication skills — refined through years in B2B sales and client management.",
        "I've invested heavily in artificial intelligence — at Pikon, I led a team exploring the possibilities of Large Language Models for business automation. I'm always tracking the latest developments in AI and finding ways to implement them in daily workflows. The projects below are a direct result of that passion: from AI-powered resume generators to intelligent cooking assistants, I build tools that put AI to practical use.",
        "When I'm not engineering systems, I volunteer as a firefighter in Tongeren — a commitment that sharpened my ability to stay calm under pressure, work as a team, and make quick decisions in critical situations.",
    ],
    highlights: [
        { icon: "network", label: "Infrastructure First", desc: "Deep understanding of networking, servers, and systems architecture" },
        { icon: "code", label: "Code-Driven", desc: "Python, ABAP, Flutter, Solidity, and full-stack development capabilities" },
        { icon: "globe", label: "Multilingual", desc: "Fluent in 6 languages: Dutch, English, French, German, Russian, Polish" },
        { icon: "fire", label: "Under Pressure", desc: "Volunteer firefighter — calm, decisive, and team-oriented" },
        { icon: "shield", label: "Network Security", desc: "CCNA certified, Windows Server, firewall config, and enterprise security" },
        { icon: "cpu", label: "AI Pioneer", desc: "Led LLM exploration team — building AI-powered tools and automating workflows" },
    ],
};

export const skillsData = [
    {
        category: "Networking & Infrastructure",
        icon: "network",
        color: "#00D4FF",
        description: "Enterprise-grade networking with Cisco CCNA routing & switching. Windows Server and Linux administration.",
        skills: ["Cisco CCNA (R&S)", "TCP/IP & Subnetting", "VLANs & Routing", "Windows Server", "Linux Administration", "Firewall Configuration", "DNS / DHCP", "Network Troubleshooting"],
    },
    {
        category: "Programming & Development",
        icon: "code",
        color: "#A855F7",
        description: "From scripting infrastructure automation to building blockchain solutions and web interfaces.",
        skills: ["Python", "ABAP (SAP)", "Flutter / Dart", "Next.js / React", "Solidity", "HTML / CSS", "Blockchain Development", "Scripting & Automation", "API Integration"],
    },
    {
        category: "Systems & Virtualization",
        icon: "server",
        color: "#F59E0B",
        description: "Homelab experience turned professional: VMs, containers, and server infrastructure.",
        skills: ["Virtual Machines (VMware/VBox)", "Containers (Docker)", "Linux (Ubuntu/CentOS)", "Server Hardware", "Homelab Architecture", "System Administration"],
    },
    {
        category: "Enterprise & Business",
        icon: "briefcase",
        color: "#10B981",
        description: "SAP ecosystem, SharePoint administration, and B2B client management experience.",
        skills: ["SAP (End-User & ABAP)", "SharePoint Admin", "B2B Sales & Support", "IT Project Coordination", "Client Relationship Mgmt", "Technical Documentation"],
    },
    {
        category: "Creative & Design",
        icon: "palette",
        color: "#EC4899",
        description: "3D modeling, rendering, and visual design for technical and creative projects.",
        skills: ["Blender 3D", "Adobe Suite", "SketchUp", "3D Printing", "Technical Visualization"],
    },
    {
        category: "Emerging Tech",
        icon: "cpu",
        color: "#F97316",
        description: "Blockchain architecture, smart contracts, app development, and web development — staying ahead of technology trends.",
        skills: ["Blockchain Development", "Smart Contracts", "Crypto Architecture", "App Development (iOS & Android)", "Web Development (Frontend & Backend)", "Trend Analysis", "Continuous Learning"],
    },
];

export const experienceData = [
    {
        role: "Technical Consultant",
        company: "Pikon NV",
        location: "Genk, Belgium",
        period: "Mar 2023 — Aug 2024",
        type: "Full-time",
        description:
            "Served as IT/Network Manager and SharePoint administrator for enterprise clients. Developed custom ABAP programs for SAP environments. Managed network infrastructure, troubleshooting, and system deployments.",
        achievements: [
            "Managed end-to-end IT infrastructure and network operations for enterprise clients",
            "Led a team exploring Large Language Model (LLM) integration for business process automation",
            "Developed custom ABAP solutions to automate and optimize SAP business processes",
            "Administered SharePoint environments, improving team collaboration and document workflows",
            "Provided technical consulting across networking, systems, and software domains",
        ],
        technologies: ["SAP/ABAP", "SharePoint", "Network Infrastructure", "Windows Server", "Cisco", "AI/LLM"],
    },
    {
        role: "Volunteer Firefighter",
        company: "Fire Department Zuid-West Limburg",
        location: "Tongeren, Belgium",
        period: "Dec 2020 — Present",
        type: "Volunteer",
        description:
            "Active volunteer firefighter serving the Tongeren community. Trained in emergency response, teamwork under pressure, and crisis decision-making.",
        achievements: [
            "Completed full firefighter certification program (2020–2022)",
            "Responding to emergency calls requiring rapid assessment and decisive action",
            "Operating as part of coordinated teams in high-stress environments",
        ],
        technologies: ["Emergency Response", "Team Coordination", "Crisis Management"],
    },
    {
        role: "Sales & After-Sales Manager",
        company: "Sensa Interieur",
        location: "Riemst, Belgium",
        period: "Oct 2014 — Feb 2023",
        type: "Full-time",
        description:
            "Managed B2B and B2C sales operations, after-sales service, and administrative processes for an interior design company.",
        achievements: [
            "Led after-sales service operations, resolving complex client issues efficiently",
            "Managed B2B and B2C client relationships across the Benelux region",
            "Streamlined administrative and inventory processes",
        ],
        technologies: ["B2B Sales", "Client Management", "Operations", "Administration"],
    },
    {
        role: "Office & Stock Manager",
        company: "VBH",
        location: "Beringen, Belgium",
        period: "Aug 2011 — Aug 2013",
        type: "Full-time",
        description: "Managed logistics coordination office handling French-speaking client operations in the Wallonia region.",
        achievements: [
            "Coordinated logistics between warehouse operations and Walloon client base",
            "Managed bilingual communication and administrative workflow",
        ],
        technologies: ["Logistics", "Supply Chain", "Bilingual Operations"],
    },
    {
        role: "Sales Representative",
        company: "Easydentic",
        location: "Ghent, Belgium",
        period: "Aug 2009 — Jul 2011",
        type: "Full-time",
        description: "Prospected and acquired new B2B clients for access control and security solutions.",
        achievements: [
            "Built new client pipeline through cold prospecting and relationship development",
            "Maintained existing client accounts and reported on sales performance analytics",
        ],
        technologies: ["B2B Sales", "Access Control", "Security Solutions"],
    },
];

export const projectsData = [
    // --- AI & AUTOMATION ---
    {
        title: "Resume Maker",
        context: "AI-powered job application platform",
        problem: "Tailoring resumes and writing motivation letters for every application is tedious and time-consuming.",
        role: "AI Developer",
        solution: "Users upload their resume and a job description. The AI finds job postings, matches requirements, adapts to the company's tone, and generates custom motivation letters. It can even find email addresses for bulk applications.",
        technologies: ["AI / LLMs", "Web Scraping", "Workflow Automation"],
        outcome: "Accelerates the hiring process by fully automating custom tailord outreach.",
        icon: "cpu",
        category: "AI & Automation",
        imagePlaceholder: "Screenshot of Resume Maker Dashboard / Letter Generation",
        imageStyle: "landscape",
        images: [
            "/projects/resumemaker/1.png",
            "/projects/resumemaker/2.png",
            "/projects/resumemaker/3.png",
            "/projects/resumemaker/4.png",
            "/projects/resumemaker/5.png",
            "/projects/resumemaker/6.png",
            "/projects/resumemaker/7.png",
            "/projects/resumemaker/8.png"
        ]
    },
    {
        title: "AI Trading Bot",
        context: "Multi-agent AI trading system",
        problem: "Reacting to real-time market data with complex mathematical day-trading models is impossible for a single human.",
        role: "System Architect",
        solution: "Architected a system of five AI agents that perform independent mathematical analysis and compare conclusions, while a master orchestrator agent executes the final trade action automatically.",
        technologies: ["Multi-Agent Orchestration", "Quantitative Algorithms", "Automated Trading"],
        outcome: "A hands-off, PhD-level mathematics-driven day trading pipeline.",
        icon: "network",
        category: "AI & Automation",
        imagePlaceholder: "Architecture diagram of the multi-agent consensus or terminal output",
        imageStyle: "landscape",
        images: [
            "/projects/tradingbot/1.png",
            "/projects/tradingbot/2.png",
            "/projects/tradingbot/3.png",
            "/projects/tradingbot/4.png",
            "/projects/tradingbot/5.png"
        ]
    },
    {
        title: "Scanner Seller",
        context: "Marketplace listings automation tool",
        problem: "Creating manual marketplace listings with descriptions and pricing is a slow friction point for sellers.",
        role: "Developer",
        solution: "Users scan, photograph, or type an item name. The app automatically generates a ready-to-post listing with pricing suggestions and descriptions for platforms like Vinted or eBay.",
        technologies: ["Image Recognition", "AI Generation", "API Integration"],
        outcome: "Drastically accelerates the online selling workflow.",
        icon: "code",
        category: "AI & Automation",
        imagePlaceholder: "Screenshot of Scanner Seller listing generation UI",
        images: [
            "/projects/seller/seller1.jpg",
            "/projects/seller/seller2.jpg",
            "/projects/seller/seller3.jpg",
            "/projects/seller/seller4.jpg"
        ]
    },
    {
        title: "Automated Video Maker",
        context: "Fully automated short-form content workflow",
        problem: "Extracting, clipping, and fact-checking interesting segments from long-form YouTube videos is labor-intensive.",
        role: "Automation Engineer",
        solution: "A pipeline that downloads videos from channels, analyzes transcripts/audio, cuts segments, fact-checks statements, and automatically generates and uploads YouTube Shorts.",
        technologies: ["Video Processing", "AI Analysis", "YouTube API"],
        outcome: "A completely hands-off content creation pipeline for short-form video.",
        icon: "server",
        category: "AI & Automation",
        imagePlaceholder: "Screenshot of the Video Maker clipping pipeline or timeline",
        imageStyle: "landscape",
        images: [
            "/projects/videomaker/cv3.png",
            "/projects/videomaker/cv4.png",
            "/projects/videomaker/cv5.png",
            "/projects/videomaker/cv7.png",
            "/projects/videomaker/qweqw.png"
        ]
    },

    // --- APPS & TOOLS ---
    {
        title: "Sproutly",
        context: "High-fidelity cooking and recipe app",
        problem: "Users lack an intuitive, visually premium way to track recipes, build menus, and convert them to shopping lists.",
        role: "Mobile Developer",
        solution: "Developed a 'Culinary OS' with robust localization, AI recipe translation, and grocery tracking, enclosed in a premium glassmorphic interface.",
        technologies: ["Flutter", "Dart", "UX/UI Design", "Localization"],
        outcome: "A unified platform for daily culinary management.",
        icon: "server",
        category: "Apps & Tools",
        imagePlaceholder: "Screenshot of Sproutly's Recipe Overview or Meal Plan",
        images: [
            "/projects/sproutly/sproutly1.jpg",
            "/projects/sproutly/sproutly2.jpg",
            "/projects/sproutly/sproutly3.jpg",
            "/projects/sproutly/sproutly4.jpg",
            "/projects/sproutly/sproutly5.jpg",
            "/projects/sproutly/sproutly6.jpg",
            "/projects/sproutly/sproutly7.jpg"
        ]
    },
    {
        title: "eBay Scanner",
        context: "Product recognition and price comparison",
        problem: "Users struggle to quickly evaluate the market value of physical items they want to buy or sell.",
        role: "App Developer",
        solution: "A scanning tool (camera, name, or photo) that searches and matches listings on eBay, Facebook Marketplace, and other platforms to provide instant pricing and similar listings.",
        technologies: ["Computer Vision", "Cross-Platform Mobile", "Web Scraping"],
        outcome: "Enables instant, data-driven decisions on item values.",
        icon: "network",
        category: "Apps & Tools",
        imagePlaceholder: "Screenshot of eBay Scanner camera interface or price results",
        imageStyle: "landscape",
        images: [
            "/projects/ebayscanner/1.png",
            "/projects/ebayscanner/2.png",
            "/projects/ebayscanner/3.png",
            "/projects/ebayscanner/4.png",
            "/projects/ebayscanner/5.png",
            "/projects/ebayscanner/6.png",
            "/projects/ebayscanner/7.png",
            "/projects/ebayscanner/8.png"
        ]
    },
    {
        title: "Talk Store",
        context: "Voice-powered home inventory system",
        problem: "Keeping track of household items manually in a database or via labels is too much friction.",
        role: "Full-Stack Developer",
        solution: "Users simply speak where they store items (e.g., 'My blue pen is in the right drawer'). The system builds a searchable database. Later, users can ask 'Where is my pen?' to retrieve the location.",
        technologies: ["Voice Recognition", "NLP", "Database Management"],
        outcome: "A friction-free, voice-first searchable home inventory.",
        icon: "cpu",
        category: "Apps & Tools",
        imagePlaceholder: "Visual of the Talk Store voice assistant UI or inventory list",
        images: [
            "/projects/talkstore/1.jpg",
            "/projects/talkstore/2.jpg",
            "/projects/talkstore/3.jpg",
            "/projects/talkstore/4.jpg",
            "/projects/talkstore/5.jpg",
            "/projects/talkstore/6.jpg"
        ]
    },

    // --- GAMES & AR ---
    {
        title: "AR Play",
        context: "Chore app using augmented reality",
        problem: "Parents need a way to motivate kids to complete household chores using technology they already love.",
        role: "AR Developer",
        solution: "Parents place virtual markers for chores using AR. Kids scan the environment to find and complete tasks, confirming them by removing the AR object, earning points and rewards.",
        technologies: ["Augmented Reality", "Mobile App", "Gamification"],
        outcome: "Gamifies household responsibilities, creating an engaging experience for kids.",
        icon: "cpu",
        category: "Games & AR",
        imagePlaceholder: "Screenshot of AR Play showing virtual chore markers in a room",
        images: [
            "/projects/arapp/ar1.jpg",
            "/projects/arapp/ar2.jpg",
            "/projects/arapp/ar3.jpg",
            "/projects/arapp/ar4.jpg"
        ]
    },
    {
        title: "Kids Chore App",
        context: "Gamified tablet task management for children",
        problem: "Organizing daily chores for kids and managing a reward system with pen and paper is outdated.",
        role: "Frontend Developer",
        solution: "A gamified tablet UI where parents assign chores. Kids complete tasks presented as fun icons to earn rewards, which can be exchanged for privileges or gifts.",
        technologies: ["Tablet UI", "State Management", "Gamification"],
        outcome: "Transforms household chores into a fun, rewarding daily routine.",
        icon: "code",
        category: "Games & AR",
        imagePlaceholder: "Screenshot of Kids Chore App tablet dashboard",
        images: [
            "/projects/kidapp/1.png",
            "/projects/kidapp/2.png",
            "/projects/kidapp/3.png",
            "/projects/kidapp/4.png",
            "/projects/kidapp/5.png",
            "/projects/kidapp/6.png",
            "/projects/kidapp/7.png"
        ]
    }
];

export const educationData = [
    {
        degree: "System & Network Administration + CCNA",
        institution: "VDAB Campus",
        location: "Genk",
        period: "Nov 2024 — Nov 2025",
        description: "Windows Server & Linux fundamentals, Cisco CCNA Routing & Switching certification track.",
        highlight: true,
    },
    {
        degree: "Firefighter Certification",
        institution: "PLOT Limburg",
        location: "Genk",
        period: "Dec 2020 — Dec 2022",
        description: "Complete firefighter training and certification program.",
    },
    {
        degree: "Applied Psychology",
        institution: "Maastricht University",
        location: "Maastricht",
        period: "Sep 2008 — Aug 2009",
        description: "Foundation in behavioral science, research methodology, and human cognition.",
    },
    {
        degree: "ICT",
        institution: "Karel De Grote Hogeschool",
        location: "Antwerp",
        period: "Sep 2006 — Aug 2008",
        description: "Core IT studies: programming, systems, networking, and computer science fundamentals.",
    },
    {
        degree: "Science & Basketball — Elite Sports School",
        institution: "SHIM Topsportschool",
        location: "Merksem",
        period: "Sep 2002 — Jun 2006",
        description: "Combined academic studies with professional-level basketball training at Belgium's elite sports academy.",
    },
];

export const techStackData = {
    languages: ["Python", "ABAP", "HTML", "CSS", "JavaScript"],
    networking: ["Cisco IOS", "TCP/IP", "VLANs", "OSPF", "Spanning Tree", "DNS", "DHCP", "Wireshark"],
    systems: ["Windows Server", "Ubuntu", "CentOS", "VMware", "VirtualBox", "Docker"],
    platforms: ["SAP", "SharePoint", "Active Directory", "Office 365"],
    tools: ["Blender", "Adobe Suite", "SketchUp", "Git", "VS Code", "Packet Tracer"],
    emerging: ["Blockchain", "Smart Contracts", "3D Printing"],
};

export const languagesData = [
    { name: "Dutch", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "French", level: "Professional" },
    { name: "Russian", level: "Professional" },
    { name: "Polish", level: "Professional" },
    { name: "German", level: "Conversational" },
];

export const philosophyData = [
    {
        title: "Build to Understand",
        description: "I learn by doing. From homelabs to blockchain, I dive deep into technology by building real systems — not just reading about them.",
        icon: "wrench",
    },
    {
        title: "Automate the Repeatable",
        description: "If a task can be scripted, it should be. I combine networking knowledge with programming skills to eliminate manual work and reduce human error.",
        icon: "refresh",
    },
    {
        title: "Bridge the Gaps",
        description: "With 6 languages and cross-domain expertise, I connect people, systems, and ideas. I turn technical complexity into clear communication.",
        icon: "bridge",
    },
    {
        title: "Stay Calm, Stay Sharp",
        description: "Firefighting taught me to think clearly under pressure. I bring that same composure to production incidents, tight deadlines, and complex troubleshooting.",
        icon: "shield",
    },
];
