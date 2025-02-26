// services/apiHelper.ts

/**
 * Construit l'URL complète pour un endpoint donné.
 * @param controller - Le nom du contrôleur (par exemple "auth").
 * @param endpoint - L'endpoint spécifique (par exemple "signup" ou "login").
 * @returns L'URL complète construite.
 */
export function buildApiUrl(controller: string, endpoint: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
      throw new Error("La variable d'environnement NEXT_PUBLIC_API_BASE_URL n'est pas définie");
    }
    // Construit l'URL : par exemple, http://localhost:5001/api/auth/signup
    return `${baseUrl}/api/${controller}/${endpoint}`;
  }
  