/* Vérifie que les données d'exemple se tiennent.
   Lancer avec :  npm run verifier-donnees
   Aucune dépendance : Node lit directement les fichiers TypeScript. */

import {
  entreprises,
  contacts,
  opportunites,
  taches,
  activites,
} from '../data/index.ts';

const problemes = [];
const signaler = (message) => problemes.push(message);

/* ---------- 1. les effectifs attendus ---------- */

const attendus = [
  ['entreprises', entreprises, 10],
  ['contacts', contacts, 20],
  ['opportunités', opportunites, 15],
  ['tâches', taches, 16],
  ['activités', activites, 24],
];

for (const [nom, liste, attendu] of attendus) {
  if (liste.length !== attendu) {
    signaler(`${nom} : ${liste.length} enregistrement(s), ${attendu} attendu(s)`);
  }
}

/* ---------- 2. des identifiants uniques ---------- */

for (const [nom, liste] of attendus) {
  const vus = new Set();
  for (const item of liste) {
    if (vus.has(item.id)) signaler(`${nom} : identifiant en double « ${item.id} »`);
    vus.add(item.id);
  }
}

const idsEntreprises = new Set(entreprises.map((e) => e.id));
const idsContacts = new Set(contacts.map((c) => c.id));

/* ---------- 3. chaque lien pointe vers quelque chose qui existe ---------- */

for (const c of contacts) {
  if (!idsEntreprises.has(c.entrepriseId)) {
    signaler(`contact ${c.id} : entreprise inconnue « ${c.entrepriseId} »`);
  }
}

for (const o of opportunites) {
  if (!idsContacts.has(o.contactId)) {
    signaler(`opportunité ${o.id} : contact inconnu « ${o.contactId} »`);
  }
  if (!idsEntreprises.has(o.entrepriseId)) {
    signaler(`opportunité ${o.id} : entreprise inconnue « ${o.entrepriseId} »`);
  }
  const contact = contacts.find((c) => c.id === o.contactId);
  if (contact && contact.entrepriseId !== o.entrepriseId) {
    signaler(
      `opportunité ${o.id} : le contact ${o.contactId} travaille chez ` +
        `${contact.entrepriseId}, pas chez ${o.entrepriseId}`
    );
  }
  if (!(o.montant > 0)) {
    signaler(`opportunité ${o.id} : montant invalide (${o.montant})`);
  }
}

for (const t of taches) {
  if (!idsContacts.has(t.contactId)) {
    signaler(`tâche ${t.id} : contact inconnu « ${t.contactId} »`);
  }
}

for (const a of activites) {
  if (!idsContacts.has(a.contactId)) {
    signaler(`activité ${a.id} : contact inconnu « ${a.contactId} »`);
  }
}

/* ---------- 4. des dates lisibles ---------- */

const verifierDate = (etiquette, valeur) => {
  if (Number.isNaN(new Date(valeur).getTime())) {
    signaler(`${etiquette} : date illisible « ${valeur} »`);
  }
};

contacts.forEach((c) => verifierDate(`contact ${c.id}`, c.derniereActivite));
opportunites.forEach((o) => verifierDate(`opportunité ${o.id}`, o.dateCloture));
taches.forEach((t) => verifierDate(`tâche ${t.id}`, t.echeance));
activites.forEach((a) => verifierDate(`activité ${a.id}`, a.date));

/* ---------- 5. pas de texte bouche-trou ---------- */

const INTERDITS = [/lorem ipsum/i, /\bcontact \d+\b/i, /\bentreprise \d+\b/i, /\btest\b/i];

const textesA = [
  ...entreprises.map((e) => [`entreprise ${e.id}`, e.nom]),
  ...contacts.map((c) => [`contact ${c.id}`, `${c.prenom} ${c.nom} ${c.fonction}`]),
  ...opportunites.map((o) => [`opportunité ${o.id}`, o.titre]),
  ...taches.map((t) => [`tâche ${t.id}`, t.titre]),
  ...activites.map((a) => [`activité ${a.id}`, a.resume]),
];

for (const [etiquette, texte] of textesA) {
  for (const motif of INTERDITS) {
    if (motif.test(texte)) {
      signaler(`${etiquette} : texte bouche-trou détecté — « ${texte} »`);
    }
  }
}

/* ---------- 6. chaque entreprise a au moins un contact ---------- */

for (const e of entreprises) {
  if (!contacts.some((c) => c.entrepriseId === e.id)) {
    signaler(`entreprise ${e.id} (${e.nom}) : aucun contact rattaché`);
  }
}

/* ---------- le verdict ---------- */

console.log('Vérification des données du CRM Sa');
console.log('----------------------------------');
for (const [nom, liste] of attendus) {
  console.log(`  ${String(liste.length).padStart(3)} ${nom}`);
}
console.log('');

if (problemes.length === 0) {
  console.log('Tout se tient. Aucun problème détecté.');
  process.exit(0);
}

console.error(`${problemes.length} problème(s) détecté(s) :`);
for (const p of problemes) console.error('  - ' + p);
process.exit(1);
