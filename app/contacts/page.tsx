import ListeContacts from '@/components/ListeContacts';
import type { LigneContact } from '@/components/ListeContacts';
import {
  contacts,
  entreprises,
  entrepriseParId,
  formaterDate,
  nomComplet,
} from '@/data';

export const metadata = {
  title: 'Contacts — Sa CRM',
};

export default function PageContacts() {
  const lignes: LigneContact[] = contacts.map((contact) => {
    const entreprise = entrepriseParId(contact.entrepriseId);

    return {
      id: contact.id,
      nom: nomComplet(contact),
      initiales: (contact.prenom[0] + contact.nom[0]).toUpperCase(),
      fonction: contact.fonction,
      email: contact.email,
      statut: contact.statut,
      entreprise: entreprise ? entreprise.nom : 'Entreprise inconnue',
      derniereActivite: formaterDate(contact.derniereActivite),
    };
  });

  const statuts = [...new Set(contacts.map((c) => c.statut))].sort();
  const nomsEntreprises = entreprises.map((e) => e.nom).sort();

  return (
    <main className="page">
      <div className="page-entete">
        <div>
          <h1 className="page-titre">Contacts</h1>
          <p className="page-sous-titre">
            Toutes les personnes suivies par l’équipe commerciale.
          </p>
        </div>
      </div>

      <section className="carte">
        <ListeContacts
          lignes={lignes}
          statuts={statuts}
          entreprises={nomsEntreprises}
        />
      </section>
    </main>
  );
}
