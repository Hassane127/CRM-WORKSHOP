'use client';

/* Barre supérieure : recherche globale, action principale, utilisateur.
   La recherche globale n'a pas son propre moteur : elle envoie le terme
   à la page Contacts, qui sait chercher. Une seule recherche existe
   réellement dans l'application, et c'est celle-là. */

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Barre() {
  const router = useRouter();
  const [terme, setTerme] = useState('');

  function envoyer(evenement: React.FormEvent) {
    evenement.preventDefault();
    const propre = terme.trim();
    router.push(propre === '' ? '/contacts' : `/contacts?q=${encodeURIComponent(propre)}`);
  }

  return (
    <header className="barre">
      <form className="recherche" onSubmit={envoyer} role="search">
        <button type="submit" className="recherche-envoi" aria-label="Lancer la recherche">
          <span className="icone" aria-hidden="true">
            search
          </span>
        </button>
        <input
          type="search"
          value={terme}
          onChange={(e) => setTerme(e.target.value)}
          placeholder="Rechercher un contact, une société…"
          aria-label="Recherche globale"
        />
      </form>

      <div className="barre-actions">
        <button type="button" className="bouton-principal">
          <span className="icone" aria-hidden="true">
            add
          </span>
          Créer
        </button>
        <span className="barre-utilisateur">
          <span className="avatar" aria-hidden="true">
            YB
          </span>
          Yanis Belhacem
        </span>
      </div>
    </header>
  );
}
