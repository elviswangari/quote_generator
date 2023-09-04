const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show showLoadingSpinner
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote() {
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //  check if author is null
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        // authorText.textContent = quote.author;
        const authorParts = quote.author.split(',');
        const author = authorParts[0].trim();

        // Set the text content of the HTML element
        authorText.textContent = author;
    }

    // increase font if less than 
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    }
    else {
        quoteText.classList.remove('long-quote');
    }

    // set quote hide loader 
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

async function getQuoteFromApi() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const responce = await fetch(apiUrl);
        apiQuotes = await responce.json();
        newQuote();
    } catch (error) {

    }
}

// tweet
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuoteFromApi();