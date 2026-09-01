/* =========================================================
   VISHWAJEET JOSHI PORTFOLIO
   STUDIO PAGE — METRIC ANIMATION ENGINE
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       DOM READY
       ===================================================== */

    document.addEventListener("DOMContentLoaded", function () {

        initialiseStudioMetrics();

    });


    /* =====================================================
       STUDIO METRICS
       ===================================================== */

    function initialiseStudioMetrics() {

        const metrics =
            document.querySelectorAll("[data-metric]");


        /*
         * No metrics on the current page.
         */

        if (!metrics.length) {
            return;
        }


        /*
         * Respect users who prefer reduced motion.
         */

        const reducedMotion =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        /* =================================================
           REDUCED MOTION
           ================================================= */

        if (reducedMotion) {

            metrics.forEach(function (metric) {

                revealMetricImmediately(metric);

            });

            return;
        }


        /* =================================================
           INTERSECTION OBSERVER
           ================================================= */

        const observer =
            new IntersectionObserver(
                function (entries, observerInstance) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        const metric =
                            entry.target;


                        /*
                         * Prevent the same metric from
                         * being animated more than once.
                         */

                        if (
                            metric.dataset.animated === "true"
                        ) {

                            observerInstance.unobserve(
                                metric
                            );

                            return;

                        }


                        metric.dataset.animated = "true";


                        /*
                         * Reveal the metric card.
                         */

                        metric.classList.add(
                            "is-visible"
                        );


                        /*
                         * Animate the number.
                         */

                        animateMetric(metric);


                        /*
                         * Stop observing once the
                         * animation has started.
                         */

                        observerInstance.unobserve(
                            metric
                        );

                    });

                },
                {
                    threshold: 0.25
                }
            );


        /* =================================================
           OBSERVE ALL METRICS
           ================================================= */

        metrics.forEach(function (metric) {

            observer.observe(metric);

        });

    }


    /* =====================================================
       IMMEDIATE REVEAL
       ===================================================== */

    function revealMetricImmediately(metric) {

        metric.classList.add(
            "is-visible"
        );


        const number =
            metric.querySelector(
                ".metric-number"
            );


        if (!number) {
            return;
        }


        const target =
            number.dataset.target;


        const suffix =
            number.dataset.suffix || "";


        number.textContent =
            target + suffix;

    }


    /* =====================================================
       NUMBER ANIMATION
       ===================================================== */

    function animateMetric(metric) {

        const number =
            metric.querySelector(
                ".metric-number"
            );


        if (!number) {
            return;
        }


        const target =
            parseFloat(
                number.dataset.target
            );


        if (
            Number.isNaN(target)
        ) {

            return;

        }


        const suffix =
            number.dataset.suffix || "";


        const duration = 1400;

        const startTime =
            performance.now();


        function updateNumber(currentTime) {

            const elapsed =
                currentTime -
                startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            /*
             * Ease-out curve.
             *
             * Starts quickly and gently
             * settles into the final value.
             */

            const easedProgress =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const currentValue =
                Math.floor(
                    target *
                    easedProgress
                );


            number.textContent =
                formatNumber(
                    currentValue
                ) +
                suffix;


            if (progress < 1) {

                requestAnimationFrame(
                    updateNumber
                );

            }
            else {

                /*
                 * Guarantee exact final value.
                 */

                number.textContent =
                    formatNumber(
                        target
                    ) +
                    suffix;

            }

        }


        requestAnimationFrame(
            updateNumber
        );

    }


    /* =====================================================
       NUMBER FORMATTER
       ===================================================== */

    function formatNumber(value) {

        return Number(value)
            .toLocaleString(
                "en-GB"
            );

    }

})();