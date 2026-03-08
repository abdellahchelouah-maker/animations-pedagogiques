/**
 * Navigation entre animations avec boutons précédent/suivant
 * Utilise les fichiers JSON de chaque catégorie pour déterminer l'ordre
 */

class AnimationNavigation {
    constructor() {
        this.currentFile = this.getCurrentFile();
        this.category = this.getCategoryFromPath();
        this.animations = [];
        this.currentIndex = -1;
        
        console.log('Navigation initialisée:', {
            currentFile: this.currentFile,
            category: this.category
        });
        
        this.init();
    }

    /**
     * Récupère le nom du fichier actuel depuis l'URL
     */
    getCurrentFile() {
        const path = window.location.pathname;
        return path.substring(path.lastIndexOf('/') + 1);
    }

    /**
     * Détermine la catégorie depuis le chemin
     */
    getCategoryFromPath() {
        const path = window.location.pathname;
        const pathParts = path.split('/');
        
        // Cherche le dossier de catégorie (auto, electro, etc.)
        for (let i = 0; i < pathParts.length; i++) {
            if (['auto', 'electro', 'electronique', 'physique', 'enfants'].includes(pathParts[i])) {
                return pathParts[i];
            }
        }
        return null;
    }

    /**
     * Charge la liste des animations depuis le JSON de la catégorie
     */
    async loadAnimations() {
        if (!this.category) {
            console.error('Catégorie non détectée');
            return;
        }
        
        try {
            console.log(`Chargement du JSON: ../../pages/${this.category}.json`);
            const response = await fetch(`../../pages/${this.category}.json`);
            if (!response.ok) throw new Error('JSON non trouvé');
            
            this.animations = await response.json();
            this.currentIndex = this.animations.findIndex(anim => 
                anim.includes(this.currentFile)
            );
            
            console.log('Animations chargées:', {
                category: this.category,
                total: this.animations.length,
                currentIndex: this.currentIndex,
                currentFile: this.currentFile
            });
            
            this.renderNavigation();
        } catch (error) {
            console.error('Erreur de chargement des animations:', error);
        }
    }

    /**
     * Génère les boutons de navigation
     */
    renderNavigation() {
        if (this.currentIndex === -1) {
            console.warn('Index non trouvé pour:', this.currentFile);
            return;
        }

        // Crée le conteneur de navigation
        const navContainer = document.createElement('div');
        navContainer.className = 'animation-navigation';
        navContainer.setAttribute('data-progress', `${this.currentIndex + 1}/${this.animations.length}`);
        
        const prevBtn = this.createButton('précédent', this.currentIndex > 0);
        const nextBtn = this.createButton('suivant', this.currentIndex < this.animations.length - 1);
        
        navContainer.appendChild(prevBtn);
        navContainer.appendChild(nextBtn);
        
        // Insertion après la barre de partage
        const shareBar = document.querySelector('.share-bar');
        if (shareBar && shareBar.parentNode) {
            shareBar.parentNode.insertBefore(navContainer, shareBar.nextSibling);
            console.log('Navigation insérée après la barre de partage');
        } else {
            console.warn('Barre de partage non trouvée, insertion dans le body');
            document.body.appendChild(navContainer);
        }
    }

    /**
     * Crée un bouton de navigation
     */
    createButton(type, enabled) {
        const btn = document.createElement('button');
        btn.className = `nav-btn nav-btn-${type}`;
        btn.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        btn.disabled = !enabled;
        
        if (enabled) {
            btn.addEventListener('click', () => this.navigate(type));
        }
        
        return btn;
    }

    /**
     * Navigation vers l'animation précédente/suivante
     */
    navigate(direction) {
        let newIndex;
        
        if (direction === 'précédent') {
            newIndex = this.currentIndex - 1;
        } else {
            newIndex = this.currentIndex + 1;
        }
        
        if (newIndex >= 0 && newIndex < this.animations.length) {
            const targetPath = `../../pages/${this.animations[newIndex]}`;
            console.log(`Navigation vers: ${targetPath}`);
            window.location.href = targetPath;
        }
    }

    /**
     * Initialisation
     */
    async init() {
        await this.loadAnimations();
    }
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM chargé, initialisation de la navigation...');
    new AnimationNavigation();
});
