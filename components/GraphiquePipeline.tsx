/* Graphique en barres du pipeline.
   DESIGN.md : barres en --sa-primary, sauf celle à mettre en valeur
   (l'étape « Gagné ») qui prend --sa-accent. La valeur s'affiche
   au-dessus de chaque barre, le libellé et le décompte en dessous.
   La hauteur est un pourcentage : c'est une proportion, pas une
   taille en pixels — rien n'est écrit en dur. */

import { formaterMontantCourt } from '@/data';
import type { BarrePipeline } from '@/data';

export default function GraphiquePipeline({
  barres,
}: {
  barres: BarrePipeline[];
}) {
  const maximum = Math.max(...barres.map((b) => b.montant), 1);

  return (
    <div className="graphique">
      {barres.map((barre) => {
        const proportion = Math.round((barre.montant / maximum) * 100);

        return (
          <div key={barre.etape} className="barre-colonne">
            <span className="barre-valeur">
              {formaterMontantCourt(barre.montant)}
            </span>
            <div
              className={
                barre.etape === 'Gagné' ? 'barre-forme est-gagne' : 'barre-forme'
              }
              style={{ height: proportion + '%' }}
              role="img"
              aria-label={`${barre.etape} : ${formaterMontantCourt(barre.montant)} sur ${barre.nombre} opportunité${barre.nombre > 1 ? 's' : ''}`}
            />
            <div className="barre-legende">
              <span className="barre-etape">{barre.etape}</span>
              <span className="barre-nombre">
                {barre.nombre} opportunité{barre.nombre > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
