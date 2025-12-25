/* ============================
   CONFIGURATION DES PAQUETS
   ============================ */

const decks = {
  triz: {
    name: "TRIZ",
    folder: "img/triz/",
    back: "img/dos_cartes_1.png",
    count: 40,
    prefix: "triz_",
    pad: true
  },
  lois: {
    name: "Lois",
    folder: "img/lois/",
    back: "img/dos_carte_2.png",
    count: 8,
    prefix: "loi_",
    pad: true
  },
  concepts: {
    name: "Concepts",
    folder: "img/lois/",
    back: "img/concept.png",
    files: [
      "brainstorming.png",
      "brevet.png",
      "carte_mentale.png",
      "carte_mentale_2.png",
      "collage_projectif.png",
      "diaporamas.png",
      "espace_creatif.png",
      "innovation_architecturale.png",
      "innovation_incrementale.png",
      "innovation_rupture.png",
      "innovation_synthese.png",
      "logiciel_cao.png",
      "loi_evolution.png",
      "marques.png",
      "principes_innovation.png",
      "triz.png",
      "veille_technologique.png"
    ]
  }
};


/* ============================
   PRINCIPES TRIZ
   ============================ */

const trizPrinciples = [
  { number: 1,  name: "Segmentation" },
  { number: 2,  name: "Extraction" },
  { number: 3,  name: "Qualité locale" },
  { number: 4,  name: "Asymétrie" },
  { number: 5,  name: "Fusion" },
  { number: 6,  name: "Universalité" },
  { number: 7,  name: "Imbrication (poupées russes)" },
  { number: 8,  name: "Contrepoids" },
  { number: 9,  name: "Action préalable" },
  { number: 10, name: "Action préalable inverse" },
  { number: 11, name: "Tampon" },
  { number: 12, name: "Équipotentialité" },
  { number: 13, name: "Inversion" },
  { number: 14, name: "Courbes" },
  { number: 15, name: "Dynamisme" },
  { number: 16, name: "Action partielle ou excessive" },
  { number: 17, name: "Transition dimensionnelle" },
  { number: 18, name: "Vibrations mécaniques" },
  { number: 19, name: "Actions périodiques" },
  { number: 20, name: "Continuité d’action" },
  { number: 21, name: "Saut rapide" },
  { number: 22, name: "Transformation nuisible en utile" },
  { number: 23, name: "Retour" },
  { number: 24, name: "Intermédiaire" },
  { number: 25, name: "Auto-service" },
  { number: 26, name: "Copie" },
  { number: 27, name: "Objet jetable" },
  { number: 28, name: "Remplacement mécanique" },
  { number: 29, name: "Fluides" },
  { number: 30, name: "Structures souples" },
  { number: 31, name: "Matériaux poreux" },
  { number: 32, name: "Changement de couleur" },
  { number: 33, name: "Homogénéité" },
  { number: 34, name: "Rejet et régénération" },
  { number: 35, name: "Transformation des propriétés" },
  { number: 36, name: "Phase transition" },
  { number: 37, name: "Expansion thermique" },
  { number: 38, name: "Accélération d’oxydation" },
  { number: 39, name: "Atmosphère inerte" },
  { number: 40, name: "Composites" }
];


/* ============================
   CAS DE CRÉATIVITÉ (10 CAS)
   ============================ */

