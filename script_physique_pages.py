# -*- coding: utf-8 -*-
"""
Created on Thu Dec 25 23:44:54 2025

@author: CHE
"""

import re
from pathlib import Path

# 1) Dossier racine du projet
BASE_DIR = Path(__file__).resolve().parent
PHYSIQUE_DIR = BASE_DIR / "pages" / "physique"

# 2) Fichiers à traiter dans pages/physique
FILES_TO_PROCESS = [
    "cours sur les générateurs.html",
    "force_laplace_v2.html",
    "mise_en_oeuvre_des_mesurages_v4.html",
    "perturbations harmoniques v4.html",
    "perturbations harmoniques v4_cours.html",
    "physique1-resonance-rlc.html",
    "physique2-groupement-rlc-parallele.html",
    "physique3-groupement-rlc-serie.html",
    "physique4-moteur-courant-continu.html",
    "physique5-moteur-asynchrone-triphasé.html",
    "physique6-transformateur-monophasé.html",
    "physique7-systeme-triphasé.html",
    "physique8-circuits-impedants.html",
    "physique11-puissances-triphasé.html",
    "physique12-courant-alternatif.html",
    "physique14-qcm-bts.html",
    "physique15-qcm-bts.html",
    "physique16-qcm-bts.html",
    "physique17-qcm-bts.html",
    "Questionnaire_Symbole hydraulique_chauffage_frigorifique v2.html",
    "voltmetre_v5.html",
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
    slug = path.stem  # nom du fichier sans .html (gère aussi les espaces et accents)

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
    if not PHYSIQUE_DIR.is_dir():
        print(f"Le dossier {PHYSIQUE_DIR} n’existe pas.")
        return

    for filename in FILES_TO_PROCESS:
        file_path = PHYSIQUE_DIR / filename
        if not file_path.is_file():
            print(f"⚠ Fichier absent : {filename}")
            continue

        traiter_fichier_html(file_path)


if __name__ == "__main__":
    main()
