import { Project, PhotoAsset, EngineeringThesis, CareerExperience, EducationEntry } from '../types';

export const PERSONAL_INFO = {
  name: "Kondwani Austin Phanga",
  shortName: "Kondwani Phanga",
  title: "Data Centre Cloud Architect | Cloud & Infrastructure Systems Specialist",
  subtitles: [
    "Enterprise Data Centre Operations (MTL National Backbone)",
    "Cloud-Native Systems & AWS VPC Architecture",
    "Distributed Edge Computing & On-Device Computer Vision",
    "Managing Director (MWK 200M+ Annual Revenue Delivered)"
  ],
  bio: "Computer engineer and technology leader with over a decade of progressive experience bridging enterprise data centre operations, cloud-native systems architecture, and business-scale technology leadership. Began inside Malawi's national telecommunications backbone (MTL)—managing enterprise servers, SAN/NAS storage, network security, and disaster recovery—before building and running a multi-million-kwacha creative technology agency serving UNDP, UNICEF, the World Bank, the EU, and the US Embassy. Currently architecting containerised, AWS-targeted SaaS platforms and distributed edge-computing control planes, with a verified record of remediating critical security findings to 100% automated test compliance.",
  location: "Lilongwe & Blantyre, Malawi",
  phone: "+265 999 004 667",
  email: "kayphanga@gmail.com",
  linkedin: "https://www.linkedin.com/in/kondwani-austin-phanga/",
  github: "https://github.com/spotmw",
  affiliation: "BSc Computer Engineering (Univ. of Livingstonia) • AWS Solutions Architect Candidate (Q4 2026) • Managing Director, 7arts",
  institutionalClients: [
    "The World Bank", "UNDP", "UNICEF", "European Union (EU)", "US Embassy", 
    "British High Commission", "National Bank of Malawi", "Welthungerhilfe", "Malawi Telecommunications Ltd"
  ],
  stats: [
    { label: "Data Centre & Cloud Systems", value: "10+ Yrs", detail: "Enterprise SAN/NAS, virtualisation & AWS VPC architectures" },
    { label: "Security & Reliability Audit", value: "84 Remedied", detail: "Critical findings resolved to 100% automated test pass rate" },
    { label: "On-Device Kinematic Landmarks", value: "553", detail: "Per frame with zero cloud data transmission (Pocket Body)" },
    { label: "Institutional Revenue Delivered", value: "MWK 200M+", detail: "Annual revenue delivered through contracts & donor projects" },
  ]
};

export const CAREER_EXPERIENCES: CareerExperience[] = [
  {
    role: "Managing Director & Studio Manager",
    company: "7arts Creative Agency",
    location: "Lilongwe, Malawi",
    period: "2023 – Present",
    description: "Driving strategic growth, technology governance, and commercial leadership across multi-million-kwacha creative technology contracts.",
    achievements: [
      "Delivered over MWK 200 million in annual revenue through disciplined institutional contract negotiation, vendor relations, and client retention.",
      "Served as the agency's sole IT infrastructure lead: administered on-premise servers, managed network security, and maintained backup & DR protocols.",
      "Managed legal compliance, intellectual property, and donor procurement frameworks aligned with World Bank standards."
    ],
    skills: ["Executive Leadership", "IT Infrastructure", "Server Virtualisation", "Disaster Recovery", "Donor Procurement"]
  },
  {
    role: "Founder & Creative Director",
    company: "Phanga Studio / Phanga Media",
    location: "Lilongwe, Malawi",
    period: "2017 – 2022",
    description: "Built an independent creative technology studio delivering high-stakes digital platforms, documentaries, and campaigns for premier multilateral institutions.",
    achievements: [
      "Delivered major technology and media contracts for UNDP, UNICEF, the World Bank, the EU, the US Embassy, and British High Commission.",
      "Architected internal CRM, client portals, and production web platforms from domain configuration to Linux server hardening.",
      "Developed a computer-vision prototype for real-time object annotation via live camera feeds, establishing early foundations in ML pipelines."
    ],
    skills: ["Full-Stack Architecture", "Linux Hardening", "Computer Vision Prototyping", "Institutional Delivery"]
  },
  {
    role: "IT Officer — Enterprise Data Centre Operations",
    company: "Malawi Telecommunications Limited (MTL)",
    location: "Blantyre & Lilongwe, Malawi",
    period: "2010 – 2013",
    description: "Operated mission-critical enterprise systems within the engine rooms of Malawi's national telecommunications backbone.",
    achievements: [
      "Managed physical enterprise rack servers, SAN/NAS storage arrays, LAN/WAN switching, and virtualised compute supporting national voice and data services.",
      "Configured perimeter firewalls, IDS/IPS, and access-control lists (ACLs) to safeguard customer billing and subscriber provisioning databases.",
      "Executed disaster recovery protocols: off-site tape rotation, hot-standby server failover, and operational DR runbooks meeting strict regulatory SLAs."
    ],
    skills: ["Data Centre Operations", "SAN/NAS Storage", "Firewall & IDS/IPS", "Disaster Recovery", "Hot-Standby Failover"]
  },
  {
    role: "IT Intern — SCADA & Infrastructure Systems",
    company: "Northern Region Water Board (NRWB)",
    location: "Mzuzu, Malawi",
    period: "2016",
    description: "Supported industrial control networks and operational-technology (OT) systems for municipal water treatment and distribution.",
    achievements: [
      "Gained hands-on expertise in SCADA networks, industrial PLCs, and real-time telemetry acquisition across converged IT/OT infrastructure.",
      "Contributed to disaster recovery and backup planning for plant control systems, mapping dependencies between PLCs and historian databases."
    ],
    skills: ["SCADA Systems", "Industrial Control Networks", "Converged IT/OT", "Real-Time Telemetry"]
  }
];

