// pages/api/auth/resetPassword.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { resetPassword } from '../../../controllers/authController';
import { SupabaseError } from '../../../types/supabase';

/**
 * @swagger
 * /api/auth/resetPassword:
 *   post:
 *     summary: Réinitialisation du mot de passe
 *     description: Envoie un email pour réinitialiser le mot de passe de l'utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Email de réinitialisation envoyé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset email sent"
 *       400:
 *         description: Échec lors de la réinitialisation.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;
    try {
      await resetPassword(email);
      res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      const supabaseError = error as SupabaseError;
      res.status(400).json({ error: supabaseError.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
