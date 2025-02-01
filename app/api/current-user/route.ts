import { NextRequest, NextResponse } from "next/server";
import { createSessionClient } from "@/lib/appwrite";

export const GET = async (req: NextRequest) => {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return NextResponse.json({
      user,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
};
