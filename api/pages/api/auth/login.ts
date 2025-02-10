// 📂 pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { login } from "../../../controllers/authController";
import { serialize } from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API : login | Méthode reçue :", req.method);

  // ✅ GESTION DES REQUÊTES OPTIONS (préflight CORS)
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { email, password } = req.body;
    console.log("API : login | Tentative de connexion avec :", email);

    const user = await login(email, password);
    console.log("API : login | Connexion réussie, ID utilisateur :", user.id);

    // 🔥 Détermine dynamiquement si `secure` doit être activé ou non
    console.log("API : login | Environnement actuel :", process.env.NODE_ENV);
    const isProduction = process.env.NODE_ENV === "production";
    console.log("API : login | Environnement de production :", isProduction);
    const cookie = serialize("user_id", user.id, {
      httpOnly: true, // 🔐 Sécurise le cookie (non accessible par JS)
      secure: isProduction, // 🔥 `true` en production, `false` en local
      sameSite: isProduction ? "none" : "lax", // ✅ Fixe SameSite à "none" pour compatibilité en prod
      path: "/",
    });

    console.log("API : login | Cookie défini :", cookie);

    res.setHeader("Set-Cookie", cookie);
    res.setHeader("Access-Control-Allow-Origin", process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    return res.status(200).json(user);
  } catch (error: any) {
    console.error("API : login | Erreur lors de la connexion :", error.message);
    return res.status(400).json({ error: error.message });
  }
}
