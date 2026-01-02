# Animations pédagogiques – Ressources interactives pour les sciences de l’ingénieur

Ce dépôt contient l’ensemble du site **Animations pédagogiques**, un projet éducatif visant à moderniser, préserver et diffuser des ressources interactives destinées aux élèves, enseignants et passionnés des sciences de l’ingénieur.

Le site propose plus de 150 animations interactives couvrant plusieurs domaines techniques :
- Électrotechnique
- Électronique
- Automatisme
- Physique appliquée
- Visual Basic
- TP multimédia

Ces ressources, initialement développées en Flash ou en exécutables Windows, ont été restaurées, organisées et intégrées dans une interface moderne, responsive et bilingue.

---

## 🎯 Objectifs du projet

- **Préserver un patrimoine pédagogique** riche et encore largement utilisé dans les lycées technologiques.
- **Moderniser l’accès** aux animations (compatibilité web, responsive design, émulation Flash via Ruffle).
- **Structurer les contenus** pour une navigation claire, cohérente et intuitive.
- **Rendre le site bilingue (FR/EN)** grâce à un système i18n basé sur JSON.
- **Automatiser la maintenance** via des scripts Python (correction HTML, injection i18n, vérification des clés).
- **Faciliter la réutilisation** des ressources dans un cadre éducatif.

---

## 🧩 Architecture du site

.
├── index.html
├── pages/
│   ├── electrotechnique.html
│   ├── electronique.html
│   ├── automatisme.html
│   ├── physique.html
│   ├── jeux-educatifs.html
│   ├── visual-basic.html
│   ├── tpwks.html
│   └── <sous-dossiers des animations>
├── media/
│   ├── img/
│   ├── swf/
│   └── exe/
├── lang/
│   ├── fr.json
│   └── en.json
├── js/
│   ├── i18n.js
│   └── ruffle/
└── style/
└── style.css


---

## 🌍 Système multilingue (i18n)

Le site utilise un système de traduction basé sur des attributs HTML :

```html
<h1 data-i18n="categories.electrotechnique.page_title"></h1>

Les traductions sont chargées dynamiquement depuis :

    lang/fr.json

    lang/en.json

Structure JSON
Catégories
"categories": {
  "electrotechnique": {
    "page_title": "...",
    "meta_description": "...",
    "section_title": "...",
    "intro": "...",
    "list_title": "..."
  }
}

Animations
"animations": {
  "force_motrice": {
    "title": "...",
    "description": "...",
    "keywords": "...",
    "image": "...",
    "swf": "...",
    "exe": "...",
    "url": "..."
  }
}

🛠 Technologies utilisées

    HTML5 / CSS3

    JavaScript vanilla

    Ruffle (émulation Flash)

    JSON pour le multilingue

    Python pour les scripts d’automatisation

    GitHub Pages pour l’hébergement

Auteur

Projet développé et maintenu par Abdellah CHELOUAH,
professeur en STI2D et sciences de l’ingénieur, spécialisé dans la conception pédagogique numérique et la modernisation des ressources éducatives.
Ce projet est destiné à un usage pédagogique.
Les animations originales restent la propriété de leurs auteurs respectifs.

Educational Animations – Interactive Resources for Engineering Sciences

This repository contains the full source code of Educational Animations, a pedagogical website designed to preserve, modernize, and distribute interactive learning resources for students, teachers, and engineering enthusiasts.

The site includes more than 150 interactive animations covering:

    Electrical Engineering

    Electronics

    Automation

    Applied Physics

    Visual Basic programming

    Multimedia practical work

Originally created as Flash animations or Windows executables, these resources have been restored, reorganized, and integrated into a modern, responsive, bilingual web interface.
🎯 Project Goals

    Preserve valuable educational content widely used in technological high schools.

    Modernize access to legacy animations (web compatibility, responsive design, Flash emulation via Ruffle).

    Provide a clean and intuitive navigation structure.

    Enable full bilingual support (FR/EN) using a JSON‑based i18n system.

    Automate maintenance tasks through Python scripts (HTML correction, i18n injection, key validation).

    Facilitate reuse of the animations in educational contexts.

🧩 Project Structure
.
├── index.html
├── pages/
│   ├── electrotechnique.html
│   ├── electronique.html
│   ├── automatisme.html
│   ├── physique.html
│   ├── jeux-educatifs.html
│   ├── visual-basic.html
│   ├── tpwks.html
│   └── <animation subfolders>
├── media/
│   ├── img/
│   ├── swf/
│   └── exe/
├── lang/
│   ├── fr.json
│   └── en.json
├── js/
│   ├── i18n.js
│   └── ruffle/
└── style/
    └── style.css

Internationalization (i18n)

The website uses a lightweight translation system based on HTML attributes:
<h1 data-i18n="categories.electrotechnique.page_title"></h1>
Translations are loaded dynamically from:

    lang/fr.json

    lang/en.json

JSON Structure
Categories
"categories": {
  "electrotechnique": {
    "page_title": "...",
    "meta_description": "...",
    "section_title": "...",
    "intro": "...",
    "list_title": "..."
  }
}

Animations
"animations": {
  "force_motrice": {
    "title": "...",
    "description": "...",
    "keywords": "...",
    "image": "...",
    "swf": "...",
    "exe": "...",
    "url": "..."
  }
}

Technologies Used

    HTML5 / CSS3

    Vanilla JavaScript

    Ruffle (Flash emulation)

    JSON for multilingual content

    Python for automation scripts

    GitHub Pages for hosting

