// 📂 app/resident/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Heading, Button } from "@chakra-ui/react";

export default function ResidentPage() {
  const router = useRouter();

  return (
    <Box textAlign="center" py={10}>
      <Heading>Bienvenue, résident</Heading>
      <Button colorScheme="green" mt={4} onClick={() => router.push("/dashboard")}>
        Retour au Dashboard
      </Button>
    </Box>
  );
}
