// app/layout.tsx
import type { Metadata } from 'next';
// import { initializeDatabase } from '../lib/dbInit';

export const metadata: Metadata = {
  title: 'NutriPit API',
  description: 'API for NutriPit application',
};

// await initializeDatabase();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
