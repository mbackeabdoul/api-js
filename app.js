// Fonction pour créer un nouvel élément HTML
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const independentDiv = document.getElementById('PaysIndependent');
const nonIndependentDiv = document.getElementById('PaysNonIndependent');
const url = 'https://restcountries.com/v3.1/all';      2

fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        // Pour filtrer
        const paysIndependent = data.filter(nations => nations.independent === true);
        const paysNonIndependent = data.filter(nations => nations.independent === false);
        
        // Fonctions des pays indépendants
        paysIndependent.forEach(function(nations) {
            let col = createNode('div');
            col.classList.add('col-md-3', 'mb-4');
            let card = createNode('div');
            card.classList.add('card', 'h-100'); 
            card.innerHTML = `
                <img src="${nations.flags.png}" class="card-img-top" alt="Drapeau de ${nations.name.common}">
                <div class="card-body shadow">
                    <h5 class="card-title">${nations.name.common}</h5>
                </div>
            `;
            append(col, card);
            append(independentDiv, col); 
        });

        // Fonctions des pays dépendants
        paysNonIndependent.forEach(function(nations) {
            let col = createNode('div');
            col.classList.add('col-md-3', 'mb-4'); 
            let card = createNode('div');
            card.classList.add('card', 'h-100',); 
            card.innerHTML = `
                <img src="${nations.flags.png}" class="card-img-top" alt="Drapeau de ${nations.name.common}">
                <div class="card-body shadow">
                    <h5 class="card-title">${nations.name.common}</h5>
                </div>
            `;
            append(col, card); 
            append(nonIndependentDiv, col);
        });
    })
    .catch(function(error) {
        console.log(error);
    });
