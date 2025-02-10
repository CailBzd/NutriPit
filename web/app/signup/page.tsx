// app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import supabase from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setErrorMsg("");

    // On transmet dans les métadonnées que le rôle sera "manager" (gérant) par défaut.
    const { data, error } = await supabase.auth.signUp({
      email : "bizard.pierre@hotmail.fr",
      password: "07059119-maI",
      options: {
        data: {
          role: 'manager'  // par exemple, "manager" par défaut
        }
      }
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    alert(
      "Inscription réussie. Veuillez vérifier votre email pour confirmer votre compte."
    );
    router.push("/login");
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
