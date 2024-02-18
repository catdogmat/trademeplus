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
                sendResponse({"success": true});
                break;
            // case "settings.get":
            //     // Get the settings from the storage
            //     chrome.storage.sync.get(request.settingID, function(result) {
            //         sendResponse({"success": true, "type": result.type, "value": result.value});
            //     });
            //     break;
            // case "settings.set":
            //     // Set the settings in the storage
            //     chrome.storage.sync.set({'id': request.settingId, 'type': request.settingType, 'value': request.settingValue}, function() {
            //         sendResponse({"success": true});
            //     });
            //     break;
            default:
                // If the command is not recognised, log it
                console.log("Command not recognised: " + request.command);
                sendResponse({"success": false, "error": "Command not recognised"});
                break;

      }
    }
);  