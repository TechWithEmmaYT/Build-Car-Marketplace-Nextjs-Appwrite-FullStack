import { NextRequest, NextResponse } from "next/server";
import { createSessionClient } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { APP_CONFIG } from "@/lib/app-config";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();

    const shopDocuments = await databases.listDocuments(
      APP_CONFIG.APPWRITE.DATABASE_ID,
      APP_CONFIG.APPWRITE.SHOP_ID,
      [Query.equal("userId", user.$id)]
    );

    const shop = shopDocuments.documents?.[0];

    return NextResponse.json({
      user,
      shop,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
};
