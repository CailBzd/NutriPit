import { LoginResponse, SignupResponse } from "@/types/profile";
import { buildApiUrl } from "./apiHelper";

/**
 * Inscrit un nouvel utilisateur en appelant l'API.
 * @param email L'email de l'utilisateur.
 * @param password Le mot de passe.
 * @returns Une promesse contenant les données utilisateur.
 */
export async function signup(email: string, password: string): Promise<SignupResponse> {
  const url = buildApiUrl("auth", "signup");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Erreur lors de l'inscription");
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

  if (!res.ok) {
    const errorData = await res.json();
    // Analyse de la réponse d'erreur pour fournir un message plus précis
    if (errorData.message === "Invalid login credentials") {
      throw new Error("Identifiant ou mot de passe incorrect.");
    } else if (errorData.message === "User not found") {
      throw new Error("Aucun utilisateur trouvé avec cet email.");
    } else {
      throw new Error(errorData.message || "Erreur lors de la connexion");
    }
  }

  return res.json();
}

export async function getUserProfile() {
  const url = buildApiUrl("auth", "profile");

  const res = await fetch(url, {
    method: "GET",
    credentials: "include", // Si votre API utilise des cookies pour la session
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Impossible de récupérer le profil utilisateur.");
  }

  return res.json();
}

export async function logout(): Promise<void> {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Erreur lors de la déconnexion");
  }
}
