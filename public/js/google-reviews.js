document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("googleReviews");

    if (!container) return;

    try {
        const response = await fetch("/api/google-reviews");
        const contentType = response.headers.get("content-type") || "";
        const data = contentType.includes("application/json")
            ? await response.json()
            : { error: await response.text() };

        if (!response.ok || data.error) {
            console.error("Google reviews API error:", data);
            container.innerHTML = "<p>Unable to load Google reviews.</p>";
            return;
        }

        const reviews = data.reviews || [];

        if (reviews.length === 0) {
            container.innerHTML = "<p>No reviews available.</p>";
            return;
        }

        let html = "";

        reviews.forEach((review) => {
            const author = review.authorAttribution?.displayName || review.authorName || "Google User";
            const photo = review.authorAttribution?.photoUri || "";
            const stars = "\u2605".repeat(review.rating || 0);

            html += `
                <div class="review-slide">
                    <div class="review-header">
                        ${photo
                            ? `<img class="review-avatar" src="${escapeAttribute(photo)}" alt="${escapeAttribute(author)}" loading="lazy" decoding="async">`
                            : `<div class="review-avatar review-avatar-fallback">${escapeHtml(author.charAt(0))}</div>`
                        }

                        <div class="review-meta">
                            <div class="review-author">
                                ${escapeHtml(author)}
                            </div>
                            <div class="review-date">
                                ${escapeHtml(review.relativePublishTimeDescription || "")}
                            </div>
                        </div>

                        <i class="fab fa-google review-google-icon" aria-hidden="true"></i>
                    </div>

                    <div class="review-stars" aria-label="${review.rating || 0} out of 5 stars">${stars}</div>

                    <p class="review-text">
                        "${escapeHtml(review.text?.text || review.text || "")}"
                    </p>
                </div>
            `;
        });

        container.innerHTML = html;

        let index = 0;
        const slides = document.querySelectorAll(".review-slide");

        slides.forEach((slide, i) => {
            slide.style.display = i === 0 ? "block" : "none";
        });

        setInterval(() => {
            slides[index].style.display = "none";
            index++;

            if (index >= slides.length) {
                index = 0;
            }

            slides[index].style.display = "block";
        }, 6000);
    } catch (e) {
        console.error(e);

        container.innerHTML =
            "<p>Unable to load Google reviews.</p>";
    }
});

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, "&#096;");
}
