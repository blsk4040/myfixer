export async function onRequestGet(context) {
  const apiKey = context.env.GOOGLE_API_KEY;
  const placeId = normalizePlaceId(context.env.GOOGLE_PLACE_ID);

  if (!apiKey) {
    return Response.json(
      { error: "GOOGLE_API_KEY secret is missing." },
      { status: 500 }
    );
  }

  if (!placeId) {
    return Response.json(
      {
        error: "GOOGLE_PLACE_ID secret is missing.",
        details: "Add GOOGLE_PLACE_ID to the Cloudflare Pages Production environment variables, then redeploy."
      },
      { status: 500 }
    );
  }

  try {
    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("place_id", placeId);
    url.searchParams.set("fields", "name,rating,user_ratings_total,reviews");
    url.searchParams.set("reviews_sort", "newest");
    url.searchParams.set("key", apiKey);

    const detailsResponse = await fetch(url.toString());
    const details = await detailsResponse.json();

    if (!detailsResponse.ok || details.status !== "OK") {
      return Response.json(
        {
          error: "Google Places details request failed.",
          googleStatus: detailsResponse.status,
          details: details.error_message || details.status || details
        },
        { status: details.status === "NOT_FOUND" ? 404 : 502 }
      );
    }

    return Response.json(normalizeLegacyDetails(details.result), {
      headers: {
        "Cache-Control": "public, max-age=43200"
      }
    });
  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

function normalizePlaceId(placeId) {
  if (!placeId) return "";

  return placeId
    .trim()
    .replace(/^places\//, "");
}

function normalizeLegacyDetails(place) {
  return {
    displayName: {
      text: place.name || "MyFixer"
    },
    rating: place.rating,
    userRatingCount: place.user_ratings_total,
    reviews: (place.reviews || []).map((review) => ({
      rating: review.rating,
      text: {
        text: review.text || ""
      },
      authorAttribution: {
        displayName: review.author_name || "Google User",
        uri: review.author_url || ""
      },
      relativePublishTimeDescription: review.relative_time_description || ""
    }))
  };
}
