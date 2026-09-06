/* Barre supérieure : recherche globale, action principale, utilisateur.
   La recherche n'est pas encore fonctionnelle — elle le deviendra
   sur la page Contacts, à l'étape suivante de l'atelier. */

export default function Barre() {
  return (
    <header className="barre">
      <div className="recherche" aria-hidden="true">
        <span className="icone">search</span>
        <span>Rechercher un contact, une société, une opportunité…</span>
      </div>

      <div className="barre-actions">
        <button type="button" className="bouton-principal">
          <span className="icone" aria-hidden="true">
            add
          </span>
          Créer
        </button>
        <span className="barre-utilisateur">
          <span className="avatar" aria-hidden="true">
            YB
          </span>
          Yanis Belhacem
        </span>
      </div>
    </header>
  );
}
