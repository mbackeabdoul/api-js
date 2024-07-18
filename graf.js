
// Fonction pour créer un nouvel élément HTML
function createNode(element) {
    return document.createElement(element);
}

// Fonction pour ajouter un élément enfant à un élément parent
function append(parent, el) {
    return parent.appendChild(el);
}

// Sélection des éléments <ul> pour afficher les pays indépendants et non indépendants
const independentUl = document.getElementById('PaysIndependent');
const nonIndependentUl = document.getElementById('PaysNonIndependent');

// URLs des API pour récupérer les pays indépendants et non indépendants
const independentUrl = 'https://restcountries.com/v3.1/independent?status=true';
const nonIndependentUrl = 'https://restcountries.com/v3.1/independent?status=false';

// Fonction pour récupérer et afficher les pays
function recupererAfficher(url, ulElement) {
    fetch(url)
        .then((resp) => resp.json()) // Transformer la réponse en JSON
        .then(function(data) {
            return data.map(function(pays) { // Utiliser map pour traiter chaque pays
                let li = createNode('li'); // Créer un élément <li>
                li.innerHTML = pays.name.common; // Ajouter le nom du pays dans le <li>
                append(ulElement, li); // Ajouter le <li> à l'élément <ul> correspondant
            });
        })
        .catch(function(error) {
            console.log(error); // Gérer les erreurs
        });
}

// Récupérer et afficher les pays indépendants
recupererAfficher(independentUrl, independentUl);

// Récupérer et afficher les pays non indépendants
recupererAfficher(nonIndependentUrl, nonIndependentUl);


