import { NextResponse } from "next/server";

export default function middleware(req) {
  let verify = req.cookies.get("SignIn");
  let url = req.url;

  if (!verify && url.includes("/document")) {
    return NextResponse.redirect("http://localhost:3000/");
  }

  if (verify && url === "http://localhost:3000/") {
    return NextResponse.redirect("http://localhost:3000/dashboard");
  }
}
