import {nationConverter,  renderConversion} from './nationConverter.js'

// Information to reach API
const urlAge = 'https://api.agify.io?name=';
const urlGender = 'https://api.genderize.io?name=';
const urlNation = 'https://api.nationalize.io?name=';


// Select page elements
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseAge = document.querySelector('#responseAge');
const responseGender = document.querySelector('#responseGender');
const responseNation = document.querySelector('#responseNation');

// Asynchronous function
const getInfo = () => {
    const nameQuery = inputField.value;
    const endpointAge = `${urlAge}${nameQuery}`;
    const endpointGender = `${urlGender}${nameQuery}`;
    const endpointNation = `${urlNation}${nameQuery}`;

    fetch(endpointAge)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    }, networkError => {
        console.log(networkError.message)
    }).then(jsonResponse => {
        if (jsonResponse.count === 0){
            responseAge.innerHTML = "<p>There is no such name in the database.</p>";
            return;
        }
        responseAge.innerHTML = `<p>You are ${jsonResponse.age} years old.</p>`;
    });

    fetch(endpointGender)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    }, networkError => {
        console.log(networkError.message)
    }).then(jsonResponse => {
        if (jsonResponse.count === 0){
            responseGender.innerHTML = "<p>No name - no gender.</p>";
            return;
        }
        responseGender.innerHTML = `<p>You are <em>${jsonResponse.gender}</em> with the probability of ${jsonResponse.probability*100}%.</p>`;
    });

    fetch(endpointNation)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    }, networkError => {
        console.log(networkError.message)
    }).then(jsonResponse => {
        renderNation(jsonResponse);
    });
}

// Nation is shown in an array, so I decided to create a separate function to render results
const renderNation = (res) => {
    // if res is false
    if(!res){
        console.log(res.status);
    }
    // if res has an empty array
    if(!res.country.length){
        responseNation.innerHTML = "<p>No nation found.</p>";
        return;
    }
    // Countries as variables
    const firstCountry = res.country[0].country_id;
    const secondCountry = res.country[1].country_id;
    const thirdCountry = res.country[2].country_id; 
    // Show results on the page
    responseNation.innerHTML = `<p>You are most likeky from those <em>countries</em>: <strong>${firstCountry}</strong> (${Math.round(res.country[0].probability*100)}%), <strong>${secondCountry}</strong> (${Math.round(res.country[1].probability*100)}%) or <strong>${thirdCountry}</strong> (${Math.round(res.country[2].probability*100)}%).`;
    nationConverter(firstCountry);
    nationConverter(secondCountry);
    nationConverter(thirdCountry);
    return
}

const displayInfo = (event) => {
    event.preventDefault();
    // clean the previous results
    responseAge.removeChild(responseAge.firstChild);
    responseGender.removeChild(responseGender.firstChild);
    responseNation.removeChild(responseNation.firstChild);
    while(conversion.firstChild){
        conversion.removeChild(conversion.firstChild);
    }
    // show information for the new query
    getInfo();
  };

  submit.addEventListener('click', displayInfo);

  
  