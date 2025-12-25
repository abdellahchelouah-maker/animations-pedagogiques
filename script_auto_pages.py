# -*- coding: utf-8 -*-
"""
Created on Thu Dec 25 23:44:54 2025

@author: CHE
"""

import re
from pathlib import Path

# 1) Dossier racine du projet
BASE_DIR = Path(__file__).resolve().parent
AUTO_DIR = BASE_DIR / "pages" / "auto"

# 2) Liste explicite des fichiers à traiter
FILES_TO_PROCESS = [
    "algebre_logique.html",
    "algebre_logique_exo.html",
    "ascii.html",
    "auto1-cablage-api.html",
    "auto3-fonctionnement-can-4bits.html",
    "auto7-regulation-tout-ou-rien.html",
    "auto8-qcm-api.html",
    "auto13-principe-interrupteur-lames-sou.html",
    "auto14-utilisations-pneumatique.html",
    "auto15-principe-venturi-prehension-vide.html",
    "auto16-decomposition-fonctionnelle-sa.html",
    "auto17-logigrammes-portes-universelles.html",
    "auto18-code-gray-positionnement.html",
    "auto20-cablage-equation-logique-cil.html",
    "cna10bits_v8.html",
    "coupleur_centrifuge.html",
    "description_graphique_v1.html",
    "g7_percage.html",
    "g7_pompage.html",
    "g7_tts.html",
    "rdu.html",
    "resistances_r2r.html",
    "resistances_rponderee.html",
    "serie_parallele.html",
]

FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjqavbo"  # ton endpoint

# gabarit du nouveau formulaire, avec {slug} remplacé par le nom du fichier sans .html
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
    """Construit le HTML du nouveau formulaire pour une animation donnée."""
    return NEW_FORM_TEMPLATE.format(endpoint=FORMSPREE_ENDPOINT, slug=slug)


def replace_form_block(html: str, new_form_html: str) -> str:
    """
    Remplace le premier bloc <form>...</form> trouvé par new_form_html.
    Si aucun <form> n'est trouvé, renvoie le HTML inchangé.
    """
    # regex simple qui cherche du <form ...> jusqu'au </form> correspondant
    pattern = re.compile(r"<form\b.*?</form>", re.DOTALL | re.IGNORECASE)
    if not pattern.search(html):
        return html  # aucun formulaire trouvé

    # remplace seulement le premier formulaire
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
    if not AUTO_DIR.is_dir():
        print(f"Le dossier {AUTO_DIR} n’existe pas.")
        return

    for filename in FILES_TO_PROCESS:
        file_path = AUTO_DIR / filename
        if not file_path.is_file():
            print(f"⚠ Fichier absent : {filename}")
            continue

        traiter_fichier_html(file_path)


if __name__ == "__main__":
    main()
