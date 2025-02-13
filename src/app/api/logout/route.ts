import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("loggedIn", "", { expires: new Date(0) }); // Clear cookie
  return response;
}
