/* Page dont le titre existe, mais dont le contenu viendra plus tard
   dans l'atelier. Volontairement sobre : un titre, une ligne. */

export default function PageVide({
  titre,
  sousTitre,
}: {
  titre: string;
  sousTitre: string;
}) {
  return (
    <main className="page">
      <div className="page-entete">
        <div>
          <h1 className="page-titre">{titre}</h1>
          <p className="page-sous-titre">{sousTitre}</p>
        </div>
      </div>

      <section className="carte">
        <div className="a-venir">
          <span className="icone" aria-hidden="true">
            hourglass_empty
          </span>
          <p className="a-venir-texte">Cette page reste à construire.</p>
        </div>
      </section>
    </main>
  );
}