const creativityCases = [
  {
    id: "chaise-ecole",
    title: "Chaise d’école inconfortable",
    image: "img/cases/chaise_ecole.png",
    context: "Les élèves restent assis longtemps sur une chaise d’école standard. Plusieurs se plaignent de douleurs au dos et de difficultés à maintenir une bonne posture.",
    contradiction: "On veut une chaise plus confortable sans qu’elle devienne plus volumineuse ni plus coûteuse.",
    question: "Comment pourrions-nous améliorer le confort de la chaise d’école sans augmenter son encombrement ni son coût de fabrication ?",
    suggestedPrinciples: [1, 3, 15],
    exampleSolution: "Ajouter un coussin modulable ou segmenté (dossier + assise) qui peut être ajusté à la morphologie, fixé de façon simple et retiré pour le nettoyage."
  },
  {
    id: "pc-bruyant",
    title: "Ventilateur d’ordinateur trop bruyant",
    image: "img/cases/pc_bruyant.png",
    context: "Dans la salle informatique, les ventilateurs des PC deviennent très bruyants lorsque la charge augmente, ce qui gêne la concentration des élèves.",
    contradiction: "On veut un refroidissement efficace pour protéger les composants tout en réduisant le bruit et la consommation d’énergie.",
    question: "Comment pourrions-nous garder les composants du PC au frais tout en réduisant le bruit et la consommation d’énergie du système de refroidissement ?",
    suggestedPrinciples: [10, 15, 19],
    exampleSolution: "Utiliser une régulation intelligente de la vitesse des ventilateurs avec des paliers silencieux et ajouter un dissipateur plus efficace pour limiter les vitesses élevées."
  },
  {
    id: "lumiere-energie",
    title: "Lumières laissées allumées",
    image: "img/cases/lumiere_energie.png",
    context: "Les élèves oublient souvent d’éteindre les lumières en quittant la salle. Les luminaires restent allumés pendant des heures inutilement.",
    contradiction: "On veut une salle toujours bien éclairée quand elle est occupée, tout en réduisant au maximum la consommation d’énergie lorsqu’elle est vide.",
    question: "Comment pourrions-nous garantir un bon éclairage de la salle quand elle est utilisée tout en réduisant la consommation d’énergie lorsqu’elle est vide ?",
    suggestedPrinciples: [19, 23, 25],
    exampleSolution: "Installer des détecteurs de présence avec temporisation de coupure automatique, et un voyant de rappel près de la porte indiquant que la lumière est restée allumée."
  },
  {
    id: "cables-sol",
    title: "Câbles qui traînent au sol",
    image: "img/cases/cables_sol.png",
    context: "Dans un atelier, les câbles d’alimentation et de mesure traînent au sol. Les élèves peuvent trébucher ou endommager le matériel.",
    contradiction: "On veut des câbles accessibles et flexibles pour utiliser les appareils, tout en gardant un sol dégagé et sécurisé.",
    question: "Comment pourrions-nous garder des connexions facilement utilisables tout en libérant l’espace au sol pour éviter les chutes ?",
    suggestedPrinciples: [1, 17, 24],
    exampleSolution: "Installer des chemins de câbles en hauteur ou en façade de paillasse avec des prises modulaires et utiliser des enrouleurs pour ne sortir que la longueur nécessaire."
  },
  {
    id: "emballage",
    title: "Emballage trop volumineux et polluant",
    image: "img/cases/emballage.png",
    context: "Un produit est livré dans un emballage volumineux avec beaucoup de plastique et de carton. On jette plus d’emballage que de produit.",
    contradiction: "On veut un emballage qui protège bien le produit et soit attractif, tout en réduisant la quantité de matière et l’impact environnemental.",
    question: "Comment pourrions-nous protéger efficacement le produit tout en réduisant la quantité de matériaux d’emballage et son impact environnemental ?",
    suggestedPrinciples: [2, 30, 34],
    exampleSolution: "Remplacer le calage plastique par un insert en carton recyclé, réduire le volume de l’emballage au plus près du produit et imprimer directement sur le carton sans sur-emballage."
  },
  {
    id: "papier-classe",
    title: "Impression et photocopies excessives",
    image: "img/cases/papier_classe.png",
    context: "Dans les lycées, de nombreux polycopiés sont imprimés pour chaque élève. Beaucoup de feuilles sont peu utilisées ou jetées rapidement.",
    contradiction: "On veut fournir des supports clairs et accessibles tout en réduisant fortement la consommation de papier.",
    question: "Comment maintenir la qualité pédagogique des supports tout en diminuant la quantité de papier utilisée ?",
    suggestedPrinciples: [1, 19, 26],
    exampleSolution: "Segmenter les supports (fiches essentielles imprimées, compléments numériques), limiter les impressions à certains bilans clés et diffuser le reste via ENT ou QR-codes."
  },
  {
    id: "tableau-visibilite",
    title: "Tableau peu visible pour certains élèves",
    image: "img/cases/tableau_visibilite.png",
    context: "Dans une salle de classe, les élèves du fond voient mal le tableau à cause de la distance, de l’angle de vue ou de reflets.",
    contradiction: "On veut que tous les élèves voient bien le contenu du tableau sans reconstruire la salle ni multiplier les tableaux.",
    question: "Comment rendre le contenu du tableau visible pour tous les élèves sans modifier la structure de la salle ?",
    suggestedPrinciples: [17, 24, 32],
    exampleSolution: "Ajouter une caméra de document ou un visualiseur projetant le tableau sur un écran latéral, et améliorer le contraste (fond/projection, couleurs de feutres)."
  },
  {
    id: "robots-rangement",
    title: "Robots pédagogiques encombrants et fragiles",
    image: "img/cases/robots_rangement.png",
    context: "Les robots et maquettes utilisés en technologie prennent beaucoup de place sur les étagères et risquent de s’abîmer lors des déplacements.",
    contradiction: "On veut conserver des systèmes montés et prêts à l’emploi tout en réduisant l’encombrement et les risques de casse.",
    question: "Comment stocker des robots prêts à l’usage tout en économisant de la place et en limitant les chocs ?",
    suggestedPrinciples: [7, 15, 30],
    exampleSolution: "Prévoir des supports emboîtables avec compartiments réglables, montés sur chariot, et utiliser des housses ou mousses souples pour protéger les robots."
  },
  {
    id: "couloir-bruit",
    title: "Couloir trop bruyant aux intercours",
    image: "img/cases/couloir_bruit.png",
    context: "Entre les cours, les élèves se croisent en masse dans les couloirs, ce qui produit un niveau sonore élevé qui gêne les classes voisines.",
    contradiction: "On veut permettre un flux d’élèves fluide tout en limitant le bruit et les perturbations des cours en cours.",
    question: "Comment organiser les déplacements pour réduire le bruit sans ralentir exagérément les flux ?",
    suggestedPrinciples: [19, 3, 23],
    exampleSolution: "Échelonner légèrement certains horaires de sortie, traiter acoustiquement quelques zones clés (coins, entrées de salles) et organiser des circulations à sens unique."
  },
  {
    id: "recharge-smartphone",
    title: "Bornes de recharge pour smartphones au CDI",
    image: "img/cases/recharge_smartphone.png",
    context: "Au CDI, les élèves souhaitent recharger leurs téléphones. Les prises sont rares, les câbles s’emmêlent et il existe un risque de vol.",
    contradiction: "On veut permettre la recharge pratique pour plusieurs élèves tout en garantissant la sécurité du matériel et en gardant un espace ordonné.",
    question: "Comment proposer un système de recharge collectif, sécurisé et peu encombrant ?",
    suggestedPrinciples: [5, 10, 25],
    exampleSolution: "Installer une station de recharge intégrant multiprises et casiers verrouillables avec câbles intégrés, les élèves déposant leurs téléphones en début de séance et les récupérant à la fin."
  }
];


