import type { MouseEvent } from "react";
import ScrollFrameLayout from "../../components/layout/ScrollFrameLayout";

import "./Studio.css";

type MetricItemProps = {
    value: string;
    label: string;
};

function MetricItem({ value, label }: MetricItemProps) {
    return (
        <div className="studio-metric-item">
            <div className="studio-metric-item__value">
                {value}
            </div>

            <div className="studio-metric-item__label">
                {label}
            </div>
        </div>
    );
}

function Studio() {
    const handleSmoothScroll = (
        event: MouseEvent<HTMLAnchorElement>,
        targetId: string
    ) => {
        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            window.history.replaceState(null, "", targetId);
        }
    };

    return (
        <ScrollFrameLayout
            frameCount={300}
            framePath="/frames/ezgif-frame-{index}.jpg"
            scrollHeight="100%"
            lerp={0.09}
            className="studio-page"
            contentClassName="studio-page__content"
        >
            {/* =====================================================
                HERO
            ===================================================== */}

            <section
                className="studio-hero"
                aria-labelledby="studio-title"
            >
                <div className="studio-hero__inner">
                    <div className="studio-hero__eyebrow">
                        <span className="studio-hero__tag">STUDIO</span>
                        <span>•</span>
                        DATA
                        <span>•</span>
                        REGULATORY TECHNOLOGY
                        <span>•</span>
                        AI
                    </div>

                    <h1
                        id="studio-title"
                        className="studio-hero__title"
                    >
                        I build systems
                        <br />
                        that make complex
                        <br />
                        information usable.
                    </h1>

                    <p className="studio-hero__description">
                        Data engineering, regulatory intelligence, and
                        deterministic AI — designed as one unified operating
                        system.
                    </p>

                    <p className="studio-hero__sub-description">
                        Production systems spanning financial data, regulatory
                        reporting, risk simulation, and governed AI deployed in
                        UK financial-services environments.
                    </p>
                </div>

                {/* =================================================
                    SUB-NAVIGATION & TELEMETRY
                ================================================= */}

                <div className="studio-nav-bar">
                    <nav
                        className="studio-nav-links"
                        aria-label="Studio sections"
                    >
                        <a
                            href="#system"
                            className="studio-nav-link"
                            onClick={(event) =>
                                handleSmoothScroll(event, "#system")
                            }
                        >
                            SYSTEM
                        </a>

                        <a
                            href="#methodology"
                            className="studio-nav-link"
                            onClick={(event) =>
                                handleSmoothScroll(event, "#methodology")
                            }
                        >
                            METHODOLOGY
                        </a>

                        <a
                            href="#architectures"
                            className="studio-nav-link"
                            onClick={(event) =>
                                handleSmoothScroll(event, "#architectures")
                            }
                        >
                            ARCHITECTURES
                        </a>

                        <a
                            href="#intelligence"
                            className="studio-nav-link"
                            onClick={(event) =>
                                handleSmoothScroll(event, "#intelligence")
                            }
                        >
                            INTELLIGENCE
                        </a>
                    </nav>

                    <div className="studio-telemetry">
                        <span
                            className="studio-telemetry__indicator"
                            aria-hidden="true"
                        />

                        <span className="studio-telemetry__text">
                            SYSTEM:
                        </span>

                        <span className="studio-telemetry__status">
                            [ ONLINE ]
                        </span>

                        <span className="studio-telemetry__badge">
                            ACTIVE
                        </span>
                    </div>
                </div>

                {/* =================================================
                    CV METRICS
                ================================================= */}

                <div className="studio-metrics-grid">
                    <MetricItem
                        value="£1M+"
                        label="Annual Licence Revenue"
                    />

                    <MetricItem
                        value="13+"
                        label="UK Banks Supported"
                    />

                    <MetricItem
                        value="95%"
                        label="Manual Effort Reduced"
                    />

                    <MetricItem
                        value="1,600+"
                        label="Hours Saved / Year"
                    />
                </div>
            </section>

            {/* =====================================================
                SYSTEM
            ===================================================== */}

            <section
                id="system"
                className="studio-section"
                aria-labelledby="system-title"
            >
                <div className="studio-section__inner">
                    <div className="studio-section__header">
                        <span className="studio-section__tag">
                            [ ARCHITECTURAL FLOW ]
                        </span>

                        <h2
                            id="system-title"
                            className="studio-section__title"
                        >
                            From raw data to deterministic action.
                        </h2>

                        <p className="studio-section__description">
                            Engineering systems that move information through
                            ingestion, quality, transformation, regulatory
                            control, and intelligence.
                        </p>
                    </div>

                    <div className="studio-cards-grid">
                        {[
                            [
                                "DATA INGESTION",
                                "Batch and streaming data pipelines connecting heterogeneous enterprise financial feeds.",
                            ],
                            [
                                "DATA QUALITY",
                                "Automated reconciliation, semantic schema validation, and regulatory integrity controls.",
                            ],
                            [
                                "REGULATORY",
                                "LCR, NSFR, PRA110, COREP and ALMM statutory reporting frameworks delivered under supervisory deadlines.",
                            ],
                            [
                                "AI INTELLIGENCE",
                                "Grounded retrieval, vector context indexing, and deterministic synthesis across institutional knowledge.",
                            ],
                        ].map(([title, description]) => (
                            <div
                                key={title}
                                className="studio-card"
                            >
                                <h3 className="studio-card__title">
                                    {title}
                                </h3>

                                <p className="studio-card__description">
                                    {description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="studio-section-metrics">
                        <MetricItem
                            value="£9.95M"
                            label="Group Operational Risk Framework"
                        />

                        <MetricItem
                            value="£9.81M"
                            label="UK Operational Risk Framework"
                        />

                        <MetricItem
                            value="30%"
                            label="Processing Time Reduced"
                        />

                        <MetricItem
                            value="£1B+"
                            label="Client Balance Sheet"
                        />
                    </div>
                </div>
            </section>

            {/* =====================================================
                METHODOLOGY
            ===================================================== */}

            <section
                id="methodology"
                className="studio-section"
                aria-labelledby="methodology-title"
            >
                <div className="studio-section__inner">
                    <div className="studio-section__header">
                        <span className="studio-section__tag">
                            [ METHODOLOGY ]
                        </span>

                        <h2
                            id="methodology-title"
                            className="studio-section__title"
                        >
                            The engineering lifecycle.
                        </h2>

                        <p className="studio-section__description">
                            A controlled progression from discovery through
                            production deployment, with governance and
                            validation embedded at every tier.
                        </p>
                    </div>

                    <div className="studio-methodology-grid">
                        {[
                            [
                                "01 // DISCOVER",
                                "DISCOVER",
                                "Profile data structures, upstream source systems, and regulatory boundaries.",
                            ],
                            [
                                "02 // MODEL",
                                "MODEL",
                                "Formalise schemas, entity relationships, and governed analytical layers.",
                            ],
                            [
                                "03 // ENGINEER",
                                "ENGINEER",
                                "Build resilient SQL, Python, and distributed pipelines with fault-tolerant recovery.",
                            ],
                            [
                                "04 // VALIDATE",
                                "VALIDATE",
                                "Reconcile outputs and trap anomalies before submission to regulators.",
                            ],
                            [
                                "05 // AUTOMATE",
                                "AUTOMATE",
                                "Eliminate fragile manual steps through deterministic, audited orchestrations.",
                            ],
                            [
                                "06 // INTELLIGENT",
                                "INTELLIGENT",
                                "Introduce grounded AI where contextual reasoning and synthesis deliver measurable value.",
                            ],
                        ].map(([step, title, description]) => (
                            <div
                                key={title}
                                className="studio-methodology-card"
                            >
                                <div className="studio-methodology-card__step">
                                    {step}
                                </div>

                                <h3 className="studio-methodology-card__title">
                                    {title}
                                </h3>

                                <p className="studio-methodology-card__description">
                                    {description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
                ARCHITECTURES
            ===================================================== */}

            <section
                id="architectures"
                className="studio-section"
                aria-labelledby="architectures-title"
            >
                <div className="studio-section__inner">
                    <div className="studio-section__header">
                        <span className="studio-section__tag">
                            [ PRODUCTION DEPLOYMENTS ]
                        </span>

                        <h2
                            id="architectures-title"
                            className="studio-section__title"
                        >
                            Engineered architectures.
                        </h2>

                        <p className="studio-section__description">
                            Systems designed around measurable business
                            outcomes, regulatory controls, and production
                            reliability.
                        </p>
                    </div>

                    <div className="studio-architectures-list">
                        {[
                            [
                                "REGULATORY REPORTING AUTOMATION",
                                "Python · SQL · PySpark · Microsoft Fabric",
                                "Strategic regulatory data pipelines replacing manual Excel reconciliation, reducing manual effort by 95%, saving 1,600+ hours annually and recovering £100k+ in annual resource value.",
                            ],
                            [
                                "RAG-BASED AI KNOWLEDGE ASSISTANT",
                                "Python · LangChain · Vector Databases",
                                "Production RAG architecture built from scratch for institutional knowledge discovery, supporting a stress-testing platform generating £1M+ in annual licence revenue across 13+ UK banks.",
                            ],
                            [
                                "MONTE CARLO OPERATIONAL RISK ENGINE",
                                "Python · Monte Carlo · Risk Modelling",
                                "Thousands of scenarios engineered to quantify severe-but-plausible operational risk events across a £9.95M Group-level / £9.81M UK-level framework under direct PRA scrutiny.",
                            ],
                            [
                                "AI-READY DATA PLATFORM",
                                "Python · PySpark · SQL · Medallion Architecture",
                                "Gold Layer data assets designed to modernise legacy financial reporting infrastructure and establish a scalable foundation for analytics and governed AI.",
                            ],
                        ].map(([title, stack, impact]) => (
                            <article
                                key={title}
                                className="studio-architecture-article"
                            >
                                <div>
                                    <h3 className="studio-architecture-article__title">
                                        {title}
                                    </h3>

                                    <div className="studio-architecture-article__stack">
                                        {stack}
                                    </div>
                                </div>

                                <p className="studio-architecture-article__impact">
                                    {impact}
                                </p>
                            </article>
                        ))}
                    </div>

                    <div className="studio-section-metrics">
                        <MetricItem
                            value="£1M+"
                            label="Platform Revenue Supported"
                        />

                        <MetricItem
                            value="13+"
                            label="UK Banking Clients"
                        />

                        <MetricItem
                            value="30%"
                            label="Pipeline Processing Improvement"
                        />

                        <MetricItem
                            value="25+"
                            label="Regulatory Initiatives Delivered"
                        />
                    </div>
                </div>
            </section>

            {/* =====================================================
                INTELLIGENCE
            ===================================================== */}

            <section
                id="intelligence"
                className="studio-section"
                aria-labelledby="intelligence-title"
            >
                <div className="studio-section__inner">
                    <div className="studio-section__header">
                        <span className="studio-section__tag">
                            [ INTELLIGENCE ]
                        </span>

                        <h2
                            id="intelligence-title"
                            className="studio-section__title"
                        >
                            AI is the cognition layer — not the foundation.
                        </h2>

                        <p className="studio-section__description">
                            Reliable intelligence starts with reliable data.
                            Deterministic calculations remain deterministic. AI
                            is introduced where retrieval, synthesis, and
                            contextual reasoning create additional value.
                        </p>
                    </div>

                    {/* Flow */}
                    <div className="studio-intelligence-flow">
                        {[
                            "RAW DATA",
                            "STRUCTURED DATA",
                            "CONTEXT",
                            "AI REASONING",
                            "DECISION",
                        ].map((title) => (
                            <div
                                key={title}
                                className="studio-intelligence-node"
                            >
                                <div className="studio-intelligence-node__title">
                                    {title}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Governance Cards */}
                    <div className="studio-governance-grid">
                        {[
                            [
                                "GROUNDED",
                                "RAG-based retrieval connects AI outputs to controlled institutional knowledge rather than unsupported generation.",
                            ],
                            [
                                "GOVERNED",
                                "Role-based access controls ensure AI outputs remain strictly within the user's authorised data boundary.",
                            ],
                            [
                                "DETERMINISTIC",
                                "Financial calculations, regulatory controls, and risk models remain governed by explicit programmatic logic.",
                            ],
                        ].map(([title, description]) => (
                            <div
                                key={title}
                                className="studio-governance-card"
                            >
                                <h3 className="studio-governance-card__title">
                                    {title}
                                </h3>

                                <p className="studio-governance-card__description">
                                    {description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </ScrollFrameLayout>
    );
}

export default Studio;