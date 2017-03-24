$( document ).ready(function() {

  // Listener for submit button
  // $('#submit-button').on('click',function(){
  //   chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
  //     // Check if tab exists for some reason sometimes it does not
  //     if(tabs.length > 0){
  //       let paramaters = {
  //         url : tabs[0].url,
  //         title : $('#title-input').val()
  //       }
  //       console.log(paramaters)
  //
  //       $.post(connect + '/addtitle',paramaters).done((d) => {
  //             if(d.succes){
  //               $('#error').html("<span style='color : green';>Inserted title</span>");
  //               console.log("Inserted")
  //             } else {
  //               $('#error').html("<span style='color : red';>Failed to insert title</span>")
  //                 console.log("Not inserted");
  //             }
  //       });
  //     } else {
  //       $('#error').html("<span style='color : red';>Can't find active tab</span>")
  //     }
  //   });
  // });


  var popupModule = (()=> {

    // Chache dom
    let $subBut = $('#submit-button');
    let $titleInput = $('#title-input');
    let $error = $('#error');

    // Binding
    $subBut.on('click', submitTitle);

    function submitTitle(){
      console.log("Submiting title")

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

});
