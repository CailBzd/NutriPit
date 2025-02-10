// api/auth/signup.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "../../../controllers/authController";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // ✅ GESTION DES REQUÊTES OPTIONS (préflight CORS)
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(200).end();
  }

  // ✅ GESTION DU POST NORMAL
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const user = await signUp(email, password);
      return res.status(200).json(user);
    } catch (error: any) {

      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  }

  // ✅ GESTION DES AUTRES MÉTHODES (405)
  res.setHeader("Allow", ["POST", "OPTIONS"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
