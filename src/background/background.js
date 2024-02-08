/*
    * background.js
    * Background script for the TradeMe+ extension
    * Author: Finn (catdogmat) and others
    * License: MIT
    * Thanks for using/contributing to our extension!
*/

// Listen for messages
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      // Check commands
      switch (request.command) {
        case "internals.injecting.injectScripts":
            // Inject the scripts if the command is correct
            chrome.scripting.executeScript({
                target: {tabId: sender.tab.id},
                files: request.args.scripts,
            })
          break;
      }
    }
);  