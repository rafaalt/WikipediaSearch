
const form = document.querySelector('.search-box');
const input = form.querySelector('input[type="search"]');
const resultsContainer = document.querySelector('.results');
const resultsCounter = document.querySelector('header p');

function searchWikipedia(searchTerm){
    const url = `https://pt.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=500&srsearch=${encodeURIComponent(searchTerm)}`;
    fetch(url).then(response => response.json()).then(
        data=>{
            displayResults(data.query.search);
        }
    ).catch(error => alert('Error: ' + error));
}

function displayResults(results){
    resultsContainer.innerHTML = '';
    resultsCounter.textContent = `Result Count: ${results.length}`
    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.className = 'result';
        resultElement.innerHTML = `
        <h3>${result.title}</h3>
        <p>${result.snippet}</p>
        <a href="https://pt.wikipedia.org/?curid=${result.pageid}" target="_blank">Read More</a>
        `;
        resultsContainer.appendChild(resultElement);
    });
}
function buscar(){
    const searchTerm = input.value;
    if(searchTerm){
        searchWikipedia(searchTerm);
    }
}