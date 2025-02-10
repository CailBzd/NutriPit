// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Avatar, Button, Heading, Text, VStack } from "@chakra-ui/react";
import supabase from "@/lib/supabase";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Récupère la session courante
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        router.push("/login");
      } else {
        setUser(data.session.user);
        // Récupérer le profil de l'utilisateur
        const { data: prof, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.session.user.id)
          .single();
        if (profileError) {
          console.error("Erreur lors de la récupération du profil", profileError);
        } else {
          setProfile(prof);
        }
      }
    };
    getSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <VStack spacing={6} py={10}>
      <Heading>Tableau de bord</Heading>
      {user && (
        <>
          <Avatar size="xl" name={user.email} src={profile?.avatar_url} />
          <Text>Bienvenue, {user.email}</Text>
          <Button onClick={handleLogout} colorScheme="teal">
            Se déconnecter
          </Button>
        </>
      )}
    </VStack>
  );
}
