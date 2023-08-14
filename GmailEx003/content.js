chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "getSelectedText") {
        var selectedText = window.getSelection().toString().trim();
        sendResponse({ text: selectedText });
    }
});


document.addEventListener('mouseup', function() {
   // get selected text and send to background.js
    var selectedText = window.getSelection().toString().trim();
    console.log('selectedText: ' + selectedText);
    if(selectedText.length > 0) {
        // send message to background.js asynchonously
        chrome.runtime.sendMessage({text: selectedText}, function(response) {
            console.log('response: ' + JSON.stringify(response));
        });
        
    }
});

       

