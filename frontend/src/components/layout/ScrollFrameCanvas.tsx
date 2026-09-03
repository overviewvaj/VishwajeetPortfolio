import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import "./ScrollFrameCanvas.css";

interface ScrollFrameCanvasProps {
    frameCount?: number;
    framePath?: string;
    scrollHeight?: string;
    lerp?: number;
    className?: string;
    showLoader?: boolean;
    onLoadingComplete?: () => void;
}

const DEFAULT_FRAME_COUNT = 300;

const DEFAULT_FRAME_PATH =
    "/frames/ezgif-frame-{index}.jpg";

const DEFAULT_SCROLL_HEIGHT = "500vh";

const DEFAULT_LERP = 0.09;

const globalFrameCache = new Map<string, Array<HTMLImageElement | null>>();

function buildFramePath(
    pattern: string,
    frameNumber: number,
): string {
    const paddedIndex =
        String(frameNumber).padStart(3, "0");

    return pattern.replace(
        "{index}",
        paddedIndex,
    );
}

function ScrollFrameCanvas({
    frameCount = DEFAULT_FRAME_COUNT,
    framePath = DEFAULT_FRAME_PATH,
    scrollHeight = DEFAULT_SCROLL_HEIGHT,
    lerp = DEFAULT_LERP,
    className = "",
    showLoader = false,
    onLoadingComplete,
}: ScrollFrameCanvasProps) {
    const canvasRef =
        useRef<HTMLCanvasElement | null>(
            null,
        );

    const contextRef =
        useRef<CanvasRenderingContext2D | null>(
            null,
        );

    const imagesRef =
        useRef<
            Array<HTMLImageElement | null>
        >([]);

    const loadedCountRef =
        useRef(0);

    const targetFrameRef =
        useRef(0);

    const currentFrameRef =
        useRef(0);

    const renderedFrameRef =
        useRef(-1);

    const animationFrameRef =
        useRef<number | null>(null);

    const resizeFrameRef =
        useRef<number | null>(null);

    const mountedRef =
        useRef(true);

    const [loadingProgress, setLoadingProgress] =
        useState(0);

    const [isLoaded, setIsLoaded] =
        useState(false);

    const [reducedMotion, setReducedMotion] =
        useState(false);

    /*
     * ------------------------------------------------
     * DRAW FRAME
     * ------------------------------------------------
     */

    const drawFrame =
        useCallback(
            (index: number) => {
                const canvas =
                    canvasRef.current;

                const context =
                    contextRef.current;

                if (
                    !canvas ||
                    !context
                ) {
                    return;
                }

                const image =
                    imagesRef.current[
                    index
                    ];

                if (
                    !image ||
                    !image.complete ||
                    image.naturalWidth === 0
                ) {
                    return;
                }

                const viewportWidth =
                    window.innerWidth;

                const viewportHeight =
                    window.innerHeight;

                if (
                    viewportWidth <= 0 ||
                    viewportHeight <= 0
                ) {
                    return;
                }

                /*
                 * The canvas backing store is
                 * already scaled for DPR.
                 *
                 * Reset the transform so that
                 * drawing coordinates remain in
                 * CSS pixels.
                 */
                const dpr = Math.min(
                    window.devicePixelRatio ||
                    1,
                    2,
                );

                context.setTransform(
                    dpr,
                    0,
                    0,
                    dpr,
                    0,
                    0,
                );

                context.clearRect(
                    0,
                    0,
                    viewportWidth,
                    viewportHeight,
                );

                const imageWidth =
                    image.naturalWidth;

                const imageHeight =
                    image.naturalHeight;

                /*
                 * Cover behaviour.
                 *
                 * The frame fills the entire
                 * viewport while maintaining
                 * its original aspect ratio.
                 */
                const scale =
                    Math.max(
                        viewportWidth /
                        imageWidth,
                        viewportHeight /
                        imageHeight,
                    );

                const drawWidth =
                    imageWidth * scale;

                const drawHeight =
                    imageHeight * scale;

                const offsetX =
                    (viewportWidth -
                        drawWidth) /
                    2;

                const offsetY =
                    (viewportHeight -
                        drawHeight) /
                    2;

                context.imageSmoothingEnabled =
                    true;

                context.imageSmoothingQuality =
                    "high";

                context.drawImage(
                    image,
                    offsetX,
                    offsetY,
                    drawWidth,
                    drawHeight,
                );

                renderedFrameRef.current =
                    index;
            },
            [],
        );

    /*
     * ------------------------------------------------
     * RESIZE CANVAS
     * ------------------------------------------------
     */

    const resizeCanvas =
        useCallback(() => {
            const canvas =
                canvasRef.current;

            const context =
                contextRef.current;

            if (
                !canvas ||
                !context
            ) {
                return;
            }

            const dpr = Math.min(
                window.devicePixelRatio ||
                1,
                2,
            );

            const width =
                window.innerWidth;

            const height =
                window.innerHeight;

            canvas.width =
                Math.round(
                    width * dpr,
                );

            canvas.height =
                Math.round(
                    height * dpr,
                );

            canvas.style.width =
                `${width}px`;

            canvas.style.height =
                `${height}px`;

            context.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0,
            );

            context.clearRect(
                0,
                0,
                width,
                height,
            );

            const currentIndex =
                Math.min(
                    Math.max(
                        Math.round(
                            currentFrameRef.current,
                        ),
                        0,
                    ),
                    Math.max(
                        frameCount - 1,
                        0,
                    ),
                );

            const image =
                imagesRef.current[
                currentIndex
                ];

            if (image) {
                drawFrame(
                    currentIndex,
                );
            }
        }, [
            drawFrame,
            frameCount,
        ]);

    /*
     * ------------------------------------------------
     * SCROLL TARGET
     * ------------------------------------------------
     */

    const updateScrollTarget =
        useCallback(() => {
            const maxScroll =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;

            if (maxScroll <= 0) {
                targetFrameRef.current =
                    0;

                return;
            }

            const scrollY =
                window.scrollY;

            const progress =
                Math.min(
                    Math.max(
                        scrollY /
                        maxScroll,
                        0,
                    ),
                    1,
                );

            targetFrameRef.current =
                progress *
                Math.max(
                    frameCount - 1,
                    0,
                );
        }, [frameCount]);

    /*
     * ------------------------------------------------
     * REDUCED MOTION
     * ------------------------------------------------
     */

    useEffect(() => {
        const mediaQuery =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            );

        const updateMotionPreference =
            () => {
                setReducedMotion(
                    mediaQuery.matches,
                );
            };

        updateMotionPreference();

        mediaQuery.addEventListener(
            "change",
            updateMotionPreference,
        );

        return () => {
            mediaQuery.removeEventListener(
                "change",
                updateMotionPreference,
            );
        };
    }, []);

    /*
     * ------------------------------------------------
     * CANVAS INITIALISATION
     * ------------------------------------------------
     */

    useEffect(() => {
        const canvas =
            canvasRef.current;

        if (!canvas) {
            return;
        }

        const context =
            canvas.getContext(
                "2d",
                {
                    alpha: false,
                },
            );

        if (!context) {
            return;
        }

        contextRef.current =
            context;

        resizeCanvas();

        const handleResize =
            () => {
                if (
                    resizeFrameRef.current !==
                    null
                ) {
                    cancelAnimationFrame(
                        resizeFrameRef.current,
                    );
                }

                resizeFrameRef.current =
                    requestAnimationFrame(
                        () => {
                            resizeFrameRef.current =
                                null;

                            resizeCanvas();
                        },
                    );
            };

        window.addEventListener(
            "resize",
            handleResize,
            {
                passive: true,
            },
        );

        return () => {
            window.removeEventListener(
                "resize",
                handleResize,
            );

            if (
                resizeFrameRef.current !==
                null
            ) {
                cancelAnimationFrame(
                    resizeFrameRef.current,
                );

                resizeFrameRef.current =
                    null;
            }

            contextRef.current =
                null;
        };
    }, [resizeCanvas]);

    /*
     * ------------------------------------------------
     * FRAME PRELOADER
     * ------------------------------------------------
     */

    useEffect(() => {
        let cancelled = false;

        const cachedImages = globalFrameCache.get(framePath);
        if (cachedImages && cachedImages[0]) {
            imagesRef.current = cachedImages;
            currentFrameRef.current = 0;
            targetFrameRef.current = 0;
            drawFrame(0);
            setIsLoaded(true);
            setLoadingProgress(100);
            onLoadingComplete?.();
            return;
        }

        const images =
            new Array<
                HTMLImageElement | null
            >(frameCount).fill(null);

        imagesRef.current =
            images;
        globalFrameCache.set(framePath, images);

        loadedCountRef.current =
            0;

        setLoadingProgress(0);
        setIsLoaded(false);

        const updateProgress =
            () => {
                if (
                    cancelled ||
                    !mountedRef.current
                ) {
                    return;
                }

                const progress =
                    Math.floor(
                        (
                            loadedCountRef.current /
                            frameCount
                        ) * 100,
                    );

                setLoadingProgress(
                    Math.min(
                        Math.max(
                            progress,
                            0,
                        ),
                        100,
                    ),
                );
            };

        const loadFrame =
            (
                frameNumber: number,
            ): Promise<void> => {
                return new Promise(
                    (resolve) => {
                        if (
                            cancelled
                        ) {
                            resolve();

                            return;
                        }

                        const image =
                            new Image();

                        image.decoding =
                            "async";

                        const finish =
                            () => {
                                if (
                                    cancelled
                                ) {
                                    resolve();

                                    return;
                                }

                                images[
                                    frameNumber -
                                    1
                                ] = image;

                                loadedCountRef.current +=
                                    1;

                                updateProgress();

                                resolve();
                            };

                        image.onload =
                            finish;

                        image.onerror =
                            finish;

                        image.src =
                            buildFramePath(
                                framePath,
                                frameNumber,
                            );
                    },
                );
            };

        const loadAllFrames =
            async () => {
                /*
                 * ------------------------------------
                 * FIRST FRAME
                 * ------------------------------------
                 *
                 * Load frame 001 separately so
                 * something can appear immediately.
                 */

                await loadFrame(1);

                if (
                    cancelled ||
                    !mountedRef.current
                ) {
                    return;
                }

                currentFrameRef.current =
                    0;

                targetFrameRef.current =
                    0;

                drawFrame(0);

                /* Reveal content immediately once first frame is ready */
                setIsLoaded(true);
                onLoadingComplete?.();

                /*
                 * ------------------------------------
                 * REMAINING FRAMES
                 * ------------------------------------
                 *
                 * Load up to 16 frames concurrently.
                 */

                const concurrency =
                    Math.min(
                        16,
                        Math.max(
                            frameCount - 1,
                            1,
                        ),
                    );

                let nextFrame =
                    2;

                const worker =
                    async () => {
                        while (
                            !cancelled
                        ) {
                            const frameNumber =
                                nextFrame;

                            nextFrame +=
                                1;

                            if (
                                frameNumber >
                                frameCount
                            ) {
                                return;
                            }

                            await loadFrame(
                                frameNumber,
                            );
                        }
                    };

                await Promise.all(
                    Array.from(
                        {
                            length:
                                concurrency,
                        },
                        () =>
                            worker(),
                    ),
                );

                if (
                    cancelled ||
                    !mountedRef.current
                ) {
                    return;
                }

                setLoadingProgress(
                    100,
                );

                setIsLoaded(
                    true,
                );

                onLoadingComplete?.();
            };

        void loadAllFrames();

        return () => {
            cancelled = true;

            imagesRef.current =
                [];

            loadedCountRef.current =
                0;
        };
    }, [
        frameCount,
        framePath,
        drawFrame,
        onLoadingComplete,
    ]);

    /*
     * ------------------------------------------------
     * SCROLL LISTENER
     * ------------------------------------------------
     */

    useEffect(() => {
        updateScrollTarget();

        const handleScroll =
            () => {
                updateScrollTarget();
            };

        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true,
            },
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll,
            );
        };
    }, [
        updateScrollTarget,
    ]);

    /*
     * ------------------------------------------------
     * RENDER LOOP
     * ------------------------------------------------
     */

    useEffect(() => {
        const renderLoop =
            () => {
                const target =
                    targetFrameRef.current;

                const current =
                    currentFrameRef.current;

                if (reducedMotion) {
                    currentFrameRef.current =
                        target;
                } else {
                    const difference =
                        target -
                        current;

                    if (
                        Math.abs(
                            difference,
                        ) >
                        0.0001
                    ) {
                        currentFrameRef.current =
                            current +
                            difference *
                            lerp;
                    } else {
                        currentFrameRef.current =
                            target;
                    }
                }

                const frameIndex =
                    Math.min(
                        Math.max(
                            Math.round(
                                currentFrameRef.current,
                            ),
                            0,
                        ),
                        Math.max(
                            frameCount - 1,
                            0,
                        ),
                    );

                const image =
                    imagesRef.current[
                    frameIndex
                    ];

                if (
                    image &&
                    frameIndex !==
                    renderedFrameRef.current
                ) {
                    drawFrame(
                        frameIndex,
                    );
                }

                animationFrameRef.current =
                    requestAnimationFrame(
                        renderLoop,
                    );
            };

        animationFrameRef.current =
            requestAnimationFrame(
                renderLoop,
            );

        return () => {
            if (
                animationFrameRef.current !==
                null
            ) {
                cancelAnimationFrame(
                    animationFrameRef.current,
                );

                animationFrameRef.current =
                    null;
            }
        };
    }, [
        drawFrame,
        frameCount,
        lerp,
        reducedMotion,
    ]);

    /*
     * ------------------------------------------------
     * MOUNT STATE
     * ------------------------------------------------
     */

    useEffect(() => {
        mountedRef.current =
            true;

        return () => {
            mountedRef.current =
                false;
        };
    }, []);

    /*
     * ------------------------------------------------
     * RENDER
     * ------------------------------------------------
     */

    return (
        <div
            className={`scroll-frame-canvas ${className}`.trim()}
            style={{
                height: scrollHeight,
            }}
        >
            <div className="scroll-frame-canvas__viewport">
                <canvas
                    ref={canvasRef}
                    className="scroll-frame-canvas__canvas"
                    aria-hidden="true"
                />
            </div>

            {showLoader && (
                <div
                    className={`scroll-frame-canvas__loader ${isLoaded
                            ? "scroll-frame-canvas__loader--loaded"
                            : ""
                        }`}
                    aria-hidden={isLoaded}
                >
                    <div className="scroll-frame-canvas__loader-content">
                        <div className="scroll-frame-canvas__loader-glow" />

                        <div className="scroll-frame-canvas__loader-label">
                            INITIALIZING SEQUENCE
                        </div>

                        <div className="scroll-frame-canvas__progress-track">
                            <div
                                className="scroll-frame-canvas__progress-fill"
                                style={{
                                    width: `${loadingProgress}%`,
                                }}
                            />
                        </div>

                        <div className="scroll-frame-canvas__progress-text">
                            {loadingProgress}%
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ScrollFrameCanvas;