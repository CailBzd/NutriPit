// components/Logo.tsx
"use client";

import NextLink from "next/link";
import { Box, Link as ChakraLink } from "@chakra-ui/react";

export default function Logo() {
  return (
    <NextLink href="/" passHref>
      <ChakraLink _hover={{ textDecoration: "none" }} mr={8}>
        <Box display="flex" alignItems="center">
          {/* Logo SVG personnalisé */}
          <Box width="48px" height="48px" mr={2}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Dégradé chaud pour un bon contraste */}
                <linearGradient id="logoGradient" x1="0" y1="0" x2="48" y2="48">
                  <stop offset="0%" stopColor="#FFC107" />
                  <stop offset="100%" stopColor="#FF5722" />
                </linearGradient>
              </defs>
              {/* Cercle de fond */}
              <circle cx="24" cy="24" r="24" fill="url(#logoGradient)" />
              {/* Forme stylisée représentant une feuille */}
              <path
                d="M24 12C20 12 16 16 16 20C16 24 20 28 24 28C28 28 32 24 32 20C32 16 28 12 24 12Z"
                fill="white"
                opacity="0.9"
              />
            </svg>
          </Box>
        </Box>
      </ChakraLink>
    </NextLink>
  );
}
