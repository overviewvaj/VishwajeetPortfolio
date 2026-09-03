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
}: ScrollFrameLayoutProps) {
    const isNoScroll =
        noScroll ||
        scrollHeight === "100vh" ||
        scrollHeight === "100%" ||
        scrollHeight === "none" ||
        scrollHeight === "auto" ||
        !showCanvas;

    const effectiveScrollHeight = isNoScroll ? "100vh" : scrollHeight;

    const [isLoaded, setIsLoaded] = useState(!showCanvas);

    const handleLoadingComplete = useCallback(() => {
        setIsLoaded(true);
        onLoadingComplete?.();
    }, [onLoadingComplete]);

    useEffect(() => {
        if (!showCanvas) {
            setIsLoaded(true);
            return;
        }

        /*
         * Safety fallback: if canvas preloading takes longer than 3.5s
         * or encounters network stalls, reveal page content gracefully.
         */
        const fallbackTimer = window.setTimeout(() => {
            setIsLoaded(true);
        }, 3500);

        return () => {
            window.clearTimeout(fallbackTimer);
        };
    }, [showCanvas]);

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