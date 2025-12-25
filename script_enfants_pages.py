# -*- coding: utf-8 -*-
"""
Created on Thu Dec 25 23:44:54 2025

@author: CHE
"""

import re
from pathlib import Path

# 1) Dossier racine du projet
BASE_DIR = Path(__file__).resolve().parent
ENFANTS_DIR = BASE_DIR / "pages" / "enfants"

# 2) Fichiers à traiter dans pages/enfants
FILES_TO_PROCESS = [
    "enfants1-apprendre-heure.html",
    "enfants2-conjugaison-ce2.html",
    "enfants3-mots-interrogatifs.html",
    "enfants4-pluriel-noms-communs.html",
    "enfants5-verbes-irreguliers-anglais.html",
    "enfants6-petite-tortue.html",
    "enfants7-i-feel-good.html",
    "enfants8-antique-fantasy.html",
]

FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjqavbo"  # ton endpoint Formspree

# Gabarit du nouveau formulaire
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

    # Sauvegarde .bak
    backup_path = path.with_suffix(path.suffix + ".bak")
    backup_path.write_text(original, encoding="utf-8")

    # Écriture du nouveau contenu
    path.write_text(nouveau, encoding="utf-8")
    print(f"Formulaire remplacé dans {path.name} (sauvegarde : {backup_path.name})")


def main():
    if not ENFANTS_DIR.is_dir():
        print(f"Le dossier {ENFANTS_DIR} n’existe pas.")
        return

    for filename in FILES_TO_PROCESS:
        file_path = ENFANTS_DIR / filename
        if not file_path.is_file():
            print(f"⚠ Fichier absent : {filename}")
            continue

        traiter_fichier_html(file_path)


if __name__ == "__main__":
    main()
