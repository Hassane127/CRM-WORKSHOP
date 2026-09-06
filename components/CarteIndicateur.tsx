/* Carte d'indicateur — libellé en capitales, valeur, puce de tendance,
   ligne de contexte. Décrite dans DESIGN.md, réutilisée quatre fois
   sur l'accueil. */

export type Tendance = {
  texte: string;
  sens: 'hausse' | 'alerte';
};

type Props = {
  libelle: string;
  icone: string;
  valeur: string;
  tendance?: Tendance;
  contexte: string;
};

export default function CarteIndicateur({
  libelle,
  icone,
  valeur,
  tendance,
  contexte,
}: Props) {
  return (
    <article className="carte">
      <p className="indicateur-libelle">
        <span className="icone" aria-hidden="true">
          {icone}
        </span>
        {libelle}
      </p>

      <div className="indicateur-ligne">
        <span className="indicateur-valeur">{valeur}</span>
        {tendance && (
          <span
            className={
              tendance.sens === 'hausse' ? 'puce puce-hausse' : 'puce puce-alerte'
            }
          >
            {tendance.texte}
          </span>
        )}
      </div>

      <p className="indicateur-contexte">{contexte}</p>
    </article>
  );
}
