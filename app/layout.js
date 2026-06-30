import './globals.css';

export const metadata = {
  title: 'Stratégie Création de Contenu',
  description: 'Calendrier interactif + stratégie complète pour ta production vidéo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
