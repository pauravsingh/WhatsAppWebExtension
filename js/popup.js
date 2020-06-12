// Get the button in the pop up
let toggleButton = document.getElementById('toggleButton');

// Get page body
const body = document.getElementsByTagName('body')[0]

// Returns the whatsapp web page's body class
function getCurrentState() {
    return document.body.classList.contains('dark') ? 'dark' : 'light';
}

// On pop up window load
window.onload = function ($event) {
    // Get the whatsapp web page's current state i.e. dark or light
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {code: `(${getCurrentState})()`}, function (state) {
            // Set button css and value based on current state
            if (state[0] === 'dark') {
                body.classList.value = 'body-light';
                toggleButton.classList.value = 'button-light';
                toggleButton.innerText = 'Light';
            } else {
                body.classList.value = 'body-dark';
                toggleButton.classList.value = 'button-dark';
                toggleButton.innerText = 'Dark';
            }
        });
    });
}


// On button click event
toggleButton.onclick = function(element) {
    //Call the toggle function
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {file: 'js/toggle.js'});
    });

    // Set button css and value
    if (toggleButton.classList.contains('button-dark')) {
        body.classList.value = 'body-light';
        toggleButton.classList.value = 'button-light';
        toggleButton.innerText = 'Light';
    } else {
        body.classList.value = 'body-dark';
        toggleButton.classList.value = 'button-dark';
        toggleButton.innerText = 'Dark';
    }
};
