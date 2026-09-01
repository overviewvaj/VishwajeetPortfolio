(() => {
    "use strict";

    
const video = document.getElementById("heroVideo");

if (!video) {
    return;
}

const FADE_DURATION = 0.5;
const RESTART_DELAY = 100;

let animationFrameId = null;
let restartTimeoutId = null;
let isRestarting = false;


/*
 * Calculate and apply video opacity based on
 * the current playback position.
 */
function updateVideoOpacity() {

    if (!video.duration || !Number.isFinite(video.duration)) {
        animationFrameId = requestAnimationFrame(updateVideoOpacity);
        return;
    }

    const currentTime = video.currentTime;
    const duration = video.duration;

    let opacity = 1;


    /*
     * Fade in during the first 0.5 seconds.
     */
    if (currentTime < FADE_DURATION) {

        opacity = currentTime / FADE_DURATION;
    }


    /*
     * Fade out during the final 0.5 seconds.
     */
    else if (currentTime > duration - FADE_DURATION) {

        opacity =
            (duration - currentTime) /
            FADE_DURATION;
    }


    /*
     * Keep opacity within the valid range.
     */
    opacity = Math.max(
        0,
        Math.min(1, opacity)
    );


    video.style.opacity = opacity;


    animationFrameId =
        requestAnimationFrame(updateVideoOpacity);
}


/*
 * Handle the natural end of the video.
 *
 * The video is first completely faded out,
 * then restarted after a very short delay.
 */
function handleVideoEnded() {

    if (isRestarting) {
        return;
    }

    isRestarting = true;

    video.style.opacity = "0";


    restartTimeoutId = window.setTimeout(() => {

        video.currentTime = 0;

        const playPromise = video.play();


        if (playPromise !== undefined) {

            playPromise.catch(() => {
                /*
                 * Autoplay may be blocked by the browser.
                 * The video remains available for user interaction.
                 */
            });

        }

        isRestarting = false;

    }, RESTART_DELAY);
}


/*
 * Start playback once metadata is available.
 */
function startVideo() {

    video.style.opacity = "0";

    const playPromise = video.play();


    if (playPromise !== undefined) {

        playPromise.catch(() => {
            /*
             * Muted inline autoplay should normally work.
             * If the browser blocks it, no further action is required.
             */
        });

    }

    if (!animationFrameId) {

        animationFrameId =
            requestAnimationFrame(updateVideoOpacity);
    }
}


/*
 * Video lifecycle events.
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
 * Fallback for browsers where metadata
 * has already loaded before this script runs.
 */
if (video.readyState >= 1) {

    startVideo();
}


/*
 * Clean up animation frames and timers
 * when the page is unloaded.
 */
window.addEventListener(
    "pagehide",
    () => {

        if (animationFrameId) {

            cancelAnimationFrame(
                animationFrameId
            );

            animationFrameId = null;
        }


        if (restartTimeoutId) {

            clearTimeout(
                restartTimeoutId
            );

            restartTimeoutId = null;
        }
    }
);


})();
