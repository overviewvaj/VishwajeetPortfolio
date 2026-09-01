import { useEffect, useRef, useState } from "react";
import "./Home.css";

function Home() {
    const videoRef = useRef<HTMLVideoElement>(null);

    
const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

/*
 * =========================================================
 * VIDEO BACKGROUND
 * =========================================================
 */

useEffect(() => {
    const video = videoRef.current;

    if (!video) {
        return;
    }

    const FADE_DURATION = 0.5;
    const RESTART_DELAY = 100;

    let animationFrameId: number | null = null;
    let restartTimeoutId: number | null = null;
    let isRestarting = false;

    /*
     * -----------------------------------------------------
     * VIDEO OPACITY / FADE CONTROL
     * -----------------------------------------------------
     */

    const updateVideoOpacity = () => {
        const currentVideo = videoRef.current;

        if (!currentVideo) {
            return;
        }

        if (
            !currentVideo.duration ||
            !Number.isFinite(currentVideo.duration)
        ) {
            animationFrameId =
                requestAnimationFrame(updateVideoOpacity);

            return;
        }

        const currentTime = currentVideo.currentTime;
        const duration = currentVideo.duration;

        let opacity = 1;

        /*
         * Fade in during the first 0.5 seconds.
         */
        if (currentTime < FADE_DURATION) {
            opacity =
                currentTime / FADE_DURATION;
        }

        /*
         * Fade out during the final 0.5 seconds.
         */
        else if (
            currentTime >
            duration - FADE_DURATION
        ) {
            opacity =
                (duration - currentTime) /
                FADE_DURATION;
        }

        /*
         * Keep opacity between 0 and 1.
         */
        opacity = Math.max(
            0,
            Math.min(1, opacity)
        );

        currentVideo.style.opacity =
            opacity.toString();

        animationFrameId =
            requestAnimationFrame(
                updateVideoOpacity
            );
    };

    /*
     * -----------------------------------------------------
     * VIDEO RESTART
     * -----------------------------------------------------
     */

    const handleVideoEnded = () => {
        const currentVideo = videoRef.current;

        if (!currentVideo || isRestarting) {
            return;
        }

        isRestarting = true;

        currentVideo.style.opacity = "0";

        restartTimeoutId =
            window.setTimeout(() => {
                const restartVideo =
                    videoRef.current;

                if (!restartVideo) {
                    isRestarting = false;
                    return;
                }

                restartVideo.currentTime = 0;

                const playPromise =
                    restartVideo.play();

                if (
                    playPromise !== undefined
                ) {
                    playPromise.catch(() => {
                        /*
                         * Browser autoplay restrictions
                         * may prevent playback.
                         */
                    });
                }

                isRestarting = false;
            }, RESTART_DELAY);
    };

    /*
     * -----------------------------------------------------
     * INITIAL VIDEO PLAYBACK
     * -----------------------------------------------------
     */

    const startVideo = () => {
        const currentVideo = videoRef.current;

        if (!currentVideo) {
            return;
        }

        currentVideo.style.opacity = "0";

        const playPromise =
            currentVideo.play();

        if (
            playPromise !== undefined
        ) {
            playPromise.catch(() => {
                /*
                 * Muted + playsInline video should
                 * normally be permitted to autoplay.
                 */
            });
        }

        if (animationFrameId === null) {
            animationFrameId =
                requestAnimationFrame(
                    updateVideoOpacity
                );
        }
    };

    /*
     * -----------------------------------------------------
     * VIDEO EVENTS
     * -----------------------------------------------------
     */

    video.addEventListener(
        "ended",
        handleVideoEnded
    );

    video.addEventListener(
        "loadedmetadata",
        startVideo,
        { once: true }
    );

    /*
     * If metadata has already loaded,
     * start immediately.
     */
    if (video.readyState >= 1) {
        startVideo();
    }

    /*
     * -----------------------------------------------------
     * CLEANUP
     * -----------------------------------------------------
     */

    return () => {
        video.removeEventListener(
            "ended",
            handleVideoEnded
        );

        video.removeEventListener(
            "loadedmetadata",
            startVideo
        );

        if (
            animationFrameId !== null
        ) {
            cancelAnimationFrame(
                animationFrameId
            );
        }

        if (
            restartTimeoutId !== null
        ) {
            clearTimeout(
                restartTimeoutId
            );
        }

        video.pause();
    };
}, []);

/*
 * =========================================================
 * MOBILE MENU
 * =========================================================
 */

const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
};

const toggleMobileMenu = () => {
    setIsMobileMenuOpen(
        (current) => !current
    );
};

/*
 * ---------------------------------------------------------
 * CLOSE MOBILE MENU WITH ESCAPE
 * ---------------------------------------------------------
 */

useEffect(() => {
    if (!isMobileMenuOpen) {
        return;
    }

    const handleEscape = (
        event: KeyboardEvent
    ) => {
        if (event.key === "Escape") {
            closeMobileMenu();
        }
    };

    document.addEventListener(
        "keydown",
        handleEscape
    );

    /*
     * Prevent background page scrolling
     * while the drawer is open.
     */
    document.body.style.overflow = "hidden";

    return () => {
        document.removeEventListener(
            "keydown",
            handleEscape
        );

        document.body.style.overflow = "";
    };
}, [isMobileMenuOpen]);

