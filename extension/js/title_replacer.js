$( document ).ready(function() {
  // Module to query for a title and replace in the page
  var titleReplacer = (()=>{

    // Cache DOM
    let $title = $('#eow-title');
    let $links = $('.yt-lockup-title a[href*="/watch?"]');



    // functions

    // Queries extention for title for current url replaces the title if it exists
    let findAndReplaceTitle = function () {
      // Send message to extention asking for the title
      chrome.runtime.sendMessage({url : window.location.href}, function(response) {
        replaceTitle(response.title);
      });
    }

    let findAndReplaceAllTitles = function () {
      let links = [];

      $links.each((i,e) => {links.push(($(e).attr('href')))});
      chrome.runtime.sendMessage({urls : links}, function(response) {
        replaceAllTitles(response.titles);
      });
    }

    // Replaces the title on the page
    let replaceTitle = function (newTitle) {
      if(newTitle !== ""){
          $title.append("<h3 style='color:green'>"+newTitle+"</h3>");
      }
    }
    return { findAndReplaceTitle : findAndReplaceTitle,findAndReplaceAllTitles : findAndReplaceAllTitles }
  })();

  let replaceAllTitles = function(alltitles) {
    alltitles.forEach( t => {
        $('.yt-lockup-title a[href^="'+t.url+'"]').closest('h3').append('<h3>'+t.title+'</h3>');
    });
  }

  // Check if the page is a video page
  if(window.location.href.indexOf('/watch') !==-1){
      console.log("Replacing single title");
      titleReplacer.findAndReplaceTitle();
  } else {
      console.log("Replacing all titles");
      titleReplacer.findAndReplaceAllTitles();
  }
});
