const nationConverter = (code) => {
    code = code.toLowerCase();
    const url = `https://api.worldbank.org/v2/country/${code}?format=json`
    fetch(url)
    .then(response => {
        if (response.ok){
            return response.json();
        }
        throw new Error('Request failed!');
    }, networkError => {
        console.log(networkError.message)
    }).then(jsonResponse => {
        renderConversion(jsonResponse);
        return

    })
}

const renderConversion = (resp) => {
    let conversionElement = document.createElement('p');
    conversionElement.id = 'country';
    conversionElement.innerHTML = `<p><strong>${resp[1][0].iso2Code}</strong> - ${resp[1][0].name}`;
    document.getElementById('conversion').appendChild(conversionElement);
    return
}

export {nationConverter,  renderConversion};