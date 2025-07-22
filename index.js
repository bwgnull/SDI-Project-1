document.getElementById('search-button').addEventListener('click', () => {
    const inputText = document.getElementById('user-query').value;
    return search(inputText);
});

const inputText = document.getElementById('user-query').value.trim().toLowerCase();

function search(inputText) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputText}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Please try another word.');
            }
            return response.json();
        })
        .then(definitionData => {
            console.log("Word:", definitionData[0].word);

            const dataHolder = document.querySelector("#data-container");
            dataHolder.innerHTML = `
                <fieldset id="search-fieldset">
                <h1> Word: ${definitionData[0].word}</h2>
                <p> Definition: ${definitionData[0].meanings[0].definitions[0].definition}</p>
                <p> Synonyms: ${definitionData[0].meanings[0].definitions[0].synonyms}</p>
                <p> Antonyms: ${definitionData[0].meanings[0].definitions[0].antonyms}</p>
                <p> Origins: ${definitionData[0].origin}</p>
                <p> Phonetics: ${definitionData[0].phonetics[0].audio}</p>
                </fieldset
            `;

            let clearInput = document.getElementById('user-query');
            clearInput.value = '';
        })
        .catch(error => {
            console.error('Fetch error:', error.message);
            const dataHolder = document.querySelector("#data-container");
            dataHolder.innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
}



import { randomNum as wordList } from './random-num.js'; 

document.getElementById('random-button').addEventListener('click', () => {
    return getRandomWord();
});

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const randomWord = wordList[randomIndex];
    return search(randomWord);
}