/*
 * =========================================================
 * RENDER
 * =========================================================
 */

return (
    <main
        className="home-page"
        id="home"
    >
        {/* =================================================
            CINEMATIC VIDEO BACKGROUND
        ================================================= */}

        <div
            className="home-video-layer"
            aria-hidden="true"
        >
            <video
                ref={videoRef}
                id="heroVideo"
                className="hero-video"
                muted
                playsInline
                preload="auto"
            >
                <source
                    src="/videos/video2.mp4"
                    type="video/mp4"
                />
            </video>

            <div className="video-overlay"></div>
        </div>

        {/* =================================================
            HEADER / NAVIGATION
        ================================================= */}

        <header className="home-header">

            {/* Brand */}

            <a
                className="site-brand"
                href="/"
                aria-label="Vishwajeet Joshi home"
            >
                Vishwajeet Joshi
            </a>

            {/* Desktop Navigation */}

            <nav
                className="desktop-nav"
                aria-label="Primary navigation"
            >
                <a
                    href="/"
                    className="active"
                >
                    Home
                </a>

                <a href="/Studio">
                    Studio
                </a>

                <a href="/About">
                    About
                </a>

                <a href="/Journal">
                    Journal
                </a>

                <a href="/ReachUs">
                    Reach Us
                </a>
            </nav>

            {/* Desktop CTA */}

            <a
                className="header-cta"
                href="/ReachUs"
            >
                Begin Journey
            </a>

            {/* Mobile Menu Button */}

            <button
                className={`mobile-menu-button ${
        isMobileMenuOpen
            ? "is-open"
            : ""
    } `}
                type="button"
                aria-label={
                    isMobileMenuOpen
                        ? "Close navigation"
                        : "Open navigation"
                }
                aria-expanded={
                    isMobileMenuOpen
                }
                aria-controls="mobileDrawer"
                onClick={toggleMobileMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

        </header>

        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <section
            className="home-hero"
            aria-labelledby="hero-heading"
        >
            <div className="hero-content">

                <p className="hero-eyebrow">
                    Data • Analytics • Regulatory
                    Technology • AI
                </p>

                <h1
                    id="hero-heading"
                    className="hero-heading"
                >
                    Beyond{" "}
                    <em>data,</em>
                    {" "}we build{" "}
                    <em>systems</em>
                    {" "}that matter.
                </h1>

                <p className="hero-description">
                    Building intelligent data
                    platforms, regulatory technology,
                    and AI-driven solutions where
                    complex information becomes clear,
                    actionable decisions.
                </p>

                <a
                    className="hero-cta"
                    href="/About"
                >
                    Begin Journey
                </a>

            </div>

            {/* =================================================
                HERO META
            ================================================= */}

            <div className="hero-meta">

                <div className="hero-meta-left">

                    <span>
                        London / India
                    </span>

                    <span>
                        Data &amp; Regulatory
                        Technology
                    </span>

                </div>

                <div className="hero-meta-right">

                    <span>
                        Scroll to explore
                    </span>

                    <span
                        className="scroll-arrow"
                        aria-hidden="true"
                    >
                        ↓
                    </span>

                </div>

            </div>

        </section>

        {/* =================================================
            MOBILE DRAWER
        ================================================= */}

        <aside
            className={`mobile-drawer ${
        isMobileMenuOpen
            ? "is-open"
            : ""
    } `}
            id="mobileDrawer"
            aria-hidden={
                !isMobileMenuOpen
            }
        >
            <div className="mobile-drawer-content">

                {/* Close Button */}

                <button
                    className="mobile-close"
                    type="button"
                    aria-label="Close navigation"
                    onClick={closeMobileMenu}
                >
                    <span></span>
                    <span></span>
                </button>

                {/* Mobile Brand */}

                <div className="mobile-drawer-brand">
                    Vishwajeet Joshi
                </div>

                {/* Mobile Navigation */}

                <nav
                    className="mobile-nav"
                    aria-label="Mobile navigation"
                >
                    <a
                        href="/"
                        onClick={closeMobileMenu}
                    >
                        Home
                    </a>

                    <a
                        href="/Studio"
                        onClick={closeMobileMenu}
                    >
                        Studio
                    </a>

                    <a
                        href="/About"
                        onClick={closeMobileMenu}
                    >
                        About
                    </a>

                    <a
                        href="/Journal"
                        onClick={closeMobileMenu}
                    >
                        Journal
                    </a>

                    <a
                        href="/ReachUs"
                        onClick={closeMobileMenu}
                    >
                        Reach Us
                    </a>
                </nav>

                {/* Professional Links */}

                <div className="mobile-links">

                    <span className="mobile-links-label">
                        Connect
                    </span>

                    <a
                        href="https://www.linkedin.com/in/vishwajeet--joshi/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                    </a>

                    <a
                        href="https://github.com/overviewvaj"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>

                    <a
                        href="https://medium.com/@vishwajeetjoshi6"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Medium
                    </a>

                </div>

            </div>
        </aside>

    </main>
);


}

export default Home;
