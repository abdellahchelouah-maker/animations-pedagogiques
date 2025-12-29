import os
import re

# ===== CONFIGURATION =====
ROOT_DIR = "."
PAGES_DIR = "pages"

ANIMATION_DIRS = {
    "electro",
    "auto",
    "electronique",
    "physique",
    "enfants"
}

EXCLUDED_DIRS = {
    "visual-basic",
    "tpwks"
}

# Bloc debug GA complet (tolérant aux retours ligne et espaces)
DEBUG_BLOCK_PATTERN = re.compile(
    r"""
    window\.addEventListener\s*\(\s*['"]load['"]\s*,\s*function\s*\(\)\s*\{
    .*?
    \}\s*\)\s*;
    \s*
    <!--\s*Fin\s+Google\s+Analytics\s*-->
    """,
    re.IGNORECASE | re.DOTALL | re.VERBOSE
)


def is_animation_file(path):
    parts = os.path.normpath(path).split(os.sep)

    if PAGES_DIR not in parts:
        return False

    idx = parts.index(PAGES_DIR)

    # pages/<categorie>/<fiche>.html
    return len(parts) == idx + 3 and parts[idx + 1] in ANIMATION_DIRS


def should_skip(path):
    parts = os.path.normpath(path).split(os.sep)
    return any(p in EXCLUDED_DIRS for p in parts)


def clean_file(path):
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    if not DEBUG_BLOCK_PATTERN.search(content):
        return False

    cleaned = DEBUG_BLOCK_PATTERN.sub("", content)

    with open(path, "w", encoding="utf-8") as f:
        f.write(cleaned)

    return True


def main():
    cleaned_files = []

    base = os.path.join(ROOT_DIR, PAGES_DIR)

    for root, dirs, files in os.walk(base):
        dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]

        for file in files:
            if not file.lower().endswith(".html"):
                continue

            full_path = os.path.join(root, file)

            if should_skip(full_path):
                continue

            if not is_animation_file(full_path):
                continue

            if clean_file(full_path):
                cleaned_files.append(full_path)

    print("Nettoyage terminé.")
    print(f"{len(cleaned_files)} fiche(s) corrigée(s) :")

    for f in cleaned_files:
        print(" -", f)


if __name__ == "__main__":
    main()
