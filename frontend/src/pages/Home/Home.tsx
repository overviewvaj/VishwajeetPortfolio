import { Link } from "react-router-dom";
import ScrollFrameLayout from "../../components/layout/ScrollFrameLayout";
import "./Home.css";

function Home() {
    return (
        <ScrollFrameLayout
            frameCount={300}
            framePath="/frames/ezgif-frame-{index}.jpg"
            scrollHeight="100%"
            lerp={0.09}
            className="home-page"
            contentClassName="home-page__content"
        >
            {/* =====================================================
                HERO SECTION
            ===================================================== */}
            <section
                className="home-hero"
                aria-labelledby="home-title"
            >
                <div className="home-hero__content">
                    <div className="home-hero__eyebrow">
                        DATA
                        <span>•</span>
                        ANALYTICS
                        <span>•</span>
                        REGULATORY TECHNOLOGY
                        <span>•</span>
                        AI
                    </div>

                    <h1
                        id="home-title"
                        className="home-hero__title"
                    >
                        Beyond data,
                        <br />
                        I build systems
                        <br />
                        that matter.
                    </h1>

                    <p className="home-hero__description">
                        Building intelligent data platforms, regulatory technology,
                        and AI-driven solutions where complex financial information
                        becomes clear, actionable, and audit-ready decisions.
                    </p>

                    <div className="home-hero__actions">
                        <a
                            href="#intro"
                            className="home-btn home-btn--primary"
                        >
                            Executive Intro
                        </a>
                        <Link
                            to="/work"
                            className="home-btn home-btn--secondary"
                        >
                            View Selected Work
                        </Link>
                    </div>
                </div>
            </section>

            {/* =====================================================
                01 // INTRODUCTION: WHO I AM & WHAT I DO
            ===================================================== */}
            <section
                id="intro"
                className="home-section home-intro"
                aria-labelledby="intro-title"
            >
                <div className="home-section__inner">
                    <div className="home-section__eyebrow">
                        [ 01 // INTRODUCTION ]
                    </div>

                    <div className="home-intro__grid">
                        <div className="home-intro__main">
                            <h2
                                id="intro-title"
                                className="home-section__title"
                            >
                                The translation layer between regulatory policy, distributed data architecture, and applied AI.
                            </h2>

                            <div className="home-intro__paragraphs">
                                <p>
                                    I am a London-based Senior Data & Analytics professional and Regulatory Data Architect with 6+ years' experience operating across UK Financial Services in FCA- and PRA-regulated environments.
                                </p>
                                <p>
                                    I specialize in bridging the critical divide between prudential regulatory scrutiny, modern lakehouse engineering (Medallion Architecture, PySpark, SQL), and production-grade applied AI. From architecting RAG-based intelligence assistants licensed across 13+ UK banks to leading bank-wide automation roadmaps that eliminate manual reporting risks, my focus is delivering high-integrity data systems that withstand regulatory scrutiny and drive multi-million-pound decisions.
                                </p>
                            </div>
                        </div>

                        <aside className="home-intro__sidebar">
                            <div className="home-profile-card">
                                <div className="home-profile-card__status">
                                    <span
                                        className="home-profile-card__dot"
                                        aria-hidden="true"
                                    />
                                    <span>ACTIVE ADVISORY & ROLES</span>
                                </div>

                                <h3 className="home-profile-card__name">
                                    Vishwajeet Joshi
                                </h3>

                                <p className="home-profile-card__role">
                                    Senior Data & Analytics Professional • Regulatory Data Architect
                                </p>

                                <div className="home-profile-card__meta">
                                    <div className="home-profile-meta-item">
                                        <span className="home-profile-meta-label">Location</span>
                                        <span className="home-profile-meta-value">London, UK</span>
                                    </div>
                                    <div className="home-profile-meta-item">
                                        <span className="home-profile-meta-label">Domain</span>
                                        <span className="home-profile-meta-value">UK Banking • PRA / FCA • Applied AI</span>
                                    </div>
                                    <div className="home-profile-meta-item">
                                        <span className="home-profile-meta-label">Education</span>
                                        <span className="home-profile-meta-value">MSc Data Science, Cardiff University</span>
                                    </div>
                                </div>

                                <div className="home-profile-card__links">
                                    <Link
                                        to="/Contact"
                                        className="home-profile-card__btn"
                                    >
                                        Initiate Contact
                                    </Link>
                                    <a
                                        href="https://www.linkedin.com/in/vishwajeet--joshi/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="home-profile-card__social"
                                    >
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* =====================================================
                02 // METRICS & PKIs (PROVEN IMPACT)
            ===================================================== */}
            <section
                id="metrics"
                className="home-section home-metrics"
                aria-labelledby="metrics-title"
            >
                <div className="home-section__inner">
                    <div className="home-section__eyebrow">
                        [ 02 // PROVEN IMPACT & PKIs ]
                    </div>

                    <h2
                        id="metrics-title"
                        className="home-section__title home-section__title--compact"
                    >
                        Quantifiable outcomes across UK banking.
                    </h2>

                    <p className="home-section__sub">
                        Audited results delivering commercial licence revenue, manual operational recovery, and regulatory integrity under supervisory deadlines.
                    </p>

                    <div className="home-metrics-grid">
                        <div className="home-metric-card">
                            <div className="home-metric-card__value">
                                £1M+
                            </div>
                            <div className="home-metric-card__label">
                                Annual Licence Revenue
                            </div>
                            <p className="home-metric-card__desc">
                                Architected and deployed a production RAG-based AI assistant for institutional stress-testing, generating £1M+ in annual licence revenue across 13+ UK banks.
                            </p>
                        </div>

                        <div className="home-metric-card">
                            <div className="home-metric-card__value">
                                95%
                            </div>
                            <div className="home-metric-card__label">
                                Manual Effort Eliminated
                            </div>
                            <p className="home-metric-card__desc">
                                Led the Strategic Data Roadmap at State Bank of India UK replacing manual Excel reconciliation with automated SQL/Python pipelines, saving 1,600+ hours and £100k+ annually.
                            </p>
                        </div>

                        <div className="home-metric-card">
                            <div className="home-metric-card__value">
                                25+
                            </div>
                            <div className="home-metric-card__label">
                                Statutory Projects • 0 Breaches
                            </div>
                            <p className="home-metric-card__desc">
                                Delivered 25+ statutory regulatory reporting projects (LCR, NSFR, PRA110, COREP, ALMM) under direct PRA supervision with zero regulatory breaches.
                            </p>
                        </div>

                        <div className="home-metric-card">
                            <div className="home-metric-card__value">
                                £1B+
                            </div>
                            <div className="home-metric-card__label">
                                Balance Sheet Visibility
                            </div>
                            <p className="home-metric-card__desc">
                                Architected Power BI semantic models and executive dashboards giving real-time visibility into capital adequacy and liquidity for a tier-1 banking client.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                03 // UNIQUE SELLING PROPOSITIONS (USPs)
            ===================================================== */}
            <section
                id="usps"
                className="home-section home-usps"
                aria-labelledby="usps-title"
            >
                <div className="home-section__inner">
                    <div className="home-section__eyebrow">
                        [ 03 // UNIQUE SELLING PROPOSITIONS ]
                    </div>

                    <h2
                        id="usps-title"
                        className="home-section__title"
                    >
                        What sets my practice apart.
                    </h2>

                    <p className="home-section__sub">
                        Three structural capabilities that differentiate my engineering delivery and technical advisory.
                    </p>

                    <div className="home-usps-grid">
                        <div className="home-usp-card">
                            <div className="home-usp-card__index">01</div>
                            <h3 className="home-usp-card__title">
                                The Regulatory-to-Engineering Bridge
                            </h3>
                            <p className="home-usp-card__text">
                                Most data engineers lack prudential regulatory knowledge; most risk analysts cannot write distributed PySpark pipelines. I operate directly in that gap — translating complex PRA/FCA supervisory policy into resilient, audit-ready data lakehouse assets (Medallion Gold Layer) with end-to-end data lineage.
                            </p>
                            <ul className="home-usp-card__tags">
                                <li>PRA110 / COREP / LCR / NSFR</li>
                                <li>Medallion Gold Layer Assets</li>
                                <li>Full Data Lineage & Traceability</li>
                            </ul>
                        </div>

                        <div className="home-usp-card">
                            <div className="home-usp-card__index">02</div>
                            <h3 className="home-usp-card__title">
                                Governed, Production Applied AI
                            </h3>
                            <p className="home-usp-card__text">
                                Applied AI built for regulated banking, not unconstrained sandbox experiments. I design deterministic RAG systems with independent role-based access control (RBAC), Model Risk Governance compliance, and Monte Carlo risk engines quantifying £9.95M+ operational risk frameworks under PRA scrutiny.
                            </p>
                            <ul className="home-usp-card__tags">
                                <li>Enterprise RAG & LangChain</li>
                                <li>Model Risk Governance (MRG)</li>
                                <li>Monte Carlo Risk Simulation</li>
                            </ul>
                        </div>

                        <div className="home-usp-card">
                            <div className="home-usp-card__index">03</div>
                            <h3 className="home-usp-card__title">
                                Strategic Leadership & C-Suite Advisory
                            </h3>
                            <p className="home-usp-card__text">
                                Technical leadership backed by business fluency. Proven record conceiving data roadmaps from scratch, directing cross-functional engineering teams, and briefing the CFO directly on technical recommendations that protect balance sheets and eliminate operational risks.
                            </p>
                            <ul className="home-usp-card__tags">
                                <li>CFO & ALCO Technical Briefings</li>
                                <li>Strategic Data Roadmaps</li>
                                <li>Cross-Functional Technical Lead</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                04 // PROVENANCE & EXPERIENCE
            ===================================================== */}
            <section
                className="home-section home-provenance"
                aria-label="Career Provenance"
            >
                <div className="home-section__inner">
                    <div className="home-section__eyebrow">
                        [ 04 // PROVENANCE & EXPERIENCE ]
                    </div>

                    <div className="home-provenance-list">
                        <div className="home-provenance-item">
                            <div className="home-provenance-item__period">
                                Jan 2025 – Mar 2026
                            </div>
                            <div className="home-provenance-item__content">
                                <div className="home-provenance-item__role">
                                    Senior Analyst • Business, Data & Information Management
                                </div>
                                <div className="home-provenance-item__company">
                                    Katalysys Ltd, UK • London
                                </div>
                            </div>
                        </div>

                        <div className="home-provenance-item">
                            <div className="home-provenance-item__period">
                                Apr 2023 – Jan 2025
                            </div>
                            <div className="home-provenance-item__content">
                                <div className="home-provenance-item__role">
                                    Senior Engineer • Regulatory Reporting & Data
                                </div>
                                <div className="home-provenance-item__company">
                                    State Bank of India, UK • London
                                </div>
                            </div>
                        </div>

                        <div className="home-provenance-item">
                            <div className="home-provenance-item__period">
                                Jan 2022 – Mar 2023
                            </div>
                            <div className="home-provenance-item__content">
                                <div className="home-provenance-item__role">
                                    Data Engineer • Automated Analytics Platform
                                </div>
                                <div className="home-provenance-item__company">
                                    RGIS Inventory Solutions, UK • Cardiff
                                </div>
                            </div>
                        </div>

                        <div className="home-provenance-item">
                            <div className="home-provenance-item__period">
                                Jun 2019 – Jul 2021
                            </div>
                            <div className="home-provenance-item__content">
                                <div className="home-provenance-item__role">
                                    Service Delivery Team Lead
                                </div>
                                <div className="home-provenance-item__company">
                                    T-tec India, India • Ahmedabad
                                </div>
                            </div>
                        </div>

                        <div className="home-provenance-item">
                            <div className="home-provenance-item__period">
                                Academic
                            </div>
                            <div className="home-provenance-item__content">
                                <div className="home-provenance-item__role">
                                    MSc Data Science & Analytics
                                </div>
                                <div className="home-provenance-item__company">
                                    Cardiff University, UK
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                05 // PORTFOLIO GATEWAYS & CALL TO ACTION
            ===================================================== */}
            <section
                className="home-section home-gateways"
                aria-label="Portfolio Gateways"
            >
                <div className="home-section__inner">
                    <div className="home-gateways__card">
                        <div className="home-gateways__content">
                            <div className="home-gateways__tag">
                                INITIATE ENGAGEMENT
                            </div>
                            <h2 className="home-gateways__title">
                                Ready to build resilient data & AI systems?
                            </h2>
                            <p className="home-gateways__text">
                                Available for strategic advisory, technical leadership, and engineering initiatives across UK Financial Services and regulated enterprise technology.
                            </p>
                        </div>
                        <div className="home-gateways__actions">
                            <Link
                                to="/Contact"
                                className="home-btn home-btn--primary"
                            >
                                Get in Touch
                            </Link>
                            <Link
                                to="/work"
                                className="home-btn home-btn--secondary"
                            >
                                Explore Selected Work
                            </Link>
                            <Link
                                to="/Studio"
                                className="home-btn home-btn--tertiary"
                            >
                                Inspect Studio Architecture
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </ScrollFrameLayout>
    );
}

export default Home;