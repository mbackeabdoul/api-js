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
        const independentCountries = data.filter(country => country.independent === true);
        const nonIndependentCountries = data.filter(country => country.independent === false);
        // fonctions des pays independats
        
        independentCountries.forEach(function(country) {
            let li = createNode('li');
            li.innerHTML = country.name.common;
            append(independentUl, li);
        });

        //fonctios pays dependant
        nonIndependentCountries.forEach(function(country) {
            let li = createNode('li');
            li.innerHTML = country.name.common;
            append(nonIndependentUl, li);
        });
    })
    .catch(function(error) {
        console.log(error);
    });

