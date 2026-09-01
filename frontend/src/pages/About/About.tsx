import { useEffect, useState } from "react";
import {
    ArrowDown,
    ArrowRight,
    ChevronUp,
    Info,
    X,
} from "lucide-react";
import "./About.css";



function About() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const maxScroll =
                document.documentElement.scrollHeight - window.innerHeight;

            const progress =
                maxScroll > 0
                    ? Math.min(1, Math.max(0, window.scrollY / maxScroll))
                    : 0;

            setScrollProgress(progress);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        window.addEventListener("resize", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    /*
     * Sequential section opacity.
     */

    const section1Opacity =
        scrollProgress < 0.2
            ? 1
            : Math.max(0, 1 - (scrollProgress - 0.2) / 0.08);

    const section2Opacity =
        scrollProgress < 0.32
            ? 0
            : scrollProgress < 0.4
                ? (scrollProgress - 0.32) / 0.08
                : scrollProgress < 0.55
                    ? 1
                    : Math.max(0, 1 - (scrollProgress - 0.55) / 0.08);

    const section3Opacity =
        scrollProgress < 0.67
            ? 0
            : scrollProgress < 0.75
                ? (scrollProgress - 0.67) / 0.08
                : 1;

    const isLight = scrollProgress > 0.55;

    return (
        <main className="about-page">

            {/* =====================================================
          SCROLL TRACK
          ===================================================== */}

            <div className="about-scroll-track">

                {/* ===================================================
            STICKY CINEMATIC SCENE
            =================================================== */}

                <div className="about-sticky-scene">

                    {/* VIDEO
              The actual scroll-scrub engine will be connected
              in the next step.
          */}

                    <video
                        className="about-video"
                        muted
                        playsInline
                        preload="auto"
                    >
                        <source
                            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260821_114821_a8ca298f-be2c-4613-a4dd-51b69e16bbde.mp4"
                            type="video/mp4"
                        />
                    </video>

                    {/* =================================================
              CANVAS
              ================================================= */}

                    <canvas
                        className="about-video-canvas"
                        width={1920}
                        height={1080}
                        aria-hidden="true"
                    />

                    {/* =================================================
              NAVIGATION
              ================================================= */}

                    <header
                        className={`about-navbar ${isLight ? "nav-light" : ""
                            }`}
                    >

                        {/* DESKTOP NAV */}

                        <nav className="about-desktop-nav">
                            <a
                                href="/"
                                className="about-nav-link"
                            >
                                VISHWAJEET JOSHI
                            </a>

                            <a
                                href="/"
                                className="about-nav-link"
                            >
                                HOME
                            </a>

                            <a
                                href="/About"
                                className="about-nav-link active"
                            >
                                ABOUT
                            </a>

                            <a
                                href="/Studio"
                                className="about-nav-link"
                            >
                                STUDIO
                            </a>

                            <a
                                href="/Journal"
                                className="about-nav-link"
                            >
                                JOURNAL
                            </a>
                        </nav>

                        {/* DESKTOP RIGHT */}

                        <div className="about-nav-right">

                            <a
                                href="/ReachUs"
                                className="about-news-link"
                            >
                                NEWS
                                <span className="about-info-circle">
                                    <Info size={10} />
                                </span>
                            </a>

                            <a
                                href="/ReachUs"
                                className="about-menu-label"
                            >
                                MENU
                            </a>

                        </div>

                        {/* MOBILE */}

                        <button
                            type="button"
                            className="about-mobile-menu-button"
                            aria-label="Open menu"
                            aria-expanded={mobileMenuOpen}
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span />
                            <span />
                            <span />
                        </button>

                    </header>


                    {/* =================================================
              SECTION 1
              ================================================= */}

                    <section
                        className="about-section about-section-one"
                        style={{
                            opacity: section1Opacity,
                        }}
                    >

                        <div className="about-section-one-content">

                            <h1
                                className={`about-title ${section1Opacity > 0.3
                                        ? "about-stagger-visible"
                                        : ""
                                    }`}
                                style={{
                                    transitionDelay: "0ms",
                                }}
                            >
                                Advancing resources
                                <br />
                                for a cleaner future
                            </h1>

                            <p
                                className={`about-subtitle ${section1Opacity > 0.3
                                        ? "about-stagger-visible"
                                        : ""
                                    }`}
                                style={{
                                    transitionDelay: "150ms",
                                }}
                            >
                                Sustainable power with purpose
                            </p>

                        </div>


                        <a
                            href="/Studio"
                            className={`about-circle-button ${section1Opacity > 0.3
                                    ? "about-stagger-visible"
                                    : ""
                                }`}
                            style={{
                                transitionDelay: "300ms",
                            }}
                            aria-label="Continue"
                        >
                            <ArrowRight size={18} />
                        </a>

                    </section>


                    {/* =================================================
              SECTION 2
              ================================================= */}

                    <section
                        className="about-section about-section-two"
                        style={{
                            opacity: section2Opacity,
                        }}
                    >

                        <div className="about-section-two-content">

                            <h2
                                className={`about-section-two-heading ${section2Opacity > 0.3
                                        ? "about-stagger-visible"
                                        : ""
                                    }`}
                                style={{
                                    transitionDelay: "0ms",
                                }}
                            >
                                We build lasting partnerships with vision{" "}
                                <span className="about-text-dark-strong">
                                    and precision
                                </span>{" "}
                                <span className="about-text-dark-soft">
                                    across every frontier
                                </span>
                            </h2>

                        </div>


                        <div className="about-section-two-controls">

                            <button
                                type="button"
                                className={`about-circle-button ${section2Opacity > 0.3
                                        ? "about-stagger-visible"
                                        : ""
                                    }`}
                                style={{
                                    transitionDelay: "200ms",
                                }}
                                aria-label="Continue downward"
                            >
                                <ArrowDown size={18} />
                            </button>


                            <div
                                className={`about-progress-dots ${section2Opacity > 0.3
                                        ? "about-stagger-visible"
                                        : ""
                                    }`}
                                style={{
                                    transitionDelay: "350ms",
                                }}
                            >
                                <span className="active" />
                                <span />
                                <span />
                            </div>


                            <button
                                type="button"
                                className={`about-up-button ${section2Opacity > 0.3
                                        ? "about-stagger-visible"
                                        : ""
                                    }`}
                                style={{
                                    transitionDelay: "500ms",
                                }}
                                aria-label="Back upward"
                            >
                                <ChevronUp size={16} />
                            </button>

                        </div>

                    </section>


                    {/* =================================================
              SECTION 3
              ================================================= */}

                    <section
                        className="about-section about-section-three"
                        style={{
                            opacity: section3Opacity,
                        }}
                    >

                        <div className="about-section-three-content">

                            <p
                                className={`about-eyebrow ${section3Opacity > 0.3
                                        ? "about-stagger-visible"
                                        : ""
                                    }`}
                                style={{
                                    transitionDelay: "0ms",
                                }}
                            >
                                Halder | Nordvik
                            </p>

                            <h2
                                className={`about-section-three-heading ${section3Opacity > 0.3
                                        ? "about-stagger-visible"
                                        : ""
                                    }`}
                                style={{
                                    transitionDelay: "150ms",
                                }}
                            >
                                Fueling ambition,
                                <br />
                                shaping tomorrow.
                            </h2>


                            <div
                                className={`about-contact-row ${section3Opacity > 0.3
                                        ? "about-stagger-visible"
                                        : ""
                                    }`}
                                style={{
                                    transitionDelay: "300ms",
                                }}
                            >

                                <span>
                                    Contact Nordvik
                                </span>

                                <a
                                    href="/ReachUs"
                                    className="about-contact-button"
                                    aria-label="Contact Nordvik"
                                >
                                    <ArrowRight size={16} />
                                </a>

                            </div>

                        </div>

                    </section>

                </div>
            </div>


            {/* =====================================================
          MOBILE MENU OVERLAY
          ===================================================== */}

            <div
                className={`about-mobile-overlay ${mobileMenuOpen ? "is-open" : ""
                    }`}
                aria-hidden={!mobileMenuOpen}
            >

                <div className="about-mobile-panel">

                    <button
                        type="button"
                        className="about-mobile-close"
                        aria-label="Close menu"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <X size={18} />
                    </button>


                    <nav className="about-mobile-nav">

                        <a
                            href="/"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </a>

                        <a
                            href="/Studio"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Studio
                        </a>

                        <a
                            href="/About"
                            className="active"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </a>

                        <a
                            href="/Journal"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Journal
                        </a>

                        <a
                            href="/ReachUs"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Reach Us
                        </a>

                    </nav>


                    <div className="about-mobile-footer">

                        <a href="/Journal">
                            News
                        </a>

                        <a href="/ReachUs">
                            Contact
                        </a>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default About;