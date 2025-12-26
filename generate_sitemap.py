# -*- coding: utf-8 -*-
"""
Created on Fri Dec 26 15:24:41 2025

@author: CHE
"""

from pathlib import Path
from datetime import datetime

# URL racine de ton site (avec le / final)
BASE_URL = "https://abdellahchelouah-maker.github.io/animations-pedagogiques/"

# Dossier racine du projet (là où se trouve ce script)
BASE_DIR = Path(__file__).resolve().parent

# Dossier contenant les pages
PAGES_DIR = BASE_DIR / "pages"

# Fichier sitemap à générer (à la racine du site)
SITEMAP_PATH = BASE_DIR / "sitemap.xml"


def html_files_in_pages():
    """
    Parcourt pages/ et tous ses sous-dossiers
    et renvoie la liste des fichiers .html.
    """
    if not PAGES_DIR.is_dir():
        raise SystemExit(f"Le dossier {PAGES_DIR} n'existe pas")

    return sorted(PAGES_DIR.rglob("*.html"))


def file_to_url(path: Path) -> str:
    """
    Convertit un chemin local en URL complète.
    Exemple : BASE_DIR/pages/auto/algebre_logique.html
    -> https://.../pages/auto/algebre_logique.html
    """
    # chemin relatif à la racine du site
    rel_path = path.relative_to(BASE_DIR).as_posix()
    return BASE_URL.rstrip("/") + "/" + rel_path


def generate_sitemap():
    files = html_files_in_pages()

    # Date du jour au format ISO (optionnelle, même valeur pour tout le monde)
    today = datetime.utcnow().date().isoformat()

    lines = []
    lines.append('<?xml version="1.0" encoding="UTF-8"?>')
    lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    lines.append("")

    # Page d'accueil (index.html à la racine)
    index_path = BASE_DIR / "index.html"
    if index_path.is_file():
        lines.append("  <url>")
        lines.append(f"    <loc>{BASE_URL}</loc>")
        lines.append(f"    <lastmod>{today}</lastmod>")
        lines.append("    <changefreq>weekly</changefreq>")
        lines.append("    <priority>1.0</priority>")
        lines.append("  </url>")
        lines.append("")

    # Toutes les pages sous /pages
    for path in files:
        url = file_to_url(path)
        lines.append("  <url>")
        lines.append(f"    <loc>{url}</loc>")
        lines.append(f"    <lastmod>{today}</lastmod>")
        lines.append("    <changefreq>monthly</changefreq>")
        lines.append("    <priority>0.7</priority>")
        lines.append("  </url>")
        lines.append("")

    lines.append("</urlset>")
    content = "\n".join(lines)

    SITEMAP_PATH.write_text(content, encoding="utf-8")
    print(f"Sitemap généré : {SITEMAP_PATH}")
    print(f"{len(files)} URL(s) ajoutée(s) (plus éventuellement l'index).")


if __name__ == "__main__":
    generate_sitemap()
