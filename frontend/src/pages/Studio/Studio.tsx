import { useState } from "react";
import { Menu, X } from "lucide-react";

type NavItemProps = {
    label: string;
    href: string;
    delay: string;
};

type MetricProps = {
    value: string;
    label: string;
};

function NavItem({
    label,
    href,
    delay,
}: NavItemProps) {
    return (
        <a
            href={href}
            className="group whitespace-nowrap font-manrope text-[13px] leading-[15.6px] text-white opacity-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] transition-colors duration-300 animate-[fadeUp_0.9s_cubic-bezier(0.16,1,0.3,1)_forwards] hover:text-[#AFDDFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#AFDDFF]"
            style={{
                animationDelay: delay,
            }}
            onClick={(event) => {
                const target = document.querySelector(
                    href
                );

                if (target) {
                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });

                    window.history.replaceState(
                        null,
                        "",
                        href
                    );
                }
            }}
        >
            {label}
        </a>
    );
}

function GridLines() {
    const verticalPositions = [
        "12.6%",
        "37.5%",
        "61.9%",
        "86.2%",
    ];

    const horizontalPositions = [
        "34%",
        "74%",
    ];

    return (
        <div
            className="pointer-events-none absolute inset-0 z-[2]"
            aria-hidden="true"
        >
            {verticalPositions.map(
                (position, index) => (
                    <div
                        key={`vertical-${position}`}
                        className="absolute top-0 h-full w-px origin-top bg-white/[0.10] opacity-0 animate-[gridReveal_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                        style={{
                            left: position,
                            animationDelay: `${700 + index * 100}ms`,
                        }}
                    />
                )
            )}

            {horizontalPositions.map(
                (position, index) => (
                    <div
                        key={`horizontal-${position}`}
                        className="absolute left-0 h-px w-full origin-left bg-white/[0.10] opacity-0 animate-[gridRevealH_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                        style={{
                            top: position,
                            animationDelay: `${900 + index * 150}ms`,
                        }}
                    />
                )
            )}

            {horizontalPositions.map(
                (
                    horizontalPosition,
                    horizontalIndex
                ) =>
                    verticalPositions.map(
                        (
                            verticalPosition,
                            verticalIndex
                        ) => (
                            <div
                                key={`plus-${horizontalIndex}-${verticalIndex}`}
                                className="absolute opacity-0 animate-[scaleIn_0.7s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                                style={{
                                    top: horizontalPosition,
                                    left: verticalPosition,
                                    animationDelay: `${1100 +
                                        (horizontalIndex * 4 +
                                            verticalIndex) *
                                        80
                                        }ms`,
                                }}
                            >
                                <span className="absolute h-px w-[10px] -translate-x-1/2 -translate-y-1/2 bg-white/60" />

                                <span className="absolute h-[10px] w-px -translate-x-1/2 -translate-y-1/2 bg-white/60" />
                            </div>
                        )
                    )
            )}
        </div>
    );
}

function Metric({
    value,
    label,
}: MetricProps) {
    return (
        <div>
            <div className="font-graphik text-[28px] leading-none text-white md:text-[34px]">
                {value}
            </div>

            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#AFDDFF]">
                {label}
            </div>
        </div>
    );
}

