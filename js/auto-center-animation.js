/**
 * Centrage automatique sur l'animation SWF
 * Fait défiler la page jusqu'au player-container
 */

class AutoCenterAnimation {
    constructor() {
        this.playerContainer = null;
        this.init();
    }

    init() {
        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupCentering());
        } else {
            this.setupCentering();
        }
    }

    setupCentering() {
        // Recherche du player-container
        this.playerContainer = document.querySelector('.player-container');
        
        if (this.playerContainer) {
            console.log('Player container trouvé, centrage automatique activé');
            
            // Attendre un peu que l'animation soit chargée
            setTimeout(() => {
                this.centerOnAnimation();
                this.addSmoothScroll();
                this.addCenterButton();
            }, 1000);
        } else {
            console.log('Player container non trouvé');
        }
    }

    centerOnAnimation() {
        if (!this.playerContainer) return;

        // Centrage sur le player-container
        this.playerContainer.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });

        // Ajout d'un effet visuel temporaire
        this.playerContainer.style.transition = 'box-shadow 0.3s ease';
        this.playerContainer.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
        
        setTimeout(() => {
            this.playerContainer.style.boxShadow = '';
        }, 2000);
    }

    addSmoothScroll() {
        // Amélioration du scroll smooth
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    addCenterButton() {
        // Ajout d'un bouton de recentrage
        const button = document.createElement('button');
        button.innerHTML = '🎯 Centrer sur l\'animation';
        button.className = 'center-animation-btn';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            transition: all 0.3s ease;
            z-index: 1000;
        `;

        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
            button.style.boxShadow = '';
        });

        button.addEventListener('click', () => {
            this.centerOnAnimation();
        });

        document.body.appendChild(button);
    }
}

// Initialisation automatique
const autoCenter = new AutoCenterAnimation();
