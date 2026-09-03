import {
    useEffect,
    useState,
} from "react";

import "./SiteHeader.css";

function SiteHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] =
        useState(false);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(
            (current) => !current,
        );
    };

    /*
     * =========================================================
     * MOBILE MENU — ESCAPE + SCROLL LOCK
     * =========================================================
     */

    useEffect(() => {
        if (!isMobileMenuOpen) {
            return;
        }

        const handleEscape = (
            event: KeyboardEvent,
        ) => {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        };

        document.addEventListener(
            "keydown",
            handleEscape,
        );

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener(
                "keydown",
                handleEscape,
            );

            document.body.style.overflow =
                previousOverflow;
        };
    }, [isMobileMenuOpen]);

    /*
     * =========================================================
     * RENDER
     * =========================================================
     */

    return (
        <>
            {/* =================================================
                DESKTOP / PRIMARY HEADER
            ================================================= */}

            <header className="site-header">
                {/* Brand */}

                <a
                    className="site-header__brand"
                    href="/"
                    aria-label="Vishwajeet Joshi home"
                >
                    Vishwajeet Joshi
                </a>

                {/* Desktop Navigation */}

                <nav
                    className="site-header__desktop-nav"
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

                    <a href="/work">
                        Work
                    </a>

                    <a href="/About">
                        About
                    </a>

                    <a href="/Journal">
                        Journal
                    </a>

                    <a href="/Contact">
                        Contact
                    </a>
                </nav>

                {/* Mobile Menu Button */}

                <button
                    className={`site-header__mobile-button ${isMobileMenuOpen
                            ? "is-open"
                            : ""
                        }`}
                    type="button"
                    aria-label={
                        isMobileMenuOpen
                            ? "Close navigation"
                            : "Open navigation"
                    }
                    aria-expanded={
                        isMobileMenuOpen
                    }
                    aria-controls="site-mobile-drawer"
                    onClick={
                        toggleMobileMenu
                    }
                >
                    <span />
                    <span />
                    <span />
                </button>
            </header>

            {/* =================================================
                MOBILE DRAWER
            ================================================= */}

            <aside
                className={`site-mobile-drawer ${isMobileMenuOpen
                        ? "is-open"
                        : ""
                    }`}
                id="site-mobile-drawer"
                aria-hidden={
                    !isMobileMenuOpen
                }
            >
                <div className="site-mobile-drawer__content">
                    {/* Close Button */}

                    <button
                        className="site-mobile-drawer__close"
                        type="button"
                        aria-label="Close navigation"
                        onClick={
                            closeMobileMenu
                        }
                    >
                        <span />
                        <span />
                    </button>

                    {/* Mobile Brand */}

                    <div className="site-mobile-drawer__brand">
                        Vishwajeet Joshi
                    </div>

                    {/* Mobile Navigation */}

                    <nav
                        className="site-mobile-drawer__nav"
                        aria-label="Mobile navigation"
                    >
                        <a
                            href="/"
                            onClick={
                                closeMobileMenu
                            }
                        >
                            Home
                        </a>

                        <a
                            href="/Studio"
                            onClick={
                                closeMobileMenu
                            }
                        >
                            Studio
                        </a>

                        <a
                            href="/work"
                            onClick={
                                closeMobileMenu
                            }
                        >
                            Work
                        </a>

                        <a
                            href="/About"
                            onClick={
                                closeMobileMenu
                            }
                        >
                            About
                        </a>

                        <a
                            href="/Journal"
                            onClick={
                                closeMobileMenu
                            }
                        >
                            Journal
                        </a>

                        <a
                            href="/Contact"
                            onClick={
                                closeMobileMenu
                            }
                        >
                            Contact
                        </a>
                    </nav>

                    {/* Professional Links */}

                    <div className="site-mobile-drawer__links">
                        <span className="site-mobile-drawer__links-label">
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
        </>
    );
}

export default SiteHeader;