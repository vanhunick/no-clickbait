var background = (()=> {

  // Binding
  chrome.tabs.onUpdated.addListener(tabUpdated);
  chrome.runtime.onMessage.addListener(pageLoaded);

  // functions

  // Called when user changes tabs checks if the extention should be activated
  function tabUpdated(id, info, tab) {
    if (tab.url.toLowerCase().indexOf("youtube.com") > -1) {
      chrome.pageAction.show(tab.id);
    }
  }

  // Called when a page is loaded checks if the title should be replaced
  function pageLoaded(request, sender, sendResponse) {


      if(request.urls !== null){
        console.log("Multiple");
        let paramaters = {urls : request.urls};

        db.findAllTitles(paramaters, (titles) => {
          if(titles.length > 0){
            sendResponse({titles: titles}); // Return the corrosponding title to the page
          }
        });
      } else {
        console.log("Single");
        let paramaters = {url : request.url};
        db.findTitle(paramaters, (title) => {
          if(title !== ""){
            sendResponse({title: title}); // Return the corrosponding title to the page
          }
        });
      }
      return true;
  }
})();
