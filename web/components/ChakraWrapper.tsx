"use client";
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import type { ReactNode } from "react";


export default function ChakraWrapper({ children }: { children: ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
