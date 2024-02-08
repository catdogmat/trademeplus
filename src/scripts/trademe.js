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


// Injecting scripts
fetch(chrome.runtime.getURL('features/manifest.json'))
.then(response => response.json())
.then(data => {
    var scripts = [];

    for (let i = 0; i < data.features.length; i++) {
        for (let u = 0; u < data.features[i].files.length; u++) {
            scripts.push("features/" + data.features[i].files[u]);
        }
    }

    (async () => {
        const response = await chrome.runtime.sendMessage({command: "internals.injecting.injectScripts", args: {scripts: scripts}});
    })();
});


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
