document.addEventListener("DOMContentLoaded", function () {

    console.log("🚀 Component loader started...");

    // 1. Environment detection

    const isLocalEnv =
        window.location.protocol === 'file:' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname === 'localhost';

    const isSubFolder =
        window.location.pathname.includes('/locations/') ||
        window.location.pathname.includes('/services/');

    const hasPublicInUrl =
        window.location.pathname.includes('/public/');

    // Component paths
    // Local: /public/components/
    // Production: /components/

    const navUrl = hasPublicInUrl
        ? "/public/components/nav.html"
        : "/components/nav.html";

    const footerUrl = hasPublicInUrl
        ? "/public/components/footer.html"
        : "/components/footer.html";

    console.log(`📦 Fetching components: "${navUrl}" and "${footerUrl}"`);


    // 2. Link Fixer Function
    // Handles local development and Cloudflare production URLs

    function fixNavigationLinks() {

        document.querySelectorAll('a').forEach(link => {

            let href = link.getAttribute('href');

            if (
                !href ||
                href.startsWith('javascript:') ||
                href.startsWith('tel:') ||
                href.startsWith('mailto:') ||
                href.startsWith('#')
            ) {
                return;
            }


            // --------------------------------------------------
            // LIVE PRODUCTION MODE
            // Cloudflare Pages uses clean extensionless URLs
            // --------------------------------------------------

            if (!isLocalEnv) {

                // Remove .html extensions if they exist
                if (href.endsWith('.html')) {

                    const cleanHref =
                        href.substring(0, href.length - 5);

                    link.setAttribute('href', cleanHref);
                }

                return;
            }


            // --------------------------------------------------
            // LOCAL DEVELOPMENT MODE
            // --------------------------------------------------

            if (isLocalEnv) {


                // --------------------------------------------------
                // CONDITION A
                // Local URL contains /public/
                //
                // Example:
                // http://127.0.0.1:5555/public/
                // --------------------------------------------------

                if (hasPublicInUrl) {

                    if (
                        href.startsWith('/') &&
                        !href.startsWith('/public/')
                    ) {

                        let localHref = `/public${href}`;

                        // Convert clean production URLs
                        // to local .html files

                        if (
                            href.startsWith('/services/') ||
                            href.startsWith('/locations/') ||
                            href === '/gallery' ||
                            href === '/blog'
                        ) {
                            localHref += '.html';
                        }

                        link.setAttribute('href', localHref);

                    } else if (href.startsWith('../')) {

                        const cleanPath =
                            href.replace('../', '/public/');

                        link.setAttribute(
                            'href',
                            cleanPath.replace('//', '/')
                        );
                    }
                }


                // --------------------------------------------------
                // CONDITION B
                // Local URL does NOT contain /public/
                // --------------------------------------------------

                else if (isSubFolder) {

                    if (href.startsWith('/')) {

                        link.setAttribute(
                            'href',
                            `../${href.substring(1)}`
                        );
                    }
                }
            }

        });
    }


    // --------------------------------------------------
    // LOAD NAVIGATION
    // --------------------------------------------------

    fetch(navUrl)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    `Nav failed to load from ${navUrl}: ${response.status}`
                );
            }

            return response.text();
        })

        .then(data => {

            const navPlaceholder =
                document.getElementById("nav-placeholder");

            if (navPlaceholder) {

                navPlaceholder.innerHTML = data;

                console.log("✅ Nav loaded successfully");

                // Fix navigation links after nav HTML is injected
                fixNavigationLinks();

                // Initialise site navigation
                if (typeof window.initSite === "function") {

                    window.initSite();

                    console.log(
                        "✅ Site navigation initialized"
                    );
                }
            }
        })

        .catch(err =>
            console.error(
                "❌ Error loading navigation:",
                err
            )
        );


    // --------------------------------------------------
    // LOAD FOOTER
    // --------------------------------------------------

    fetch(footerUrl)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    `Footer failed to load from ${footerUrl}: ${response.status}`
                );
            }

            return response.text();
        })

        .then(data => {

            const footerPlaceholder =
                document.getElementById("footer-placeholder");

            if (footerPlaceholder) {

                footerPlaceholder.innerHTML = data;

                console.log("✅ Footer loaded successfully");

                // Fix footer links after footer HTML is injected
                fixNavigationLinks();

                // Initialise WhatsApp widget
                if (
                    typeof window.initWhatsAppWidget === "function"
                ) {

                    window.initWhatsAppWidget();

                    console.log(
                        "✅ WhatsApp widget initialized"
                    );
                }
            }
        })

        .catch(err =>
            console.error(
                "❌ Error loading footer:",
                err
            )
        );

});