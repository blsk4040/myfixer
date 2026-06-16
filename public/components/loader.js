document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Component loader started...");

  // Detect if running locally via file:// or a strict subdirectory local server
  const isLocalFile = window.location.protocol === 'file:' || window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
  
  // Set the base path dynamically based on where the file is being viewed
  const basePath = isLocalFile ? "" : "/";
  
  const navUrl = `${basePath}components/nav.html`;
  const footerUrl = `${basePath}components/footer.html`;

  console.log(`📦 Fetching components using base path: "${basePath}"`);

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

        if (typeof window.initWhatsAppWidget === "function") {
          window.initWhatsAppWidget();
          console.log("✅ WhatsApp widget initialized");
        }
      }
    })
    .catch(err => console.error("❌ Error loading footer:", err));
});