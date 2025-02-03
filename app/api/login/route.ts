import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/appwrite";
import { loginSchema } from "@/validation/auth.validation";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/constants/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = await loginSchema.parseAsync(body);

    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set(AUTH_COOKIE_NAME, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({
      message: "User login successfully",
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
