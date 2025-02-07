// components/Footer.tsx
export default function Footer() {
    return (
      <footer style={{ padding: '1rem', backgroundColor: '#f8f8f8', textAlign: 'center' }}>
        <p>&copy; {new Date().getFullYear()} NutriPit. Tous droits réservés.</p>
      </footer>
    );
  }
  