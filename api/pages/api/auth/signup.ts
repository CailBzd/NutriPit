// pages/api/auth/signup.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { signUp } from '../../../controllers/authController';
import { SupabaseError } from '../../../types/supabase';

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Inscription d'un utilisateur
 *     description: Crée un nouvel utilisateur avec l'email et le mot de passe fournis.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "newuser@example.com"
 *               password:
 *                 type: string
 *                 example: "secretpassword"
 *     responses:
 *       200:
 *         description: Inscription réussie, retourne l'objet utilisateur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: "newuser@example.com"
 *                 name:
 *                   type: string
 *                   example: "New User"
 *       400:
 *         description: Échec de l'inscription.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      const user = await signUp(email, password);
      res.status(200).json(user);
    } catch (error) {
      const supabaseError = error as SupabaseError;
      res.status(400).json({ error: supabaseError.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
