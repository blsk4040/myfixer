export async function onRequestGet(context) {
  const API_KEY = context.env.GOOGLE_API_KEY;

  if (!API_KEY) {
    return Response.json(
      { error: "GOOGLE_API_KEY secret is missing." },
      { status: 500 }
    );
  }

  try {
    // Search for your business
    const searchResponse = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask": "places.id,places.displayName"
        },
        body: JSON.stringify({
          textQuery: "MyFixer 1 Sullivan St Die Hoewes Centurion South Africa"
        })
      }
    );

    const searchData = await searchResponse.json();

    if (!searchData.places || searchData.places.length === 0) {
      return Response.json(
        {
          error: "Business not found.",
          searchData
        },
        { status: 404 }
      );
    }
     const placeId = searchData.places[0].id;

    // Fetch place details
    const detailsResponse = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask":
            "displayName,rating,userRatingCount,reviews"
        }
      }
    );

    const details = await detailsResponse.json();

    return new Response(JSON.stringify(details), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=43200"
      }
    });

  } catch (err) {
    return Response.json(
      {
        error: err.message
      },
      { status: 500 }
    );
  }
}