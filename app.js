function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const independentUl = document.getElementById('PaysIndependent');
const nonIndependentUl = document.getElementById('PaysNonIndependent');
const url = 'https://restcountries.com/v3.1/all';

fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        //pour filtrer 
        const paysIndependent = data.filter(nations => nations.independent === true);
        const paysNonIndependent = data.filter(nations => nations.independent === false);
        // fonctions des pays independats
        
        paysIndependent.forEach(function(nations) {
            let li = createNode('li');
            li.innerHTML = nations.name.common;
            append(independentUl, li);
        });

        //fonctios pays dependant
        paysNonIndependent.forEach(function(nations) {
            let li = createNode('li');
            li.innerHTML = nations.name.common;
            append(nonIndependentUl, li);
        });
    })
    .catch(function(error) {
        console.log(error);
    });

