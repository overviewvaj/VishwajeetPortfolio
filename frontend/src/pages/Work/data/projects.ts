export type ProjectCategory =
    | "flagship"
    | "engineering"
    | "research"
    | "analytics";

export type ProjectExperience =
    | "production"
    | "professional"
    | "research"
    | "independent";

export interface ProjectMetric {
    value: string;
    label: string;
}

export interface ProjectVisual {
    nodeSize: number;
    accent: string;
    glow: number;
    orbitCount: number;
    particleCount: number;
}

export interface Project {
    id: string;
    slug: string;

    title: string;
    shortTitle: string;

    category: ProjectCategory;
    experience: ProjectExperience;

    description: string;
    shortDescription: string;

    featured: boolean;
    order: number;

    route: string;

    technologies: string[];

    metrics: ProjectMetric[];

    visual: ProjectVisual;

    sections: {
        context: boolean;
        system: boolean;
        architecture: boolean;
        engineering: boolean;
        governance: boolean;
        impact: boolean;
        demo: boolean;
    };
}

/**
 * ---------------------------------------------------------------------------
 * PROJECT REGISTRY
 * ---------------------------------------------------------------------------
 *
 * This file is the single source of truth for the WORK section.
 *
 * Adding a new project should normally require only:
 *
 * 1. Adding a new Project object here.
 * 2. Creating the corresponding project detail page.
 *
 * The WORK scene, project navigation, cards and future project explorer
 * consume this registry instead of hard-coding project metadata.
 *
 * Do not place confidential employer data in this registry.
 * Metrics and descriptions are intentionally limited to portfolio-safe,
 * publicly presentable information.
 *
 * ---------------------------------------------------------------------------
 */

