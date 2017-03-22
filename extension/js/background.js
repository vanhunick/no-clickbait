// listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(function(id, info, tab) {
  if (tab.url.toLowerCase().indexOf("youtube.com") > -1) {
    chrome.pageAction.show(tab.id);
  }
});

var connect = "http://localhost:3000";

// Listens to a request from a page to find a title given a url
chrome.runtime.onMessage.addListener((request, sender ,sendResponse) =>{
    let paramaters = {
      url : request.url,
    }

    $.get(connect + '/gettitle', paramaters, (d,s) => {
      if(d.title !== ""){
        sendResponse({title: d.title}); // Return the corrosponding title to the page
      }
    });
    return true; // Returning true is to make it syncronous
});
