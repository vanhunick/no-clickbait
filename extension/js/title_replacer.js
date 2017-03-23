// Module to query for a title and replace in the page
var titleReplacer = (()=>{

  // Cache DOM
  let $title = $('#eow-title');

  // Bind events


  // functions

  // Queries extention for title for current url replaces the title if it exists
  var findAndReplaceTitle = function () {
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

$( document ).ready(function() {
  titleReplacer.findAndReplaceTitle();
});
