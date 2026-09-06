import Link from 'next/link';
import { notFound } from 'next/navigation';
import ListeActivites from '@/components/ListeActivites';
import {
  activitesDuContact,
  contactParId,
  contacts,
  entrepriseParId,
  estEnRetard,
  formaterDate,
  formaterEuros,
  nomComplet,
  opportunitesDuContact,
  tachesDuContact,
} from '@/data';

/* Les 20 fiches sont connues à l'avance : on les génère toutes au build.
   Aucun serveur n'est nécessaire pour les afficher. */
export function generateStaticParams() {
  return contacts.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contact = contactParId(id);
  return { title: contact ? `${nomComplet(contact)} — Sa CRM` : 'Contact — Sa CRM' };
}

const CLASSES_STATUT: Record<string, string> = {
  Client: 'badge badge-client',
  Prospect: 'badge badge-prospect',
  Lead: 'badge badge-lead',
  Inactif: 'badge badge-inactif',
};

function classeEtape(etape: string): string {
  if (etape === 'Gagné') return 'badge badge-gagne';
  if (etape === 'Perdu') return 'badge badge-perdu';
  return 'badge badge-encours';
}

export default async function FicheContact({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contact = contactParId(id);
  if (!contact) notFound();

  const entreprise = entrepriseParId(contact.entrepriseId);
  const sesOpportunites = opportunitesDuContact(contact.id);
  const sesTaches = tachesDuContact(contact.id);
  const sesActivites = activitesDuContact(contact.id);
  const initiales = (contact.prenom[0] + contact.nom[0]).toUpperCase();

  return (
    <main className="page">
      <Link href="/contacts" className="retour">
        <span className="icone" aria-hidden="true">
          arrow_back
        </span>
        Retour aux contacts
      </Link>

      <div className="page-entete">
        <div className="fiche-entete">
          <span className="avatar-grand" aria-hidden="true">
            {initiales}
          </span>
          <div>
            <h1 className="page-titre">{nomComplet(contact)}</h1>
            <p className="page-sous-titre">
              {contact.fonction}
              {entreprise ? ' · ' + entreprise.nom : ''}
            </p>
          </div>
        </div>
        <span className={CLASSES_STATUT[contact.statut] ?? 'badge'}>
          {contact.statut}
        </span>
      </div>

      <div className="fiche-colonnes">
        <div className="fiche-pile">
          <section className="carte">
            <div className="carte-entete">
              <h2 className="carte-titre">Informations</h2>
            </div>
            <div className="paire">
              <span className="paire-cle">Email</span>
              <span className="paire-valeur">{contact.email}</span>
            </div>
            <div className="paire">
              <span className="paire-cle">Téléphone</span>
              <span className="paire-valeur">{contact.telephone}</span>
            </div>
            <div className="paire">
              <span className="paire-cle">Fonction</span>
              <span className="paire-valeur">{contact.fonction}</span>
            </div>
            <div className="paire">
              <span className="paire-cle">Dernière activité</span>
              <span className="paire-valeur">
                {formaterDate(contact.derniereActivite)}
              </span>
            </div>
          </section>

          {entreprise && (
            <section className="carte">
              <div className="carte-entete">
                <h2 className="carte-titre">{entreprise.nom}</h2>
              </div>
              <div className="paire">
                <span className="paire-cle">Secteur</span>
                <span className="paire-valeur">{entreprise.secteur}</span>
              </div>
              <div className="paire">
                <span className="paire-cle">Ville</span>
                <span className="paire-valeur">{entreprise.ville}</span>
              </div>
              <div className="paire">
                <span className="paire-cle">Effectif</span>
                <span className="paire-valeur">{entreprise.effectif} salariés</span>
              </div>
              <div className="paire">
                <span className="paire-cle">Site</span>
                <span className="paire-valeur">{entreprise.siteWeb}</span>
              </div>
            </section>
          )}
        </div>

        <div className="fiche-pile">
          <section className="carte">
            <div className="carte-entete">
              <h2 className="carte-titre">Opportunités</h2>
              <span className="carte-note">
                {sesOpportunites.length === 0
                  ? 'aucune'
                  : sesOpportunites.length + ' au total'}
              </span>
            </div>
            {sesOpportunites.length === 0 ? (
              <p className="liste-vide">Aucune opportunité pour ce contact.</p>
            ) : (
              sesOpportunites.map((o) => (
                <div key={o.id} className="ligne-liste">
                  <span>
                    <span className="ligne-titre">{o.titre}</span>
                    <span className="ligne-meta">
                      Clôture prévue le {formaterDate(o.dateCloture)}
                    </span>
                  </span>
                  <span className="ligne-droite">
                    <span className="ligne-montant">{formaterEuros(o.montant)}</span>
                    <span className={classeEtape(o.etape)}>{o.etape}</span>
                  </span>
                </div>
              ))
            )}
          </section>

          <section className="carte">
            <div className="carte-entete">
              <h2 className="carte-titre">Tâches</h2>
              <span className="carte-note">
                {sesTaches.filter((t) => !t.terminee).length} à faire
              </span>
            </div>
            {sesTaches.length === 0 ? (
              <p className="liste-vide">Aucune tâche pour ce contact.</p>
            ) : (
              sesTaches.map((t) => (
                <div key={t.id} className="ligne-liste">
                  <span>
                    <span className="ligne-titre">{t.titre}</span>
                    <span className="ligne-meta">
                      Échéance le {formaterDate(t.echeance)} · priorité{' '}
                      {t.priorite.toLowerCase()}
                    </span>
                  </span>
                  <span className="ligne-droite">
                    {t.terminee ? (
                      <span className="badge badge-fait">Terminée</span>
                    ) : estEnRetard(t) ? (
                      <span className="badge badge-retard">En retard</span>
                    ) : (
                      <span className="badge badge-encours">À faire</span>
                    )}
                  </span>
                </div>
              ))
            )}
          </section>

          <section className="carte">
            <div className="carte-entete">
              <h2 className="carte-titre">Historique</h2>
              <span className="carte-note">
                {sesActivites.length} échange{sesActivites.length > 1 ? 's' : ''}
              </span>
            </div>
            <ListeActivites activites={sesActivites} />
          </section>
        </div>
      </div>
    </main>
  );
}
