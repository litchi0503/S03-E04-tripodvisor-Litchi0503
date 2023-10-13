// un tableau pour stocker les images du slider :
const sliderImages = [
  "ocean.jpg",
  "ski.jpg",
  "city.jpg",
  "canyon.jpg",
  "road.jpg",
  "nature.jpg",
];

// une fonction pour gérer le changement de thème
// quand on appelle cette fonction, si le thème est dark -> on passe au thème light
//                                  si le thème est light -> on passe au thème dark

function changeTheme() {
  // 1ère étape : on sélectionne l'élément avec lequel on veut interragir : ici, le body
  const body = document.querySelector("body");

  // 2ème étape : on fait la modification !
  // .classList.contains() nous permet de tester si body a une classe spécifique
  // if(body.classList.contains('theme-dark')) {
  // le body a la classe theme-dark, donc on la supprime !
  // body.classList.remove('theme-dark');
  // } else {
  // le body n'a pas la classe theme-dark, donc on l'ajoute !
  body.classList.add('theme-dark');
  // }

  //* on pourrait remplacer le if/else ci-dessus par .classList.toggle() qui permet de "basculer" la présence d'une classe
  body.classList.toggle("theme-dark");
}

/* ----------------------- Fonction pour les iamges -------------------- */

// une fonction pour charger les images dans le slider
function loadSliderImages() {
  // comme d'hab', en JS, la première étape c'est sélectionner l'élément à modifier
  const slider = document.querySelector(".slider");

  // 2ème étape, on modifie l'élément qu'on a sélectionné
  // dans notre cas, on veut :
  //  - créer 3 balises img
  //  - ajouter la classe slider__img sur toutes les balises img
  //  - ajouter la classe slider__img--current sur l'image à afficher
  //  - on va modifier l'attribut src et l'attribut alt de notre image
  //  - ajouter les balises créées à l'intérieur de notre slider

  for (const image of sliderImages) {
    // pour créer une nouvelle balise, on utilise document.createElement('nom_balise'());
    // on stocke la balise nouvellement créée (mais pas encore ajoutée à la page) dans une variable img
    const img = document.createElement("img");

    // on doit ensuite ajouter 2 classes à notre balise img :
    img.classList.add("slider__img");

    // on modifie l'attribut src et alt de notre image :
    img.src = "img/" + image;
    img.alt = "Texte alternatif de l'image " + image;

    // pour ajouter une balise à l'intérieur d'une autre, on utilise :
    // - A.append(B) ou A.appendChild(B) : ajoute la balise B à la fin de la balise A
    // - A.prepend(B) : ajoute la balise B au début de la balise A
    // - il y a d'autres possibilités, mais plus avancées/complexes (par exemple : .insertAdjacent, ...)
    //slider.appendChild(img);
    slider.prepend(img);
  }

  // il nous reste à ajouter la classe slider__img--current sur l'une de nos images du slider (la première par exemple)
  // 1ère étape : on sélectionne la première image qui a la classe slider__img
  const img = document.querySelector(".slider__img");
  // 2ème étape : on ajoute la classe à cette image
  img.classList.add("slider__img--current");
}

// au chargement de la page, on appelle la fonction loadSliderImages() pour charger les images :
loadSliderImages();






/* 
TODO ------------------------ ATELIER ------------------------------- 
*/
/* 
? ------------------------ VARIABLE -------------------------------
*/
const forbiddenDomains = [
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
  "cool.fr.nf",
  "jetable.fr.nf",
  "courriel.fr.nf",
  "moncourrier.fr.nf",
  "monemail.fr.nf",
  "monmail.fr.nf",
  "hide.biz.st",
  "mymail.infos.st",
];
let timeoutId;

let currentImageIndex = 0;
const images = document.querySelectorAll(".slider__img");

/* 
! ------------------------ FUNCTION INIT -------------------------------
*/
/* 
?--------------------- ETAPE 1 & 2 ---------------------------------
*/

