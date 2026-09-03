import {
    useState,
    useMemo,
    useRef,
    useEffect,
    useCallback,
    type CSSProperties,
} from "react";
import ScrollFrameLayout from "../../components/layout/ScrollFrameLayout";
import {
    BASELINE_PUBLICATIONS,
    fetchAllPublications,
    type Publication,
    type PublicationPlatform,
} from "./data/publications";

import "./Journal.css";

function Journal() {
    const [publications, setPublications] = useState<Publication[]>(
        BASELINE_PUBLICATIONS,
    );
    const [isMediumLive, setIsMediumLive] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [viewMode, setViewMode] = useState<"coverflow" | "grid">(
        "coverflow",
    );
    const [selectedPlatform, setSelectedPlatform] = useState<
        "all" | PublicationPlatform
    >("all");
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [selectedArticle, setSelectedArticle] =
        useState<Publication | null>(null);

    // Touch and drag tracking
    const dragStartX = useRef<number | null>(null);
    const isDragging = useRef(false);
    const lastWheelTime = useRef(0);

    /*
     * -----------------------------------------------------
     * AUTOMATED LIVE RSS SYNC
     * Background fetches Medium RSS feed & merges new posts
     * -----------------------------------------------------
     */
    useEffect(() => {
        let isMounted = true;
        fetchAllPublications().then(({ publications: livePubs, isMediumLive: live }) => {
            if (isMounted) {
                setPublications(livePubs);
                setIsMediumLive(live);
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);

    /*
     * -----------------------------------------------------
     * PLATFORM COUNTS
     * -----------------------------------------------------
     */
    const counts = useMemo(() => {
        const mediumCount = publications.filter(
            (p) => p.platform === "medium",
        ).length;
        const linkedInCount = publications.filter(
            (p) => p.platform === "linkedin",
        ).length;
        return {
            all: publications.length,
            medium: mediumCount,
            linkedin: linkedInCount,
        };
    }, [publications]);

    /*
     * -----------------------------------------------------
     * FILTERED PUBLICATIONS
     * -----------------------------------------------------
     */
    const filteredPublications = useMemo(() => {
        return publications.filter((pub) => {
            const matchesPlatform =
                selectedPlatform === "all" ||
                pub.platform === selectedPlatform;
            const matchesCategory =
                activeCategory === "all" ||
                pub.categories.some(
                    (c) =>
                        c.toLowerCase() === activeCategory.toLowerCase(),
                );
            return matchesPlatform && matchesCategory;
        });
    }, [publications, selectedPlatform, activeCategory]);

    const totalPages = filteredPublications.length;

    // Reset active index if count shrinks
    useEffect(() => {
        if (activeIndex >= totalPages) {
            setActiveIndex(Math.max(0, totalPages - 1));
        }
    }, [totalPages, activeIndex]);

    /*
     * -----------------------------------------------------
     * CATEGORIES FOR ACTIVE PLATFORM
     * -----------------------------------------------------
     */
    const availableCategories = useMemo(() => {
        const catSet = new Set<string>();
        const pool =
            selectedPlatform === "all"
                ? publications
                : publications.filter(
                      (p) => p.platform === selectedPlatform,
                  );

        for (const pub of pool) {
            for (const c of pub.categories) {
                catSet.add(c);
            }
        }
        return ["all", ...Array.from(catSet).slice(0, 5)];
    }, [publications, selectedPlatform]);

    /*
     * -----------------------------------------------------
     * NAVIGATION HANDLERS
     * -----------------------------------------------------
     */
    const goToPrev = useCallback(() => {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
    }, [totalPages]);

    const goToNext = useCallback(() => {
        setActiveIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
    }, [totalPages]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedArticle) {
                if (e.key === "Escape") {
                    setSelectedArticle(null);
                }
                return;
            }

            if (e.key === "ArrowLeft") {
                goToPrev();
            } else if (e.key === "ArrowRight") {
                goToNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [goToPrev, goToNext, selectedArticle]);

    /*
     * -----------------------------------------------------
     * TOUCH & DRAG SWIPING
     * -----------------------------------------------------
     */
    const handlePointerDown = (clientX: number) => {
        dragStartX.current = clientX;
        isDragging.current = true;
    };

    const handlePointerUp = (clientX: number) => {
        if (!isDragging.current || dragStartX.current === null) {
            return;
        }

        const deltaX = clientX - dragStartX.current;
        const threshold = 45;

        if (deltaX > threshold) {
            goToPrev();
        } else if (deltaX < -threshold) {
            goToNext();
        }

        isDragging.current = false;
        dragStartX.current = null;
    };

    // Wheel scrub handler
    const handleWheel = (e: React.WheelEvent) => {
        const now = Date.now();
        if (now - lastWheelTime.current < 280) {
            return;
        }

        if (Math.abs(e.deltaX) > 20 || Math.abs(e.deltaY) > 30) {
            lastWheelTime.current = now;
            if (e.deltaX > 20 || e.deltaY > 30) {
                goToNext();
            } else {
                goToPrev();
            }
        }
    };

    /*
     * -----------------------------------------------------
     * 3D TRANSFORM GENERATOR
     * -----------------------------------------------------
     */
    const getCardStyle = (index: number): CSSProperties => {
        const offset = index - activeIndex;
        const absOffset = Math.abs(offset);

        // Hide cards too far in background
        if (absOffset > 4) {
            return {
                display: "none",
            };
        }

        if (offset === 0) {
            return {
                transform:
                    "translate3d(0, 0, 80px) rotateY(0deg) scale(1)",
                zIndex: 40,
                opacity: 1,
                filter: "brightness(1)",
            };
        }

        // Left cards
        if (offset < 0) {
            const translateX = offset * 135 - 75;
            const translateZ = offset * 85;
            const rotateY = Math.min(-offset * 26, 62);
            const scale = Math.max(1 + offset * 0.08, 0.72);
            const opacity = Math.max(1 + offset * 0.18, 0.35);
            const brightness = Math.max(1 + offset * 0.12, 0.55);

            return {
                transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex: 40 + offset,
                opacity,
                filter: `brightness(${brightness})`,
            };
        }

        // Right cards
        const translateX = offset * 135 + 75;
        const translateZ = -offset * 85;
        const rotateY = -Math.min(offset * 26, 62);
        const scale = Math.max(1 - offset * 0.08, 0.72);
        const opacity = Math.max(1 - offset * 0.18, 0.35);
        const brightness = Math.max(1 - offset * 0.12, 0.55);

        return {
            transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
            zIndex: 40 - offset,
            opacity,
            filter: `brightness(${brightness})`,
        };
    };

    const activePub =
        filteredPublications[activeIndex] || filteredPublications[0];

    return (
        <ScrollFrameLayout
            frameCount={300}
            framePath="/frames/ezgif-frame-{index}.jpg"
            scrollHeight="100%"
            lerp={0.09}
            className="journal-page"
            contentClassName="journal-page__content"
        >
            {/* =====================================================
                TOP HEADER
            ===================================================== */}

            <header
                className="journal-header"
                aria-label="Journal navigation"
            >
                {/* Left Controls: 3D Coverflow / Mosaic Grid Switcher */}
                <div className="journal-header__controls-left">
                    <button
                        type="button"
                        className={`journal-icon-btn ${viewMode === "coverflow" ? "journal-icon-btn--active" : ""}`}
                        onClick={() => setViewMode("coverflow")}
                        aria-label="3D Coverflow view"
                        title="3D Coverflow"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        className={`journal-icon-btn ${viewMode === "grid" ? "journal-icon-btn--active" : ""}`}
                        onClick={() => setViewMode("grid")}
                        aria-label="Mosaic Grid view"
                        title="Grid View"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect
                                x="3"
                                y="3"
                                width="7"
                                height="7"
                            />
                            <rect
                                x="14"
                                y="3"
                                width="7"
                                height="7"
                            />
                            <rect
                                x="14"
                                y="14"
                                width="7"
                                height="7"
                            />
                            <rect
                                x="3"
                                y="14"
                                width="7"
                                height="7"
                            />
                        </svg>
                    </button>
                </div>

                {/* Center Title & Counter */}
                <div className="journal-header__title-block">
                    <h1 className="journal-header__title">Journal</h1>
                    <div className="journal-header__counter">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                        <span>
                            {totalPages}{" "}
                            {totalPages === 1
                                ? "Publication"
                                : "Publications"}{" "}
                            Across Medium & LinkedIn
                        </span>
                    </div>
                </div>

                {/* Right Controls: Live Sync Badge */}
                <div className="journal-header__controls-right">
                    <div
                        className="journal-medium-live-badge"
                        title="Connected to Medium and LinkedIn Publications"
                    >
                        <span className="journal-medium-live-dot" />
                        <span>
                            {isMediumLive
                                ? "FEED: SYNCED"
                                : "PUBLICATIONS"}
                        </span>
                    </div>
                </div>
            </header>

            {/* =====================================================
                PLATFORM SWITCHER & CATEGORY FILTERS
            ===================================================== */}

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    width: "100%",
                }}
            >
                {/* Platform Selector */}
                <div
                    className="journal-platform-switcher"
                    role="tablist"
                    aria-label="Filter by publishing platform"
                >
                    <button
                        type="button"
                        className={`journal-platform-btn ${selectedPlatform === "all" ? "journal-platform-btn--active" : ""}`}
                        onClick={() => {
                            setSelectedPlatform("all");
                            setActiveCategory("all");
                            setActiveIndex(0);
                        }}
                    >
                        All Publications ({counts.all})
                    </button>

                    <button
                        type="button"
                        className={`journal-platform-btn ${selectedPlatform === "medium" ? "journal-platform-btn--active" : ""}`}
                        onClick={() => {
                            setSelectedPlatform("medium");
                            setActiveCategory("all");
                            setActiveIndex(0);
                        }}
                    >
                        Medium ({counts.medium})
                    </button>

                    <button
                        type="button"
                        className={`journal-platform-btn ${selectedPlatform === "linkedin" ? "journal-platform-btn--active journal-platform-btn--linkedin" : ""}`}
                        onClick={() => {
                            setSelectedPlatform("linkedin");
                            setActiveCategory("all");
                            setActiveIndex(0);
                        }}
                    >
                        LinkedIn ({counts.linkedin})
                    </button>
                </div>

                {/* Category Topic Pills */}
                <nav
                    className="journal-filter-bar"
                    aria-label="Filter publication topics"
                >
                    {availableCategories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            className={`journal-filter-pill ${activeCategory === cat ? "journal-filter-pill--active" : ""}`}
                            onClick={() => {
                                setActiveCategory(cat);
                                setActiveIndex(0);
                            }}
                        >
                            {cat === "all" ? "All Topics" : cat}
                        </button>
                    ))}
                </nav>
            </div>

            {/* =====================================================
                MAIN VIEW (3D COVERFLOW OR MOSAIC GRID)
            ===================================================== */}

            {viewMode === "coverflow" ? (
                <>
                    {/* 3D Coverflow Stage */}
                    <div
                        className="journal-stage"
                        onMouseDown={(e) => handlePointerDown(e.clientX)}
                        onMouseUp={(e) => handlePointerUp(e.clientX)}
                        onTouchStart={(e) =>
                            handlePointerDown(e.touches[0].clientX)
                        }
                        onTouchEnd={(e) =>
                            handlePointerUp(e.changedTouches[0].clientX)
                        }
                        onWheel={handleWheel}
                        aria-label="3D Coverflow publication reader"
                    >
                        <div className="journal-deck">
                            {filteredPublications.map((pub, index) => {
                                const isActive = index === activeIndex;
                                const cardStyle = getCardStyle(index);

                                return (
                                    <article
                                        key={pub.id}
                                        className={`journal-card ${isActive ? "journal-card--active" : ""}`}
                                        style={cardStyle}
                                        onClick={() => {
                                            if (isActive) {
                                                setSelectedArticle(pub);
                                            } else {
                                                setActiveIndex(index);
                                            }
                                        }}
                                        aria-current={
                                            isActive ? "true" : undefined
                                        }
                                    >
                                        {/* Center Book Spine Curve */}
                                        <div className="journal-card__spine" />

                                        {/* Background Photo & Shading */}
                                        <div
                                            className="journal-card__bg"
                                            style={{
                                                backgroundImage: `url(${pub.heroImage})`,
                                            }}
                                        />
                                        <div className="journal-card__overlay" />

                                        {/* Scrapbook Spread Content */}
                                        <div className="journal-card__content">
                                            {/* Left: Filmstrip */}
                                            <div className="journal-filmstrip">
                                                <div className="journal-filmstrip__holes">
                                                    <div className="journal-filmstrip__hole" />
                                                    <div className="journal-filmstrip__hole" />
                                                </div>

                                                <div className="journal-filmstrip__frame">
                                                    <img
                                                        src={pub.heroImage}
                                                        alt={pub.title}
                                                        loading="lazy"
                                                    />
                                                </div>

                                                <div className="journal-filmstrip__holes">
                                                    <div className="journal-filmstrip__hole" />
                                                    <div className="journal-filmstrip__hole" />
                                                </div>
                                            </div>

                                            {/* Right: Article Details Spread */}
                                            <div className="journal-spread">
                                                {/* Header */}
                                                <div className="journal-spread__header">
                                                    <div className="journal-spread__title-block">
                                                        <div className="journal-spread__badge-row">
                                                            {/* Platform Badge */}
                                                            <span
                                                                className={`journal-platform-badge ${pub.platform === "linkedin" ? "journal-platform-badge--linkedin" : "journal-platform-badge--medium"}`}
                                                            >
                                                                {pub.platform ===
                                                                "linkedin"
                                                                    ? "LinkedIn"
                                                                    : "Medium"}
                                                            </span>

                                                            {pub.categories
                                                                .slice(0, 2)
                                                                .map((cat) => (
                                                                    <span
                                                                        key={cat}
                                                                        className="journal-sticker"
                                                                    >
                                                                        {cat}
                                                                    </span>
                                                                ))}

                                                            <span className="journal-read-time">
                                                                •{" "}
                                                                {pub.readTime}
                                                            </span>
                                                        </div>

                                                        <h2 className="journal-spread__heading">
                                                            {pub.title}
                                                        </h2>
                                                        <p className="journal-spread__subtitle">
                                                            {pub.excerpt}
                                                        </p>
                                                    </div>

                                                    <div className="journal-spread__page-tag">
                                                        {pub.formattedDate}
                                                    </div>
                                                </div>

                                                {/* Key Technical Highlight / Quote */}
                                                <div className="journal-notes-row">
                                                    <div className="journal-note journal-note--handwritten">
                                                        <div className="journal-note__pin" />
                                                        {pub.keyQuote}
                                                    </div>

                                                    {/* Direct External Action & Synopsis */}
                                                    <div className="journal-card__actions">
                                                        {pub.platform ===
                                                        "linkedin" ? (
                                                            <a
                                                                href={pub.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="journal-linkedin-btn"
                                                                onClick={(e) =>
                                                                    e.stopPropagation()
                                                                }
                                                            >
                                                                <span>
                                                                    Read on
                                                                    LinkedIn
                                                                </span>
                                                                <span aria-hidden="true">
                                                                    ↗
                                                                </span>
                                                            </a>
                                                        ) : (
                                                            <a
                                                                href={pub.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="journal-medium-btn"
                                                                onClick={(e) =>
                                                                    e.stopPropagation()
                                                                }
                                                            >
                                                                <span>
                                                                    Read on
                                                                    Medium
                                                                </span>
                                                                <span aria-hidden="true">
                                                                    ↗
                                                                </span>
                                                            </a>
                                                        )}

                                                        <button
                                                            type="button"
                                                            className="journal-card__preview-btn"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedArticle(
                                                                    pub,
                                                                );
                                                            }}
                                                        >
                                                            Summary
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Zoom / Inspect Hint */}
                                        <div className="journal-card__zoom-hint">
                                            <span>EXPAND SYNOPSIS</span>
                                            <span aria-hidden="true">↗</span>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bottom Action Dock & Page Scrubber */}
                    <div className="journal-bottom-bar">
                        {/* Dot Scrubber */}
                        <div
                            className="journal-scrubber"
                            role="tablist"
                            aria-label="Publication dots"
                        >
                            <div className="journal-scrubber__dots">
                                {filteredPublications.map((pub, idx) => (
                                    <button
                                        key={pub.id}
                                        type="button"
                                        className={`journal-scrubber__dot ${idx === activeIndex ? "journal-scrubber__dot--active" : ""}`}
                                        onClick={() => setActiveIndex(idx)}
                                        aria-label={`Jump to publication ${idx + 1}: ${pub.title}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Circular Action Dock */}
                        <div
                            className="journal-action-dock"
                            aria-label="Navigation controls"
                        >
                            {/* Prev Page Button */}
                            <button
                                type="button"
                                className="journal-dock-btn"
                                onClick={goToPrev}
                                aria-label="Previous publication"
                                title="Previous Publication"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line
                                        x1="19"
                                        y1="12"
                                        x2="5"
                                        y2="12"
                                    />
                                    <polyline points="12 19 5 12 12 5" />
                                </svg>
                            </button>

                            {/* Center Read Button */}
                            {activePub && (
                                <a
                                    href={activePub.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`journal-dock-btn ${activePub.platform === "linkedin" ? "" : "journal-dock-btn--primary"}`}
                                    style={
                                        activePub.platform === "linkedin"
                                            ? {
                                                  background: "#0a66c2",
                                                  color: "#ffffff",
                                                  borderColor: "#0a66c2",
                                              }
                                            : undefined
                                    }
                                    aria-label={`Open on ${activePub.platform === "linkedin" ? "LinkedIn" : "Medium"}`}
                                    title={`Open on ${activePub.platform === "linkedin" ? "LinkedIn" : "Medium"}`}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line
                                            x1="10"
                                            y1="14"
                                            x2="21"
                                            y2="3"
                                        />
                                    </svg>
                                </a>
                            )}

                            {/* Next Page Button */}
                            <button
                                type="button"
                                className="journal-dock-btn"
                                onClick={goToNext}
                                aria-label="Next publication"
                                title="Next Publication"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line
                                        x1="5"
                                        y1="12"
                                        x2="19"
                                        y2="12"
                                    />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                /* =====================================================
                   MOSAIC GRID VIEW
                ===================================================== */
                <div
                    className="journal-grid-view"
                    aria-label="Publications gallery grid"
                >
                    {filteredPublications.map((pub) => (
                        <article
                            key={pub.id}
                            className="journal-grid-card"
                            onClick={() => setSelectedArticle(pub)}
                        >
                            <img
                                src={pub.heroImage}
                                alt={pub.title}
                                className="journal-grid-card__thumb"
                                loading="lazy"
                            />

                            <div className="journal-grid-card__body">
                                <div className="journal-grid-card__meta">
                                    <span
                                        className={`journal-platform-badge ${pub.platform === "linkedin" ? "journal-platform-badge--linkedin" : "journal-platform-badge--medium"}`}
                                    >
                                        {pub.platform === "linkedin"
                                            ? "LinkedIn"
                                            : "Medium"}
                                    </span>
                                    <span>{pub.formattedDate}</span>
                                </div>

                                <h2 className="journal-grid-card__title">
                                    {pub.title}
                                </h2>

                                <p className="journal-grid-card__subtitle">
                                    {pub.excerpt}
                                </p>

                                <div
                                    style={{
                                        marginTop: "16px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span className="journal-read-time">
                                        {pub.readTime}
                                    </span>

                                    {pub.platform === "linkedin" ? (
                                        <a
                                            href={pub.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="journal-linkedin-btn"
                                            onClick={(e) =>
                                                e.stopPropagation()
                                            }
                                            style={{
                                                padding: "6px 12px",
                                                fontSize: "10px",
                                            }}
                                        >
                                            <span>Read on LinkedIn</span>
                                            <span>↗</span>
                                        </a>
                                    ) : (
                                        <a
                                            href={pub.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="journal-medium-btn"
                                            onClick={(e) =>
                                                e.stopPropagation()
                                            }
                                            style={{
                                                padding: "6px 12px",
                                                fontSize: "10px",
                                            }}
                                        >
                                            <span>Read on Medium</span>
                                            <span>↗</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {/* =====================================================
                FULLSCREEN ARTICLE SYNOPSIS LIGHTBOX
            ===================================================== */}

            {selectedArticle && (
                <div
                    className="journal-modal-backdrop"
                    onClick={() => setSelectedArticle(null)}
                >
                    <div
                        className="journal-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="journal-modal__close"
                            onClick={() => setSelectedArticle(null)}
                            aria-label="Close modal"
                        >
                            ✕
                        </button>

                        <div className="journal-modal__hero">
                            <img
                                src={selectedArticle.heroImage}
                                alt={selectedArticle.title}
                            />
                            <div className="journal-modal__hero-overlay" />
                        </div>

                        <div className="journal-modal__header">
                            <div className="journal-modal__eyebrow">
                                <span
                                    className={`journal-platform-badge ${selectedArticle.platform === "linkedin" ? "journal-platform-badge--linkedin" : "journal-platform-badge--medium"}`}
                                    style={{ marginRight: "8px" }}
                                >
                                    {selectedArticle.platform === "linkedin"
                                        ? "LinkedIn Pulse"
                                        : "Medium Publication"}
                                </span>
                                {selectedArticle.categories.join(" • ")} //{" "}
                                {selectedArticle.readTime}
                            </div>
                            <h2 className="journal-modal__title">
                                {selectedArticle.title}
                            </h2>
                            <div className="journal-modal__date-loc">
                                Published on{" "}
                                {selectedArticle.platform === "linkedin"
                                    ? "LinkedIn"
                                    : "Medium"}{" "}
                                • {selectedArticle.formattedDate} • By{" "}
                                {selectedArticle.author}
                            </div>
                        </div>

                        <div className="journal-modal__body">
                            <div className="journal-modal__narrative">
                                <p
                                    style={{
                                        fontSize: "1.2rem",
                                        fontWeight: 500,
                                        color: "#ffffff",
                                    }}
                                >
                                    {selectedArticle.excerpt}
                                </p>

                                <blockquote
                                    style={{
                                        borderLeft: `3px solid ${selectedArticle.platform === "linkedin" ? "#0a66c2" : "#38bdf8"}`,
                                        margin: "20px 0",
                                        padding: "12px 18px",
                                        background:
                                            selectedArticle.platform ===
                                            "linkedin"
                                                ? "rgba(10, 102, 194, 0.1)"
                                                : "rgba(56, 189, 248, 0.08)",
                                        fontFamily: "Caveat, cursive",
                                        fontSize: "1.4rem",
                                        color: "#e0f2fe",
                                        borderRadius: "0 6px 6px 0",
                                    }}
                                >
                                    "{selectedArticle.keyQuote}"
                                </blockquote>

                                <div style={{ margin: "24px 0" }}>
                                    <h4
                                        style={{
                                            fontFamily:
                                                "JetBrains Mono, monospace",
                                            fontSize: "12px",
                                            letterSpacing: "0.12em",
                                            textTransform: "uppercase",
                                            color:
                                                selectedArticle.platform ===
                                                "linkedin"
                                                    ? "#60a5fa"
                                                    : "#38bdf8",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        Key Architectural Highlights
                                    </h4>

                                    <ul
                                        style={{
                                            margin: 0,
                                            paddingLeft: "20px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "10px",
                                            color: "rgba(255, 255, 255, 0.8)",
                                            fontSize: "0.95rem",
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {selectedArticle.points.map(
                                            (pt, i) => (
                                                <li key={i}>{pt}</li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            </div>

                            {/* Direct External Link Callout */}
                            <div
                                style={{
                                    marginTop: "32px",
                                    paddingTop: "24px",
                                    borderTop:
                                        "1px solid rgba(255, 255, 255, 0.12)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    flexWrap: "wrap",
                                    gap: "16px",
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            fontFamily:
                                                "JetBrains Mono, monospace",
                                            fontSize: "11px",
                                            color: "rgba(255, 255, 255, 0.6)",
                                        }}
                                    >
                                        Full publication with formulas, case
                                        studies & discussions
                                    </div>
                                </div>

                                {selectedArticle.platform === "linkedin" ? (
                                    <a
                                        href={selectedArticle.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="journal-linkedin-btn"
                                        style={{
                                            padding: "12px 24px",
                                            fontSize: "12px",
                                        }}
                                    >
                                        <span>
                                            Read Full Article on LinkedIn
                                        </span>
                                        <span aria-hidden="true">↗</span>
                                    </a>
                                ) : (
                                    <a
                                        href={selectedArticle.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="journal-medium-btn"
                                        style={{
                                            padding: "12px 24px",
                                            fontSize: "12px",
                                        }}
                                    >
                                        <span>
                                            Read Full Article on Medium
                                        </span>
                                        <span aria-hidden="true">↗</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </ScrollFrameLayout>
    );
}

export default Journal;
