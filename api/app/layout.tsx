// app/layout.tsx
import '../globals.css';
import Header from '../../web/components/Header';
import Footer from '../../web/components/Footer';

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
        <Header />
        <main style={{ minHeight: '80vh', padding: '1rem' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
