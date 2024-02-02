setTimeout(() => {
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
}, 900);

    // Example: Fetching data from the same domain (trademe.co.nz)
fetch('https://www.trademe.co.nz/')
.then(response => response.text())
.then(data => {
    // Process the data
    console.log("-----------------------------------DATA------------------------------");
    console.log(data);
})
.catch(error => {
    console.error(error);
});

  