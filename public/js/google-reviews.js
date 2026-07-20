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

        removeLegacyReviewSummary();

        const reviews = (data.reviews || [])
            .map(normalizeReview)
            .filter((review) => review.text.length > 0);

        if (reviews.length === 0) {
            container.innerHTML = "<p>No reviews available.</p>";
            return;
        }

        const reviewCards = reviews.slice(0, 7).map((review) => {
            const stars = "\u2605".repeat(review.rating);

            return `
                <article class="review-card">
                    <div class="review-header">
                        ${review.photo
                            ? `<img class="review-avatar" src="${escapeAttribute(review.photo)}" alt="${escapeAttribute(review.author)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.replaceWith(createReviewFallbackAvatar('${escapeAttribute(review.initial)}'))">`
                            : `<div class="review-avatar review-avatar-fallback">${escapeHtml(review.initial)}</div>`
                        }

                        <div class="review-meta">
                            <div class="review-author">
                                ${escapeHtml(review.author)}
                            </div>
                            <div class="review-date">
                                ${escapeHtml(review.date)}
                            </div>
                        </div>

                        <i class="fab fa-google review-google-icon" aria-hidden="true"></i>
                    </div>

                    <div class="review-stars" aria-label="${review.rating} out of 5 stars">${stars}</div>

                    <p class="review-text">
                        ${escapeHtml(review.text)}
                    </p>
                </article>
            `;
        }).join("");

        container.innerHTML = `
            <div class="reviews-viewport">
                <div class="reviews-track">
                    ${reviewCards}
                </div>
            </div>
            <div class="reviews-controls">
                <div class="reviews-dots" aria-label="Google review slides"></div>
            </div>
        `;

        initReviewsCarousel(container);
    } catch (e) {
        console.error(e);

        container.innerHTML =
            "<p>Unable to load Google reviews.</p>";
    }
});

function initReviewsCarousel(container) {
    const track = container.querySelector(".reviews-track");
    const cards = Array.from(container.querySelectorAll(".review-card"));
    const dots = container.querySelector(".reviews-dots");
    let index = 0;
    let autoRotate;

    if (!track || cards.length === 0 || !dots) return;

    cards.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "reviews-dot";
        dot.setAttribute("aria-label", `Show Google review ${i + 1}`);
        dot.addEventListener("click", () => {
            showReview(i);
            restartAutoRotate();
        });
        dots.appendChild(dot);
    });

    function showReview(nextIndex) {
        index = (nextIndex + cards.length) % cards.length;
        track.style.transform = `translateX(-${index * 100}%)`;

        cards.forEach((card, i) => {
            card.setAttribute("aria-hidden", i === index ? "false" : "true");
        });

        dots.querySelectorAll(".reviews-dot").forEach((dot, i) => {
            dot.classList.toggle("is-active", i === index);
        });
    }

    function restartAutoRotate() {
        window.clearInterval(autoRotate);
        autoRotate = window.setInterval(() => showReview(index + 1), 6500);
    }

    showReview(0);
    restartAutoRotate();
}

function normalizeReview(review) {
    const author = sanitizeText(
        review.authorAttribution?.displayName || review.authorName || "Google User",
        70
    );
    const text = sanitizeText(review.text?.text || review.text || "", 320);
    const photo = review.authorAttribution?.photoUri || "";
    const rating = Math.max(0, Math.min(5, Number(review.rating) || 0));

    return {
        author,
        text,
        photo,
        rating,
        date: sanitizeText(review.relativePublishTimeDescription || "", 40),
        initial: (author.charAt(0) || "G").toUpperCase()
    };
}

function sanitizeText(value, maxLength) {
    const cleaned = String(value)
        .replace(/[\u0000-\u001f\u007f]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    if (cleaned.length <= maxLength) {
        return cleaned;
    }

    return `${cleaned.slice(0, maxLength - 1).trim()}...`;
}

function removeLegacyReviewSummary() {
    document.getElementById("googleRating")?.remove();
    document.getElementById("googleReviewCount")?.remove();
}

function createReviewFallbackAvatar(initial) {
    const avatar = document.createElement("div");
    avatar.className = "review-avatar review-avatar-fallback";
    avatar.textContent = initial || "G";
    return avatar;
}

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
