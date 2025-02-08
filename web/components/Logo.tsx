// components/Logo.tsx
"use client";

import NextLink from "next/link";
import { Box, Link as ChakraLink } from "@chakra-ui/react";

export default function Logo() {
  return (
    <ChakraLink
      as={NextLink}
      href="/"
      _hover={{ textDecoration: "none" }}
      mr={8} // marge à droite pour séparer le logo de la navigation
    >
      <Box display="flex" alignItems="center">
        {/* Logo SVG personnalisé */}
        <Box width="48px" height="68px" mr={2}>
          <svg
            width="48"
            height="68"
            viewBox="0 0 48 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="logoGradient" x1="0" y1="0" x2="48" y2="48">
                <stop offset="0%" stopColor="#FFC107" />
                <stop offset="100%" stopColor="#FF5722" />
              </linearGradient>
            </defs>
            {/* Cercle de fond */}
            <circle cx="24" cy="24" r="24" fill="url(#logoGradient)" />
            {/* Symbole diététique : une feuille stylisée et un symbole repas */}
            {/* Dessin de la feuille */}
            <path
              d="M24 12 C18 20, 18 28, 24 36 C30 28, 30 20, 24 12 Z"
              fill="white"
            />
            {/* Ajout d'un symbole repas (par exemple, un petit couvercle de bol) en dessous */}
            <rect x="16" y="40" width="16" height="4" fill="white" rx="2" />
          </svg>
        </Box>
      </Box>
    </ChakraLink>
  );
}
  