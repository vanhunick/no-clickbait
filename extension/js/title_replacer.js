$( document ).ready(function() {
  // Module to query for a title and replace in the page
  var titleReplacer = (()=>{

    // Cache DOM
    let $title = $('#eow-title');

    // functions

    // Queries extention for title for current url replaces the title if it exists
    let findAndReplaceTitle = function () {
      // Send message to extention asking for the title
      chrome.runtime.sendMessage({url : window.location.href}, function(response) {
        replaceTitle(response.title);
      });
    }

    // Replaces the title on the page
    let replaceTitle = function (newTitle) {
      if(newTitle !== ""){
          $title.html(newTitle);
      }
    }
    return { findAndReplaceTitle : findAndReplaceTitle}
  })();

  titleReplacer.findAndReplaceTitle();
});
