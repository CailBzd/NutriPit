// 📂 app/guest/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Heading, Button } from "@chakra-ui/react";

export default function GuestPage() {
  const router = useRouter();

  return (
    <Box textAlign="center" py={10}>
      <Heading>Bienvenue, invité</Heading>
      <Button colorScheme="gray" mt={4} onClick={() => router.push("/dashboard")}>
        Retour au Dashboard
      </Button>
    </Box>
  );
}
