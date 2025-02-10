// 📂 middleware.ts (Racine du projet API)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log(`Middleware intercepté : ${req.method} ${req.nextUrl.pathname}`);

  const allowedOrigin = process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || "http://localhost:3000";
  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // ✅ Si c'est une requête OPTIONS (préflight), on répond immédiatement avec 200
  if (req.method === "OPTIONS") {
    console.log("Préflight CORS traité dans le middleware.");
    return new NextResponse(null, {
      status: 200,
      headers: response.headers,
    });
  }

  return response;
}

// ✅ Appliquer le middleware uniquement sur toutes les routes API `/api/*`
export const config = {
  matcher: "/api/:path*",
};
