const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:5001/api";

/**
 * Envoie une requête POST à l'API.
 * @param endpoint L'endpoint de l'API (ex. "/auth/login")
 * @param body Le corps de la requête au format JSON.
 * @returns La réponse de l'API parsée en JSON.
 * @throws Une erreur si la réponse n'est pas OK.
 */
export async function apiPost<T>(endpoint: string, body: any): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    // Analyse de la réponse d'erreur pour fournir un message plus précis
    const errorData = await response.json();
    throw new Error(errorData.message || `Erreur API: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
