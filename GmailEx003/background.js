chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("listener got message: " + JSON.stringify(request.text));
    sendResponse({text: "response from background.js"});
    // check if popup is open already
    // open popup.html if not already open
    chrome.windows.getAll({populate:true},function(windows){
        var found = false;
        for(var i in windows){
            var win = windows[i];
            if(win.type == "popup" && win.tabs[0].url == chrome.runtime.getURL("popup.html")){
                found = true;
                break;
            }
        }
        if(!found) { // open popup
            chrome.windows.create({
                url: chrome.runtime.getURL("popup.html"),
                type: "popup",
                width: 400,
                height: 600
            });
        }
    });

});