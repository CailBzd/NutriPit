// controllers/authController.ts

import { supabase } from '../lib/supabase';
import { SupabaseError } from '../types/supabase';

/**
 * Connecte un utilisateur en vérifiant ses identifiants.
 *
 * @param {string} email - L'adresse email de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Promise<User>} L'objet utilisateur en cas de succès.
 * @throws {SupabaseError} Si la connexion échoue.
 */
export const login = async (email: string, password: string) => {
  // Appel à l'API Supabase pour authentifier l'utilisateur.
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error as SupabaseError;
  return data.user;
};

/**
 * Inscrit un nouvel utilisateur.
 *
 * @param {string} email - L'adresse email de l'utilisateur.
 * @param {string} password - Le mot de passe choisi par l'utilisateur.
 * @returns {Promise<User>} L'objet utilisateur créé en cas de succès.
 * @throws {SupabaseError} Si l'inscription échoue.
 */
export const signUp = async (email: string, password: string) => {
  // Appel à l'API Supabase pour inscrire l'utilisateur.
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error as SupabaseError;
  return data.user;
};

/**
 * Envoie un email de réinitialisation du mot de passe à l'utilisateur.
 *
 * @param {string} email - L'adresse email de l'utilisateur.
 * @returns {Promise<void>} Ne retourne rien en cas de succès.
 * @throws {SupabaseError} Si la réinitialisation échoue.
 */
export const resetPassword = async (email: string) => {
  // Appel à l'API Supabase pour lancer la procédure de réinitialisation.
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error as SupabaseError;
};
