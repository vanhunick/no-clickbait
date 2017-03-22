$( document ).ready(function() {
  findAndReplaceTitle();
});

// Queries extention for title for current url replaces the title if it exists
var findAndReplaceTitle = function () {
  // Send message to extention asking for the title
  chrome.runtime.sendMessage({url : window.location.href}, function(response) {
    replaceTitle(response.title);
  });
}

let replaceTitle = function (newTitle) {
  if(newTitle !== ""){
      $("#eow-title").html(newTitle);
  }
}
