/*
    * watchlisters_in_searchs.js
    * Feature script for the TradeMe+ extension
    * Author: Finn (catdogmat) and others
    * License: MIT
    * Thanks for using/contributing to our extension!
*/


// Gets a listing number from a URL using regex, this is bearly readable
// TODO: Make this more readable
const getlistingNumber = (url) => (url.match(/\/listing\/(\d+)$/) || [])[1] || null;

// Gets the amount of watchers from a listing and sets it in the card
function setWatchlistedAmountFromCard(card) {
    fetch(card.href)
    .then(response => response.text())
    .then(data => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, 'text/html');
        var elements = doc.getElementsByClassName('tm-marketplace-buyer-options__watchers-count');
        if (elements.length > 0) {
            var cardlocation = card.getElementsByClassName('tm-marketplace-search-card__location')[0]
            cardlocation.textContent = cardlocation.textContent + '    |    ' + elements[0].textContent
        } else {
            cardlocation.textContent = cardlocation.textContent + '    |    ' + '0 other watchers'
        }
    });
}

// Handle URL changes
function handleUrlChange() {
    var url = window.location.href;
    var urlParams = new URLSearchParams(window.location.search);
    if (url.includes('/search?search_string=')) {
        // TODO: I really need to find a way to do this without a timer, the SetTimeout is a bit of a hack
        // TODO: and may not work on faster connections. This is only here because trade me is dumb and 
        // TODO: updates the page with javascript after the initial load.
        setTimeout(function() {
            cards = document.getElementsByClassName('tm-marketplace-search-card__detail-section')
            for (i in cards) {
                setWatchlistedAmountFromCard(cards[i]);
            }
        }, 1000);
    }
}

// Listen for URL changes
// https://stackoverflow.com/questions/53303519/detect-an-url-change-in-a-spa
// Yes I stole this, get over it
// Edited to fix tabs and add our function
let previousUrl = '';
const observer = new MutationObserver(function(mutations) {
    if (location.href !== previousUrl) {
        previousUrl = location.href;
        console.log('URL changed!');
        console.log(location.href);
        handleUrlChange();
    }
});
const config = {subtree: true, childList: true};
observer.observe(document, config);