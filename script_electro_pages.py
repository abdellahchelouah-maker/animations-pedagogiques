# -*- coding: utf-8 -*-
"""
Created on Thu Dec 25 23:44:54 2025

@author: CHE
"""

import re
from pathlib import Path

# 1) Dossier racine du projet
BASE_DIR = Path(__file__).resolve().parent
ELECTRO_DIR = BASE_DIR / "pages" / "electro"

# 2) Liste explicite des fichiers à traiter dans pages/electro
FILES_TO_PROCESS = [
    "coupleur_centrifuge.html",
    "demarr_rotor.html",
    "demarr_stator.html",
    "demarrageYD.html",
    "electro1-force-motrice.html",
    "electro1-simulation-equipement-force-motrice.html",
    "electro2-commande-impulsionnelle-auto-maintien.html",
    "electro3-indices-protection.html",
    "electro4-compteur-electromagnetique.html",
    "electro5-compteur-electronique.html",
    "electro6-delestage-maximum-courant.html",
    "electro7-commande-distance-infrarouge.html",
    "electro8-platine-puissance.html",
    "electro9-platine-commande.html",
    "electro10-panneaux-solaires-puissance-crete.html",
    "electro11-variation-vitesse-moteurs-asynchrones.html",
    "electro12-qcm-production-transport-distribution.html",
    "electro14-couplage-enroulements-moteur-asynchrone.html",
    "electro15-fusibles-gg-am.html",
    "electro16-categories-emploi.html",
    "electro17-constitution-contacteurs.html",
    "electro18-equipements-securite.html",
    "electro19-extinction-arc-electrique.html",
    "electro20-demarrage-etoile-triangle.html",
    "electro21-relais-buchholz.html",
    "electro22-principe-dpmm.html",
    "electro23-relais-magnetique.html",
    "electro24-force-laplace.html",
    "electro25-bilan-puissance-mcc.html",
    "electro26-bilan-puissance-moteur-asynchrone.html",
    "electro27-indice-horaire-transformateur.html",
    "electro28-compensation-energie-reactive.html",
    "electro29-mesure-puissance-triphas.html",
    "electro30-qcm-transformateurs-puissance.html",
    "electro31-detecteur-isotherme.html",
    "electro32-demarrage-resistances-rotoriques.html",
    "electro33-demarrage-resistances-statoriques.html",
    "electro34-protection-magnetothermique-hager.html",
    "electro35-selectivite-protections-disjoncteur.html",
    "electro36-oscilloscope-ox8042.html",
    "electrotechnique-couplage.html",
    "electrotechnique-coupleur.html",
    "electrotechnique-isotherme.html",
    "evaluation symboles de schéma électrique.html",
    "fiche_1_SA_prise_de_courant_v1.html",
    "force_motrice_v3.html",
    "isotherme.html",
    "projet_jsp_5.html",
    "puissance_mas.html",
    "qcm_production.html",
    "qcm_symbolisation.html",
    "relais_mag.html",
    "vitesse_v2.html",
]

FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjqavbo"  # ton endpoint unique

# gabarit du nouveau formulaire, basé sur le nom du fichier (slug)
NEW_FORM_TEMPLATE = """<form action="{endpoint}"
      method="POST"
      class="feedback-form">

  <input type="hidden" name="_subject" value="Avis sur l'animation {slug}">
  <input type="hidden" name="animation" value="{slug}">

  <div class="field-group">
    <label for="note-{slug}">Note :</label>
    <select id="note-{slug}" name="note-{slug}" required>
      <option value="">Choisir une note</option>
      <option value="5">5 - Excellent</option>
      <option value="4">4 - Très bien</option>
      <option value="3">3 - Correct</option>
      <option value="2">2 - Moyen</option>
      <option value="1">1 - À améliorer</option>
    </select>
  </div>

  <div class="field-group">
    <label for="commentaire-{slug}">Commentaire :</label>
    <textarea id="commentaire-{slug}" name="commentaire-{slug}" rows="4"
              placeholder="Vos remarques, suggestions…"></textarea>
  </div>

  <div class="field-group">
    <label for="email-{slug}">Votre e-mail (facultatif) :</label>
    <input type="email" id="email-{slug}" name="_replyto"
           placeholder="vous@exemple.fr">
  </div>

  <button type="submit" class="btn btn-primary">Envoyer mon avis</button>
</form>"""


def build_new_form(slug: str) -> str:
    return NEW_FORM_TEMPLATE.format(endpoint=FORMSPREE_ENDPOINT, slug=slug)


def replace_form_block(html: str, new_form_html: str) -> str:
    """
    Remplace le premier bloc <form>...</form> trouvé par new_form_html.
    Si aucun <form> n'est trouvé, renvoie le HTML inchangé.
    """
    pattern = re.compile(r"<form\b.*?</form>", re.DOTALL | re.IGNORECASE)
    if not pattern.search(html):
        return html
    return pattern.sub(new_form_html, html, count=1)


def traiter_fichier_html(path: Path):
    original = path.read_text(encoding="utf-8")
    slug = path.stem  # nom du fichier sans .html

    new_form = build_new_form(slug)
    nouveau = replace_form_block(original, new_form)

    if nouveau == original:
        print(f"Aucun <form> trouvé ou aucun changement pour {path.name}")
        return

    # sauvegarde .bak
    backup_path = path.with_suffix(path.suffix + ".bak")
    backup_path.write_text(original, encoding="utf-8")

    # écriture du nouveau contenu
    path.write_text(nouveau, encoding="utf-8")
    print(f"Formulaire remplacé dans {path.name} (sauvegarde : {backup_path.name})")


def main():
    if not ELECTRO_DIR.is_dir():
        print(f"Le dossier {ELECTRO_DIR} n’existe pas.")
        return

    for filename in FILES_TO_PROCESS:
        file_path = ELECTRO_DIR / filename
        if not file_path.is_file():
            print(f"⚠ Fichier absent : {filename}")
            continue

        traiter_fichier_html(file_path)


if __name__ == "__main__":
    main()