export const projects: Project[] = [
    // =========================================================================
    // FLAGSHIP SYSTEMS
    // =========================================================================

    {
        id: "rag-ai-assistant",
        slug: "rag-ai-assistant",

        title: "RAG AI Assistant",
        shortTitle: "RAG AI",

        category: "flagship",
        experience: "production",

        description:
            "A production RAG-based AI assistant engineered for a financial stress-testing platform, combining enterprise knowledge retrieval, vector search, controlled generation and role-based access governance.",

        shortDescription:
            "Production RAG system combining enterprise retrieval, vector search, LLM reasoning and AI governance.",

        featured: true,
        order: 1,

        route: "/work/rag-ai-assistant",

        technologies: [
            "Python",
            "LangChain",
            "RAG",
            "Vector Databases",
            "LLM",
            "RBAC",
            "AI Governance",
            "Data Pipelines",
        ],

        metrics: [
            {
                value: "£1M+",
                label: "Annual Licence Revenue",
            },
            {
                value: "13+",
                label: "UK Banks",
            },
            {
                value: "PROD",
                label: "Production System",
            },
        ],

        visual: {
            nodeSize: 1.35,
            accent: "#7dd3fc",
            glow: 1.2,
            orbitCount: 3,
            particleCount: 900,
        },

        sections: {
            context: true,
            system: true,
            architecture: true,
            engineering: true,
            governance: true,
            impact: true,
            demo: true,
        },
    },

    {
        id: "monte-carlo-risk-engine",
        slug: "monte-carlo-risk-engine",

        title: "Monte Carlo Operational Risk Engine",
        shortTitle: "Monte Carlo Risk",

        category: "flagship",
        experience: "production",

        description:
            "A Monte Carlo operational risk simulation engine designed to evaluate thousands of severe-but-plausible scenarios across a regulated banking risk framework.",

        shortDescription:
            "Large-scale operational risk simulation using thousands of severe-but-plausible scenarios.",

        featured: true,
        order: 2,

        route: "/work/monte-carlo-risk-engine",

        technologies: [
            "Python",
            "Monte Carlo Simulation",
            "Risk Modelling",
            "Statistical Modelling",
            "Scenario Analysis",
            "Data Engineering",
            "PRA Governance",
        ],

        metrics: [
            {
                value: "£9.95M",
                label: "Group Risk Framework",
            },
            {
                value: "£9.81M",
                label: "UK Risk Framework",
            },
            {
                value: "1000s",
                label: "Scenarios Simulated",
            },
            {
                value: "PRA",
                label: "Regulatory Scrutiny",
            },
        ],

        visual: {
            nodeSize: 1.25,
            accent: "#c4b5fd",
            glow: 1.15,
            orbitCount: 4,
            particleCount: 750,
        },

        sections: {
            context: true,
            system: true,
            architecture: true,
            engineering: true,
            governance: true,
            impact: true,
            demo: true,
        },
    },

    // =========================================================================
    // ENGINEERING SYSTEMS
    // =========================================================================

    {
        id: "regulatory-reporting",
        slug: "regulatory-reporting",

        title: "Regulatory Reporting Automation",
        shortTitle: "Reg Reporting",

        category: "engineering",
        experience: "professional",

        description:
            "An automated regulatory reporting and reconciliation framework replacing spreadsheet-heavy processes with SQL and Python-driven data pipelines, validation and controlled reporting workflows.",

        shortDescription:
            "SQL and Python automation replacing manual regulatory reporting and reconciliation workflows.",

        featured: true,
        order: 3,

        route: "/work/regulatory-reporting",

        technologies: [
            "Python",
            "SQL",
            "Data Pipelines",
            "Reconciliation",
            "LCR",
            "NSFR",
            "PRA110",
            "COREP",
            "ALMM",
        ],

        metrics: [
            {
                value: "95%",
                label: "Manual Effort Reduced",
            },
            {
                value: "1,600+",
                label: "Hours Saved / Year",
            },
            {
                value: "£100k+",
                label: "Annual Value Recovered",
            },
            {
                value: "25+",
                label: "Regulatory Initiatives",
            },
            {
                value: "0",
                label: "Reporting Breaches",
            },
        ],

        visual: {
            nodeSize: 1.05,
            accent: "#67e8f9",
            glow: 1,
            orbitCount: 3,
            particleCount: 600,
        },

        sections: {
            context: true,
            system: true,
            architecture: true,
            engineering: true,
            governance: true,
            impact: true,
            demo: true,
        },
    },

    {
        id: "gold-layer",
        slug: "gold-layer",

        title: "Medallion Architecture & Gold Layer",
        shortTitle: "Gold Layer",

        category: "engineering",
        experience: "professional",

        description:
            "A modern financial data architecture using Medallion principles to transform governed source data into reusable, analytics-ready Gold Layer datasets for reporting, risk and enterprise AI.",

        shortDescription:
            "Governed Bronze-to-Silver-to-Gold data architecture for reporting, risk and AI.",

        featured: true,
        order: 4,

        route: "/work/gold-layer",

        technologies: [
            "Python",
            "PySpark",
            "SQL",
            "Microsoft Fabric",
            "Medallion Architecture",
            "Data Modelling",
            "Data Governance",
            "Lineage",
        ],

        metrics: [
            {
                value: "30%",
                label: "Processing Time Reduced",
            },
            {
                value: "GOLD",
                label: "Analytics-Ready Layer",
            },
            {
                value: "AI",
                label: "Enterprise AI Foundation",
            },
        ],

        visual: {
            nodeSize: 1.1,
            accent: "#86efac",
            glow: 1,
            orbitCount: 3,
            particleCount: 650,
        },

        sections: {
            context: true,
            system: true,
            architecture: true,
            engineering: true,
            governance: true,
            impact: true,
            demo: true,
        },
    },

    {
        id: "data-quality-reconciliation",
        slug: "data-quality-reconciliation",

        title: "Data Quality & Reconciliation Framework",
        shortTitle: "DQ + Reconciliation",

        category: "engineering",
        experience: "professional",

        description:
            "A reusable data-quality and reconciliation framework designed to detect exceptions, validate regulatory data and create audit-ready evidence across financial reporting workflows.",

        shortDescription:
            "Automated validation, reconciliation and exception management for regulated data.",

        featured: false,
        order: 5,

        route: "/work/data-quality-reconciliation",

        technologies: [
            "Python",
            "SQL",
            "Data Quality",
            "Reconciliation",
            "Validation",
            "Exception Management",
            "Audit Evidence",
            "Regulatory Reporting",
        ],

        metrics: [
            {
                value: "100%",
                label: "Control Alignment",
            },
            {
                value: "15%",
                label: "Validation Reliability Improvement",
            },
            {
                value: "AUDIT",
                label: "Evidence Ready",
            },
        ],

        visual: {
            nodeSize: 0.95,
            accent: "#fcd34d",
            glow: 0.95,
            orbitCount: 2,
            particleCount: 500,
        },

        sections: {
            context: true,
            system: true,
            architecture: true,
            engineering: true,
            governance: true,
            impact: true,
            demo: true,
        },
    },

    // =========================================================================
    // RESEARCH / INDEPENDENT SYSTEMS
    // =========================================================================

    {
        id: "schema-translator",
        slug: "schema-translator",

        title: "Auto-Reconciling Regulatory Schema Translator",
        shortTitle: "Schema Translator",

        category: "research",
        experience: "independent",

        description:
            "A research system exploring automated mapping between evolving regulatory reporting schemas using semantic matching, reconciliation logic, constraint validation and explainable mapping decisions.",

        shortDescription:
            "Intelligent translation and reconciliation across evolving regulatory schemas.",

        featured: true,
        order: 6,

        route: "/work/schema-translator",

        technologies: [
            "Python",
            "Machine Learning",
            "Semantic Matching",
            "Schema Mapping",
            "Constraint Logic",
            "Data Reconciliation",
            "Regulatory Technology",
            "Explainable AI",
        ],

        metrics: [
            {
                value: "AUTO",
                label: "Schema Mapping",
            },
            {
                value: "RULES",
                label: "Constraint Validation",
            },
            {
                value: "R&D",
                label: "Research System",
            },
        ],

        visual: {
            nodeSize: 1.15,
            accent: "#f9a8d4",
            glow: 1.1,
            orbitCount: 4,
            particleCount: 700,
        },

        sections: {
            context: true,
            system: true,
            architecture: true,
            engineering: true,
            governance: true,
            impact: true,
            demo: true,
        },
    },

    {
        id: "privacycomply",
        slug: "privacycomply",

        title: "PrivacyComply",
        shortTitle: "PrivacyComply",

        category: "research",
        experience: "independent",

        description:
            "A configurable privacy and data-protection compliance control plane designed around source-side processing, tenant isolation, compliance workflows, evidence management and privacy-by-design principles.",

        shortDescription:
            "Privacy compliance control plane designed around source-side processing and privacy-by-design.",

        featured: true,
        order: 7,

        route: "/work/privacycomply",

        technologies: [
            "C#",
            ".NET",
            "ASP.NET Core",
            "React",
            "TypeScript",
            "Python",
            "FastAPI",
            "SQL Server",
            "Redis",
            "Docker",
            "DPDP",
        ],

        metrics: [
            {
                value: "DPDP",
                label: "India-First Compliance",
            },
            {
                value: "MULTI",
                label: "Tenant Architecture",
            },
            {
                value: "EDGE",
                label: "Source-Side Processing",
            },
        ],

        visual: {
            nodeSize: 1.05,
            accent: "#a5b4fc",
            glow: 1.05,
            orbitCount: 3,
            particleCount: 600,
        },

        sections: {
            context: true,
            system: true,
            architecture: true,
            engineering: true,
            governance: true,
            impact: true,
            demo: true,
        },
    },

    // =========================================================================
    // ANALYTICS / OTHER SYSTEMS
    // =========================================================================

    {
        id: "ml-analytics",
        slug: "ml-analytics",

        title: "Machine Learning & Analytics Systems",
        shortTitle: "ML + Analytics",

        category: "analytics",
        experience: "independent",

        description:
            "A collection of applied machine learning, predictive analytics and decision-support systems spanning financial prediction, sports analytics, computer vision and interactive BI.",

        shortDescription:
            "Applied ML, predictive analytics, computer vision and interactive decision-support systems.",

        featured: false,
        order: 8,

        route: "/work/ml-analytics",

        technologies: [
            "Python",
            "Pandas",
            "NumPy",
            "scikit-learn",
            "YOLO",
            "Machine Learning",
            "Power BI",
            "DAX",
            "Streamlit",
            "Tableau",
        ],

        metrics: [
            {
                value: "ML",
                label: "Predictive Systems",
            },
            {
                value: "CV",
                label: "Computer Vision",
            },
            {
                value: "BI",
                label: "Decision Support",
            },
        ],

        visual: {
            nodeSize: 0.9,
            accent: "#fdba74",
            glow: 0.9,
            orbitCount: 2,
            particleCount: 450,
        },

        sections: {
            context: true,
            system: true,
            architecture: true,
            engineering: true,
            governance: false,
            impact: true,
            demo: true,
        },
    },
];

/**
 * ---------------------------------------------------------------------------
 * REGISTRY HELPERS
 * ---------------------------------------------------------------------------
 */

export const flagshipProjects = projects
    .filter((project) => project.category === "flagship")
    .sort((a, b) => a.order - b.order);

export const engineeringProjects = projects
    .filter((project) => project.category === "engineering")
    .sort((a, b) => a.order - b.order);

export const researchProjects = projects
    .filter(
        (project) =>
            project.category === "research" || project.category === "analytics",
    )
    .sort((a, b) => a.order - b.order);

export const featuredProjects = projects
    .filter((project) => project.featured)
    .sort((a, b) => a.order - b.order);

export const getProjectBySlug = (slug: string): Project | undefined =>
    projects.find((project) => project.slug === slug);

export const getProjectById = (id: string): Project | undefined =>
    projects.find((project) => project.id === id);

export const getProjectsByCategory = (
    category: ProjectCategory,
): Project[] =>
    projects
        .filter((project) => project.category === category)
        .sort((a, b) => a.order - b.order);