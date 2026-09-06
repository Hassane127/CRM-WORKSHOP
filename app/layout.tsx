import type { Metadata } from 'next';
import Menu from '@/components/Menu';
import Barre from '@/components/Barre';
import type { EntreeMenu } from '@/components/Menu';
import { contacts, entreprises, opportunites, taches } from '@/data';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sa CRM',
  description: 'Espace commercial Sa — contacts, entreprises, opportunités, tâches.',
};

const ENTREES: EntreeMenu[] = [
  { href: '/', libelle: 'Accueil', icone: 'dashboard' },
  { href: '/contacts', libelle: 'Contacts', icone: 'group', compteur: contacts.length },
  { href: '/entreprises', libelle: 'Entreprises', icone: 'apartment', compteur: entreprises.length },
  { href: '/opportunites', libelle: 'Opportunités', icone: 'trending_up', compteur: opportunites.length },
  { href: '/taches', libelle: 'Tâches', icone: 'task_alt', compteur: taches.filter((t) => !t.terminee).length },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400,0..1,0&display=swap"
        />
      </head>
      <body>
        <div className="app">
          <Menu entrees={ENTREES} />
          <div className="contenu">
            <Barre />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
