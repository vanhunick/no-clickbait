// Run in the background of web pages relevant to the extention
// Responds to tab changes and when a relavent pages is loaded takes in the urls on that page
var background = (()=> {

  // Binding
  chrome.tabs.onUpdated.addListener(tabUpdated);
  chrome.runtime.onMessage.addListener(pageLoaded);

  // Called when user changes tabs checks if the extention should be activated
  function tabUpdated(id, info, tab) {
    if (tab.url.toLowerCase().indexOf("youtube.com") > -1) { // Any page with youtube.com at the start is valid for the extention
      chrome.pageAction.show(tab.id);
    }
  }

  // Called when a page is loaded and sends links on the page to database to find if titles exist for each url
  function pageLoaded(request, sender, sendResponse) {
      if(request.urls !== undefined){ // if true means multiple urls exist on the page

        let paramaters = {urls : request.urls};
        db.findAllTitles(paramaters, (titles) => {
          if(titles.length > 0){
            sendResponse({titles: titles}); // Return the corrosponding title to the page (title_replacer.js)
          }
        });
      } else { // Only one title on the page so a video page
        let paramaters = {url : request.url};
        db.findTitle(paramaters, (title) => {
          if(title !== ""){ // Check if title exists
            sendResponse({title: title}); // Return the corrosponding title to the page
          }
        });
      }
      return true; // Important, makes the message syncronous
  }
})();
