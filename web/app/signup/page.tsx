// app/signup/page.tsx (ou src/pages/signup.tsx)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VStack, Heading, Input, Button, Text, HStack } from "@chakra-ui/react";
import { signup } from "@/services/authService";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      await signup(email, password);
      alert("Inscription réussie. Veuillez vérifier votre email pour confirmer votre compte.");
      router.push("/login");
    } catch (error: any) {
      setErrorMsg(error.message);
    }
    setLoading(false);
  };

  return (
    <VStack spacing={4} align="center" py={10}>
      <Heading>Inscription</Heading>
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
      <Text fontSize="sm" color="gray.500">
        Votre rôle sera <b>gérant</b> par défaut.
      </Text>
      <Button onClick={handleSignup} colorScheme="teal" isLoading={loading}>
        S'inscrire
      </Button>
      <HStack>
        <Text>Déjà inscrit ?</Text>
        <Button variant="link" onClick={() => router.push("/login")}>
          Se connecter
        </Button>
      </HStack>
    </VStack>
  );
}
