import { NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { createSessionClient } from "@/lib/appwrite";
import { APP_CONFIG } from "@/lib/app-config";
import { listingBackendSchema } from "@/validation/listing.validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = listingBackendSchema.parse(body);

    const { shopId } = validatedData;

    console.log(shopId, "shopId");

    const { account, databases } = await createSessionClient();
    const user = await account.get();

    const shop = await databases.getDocument(
      APP_CONFIG.APPWRITE.DATABASE_ID,
      APP_CONFIG.APPWRITE.SHOP_ID,
      shopId
    );

    console.log(shop, "shop");

    if (!shop || shop.userId !== user.$id) {
      return NextResponse.json(
        { error: "Invalid or unauthorized shopId" },
        { status: 400 }
      );
    }

    const carListing = await databases.createDocument(
      APP_CONFIG.APPWRITE.DATABASE_ID,
      APP_CONFIG.APPWRITE.CAR_LISTING_ID,
      ID.unique(),
      {
        ...validatedData,
        yearOfManufacture: Number(validatedData.yearOfManufacture),
        userId: user.$id,
        shop: shop.$id,
      }
    );
    return NextResponse.json({
      message: "Car listing created successfully",
      data: carListing,
    });
  } catch (error: any) {
    console.log(error, "error");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