export const EDUCATION_CREDENTIALS: EducationEntry[] = [
  {
    degree: "BSc in Computer Engineering",
    institution: "University of Livingstonia",
    location: "Malawi",
    period: "2013 – 2017",
    focus: "Network Security, Distributed Systems Architecture, Database Management Systems, Software Engineering"
  },
  {
    degree: "International Diploma in Computing",
    institution: "NACIT (National Advisory Committee on Information Technology)",
    location: "Blantyre, Malawi",
    period: "2010 – 2011",
    focus: "Systems Administration, Enterprise IT Infrastructure, LAN/WAN Networking, Technical Support"
  },
  {
    degree: "AWS Certified Solutions Architect – Associate",
    institution: "Amazon Web Services (In Progress)",
    location: "Examination: Q4 2026",
    period: "Candidate (2026)",
    focus: "AWS Well-Architected Framework, Multi-Tier VPC Design, High-Availability Fault Tolerance, Multi-Tenant Cloud Security"
  },
  {
    degree: "Malawi School Certificate of Education (MSCE)",
    institution: "Domasi Secondary School",
    location: "Zomba, Malawi",
    period: "2003 – 2006",
    focus: "Physical Sciences, Mathematics & Computer Fundamentals"
  }
];

export const ENGINEERING_THESES: EngineeringThesis[] = [
  {
    title: "Mission-Critical Telecoms Data Centre Operations & Business Continuity",
    domain: "Enterprise Data Centre Infrastructure",
    period: "2010 – 2013 (MTL)",
    summary: "Managing high-availability enterprise compute, SAN storage arrays, and network perimeter security in the engine rooms of Malawi's national telecommunications provider.",
    architectureDetails: "Hardware virtualisation, SAN/NAS storage provisioning, firewall ACL segmentation protecting subscriber billing, and off-site hot-standby failover runbooks.",
    impact: "Maintained 99.9% uptime compliance across mission-critical national voice and broadband billing databases."
  },
  {
    title: "Distributed Edge Computing Fleet Control Planes Under Severe Power Constraints",
    domain: "Edge Systems & Telemetry Engineering",
    period: "2024 – 2026 (EdgeVision)",
    summary: "Architecting a resilient hybrid-cloud control plane for solar-powered edge devices deployed across rural Malawi, featuring on-device neural feature filtering and local telemetry buffering.",
    architectureDetails: "FastAPI control plane, Celery asynchronous sync workers, partitioned local NVMe buffers, and CLIP cosine-similarity deduplication.",
    impact: "Remediated 84 critical security and concurrency findings to 100% automated pytest pass rate, slashing uplink bandwidth costs by 78%."
  },
  {
    title: "Multi-Tenant Cloud Financial Infrastructure & Mobile Money Interoperability",
    domain: "FinTech & Cloud Architecture",
    period: "2024 – 2026 (AMR Platform)",
    summary: "Designing a high-throughput mobile-money reconciliation and bulk disbursement SaaS platform across Airtel Money, TNM Mpamba, and M-Pesa.",
    architectureDetails: "AWS VPC network isolation, encrypted RDS PostgreSQL, BullMQ transaction queues, KMS key management, and maker-checker approval workflows.",
    impact: "Automates reconciliation for thousands of daily transactions for institutional NGOs and enterprises with zero ledger discrepancy."
  },
  {
    title: "Deterministic Engine Verification & Traditional Game Preservation",
    domain: "Computational Algorithms & Swift Systems",
    period: "2025 – 2026 (Bawo)",
    summary: "Engineered a tournament-grade deterministic game engine preserving East Africa's count-and-capture board games with strict algorithmic verification.",
    architectureDetails: "Pure Swift Package SPM architecture, 103 test-pinned traditional rules, 6 fitness functions, and 4-depth Alpha-Beta search trees.",
    impact: "Achieved 100% rule alignment with Klubo Internacia de Bao-Amantoj (KIBA) tournament standards with zero UI coupling."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "amr-fintech",
    title: "AMR — Mobile Money Reconciliation SaaS",
    tagline: "Multi-tenant FinTech platform automating bulk mobile-money disbursement and reconciliation across Airtel Money, TNM Mpamba, and M-Pesa.",
    category: "FinTech & SaaS",
    featured: true,
    role: "Lead Cloud Architect & Backend Engineer",
    period: "2024 – 2026",
    localPath: "/Users/mac/Sites/Kortfolio/docs/amr",
    badges: ["AWS VPC Isolation", "Airtel / TNM Mpamba / M-Pesa", "Multi-Tenant SaaS", "Prisma & PostgreSQL"],
    impactMetrics: [
      { label: "Daily Volume", value: "Thousands", detail: "Bulk mobile transactions reconciled" },
      { label: "Disbursement Gateways", value: "4 Telecos", detail: "Airtel, TNM Mpamba, MTN, M-Pesa" },
      { label: "Security Compliance", value: "Zero Gaps", detail: "Role-based approval & audit ledger" },
      { label: "Cloud Arch", value: "AWS Encrypted", detail: "VPC, RDS PostgreSQL, S3 KMS" }
    ],
    techStack: ["Node.js", "Express", "TypeScript", "React", "PostgreSQL", "Prisma ORM", "AWS VPC", "Docker", "Redis", "BullMQ"],
    summary: "Architected a multi-tenant SaaS platform automating bulk mobile-money disbursement and reconciliation across Airtel Money, M-Pesa, TNM Mpamba, and MTN, processing thousands of daily transactions for NGOs and institutional enterprises across rural and urban Malawi.",
    problemStatement: "Organizations disbursing emergency relief and operations funds across Malawi manually juggle multi-SIM handsets and fragmented spreadsheets, causing severe reconciliation errors, double-payments, and compliance audit failures.",
    solutionArchitecture: "An AWS-targeted deployment model featuring VPC isolation, encrypted RDS PostgreSQL instances, S3-backed document storage with server-side encryption, and IAM role-based access control aligned to least-privilege principles. Includes automated reconciliation engines against operator statement feeds.",
    offlineConsiderations: "Batched offline disbursement queues with cryptographic dual-signature authorization preventing duplicate payouts during intermittent connectivity.",
    architectureLayers: [
      {
        name: "Operator Gateway Ingestion",
        components: ["Airtel Money API Adapter", "TNM Mpamba Webhook Listener", "M-Pesa B2C Gateway", "MTN Mobile Money Bridge"],
        description: "Standardizes heterogeneous telecommunications protocols into a unified transaction stream."
      },
      {
        name: "Multi-Tenant Isolation Core",
        components: ["PostgreSQL Row-Level Security (RLS)", "Prisma Client Extension", "BullMQ Asynchronous Settlement", "KMS Secret Vault"],
        description: "Guarantees strict data and financial boundary segregation between organizational tenants."
      },
      {
        name: "Audit & Finance Portal",
        components: ["Real-time Reconciliation Meter", "Double-Entry General Ledger", "Maker-Checker Approval Flow"],
        description: "Zero-trust verification interface for CFOs, external auditors, and donor compliance officers."
      }
    ],
    keyHighlights: [
      "Conducted a comprehensive pre-launch security audit remediating critical isolation vectors before onboarding pilot institutions.",
      "Automated matching engine pairing bank withdrawal records with teleco mobile wallet SMS confirmation hashes.",
      "Built for institutional donors (World Bank, UN agencies) requiring strict anti-fraud verification trails."
    ]
  },
  {
    id: "edge-vision",
    title: "Edge Vision Data Platform — Solar Edge Fleet Control Plane",
    tagline: "Distributed edge computing mesh managing solar-powered edge devices with local telemetry buffering and 84-finding audit remediation.",
    category: "Edge Computing & CV",
    featured: true,
    role: "Backend Architect & Distributed Systems Engineer",
    period: "2024 – 2026",
    localPath: "/Users/mac/EDGE VISION DATA PLATFORMS",
    badges: ["Solar Edge Fleet", "CLIP Deduplication", "FastAPI & Celery", "84 Audit Fixes"],
    previewImages: [
      "/assets/photos/photo_aerial.jpg"
    ],
    impactMetrics: [
      { label: "Edge Fleet", value: "Solar Mesh", detail: "Solar nodes deployed across rural Malawi" },
      { label: "Bandwidth Saved", value: "78%", detail: "Via on-device neural CLIP deduplication" },
      { label: "Security Audit", value: "84 Remedied", detail: "Race conditions, ledgers & API hardening" },
      { label: "Test Pass Rate", value: "100%", detail: "Automated pytest regression suites" }
    ],
    techStack: ["FastAPI", "Async SQLAlchemy", "PyTorch", "CLIP", "Celery", "PostgreSQL", "Alembic", "Redis", "Docker", "Kubernetes"],
    summary: "Built a cloud-native control plane managing a distributed fleet of solar-powered edge devices across rural Malawi. The platform orchestrates device provisioning, over-the-air updates, telemetry-driven health monitoring, and consent-compliant visual data ingestion with zero data leakage.",
    problemStatement: "Operating computer vision hardware in off-grid African settings requires surviving frequent power loss, extreme thermal cycles, and prohibitive cellular data costs while ensuring rigorous biometric data privacy.",
    solutionArchitecture: "A hybrid-cloud data pipeline: edge devices buffer telemetry locally during connectivity outages; Celery workers orchestrate asynchronous sync to cloud PostgreSQL; real-time dashboards provide fleet visibility to field engineers.",
    offlineConsiderations: "Nodes store hours of visual telemetry locally in encrypted flash storage, negotiating opportunistic sync whenever cellular links recover.",
    architectureLayers: [
      {
        name: "Edge Device Firmware",
        components: ["Solar Power Watchdog", "Camera Capture Controller", "CLIP Image Embedder", "Local SQLite Queue"],
        description: "Optimized for thermal endurance and low power consumption."
      },
      {
        name: "Control Plane Backend",
        components: ["FastAPI Service", "Celery Distributed Workers", "PostgreSQL Data Lake", "Batch Activation Engine"],
        description: "Manages device telemetry, task distribution, and batch image pipelines."
      },
      {
        name: "Data Marketplace & Annotation UI",
        components: ["Human-in-the-Loop QA Dashboard", "Dataset Assembler", "Bounding Box & Tagging Portal"],
        description: "Produces validated, commercial-grade datasets for environmental and developmental research."
      }
    ],
    keyHighlights: [
      "Custom CLIP neural deduplication module (`clip_dedup`) achieving over 75% reduction in uplink payloads.",
      "Full security and reliability audit remediation: resolved 84 findings including database race conditions and decimal precision in ledgers.",
      "100% automated pytest pass rate across edge telemetry ingestion and API gateways."
    ]
  },
  {
    id: "pocket-body",
    title: "Pocket Body — On-Device Kinematic Motion Instrument",
    tagline: "A privacy-first phone instrument capturing up to 553 3D body, hand, and facial landmarks with zero cloud data transmission.",
    category: "Edge Computing & CV",
    featured: true,
    role: "Computer Vision Engineer & Creative Technologist",
    period: "2025 – 2026",
    localPath: "/Users/mac/pocket-body",
    badges: ["Zero-Cloud Telemetry", "553 Landmarks/Frame", "Metric Depth", "Native Apple Vision + Web"],
    previewImages: [
      "/assets/projects/screenshot_3d_viewer.png",
      "/assets/projects/screenshot_capture.png",
      "/assets/projects/screenshot_consent.png",
      "/assets/projects/screenshot_moken_control.png",
      "/assets/projects/screenshot_current.png"
    ],
    impactMetrics: [
      { label: "Keypoints", value: "553 Total", detail: "33 Pose + 42 Hand + 478 Face" },
      { label: "Cloud Upload", value: "0 Bytes", detail: "Strict on-device privacy guarantee" },
      { label: "Depth Fidelity", value: "Metric 3D", detail: "Real world coordinates, not relative Z" },
      { label: "Framerate", value: "60 FPS", detail: "Hardware-accelerated perception" }
    ],
    techStack: ["TypeScript", "MediaPipe Tasks Vision", "Three.js", "WebGL", "Swift 5.10", "SwiftUI", "Apple Vision Framework", "Python", "NumPy", "Vite"],
    summary: "Pocket Body turns a mobile phone into a scientific-grade third-person motion data capture instrument. Designed for objective kinematic measurement without compromising subject privacy, MediaPipe and Apple Vision run entirely on-device, writing calibrated JSON motion tracks while raw video never leaves RAM.",
    problemStatement: "Most optical motion capture relies either on expensive multi-camera studio rigs or privacy-invasive cloud video pipelines. Contributors in vulnerable or research contexts cannot verify what happens to their biometric video data once uploaded.",
    solutionArchitecture: "A dual architecture: (1) A high-performance Web app using MediaPipe Tasks Vision pinned to WebAssembly with WebGL 3D bone visualization; (2) A fully native iOS SwiftUI app powered directly by Apple's Vision framework in-process with no web wrappers.",
    offlineConsiderations: "Operates 100% air-gapped. Session files export directly as structured JSON tracks and contact-sheet audit strips to local device storage.",
    architectureLayers: [
      {
        name: "Perception Engine",
        components: ["BlazePose Heavy", "MediaPipe Hand Tracking", "Face Mesh (478 Dense Landmarks)", "Apple Vision 3D Kinematics"],
        description: "Extracts normalized screen coordinates and metric 3D world joints simultaneously."
      },
      {
        name: "Ethical Consent & Framing Gate",
        components: ["Pre-flight explicit consent modal", "Live optical boundary warnings", "Occlusion detection scan"],
        description: "Ensures contributor autonomy and guarantees complete anatomical coverage before capture completes."
      },
      {
        name: "Verification & Audit Layer",
        components: ["Interactive Three.js 3D Bone Viewer", "Temporal Contact Sheet Strip", "Metric Track JSON Exporter"],
        description: "Allows the contributor to visually audit the tracked skeleton before deciding to save or export."
      }
    ],
    keyHighlights: [
      "Captures metric world landmarks alongside screen-space coordinates, enabling true clinical depth analysis.",
      "Guided 6-pose calibration scan ensures all joint planes are visible and verified unoccluded.",
      "Strict data sovereignty: zero external network calls, zero telemetry, zero persistent raw video."
    ]
  },
  {
    id: "bawo",
    title: "Bawo — Traditional Mancala Game Engine & Preservation",
    tagline: "Culturally faithful digital preservation of Malawian Bawo & Zanzibari Bao la Kiswahili with 103 test-pinned rules.",
    category: "Cultural Tech & Gaming",
    featured: true,
    role: "Author & Engine Architect",
    period: "2025 – 2026",
    localPath: "/Users/mac/Bao",
    badges: ["103 Engine Unit Tests", "Malawian & Zanzibari Rules", "SwiftUI Native", "Minimax Alpha-Beta AI"],
    previewImages: [
      "/assets/projects/bawo_glass.png",
      "/assets/projects/ipad-malawi.png",
      "/assets/projects/iphone-malawi.png",
      "/assets/projects/ipad-home.png",
      "/assets/projects/iphone-kiswahili.png",
      "/assets/projects/iphone-kujifunza.png"
    ],
    impactMetrics: [
      { label: "Passing Tests", value: "103 Rules", detail: "+ 6 Architecture fitness functions" },
      { label: "Rule Sets", value: "3 Distinct", detail: "Malaŵi, Zanzibari Kiswahili, Kujifunza" },
      { label: "Board Setup", value: "4×8 Pits", detail: "Authentic nyumba, kichwa, mtaji topology" },
      { label: "AI Levels", value: "3 Tiers", detail: "Random, Heuristic, 4-Depth Alpha-Beta" }
    ],
    techStack: ["Swift 5.10", "SwiftUI", "Combine", "XCTest", "Game Center", "AVFoundation", "CoreHaptics", "SPM"],
    summary: "Bawo is a dedicated cultural preservation project and tournament-grade engine for East Africa's most prestigious count-and-capture games. Unlike generic Western mancala clones, it faithfully implements the subtle complexities of Malawian Bawo and Zanzibari Bao la Kiswahili, from the ceremonial nyumba and takasia blocking to multi-lap mtaji capture chains.",
    problemStatement: "Most digital implementations of African traditional games reduce rich, ancient mathematical traditions into generic 2-row mancala reskins. The authentic nuances—such as the kunamua sowing phase, reverse-direction safaris, and tactical house-preservation—were in danger of digital erasure.",
    solutionArchitecture: "Engineered with strict separation between a deterministic game engine (packaged as a pure Swift Package) and an authentic, carved-wood SwiftUI presentation layer with ceremonial soundscapes and directional haptic feedback.",
    offlineConsiderations: "Completely standalone offline play against 3 tiers of deterministic AI, plus local pass-and-play and Game Center multiplayer.",
    keyHighlights: [
      "103 engine tests verifying compliance with Klubo Internacia de Bao-Amantoj (KIBA) tournament standards.",
      "Authentic linguistic terms: nyumba, kichwa, mtaji, takasa, safari, ku goma, kunamua.",
      "Comprehensive accessibility support: color is never the only signal; individual toggles for haptics, audio, and motion."
    ]
  },
  {
    id: "tilemera",
    title: "Tilemera — MSE Stock Exchange Listing Diagnostic SaaS",
    tagline: "B2B compliance-readiness workflow tool helping Malawian SMEs prepare for listing on the Malawi Stock Exchange.",
    category: "FinTech & SaaS",
    featured: false,
    role: "Full-Stack Architect",
    period: "2025 – 2026",
    localPath: "/Users/mac/Tilemera",
    badges: ["Malawi Stock Exchange", "B2B SaaS", "Fastify & Prisma", "Turborepo"],
    impactMetrics: [
      { label: "Compliance Pillars", value: "10 Criteria", detail: "Financials, governance, board diversity" },
      { label: "Stack", value: "Turborepo", detail: "Fastify 4 + Prisma + React 18 + BullMQ" },
      { label: "Database", value: "PostgreSQL 15", detail: "Multi-tenant schema with Redis queue" },
      { label: "Type Safety", value: "100% Zod", detail: "End-to-end typed contracts across packages" }
    ],
    techStack: ["Node 20", "Fastify 4", "Prisma ORM", "PostgreSQL 15", "Redis 7", "BullMQ", "React 18", "Vite", "Tailwind CSS", "TanStack Query", "Turborepo", "Zod"],
    summary: "Tilemera is a specialized B2B compliance-readiness diagnostic platform that bridges Malawian growth enterprises and licensed stock exchange sponsors. It decomposes Malawi Stock Exchange (MSE) Main Board and Alternative Growth Market (AGM) listing prerequisites into guided operational workflows.",
    problemStatement: "Malawian enterprises frequently fail to attract capital or list on the local bourse due to fragmented corporate records, governance non-compliance, and lack of transparency, while licensed sponsors spend months performing manual diagnostic audits.",
    solutionArchitecture: "A high-performance monorepo utilizing Fastify and Prisma with BullMQ job queues for asynchronous document evaluation and PDF readiness audit generation. Built with a clear regulatory boundary as a non-custodial diagnostic tool.",
    offlineConsiderations: "Optimized for low-bandwidth corporate connections with responsive client-side caching via TanStack Query and progressive draft autosaving.",
    keyHighlights: [
      "Dynamic Readiness Scoring Engine calculating listing eligibility percentages across 10 statutory dimensions.",
      "Secure digital data room with strict advisor access controls and audit logging.",
      "Automated advisor matching connecting SMEs with licensed sponsoring brokers and legal counsel."
    ]
  },
  {
    id: "mwayi-grid",
    title: "Mwayi Grid (MG1) — Culturally Grounded Pari-Mutuel Platform",
    tagline: "Communal staking gamifying everyday Malawian realities: ESCOM load-shedding, crop rains, forex, and Chilimba circles.",
    category: "FinTech & SaaS",
    featured: false,
    role: "System Designer & Full-Stack Engineer",
    period: "2025 – 2026",
    localPath: "/Users/mac/MG1",
    badges: ["MAGLA Sandbox", "Pari-Mutuel Math", "Chilimba Circles", "Chichewa First"],
    impactMetrics: [
      { label: "Markets", value: "6 Authentic", detail: "Magetsi, Nyengo, Ndalama, Masewero, etc." },
      { label: "Circle Size", value: "Up to 8", detail: "Communal Chilimba group micro-staking" },
      { label: "Reputation", value: "Wisdom Ladder", detail: "Status earned by accuracy, never money" },
      { label: "Randomness", value: "Drand Beacon", detail: "Public cryptographically verifiable proof" }
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "WebSockets", "Pari-Mutuel Engine", "Drand Protocol", "Chart.js"],
    summary: "Mwayi Grid ('Lucky Grid' in Chichewa) is a culturally grounded prediction and communal staking platform operating in Malawi's pre-licensing regulatory sandbox. Rather than copying foreign sportsbooks, it turns daily Malawian talking points—ESCOM power blackouts, seasonal rainfall milestones, and grain commodity prices—into communal forecasting markets.",
    problemStatement: "Foreign betting applications drain capital from African communities through high-frequency algorithmic casino games that exploit users and offer zero community cohesion.",
    solutionArchitecture: "Implements transparent pari-mutuel mathematical pools where odds adjust dynamically based on volume rather than a predatory house edge. Features 'Chilimba Circles' allowing up to 8 friends to pool micro-stakes and split winnings proportionally down to the tambala.",
    offlineConsiderations: "Lightweight mobile web UI with compressed WebSocket feeds designed to function seamlessly on 2G/3G connections.",
    keyHighlights: [
      "Blackout Bingo: Interactive power grid map tracking ESCOM load-shedding and restoration windows across 8 districts.",
      "The Wisdom Ladder: Non-exploitative rank system (Wophunzira, Wodziwa, Nyanga, Fumu ya Mwayi) based purely on prediction accuracy.",
      "Terrace Mode: Real-time sentiment gauge during live SULOM Super League derbies (Bullets vs Wanderers)."
    ]
  },
  {
    id: "parking-ledger",
    title: "SpotMw (Parking Ledger) — Municipal Enforcement Ledger",
    tagline: "Offline-first mobile enforcement and audit ledger for urban Malawi municipal parking management.",
    category: "Systems & Infra",
    featured: false,
    role: "Mobile Architect & React Native Engineer",
    period: "2025 – 2026",
    localPath: "/Users/mac/parking-ledger",
    badges: ["Expo 57 / React Native", "Offline SQLite", "Camera Plate Scan", "Lilongwe & Blantyre"],
    impactMetrics: [
      { label: "Scan Time", value: "< 500ms", detail: "On-device license plate detection" },
      { label: "Offline Buffer", value: "10,000+", detail: "Tickets stored in local encrypted SQLite" },
      { label: "Hardware", value: "Budget Devices", detail: "Runs smoothly on Android 10+ handsets" },
      { label: "Audit Trail", value: "Cryptographic", detail: "Tamper-evident ticket sequential IDs" }
    ],
    techStack: ["Expo 57", "React Native", "TypeScript", "SQLite", "AsyncStorage", "Expo Camera", "Expo Haptics", "Vite"],
    summary: "SpotMw is an offline-first mobile enforcement and revenue ledger built for municipal parking marshals operating on the streets of Lilongwe and Blantyre. It eliminates cash leakage through instant vehicle plate logging, tariff calculation, and tamper-evident local audit journals.",
    problemStatement: "Municipal parking collection in African cities suffers from chronic revenue leakage and disputes due to manual paper tickets and spotty cellular network coverage preventing real-time verification.",
    solutionArchitecture: "Built on Expo 57 with local SQLite database engine. Attendants scan plates with the camera, calculate time-bracketed fees offline, issue digital/SMS receipts, and sync in batches when docked or within Wi-Fi hotspots.",
    offlineConsiderations: "100% offline operational capacity; marshals can complete full 12-hour shifts without cellular data.",
    keyHighlights: [
      "Camera-accelerated license plate recognition tuned for Southern African vehicle plates.",
      "Cryptographically chained receipt records preventing retroactive deletion or ledger manipulation.",
      "Shift reconciliation view verifying cash-on-hand against logged vehicles before shift signoff."
    ]
  },
  {
    id: "routerpass",
    title: "RouterPass — MikroTik RouterOS LAN Sidecar & Local RAG",
    tagline: "LAN sidecar credential manager and local RAG system for MikroTik RouterOS v7 with zero cloud leakage.",
    category: "Systems & Infra",
    featured: false,
    role: "Systems & Security Engineer",
    period: "2025 – 2026",
    localPath: "/Users/mac/routerpass",
    badges: ["MikroTik RouterOS v7", "Local Vector RAG", "Ollama LLM", "Zero Cloud Exposure"],
    impactMetrics: [
      { label: "API Target", value: "RouterOS v7", detail: "REST API over local LAN subnet" },
      { label: "LLM Support", value: "Llama 3 / Mistral", detail: "Private local inference via Ollama" },
      { label: "Latency", value: "Local Subnet", detail: "Direct HTTP Basic auth with no cloud broker" },
      { label: "Security", value: "Zero Egress", detail: "No network packets leave internal LAN" }
    ],
    techStack: ["Python 3.10+", "MikroTik REST API", "Ollama", "Llama 3", "Mistral", "Vector Embeddings", "ChromaDB"],
    summary: "RouterPass runs as a secure local-area-network sidecar adjacent to MikroTik RouterOS v7 hardware. It combines cryptographic credential management with a private Retrieval-Augmented Generation (RAG) assistant trained on RouterOS documentation to assist network administrators in diagnosing VLAN, firewall, and routing configs without cloud leaks.",
    problemStatement: "Managing enterprise edge network infrastructure often requires consulting AI tools, but sending proprietary network topology configs and router credentials to public cloud LLMs creates critical security risks.",
    solutionArchitecture: "A Python daemon connects directly to the local RouterOS REST API endpoint (192.168.88.1), indexes router states in a local vector database, and queries a local Ollama model instance for natural language troubleshooting.",
    offlineConsiderations: "Operates completely within the local network air-gap; neither credentials nor diagnostic telemetry ever touch the public internet.",
    keyHighlights: [
      "Direct REST integration with RouterOS v7 for automated credential rotation and configuration audits.",
      "On-premise vector RAG querying router documentation and live interface statistics simultaneously.",
      "Support for multiple local open-weights models: Llama 3, Mistral 7B, and Phi-3."
    ]
  },
  {
    id: "zisamale",
    title: "Zisamale — Clinical Intelligence Platform & Edge Sync",
    tagline: "Edge-to-cloud clinical data platform and offline synchronization supporting 450 Health Surveillance Assistants.",
    category: "Cloud & Data Centre",
    featured: false,
    role: "Systems Architect & Backend Lead",
    period: "2024 – Present",
    localPath: "/Users/mac/Zisamale",
    badges: ["Offline SQLite WAL", "FastAPI Cloud Gateway", "Docker / Helm", "Health Data Sovereignty"],
    impactMetrics: [
      { label: "Field Attendants", value: "450 CHWs", detail: "Synchronizing offline mobile ledgers" },
      { label: "Facilities", value: "45 Clinics", detail: "Connected across 3 District Health Offices" },
      { label: "Data Pipeline", value: "Idempotent", detail: "Vector clock sync conflict resolution" },
      { label: "Uptime", value: "99.8%", detail: "Resilient under severe grid load-shedding" }
    ],
    techStack: ["FastAPI", "Python 3.11", "PostgreSQL", "RabbitMQ", "Redis", "Android / Kotlin", "Docker", "Helm", "React"],
    summary: "Zisamale ('Take care of yourself') is an edge-to-cloud clinical data platform built for rural Malawi healthcare networks. Designed to operate through continuous power blackouts and network outages, it connects 450 community health workers with district health offices through idempotent vector-clock synchronization.",
    problemStatement: "Remote clinics operate with zero cellular connectivity for days at a time. Cloud-only electronic medical record systems fail instantly when power or GSM towers go dark.",
    solutionArchitecture: "Offline-first architecture pairing an Android client running local SQLite WAL transactions with an asynchronous FastAPI and RabbitMQ backend. Deltas are validated, signed, and ingested whenever a device enters range.",
    offlineConsiderations: "Full clinic workflows execute with zero internet access, committing securely to device encrypted flash memory.",
    keyHighlights: [
      "Idempotent synchronization protocol guaranteeing zero duplicate vaccination entries across intermittent links.",
      "Containerized microservices topology running in local Docker and production Helm deployments.",
      "Strict data sovereignty keeping sensitive community patient records localized."
    ]
  },
  {
    id: "mboni",
    title: "Mboni — District Health Record Witness & Reconciler",
    tagline: "District-level under-five clinic continuity system bridging physical printed stickers and digital reconciliation.",
    category: "Cloud & Data Centre",
    featured: false,
    role: "Systems Architect & Developer",
    period: "2025 – 2026",
    localPath: "/Users/mac/mboni",
    badges: ["Manual-First Verification", "Paper-Witness Architecture", "SQLite WAL", "District Continuity"],
    impactMetrics: [
      { label: "Design Principle", value: "Paper Witness", detail: "Witnesses paper; does not replace it" },
      { label: "Data Integrity", value: "100% Audit", detail: "Every record tied to photographed sticker" },
      { label: "Offline Auth", value: "Salted PIN", detail: "Local cryptographic gate for clinic clerks" },
      { label: "Ledger", value: "SQLite WAL", detail: "Crash-safe concurrent write transactions" }
    ],
    techStack: ["Node.js", "Express", "SQLite", "Constrained OCR Pipeline", "Crypto", "CLI Tools", "HTML5"],
    summary: "Mboni ('Witness' in Chichewa) is an under-five clinical record reconciliation system engineered specifically for rural Malawian health outposts. Instead of attempting a fragile full paperless transition, Mboni creates a hybrid machine-friendly sticker protocol that pairs the health surveillance assistant's logbook with the mother's health passport.",
    problemStatement: "Rural clinics in Malawi lose vital child vaccination continuity when paper health passports tear, wash away in rain, or disagree with clinic logbooks. Premature attempts to deploy fragile cloud tablets often fail due to dust, theft, and power blackouts.",
    solutionArchitecture: "A pragmatic 'manual-first' hybrid: pre-printed boxed stickers allow HSAs to record one numeral per box. Mobile phone photos of pages are ingested into a local SQLite ledger, where an offline clerk review queue validates values against image crops before committing to child longitudinal reports.",
    offlineConsiderations: "Runs completely standalone on a single low-power district office laptop with local salted PIN security, zero cloud dependency, and automated USB flash drive replication.",
    keyHighlights: [
      "Pragmatic human-centered design: treats paper as the primary legal document and software as the corroborating witness.",
      "Constrained character bounding removes OCR ambiguity for birth dates, weights, and village codes.",
      "Immediate overdue vaccination reports generated locally without internet access."
    ]
  }
];

