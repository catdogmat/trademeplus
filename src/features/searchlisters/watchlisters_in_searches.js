const getlistingNumber = (url) => (url.match(/\/listing\/(\d+)$/) || [])[1] || null;

function htmlToElem(html) {
    let temp = document.createElement('template');
    html = html.trim(); // Never return a space text node as a result
    temp.innerHTML = html;
    return temp.content.firstChild;
  }

function setWatchlistedAmountFromCard(card) {
    fetch(card.href)
    .then(response => response.text())
    .then(data => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, 'text/html');
        var elements = doc.getElementsByClassName('tm-marketplace-buyer-options__watchers-count');
        // TODO: Don't use innerHTML, use textContent because "cookies" and "security"... i hate this
        if (elements.length > 0) {
            var cardlocation = card.getElementsByClassName('tm-marketplace-search-card__location')[0]
            cardlocation.innerHTML = cardlocation.innerHTML + '    |    ' + elements[0].textContent
        } else {
            cardlocation.innerHTML = cardlocation.innerHTML + '    |    ' + '0 other watchers'
        }
    });
}

function handleUrlChange() {
    var url = window.location.href;
    var urlParams = new URLSearchParams(window.location.search);
    if (url.includes('/search?search_string=')) {
        // TODO: I really need to find a way to do this without a timer, the SetTimeout is a bit of a hack
        // TODO: and may not work on faster connections. This is only here because trade me is dumb and 
        // TODO: updates the page with javascript after the initial load.
        setInterval(function() {
            cards = document.getElementsByClassName('tm-marketplace-search-card__detail-section')
            for (var i = 0; i < cards.length; i++) {
                setWatchlistedAmountFromCard(cards[i]);
            }
        }, 1000);
    }
}

// Listen for URL changes
// https://stackoverflow.com/questions/53303519/detect-an-url-change-in-a-spa
// Edited to fix tabs and add our function
let previousUrl = '';
const observer = new MutationObserver(function(mutations) {
    if (location.href !== previousUrl) {
        previousUrl = location.href;
        handleUrlChange();
    }
});
const config = {subtree: true, childList: true};
observer.observe(document, config);