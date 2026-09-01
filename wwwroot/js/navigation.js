/* =========================================================
   VISHWAJEET JOSHI PORTFOLIO
   MOBILE NAVIGATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuButton =
        document.getElementById("mobileMenuButton");

    const mobileDrawer =
        document.getElementById("mobileDrawer");

    const closeButton =
        document.getElementById("mobileClose");


    /* -----------------------------------------------------
       SAFETY CHECK
       ----------------------------------------------------- */

    if (!menuButton || !mobileDrawer || !closeButton) {
        console.warn(
            "Mobile navigation elements were not found."
        );

        return;
    }


    /* -----------------------------------------------------
       OPEN DRAWER
       ----------------------------------------------------- */

    function openDrawer() {

        mobileDrawer.classList.add("is-open");

        menuButton.classList.add("is-open");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        menuButton.setAttribute(
            "aria-label",
            "Close navigation"
        );

        mobileDrawer.setAttribute(
            "aria-hidden",
            "false"
        );


        /*
         * Prevent the background page from scrolling
         * while the navigation drawer is open.
         */

        document.body.style.overflow = "hidden";
    }


    /* -----------------------------------------------------
       CLOSE DRAWER
       ----------------------------------------------------- */

    function closeDrawer() {

        mobileDrawer.classList.remove("is-open");

        menuButton.classList.remove("is-open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Open navigation"
        );

        mobileDrawer.setAttribute(
            "aria-hidden",
            "true"
        );


        /*
         * Restore normal page scrolling.
         */

        document.body.style.overflow = "";
    }


    /* -----------------------------------------------------
       HAMBURGER BUTTON
       ----------------------------------------------------- */

    menuButton.addEventListener(
        "click",
        function () {

            const isOpen =
                mobileDrawer.classList.contains("is-open");


            if (isOpen) {

                closeDrawer();

            } else {

                openDrawer();

            }

        }
    );


    /* -----------------------------------------------------
       CLOSE BUTTON
       ----------------------------------------------------- */

    closeButton.addEventListener(
        "click",
        function () {

            closeDrawer();

        }
    );


    /* -----------------------------------------------------
       CLICK OUTSIDE DRAWER
       ----------------------------------------------------- */

    mobileDrawer.addEventListener(
        "click",
        function (event) {

            /*
             * Only close when the user clicks the
             * backdrop itself.
             */

            if (event.target === mobileDrawer) {

                closeDrawer();

            }

        }
    );


    /* -----------------------------------------------------
       ESCAPE KEY
       ----------------------------------------------------- */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                mobileDrawer.classList.contains("is-open")
            ) {

                closeDrawer();

            }

        }
    );


    /* -----------------------------------------------------
       MOBILE NAVIGATION LINKS
       ----------------------------------------------------- */

    const drawerLinks =
        mobileDrawer.querySelectorAll("a");


    drawerLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeDrawer();

            }
        );

    });


    /* -----------------------------------------------------
       WINDOW RESIZE
       ----------------------------------------------------- */

    window.addEventListener(
        "resize",
        function () {

            /*
             * If the viewport becomes desktop-sized,
             * make sure the mobile drawer is reset.
             */

            if (window.innerWidth >= 768) {

                closeDrawer();

            }

        }
    );

});