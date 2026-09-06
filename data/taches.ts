import type { Tache } from './types.ts';

export const taches: Tache[] = [
  { id: 't1', titre: 'Rappeler Camille Fournier', contactId: 'c1', echeance: '2026-09-02', terminee: false, priorite: 'Haute' },
  { id: 't2', titre: 'Envoyer la proposition logistique', contactId: 'c11', echeance: '2026-09-04', terminee: false, priorite: 'Haute' },
  { id: 't3', titre: 'Relancer Paul Rousseau', contactId: 'c10', echeance: '2026-08-29', terminee: false, priorite: 'Normale' },
  { id: 't4', titre: 'Préparer la revue de compte Groupe Vallier', contactId: 'c1', echeance: '2026-09-10', terminee: false, priorite: 'Normale' },
  { id: 't5', titre: 'Appel de qualification Antoine Girard', contactId: 'c14', echeance: '2026-09-08', terminee: false, priorite: 'Haute' },
  { id: 't6', titre: 'Réviser le tarif Ovalie Assurances', contactId: 'c15', echeance: '2026-09-11', terminee: false, priorite: 'Normale' },
  { id: 't7', titre: 'Atelier besoins Groupe Vallier', contactId: 'c2', echeance: '2026-09-14', terminee: false, priorite: 'Basse' },
  { id: 't8', titre: 'Soutenance Nordisk Énergies', contactId: 'c3', echeance: '2026-09-16', terminee: false, priorite: 'Haute' },
  { id: 't9', titre: 'Relancer le devis Studio Polar', contactId: 'c19', echeance: '2026-09-18', terminee: false, priorite: 'Normale' },
  { id: 't10', titre: 'Point mensuel Voile Santé', contactId: 'c9', echeance: '2026-09-21', terminee: false, priorite: 'Basse' },
  { id: 't11', titre: 'Compte rendu de visite Praxel', contactId: 'c13', echeance: '2026-08-27', terminee: true, priorite: 'Normale' },
  { id: 't12', titre: 'Envoyer le contrat Atelier Nomade', contactId: 'c5', echeance: '2026-08-21', terminee: true, priorite: 'Haute' },
  { id: 't13', titre: 'Mettre à jour la fiche Kermeur Agro', contactId: 'c17', echeance: '2026-08-26', terminee: true, priorite: 'Basse' },
  { id: 't14', titre: 'Préparer l’appel avec Erwan Le Goff', contactId: 'c18', echeance: '2026-09-23', terminee: false, priorite: 'Normale' },
  { id: 't15', titre: 'Clôturer le dossier Meyer', contactId: 'c12', echeance: '2026-08-30', terminee: true, priorite: 'Basse' },
  { id: 't16', titre: 'Planifier la démo Cabinet Rambert', contactId: 'c7', echeance: '2026-09-25', terminee: false, priorite: 'Normale' },
];
