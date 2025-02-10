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
  