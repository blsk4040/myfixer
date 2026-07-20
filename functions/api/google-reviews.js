export async function onRequestGet(context) {
  const apiKey = context.env.GOOGLE_API_KEY;
  const configuredPlaceId = context.env.GOOGLE_PLACE_ID;

  if (!apiKey) {
    return Response.json(
      { error: "GOOGLE_API_KEY secret is missing." },
      { status: 500 }
    );
  }

  try {
    const placeId = configuredPlaceId || await findPlaceId(apiKey);
    const detailsResponse = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews"
        }
      }
    );

    const details = await detailsResponse.json();

    if (!detailsResponse.ok) {
      return googleError("Google Places details request failed.", detailsResponse.status, details);
    }

    return Response.json(details, {
      headers: {
        "Cache-Control": "public, max-age=43200"
      }
    });
  } catch (err) {
    if (err instanceof GooglePlacesError) {
      return googleError(err.message, err.status, err.data);
    }

    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

async function findPlaceId(apiKey) {
  const searchResponse = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.id,places.displayName"
      },
      body: JSON.stringify({
        textQuery: "MyFixer Appliance Repair 1 Sullivan Street Die Hoewes Centurion South Africa"
      })
    }
  );

  const searchData = await searchResponse.json();

  if (!searchResponse.ok) {
    throw new GooglePlacesError(
      "Google Places text search failed.",
      searchResponse.status,
      searchData
    );
  }

  if (!searchData.places || searchData.places.length === 0) {
    throw new GooglePlacesError("Business not found.", 404, searchData);
  }

  return searchData.places[0].id;
}

function googleError(message, status, data) {
  return Response.json(
    {
      error: message,
      googleStatus: status,
      details: data.error?.message || data
    },
    { status: status === 404 ? 404 : 502 }
  );
}

class GooglePlacesError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}
