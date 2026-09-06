/* Types du domaine CRM Sa.
   Aucune base de données : ces objets vivent dans des fichiers du projet. */

export type Etape =
  | 'Nouveau'
  | 'Qualifié'
  | 'Proposition'
  | 'Négociation'
  | 'Gagné'
  | 'Perdu';

export const ETAPES_PIPELINE: Etape[] = [
  'Nouveau',
  'Qualifié',
  'Proposition',
  'Négociation',
  'Gagné',
];

/** Étapes qui comptent comme « en cours » : ni gagnées, ni perdues. */
export const ETAPES_EN_COURS: Etape[] = [
  'Nouveau',
  'Qualifié',
  'Proposition',
  'Négociation',
];

export type StatutContact = 'Client' | 'Prospect' | 'Lead' | 'Inactif';

export type Entreprise = {
  id: string;
  nom: string;
  secteur: string;
  ville: string;
  effectif: number;
  siteWeb: string;
};

export type Contact = {
  id: string;
  prenom: string;
  nom: string;
  fonction: string;
  email: string;
  telephone: string;
  entrepriseId: string;
  statut: StatutContact;
  derniereActivite: string; // ISO
};

export type Opportunite = {
  id: string;
  titre: string;
  contactId: string;
  entrepriseId: string;
  montant: number; // en euros
  etape: Etape;
  dateCloture: string; // ISO — prévue, ou réelle si gagnée/perdue
};

export type Tache = {
  id: string;
  titre: string;
  contactId: string;
  echeance: string; // ISO
  terminee: boolean;
  priorite: 'Haute' | 'Normale' | 'Basse';
};

export type TypeActivite = 'Appel' | 'Email' | 'Réunion' | 'Note';

export type Activite = {
  id: string;
  type: TypeActivite;
  contactId: string;
  date: string; // ISO
  resume: string;
  auteur: string;
};
