chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // Make extension available only for the web whatsapp domain
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {hostEquals: 'web.whatsapp.com'},
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);

        // Call the toggle function on page load
        chrome.webNavigation.onCompleted.addListener(function(details) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.executeScript(tabs[0].id, {file: 'js/toggle.js'});
            });
        },
        {
            url: [{hostEquals: 'web.whatsapp.com'}],
        });
    });
});
