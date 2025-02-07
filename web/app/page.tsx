// app/page.tsx
"use client";

import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import Logo from "../components/Logo";

export default function HomePage() {
  return (
    <VStack textAlign="center" py={10} px={6} spacing={8}>
      {/* Logo intégré en haut */}
      <Heading as="h2" size="xl">
        Bienvenue sur NutriPit
      </Heading>
      <Logo />
      <Text fontSize="lg">
        NutriPit est une solution numérique complète pour la gestion personnalisée des repas dans les établissements.
        Conçue pour répondre aux besoins des EHPAD, hôpitaux, et autres structures recevant du public,
        notre application facilite la planification des menus, le suivi nutritionnel et la gestion des stocks,
        tout en assurant une expérience utilisateur moderne et intuitive.
      </Text>
      <Button colorScheme="teal" variant="solid">
        En savoir plus
      </Button>
    </VStack>
  );
}