/* ============================
   ÉTAT DU MODE ATELIER GUIDÉ
   ============================ */

const atelierState = {
  active: false,
  step: 1,
  currentCase: null,
  trizCards: [],
  loiCard: null,
  conceptCard: null
};


/* ============================
   OUTILS DE CRÉATION DE CARTES
   ============================ */

function createCardElement(frontSrc, backSrc, label, extraClass = "") {
  const card = document.createElement("div");
  card.className = "card";
  if (extraClass) {
    card.classList.add(extraClass); // "card-atelier" pour les grandes cartes d’atelier
  }

  const inner = document.createElement("div");
  inner.className = "card-inner";

  const front = document.createElement("div");
  front.className = "card-face card-front";
  const frontImg = document.createElement("img");
  frontImg.src = frontSrc;
  frontImg.className = "card-img";
  front.appendChild(frontImg);

  const back = document.createElement("div");
  back.className = "card-face card-back";
  const backImg = document.createElement("img");
  backImg.src = backSrc;
  backImg.className = "card-img";
  back.appendChild(backImg);

  const zoomIcon = document.createElement("div");
  zoomIcon.className = "zoom-icon";
  zoomIcon.textContent = "🔍";
  zoomIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    openModal(frontSrc, label);
  });
  front.appendChild(zoomIcon);

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  card.addEventListener("click", () => {
    inner.classList.toggle("flipped");
  });

  return card;
}


/* ============================
   OUTIL : SÉLECTION ALÉATOIRE
   ============================ */

