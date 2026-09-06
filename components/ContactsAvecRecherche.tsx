'use client';

/* Fait le lien entre la recherche globale de la barre du haut et la liste.
   Le terme voyage dans l'adresse (/contacts?q=…) : la page reste
   pré-générée, c'est le navigateur qui lit le paramètre.
   La clé force la liste à repartir du bon terme à chaque nouvelle
   recherche lancée depuis la barre du haut. */

import { useSearchParams } from 'next/navigation';
import ListeContacts from './ListeContacts';
import type { LigneContact } from './ListeContacts';

export default function ContactsAvecRecherche({
  lignes,
  statuts,
  entreprises,
}: {
  lignes: LigneContact[];
  statuts: string[];
  entreprises: string[];
}) {
  const parametres = useSearchParams();
  const terme = parametres.get('q') ?? '';

  return (
    <ListeContacts
      key={terme}
      lignes={lignes}
      statuts={statuts}
      entreprises={entreprises}
      rechercheInitiale={terme}
    />
  );
}
