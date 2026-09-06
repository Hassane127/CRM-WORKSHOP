/* Les activités récentes : qui a fait quoi, avec quel contact, quand. */

import { contactParId, entrepriseParId, formaterDateHeure, nomComplet } from '@/data';
import type { Activite, TypeActivite } from '@/data/types.ts';

const ICONES: Record<TypeActivite, string> = {
  Appel: 'call',
  Email: 'mail',
  Réunion: 'groups',
  Note: 'edit_note',
};

export default function ListeActivites({ activites }: { activites: Activite[] }) {
  if (activites.length === 0) {
    return <p className="a-venir-texte">Aucune activité pour le moment.</p>;
  }

  return (
    <div className="activites">
      {activites.map((activite) => {
        const contact = contactParId(activite.contactId);
        const entreprise = contact ? entrepriseParId(contact.entrepriseId) : undefined;

        return (
          <div key={activite.id} className="activite">
            <span className="activite-pastille">
              <span className="icone" aria-hidden="true">
                {ICONES[activite.type]}
              </span>
            </span>

            <div className="activite-corps">
              <p className="activite-texte">
                <span className="activite-personne">{activite.auteur}</span>{' '}
                {activite.resume}
              </p>
              <p className="activite-meta">
                {activite.type} · {contact ? nomComplet(contact) : 'Contact inconnu'}
                {entreprise ? ' · ' + entreprise.nom : ''}
              </p>
            </div>

            <span className="activite-date">{formaterDateHeure(activite.date)}</span>
          </div>
        );
      })}
    </div>
  );
}
