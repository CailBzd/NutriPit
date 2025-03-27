// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VStack, HStack, Heading, Text, Input, Button } from "@chakra-ui/react";
import { apiPost } from "@/lib/apiClient";
import { Profile, Role } from "@/types/profile";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    // Indique que le processus de soumission a commencé
    setLoading(true);
    // Réinitialise le message d'erreur
    setErrorMsg("");

    try {
      if (isLogin) {
        // Appel à l'API pour la connexion
        const result = await apiPost<{ user: Profile; role: Role }>("/auth/login", { email, password });

        // Vérifie si un rôle est associé à l'utilisateur
        const role = result.role;
        if (!role) {
          setErrorMsg("Aucun rôle trouvé pour cet utilisateur.");
          setLoading(false);
          return;
        }

        // Redirection selon le rôle de l'utilisateur
        switch (role.roleName) {
          case "administrator":
            router.push("/admin");
            break;
          case "manager":
            router.push("/manager");
            break;
          case "resident":
            router.push("/resident");
            break;
          default:
            router.push("/guest");
        }
      } else {
        // Appel à l'API pour l'inscription
        const signupResult = await apiPost("/auth/signup", { email, password });
        alert("Inscription réussie. Veuillez vérifier votre email pour confirmer votre compte.");
        router.push("/login");
      }
    } catch (error: any) {
      // Affiche un message d'erreur en cas d'échec de la requête
      setErrorMsg(error.message || "Une erreur inattendue s'est produite.");
    } finally {
      // Indique que le processus de soumission est terminé
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
