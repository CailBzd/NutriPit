// 📂 pages/api/auth/resetPassword.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { resetPassword } from "../../../controllers/authController";
import { SupabaseError } from "../../../types/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API : resetPassword | Méthode reçue :", req.method);

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { email } = req.body;
    await resetPassword(email);
    return res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    const supabaseError = error as SupabaseError;
    return res.status(400).json({ error: supabaseError.message });
  }
}
