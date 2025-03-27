// lib/apiClient.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:5001/api";

/**
 * Envoie une requête POST à l'API.
 * @param endpoint L'endpoint de l'API (ex. "/auth/login")
 * @param body Le corps de la requête au format JSON.
 * @returns La réponse de l'API parsée en JSON.
 * @throws Une erreur si la réponse n'est pas OK.
 */
export async function apiPost<T>(endpoint: string, body: any): Promise<T> {
  console.log(`[apiPost] Appel API vers : ${API_BASE_URL}${endpoint}`);
  console.log(`[apiPost] Corps de la requête :`, body);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  console.log(`[apiPost] Réponse : ${response.status} ${response.statusText}`);

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[apiPost] Erreur API : ${errorText}`);
    throw new Error(`API error: ${errorText}`);
  }

  const data = await response.json();
  console.log(`[apiPost] Données reçues :`, data);
  return data;
}
