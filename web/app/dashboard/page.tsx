// 📂 app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Heading, Spinner } from "@chakra-ui/react";
import { getUserProfile } from "@/services/authService";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserRole() {
      try {
        const profile = await getUserProfile();
        const roleName = profile?.role_name || "guest";

        console.log("Redirection en fonction du rôle :", roleName);

        if (roleName === "administrator") {
          router.push("/admin");
        } else if (roleName === "manager") {
          router.push("/manager");
        } else if (roleName === "resident") {
          router.push("/resident");
        } else {
          router.push("/guest");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
        router.push("/guest");
      } finally {
        setLoading(false);
      }
    }

    fetchUserRole();
  }, [router]);

  return (
    <Box textAlign="center" py={10}>
      {loading ? <Spinner size="xl" /> : <Heading>Redirection en cours...</Heading>}
    </Box>
  );
}
