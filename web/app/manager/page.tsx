// 📂 app/manager/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Heading, Button } from "@chakra-ui/react";

export default function ManagerPage() {
  const router = useRouter();

  return (
    <Box textAlign="center" py={10}>
      <Heading>Bienvenue sur l'espace Manager</Heading>
      <Button colorScheme="blue" mt={4} onClick={() => router.push("/dashboard")}>
        Retour au Dashboard
      </Button>
    </Box>
  );
}
