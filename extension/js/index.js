var connect = "http://localhost:3000";

$( document ).ready(function() {

  // Listener for submit button
  $('#submit-button').on('click',function(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    console.log(url);
    });

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
      // Check if tab exists for some reason sometimes it does not
      if(tabs.length > 0){
        let paramaters = {
          url : tabs[0].url,
          title : $('#title-input').val()
        }
        console.log(paramaters)

        $.post(connect + '/addtitle',paramaters).done((d) => {
              if(d.succes){
                $('#error').html("<span style='color : green';>Inserted title</span>");
                console.log("Inserted")
              } else {
                $('#error').html("<span style='color : red';>Failed to insert title</span>")
                  console.log("Not inserted");
              }
        });
      } else {
        $('#error').html("<span style='color : red';>Can't find active tab</span>")
      }
    });
  });
});
