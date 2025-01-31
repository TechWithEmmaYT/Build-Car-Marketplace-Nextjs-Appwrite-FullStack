import { NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { createSessionClient } from "@/lib/appwrite";
import { APP_CONFIG } from "@/lib/app-config";
import { listingSchema } from "@/validation/listing.validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = listingSchema.parse(body);

    const displayTitle = `${validatedData.brand?.split("-")?.join(" ")} ${
      validatedData.model
    } ${validatedData.yearOfManufacture} ${validatedData.exteriorColor}`;

    const { account, databases } = await createSessionClient();
    const user = await account.get();

    const carListing = await databases.createDocument(
      APP_CONFIG.APPWRITE.DATABASE_ID,
      APP_CONFIG.APPWRITE.CAR_LISTING_ID,
      ID.unique(),
      {
        ...validatedData,
        displayTitle,
        userId: user.$id,
      }
    );
    return NextResponse.json({
      message: "Car listing created successfully",
      data: carListing,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
