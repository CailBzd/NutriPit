// components/Header.tsx
"use client";

import NextLink from "next/link";
import {
  Flex,
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

  // Choix du background et de la couleur du texte en fonction du mode
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
      {/* Section gauche : Logo et navigation */}
      <HStack spacing={8} alignItems="center">
        <Logo />
        <HStack spacing={6}>
          <NextLink href="/" passHref>
            <ChakraLink fontWeight="medium" _hover={{ color: "yellow.300" }}>
              Accueil
            </ChakraLink>
          </NextLink>
          <NextLink href="/about" passHref>
            <ChakraLink fontWeight="medium" _hover={{ color: "yellow.300" }}>
              À propos
            </ChakraLink>
          </NextLink>
          <NextLink href="/contact" passHref>
            <ChakraLink fontWeight="medium" _hover={{ color: "yellow.300" }}>
              Contact
            </ChakraLink>
          </NextLink>
        </HStack>
      </HStack>

      <Spacer />

      {/* Section droite : Actions et bascule du thème */}
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
            <Button leftIcon={<FiLogIn />} colorScheme="teal" variant="outline" size="sm">
              Connexion
            </Button>
            <Button leftIcon={<FiUserPlus />} colorScheme="teal" variant="solid" size="sm">
              Inscription
            </Button>
          </HStack>
        )}
      </HStack>
    </Flex>
  );
}
