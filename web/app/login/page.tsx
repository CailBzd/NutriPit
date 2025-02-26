// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VStack, HStack, Heading, Text, Input, Button } from "@chakra-ui/react";
import { apiPost } from "@/lib/apiClient";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    console.log("Début du handleSubmit, mode login =", isLogin);
    setLoading(true);
    setErrorMsg("");

    try {
      if (isLogin) {
        console.log("Appel de l'API de connexion avec email :", email);
        // Appel à l'API pour la connexion
        const result = await apiPost<{ user: any; role: string }>("/Auth/login", { email, password });
        console.log("Réponse API (login) :", result);
        const roleName = result.role;
        if (!roleName) {
          setErrorMsg("Aucun rôle trouvé pour cet utilisateur.");
          console.error("Erreur : Aucun rôle trouvé");
          setLoading(false);
          return;
        }
        console.log("Rôle de l'utilisateur :", roleName);
        // Redirection selon le rôle
        if (roleName === "administrator") {
          console.log("Redirection vers /admin");
          router.push("/admin");
        } else if (roleName === "manager") {
          console.log("Redirection vers /manager");
          router.push("/manager");
        } else if (roleName === "resident") {
          console.log("Redirection vers /resident");
          router.push("/resident");
        } else {
          console.log("Redirection vers /guest");
          router.push("/guest");
        }
      } else {
        console.log("Appel de l'API d'inscription avec email :", email);
        // Appel à l'API pour l'inscription
        const signupResult = await apiPost("/auth/signup", { email, password });
        console.log("Réponse API (signup) :", signupResult);
        alert("Inscription réussie. Veuillez vérifier votre email pour confirmer votre compte.");
        router.push("/login");
      }
    } catch (error: any) {
      console.error("Erreur dans handleSubmit :", error);
      setErrorMsg(error.message);
    } finally {
      console.log("Fin de l'exécution de handleSubmit");
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
