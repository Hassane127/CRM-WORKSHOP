/* Point d'entrée unique des données et des calculs du CRM Sa.
   Les extensions .ts sont explicites pour que le script de vérification
   puisse importer ce fichier directement avec Node, sans outil de build. */

import { entreprises } from './entreprises.ts';
import { contacts } from './contacts.ts';
import { opportunites } from './opportunites.ts';
import { taches } from './taches.ts';
import { activites } from './activites.ts';
import { ETAPES_PIPELINE, ETAPES_EN_COURS } from './types.ts';
import type { Activite, Contact, Entreprise, Etape, Opportunite, Tache } from './types.ts';

export { entreprises, contacts, opportunites, taches, activites };
export { ETAPES_PIPELINE, ETAPES_EN_COURS };
export type { Activite, Contact, Entreprise, Etape, Opportunite, Tache };

/* ---------- recherche ---------- */

export function entrepriseParId(id: string): Entreprise | undefined {
  return entreprises.find((e) => e.id === id);
}

export function contactParId(id: string): Contact | undefined {
  return contacts.find((c) => c.id === id);
}

export function nomComplet(c: Contact): string {
  return c.prenom + ' ' + c.nom;
}

/* ---------- tout ce qui concerne un contact ---------- */

export function opportunitesDuContact(contactId: string): Opportunite[] {
  return opportunites.filter((o) => o.contactId === contactId);
}

export function tachesDuContact(contactId: string): Tache[] {
  return taches
    .filter((t) => t.contactId === contactId)
    .sort((a, b) => a.echeance.localeCompare(b.echeance));
}

export function activitesDuContact(contactId: string): Activite[] {
  return activites
    .filter((a) => a.contactId === contactId)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Une tâche est en retard si elle n'est pas terminée et que sa date est passée. */
export function estEnRetard(tache: Tache, maintenant: Date = new Date()): boolean {
  return !tache.terminee && new Date(tache.echeance) < maintenant;
}

/* ---------- indicateurs de l'accueil ---------- */

export type Indicateurs = {
  nombreContacts: number;
  valeurEnCours: number;
  nombreEnCours: number;
  montantGagne: number;
  nombreGagnees: number;
  tachesEnRetard: number;
  tachesOuvertes: number;
};

export function calculerIndicateurs(maintenant: Date = new Date()): Indicateurs {
  const enCours = opportunites.filter((o) => ETAPES_EN_COURS.includes(o.etape));
  const gagnees = opportunites.filter((o) => o.etape === 'Gagné');
  const ouvertes = taches.filter((t) => !t.terminee);
  const enRetard = ouvertes.filter((t) => new Date(t.echeance) < maintenant);

  return {
    nombreContacts: contacts.length,
    valeurEnCours: enCours.reduce((somme, o) => somme + o.montant, 0),
    nombreEnCours: enCours.length,
    montantGagne: gagnees.reduce((somme, o) => somme + o.montant, 0),
    nombreGagnees: gagnees.length,
    tachesEnRetard: enRetard.length,
    tachesOuvertes: ouvertes.length,
  };
}

/* ---------- graphique : le pipeline par étape ---------- */

export type BarrePipeline = { etape: Etape; montant: number; nombre: number };

export function pipelineParEtape(): BarrePipeline[] {
  return ETAPES_PIPELINE.map((etape) => {
    const lot = opportunites.filter((o) => o.etape === etape);
    return {
      etape,
      montant: lot.reduce((somme, o) => somme + o.montant, 0),
      nombre: lot.length,
    };
  });
}

/* ---------- activités récentes ---------- */

export function activitesRecentes(combien: number): Activite[] {
  return [...activites]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, combien);
}

/* ---------- mise en forme ----------
   Formatage écrit à la main plutôt qu'avec Intl : le résultat est
   identique sur le serveur et dans le navigateur, quelle que soit la
   langue du système. */

export function formaterEuros(montant: number): string {
  const entier = Math.round(montant).toString();
  const groupes = entier.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return groupes + ' €';
}

export function formaterMontantCourt(montant: number): string {
  if (montant >= 1000000) {
    const millions = (montant / 1000000).toFixed(2).replace(/\.?0+$/, '');
    return millions.replace('.', ',') + ' M€';
  }
  if (montant >= 1000) {
    return Math.round(montant / 1000) + ' k€';
  }
  return montant + ' €';
}

const MOIS = [
  'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
  'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.',
];

export function formaterDate(iso: string): string {
  const d = new Date(iso);
  return d.getDate() + ' ' + MOIS[d.getMonth()];
}

export function formaterDateHeure(iso: string): string {
  const d = new Date(iso);
  const heures = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return formaterDate(iso) + ' · ' + heures + ':' + minutes;
}
