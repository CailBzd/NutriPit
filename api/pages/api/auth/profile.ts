// 📂 pages/api/auth/profile.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserById } from "../../../controllers/authController";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API : profile | Méthode reçue :", req.method);

  // ✅ Gérer correctement les requêtes OPTIONS pour éviter plusieurs appels
  if (req.method === "OPTIONS") {
    console.log("API : profile | Requête OPTIONS interceptée");

    res.setHeader("Access-Control-Allow-Origin", process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    res.status(204).end(); // ✅ Réponse vide avec `204 No Content` pour éviter les erreurs
    return;
  }

  // ✅ Définir les en-têtes CORS AVANT de renvoyer la réponse
  res.setHeader("Access-Control-Allow-Origin", process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  try {
    console.log("API : profile | Cookies reçus :", req.cookies);

    const userId = req.cookies["user_id"];
    console.log("API : profile | ID utilisateur récupéré :", userId);

    if (!userId) {
      console.warn("API : profile | Aucun `user_id` trouvé dans les cookies !");
      res.status(401).json({ error: "Utilisateur non authentifié." });
      return;
    }

    const userProfile = await getUserById(userId);
    console.log("API : profile | Utilisateur récupéré :", userProfile);

    res.status(200).json(userProfile);
  } catch (error: any) {
    console.error("API : profile | Erreur lors de la récupération du profil :", error.message);
    res.status(400).json({ error: error.message });
  }
}
