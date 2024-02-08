chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      switch (request.command) {
        case "internals.injecting.injectScripts":
            chrome.scripting.executeScript({
                target: {tabId: sender.tab.id},
                files: request.args.scripts,
            })
          break;
      }
    }
);  