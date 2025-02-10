import { createClient } from '@supabase/supabase-js';

// Récupérer les variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Ajouter des logs pour vérifier la récupération des variables d'environnement
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key:", supabaseKey ? "****" : "Non défini");

// Vérifier si les variables sont bien définies
if (!supabaseUrl || !supabaseKey) {
  console.error("Erreur : Les variables d'environnement Supabase ne sont pas définies.");
} else {
  console.log("Variables d'environnement Supabase correctement chargées.");
}

// Créer et exporter le client Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
