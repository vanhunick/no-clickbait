// Database module to set and find titles for urls
var db = (()=> {
  let connectionURL = "http://localhost:3000";

  // Return a string for the title if it exists for a url empty string if it does not
  let findTitle = (paramaters, callback) => {
    $.get(connectionURL + '/getTitle', paramaters, (d,s) => {
      callback(d.title);
    });
  }

  // Returns all titles that match URLS in paramaters
  let findAllTitles = (paramaters, callback) => {
    $.get(connectionURL + '/getAllTitles', paramaters, (d,s) => {
      callback(d.titles);
    });
  }

  // Inserts a title for a url
  let insertTitle = (paramaters, callback) => {
    $.post(connectionURL + '/addTitle',paramaters).done((d) => {
      callback(d.succes);
    });
  }

  return {
    findTitle : findTitle,
    findAllTitles : findAllTitles,
    insertTitle : insertTitle
  };
})();
