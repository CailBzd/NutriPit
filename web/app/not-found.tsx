// app/not-found.tsx
"use client";

import ChakraWrapper from "@/components/ChakraWrapper";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <ChakraWrapper>
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h1" size="2xl" mb={4}>
          404 - Page non trouvée
        </Heading>
        <Text fontSize="lg">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </Text>
      </Box>
    </ChakraWrapper>
  );
}
