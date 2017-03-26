var popupModule = (()=> {

    // Chache dom
    let $subBut = $('#submit-button');
    let $titleInput = $('#title-input');
    let $error = $('#error');

    // Binding
    $subBut.on('click', submitTitle);

    // Called when the user clicks the submit title button
    function submitTitle(){
      // Find the last active tab
      chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
        if(!tabs.length > 0)return; // Problem finding last tab

        // Grab the url from the tab and the value from the input field
        let paramaters = {
          url : tabs[0].url,
          title : $titleInput.val()
        }

        // User the DB module to insert the title, notfify user of success or failure by insering header
        db.insertTitle(paramaters, (succes) => $error.html("<span style='color :"+ (succes ? "green" : "red" )+"';>"+ (succes ? "Inserted title" : "Failed to insert")+"</span>"));
      });
    }
})();
