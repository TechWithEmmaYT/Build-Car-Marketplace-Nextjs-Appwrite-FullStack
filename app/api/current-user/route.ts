import { createSessionClient } from "@/lib/appwrite";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }
};
