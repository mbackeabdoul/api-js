// Fonction pour créer un nouvel élément
function creerElement(type) {
    return document.createElement(type);
}

// Fonction pour ajouter un élément enfant à un élément parent
function ajouter(parent, enfant) {
    return parent.appendChild(enfant);
}

// Sélectionner les éléments de la page
const divPaysIndependants = document.getElementById('divPaysIndependants');
const divPaysNonIndependants = document.getElementById('divPaysNonIndependants');
const detailsPays = document.getElementById('detailsPays');
const loader = document.getElementById('loader');
const url = 'https://restcountries.com/v3.1/all';

// Afficher le loader
loader.style.display = 'block';

// Charger les données des pays
fetch(url)
    .then((response) => response.json())
    .then(function(data) {
        // Masquer le loader après le chargement des données
        loader.style.display = 'none';
        
        // Filtrer les pays indépendants et les non indépendants
        const paysIndependants = data.filter(pays => pays.independent === true);
        const paysNonIndependants = data.filter(pays => pays.independent === false);
        
        // Cartes pour les pays indépendants
        paysIndependants.forEach(function(pays) {
            let col = creerElement('div');
            col.classList.add('col-md-3', 'mb-4');
            let carte = creerElement('div');
            carte.classList.add('card', 'h-100');
            carte.innerHTML = `
                <img src="${pays.flags.png}" class="card-img-top" alt="Drapeau de ${pays.name.common}">
                <div class="card-body shadow">
                    <h5 class="card-title">${pays.name.common}</h5>
                    <button class="btn btn-primary" onclick="afficherDetails('${pays.cca3}')">Détails</button>
                </div>
            `;
            ajouter(col, carte);
            ajouter(divPaysIndependants, col);
        });

        // Cartes pour les pays non indépendants
        paysNonIndependants.forEach(function(pays) {
            let col = creerElement('div');
            col.classList.add('col-md-3', 'mb-4');
            let carte = creerElement('div');
            carte.classList.add('card', 'h-100');
            carte.innerHTML = `
                <img src="${pays.flags.png}" class="card-img-top" alt="Drapeau de ${pays.name.common}">
                <div class="card-body shadow">
                    <h5 class="card-title">${pays.name.common}</h5>
                    <button class="btn btn-primary" onclick="afficherDetails('${pays.cca3}')">Détails</button>
                </div>
            `;
            ajouter(col, carte);
            ajouter(divPaysNonIndependants, col);
        });

        // Vérifier si un pays est déjà sélectionné
        const paysSelectionne = localStorage.getItem('paysSelectionne');
        if (paysSelectionne) {
            afficherDetails(paysSelectionne);
        }
    })
    .catch(function(error) {
        console.log(error);
        // Masquer le loader en cas d'erreur
        loader.style.display = 'none';
    });

// Fonction pour afficher les détails d'un pays
function afficherDetails(cca3) {
    fetch('https://restcountries.com/v3.1/all')
        .then((response) => response.json())
        .then(function(data) {
            const pays = data.find(p => p.cca3 === cca3);
            if (pays) {
                // Enregistrer l'identifiant du pays sélectionné dans le localStorage
                localStorage.setItem('paysSelectionne', cca3);
                // Pour masquer les titres et les listes de pays
                document.getElementById('titreIndependants').style.display = 'none';
                document.getElementById('titreNonIndependants').style.display = 'none';
                divPaysIndependants.style.display = 'none';
                divPaysNonIndependants.style.display = 'none';

                // Afficher la section des détails
                detailsPays.style.display = 'block';

                // Mettre à jour le contenu de la carte des détails
                document.getElementById('conteneurDetails').innerHTML = `
                    <img src="${pays.flags.png}" class="card-img-top" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${pays.name.common}</h5>
                        <p>Capitale: ${pays.capital ? pays.capital[0] : 'N/A'}</p>
                        <p>Population: ${pays.population.toLocaleString()}</p>
                        <p>Région: ${pays.region}</p>
                        <p>Langues: ${pays.languages ? Object.values(pays.languages).join(', ') : 'N/A'}</p>
                    </div>
                `;
            } else {
                document.getElementById('conteneurDetails').innerHTML = 'Détails non disponibles';
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

// Fonction pour revenir à la liste des pays
function retour() {
    localStorage.removeItem('paysSelectionne'); // Effacer l'identifiant du pays sélectionné du localStorage

    document.getElementById('titreIndependants').style.display = 'block';
    document.getElementById('titreNonIndependants').style.display = 'block';
    divPaysIndependants.style.display = 'flex'; // d-flex pour maintenir l'alignement horizontal
    divPaysNonIndependants.style.display = 'flex'; // d-flex pour maintenir l'alignement horizontal
    detailsPays.style.display = 'none';
}
