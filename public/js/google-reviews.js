document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("googleReviews");

    if (!container) return;

    try {
        const response = await fetch("/api/google-reviews");
        const data = await response.json();

        if (data.error) {
            container.innerHTML = "<p>Unable to load Google reviews.</p>";
            return;
        }

        document.getElementById("googleRating").textContent =
            data.rating ?? "-";

        document.getElementById("googleReviewCount").textContent =
            `${data.userRatingCount ?? 0} Google Reviews`;

        const reviews = data.reviews || [];

        if (reviews.length === 0) {
            container.innerHTML = "<p>No reviews available.</p>";
            return;
        }

        let html = "";

        reviews.forEach((review) => {

            const stars = "★".repeat(review.rating);

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

            if (index >= slides.length)
                index = 0;

            slides[index].style.display = "block";

        }, 6000);

    } catch (e) {

        console.error(e);

        container.innerHTML =
            "<p>Unable to load Google reviews.</p>";

    }

});