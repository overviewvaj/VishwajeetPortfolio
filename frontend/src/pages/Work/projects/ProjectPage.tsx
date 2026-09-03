import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import ScrollFrameLayout from "../../../components/layout/ScrollFrameLayout";
import type { Project } from "../data/projects";
import { projects } from "../data/projects";

import "./ProjectPage.css";

interface ProjectPageProps {
    project: Project;
}

interface ProjectContentDetails {
    context: {
        title: string;
        text: string;
        points: string[];
    };
    system: {
        title: string;
        text: string;
        points: string[];
    };
    architecture: {
        title: string;
        text: string;
        nodes: Array<{ title: string; desc: string }>;
    };
    engineering: {
        title: string;
        text: string;
        points: string[];
    };
    governance: {
        title: string;
        text: string;
        points: string[];
    };
    impact: {
        title: string;
        text: string;
    };
    demo: {
        title: string;
        note: string;
    };
}

const projectContentMap: Record<string, ProjectContentDetails> = {
    "rag-ai-assistant": {
        context: {
            title: "The problem behind the system",
            text: "Within a financial stress-testing platform, regulatory analysts frequently spent hours cross-referencing hundreds of pages of evolving supervisory statements, PRA policy documents, and internal credit risk guidelines. Finding precise, authoritative clauses under tight supervisory deadlines created an operational bottleneck.",
            points: [
                "Regulatory teams needed authoritative, verifiable answers with exact citations.",
                "Zero tolerance for generative hallucinations in a strictly audited financial framework.",
                "Strict tenant and role-based access rules required confidential documents to remain shielded.",
            ],
        },
        system: {
            title: "What was actually built",
            text: "A production enterprise RAG assistant integrating dense vector indexing, contextual document chunking, hybrid retrieval, and controlled LLM reasoning. The system delivers verified, cited answers directly to credit and regulatory analysts while enforcing strict RBAC security.",
            points: [
                "Automated ingestion pipeline parsing PDF, Word, and Excel regulatory documents.",
                "Dense vector embeddings combined with keyword search for high-precision hybrid retrieval.",
                "Citation grounding mechanism highlighting exact source clauses and page numbers.",
            ],
        },
        architecture: {
            title: "From raw guidelines to decision intelligence",
            text: "The data pipeline ingests multi-format policy documents, splits them contextually into indexed vectors, evaluates semantic relevance at runtime, and feeds verified context through a guarded LLM reasoning loop.",
            nodes: [
                { title: "Ingest & Chunk", desc: "Context-aware document parsing" },
                { title: "Vector Index", desc: "Dense embedding retrieval" },
                { title: "Rerank & Ground", desc: "Semantic relevance & citation" },
                { title: "Guarded Inference", desc: "RBAC-filtered LLM response" },
            ],
        },
        engineering: {
            title: "The engineering decisions",
            text: "Engineered with Python, LangChain, and high-performance vector databases. High-throughput async pipelines process document revisions, while low-latency semantic caching ensures sub-second responses for recurring regulatory queries.",
            points: [
                "Prompt defense guardrails preventing prompt injection and data exfiltration.",
                "Async task workers managing real-time document indexing without API blocking.",
                "Redis-backed semantic cache delivering <100ms response times for frequent queries.",
            ],
        },
        governance: {
            title: "Engineering under regulatory control",
            text: "Designed specifically for regulated environments under PRA scrutiny. Every generated response includes explicit source attribution, line-level evidence references, and an immutable audit log of all model interactions.",
            points: [
                "100% line-level citation tracing for audit compliance.",
                "Role-based document access controls preventing cross-tier data leakage.",
                "Automated hallucination detection and confidence scoring.",
            ],
        },
        impact: {
            title: "Quantified business value & production outcomes",
            text: "Successfully deployed into production for a major financial stress-testing platform, securing over £1M in annual licence revenue and actively serving more than 13 top-tier UK banks.",
        },
        demo: {
            title: "Interactive System Sandbox",
            note: "A sanitized, representative interactive demonstration is hosted here. All confidential banking datasets and proprietary credit models have been replaced with public PRA regulatory taxonomy samples.",
        },
    },

    "monte-carlo-risk-engine": {
        context: {
            title: "The problem behind the system",
            text: "Regulated UK banking entities are required by the Prudential Regulation Authority (PRA) to model severe-but-plausible operational risk disruptions. Traditional deterministic models were inadequate to capture non-linear, compound disruption scenarios across multi-billion-pound balance sheets.",
            points: [
                "PRA supervisory expectations required rigorous tail-risk evaluation.",
                "Need to simulate compound disruptions (e.g. IT failures combined with liquidity shocks).",
                "Results had to withstand strict supervisory scrutiny and independent model validation.",
            ],
        },
        system: {
            title: "What was actually built",
            text: "A high-throughput Monte Carlo operational risk simulation engine capable of generating thousands of correlated stress scenarios. The system evaluates loss severity, frequency distributions, and capital adequacy requirements across banking frameworks.",
            points: [
                "Parameterized statistical distributions (log-normal, Poisson, EVT) for operational loss events.",
                "High-performance Monte Carlo sampling evaluating tens of thousands of scenario paths.",
                "Automated risk capital allocation and Value-at-Risk (VaR) calculation.",
            ],
        },
        architecture: {
            title: "From risk parameters to capital allocation",
            text: "The engine consumes historical event telemetry and expert-calibrated scenario parameters, executes randomized distribution sampling, and produces quantified risk profiles for regulatory filings.",
            nodes: [
                { title: "Loss Distributions", desc: "Parameter fitting & calibration" },
                { title: "Monte Carlo Engine", desc: "Thousands of random iterations" },
                { title: "Capital Engine", desc: "VaR & Expected Shortfall" },
                { title: "PRA Reporting", desc: "Regulatory audit package" },
            ],
        },
        engineering: {
            title: "The engineering decisions",
            text: "Built using vectorized Python and NumPy operations to achieve rapid simulation execution. Implemented deterministic pseudorandom seed management to guarantee exact audit repeatability for regulatory reviewers.",
            points: [
                "Vectorized matrix calculations running 10,000+ simulation paths in seconds.",
                "Deterministic seed control ensuring 100% repeatable audit runs.",
                "Automated convergence diagnostic checks verifying statistical stability.",
            ],
        },
        governance: {
            title: "Model risk governance & supervisory scrutiny",
            text: "Compliant with PRA supervisory statements on model risk management. Features independent validation test suites, automated stress testing, and comprehensive version-controlled model documentation.",
            points: [
                "Strict PRA model risk governance alignment.",
                "Complete sensitivity analysis across tail-distribution assumptions.",
                "Immutable run-history storage for supervisory review packages.",
            ],
        },
        impact: {
            title: "Framework coverage & regulatory confidence",
            text: "Successfully modeled the £9.95M Group Risk Framework and £9.81M UK Risk Framework across thousands of severe-but-plausible operational scenarios, passing PRA supervisory scrutiny with zero model exceptions.",
        },
        demo: {
            title: "Monte Carlo Simulation Sandbox",
            note: "Interactive operational risk simulation demonstrator with adjustable loss frequency and severity parameters running client-side statistical models.",
        },
    },

    "regulatory-reporting": {
        context: {
            title: "The problem behind the system",
            text: "Financial reporting teams relied heavily on manual spreadsheet consolidations to submit COREP, PRA110, LCR, NSFR, and ALMM returns. Manual cut-and-paste processes consumed thousands of hours annually and introduced severe operational risk of reporting errors or regulatory fines.",
            points: [
                "Over 1,600 hours per year spent on manual data consolidation.",
                "Elevated risk of reconciliation discrepancies and late submission fines.",
                "Lack of centralized lineage between general ledger extracts and regulatory cells.",
            ],
        },
        system: {
            title: "What was actually built",
            text: "An automated regulatory reporting and reconciliation framework. Replacing spreadsheets with Python and SQL data pipelines, the platform ingests core banking ledger extracts, applies automated transformation rules, executes cross-return reconciliations, and outputs validated returns.",
            points: [
                "Automated SQL ETL pipelines transforming raw GL data into regulatory schema formats.",
                "Automated reconciliation engine highlighting multi-way discrepancies before sign-off.",
                "Audit-ready return generation adhering strictly to EBA and PRA XBRL/XML taxonomies.",
            ],
        },
        architecture: {
            title: "From core banking data to statutory submission",
            text: "The framework extracts ledger and treasury data, cleanses and normalizes schemas, executes automated reconciliation checks, and generates validated submission packs with full audit trails.",
            nodes: [
                { title: "Core GL Ingestion", desc: "Automated daily source pulls" },
                { title: "Rule Engine", desc: "SQL & Python transformations" },
                { title: "Reconciliation", desc: "Cross-return validation assertions" },
                { title: "Submission Pack", desc: "Validated XBRL / XML returns" },
            ],
        },
        engineering: {
            title: "The engineering decisions",
            text: "Leveraged modular Python scripts and optimized SQL stored procedures with automated exception alerting. Built automated schema validation rules to catch upstream discrepancies before return submission.",
            points: [
                "Automated variance detection identifying balance anomalies exceeding threshold tolerances.",
                "Containerized ETL jobs scheduled with robust failure recovery and notification hooks.",
                "Structured schema validation enforcing statutory return taxonomies.",
            ],
        },
        governance: {
            title: "Zero breach regulatory discipline",
            text: "Maintained an unblemished record of zero regulatory reporting breaches across 25+ major initiatives, backed by end-to-end sign-off governance and complete data lineage.",
            points: [
                "0 reporting breaches across multi-year production deployments.",
                "Segregation of duties with digital sign-off gates.",
                "Full line-item audit trail from statutory cell back to source GL entry.",
            ],
        },
        impact: {
            title: "Dramatic efficiency gains & cost recovery",
            text: "Achieved a 95% reduction in manual effort, saving over 1,600 hours annually, recovering £100k+ in operational value per year, and ensuring 100% on-time submission across 25+ regulatory initiatives.",
        },
        demo: {
            title: "Regulatory Reconciliation Sandbox",
            note: "A simulated reconciliation pipeline demonstrating automated variance detection and audit pack generation using synthetic banking ledger extracts.",
        },
    },

    "gold-layer": {
        context: {
            title: "The problem behind the system",
            text: "Enterprise financial data was scattered across transactional silos, legacy databases, and disparate operational systems. Reporting teams, risk analysts, and machine learning models had no single, governed source of truth.",
            points: [
                "Fragmented data silos leading to divergent calculation methodologies.",
                "Excessive ad-hoc ETL queries degrading core transactional database performance.",
                "No standardized data governance or column-level access controls.",
            ],
        },
        system: {
            title: "What was actually built",
            text: "A unified Medallion Architecture on modern lakehouse infrastructure, processing raw Bronze extracts through curated Silver operational stores into an analytics-ready Gold Layer optimized for reporting and enterprise AI.",
            points: [
                "Bronze Layer: Raw immutable ingestion preserving complete historical fidelity.",
                "Silver Layer: Cleaned, deduplicated, and validated relational models.",
                "Gold Layer: Dimensional star-schema models designed for rapid query execution and AI pipelines.",
            ],
        },
        architecture: {
            title: "Bronze to Silver to Gold transformation flow",
            text: "The data pipeline ingests raw banking telemetry, standardizes schemas, enforces data quality assertions, and aggregates dimensional models for high-performance consumption.",
            nodes: [
                { title: "Bronze (Raw)", desc: "Immutable append-only extracts" },
                { title: "Silver (Cleansed)", desc: "Deduplicated & validated data" },
                { title: "Gold (Aggregated)", desc: "Dimensional star schemas" },
                { title: "AI & Analytics", desc: "Direct BI & ML model access" },
            ],
        },
        engineering: {
            title: "The engineering decisions",
            text: "Built using PySpark, SQL, and Microsoft Fabric Delta Lake tables. Implemented ACID transactions, schema enforcement, and partitioning strategies that drastically accelerated large-scale queries.",
            points: [
                "30% reduction in query processing times across enterprise analytics.",
                "Delta Lake ACID transactions preventing partial writes and dirty reads.",
                "Automated data quality checks at each layer transition.",
            ],
        },
        governance: {
            title: "Data lineage & enterprise access governance",
            text: "Comprehensive data lineage tracking from source table to Gold Layer dimension, integrated with granular column-level security and centralized metadata cataloging.",
            points: [
                "Automated lineage tracing for regulatory audit packages.",
                "Granular role-based access control safeguarding sensitive customer data.",
                "Centralized data dictionary with standardized business definitions.",
            ],
        },
        impact: {
            title: "Accelerated analytics & unified AI foundation",
            text: "Reduced data processing times by 30% while establishing the enterprise-wide foundation for regulatory reporting, executive BI dashboards, and production machine learning models.",
        },
        demo: {
            title: "Medallion Pipeline Demonstration",
            note: "Interactive architecture diagram and schema lineage explorer illustrating Bronze-to-Silver-to-Gold data transformations.",
        },
    },

    "data-quality-reconciliation": {
        context: {
            title: "The problem behind the system",
            text: "Data passing through multiple banking sub-ledgers and reporting pipelines frequently developed subtle inconsistencies that only surfaced late in audit cycles, jeopardizing regulatory compliance and balance integrity.",
            points: [
                "Discrepancies discovered late during internal and external audit reviews.",
                "Lack of automated control checks validating inter-system data parity.",
                "High operational burden investigating manual reconciliation breaks.",
            ],
        },
        system: {
            title: "What was actually built",
            text: "A reusable data-quality and reconciliation framework that continuously tests financial data streams against automated completeness, accuracy, and timeliness rules, automatically generating audit packs.",
            points: [
                "Automated balance matching across ledger and secondary system extracts.",
                "Rule-based data quality scorecards grading incoming datasets in real time.",
                "Automated exception management logging break causes and routing alerts.",
            ],
        },
        architecture: {
            title: "Assertion, reconciliation, and audit verification flow",
            text: "The framework extracts source and target datasets, executes cryptographic checksums and balance assertions, and alerts engineers to any threshold breaches.",
            nodes: [
                { title: "Source Extraction", desc: "Dual system data capture" },
                { title: "Assertion Engine", desc: "Rule-based quality tests" },
                { title: "Reconciliation", desc: "Automated break detection" },
                { title: "Audit Evidence", desc: "Digitally stamped audit packs" },
            ],
        },
        engineering: {
            title: "The engineering decisions",
            text: "Constructed with Python and SQL for high-volume record comparison. Employs vectorized diff algorithms to match millions of financial ledger rows in seconds.",
            points: [
                "Vectorized reconciliation engine matching millions of records in seconds.",
                "Configurable threshold rules preventing false-positive noise.",
                "Automated exception clustering grouping related ledger discrepancies.",
            ],
        },
        governance: {
            title: "100% control alignment & audit readiness",
            text: "Achieved 100% control alignment across operational risk policies, providing complete audit evidence and real-time compliance alerting.",
            points: [
                "100% control alignment across regulated financial returns.",
                "Audit-ready verification packs generated automatically for external auditors.",
                "Immediate anomaly notification preventing reporting deadline breaches.",
            ],
        },
        impact: {
            title: "Enhanced validation reliability",
            text: "Improved validation reliability by 15% and eliminated unexpected reconciliation breaks during statutory reporting submission cycles.",
        },
        demo: {
            title: "Data Quality Scorecard Sandbox",
            note: "Simulated data quality assertion suite demonstrating automated anomaly detection and reconciliation variance tracking.",
        },
    },

    "schema-translator": {
        context: {
            title: "The problem behind the system",
            text: "Supervisory authorities frequently update reporting taxonomies (e.g. EBA DPM, PRA taxonomy updates). Translating internal data dictionaries to revised regulatory schemas was historically a tedious manual mapping process.",
            points: [
                "Weeks of senior analyst time required for each taxonomy upgrade.",
                "High risk of semantic mismatch between internal definitions and statutory schemas.",
                "Absence of transparent, explainable audit trails for mapping decisions.",
            ],
        },
        system: {
            title: "What was actually built",
            text: "An auto-reconciling regulatory schema translator that uses semantic concept matching, constraint validation, and explainable decision algorithms to map evolving schemas automatically.",
            points: [
                "Semantic similarity matching between internal data dictionaries and statutory XBRL schemas.",
                "Constraint validation engine verifying data type, scale, and sign compatibility.",
                "Explainable mapping suggestions with explicit rationale for human-in-the-loop review.",
            ],
        },
        architecture: {
            title: "From disparate schemas to verified mappings",
            text: "The system ingests internal and target regulatory schemas, performs semantic vector alignment, runs constraint checks, and generates auditable mapping proposals.",
            nodes: [
                { title: "Schema Intake", desc: "XBRL & XML taxonomy parsing" },
                { title: "Semantic Matching", desc: "Concept embedding similarity" },
                { title: "Constraint Checks", desc: "Type, sign & domain validation" },
                { title: "Explainable Output", desc: "Audited mapping rationale" },
            ],
        },
        engineering: {
            title: "The engineering decisions",
            text: "Built using Python and machine learning semantic encoders combined with hard constraint satisfaction logic to prevent invalid mapping suggestions.",
            points: [
                "Hybrid embedding similarity combined with deterministic constraint solvers.",
                "Automated regression testing against historical regulatory taxonomy releases.",
                "Interactive review CLI and UI for compliance analysts to verify edge cases.",
            ],
        },
        governance: {
            title: "Explainable AI and human-in-the-loop sign-off",
            text: "Every suggested mapping includes an explainability score detailing why a specific field was matched, ensuring transparent supervisory auditability.",
            points: [
                "Human-in-the-loop sign-off mandatory before committing mapping rules.",
                "Full explanation trail for every semantic mapping recommendation.",
                "Automated versioning across regulatory taxonomy updates.",
            ],
        },
        impact: {
            title: "Accelerating taxonomy compliance",
            text: "Reduced taxonomy migration cycles from weeks to hours while providing an auditable, explainable foundation for ongoing regulatory change management.",
        },
        demo: {
            title: "Schema Translation Demonstration",
            note: "Interactive demonstration illustrating semantic field alignment between internal banking data models and EBA regulatory reporting taxonomies.",
        },
    },

    "privacycomply": {
        context: {
            title: "The problem behind the system",
            text: "Modern data privacy regulations (e.g. India's DPDP Act, GDPR) require organizations to implement privacy-by-design, ensure strict tenant isolation, and handle Data Subject Access Requests (DSARs) without manual data leaks.",
            points: [
                "Strict statutory compliance requirements under India's Digital Personal Data Protection (DPDP) Act.",
                "Risk of data leakage when centralizing sensitive PII for compliance processing.",
                "Need for multi-tenant isolation and verifiable consent lifecycle management.",
            ],
        },
        system: {
            title: "What was actually built",
            text: "A privacy compliance control plane engineered around source-side data processing and tenant isolation. It manages user consent lifecycles, automated DSAR fulfillment, and tamper-evident compliance audit trails.",
            points: [
                "Source-side PII tokenization ensuring plain-text personal data never leaves secure boundaries.",
                "Multi-tenant consent management engine handling opt-ins, opt-outs, and withdrawal events.",
                "Automated DSAR workflow coordinating subject data discovery and deletion verification.",
            ],
        },
        architecture: {
            title: "Source-side processing and compliance control plane",
            text: "Client applications interact through privacy interceptors that tokenize PII at the source, while the control plane orchestrates tenant policies and consent verification.",
            nodes: [
                { title: "Edge Interceptor", desc: "Source-side PII tokenization" },
                { title: "Consent Plane", desc: "Tenant policy & lifecycle engine" },
                { title: "DSAR Pipeline", desc: "Automated retrieval & erasure" },
                { title: "Evidence Vault", desc: "Tamper-evident audit logging" },
            ],
        },
        engineering: {
            title: "The engineering decisions",
            text: "Engineered using C#, .NET, ASP.NET Core, FastAPI, React, TypeScript, Redis, and Docker. Implemented separate tenant databases and cryptographic tokenization routines.",
            points: [
                "Strict multi-tenant architecture with separate tenant databases.",
                "FastAPI and ASP.NET Core microservices communicating via secure async messaging.",
                "Redis-backed rate limiting and token caching for edge interceptors.",
            ],
        },
        governance: {
            title: "India-first privacy-by-design governance",
            text: "Designed from first principles to meet India's DPDP Act statutory standards, ensuring complete consent traceability and zero unauthorized data transfers.",
            points: [
                "Complete compliance alignment with DPDP statutory requirements.",
                "Immutable compliance event logs for regulatory audit defense.",
                "Zero plaintext PII storage in the central control plane.",
            ],
        },
        impact: {
            title: "Scalable privacy control plane",
            text: "Delivered a high-performance, multi-tenant compliance platform capable of handling enterprise-scale consent and subject requests with edge privacy protection.",
        },
        demo: {
            title: "PrivacyComply Control Plane Preview",
            note: "Sanitized demonstration interface showing multi-tenant consent status tracking, tokenization verification, and mock DSAR lifecycle processing.",
        },
    },

    "ml-analytics": {
        context: {
            title: "The problem behind the system",
            text: "Organizations frequently struggle to convert disparate data streams into operational decision support, resulting in missed predictive signals in financial forecasting, computer vision, and executive analytics.",
            points: [
                "High-latency manual decision cycles lacking predictive foresight.",
                "Complex multidimensional data that resist simple spreadsheet visualization.",
                "Need for robust model evaluation, interpretability, and production deployment.",
            ],
        },
        system: {
            title: "What was actually built",
            text: "A suite of applied machine learning, predictive analytics, and computer vision systems. Encompasses financial return prediction, sports analytics, YOLO object detection, and interactive executive decision dashboards.",
            points: [
                "Predictive ML models for financial time series and operational metrics.",
                "Computer vision pipelines utilizing YOLO for real-time object tracking.",
                "Executive decision dashboards in Streamlit, Power BI, and Tableau.",
            ],
        },
        architecture: {
            title: "From raw data streams to operational intelligence",
            text: "Pipelines capture diverse data streams, perform domain-specific feature engineering, run predictive inference models, and present interactive analytics to decision-makers.",
            nodes: [
                { title: "Data Ingestion", desc: "Streaming & batch telemetry" },
                { title: "Feature Store", desc: "Engineered domain signals" },
                { title: "Model Inference", desc: "ML & Computer Vision models" },
                { title: "Decision UI", desc: "Interactive dashboards & alerts" },
            ],
        },
        engineering: {
            title: "The engineering decisions",
            text: "Built with Python, Pandas, NumPy, scikit-learn, YOLO, DAX, Streamlit, and FastAPI. Emphasized low-latency inference, model interpretability, and resilient data processing.",
            points: [
                "Optimized NumPy and Pandas transformations for rapid feature calculation.",
                "Modular model evaluation pipelines with cross-validation and confusion matrix diagnostics.",
                "Interactive Streamlit and Power BI dashboards with real-time parameter filtering.",
            ],
        },
        governance: {
            title: "Responsible model governance & interpretability",
            text: "Models incorporate feature importance scoring, bias checks, and performance degradation tracking to ensure robust, dependable decision support.",
            points: [
                "SHAP and feature importance metrics for model transparency.",
                "Continuous validation against test holds and out-of-sample data.",
                "Clear documentation of model assumptions and operating boundaries.",
            ],
        },
        impact: {
            title: "Applied predictive outcomes",
            text: "Demonstrated proven machine learning and computer vision capabilities delivering actionable insights across quantitative finance, sports analytics, and visual tracking.",
        },
        demo: {
            title: "Machine Learning Analytics Sandbox",
            note: "Interactive decision dashboard demonstrator showing predictive model parameter tuning and real-time data visualisations.",
        },
    },
};

