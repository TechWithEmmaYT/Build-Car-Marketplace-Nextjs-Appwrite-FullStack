import { APP_CONFIG } from "@/lib/app-config";
import { createAnonymousClient } from "@/lib/appwrite";
import { NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract query parameters for filtering
    const brands = searchParams.get("brand")?.split(",");
    const models = searchParams.get("model")?.split(",");
    const colors = searchParams.get("color")?.split(",");
    const priceRange = searchParams.get("price")?.split("-");
    const keyword = searchParams.get("keyword");

    // Build the query array
    const queries = [];
    // Add filters
    if (brands?.length) queries.push(Query.equal("brand", brands));
    if (models?.length) queries.push(Query.equal("model", models));
    if (colors?.length) queries.push(Query.equal("exteriorColor", colors));
    if (priceRange?.length === 2) {
      const [minPrice, maxPrice] = priceRange.map(Number);
      queries.push(Query.greaterThanEqual("price", minPrice));
      queries.push(Query.lessThanEqual("price", maxPrice));
    }

    if (searchParams.has("year_min") && searchParams.has("year_max")) {
      const yearMin = Number(searchParams.get("year_min"));
      const yearMax = Number(searchParams.get("year_max"));

      if (!isNaN(yearMin) && !isNaN(yearMax)) {
        queries.push(Query.greaterThanEqual("yearOfManufacture", yearMin));
        queries.push(Query.lessThanEqual("yearOfManufacture", yearMax));
      }
    }

    if (keyword) {
      queries.push(Query.search("title", keyword));
      queries.push(Query.search("description", keyword));
    }

    console.log(queries);

    const { databases } = await createAnonymousClient();
    // Fetch listings
    const listings = await databases.listDocuments(
      APP_CONFIG.APPWRITE.DATABASE_ID,
      APP_CONFIG.APPWRITE.CAR_LISTING_ID,
      queries
    );

    return NextResponse.json(
      {
        message: "Listings fetched successfully",
        listings: listings.documents,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch listings" },
      { status: 500 }
    );
  }
}
