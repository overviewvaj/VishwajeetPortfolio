import {
    useEffect,
    useState,
} from "react";
import { Link, useLocation } from "react-router-dom";

import "./SiteHeader.css";

function SiteHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] =
        useState(false);

    const location = useLocation();
    const currentPath = location.pathname.toLowerCase();

    const isHome = currentPath === "/";
    const isStudio = currentPath === "/studio";
    const isWork = currentPath.startsWith("/work");
    const isAbout = currentPath === "/about";
    const isJournal = currentPath === "/journal";
    const isContact = currentPath === "/contact";

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

                <Link
                    className="site-header__brand"
                    to="/"
                    aria-label="Vishwajeet Joshi home"
                >
                    Vishwajeet Joshi
                </Link>

                {/* Desktop Navigation */}

                <nav
                    className="site-header__desktop-nav"
                    aria-label="Primary navigation"
                >
                    <Link
                        to="/"
                        className={isHome ? "active" : ""}
                    >
                        Home
                    </Link>

                    <Link
                        to="/Studio"
                        className={isStudio ? "active" : ""}
                    >
                        Studio
                    </Link>

                    <Link
                        to="/work"
                        className={isWork ? "active" : ""}
                    >
                        Work
                    </Link>

                    <Link
                        to="/About"
                        className={isAbout ? "active" : ""}
                    >
                        About
                    </Link>

                    <Link
                        to="/Journal"
                        className={isJournal ? "active" : ""}
                    >
                        Journal
                    </Link>

                    <Link
                        to="/Contact"
                        className={isContact ? "active" : ""}
                    >
                        Contact
                    </Link>
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
                        <Link
                            to="/"
                            className={isHome ? "active" : ""}
                            onClick={
                                closeMobileMenu
                            }
                        >
                            Home
                        </Link>

                        <Link
                            to="/Studio"
                            className={isStudio ? "active" : ""}
                            onClick={
                                closeMobileMenu
                            }
                        >
                            Studio
                        </Link>

                        <Link
                            to="/work"
                            className={isWork ? "active" : ""}
                            onClick={
                                closeMobileMenu
                            }
                        >
                            Work
                        </Link>

                        <Link
                            to="/About"
                            className={isAbout ? "active" : ""}
                            onClick={
                                closeMobileMenu
                            }
                        >
                            About
                        </Link>

                        <Link
                            to="/Journal"
                            className={isJournal ? "active" : ""}
                            onClick={
                                closeMobileMenu
                            }
                        >
                            Journal
                        </Link>

                        <Link
                            to="/Contact"
                            className={isContact ? "active" : ""}
                            onClick={
                                closeMobileMenu
                            }
                        >
                            Contact
                        </Link>
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