function init() {
  const buttonOpenNewsLetter = document.querySelector(
    "#Newsletter" 
  ); /* Je cible le bouton NewsLetter */
  buttonOpenNewsLetter.addEventListener(
    "click",
    handleNewsLetter
  ); /*  On active lors d'un click sur le bouton NewsLetter la fonction */

  const buttonCloseNewsLetter = document.querySelector(
    "#closeNewsLetter"
  ); /* Je cible le bouton croix */
  buttonCloseNewsLetter.addEventListener(
    "click",
    handleNewsLetter
  ); /* On active lors d'un click sur le bouton croix la même fonction */

  const formulaireEmail = document.querySelector("#form");

  formulaireEmail.addEventListener("submit", handleFormSubmit);

  /*
  ?------------------- BONUS MOUSE ENTER ET LEAVE ------------------
  */

  const mouse = document.querySelector("#mouse");

  mouse.addEventListener("mouseenter", handleMouseEnter); // Gérer le passage de la souris
  mouse.addEventListener("mouseleave", handleMouseLeave); // Gérer la sortie de la souris

  /*
  ?------------------------- PRIME ------------------------------- 
  */
  // Sélectionne le bouton droit
  const buttonRight = document.querySelector("#right");
  // Active la fonction lors d'un click sur le bouton de droite
  buttonRight.addEventListener("click", handlebuttonRight);

  // Sélectionne le bouton gauche
  const buttonLeft = document.querySelector("#left");
  // Active la fonction lors d'un click sur le bouton de gauche
  buttonLeft.addEventListener("click", handlebuttonLeft);
}

/* 
TODO--------------------- ETAPE 1 ---------------------------------
*/

function handleNewsLetter(event) {
  event.preventDefault();
  const inputElement = document.querySelector(".newsletter");
  inputElement.classList.toggle(
    "newsletter--on"
  ); /* On peut remplacer le .add par un .toggle */

  timeoutId = setTimeout(function () {
    inputElement.classList.remove("newsletter--on");
  }, 8000);
}
/*
?------------------- BONUS MOUSE ENTER ET LEAVE --------------------
*/

function handleMouseEnter() {
  // Si la souris entre dans le formulaire, annule le timeout
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
}

function handleMouseLeave() {
  // Si la souris quitte le formulaire, réactive le timeout
  const inputElement = document.querySelector(".newsletter");
  timeoutId = setTimeout(function () {
    inputElement.classList.remove("newsletter--on");
  }, 8000); // 8 secondes
}

/*
TODO--------------------------- ETAPE 2 ---------------------------- 
*/

function handleFormSubmit(event) {
  event.preventDefault();
  const value = document.querySelector(".newsletter__field").value;
  const parts = value.split(
    "@"
  ); /* Le split va scinder en deux la valeur à partir de @ et créer un tableau */
  if (forbiddenDomains.includes(parts[1])) {
    /* Permet de vérifier si la value est dans le tableau forbidden */
    const balise = document.querySelector(".newsletter");
    const p = document.createElement("p");
    p.classList.add("message");
    p.textContent = "Les adresses jetables ne sont pas admises";
    balise.appendChild(p);

    setTimeout(function () {
      p.classList.remove("message");
      p.textContent = "";
    }, 5000);
  } else {
    console.log(value);
    handleNewsLetter(event);
  }
  form.reset();
}

/*
TODO --------------------------- PRIME ---------------------------
*/
/*
?------------------------- FUNCTION RIGHT ------------------------
*/

function handlebuttonRight(event) {
  event.preventDefault();

  // Cacher l'image actuelle
  images[currentImageIndex].classList.remove("slider__img--current");

  // Passer à l'image suivante (et revenir à la première si c'est la dernière)
  currentImageIndex = (currentImageIndex + 1) % images.length;

  // Afficher la nouvelle image
  images[currentImageIndex].classList.add("slider__img--current");
}

/*
? ---------------------- FUNCTION LEFT ----------------------------
*/

function handlebuttonLeft(event) {
  event.preventDefault();

  // Cacher l'image actuelle
  images[currentImageIndex].classList.remove("slider__img--current");

  // Passer à l'image suivante (et revenir à la première si c'est la dernière)
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;

  // Afficher la nouvelle image
  images[currentImageIndex].classList.add("slider__img--current");
}

document.addEventListener("DOMContentLoaded", init);
