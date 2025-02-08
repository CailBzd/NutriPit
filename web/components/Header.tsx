// components/Header.tsx
"use client";

import NextLink from "next/link";
import {
  Flex,
  Heading,
  HStack,
  Button,
  Avatar,
  Spacer,
  Link as ChakraLink,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import Logo from "./Logo";

type HeaderProps = {
  isAuthenticated?: boolean;
  userAvatarUrl?: string;
};

export default function Header({
  isAuthenticated = false,
  userAvatarUrl,
}: HeaderProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  // Choix du background et couleur du texte selon le mode
  const bgColor = colorMode === "light" ? "teal.500" : "gray.900";
  const textColor = "white";

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      padding="1rem"
      bg={bgColor}
      color={textColor}
      boxShadow="sm"
    >
      {/* Logo (uniquement ChakraLink qui se comporte comme NextLink) */}
      <Logo/>
      <ChakraLink
        as={NextLink}
        href="/"
        _hover={{ textDecoration: "none" }}
        mr={8} // marge à droite pour séparer du menu
      >
        <Heading as="h1" size="lg" cursor="pointer">
          NutriPit
        </Heading>
      </ChakraLink>

      {/* Navigation */}
      <HStack spacing={6}>
        <ChakraLink
          as={NextLink}
          href="/"
          fontWeight="medium"
          _hover={{ color: "yellow.300" }}
        >
          Accueil
        </ChakraLink>
        <ChakraLink
          as={NextLink}
          href="/about"
          fontWeight="medium"
          _hover={{ color: "yellow.300" }}
        >
          À propos
        </ChakraLink>
        <ChakraLink
          as={NextLink}
          href="/contact"
          fontWeight="medium"
          _hover={{ color: "yellow.300" }}
        >
          Contact
        </ChakraLink>
      </HStack>

      <Spacer />

      {/* Section droite : actions et bascule du thème */}
      <HStack spacing={4}>
        <IconButton
          aria-label="Toggle theme"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="ghost"
          color={textColor}
        />
        {isAuthenticated ? (
          <Avatar size="sm" name="Utilisateur" src={userAvatarUrl} />
        ) : (
          <HStack spacing={2}>
            <Button
              leftIcon={<FiLogIn />}
              colorScheme="teal"
              variant="outline"
              size="sm"
            >
              Connexion
            </Button>
            <Button
              leftIcon={<FiUserPlus />}
              colorScheme="teal"
              variant="solid"
              size="sm"
            >
              Inscription
            </Button>
          </HStack>
        )}
      </HStack>
    </Flex>
  );
}
