'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

export type LigneContact = {
  id: string;
  nom: string;
  initiales: string;
  fonction: string;
  email: string;
  statut: string;
  entreprise: string;
  derniereActivite: string;
};

/** Enlève les accents et la casse : « Hélène » se trouve en tapant « helene ». */
function sansAccent(texte: string): string {
  return texte
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

const CLASSES_STATUT: Record<string, string> = {
  Client: 'badge badge-client',
  Prospect: 'badge badge-prospect',
  Lead: 'badge badge-lead',
  Inactif: 'badge badge-inactif',
};

export default function ListeContacts({
  lignes,
  statuts,
  entreprises,
}: {
  lignes: LigneContact[];
  statuts: string[];
  entreprises: string[];
}) {
  const [recherche, setRecherche] = useState('');
  const [statut, setStatut] = useState('Tous');
  const [entreprise, setEntreprise] = useState('Toutes');

  const visibles = useMemo(() => {
    const terme = sansAccent(recherche.trim());

    return lignes.filter((ligne) => {
      if (statut !== 'Tous' && ligne.statut !== statut) return false;
      if (entreprise !== 'Toutes' && ligne.entreprise !== entreprise) return false;
      if (terme === '') return true;

      const champs = sansAccent(
        [ligne.nom, ligne.fonction, ligne.email, ligne.entreprise].join(' ')
      );
      return champs.includes(terme);
    });
  }, [lignes, recherche, statut, entreprise]);

  const filtreActif =
    recherche.trim() !== '' || statut !== 'Tous' || entreprise !== 'Toutes';

  function toutEffacer() {
    setRecherche('');
    setStatut('Tous');
    setEntreprise('Toutes');
  }

  return (
    <>
      <div className="filtres">
        <label className="champ champ-large">
          <span className="icone" aria-hidden="true">
            search
          </span>
          <input
            type="search"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher un nom, une fonction, un email…"
            aria-label="Rechercher un contact"
          />
        </label>

        <label className="champ">
          <span className="icone" aria-hidden="true">
            filter_alt
          </span>
          <select
            value={statut}
            onChange={(e) => setStatut(e.target.value)}
            aria-label="Filtrer par statut"
          >
            <option value="Tous">Tous les statuts</option>
            {statuts.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="champ">
          <span className="icone" aria-hidden="true">
            apartment
          </span>
          <select
            value={entreprise}
            onChange={(e) => setEntreprise(e.target.value)}
            aria-label="Filtrer par entreprise"
          >
            <option value="Toutes">Toutes les entreprises</option>
            {entreprises.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </label>

        <span className="filtres-resultat" aria-live="polite">
          {visibles.length} contact{visibles.length > 1 ? 's' : ''} sur {lignes.length}
        </span>
      </div>

      {visibles.length === 0 ? (
        <div className="aucun-resultat">
          <span className="icone" aria-hidden="true">
            search_off
          </span>
          <p className="aucun-resultat-titre">Aucun contact ne correspond.</p>
          <p className="aucun-resultat-aide">
            Essayez un autre mot, ou remettez les filtres à zéro.
          </p>
          <button type="button" className="bouton-principal" onClick={toutEffacer}>
            Tout afficher
          </button>
        </div>
      ) : (
        <div className="tableau-cadre">
          <table className="tableau">
            <thead>
              <tr>
                <th scope="col">Contact</th>
                <th scope="col">Entreprise</th>
                <th scope="col">Email</th>
                <th scope="col">Statut</th>
                <th scope="col">Dernière activité</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((ligne) => (
                <tr key={ligne.id}>
                  <td>
                    <Link href={`/contacts/${ligne.id}`} className="cellule-personne">
                      <span className="avatar" aria-hidden="true">
                        {ligne.initiales}
                      </span>
                      <span>
                        <span className="cellule-nom">{ligne.nom}</span>
                        <span className="cellule-fonction">{ligne.fonction}</span>
                      </span>
                    </Link>
                  </td>
                  <td className="cellule-discrete">
                    <Link href={`/contacts/${ligne.id}`}>{ligne.entreprise}</Link>
                  </td>
                  <td className="cellule-discrete">
                    <Link href={`/contacts/${ligne.id}`}>{ligne.email}</Link>
                  </td>
                  <td>
                    <Link href={`/contacts/${ligne.id}`}>
                      <span className={CLASSES_STATUT[ligne.statut] ?? 'badge'}>
                        {ligne.statut}
                      </span>
                    </Link>
                  </td>
                  <td className="cellule-date">
                    <Link href={`/contacts/${ligne.id}`}>{ligne.derniereActivite}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filtreActif && visibles.length > 0 && (
        <p className="aucun-resultat-aide">
          Filtre en cours. {lignes.length - visibles.length} contact
          {lignes.length - visibles.length > 1 ? 's' : ''} masqué
          {lignes.length - visibles.length > 1 ? 's' : ''}.
        </p>
      )}
    </>
  );
}