function ProjectPage({ project }: ProjectPageProps) {
    const navigate = useNavigate();

    const details = useMemo(() => {
        return (
            projectContentMap[project.id] ||
            projectContentMap["rag-ai-assistant"]
        );
    }, [project.id]);

    const nextProject = useMemo(() => {
        const currentIndex = projects.findIndex((p) => p.id === project.id);
        if (currentIndex === -1 || currentIndex === projects.length - 1) {
            return projects[0];
        }
        return projects[currentIndex + 1];
    }, [project.id]);

    return (
        <ScrollFrameLayout
            frameCount={300}
            framePath="/frames/ezgif-frame-{index}.jpg"
            scrollHeight="100%"
            lerp={0.09}
            className="project-page"
            contentClassName="project-page__content"
        >
            {/* =====================================================
                TOP NAVIGATION / BREADCRUMB
            ===================================================== */}

            <nav
                className="project-page__nav"
                aria-label="Project navigation breadcrumb"
            >
                <Link
                    to="/work"
                    className="project-page__back"
                >
                    <span aria-hidden="true">←</span> BACK TO ALL SYSTEMS
                </Link>

                <div className="project-page__meta">
                    <span className="project-page__badge">
                        {project.category.toUpperCase()}
                    </span>

                    <div className="project-page__status">
                        <span className="project-page__status-dot" />
                        <span>SYSTEM: [ ONLINE ]</span>
                    </div>
                </div>
            </nav>

            {/* =====================================================
                HERO SECTION
            ===================================================== */}

            <section
                className="project-page__hero"
                aria-labelledby="project-title"
            >
                <div className="project-page__eyebrow">
                    <span className="project-page__tag">
                        SYSTEM // {project.id.toUpperCase()}
                    </span>
                    <span>•</span>
                    {project.category.toUpperCase()}
                    <span>•</span>
                    {project.experience.toUpperCase()}
                </div>

                <h1
                    id="project-title"
                    className="project-page__title"
                >
                    {project.title}
                </h1>

                <p className="project-page__description">
                    {project.description}
                </p>

                {/* Key Metrics Grid */}
                <div className="project-page__metrics">
                    {project.metrics.map((metric) => (
                        <div
                            key={`${project.id}-${metric.label}`}
                            className="project-page__metric-card"
                        >
                            <strong>{metric.value}</strong>
                            <span>{metric.label}</span>
                        </div>
                    ))}
                </div>

                {/* Technology Pills */}
                <div className="project-page__technologies">
                    {project.technologies.map((tech) => (
                        <span
                            key={tech}
                            className="project-page__tech-pill"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </section>

            {/* =====================================================
                SECTION SUB-NAVIGATION BAR
            ===================================================== */}

            <nav
                className="project-section-nav"
                aria-label="Jump to project section"
            >
                <div className="project-section-nav__links">
                    {project.sections.context && (
                        <a
                            href="#context"
                            className="project-section-nav__link"
                        >
                            CONTEXT
                        </a>
                    )}
                    {project.sections.system && (
                        <a
                            href="#system"
                            className="project-section-nav__link"
                        >
                            SYSTEM
                        </a>
                    )}
                    {project.sections.architecture && (
                        <a
                            href="#architecture"
                            className="project-section-nav__link"
                        >
                            ARCHITECTURE
                        </a>
                    )}
                    {project.sections.engineering && (
                        <a
                            href="#engineering"
                            className="project-section-nav__link"
                        >
                            ENGINEERING
                        </a>
                    )}
                    {project.sections.governance && (
                        <a
                            href="#governance"
                            className="project-section-nav__link"
                        >
                            GOVERNANCE
                        </a>
                    )}
                    {project.sections.impact && (
                        <a
                            href="#impact"
                            className="project-section-nav__link"
                        >
                            IMPACT
                        </a>
                    )}
                    {project.sections.demo && (
                        <a
                            href="#demo"
                            className="project-section-nav__link"
                        >
                            DEMO
                        </a>
                    )}
                </div>

                <div className="project-section-nav__telemetry">
                    <span>TELEMETRY: ACTIVE</span>
                </div>
            </nav>

            {/* =====================================================
                PROJECT DETAIL SECTIONS
            ===================================================== */}

            <div className="project-sections">
                {/* 01: CONTEXT */}
                {project.sections.context && (
                    <section
                        id="context"
                        className="project-section"
                    >
                        <div className="project-section__header">
                            <span className="project-section__index">01</span>
                            <span className="project-section__label">CONTEXT</span>
                        </div>

                        <h2 className="project-section__title">
                            {details.context.title}
                        </h2>

                        <p className="project-section__text">
                            {details.context.text}
                        </p>

                        <ul className="project-section__points">
                            {details.context.points.map((point) => (
                                <li
                                    key={point}
                                    className="project-section__point"
                                >
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* 02: SYSTEM */}
                {project.sections.system && (
                    <section
                        id="system"
                        className="project-section"
                    >
                        <div className="project-section__header">
                            <span className="project-section__index">02</span>
                            <span className="project-section__label">SYSTEM</span>
                        </div>

                        <h2 className="project-section__title">
                            {details.system.title}
                        </h2>

                        <p className="project-section__text">
                            {details.system.text}
                        </p>

                        <ul className="project-section__points">
                            {details.system.points.map((point) => (
                                <li
                                    key={point}
                                    className="project-section__point"
                                >
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* 03: ARCHITECTURE */}
                {project.sections.architecture && (
                    <section
                        id="architecture"
                        className="project-section"
                    >
                        <div className="project-section__header">
                            <span className="project-section__index">03</span>
                            <span className="project-section__label">
                                ARCHITECTURE
                            </span>
                        </div>

                        <h2 className="project-section__title">
                            {details.architecture.title}
                        </h2>

                        <p className="project-section__text">
                            {details.architecture.text}
                        </p>

                        <div className="project-architecture-flow">
                            {details.architecture.nodes.map((node) => (
                                <div
                                    key={node.title}
                                    className="project-architecture-node"
                                >
                                    <div className="project-architecture-node__title">
                                        {node.title}
                                    </div>
                                    <div className="project-architecture-node__desc">
                                        {node.desc}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 04: ENGINEERING */}
                {project.sections.engineering && (
                    <section
                        id="engineering"
                        className="project-section"
                    >
                        <div className="project-section__header">
                            <span className="project-section__index">04</span>
                            <span className="project-section__label">
                                ENGINEERING
                            </span>
                        </div>

                        <h2 className="project-section__title">
                            {details.engineering.title}
                        </h2>

                        <p className="project-section__text">
                            {details.engineering.text}
                        </p>

                        <ul className="project-section__points">
                            {details.engineering.points.map((point) => (
                                <li
                                    key={point}
                                    className="project-section__point"
                                >
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* 05: GOVERNANCE */}
                {project.sections.governance && (
                    <section
                        id="governance"
                        className="project-section"
                    >
                        <div className="project-section__header">
                            <span className="project-section__index">05</span>
                            <span className="project-section__label">
                                GOVERNANCE
                            </span>
                        </div>

                        <h2 className="project-section__title">
                            {details.governance.title}
                        </h2>

                        <p className="project-section__text">
                            {details.governance.text}
                        </p>

                        <ul className="project-section__points">
                            {details.governance.points.map((point) => (
                                <li
                                    key={point}
                                    className="project-section__point"
                                >
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* 06: IMPACT */}
                {project.sections.impact && (
                    <section
                        id="impact"
                        className="project-section"
                    >
                        <div className="project-section__header">
                            <span className="project-section__index">06</span>
                            <span className="project-section__label">IMPACT</span>
                        </div>

                        <h2 className="project-section__title">
                            {details.impact.title}
                        </h2>

                        <p className="project-section__text">
                            {details.impact.text}
                        </p>

                        {/* Repeat metrics for impact reinforcement */}
                        <div className="project-page__metrics">
                            {project.metrics.map((metric) => (
                                <div
                                    key={`impact-${metric.label}`}
                                    className="project-page__metric-card"
                                >
                                    <strong>{metric.value}</strong>
                                    <span>{metric.label}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 07: DEMO */}
                {project.sections.demo && (
                    <section
                        id="demo"
                        className="project-section"
                    >
                        <div className="project-section__header">
                            <span className="project-section__index">07</span>
                            <span className="project-section__label">DEMO</span>
                        </div>

                        <h2 className="project-section__title">
                            {details.demo.title}
                        </h2>

                        <div className="project-demo-box">
                            <div className="project-demo-box__badge">
                                [ PRODUCTION SANDBOX SIMULATION ]
                            </div>
                            <p className="project-demo-box__note">
                                {details.demo.note}
                            </p>
                        </div>
                    </section>
                )}
            </div>

            {/* =====================================================
                BOTTOM NAVIGATION FOOTER
            ===================================================== */}

            <div className="project-bottom-nav">
                <button
                    type="button"
                    className="project-bottom-nav__link"
                    onClick={() => navigate("/work")}
                >
                    <span aria-hidden="true">←</span> RETURN TO ALL SYSTEMS
                </button>

                {nextProject && (
                    <Link
                        to={nextProject.route}
                        className="project-bottom-nav__link project-bottom-nav__link--primary"
                    >
                        NEXT SYSTEM: {nextProject.shortTitle}{" "}
                        <span aria-hidden="true">→</span>
                    </Link>
                )}
            </div>
        </ScrollFrameLayout>
    );
}

export default ProjectPage;