function pickRandomCards(deckKey, n, extraClass = "") {
  const deck = decks[deckKey];
  const cards = [];
  const usedIndexes = new Set();

  if (!deck) return cards;

  if (deck.files) {
    const max = deck.files.length;
    const count = Math.min(n, max);

    while (cards.length < count) {
      const idx = Math.floor(Math.random() * max);
      if (usedIndexes.has(idx)) continue;
      usedIndexes.add(idx);

      const filename = deck.files[idx];
      const front = `${deck.folder}${filename}`;
      const label = `${deck.name} – ${filename.replace(".png", "")}`;
      const card = createCardElement(front, deck.back, label, extraClass);
      cards.push(card);
    }
  } else {
    const max = deck.count;
    const count = Math.min(n, max);

    while (cards.length < count) {
      const num = Math.floor(Math.random() * max) + 1;
      if (usedIndexes.has(num)) continue;
      usedIndexes.add(num);

      const formatted = deck.pad ? String(num).padStart(2, "0") : num;
      const front = `${deck.folder}${deck.prefix}${formatted}.png`;
      let label = `${deck.name} – Carte ${num}`;

      if (deckKey === "triz") {
        const principle = trizPrinciples.find((p) => p.number === num);
        if (principle) {
          label = `${deck.name} – Principe ${num} : ${principle.name}`;
        }
      }

      const card = createCardElement(front, deck.back, label, extraClass);
      cards.push(card);
    }
  }

  return cards;
}


/* ============================
   AFFICHAGE D’UN PAQUET
   ============================ */

function displayDeck(deckKey) {
  const deck = decks[deckKey];
  if (!deck) return;

  atelierState.active = false;
  updateAtelierUI();

  const grid = document.getElementById("cards-grid");
  const title = document.getElementById("cards-title");

  grid.innerHTML = "";
  title.textContent = `Paquet : ${deck.name}`;
  document.getElementById("btn-reset").style.display = "inline-block";

  // affichage en taille normale
  if (deck.files) {
    deck.files.forEach((filename) => {
      const front = `${deck.folder}${filename}`;
      const card = createCardElement(
        front,
        deck.back,
        `${deck.name} – ${filename.replace(".png", "")}`
      );
      grid.appendChild(card);
    });
  } else {
    for (let i = 1; i <= deck.count; i++) {
      const num = deck.pad ? String(i).padStart(2, "0") : i;
      const front = `${deck.folder}${deck.prefix}${num}.png`;

      let label = `${deck.name} – Carte ${i}`;
      if (deckKey === "triz") {
        const principle = trizPrinciples.find((p) => p.number === i);
        if (principle) {
          label = `${deck.name} – Principe ${i} : ${principle.name}`;
        }
      }

      const card = createCardElement(front, deck.back, label);
      grid.appendChild(card);
    }
  }
}


/* ============================
   CAS & CARTES TRIZ GUIDÉES
   ============================ */

function selectRandomCase() {
  const idx = Math.floor(Math.random() * creativityCases.length);
  return creativityCases[idx];
}

function pickTrizCardsForCase(caseObj, maxCount = 3) {
  const deck = decks["triz"];
  if (!deck || !caseObj || !caseObj.suggestedPrinciples) return [];

  const picks = [];
  const used = new Set();
  const principles = caseObj.suggestedPrinciples.slice(0, maxCount);

  principles.forEach((num) => {
    if (num < 1 || num > deck.count) return;
    if (used.has(num)) return;
    used.add(num);

    const formatted = deck.pad ? String(num).padStart(2, "0") : num;
    const front = `${deck.folder}${deck.prefix}${formatted}.png`;

    const principle = trizPrinciples.find((p) => p.number === num);
    const label = principle
      ? `${deck.name} – Principe ${num} : ${principle.name}`
      : `${deck.name} – Carte ${num}`;

    // cartes TRIZ d’atelier en grand
    const card = createCardElement(front, deck.back, label, "card-atelier");
    picks.push(card);
  });

  return picks;
}


/* ============================
   UI DU MODE ATELIER GUIDÉ
   ============================ */

function updateAtelierUI() {
  const stepsBar = document.getElementById("atelier-steps");
  const instr = document.getElementById("atelier-instructions");
  const title = document.getElementById("cards-title");

  if (!stepsBar || !instr || !title) return;

  if (!atelierState.active) {
    stepsBar.style.display = "none";
    return;
  }

  stepsBar.style.display = "block";

  [1, 2, 3, 4].forEach((n) => {
    const elt = document.getElementById(`step-${n}`);
    if (!elt) return;
    elt.classList.toggle("active", n === atelierState.step);
    elt.classList.toggle("done", n < atelierState.step);
  });

  switch (atelierState.step) {
    case 1:
      title.textContent = "Mode Atelier – Étape 1 : Comprendre le cas";
      instr.textContent =
        "Lisez le cas d’étude illustré (image, contexte, contradiction, question) et assurez-vous que tout le groupe a compris la situation.";
      break;
    case 2:
      title.textContent = "Mode Atelier – Étape 2 : Explorer les cartes TRIZ";
      instr.textContent =
        "Analysez chaque carte TRIZ suggérée pour ce cas et discutez des idées possibles.";
      break;
    case 3:
      title.textContent = "Mode Atelier – Étape 3 : Loi d’évolution et Concept créatif";
      instr.textContent =
        "Utilisez la loi d’évolution et le concept créatif pour enrichir ou transformer vos idées TRIZ.";
      break;
    case 4:
      title.textContent = "Mode Atelier – Étape 4 : Exemple de solution";
      instr.textContent =
        "Comparez vos idées avec un exemple de solution possible proposé pour ce cas.";
      break;
  }
}


