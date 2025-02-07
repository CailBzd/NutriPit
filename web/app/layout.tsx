// app/layout.tsx
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChakraWrapper from "@/components/ChakraWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <title>NutriPit</title>
      </head>
      <body>
        <ChakraWrapper>
          <Header />
          <main style={{ minHeight: "80vh", padding: "1rem" }}>
            {children}
          </main>
          <Footer />
        </ChakraWrapper>
      </body>
    </html>
  );
}
