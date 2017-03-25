var popupModule = (()=> {

    // Chache dom
    let $subBut = $('#submit-button');
    let $titleInput = $('#title-input');
    let $error = $('#error');

    // Binding
    $subBut.on('click', submitTitle);

    function submitTitle(){
      // Find the last active tab
      chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
        if(!tabs.length > 0)return;

        let paramaters = {
          url : tabs[0].url,
          title : $titleInput.val()
        }
        db.insertTitle(paramaters, (succes) => $error.html("<span style='color :"+ (succes ? "green" : "red" )+"';>"+ (succes ? "Inserted title" : "Failed to insert")+"</span>"));
      });
    }
})();
