'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type EntreeMenu = {
  href: string;
  libelle: string;
  icone: string;
  compteur?: number;
};

export default function Menu({ entrees }: { entrees: EntreeMenu[] }) {
  const chemin = usePathname();

  return (
    <nav className="menu" aria-label="Navigation principale">
      <div className="menu-marque">
        <span className="menu-logo" aria-hidden="true">
          Sa
        </span>
        <span className="menu-nom">
          Sa CRM
          <span className="menu-sous-nom">Espace commercial</span>
        </span>
      </div>

      <div>
        <p className="menu-section">Pilotage</p>
        <div className="menu-liste">
          {entrees.map((entree) => {
            const actif =
              entree.href === '/'
                ? chemin === '/'
                : chemin.startsWith(entree.href);

            return (
              <Link
                key={entree.href}
                href={entree.href}
                className="menu-lien"
                aria-current={actif ? 'page' : undefined}
              >
                <span className="icone" aria-hidden="true">
                  {entree.icone}
                </span>
                <span className="menu-lien-nom">{entree.libelle}</span>
                {entree.compteur !== undefined && (
                  <span className="menu-compteur">{entree.compteur}</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="menu-bas">
        <div className="menu-utilisateur">
          <span className="avatar" aria-hidden="true">
            YB
          </span>
          <span className="menu-utilisateur-nom">
            Yanis Belhacem
            <span className="menu-utilisateur-role">Responsable commercial</span>
          </span>
        </div>
      </div>
    </nav>
  );
}
