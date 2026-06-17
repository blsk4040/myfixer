document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Component loader started...");

  // 1. Your working environment detection setup
  const isLocalEnv = window.location.protocol === 'file:' || window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
  const isSubFolder = window.location.pathname.includes('/locations/') || window.location.pathname.includes('/services/');
  const hasPublicInUrl = window.location.pathname.includes('/public/');
  
  // Set the base path dynamically based on context (Kept exactly how you like it)
  let basePath = "/";
  if (isLocalEnv) {
    basePath = isSubFolder ? "../" : "";
  }
  
  const navUrl = `${basePath}components/nav.html`;
  const footerUrl = `${basePath}components/footer.html`;

  console.log(`📦 Fetching components using base path: "${basePath}"`);

  // 2. Link Fixer Function for flawless local navigation
  function fixLocalLinks() {
    if (isLocalEnv) {
      console.log("🛠️ Local environment active. Checking navigation links...");
      
      document.querySelectorAll('a').forEach(link => {
        let href = link.getAttribute('href');
        if (!href) return;

        // Condition A: Testing via http://127.0.0.1:5555/public/...
        if (hasPublicInUrl) {
          if (href.startsWith('/') && !href.startsWith('/public/')) {
            link.setAttribute('href', `/public${href}`);
          } else if (href.startsWith('../')) {
            // If the link explicitly uses relative stepping, make sure it stays pointing to public
            // (e.g., changing '../services/fridge-repair.html' to ensure it fits the root routing structure)
            const cleanPath = href.replace('../', '/public/');
            link.setAttribute('href', cleanPath.replace('//', '/'));
          }
        } 
        // Condition B: Testing via http://127.0.0.1:5555/... (without 'public' in the URL)
        else if (isSubFolder) {
          if (href.startsWith('/')) {
            // Strip leading slash and attach relative step back
            link.setAttribute('href', `../${href.substring(1)}`);
          }
        }
      });
    }
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
        fixLocalLinks();

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
        fixLocalLinks();

        if (typeof window.initWhatsAppWidget === "function") {
          window.initWhatsAppWidget();
          console.log("✅ WhatsApp widget initialized");
        }
      }
    })
    .catch(err => console.error("❌ Error loading footer:", err));
});