function Studio() {
    const [menuOpen, setMenuOpen] =
        useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const scrollToSection = (
        event: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        const target =
            document.querySelector(href);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        window.history.replaceState(
            null,
            "",
            href
        );

        closeMenu();
    };

    return (
        <main className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">

            {/* =====================================================
                VIDEO BACKGROUND
            ===================================================== */}

            <video
                className="fixed inset-0 z-0 h-full w-full object-cover"
                src="/videos/video2.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
            />

            {/* =====================================================
                VERY SUBTLE READABILITY GRADIENT

                The video remains the dominant visual layer.
            ===================================================== */}

            <div
                className="pointer-events-none fixed inset-0 z-[1]"
                aria-hidden="true"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.01) 48%, rgba(0,0,0,0.20) 100%)",
                }}
            />

            {/* =====================================================
                CONTENT
            ===================================================== */}

            <div className="relative z-10 min-h-screen w-full">

                {/* =================================================
                    FIXED HEADER
                ================================================= */}

                <header className="fixed top-0 left-0 z-50 flex w-full items-center px-5 py-5 md:px-[35px] md:py-[27px]">

                    {/* =================================================
                        BRAND
                    ================================================= */}

                    <a
                        href="/"
                        className="whitespace-nowrap font-graphik text-[18px] leading-[21px] text-white opacity-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] transition-opacity duration-300 animate-[fadeUp_0.9s_cubic-bezier(0.16,1,0.3,1)_forwards] md:text-[21px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#AFDDFF]"
                        style={{
                            animationDelay:
                                "150ms",
                        }}
                    >
                        Vishwajeet Joshi
                    </a>

                    {/* =================================================
                        DESKTOP NAVIGATION

                        Centered independently from the brand.
                    ================================================= */}

                    <nav
                        aria-label="Studio sections"
                        className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center gap-[36px] lg:flex"
                    >
                        <div className="pointer-events-auto flex items-center gap-[36px]">
                            <NavItem
                                label="SYSTEM"
                                href="#system"
                                delay="300ms"
                            />

                            <NavItem
                                label="METHODOLOGY"
                                href="#methodology"
                                delay="400ms"
                            />

                            <NavItem
                                label="ARCHITECTURES"
                                href="#architectures"
                                delay="500ms"
                            />

                            <NavItem
                                label="INTELLIGENCE"
                                href="#intelligence"
                                delay="600ms"
                            />
                        </div>
                    </nav>

                    {/* =================================================
                        TELEMETRY
                    ================================================= */}

                    <div
                        className="ml-auto hidden items-center gap-[10px] font-mono text-[11px] opacity-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] animate-[slideInRight_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] lg:flex"
                        style={{
                            animationDelay:
                                "500ms",
                        }}
                    >
                        <span className="flex h-[14px] w-[14px] items-center justify-center">
                            <span className="block h-[6px] w-[6px] rounded-full border border-[#AFDDFF] bg-[#AFDDFF]/20 shadow-[0_0_10px_rgba(175,221,255,0.7)]" />
                        </span>

                        <span className="text-white">
                            SYSTEM:
                        </span>

                        <span className="text-[#AFDDFF]">
                            [ ONLINE ]
                        </span>

                        <span className="ml-[14px] text-white">
                            STATUS:
                        </span>

                        <span className="rounded-[3px] bg-[#AFDDFF] px-[5px] py-[2px] text-black">
                            ACTIVE
                        </span>
                    </div>

                    {/* =================================================
                        MOBILE MENU BUTTON
                    ================================================= */}

                    <button
                        type="button"
                        aria-label={
                            menuOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        aria-expanded={
                            menuOpen
                        }
                        onClick={() =>
                            setMenuOpen(
                                !menuOpen
                            )
                        }
                        className="relative ml-auto flex h-[40px] w-[40px] items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#AFDDFF] lg:hidden"
                    >
                        <Menu
                            className={`absolute h-[22px] w-[22px] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition-all duration-300 ${menuOpen
                                    ? "rotate-90 scale-50 opacity-0"
                                    : "rotate-0 scale-100 opacity-100"
                                }`}
                            strokeWidth={1.5}
                        />

                        <X
                            className={`absolute h-[22px] w-[22px] text-white transition-all duration-300 ${menuOpen
                                    ? "rotate-0 scale-100 opacity-100"
                                    : "-rotate-90 scale-50 opacity-0"
                                }`}
                            strokeWidth={1.5}
                        />
                    </button>
                </header>

                {/* =================================================
                    MOBILE MENU
                ================================================= */}

                <div
                    className={`fixed inset-0 z-[60] lg:hidden ${menuOpen
                            ? "visible"
                            : "invisible pointer-events-none"
                        }`}
                    aria-hidden={!menuOpen}
                >
                    {/* BACKDROP */}

                    <button
                        type="button"
                        aria-label="Close navigation menu"
                        onClick={closeMenu}
                        className={`absolute inset-0 h-full w-full backdrop-blur-md transition-opacity duration-500 ${menuOpen
                                ? "bg-black/50 opacity-100"
                                : "bg-black/0 opacity-0"
                            }`}
                    />

                    {/* PANEL */}

                    <div
                        className={`relative flex h-full flex-col px-5 pb-10 pt-24 transition-all duration-500 ${menuOpen
                                ? "translate-y-0 opacity-100"
                                : "-translate-y-4 opacity-0"
                            }`}
                    >
                        <button
                            type="button"
                            aria-label="Close navigation menu"
                            onClick={closeMenu}
                            className="absolute top-5 right-5 flex h-[40px] w-[40px] items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#AFDDFF]"
                        >
                            <X
                                className="h-[22px] w-[22px] text-white"
                                strokeWidth={1.5}
                            />
                        </button>

                        <div className="font-graphik text-[21px] leading-[21px] text-white">
                            Vishwajeet Joshi
                        </div>

                        <nav
                            aria-label="Mobile Studio sections"
                            className="mt-[45px] flex flex-col gap-8"
                        >
                            <a
                                href="#system"
                                onClick={(event) =>
                                    scrollToSection(
                                        event,
                                        "#system"
                                    )
                                }
                                className="font-manrope text-[27px] leading-[1.2] text-white transition-colors hover:text-[#AFDDFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#AFDDFF]"
                            >
                                SYSTEM
                            </a>

                            <a
                                href="#methodology"
                                onClick={(event) =>
                                    scrollToSection(
                                        event,
                                        "#methodology"
                                    )
                                }
                                className="font-manrope text-[27px] leading-[1.2] text-white transition-colors hover:text-[#AFDDFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#AFDDFF]"
                            >
                                METHODOLOGY
                            </a>

                            <a
                                href="#architectures"
                                onClick={(event) =>
                                    scrollToSection(
                                        event,
                                        "#architectures"
                                    )
                                }
                                className="font-manrope text-[27px] leading-[1.2] text-white transition-colors hover:text-[#AFDDFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#AFDDFF]"
                            >
                                ARCHITECTURES
                            </a>

                            <a
                                href="#intelligence"
                                onClick={(event) =>
                                    scrollToSection(
                                        event,
                                        "#intelligence"
                                    )
                                }
                                className="font-manrope text-[27px] leading-[1.2] text-white transition-colors hover:text-[#AFDDFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#AFDDFF]"
                            >
                                INTELLIGENCE
                            </a>

                            <a
                                href="/About"
                                onClick={closeMenu}
                                className="font-manrope text-[27px] leading-[1.2] text-white transition-colors hover:text-[#AFDDFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#AFDDFF]"
                            >
                                ABOUT
                            </a>

                            <a
                                href="/ReachUs"
                                onClick={closeMenu}
                                className="font-manrope text-[27px] leading-[1.2] text-white transition-colors hover:text-[#AFDDFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#AFDDFF]"
                            >
                                REACH US
                            </a>
                        </nav>

                        <div className="mt-auto border-t border-white/20 pt-8">
                            <div className="flex items-center gap-[9px] font-mono text-[11px]">
                                <span className="h-[6px] w-[6px] rounded-full bg-[#AFDDFF] shadow-[0_0_10px_rgba(175,221,255,0.8)]" />

                                <span className="text-white">
                                    SYSTEM:
                                </span>

                                <span className="text-[#AFDDFF]">
                                    [ ONLINE ]
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =================================================
                    HERO
                ================================================= */}

                <section
                    className="relative flex min-h-screen w-full scroll-mt-[100px] flex-col justify-between overflow-hidden px-5 pt-[145px] pb-7 md:px-[35px] md:pt-[178px] md:pb-[35px]"
                >
                    <GridLines />

                    {/* HERO COPY */}

                    <div className="relative z-10 max-w-[1050px]">
                        <div
                            className="mb-5 font-mono text-[11px] tracking-[0.18em] text-[#AFDDFF] opacity-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] animate-[fadeUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                            style={{
                                animationDelay:
                                    "250ms",
                            }}
                        >
                            [ STUDIO // DATA + REGULATION + AI ]
                        </div>

                        <h1
                            className="max-w-[1000px] font-graphik text-[40px] font-normal leading-[0.98] tracking-[-0.035em] text-white opacity-0 drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)] animate-[fadeUp_0.9s_cubic-bezier(0.16,1,0.3,1)_forwards] sm:text-[56px] md:text-[76px] lg:text-[88px]"
                            style={{
                                animationDelay:
                                    "400ms",
                            }}
                        >
                            I build systems
                            <br />
                            that make complex
                            <br />
                            information usable.
                        </h1>

                        <p
                            className="mt-7 max-w-[700px] font-manrope text-[15px] leading-[1.65] text-white opacity-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] animate-[fadeUp_0.9s_cubic-bezier(0.16,1,0.3,1)_forwards] md:text-[18px]"
                            style={{
                                animationDelay:
                                    "600ms",
                            }}
                        >
                            Data engineering, regulatory
                            intelligence, and deterministic
                            AI — designed as one unified
                            operating system.
                        </p>

                        <p
                            className="mt-5 max-w-[760px] font-manrope text-[13px] leading-[1.7] text-white opacity-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] animate-[fadeUp_0.9s_cubic-bezier(0.16,1,0.3,1)_forwards] md:text-[15px]"
                            style={{
                                animationDelay:
                                    "700ms",
                            }}
                        >
                            Production systems spanning
                            financial data, regulatory reporting,
                            risk simulation, and governed AI
                            deployed in UK financial-services
                            environments.
                        </p>
                    </div>

                    {/* =================================================
                        CV METRICS
                    ================================================= */}

                    <div
                        className="relative z-10 mt-16 grid grid-cols-2 gap-x-5 gap-y-7 border-t border-white/20 pt-5 opacity-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] animate-[fadeUp_0.9s_cubic-bezier(0.16,1,0.3,1)_forwards] md:grid-cols-4 md:gap-0"
                        style={{
                            animationDelay:
                                "850ms",
                        }}
                    >
                        <div className="border-white/20 md:border-r md:pr-6">
                            <Metric
                                value="£1M+"
                                label="Annual Licence Revenue"
                            />
                        </div>

                        <div className="md:border-r md:px-6">
                            <Metric
                                value="13+"
                                label="UK Banks Supported"
                            />
                        </div>

                        <div className="border-white/20 md:border-r md:px-6">
                            <Metric
                                value="95%"
                                label="Manual Effort Reduced"
                            />
                        </div>

                        <div className="md:pl-6">
                            <Metric
                                value="1,600+"
                                label="Hours Saved / Year"
                            />
                        </div>
                    </div>
                </section>

                {/* =================================================
                    SYSTEM
                ================================================= */}

                <section
                    id="system"
                    className="relative min-h-screen scroll-mt-[100px] px-5 py-24 md:px-[35px] md:py-32"
                >
                    <div className="mx-auto max-w-[1360px]">
                        <div className="max-w-[850px]">
                            <div className="font-mono text-[11px] tracking-[0.16em] text-[#AFDDFF]">
                                [ ARCHITECTURAL FLOW ]
                            </div>

                            <h2 className="mt-5 font-graphik text-[32px] font-normal leading-[1.05] tracking-tight text-white md:text-[48px]">
                                From raw data to
                                deterministic action.
                            </h2>

                            <p className="mt-5 max-w-[700px] font-manrope text-[15px] leading-[1.7] text-white md:text-[17px]">
                                Engineering systems that move
                                information through ingestion,
                                quality, transformation,
                                regulatory control and
                                intelligence.
                            </p>
                        </div>

                        <div className="mt-16 grid gap-4 md:grid-cols-2">
                            {[
                                [
                                    "DATA INGESTION",
                                    "Batch and streaming data from heterogeneous enterprise sources.",
                                ],
                                [
                                    "DATA QUALITY",
                                    "Automated validation, reconciliation and integrity controls.",
                                ],
                                [
                                    "REGULATORY",
                                    "LCR, NSFR, PRA110, COREP and ALMM reporting frameworks.",
                                ],
                                [
                                    "AI INTELLIGENCE",
                                    "Grounded retrieval, semantic context and intelligent synthesis.",
                                ],
                            ].map(
                                ([title, description]) => (
                                    <div
                                        key={title}
                                        className="border border-white/20 bg-black/10 p-6 backdrop-blur-[2px] transition-all duration-300 hover:border-[#AFDDFF]/60 hover:bg-black/20"
                                    >
                                        <h3 className="font-graphik text-[22px] text-white">
                                            {title}
                                        </h3>

                                        <p className="mt-3 max-w-[500px] font-manrope text-[13px] leading-[1.7] text-white">
                                            {description}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>

                        {/* SYSTEM METRICS */}

                        <div className="mt-16 grid gap-5 border-t border-white/20 pt-7 sm:grid-cols-2 lg:grid-cols-4">
                            <Metric
                                value="£9.95M"
                                label="Group Operational Risk Framework"
                            />

                            <Metric
                                value="£9.81M"
                                label="UK Operational Risk Framework"
                            />

                            <Metric
                                value="30%"
                                label="Processing Time Reduced"
                            />

                            <Metric
                                value="£1B+"
                                label="Client Balance Sheet"
                            />
                        </div>
                    </div>
                </section>

                {/* =================================================
                    METHODOLOGY
                ================================================= */}

                <section
                    id="methodology"
                    className="relative scroll-mt-[100px] px-5 py-24 md:px-[35px] md:py-32"
                >
                    <div className="mx-auto max-w-[1360px]">
                        <div className="font-mono text-[11px] tracking-[0.16em] text-[#AFDDFF]">
                            [ METHODOLOGY ]
                        </div>

                        <h2 className="mt-5 font-graphik text-[32px] leading-[1.05] text-white md:text-[48px]">
                            The engineering lifecycle.
                        </h2>

                        <p className="mt-5 max-w-[720px] font-manrope text-[15px] leading-[1.7] text-white md:text-[17px]">
                            A controlled progression from
                            discovery through production
                            deployment, with governance and
                            validation embedded throughout.
                        </p>

                        <div className="mt-14 grid gap-px border border-white/15 bg-white/15 md:grid-cols-3">
                            {[
                                [
                                    "DISCOVER",
                                    "Profile data structures, source systems and regulatory boundaries.",
                                ],
                                [
                                    "MODEL",
                                    "Formalise schemas, relationships and analytical layers.",
                                ],
                                [
                                    "ENGINEER",
                                    "Build resilient SQL, Python and distributed data pipelines.",
                                ],
                                [
                                    "VALIDATE",
                                    "Reconcile outputs and trap anomalies before submission.",
                                ],
                                [
                                    "AUTOMATE",
                                    "Remove repetitive manual processes through controlled execution.",
                                ],
                                [
                                    "INTELLIGENT",
                                    "Apply grounded AI where reasoning adds measurable value.",
                                ],
                            ].map(
                                ([title, description]) => (
                                    <div
                                        key={title}
                                        className="bg-black/15 p-6 backdrop-blur-[2px]"
                                    >
                                        <h3 className="font-graphik text-[19px] text-white">
                                            {title}
                                        </h3>

                                        <p className="mt-3 font-manrope text-[13px] leading-[1.7] text-white">
                                            {description}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </section>

                {/* =================================================
                    ARCHITECTURES
                ================================================= */}

                <section
                    id="architectures"
                    className="relative scroll-mt-[100px] px-5 py-24 md:px-[35px] md:py-32"
                >
                    <div className="mx-auto max-w-[1360px]">
                        <div className="font-mono text-[11px] tracking-[0.16em] text-[#AFDDFF]">
                            [ PRODUCTION DEPLOYMENTS ]
                        </div>

                        <h2 className="mt-5 font-graphik text-[32px] leading-[1.05] text-white md:text-[48px]">
                            Engineered architectures.
                        </h2>

                        <p className="mt-5 max-w-[760px] font-manrope text-[15px] leading-[1.7] text-white md:text-[17px]">
                            Systems designed around measurable
                            business outcomes, regulatory
                            controls and production reliability.
                        </p>

                        <div className="mt-14 space-y-5">
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
                            ].map(
                                (
                                    [
                                        title,
                                        stack,
                                        impact,
                                    ]
                                ) => (
                                    <article
                                        key={title}
                                        className="grid gap-8 border border-white/20 bg-black/10 p-6 backdrop-blur-[2px] transition-all duration-300 hover:border-[#AFDDFF]/50 hover:bg-black/15 md:grid-cols-[1fr_1fr] md:p-8"
                                    >
                                        <div>
                                            <h3 className="font-graphik text-[21px] leading-[1.2] text-white">
                                                {title}
                                            </h3>

                                            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-[#AFDDFF]">
                                                {stack}
                                            </div>
                                        </div>

                                        <p className="font-manrope text-[14px] leading-[1.7] text-white">
                                            {impact}
                                        </p>
                                    </article>
                                )
                            )}
                        </div>

                        {/* ARCHITECTURE METRICS */}

                        <div className="mt-16 grid gap-5 border-t border-white/20 pt-7 sm:grid-cols-2 lg:grid-cols-4">
                            <Metric
                                value="£1M+"
                                label="Platform Revenue Supported"
                            />

                            <Metric
                                value="13+"
                                label="UK Banking Clients"
                            />

                            <Metric
                                value="30%"
                                label="Pipeline Processing Improvement"
                            />

                            <Metric
                                value="25+"
                                label="Regulatory Initiatives Delivered"
                            />
                        </div>
                    </div>
                </section>

                {/* =================================================
                    INTELLIGENCE
                ================================================= */}

                <section
                    id="intelligence"
                    className="relative scroll-mt-[100px] px-5 py-24 md:px-[35px] md:py-32"
                >
                    <div className="mx-auto max-w-[1360px]">
                        <div className="max-w-[900px]">
                            <div className="font-mono text-[11px] tracking-[0.16em] text-[#AFDDFF]">
                                [ INTELLIGENCE ]
                            </div>

                            <h2 className="mt-6 font-graphik text-[34px] leading-[1.05] text-white md:text-[54px]">
                                AI is the cognition layer —
                                not the foundation.
                            </h2>

                            <p className="mt-7 max-w-[750px] font-manrope text-[15px] leading-[1.8] text-white md:text-[18px]">
                                Reliable intelligence starts
                                with reliable data. Deterministic
                                calculations remain deterministic.
                                AI is introduced where retrieval,
                                synthesis and contextual reasoning
                                create additional value.
                            </p>
                        </div>

                        {/* INTELLIGENCE FLOW */}

                        <div className="mt-14 flex flex-col gap-px border border-white/15 bg-white/15 md:flex-row">
                            {[
                                "RAW DATA",
                                "STRUCTURED DATA",
                                "CONTEXT",
                                "AI REASONING",
                                "DECISION",
                            ].map((title) => (
                                <div
                                    key={title}
                                    className="flex-1 bg-black/15 p-5 backdrop-blur-[2px]"
                                >
                                    <div className="font-graphik text-[16px] text-white">
                                        {title}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* AI GOVERNANCE */}

                        <div className="mt-14 grid gap-4 md:grid-cols-3">
                            {[
                                [
                                    "GROUNDED",
                                    "RAG-based retrieval connects AI outputs to controlled institutional knowledge rather than unsupported generation.",
                                ],
                                [
                                    "GOVERNED",
                                    "Role-based access controls ensure AI outputs remain within the user's authorised data boundary.",
                                ],
                                [
                                    "DETERMINISTIC",
                                    "Financial calculations, regulatory controls and risk models remain governed by explicit logic.",
                                ],
                            ].map(
                                ([title, description]) => (
                                    <div
                                        key={title}
                                        className="border border-white/20 bg-black/10 p-6 backdrop-blur-[2px]"
                                    >
                                        <h3 className="font-graphik text-[19px] text-white">
                                            {title}
                                        </h3>

                                        <p className="mt-3 font-manrope text-[13px] leading-[1.7] text-white">
                                            {description}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </section>

                {/* =================================================
                    FOOTER
                ================================================= */}

                <footer className="relative px-5 pb-10 pt-16 md:px-[35px] md:pb-12">
                    <div className="mx-auto max-w-[1360px] border-t border-white/20 pt-7">
                        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                            <div className="font-graphik text-[17px] text-white">
                                Vishwajeet Joshi
                            </div>

                            <div className="font-mono text-[10px] tracking-[0.12em] text-white">
                                DATA · SYSTEMS · REGULATION · INTELLIGENCE
                            </div>

                            <div className="font-mono text-[10px] tracking-[0.12em] text-white">
                                LONDON · UK
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            {/* =====================================================
                REDUCED MOTION SUPPORT
            ===================================================== */}

            <style>{`
                @media (prefers-reduced-motion: reduce) {
                    *,
                    *::before,
                    *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                        scroll-behavior: auto !important;
                    }
                }
            `}</style>
        </main>
    );
}

export default Studio;