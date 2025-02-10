// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { login } from '../../../controllers/authController';
import { SupabaseError } from '../../../types/supabase';

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Login failed
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      const user = await login(email, password);
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
