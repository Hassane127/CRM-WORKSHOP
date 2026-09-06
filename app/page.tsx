import CarteIndicateur from '@/components/CarteIndicateur';
import GraphiquePipeline from '@/components/GraphiquePipeline';
import ListeActivites from '@/components/ListeActivites';
import {
  activitesRecentes,
  calculerIndicateurs,
  contacts,
  formaterMontantCourt,
  pipelineParEtape,
} from '@/data';

export default function Accueil() {
  const indicateurs = calculerIndicateurs();
  const barres = pipelineParEtape();
  const recentes = activitesRecentes(8);

  const clients = contacts.filter((c) => c.statut === 'Client').length;
  const prospects = contacts.filter((c) => c.statut === 'Prospect').length;
  const totalPipeline = barres
    .filter((b) => b.etape !== 'Gagné')
    .reduce((somme, b) => somme + b.montant, 0);

  return (
    <main className="page">
      <div className="page-entete">
        <div>
          <h1 className="page-titre">Tableau de bord</h1>
          <p className="page-sous-titre">
            Suivi des clients, opportunités et prochaines actions.
          </p>
        </div>
      </div>

      <section className="indicateurs">
        <CarteIndicateur
          libelle="Contacts"
          icone="group"
          valeur={String(indicateurs.nombreContacts)}
          tendance={{ texte: `${clients} clients`, sens: 'hausse' }}
          contexte={`${prospects} prospects à travailler`}
        />
        <CarteIndicateur
          libelle="Pipeline en cours"
          icone="trending_up"
          valeur={formaterMontantCourt(indicateurs.valeurEnCours)}
          tendance={{
            texte: `${indicateurs.nombreEnCours} ouvertes`,
            sens: 'hausse',
          }}
          contexte="Opportunités ni gagnées ni perdues"
        />
        <CarteIndicateur
          libelle="Signé"
          icone="verified"
          valeur={formaterMontantCourt(indicateurs.montantGagne)}
          tendance={{
            texte: `${indicateurs.nombreGagnees} affaires`,
            sens: 'hausse',
          }}
          contexte="Opportunités remportées"
        />
        <CarteIndicateur
          libelle="Tâches en retard"
          icone="schedule"
          valeur={String(indicateurs.tachesEnRetard)}
          tendance={{ texte: 'à traiter', sens: 'alerte' }}
          contexte={`Sur ${indicateurs.tachesOuvertes} tâches encore ouvertes`}
        />
      </section>

      <section className="carte">
        <div className="carte-entete">
          <h2 className="carte-titre">Pipeline par étape</h2>
          <span className="carte-note">
            {formaterMontantCourt(totalPipeline)} en cours de négociation
          </span>
        </div>
        <GraphiquePipeline barres={barres} />
      </section>

      <section className="carte">
        <div className="carte-entete">
          <h2 className="carte-titre">Activité récente</h2>
          <span className="carte-note">Les 8 derniers échanges</span>
        </div>
        <ListeActivites activites={recentes} />
      </section>
    </main>
  );
}