/* ============================
   MODE ATELIER GUIDÉ
   ============================ */

function startAtelierGuided() {
  const grid = document.getElementById("cards-grid");
  const title = document.getElementById("cards-title");
  if (!grid || !title) return;

  const select = document.getElementById("case-select");
  let selectedCase = null;
  if (select && select.value) {
    selectedCase = creativityCases.find((c) => c.id === select.value);
  }
  if (!selectedCase) {
    selectedCase = selectRandomCase();
    if (select) select.value = selectedCase.id;
  }

  atelierState.active = true;
  atelierState.step = 1;
  atelierState.currentCase = selectedCase;
  atelierState.trizCards = pickTrizCardsForCase(selectedCase, 3);
  // Loi + Concept en carte atelier (grande)
  atelierState.loiCard = pickRandomCards("lois", 1, "card-atelier")[0];
  atelierState.conceptCard = pickRandomCards("concepts", 1, "card-atelier")[0];

  renderAtelierStepContent();
}

function renderAtelierStepContent() {
  const grid = document.getElementById("cards-grid");
  if (!grid) return;

  grid.innerHTML = "";

  const currentCase = atelierState.currentCase;

  if (atelierState.step === 1 && currentCase) {
    const wrapper = document.createElement("div");
    wrapper.className = "case-layout";

    const left = document.createElement("div");
    left.className = "case-illustration";

    if (currentCase.image) {
      const img = document.createElement("img");
      img.src = currentCase.image;
      img.alt = currentCase.title;
      img.className = "case-image";
      left.appendChild(img);
    }

    const h3 = document.createElement("h3");
    h3.textContent = currentCase.title;
    left.appendChild(h3);

    const right = document.createElement("div");
    right.className = "case-text";

    const pContext = document.createElement("p");
    pContext.textContent = currentCase.context;

    const pContradiction = document.createElement("p");
    pContradiction.innerHTML =
      "<strong>Contradiction :</strong> " + currentCase.contradiction;

    const pQuestion = document.createElement("p");
    pQuestion.innerHTML =
      "<strong>Question TRIZ :</strong> " + currentCase.question;

    right.appendChild(pContext);
    right.appendChild(pContradiction);
    right.appendChild(pQuestion);

    wrapper.appendChild(left);
    wrapper.appendChild(right);
    grid.appendChild(wrapper);
  }

  if (atelierState.step === 2) {
    atelierState.trizCards.forEach((card) => grid.appendChild(card));
  }

  if (atelierState.step === 3) {
    if (atelierState.loiCard) grid.appendChild(atelierState.loiCard);
    if (atelierState.conceptCard) grid.appendChild(atelierState.conceptCard);
  }

  if (atelierState.step === 4 && currentCase) {
    const pIntro = document.createElement("p");
    pIntro.textContent =
      "Voici un exemple de solution créative possible pour ce cas. Comparez-le avec les idées produites par le groupe.";
    grid.appendChild(pIntro);

    const pSol = document.createElement("p");
    pSol.innerHTML =
      "<strong>Exemple de solution :</strong> " + currentCase.exampleSolution;
    grid.appendChild(pSol);
  }

  document.getElementById("btn-reset").style.display = "inline-block";
  updateAtelierUI();
}

function goToAtelierStep(step) {
  if (!atelierState.active) return;
  if (step < 1 || step > 4) return;
  atelierState.step = step;
  renderAtelierStepContent();
}


/* ============================
   TIRAGE ALÉATOIRE SIMPLE
   ============================ */

