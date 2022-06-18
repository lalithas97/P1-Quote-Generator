// console.log('testing');

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading()
{
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// hide Loader
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new Quote
function newQuote(){
    loading();
    // Pick  a random quote from apiQuotes array
    const quote=apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check author field is blank and replace it with 'unknown'
    // quote.author == null is equal to !quote.author
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }
    else{
        authorText.textContent = quote.author;
    }

    // check quote length to determine styling
    // to add a css class to an element use ---> classList.add('className')
    if(quote.text.length > 120)
    {
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    // Set Quote and hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
// We are using asynchronous fetch request within a try catch statement. Asynchronous function can run independently anytime. and it won't stop the browser from loading the page.
async function getQuotes(){
    loading();
    const apiUrl ='https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes[12]);
        newQuote();
    }catch(error)
    {
        // alert(error);
        // catch error here
    }
}

// Tweet Quote
function tweerQuote(){
    // use back ticks below esc button as we are using template string
    const twitterUrl =`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweerQuote);


// Onload
getQuotes();
