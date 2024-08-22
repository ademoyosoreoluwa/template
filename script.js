const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const instagramBtn = document.getElementById('instagram');
const facebookBtn = document.getElementById('facebook');
const snapchatBtn = document.getElementById('snapchat');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

// Show New Quote
function newQuote() {
    // Pick a Random Quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with quote unknown.
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote Length To Determine Styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove(long-quote);
    }   
    quoteText.textContent = quote.text;
}

// GET QUOTES FROM API
async function getQuotes() {
    const apiUrl = 'https://ademoyosoreoluwa.github.io/quote_generator/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
    //    Catch Error Here
    console.error("Failed to fetch quotes: ", error);
    }
}

// Post Quote on All Social Networks
function postQuote() {
    const quote = `${quoteText.textContent} - ${authorText.textContent}`;
    
    // Twitter
    const twitterUrlWeb = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)}`;
    const twitterUrlApp = `twitter://post?message=${encodeURIComponent(quote)}`;
    
    // Facebook
    const facebookUrlWeb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(quote)}`;
    const facebookUrlApp = `fb://facewebmodal/f?href=https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(quote)}`;
    
    // Instagram (Using text copy prompt as direct posting via URL is not possible)
    const instagramMessage = `Instagram does not allow direct sharing via URL. Please copy and paste the following text to share on Instagram:\n\n"${quote}"`;
    
    // Snapchat (Using text copy prompt as direct posting via URL is not possible)
    const snapchatMessage = `Snapchat does not allow direct sharing via URL. Please copy and paste the following text to share on Snapchat:\n\n"${quote}"`;
    
    // Check if the user is on a mobile device
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // Open Twitter app or web fallback
        window.open(twitterUrlApp, '_blank');
        // Open Facebook app or web fallback
        window.open(facebookUrlApp, '_blank');
    } else {
        // Open Twitter website in a new tab
        window.open(twitterUrlWeb, '_blank');
        // Open Facebook website in a new tab
        window.open(facebookUrlWeb, '_blank');
    }

    // Prompt the user to copy the text for Instagram and Snapchat
    alert(instagramMessage);
    alert(snapchatMessage);
}

// Event Listeners for individual buttons
twitterBtn.addEventListener('click', tweetQuote); // Already defined
facebookBtn.addEventListener('click', postQuote);
instagramBtn.addEventListener('click', postQuote);
snapchatBtn.addEventListener('click', postQuote);


// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
// On Load
getQuotes();