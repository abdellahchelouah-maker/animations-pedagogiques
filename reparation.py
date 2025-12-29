#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de correction automatique des fiches d'animation HTML
Corrige les erreurs identifiées dans les fichiers HTML
"""

import os
import re
from pathlib import Path

def corriger_fichier_html(chemin_fichier):
    """
    Corrige les erreurs HTML dans un fichier donné
    
    Args:
        chemin_fichier: Chemin vers le fichier HTML à corriger
    
    Returns:
        bool: True si des corrections ont été apportées, False sinon
    """
    try:
        # Lire le contenu du fichier
        with open(chemin_fichier, 'r', encoding='utf-8') as f:
            contenu = f.read()
        
        contenu_original = contenu
        corrections = []
        
        # Correction 1: Guillemets dans l'URL Google Analytics
        pattern_ga = r'src="https://www\.googletagmanager\.com/gtag/js\?id="([^"]+)"'
        if re.search(pattern_ga, contenu):
            contenu = re.sub(pattern_ga, r'src="https://www.googletagmanager.com/gtag/js?id=\1"', contenu)
            corrections.append("URL Google Analytics")
        
        # Correction 2: Meta viewport
        pattern_viewport = r'<meta name="viewport" content="width="device-width," initial-scale="1"">'
        if re.search(pattern_viewport, contenu):
            contenu = re.sub(pattern_viewport, 
                           '<meta name="viewport" content="width=device-width, initial-scale=1">', 
                           contenu)
            corrections.append("Meta viewport")
        
        # Correction 3: Balises <object> dupliquées (plusieurs variations possibles)
        # Pattern pour "<object <object <object type="
        pattern_object1 = r'<object\s+<object\s+<object\s+(type="[^"]*"[^>]*>)'
        if re.search(pattern_object1, contenu):
            contenu = re.sub(pattern_object1, r'<object \1', contenu)
            corrections.append("Balises <object> triplées")
        
        # Pattern pour "<object <object type="
        pattern_object2 = r'<object\s+<object\s+(type="[^"]*"[^>]*>)'
        if re.search(pattern_object2, contenu):
            contenu = re.sub(pattern_object2, r'<object \1', contenu)
            corrections.append("Balises <object> doublées")
        
        # Correction 4: Fermetures de balises object répétées "> > >"
        pattern_close_object = r'>\s*>\s*>\s*(\s*<param|\s*<p)'
        if re.search(pattern_close_object, contenu):
            contenu = re.sub(pattern_close_object, r'>\1', contenu)
            corrections.append("Fermetures <object> multiples")
        
        # Si des corrections ont été faites, sauvegarder le fichier
        if contenu != contenu_original:
            # Créer une sauvegarde
            chemin_backup = str(chemin_fichier) + '.bak'
            with open(chemin_backup, 'w', encoding='utf-8') as f:
                f.write(contenu_original)
            
            # Écrire le fichier corrigé
            with open(chemin_fichier, 'w', encoding='utf-8') as f:
                f.write(contenu)
            
            return True, corrections
        
        return False, []
    
    except Exception as e:
        print(f"❌ Erreur lors du traitement de {chemin_fichier}: {e}")
        return False, []

def parcourir_et_corriger(dossier_base):
    """
    Parcourt tous les sous-dossiers et corrige les fichiers HTML
    
    Args:
        dossier_base: Dossier racine contenant les sous-dossiers
    """
    sous_dossiers = ['electro', 'electronique', 'auto', 'physique', 'enfants']
    
    total_fichiers = 0
    total_corriges = 0
    
    print("🔧 Démarrage de la correction des fiches HTML...\n")
    
    for sous_dossier in sous_dossiers:
        chemin_dossier = Path(dossier_base) / sous_dossier
        
        if not chemin_dossier.exists():
            print(f"⚠️  Le dossier '{sous_dossier}' n'existe pas, ignoré.")
            continue
        
        print(f"📁 Traitement du dossier: {sous_dossier}")
        print("-" * 60)
        
        # Trouver tous les fichiers HTML
        fichiers_html = list(chemin_dossier.glob('*.html'))
        
        if not fichiers_html:
            print(f"   Aucun fichier HTML trouvé.\n")
            continue
        
        for fichier in fichiers_html:
            total_fichiers += 1
            corrige, corrections = corriger_fichier_html(fichier)
            
            if corrige:
                total_corriges += 1
                print(f"   ✅ {fichier.name}")
                for correction in corrections:
                    print(f"      → {correction}")
            else:
                print(f"   ⚪ {fichier.name} (aucune correction nécessaire)")
        
        print()
    
    # Résumé
    print("=" * 60)
    print(f"📊 RÉSUMÉ")
    print("=" * 60)
    print(f"Fichiers analysés: {total_fichiers}")
    print(f"Fichiers corrigés: {total_corriges}")
    print(f"Fichiers inchangés: {total_fichiers - total_corriges}")
    print("\n💾 Note: Une sauvegarde (.bak) a été créée pour chaque fichier modifié")

def main():
    """Point d'entrée principal du script"""
    # Demander le chemin du dossier 'pages'
    print("=" * 60)
    print("CORRECTEUR DE FICHES HTML")
    print("=" * 60)
    print()
    
    dossier_pages = input("Entrez le chemin du dossier 'pages' (ou appuyez sur Entrée pour './pages'): ").strip()
    
    if not dossier_pages:
        dossier_pages = './pages'
    
    dossier_pages = Path(dossier_pages)
    
    if not dossier_pages.exists():
        print(f"\n❌ Erreur: Le dossier '{dossier_pages}' n'existe pas!")
        return
    
    print(f"\n📂 Dossier de travail: {dossier_pages.absolute()}\n")
    
    confirmation = input("Voulez-vous continuer? (o/n): ").strip().lower()
    
    if confirmation != 'o':
        print("Opération annulée.")
        return
    
    print()
    parcourir_et_corriger(dossier_pages)
    
    print("\n✨ Traitement terminé!")

if __name__ == "__main__":
    main()