function randomCard() {
  atelierState.active = false;
  updateAtelierUI();

  const allDecks = ["triz", "lois", "concepts"];
  const deckKey = allDecks[Math.floor(Math.random() * allDecks.length)];
  const deck = decks[deckKey];

  const grid = document.getElementById("cards-grid");
  const title = document.getElementById("cards-title");

  if (!grid || !title || !deck) return;

  grid.innerHTML = "";
  title.textContent = "Tirage aléatoire – 1 carte";
  document.getElementById("btn-reset").style.display = "inline-block";

  let front, label;

  if (deck.files) {
    const file = deck.files[Math.floor(Math.random() * deck.files.length)];
    front = `${deck.folder}${file}`;
    label = `${deck.name} – ${file.replace(".png", "")}`;
  } else {
    const num = Math.floor(Math.random() * deck.count) + 1;
    const formatted = deck.pad ? String(num).padStart(2, "0") : num;
    front = `${deck.folder}${deck.prefix}${formatted}.png`;

    if (deckKey === "triz") {
      const principle = trizPrinciples.find((p) => p.number === num);
      label = principle
        ? `${deck.name} – Principe ${num} : ${principle.name}`
        : `${deck.name} – Carte ${num}`;
    } else {
      label = `${deck.name} – Carte ${num}`;
    }
  }

  // tirage aléatoire en taille normale (sans "card-atelier")
  const card = createCardElement(front, deck.back, label);
  grid.appendChild(card);
}


/* ============================
   MODALES
   ============================ */

function openModal(src, label) {
  const img = document.getElementById("modal-img");
  const lbl = document.getElementById("modal-label");
  const modal = document.getElementById("modal");
  if (!img || !lbl || !modal) return;

  img.src = src;
  lbl.textContent = label;
  modal.style.display = "flex";
}


/* ============================
   INITIALISATION
   ============================ */

window.addEventListener("load", () => {
  const modal = document.getElementById("modal");
  const modalClose = document.getElementById("modal-close");
  if (modal && modalClose) {
    modalClose.onclick = () => (modal.style.display = "none");
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    };
  }

  const modalRules = document.getElementById("modal-rules");
  const modalRulesClose = document.getElementById("modal-rules-close");
  const btnRules = document.getElementById("btn-rules");

  if (btnRules && modalRules) {
    btnRules.onclick = () => {
      modalRules.style.display = "flex";
    };
  }
  if (modalRules && modalRulesClose) {
    modalRulesClose.onclick = () => {
      modalRules.style.display = "none";
    };
    modalRules.onclick = (e) => {
      if (e.target === modalRules) {
        modalRules.style.display = "none";
      }
    };
  }

  const btnReset = document.getElementById("btn-reset");
  if (btnReset) {
    btnReset.onclick = () => {
      document.getElementById("cards-grid").innerHTML = "";
      document.getElementById("cards-title").textContent =
        "Sélectionnez un paquet ou lancez un atelier";
      btnReset.style.display = "none";

      atelierState.active = false;
      atelierState.step = 1;
      updateAtelierUI();

      const select = document.getElementById("case-select");
      if (select) select.value = "";
    };
  }

  const btnAtelierPrev = document.getElementById("atelier-prev");
  const btnAtelierNext = document.getElementById("atelier-next");
  if (btnAtelierPrev) {
    btnAtelierPrev.onclick = () => {
      if (!atelierState.active) return;
      goToAtelierStep(atelierState.step - 1);
    };
  }
  if (btnAtelierNext) {
    btnAtelierNext.onclick = () => {
      if (!atelierState.active) return;
      goToAtelierStep(atelierState.step + 1);
    };
  }

  const btnRandomCase = document.getElementById("btn-random-case");
  if (btnRandomCase) {
    btnRandomCase.onclick = () => {
      const randomCase = selectRandomCase();
      const select = document.getElementById("case-select");
      if (select) {
        select.value = randomCase.id;
      }
    };
  }

  const deckTriz = document.getElementById("deck-triz");
  const deckLois = document.getElementById("deck-lois");
  const deckConcepts = document.getElementById("deck-concepts");
  const btnAtelier = document.getElementById("btn-atelier");
  const btnRandom = document.getElementById("btn-random");

  if (deckTriz) deckTriz.onclick = () => displayDeck("triz");
  if (deckLois) deckLois.onclick = () => displayDeck("lois");
  if (deckConcepts) deckConcepts.onclick = () => displayDeck("concepts");
  if (btnAtelier) btnAtelier.onclick = () => {
    atelierState.step = 1;
    startAtelierGuided();
  };
  if (btnRandom) btnRandom.onclick = randomCard;
});
