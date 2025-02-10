// dbInit.ts
import { Client } from 'pg';

export async function initializeDatabase() {
  // La connexion utilise la variable d'environnement SUPABASE_DB_URL
  const client = new Client({
    connectionString: process.env.SUPABASE_DB_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Vérifier si la table "roles" existe
    const rolesCheck = await client.query(
      `SELECT to_regclass('public.roles') as table_name;`
    );
    if (!rolesCheck.rows[0].table_name) {
      console.log('Table "roles" inexistante, création...');
      await client.query(`
        CREATE TABLE roles (
          id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
          role_name text NOT NULL UNIQUE
        );
      `);
      // Injection des rôles par défaut
      await client.query(`
        INSERT INTO roles (role_name)
        VALUES ('manager'), ('administrator');
      `);
      console.log('Table "roles" créée et peuplée.');
    } else {
      console.log('Table "roles" déjà existante.');
    }

    // Vérifier si la table "users" existe
    const usersCheck = await client.query(
      `SELECT to_regclass('public.users') as table_name;`
    );
    if (!usersCheck.rows[0].table_name) {
      console.log('Table "users" inexistante, création...');
      await client.query(`
        CREATE TABLE users (
          id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
          email text NOT NULL UNIQUE,
          password text NOT NULL,
          role_id uuid REFERENCES roles(id)
        );
      `);
      // Injection du compte administrateur
      // Note : Pour le mot de passe, pensez à utiliser une version hashée
      await client.query(`
        INSERT INTO users (email, password, role_id)
        SELECT 'admin@example.com', 'hashed_admin_password', id
        FROM roles
        WHERE role_name = 'administrator'
        ON CONFLICT DO NOTHING;
      `);
      console.log('Table "users" créée et compte administrateur inséré.');
    } else {
      console.log('Table "users" déjà existante.');
    }

    // Vérifier si le trigger d'authentification existe
    const triggerCheck = await client.query(
      `SELECT tgname FROM pg_trigger WHERE tgname = 'auth_trigger';`
    );
    if (triggerCheck.rows.length === 0) {
      console.log('Trigger d\'authentification inexistant, création...');
      // Création d'une fonction de trigger (exemple simple)
      await client.query(`
        CREATE OR REPLACE FUNCTION check_auth_trigger()
        RETURNS trigger AS $$
        BEGIN
          -- Ici, vous pouvez ajouter votre logique pour vérifier l'authentification
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `);
      // Création du trigger sur la table "users"
      await client.query(`
        CREATE TRIGGER auth_trigger
        BEFORE INSERT ON users
        FOR EACH ROW EXECUTE FUNCTION check_auth_trigger();
      `);
      console.log('Trigger d\'authentification créé.');
    } else {
      console.log('Trigger d\'authentification déjà existant.');
    }
  } catch (err) {
    console.error('Erreur lors de l\'initialisation de la base :', err);
  } finally {
    await client.end();
    console.log('Déconnexion de la base.');
  }
}
