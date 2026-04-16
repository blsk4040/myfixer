document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Component loader started...");

  // Load Navigation
  fetch("components/nav.html")
    .then(response => {
      if (!response.ok) throw new Error(`Nav failed: ${response.status}`);
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
  fetch("components/footer.html")
    .then(response => {
      if (!response.ok) throw new Error(`Footer failed: ${response.status}`);
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