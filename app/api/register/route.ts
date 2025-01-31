import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/appwrite";
import { signupSchema } from "@/validation/auth.validation";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/constants/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = await signupSchema.parseAsync(body);

    const { account } = await createAdminClient();
    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set(AUTH_COOKIE_NAME, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({
      message: "User created successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
