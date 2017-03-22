var connect = "http://localhost:3000";


$( document ).ready(function() {

  // Listener for submit button
  $('#submit-button').on('click',function(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    console.log(url);
    });

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      console.log(tabs)
      let paramaters = {
        url : tabs[0].url,
        title : $('#title-input').val()
      }
      console.log(paramaters)

      $.ajax({
        type : 'POST',
        url : connect + '/addtitle',
        data : paramaters,
        succes : ( e => console.log("Winner") ),
        error : ( e => console.log("Loser") )
      });
    });
  });
});
