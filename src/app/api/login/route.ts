import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username === "hacker" && password === "htn2025") {
    const response = NextResponse.json({ success: true });
    response.cookies.set("loggedIn", "true", { httpOnly: true });
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
