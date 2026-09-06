# Sa CRM — règles du projet

Fichier lu par Claude au début de chaque demande. Il évite de réexpliquer
les mêmes contraintes à chaque étape.

## Comment me parler

- **Toujours répondre en français simple**, sans terme technique.
  Si un mot technique est inévitable, l'expliquer en une phrase.
- Résumer ce qui a été fait en quelques phrases, pas en liste de fichiers.
- Ne jamais dire qu'une étape est terminée sans avoir vu la page fonctionner.

## La technique choisie — ne pas en changer

- **Next.js (App Router) et TypeScript**, prêt pour un déploiement Vercel.
- **Aucune base de données, aucun serveur.** Les données d'exemple vivent
  dans les fichiers de `data/`. Ne jamais proposer Postgres, Prisma, Supabase
  ou un fichier `.env` : le projet doit rester déployable sans configuration.
- **Le moins de dépendances possible.** Aujourd'hui : `next`, `react`,
  `react-dom`, plus TypeScript et ses types en développement.
  **Ne jamais ajouter de dépendance sans me le demander d'abord** —
  y compris une bibliothèque de graphiques, de composants ou d'icônes.
  Le graphique de l'accueil est écrit à la main avec des `div`, c'est voulu.

## Les règles visuelles

- `app/tokens.css` est la **seule source de vérité visuelle**, copiée du
  dépôt de marque Sa. Ne pas la modifier.
- **Aucune couleur, taille, espacement ou rayon écrit en dur** dans le code.
  Tout passe par une variable `--sa-*`. Si une valeur manque, me demander
  plutôt que d'inventer.
- Les styles vivent dans `app/globals.css`, avec des noms de classes en
  français. Pas de styles en ligne, sauf pour une proportion calculée
  (la hauteur des barres du graphique, par exemple).
- Le cyan `--sa-accent` est réservé à la mise en valeur : aujourd'hui,
  uniquement la barre « Gagné » du graphique.
- Les icônes viennent de Material Symbols Rounded, chargées dans
  `app/layout.tsx`. Si la police manque, retirer l'icône et garder le texte —
  jamais d'emoji à la place.

## L'organisation du projet

```
app/          les pages (une par dossier) + les styles
components/   les briques réutilisables, en français
data/         les données d'exemple et les calculs
scripts/      le vérificateur de cohérence des données
```

- `data/index.ts` est le point d'entrée unique : les pages importent depuis
  `@/data`, jamais depuis un fichier de données directement.
- Les imports à l'intérieur de `data/` portent l'extension `.ts` explicite.
  C'est ce qui permet au script de vérification de tourner avec Node seul,
  sans outil de compilation. Ne pas les retirer.
- Les calculs (indicateurs, pipeline, mise en forme) vivent dans
  `data/index.ts`, pas dans les pages.
- Le formatage des montants et des dates est écrit à la main plutôt qu'avec
  `Intl`, pour que le serveur et le navigateur affichent exactement la même
  chose quelle que soit la langue du système.

## Avant de dire qu'une étape est terminée

1. `npm run verifier-donnees` — la cohérence des données doit passer.
2. `npm run build` — le build doit passer. C'est exactement ce que Vercel
   refera : s'il échoue ici, la mise en ligne échouera.
3. Démarrer l'application, **ouvrir la page concernée et lire ce qu'elle
   renvoie**. Vérifier que les chiffres ne sont pas à zéro et qu'il ne s'agit
   pas d'une page d'erreur ou d'une page blanche.
4. Puis seulement, me raconter ce qui a été vu à l'écran.

## Les données d'exemple

- Réalistes et en français. **Jamais de « Lorem ipsum », jamais de
  « Contact 1 ».** Le script `scripts/verifier-donnees.mjs` le contrôle.
- Toute nouvelle donnée doit rester cohérente : une opportunité pointe vers
  un contact qui travaille vraiment dans l'entreprise indiquée.
- Après toute modification des données, relancer le vérificateur.

## Ce qui reste à construire

Les pages Contacts, Entreprises, Opportunités et Tâches n'ont aujourd'hui
qu'un titre. Elles seront construites une par une, dans cet ordre, aux étapes
suivantes de l'atelier.
