import { NextResponse } from "next/server";
import { decodedToken, getToken } from "./lib/action";

export async function middleware(req) {

  return NextResponse.next();
}