export const PHOTOGRAPHY_GALLERY: PhotoAsset[] = [
  {
    id: "p1",
    title: "Field Documentation: Southern Malawi Horizon",
    location: "Southern Region, Malawi",
    category: "Documentary",
    url: "/assets/photos/photo_1.jpg",
    description: "Capturing the texture of daily rural livelihoods and ambient landscapes during field deployment of edge recording devices.",
    cameraInfo: "Nikon D-series • 50mm Prime"
  },
  {
    id: "p2",
    title: "Community & Light: The Human Dimension",
    location: "Zomba Plateau Foothills, Malawi",
    category: "Portraits",
    url: "/assets/photos/photo_2.jpg",
    description: "Centering the people and communities who form the heart of field technology deployments and civic infrastructure.",
    cameraInfo: "Nikon D-series • Natural Light"
  },
  {
    id: "p3",
    title: "Rural Infrastructure & Settlement Geographies",
    location: "Lilongwe Rural Outposts",
    category: "Infrastructure",
    url: "/assets/photos/photo_3.jpg",
    description: "Documenting the physical environments where solar micro-grids and offline-first mobile systems operate daily.",
    cameraInfo: "Nikon D-series • Wide-Angle"
  },
  {
    id: "p4",
    title: "Texture of Everyday Life",
    location: "Lake Malawi Shoreline",
    category: "Landscape",
    url: "/assets/photos/photo_4.jpg",
    description: "Visual documentation of water networks, trade passages, and informal market gathering spots.",
    cameraInfo: "Nikon D-series"
  },
  {
    id: "p_aerial",
    title: "Aerial Topography & Land Use Patterns",
    location: "Central Plains, Malawi",
    category: "Aerial",
    url: "/assets/photos/photo_aerial.jpg",
    description: "Drone survey mapping agricultural field boundaries and seasonal drainage corridors for the EdgeVision platform.",
    cameraInfo: "DJI Mavic Aerial Platform"
  }
];

