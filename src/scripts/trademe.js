/*
    * Trademe.js
    * Content script for the TradeMe+ extension
    * Author: Finn (catdogmat) and others
    * License: MIT
    * Thanks for using/contributing to our extension!
*/
console.log(
    "%c _______            _        __  __              \n" +
    "|__   __|          | |      |  \\/  |         _   \n" +
    "   | |_ __ __ _  __| | ___  | \\  / | ___   _| |_ \n" +
    "   | | '__/ _` |/ _` |/ _ \\ | |\\/| |/ _ \\ |_   _|\n" +
    "   | | | | (_| | (_| |  __/ | |  | |  __/   |_|  \n" +
    "   |_|_|  \\__,_|\\__,_|\\___| |_|  |_|\\___|        \n" +
    "                                                 \n" +
    "            W e ' r e   s e c o n d .            ",
    "font-family: monospace; font-weight: bold;"
)


// Fetch the manifest.json file and inject all the scripts
fetch(chrome.runtime.getURL('features/manifest.json'))
.then(response => response.json())
.then(data => {
    // Get all the scripts
    var scripts = [];

    // Create an array of promises for storage operations
    var storagePromises = [];

    // Loop through the features and add the files to the scripts array
    for (let i = 0; i < data.features.length; i++) {
        for (let u = 0; u < data.features[i].files.length; u++) {
            // Add the file to the scripts array
            storagePromises.push(
                chrome.storage.sync.get([data.features[i].id + ".enabled"]).then((result) => {
                    if (result[data.features[i].id + ".enabled"] != undefined) {
                        if (result[data.features[i].id + ".enabled"]) {
                            scripts.push("features/" + data.features[i].files[u]);
                        }
                    }
                    console.log(result);
                })
            );
        }
    }

    // Wait for all storage operations to complete
    return Promise.all(storagePromises)
    .then(() => {
        console.log("Injecting " + scripts.length.toString() + " scripts...");

        // Send a message to the background script to inject the scripts
        return chrome.runtime.sendMessage({ command: "internals.injecting.injectScripts", args: { scripts: scripts }});
    })
    .then(() => {
        console.log("Injected scripts!");
    })
    .catch(error => {
        console.error("Error:", error);
    });
});



// TODO: I really need to add theme support, but first settings and stuff.
// TODO: This should work but I have a few extra things to do first
// TODO: before adding this. Most importantly, I need to redo the
// TODO: CSS injection system to work with the stuid way chrome
// TODO: wants me to do it. I hate some of the things chrome
// TODO: does. I also need to make a simple no-code way to
// TODO: make themes. I'm thinking of making a simple
// TODO: website that lets you select elements and
// TODO: change their styles and then it will
// TODO: generate a CSS file and make a PR.
// TODO: This is a very long TODO list.

// // Injecting CSS
// fetch(chrome.runtime.getURL('themes/manifest.json'))
// .then(response => response.json())
// .then(data => {
//     var themes = [];

//     for (let i = 0; i < data.themes.length; i++) {
//         for (let u = 0; u < data.themes[i].files.length; u++) {
//             themes.push("themes/" + data.themes[i].files[u]);
//         }
//     }

//     (async () => {
//         const response = await chrome.runtime.sendMessage({command: "internals.injecting.getTabID", args: {}});
        
//         for (let i = 0; i < themes.length; i++) {
//             fetch(chrome.runtime.getURL(themes[i]))
//             .then(response => response.text())
//             .then(data => {
//                 chrome.scripting.insertCSS({
//                     target: {tabId: response.data.tabID},
//                     css: data,
//                 })
//                 .then(() => console.log("Injected CSS!"));
//             });
//         }
//     })();
// });
