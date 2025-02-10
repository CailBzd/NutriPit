// services/authService.ts
import { LoginResponse, Session, SignupResponse } from "@/types/profile";
import { buildApiUrl } from "./apiHelper";



/**
 * Inscrit un nouvel utilisateur en appelant l'API.
 * @param email L'email de l'utilisateur.
 * @param password Le mot de passe.
 * @returns Une promesse contenant les données utilisateur.
 */
export async function signup(email: string, password: string): Promise<SignupResponse> {
  const url = buildApiUrl("auth", "signup");

  email = "bizard.pierre@hotmail.fr"
  password = "12346-teST"

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erreur lors de l'inscription");
  }
  return res.json();
}

/**
 * Connecte un utilisateur en appelant l'API.
 * @param email L'email de l'utilisateur.
 * @param password Le mot de passe.
 * @returns Une promesse contenant les données utilisateur connectées.
 */
export async function login(email: string, password: string): Promise<LoginResponse> {
  const url = buildApiUrl("auth", "login");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  console.log("WEB : authService | login | Réponse API :", res);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erreur lors de la connexion");
  }
  return res.json();
}

export async function getUserProfile() {
  const url = buildApiUrl("auth", "profile");

  const res = await fetch(url, {
    method: "GET",
    credentials: "include", // Si ton API utilise des cookies pour la session
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Impossible de récupérer le profil utilisateur.");
  }

  return res.json();
}

export async function logout(): Promise<void> {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error("Erreur lors de la déconnexion");
  }
}