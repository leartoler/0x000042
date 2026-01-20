const twitterUrl = "https://twitter.com/intent/tweet/";
const linkTarget = '_top'
const windowOptions = 'menubar=no,status=no,height=750,width=500'

function extractTitleText() {
    return document.querySelector('h1').innerText;
}

function extractAnchorLink() {
    return document.querySelector('a').href;
}

function extractWindowLink() {
    return window.location.href;
}

function openTwitterWindow(text, link) {
    const twitterQuery = `text=${text}&url=${link}`;
    return window.open(`${twitterUrl}?${twitterQuery}&`, linkTarget, windowOptions);
}

function registerShareButton() {
    const text = extractTitleText()
    const link = extractAnchorLink();
    const twitterButton = document.querySelector('#button--twitter');
    twitterButton.addEventListener('click', () => openTwitterWindow(text, link))
}

registerShareButton()