import type { Activite } from './types.ts';

/* Chaque résumé est écrit comme la suite du nom de l'auteur :
   « Yanis Belhacem » + « a déplacé l'opportunité… ». */

const AUTEUR = 'Yanis Belhacem';

export const activites: Activite[] = [
  { id: 'a1', type: 'Réunion', contactId: 'c1', date: '2026-09-05T16:40:00', resume: 'a déplacé l’opportunité « Rénovation du siège social » en Négociation', auteur: AUTEUR },
  { id: 'a2', type: 'Appel', contactId: 'c14', date: '2026-09-05T14:05:00', resume: 'a qualifié un besoin d’accompagnement ISO à boucler avant décembre', auteur: AUTEUR },
  { id: 'a3', type: 'Email', contactId: 'c5', date: '2026-09-05T10:20:00', resume: 'a reçu le bon de commande signé pour la Collection bureau 2027', auteur: AUTEUR },
  { id: 'a4', type: 'Note', contactId: 'c19', date: '2026-09-04T17:55:00', resume: 'a noté que le budget de la campagne est validé, décision fin octobre', auteur: AUTEUR },
  { id: 'a5', type: 'Appel', contactId: 'c1', date: '2026-09-04T11:30:00', resume: 'a fait le point sur le calendrier des travaux', auteur: AUTEUR },
  { id: 'a6', type: 'Réunion', contactId: 'c11', date: '2026-09-03T15:00:00', resume: 'a visité l’entrepôt nord avec l’équipe opérations', auteur: AUTEUR },
  { id: 'a7', type: 'Email', contactId: 'c3', date: '2026-09-02T09:15:00', resume: 'a transmis l’étude de faisabilité du parc solaire', auteur: AUTEUR },
  { id: 'a8', type: 'Appel', contactId: 'c7', date: '2026-09-01T16:10:00', resume: 'a cadré le périmètre de la refonte de l’outil de gestion', auteur: AUTEUR },
  { id: 'a9', type: 'Note', contactId: 'c14', date: '2026-09-01T08:45:00', resume: 'a passé l’opportunité « Accompagnement certification ISO » en Gagné', auteur: AUTEUR },
  { id: 'a10', type: 'Email', contactId: 'c9', date: '2026-08-31T14:25:00', resume: 'a envoyé le chiffrage du bloc opératoire, relance prévue le 8', auteur: AUTEUR },
  { id: 'a11', type: 'Réunion', contactId: 'c15', date: '2026-08-29T10:00:00', resume: 'a mené la revue de portefeuille annuelle avec la direction', auteur: AUTEUR },
  { id: 'a12', type: 'Appel', contactId: 'c2', date: '2026-08-28T15:40:00', resume: 'a discuté du renouvellement du contrat de maintenance', auteur: AUTEUR },
  { id: 'a13', type: 'Note', contactId: 'c13', date: '2026-08-27T18:05:00', resume: 'a rédigé le compte rendu de la visite du site de Grenoble', auteur: AUTEUR },
  { id: 'a14', type: 'Email', contactId: 'c17', date: '2026-08-25T11:50:00', resume: 'a envoyé la documentation qualité demandée', auteur: AUTEUR },
  { id: 'a15', type: 'Appel', contactId: 'c8', date: '2026-08-22T09:35:00', resume: 'a pris contact au sujet du projet d’archivage numérique', auteur: AUTEUR },
  { id: 'a16', type: 'Réunion', contactId: 'c5', date: '2026-08-21T14:00:00', resume: 'a signé la Collection bureau 2027', auteur: AUTEUR },
  { id: 'a17', type: 'Email', contactId: 'c4', date: '2026-08-19T16:20:00', resume: 'a relancé sur l’audit énergétique, réponse attendue mi-septembre', auteur: AUTEUR },
  { id: 'a18', type: 'Réunion', contactId: 'c3', date: '2026-08-18T11:00:00', resume: 'a animé un atelier technique avec le bureau d’études', auteur: AUTEUR },
  { id: 'a19', type: 'Note', contactId: 'c10', date: '2026-08-14T10:10:00', resume: 'a perdu la migration de la messagerie au profit d’un concurrent', auteur: AUTEUR },
  { id: 'a20', type: 'Appel', contactId: 'c18', date: '2026-08-08T13:45:00', resume: 'a fixé une visite du site de Quimper', auteur: AUTEUR },
  { id: 'a21', type: 'Note', contactId: 'c6', date: '2026-07-30T09:00:00', resume: 'a repoussé le projet de showroom au premier trimestre 2027', auteur: AUTEUR },
  { id: 'a22', type: 'Email', contactId: 'c12', date: '2026-07-24T15:15:00', resume: 'a envoyé la présentation de l’offre flotte utilitaires', auteur: AUTEUR },
  { id: 'a23', type: 'Appel', contactId: 'c16', date: '2026-05-11T14:30:00', resume: 'a clos le dernier échange avant mise en sommeil du compte', auteur: AUTEUR },
  { id: 'a24', type: 'Email', contactId: 'c20', date: '2026-04-16T17:40:00', resume: 'a envoyé le portfolio, sans retour depuis', auteur: AUTEUR },
];
