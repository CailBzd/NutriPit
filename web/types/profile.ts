// types/profile.ts

export interface Role {
    id: number;
    role_name: string;
  }
  
  // Dans Profile, si la jointure renvoie un tableau :
  export interface Profile {
    id: string; // ID de l'utilisateur (souvent un UUID)
    email?: string;
    avatar_url?: string;
    role_id: number;
    roles?: Role[]; // Remarquez le tableau ici
    // Ajoutez d'autres champs si nécessaire
  }
  
  export interface SignupResponse {
    id: string;
    email: string;
    role_id: string;
    // Autres champs si nécessaire
  }
  
  export interface LoginResponse {
    id: string;
    email: string;
    name?: string;
    role: string;
    // Autres champs si nécessaire
  }

  export interface Session {
    user: {
      id: string;
      email: string;
      // Autres champs si nécessaire
    };
    profile?: Profile;
  }