export const SKILL_CATEGORIES = [
  {
    title: "Data Centre & Cloud Architecture",
    skills: [
      "Enterprise Data Centre Operations", "AWS Well-Architected / VPC", "Hybrid Cloud Modeling", 
      "SAN/NAS Storage Arrays", "Firewall & IDS/IPS Perimeter", "Disaster Recovery (RPO/RTO)", 
      "Docker & Kubernetes", "Multi-Tenancy Isolation", "FastAPI & Async SQLAlchemy"
    ]
  },
  {
    title: "Edge Systems & On-Device AI",
    skills: [
      "Offline-First Distributed Sync", "MediaPipe Tasks Vision (553 pts)", "Apple Vision Framework", 
      "Solar Edge Nodes (Linux)", "PyTorch & CLIP Deduplication", "Local RAG (Ollama / Chroma)", 
      "SQLite WAL Crash-Safe Ledgers", "Three.js / WebGL Kinematics"
    ]
  },
  {
    title: "Full-Stack & Mobile Engineering",
    skills: [
      "TypeScript & React 19", "Swift 5.10 / SwiftUI", "Android / Kotlin / Compose", 
      "Expo 57 / React Native", "Node.js & Fastify / Express", "Prisma ORM & PostgreSQL", 
      "Tailwind CSS", "BullMQ & Redis"
    ]
  },
  {
    title: "Executive Leadership & FinTech",
    skills: [
      "MWK 200M+ Revenue Leadership", "Multi-Tenant Mobile Money Reconciliation", 
      "Donor-Funded Procurement (World Bank / UN)", "Contract Negotiation & Compliance", 
      "SLA & Disaster Recovery Runbooks", "Security Audit Remediation (84 Fixes)"
    ]
  },
  {
    title: "Industrial & OT Infrastructure",
    skills: [
      "SCADA Industrial Networks", "PLC Dependency Mapping", "Converged IT/OT Systems", 
      "Real-Time Telemetry Streaming", "MikroTik RouterOS v7", "Broadcast Production & Direction"
    ]
  }
];
