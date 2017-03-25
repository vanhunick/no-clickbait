// Database module to set and find titles dor url
var db = (()=> {
  let connect = "http://localhost:3000";

  // Return a string for the title if it exists for a url empty string if it does not
  let findTitle = (paramaters, callback) => {
    $.get(connect + '/gettitle', paramaters, (d,s) => {
      callback(d.title);
    });
  }

  // Returns all titles that match URLS in paramaters
  let findAllTitles = (paramaters, callback) => {
    $.get(connect + '/getAllTitles', paramaters, (d,s) => {
      callback(d.titles);
    });
  }

  // Inserts a title for a url
  let insertTitle = (paramaters, callback) => {
    $.post(connect + '/addtitle',paramaters).done((d) => {
      callback(d.succes);
    });
  }

  return {
    findTitle : findTitle,
    findAllTitles : findAllTitles,
    insertTitle : insertTitle
  };
})();
