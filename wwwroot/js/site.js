/* =========================================================
   VISHWAJEET JOSHI — GLOBAL SITE JAVASCRIPT
   CINEMATIC HERO VIDEO ENGINE
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       DOM READY
       ===================================================== */

    document.addEventListener("DOMContentLoaded", function () {

        initialiseHeroVideo();

    });


    /* =====================================================
       CINEMATIC HERO VIDEO
       ===================================================== */

    function initialiseHeroVideo() {

        const video =
            document.getElementById("heroVideo");


        if (!video) {
            return;
        }


        /* =================================================
           CONFIGURATION
           ================================================= */

        const FADE_DURATION = 0.5;

        const RESTART_DELAY = 100;


        /* =================================================
           VIDEO CONFIGURATION
           ================================================= */

        video.muted = true;

        video.playsInline = true;

        video.autoplay = true;

        video.controls = false;

        video.setAttribute("muted", "");

        video.setAttribute("playsinline", "");

        video.setAttribute("autoplay", "");

        video.removeAttribute("controls");


        /* =================================================
           REDUCED MOTION
           ================================================= */

        const reducedMotionQuery =
            window.matchMedia
                ? window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                )
                : null;


        let reducedMotion =
            reducedMotionQuery
                ? reducedMotionQuery.matches
                : false;


        /* =================================================
           STATE
           ================================================= */

        let animationFrameId = null;

        let restartTimeoutId = null;

        let started = false;

        let destroyed = false;


        /* =================================================
           OPACITY
           ================================================= */

        function setOpacity(value) {

            const safeValue =
                Math.max(
                    0,
                    Math.min(1, value)
                );


            video.style.opacity =
                safeValue.toString();

        }


        /* =================================================
           STOP ANIMATION MONITOR
           ================================================= */

        function stopMonitor() {

            if (animationFrameId !== null) {

                cancelAnimationFrame(
                    animationFrameId
                );

                animationFrameId = null;

            }

        }


        /* =================================================
           PLAY VIDEO
           ================================================= */

        function playVideo() {

            if (destroyed) {
                return;
            }


            const promise =
                video.play();


            if (
                promise &&
                typeof promise.catch === "function"
            ) {

                promise.catch(function (error) {

                    /*
                     * Autoplay can be blocked by a browser.
                     *
                     * The video is muted, so this should
                     * normally not occur.
                     */

                    console.warn(
                        "Hero video autoplay was prevented.",
                        error
                    );

                });

            }

        }


        /* =================================================
           FADE MONITOR
           ================================================= */

        function monitorVideo() {

            if (destroyed) {
                return;
            }


            /*
             * Wait until the browser knows the duration.
             */

            if (
                !video.duration ||
                !isFinite(video.duration)
            ) {

                animationFrameId =
                    requestAnimationFrame(
                        monitorVideo
                    );

                return;

            }


            const currentTime =
                video.currentTime;


            const duration =
                video.duration;


            /* =================================================
               FADE IN
               ================================================= */

            if (currentTime < FADE_DURATION) {

                const progress =
                    currentTime /
                    FADE_DURATION;


                setOpacity(progress);

            }


            /* =================================================
               FADE OUT
               ================================================= */

            const remaining =
                duration -
                currentTime;


            if (remaining <= FADE_DURATION) {

                const progress =
                    remaining /
                    FADE_DURATION;


                setOpacity(progress);

            }


            /* =================================================
               CONTINUE MONITORING
               ================================================= */

            animationFrameId =
                requestAnimationFrame(
                    monitorVideo
                );

        }


        /* =================================================
           START MONITORING
           ================================================= */

        function startMonitor() {

            if (reducedMotion) {

                setOpacity(1);

                return;

            }


            stopMonitor();


            animationFrameId =
                requestAnimationFrame(
                    monitorVideo
                );

        }


        /* =================================================
           VIDEO ENDED
           ================================================= */

        function handleVideoEnded() {

            if (destroyed) {
                return;
            }


            stopMonitor();


            /*
             * Hide video completely.
             */

            setOpacity(0);


            /*
             * Clear an existing restart timer.
             */

            if (restartTimeoutId !== null) {

                clearTimeout(
                    restartTimeoutId
                );

            }


            /*
             * Restart after 100ms.
             */

            restartTimeoutId =
                window.setTimeout(
                    function () {

                        if (destroyed) {
                            return;
                        }


                        try {

                            video.currentTime = 0;

                        }
                        catch (error) {

                            console.warn(
                                "Unable to reset hero video.",
                                error
                            );

                        }


                        playVideo();


                        if (reducedMotion) {

                            setOpacity(1);

                        }
                        else {

                            startMonitor();

                        }

                    },
                    RESTART_DELAY
                );

        }


        /* =================================================
           VIDEO READY
           ================================================= */

        function handleVideoReady() {

            if (started || destroyed) {
                return;
            }


            started = true;


            /*
             * Always start from the beginning.
             */

            try {

                video.currentTime = 0;

            }
            catch (error) {

                console.warn(
                    "Unable to initialise hero video.",
                    error
                );

            }


            /*
             * Reduced motion:
             * display video immediately.
             */

            if (reducedMotion) {

                setOpacity(1);

            }
            else {

                setOpacity(0);

            }


            /*
             * Start playback.
             */

            playVideo();


            /*
             * Start fade engine.
             */

            startMonitor();

        }


        /* =================================================
           VIDEO EVENTS
           ================================================= */

        video.addEventListener(
            "loadedmetadata",
            handleVideoReady
        );


        video.addEventListener(
            "ended",
            handleVideoEnded
        );


        /* =================================================
           PLAYING EVENT
           ================================================= */

        video.addEventListener(
            "playing",
            function () {

                if (!started) {

                    handleVideoReady();

                }

            }
        );


        /* =================================================
           REDUCED MOTION CHANGES
           ================================================= */

        if (reducedMotionQuery) {

            const handleMotionChange =
                function (event) {

                    reducedMotion =
                        event.matches;


                    if (reducedMotion) {

                        stopMonitor();

                        setOpacity(1);

                    }
                    else {

                        startMonitor();

                    }

                };


            if (
                typeof reducedMotionQuery.addEventListener ===
                "function"
            ) {

                reducedMotionQuery.addEventListener(
                    "change",
                    handleMotionChange
                );

            }
            else if (
                typeof reducedMotionQuery.addListener ===
                "function"
            ) {

                reducedMotionQuery.addListener(
                    handleMotionChange
                );

            }

        }


        /* =================================================
           TAB VISIBILITY
           ================================================= */

        document.addEventListener(
            "visibilitychange",
            function () {

                if (document.hidden) {

                    stopMonitor();

                    return;

                }


                /*
                 * Resume playback when returning
                 * to the browser tab.
                 */

                if (
                    video.paused &&
                    video.readyState >= 2
                ) {

                    playVideo();

                }


                if (!reducedMotion) {

                    startMonitor();

                }

            }
        );


        /* =================================================
           CLEANUP
           ================================================= */

        window.addEventListener(
            "beforeunload",
            function () {

                destroyed = true;


                stopMonitor();


                if (restartTimeoutId !== null) {

                    clearTimeout(
                        restartTimeoutId
                    );

                }

            }
        );


        /* =================================================
           FALLBACK
           ================================================= */

        if (video.readyState >= 1) {

            handleVideoReady();

        }

    }

})();