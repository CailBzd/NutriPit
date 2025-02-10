// 📂 types/profile.ts
export interface UserProfile {
    id: string;
    email: string;
    role_id: string;
    role_name: string;
  }
  
  // ✅ Ce type correspond EXACTEMENT à la structure retournée par Supabase
  export interface UserProfileFromDB {
    id: string;
    email: string;
    role_id: string;
    roles?: { role_name: string } | null; // Gère la relation avec `roles`
  }
  