import {
    useCallback,
    useEffect,
    useState,
    type CSSProperties,
    type ReactNode,
} from "react";

import ScrollFrameCanvas from "./ScrollFrameCanvas";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

import "./ScrollFrameLayout.css";

interface ScrollFrameLayoutProps {
    children: ReactNode;

    frameCount?: number;

    framePath?: string;

    scrollHeight?: string;

    lerp?: number;

    className?: string;

    contentClassName?: string;

    showCanvas?: boolean;

    showHeader?: boolean;

    showFooter?: boolean;

    canvasZIndex?: number;

    contentZIndex?: number;

    onLoadingComplete?: () => void;

    noScroll?: boolean;

    showLoader?: boolean;
}

function ScrollFrameLayout({
    children,
    frameCount = 300,
    framePath = "/frames/ezgif-frame-{index}.jpg",
    scrollHeight = "500vh",
    lerp = 0.09,
    className = "",
    contentClassName = "",
    showCanvas = true,
    showHeader = true,
    showFooter = true,
    canvasZIndex = 1,
    contentZIndex = 10,
    onLoadingComplete,
    noScroll = false,
    showLoader = false,
}: ScrollFrameLayoutProps) {
    const isNoScroll =
        noScroll ||
        scrollHeight === "100vh" ||
        scrollHeight === "100%" ||
        scrollHeight === "none" ||
        scrollHeight === "auto" ||
        !showCanvas;

    const effectiveScrollHeight = isNoScroll ? "100vh" : scrollHeight;

    const [isLoaded, setIsLoaded] = useState(false);

    const handleLoadingComplete = useCallback(() => {
        setIsLoaded(true);
        onLoadingComplete?.();
    }, [onLoadingComplete]);

    useEffect(() => {
        /* Reveal page content immediately on mount so reveal animations play without delay */
        const timer = window.setTimeout(() => {
            setIsLoaded(true);
        }, 50);

        return () => {
            window.clearTimeout(timer);
        };
    }, []);

    const layoutStyle: CSSProperties = {
        position: "relative",
        width: "100%",
        minHeight: "100vh",
    };

    const canvasLayerStyle: CSSProperties = {
        position: "relative",
        zIndex: canvasZIndex,
    };

    const contentLayerStyle: CSSProperties = {
        position: "relative",
        zIndex: contentZIndex,
        width: "100%",
    };

    return (
        <main
            className={`scroll-frame-layout ${isLoaded ? "is-loaded" : "is-loading"} ${isNoScroll ? "scroll-frame-layout--no-scroll" : "scroll-frame-layout--has-scroll"} ${className}`.trim()}
            style={layoutStyle}
        >
            {showCanvas && (
                <div
                    className="scroll-frame-layout__canvas"
                    style={canvasLayerStyle}
                >
                    <ScrollFrameCanvas
                        frameCount={frameCount}
                        framePath={framePath}
                        scrollHeight={effectiveScrollHeight}
                        lerp={lerp}
                        showLoader={showLoader}
                        onLoadingComplete={handleLoadingComplete}
                    />
                </div>
            )}

            {showHeader && (
                <SiteHeader />
            )}

            <div
                className={`scroll-frame-layout__content ${contentClassName}`.trim()}
                style={contentLayerStyle}
            >
                {children}

                {showFooter && (
                    <SiteFooter />
                )}
            </div>
        </main>
    );
}

export default ScrollFrameLayout;