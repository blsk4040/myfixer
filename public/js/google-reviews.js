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

        const ratingEl = document.getElementById("googleRating");
        const reviewCountEl = document.getElementById("googleReviewCount");

        if (ratingEl) {
            ratingEl.textContent = data.rating ?? "-";
        }

        if (reviewCountEl) {
            reviewCountEl.textContent =
                `${data.userRatingCount ?? 0} Google Reviews`;
        }

        const reviews = data.reviews || [];

        if (reviews.length === 0) {
            container.innerHTML = "<p>No reviews available.</p>";
            return;
        }

        let html = "";

        reviews.forEach((review) => {
            const stars = "\u2605".repeat(review.rating || 0);

            html += `
                <div class="review-slide">
                    <div class="review-stars">${stars}</div>

                    <p class="review-text">
                        "${review.text?.text || review.text || ""}"
                    </p>

                    <div class="review-author">
                        ${review.authorAttribution?.displayName || review.authorName || "Google User"}
                    </div>

                    <div class="review-date">
                        ${review.relativePublishTimeDescription || ""}
                    </div>
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
