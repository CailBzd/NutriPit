// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Input, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import type { Profile } from "../../types/profile";
import supabase from "@/lib/supabase";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true); // true = connexion, false = inscription
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMsg("");

    if (isLogin) {
      // Connexion
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }
      const user = data.user;
      if (!user) {
        setErrorMsg("Utilisateur introuvable.");
        setLoading(false);
        return;
      }
      // Récupérer le profil de l'utilisateur, en supposant qu'une jointure renvoie un tableau de rôles
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("role_id, roles(role_name)")
        .eq("id", user.id)
        .single();

      if (profileError) {
        setErrorMsg(profileError.message);
        setLoading(false);
        return;
      }

      // Caster le résultat en type Profile
      const profile = profileData as Profile;
      const roleName = profile.roles?.[0]?.role_name;
      if (!roleName) {
        setErrorMsg("Aucun rôle trouvé pour cet utilisateur.");
        setLoading(false);
        return;
      }

      // Redirection selon le rôle de l'utilisateur
      if (roleName === "administrator") {
        router.push("/admin");
      } else if (roleName === "manager") {
        router.push("/manager");
      } else if (roleName === "resident") {
        router.push("/resident");
      } else {
        router.push("/guest");
      }
    } else {
      // Inscription
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }
      alert("Inscription réussie. Veuillez vérifier votre email pour confirmer votre compte.");
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} align="center" py={10}>
      <Heading>{isLogin ? "Connexion" : "Inscription"}</Heading>
      {errorMsg && <Text color="red.500">{errorMsg}</Text>}
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        width="300px"
      />
      <Input
        placeholder="Mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        width="300px"
      />
      <Button onClick={handleSubmit} colorScheme="teal" isLoading={loading}>
        {isLogin ? "Se connecter" : "S'inscrire"}
      </Button>
      <HStack>
        <Text>{isLogin ? "Pas encore inscrit ?" : "Déjà inscrit ?"}</Text>
        <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Créer un compte" : "Se connecter"}
        </Button>
      </HStack>
    </VStack>
  );
}
