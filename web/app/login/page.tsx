// 📂 app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Input, Heading, Text, VStack } from "@chakra-ui/react";
import { login } from "@/services/authService";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const user = await login(email, password);
      if (user) {
        console.log("Connexion réussie, redirection vers le dashboard...", user);
        router.push("/dashboard"); // On redirige après connexion
      }
    } catch (error: any) {
      setErrorMsg(error.message || "Erreur lors de la connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} align="center" py={10}>
      <Heading>Connexion</Heading>
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
      <Button onClick={handleLogin} colorScheme="teal" isLoading={loading}>
        Se connecter
      </Button>
    </VStack>
  );
}
