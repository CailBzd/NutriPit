// components/Header.tsx
"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
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
  useColorModeValue,
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
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  // Couleur de fond et texte en fonction du mode clair/sombre
  const bgColor = colorMode === "light" ? "teal.500" : "gray.900";
  const textColor = "white";

  // Actions de redirection pour les boutons du header
  const handleLogin = () => router.push("/login");
  const handleSignup = () => router.push("/signup");
  const handleDashboard = () => router.push("/dashboard");

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
      </HStack>

      <Spacer />

      {/* Section droite : Actions et bascule du thème */}
      <HStack spacing={4}>
        <IconButton
          aria-label="Toggle theme"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="ghost"
          size="lg"
          color={textColor}
        />
        {isAuthenticated ? (
          <Avatar
            size="sm"
            name="Utilisateur"
            src={userAvatarUrl}
            onClick={handleDashboard}
            cursor="pointer"
          />
        ) : (
          <HStack spacing={2}>
            <Button
              leftIcon={<FiLogIn />}
              colorScheme="teal"
              variant="outline"
              size="sm"
              onClick={handleLogin}
            >
              Connexion
            </Button>
            <Button
              leftIcon={<FiUserPlus />}
              colorScheme="teal"
              variant="solid"
              size="sm"
              onClick={handleSignup}
            >
              Inscription
            </Button>
          </HStack>
        )}
      </HStack>
    </Flex>
  );
}
