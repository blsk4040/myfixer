document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Component loader started...");

  // 1. Working environment detection setup
  const isLocalEnv = window.location.protocol === 'file:' || window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
  const isSubFolder = window.location.pathname.includes('/locations/') || window.location.pathname.includes('/services/');
  const hasPublicInUrl = window.location.pathname.includes('/public/');
  
  // Set the base path dynamically based on context
  let basePath = "/";
  if (isLocalEnv) {
    basePath = isSubFolder ? "../" : "";
  }
  
  const navUrl = `${basePath}components/nav`;
  const footerUrl = `${basePath}components/footer`;

  console.log(`📦 Fetching components using base path: "${basePath}"`);

  // 2. Link Fixer Function for both local testing AND Cloudflare optimization
  function fixNavigationLinks() {
    document.querySelectorAll('a').forEach(link => {
      let href = link.getAttribute('href');
      if (!href || href.startsWith('javascript:') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('#')) return;

      // --- LIVE PRODUCTION MODE (Cloudflare Pages Optimization) ---
      if (!isLocalEnv) {
        // Strip out .html extensions to match Cloudflare's extensionless routing rule
        if (href.endsWith('.html')) {
          const cleanHref = href.substring(0, href.length - 5);
          link.setAttribute('href', cleanHref);
        }
        return; // Exit early for live environment execution
      }

      // --- LOCAL DEVELOPMENT MODE ---
      if (isLocalEnv) {
        // Condition A: Testing via http://127.0.0.1:5555/public/...
        if (hasPublicInUrl) {
          if (href.startsWith('/') && !href.startsWith('/public/')) {
            link.setAttribute('href', `/public${href}`);
          } else if (href.startsWith('../')) {
            const cleanPath = href.replace('../', '/public/');
            link.setAttribute('href', cleanPath.replace('//', '/'));
          }
        } 
        // Condition B: Testing via http://127.0.0.1:5555/... (without 'public' in the URL)
        else if (isSubFolder) {
          if (href.startsWith('/')) {
            link.setAttribute('href', `../${href.substring(1)}`);
          }
        }
      }
    });
  }

  // Load Navigation
  fetch(navUrl)
    .then(response => {
      if (!response.ok) throw new Error(`Nav failed to load from ${navUrl}: ${response.status}`);
      return response.text();
    })
    .then(data => {
      const navPlaceholder = document.getElementById("nav-placeholder");
      if (navPlaceholder) {
        navPlaceholder.innerHTML = data;
        console.log("✅ Nav loaded successfully");

        // Run link patching right after nav HTML is injected
        fixNavigationLinks();

        if (typeof window.initSite === "function") {
          window.initSite();
          console.log("✅ Site navigation initialized");
        }
      }
    })
    .catch(err => console.error("❌ Error loading navigation:", err));

  // Load Footer
  fetch(footerUrl)
    .then(response => {
      if (!response.ok) throw new Error(`Footer failed to load from ${footerUrl}: ${response.status}`);
      return response.text();
    })
    .then(data => {
      const footerPlaceholder = document.getElementById("footer-placeholder");
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = data;
        console.log("✅ Footer loaded successfully");

        // Run link patching right after footer HTML is injected
        fixNavigationLinks();

        if (typeof window.initWhatsAppWidget === "function") {
          window.initWhatsAppWidget();
          console.log("✅ WhatsApp widget initialized");
        }
      }
    })
    .catch(err => console.error("❌ Error loading footer:", err));
});