const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const instagramBtn = document.getElementById('instagram');
const facebookBtn = document.getElementById('facebook');
const snapchatBtn = document.getElementById('snapchat');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];


function newQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    quoteText.textContent = quote.text;
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
    
}

async function getQuotes() {
    const apiUrl = 'https://ademoyosoreoluwa.github.io/quote_generator/quotes.json';
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        apiQuotes = await response.json();
        newQuote();
        console.log(apiQuotes)
    } catch (error) {

    console.error("Failed to fetch quotes: ", error);
    quoteText.textContent = "An error occurred while fetching the quote.";
    authorText.textContent = "Error";
    }
}


function postQuote(platform) {
    const quote = `${quoteText.textContent} - ${authorText.textContent}`;
    
    const twitterUrlWeb = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)}`;
    const twitterUrlApp = `twitter://post?message=${encodeURIComponent(quote)}`;
    
    const facebookUrlWeb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(quote)}`;
    const facebookUrlApp = `fb://facewebmodal/f?href=https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(quote)}`;
    
    const instagramMessage = `Instagram does not allow direct sharing via URL. Please copy and paste the following text to share on Instagram:\n\n"${quote}"`;
    const snapchatMessage = `Snapchat does not allow direct sharing via URL. Please copy and paste the following text to share on Snapchat:\n\n"${quote}"`;
    
    if (platform === 'twitter') {
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            window.open(twitterUrlApp, '_blank');
        } else {
            window.open(twitterUrlWeb, '_blank');
        }
    } else if (platform === 'facebook') {
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            window.open(facebookUrlApp, '_blank'); 
        } else {
            window.open(facebookUrlWeb, '_blank');
        }
    } else if (platform === 'instagram') {
        alert(instagramMessage);
    } else if (platform === 'snapchat') {
        alert(snapchatMessage);
    }
}

twitterBtn.addEventListener('click', () => postQuote('twitter'));
facebookBtn.addEventListener('click', () => postQuote('facebook'));
instagramBtn.addEventListener('click', () => postQuote('instagram'));
snapchatBtn.addEventListener('click', () => postQuote('snapchat'));
newQuoteBtn.addEventListener('click', newQuote);

getQuotes();
