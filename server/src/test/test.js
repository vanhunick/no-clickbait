var connect = "http//:localhost:3000";



var getURL = function () {
  return "TEST";
}

$( document ).ready(function() {
  $('#submit-button').on('click',function(){
    console.log("Clicking button");
    let paramaters = {
      url : getURL(),
      title : "A better title"
    }

    $.ajax({
      type : 'POST',
      url : connect + '/addtitle',
      data : paramaters,
      succes : ( e => console.log("Winner") ),
      error : ( e => console.log("Loser") )
    });
    console.log("Sending to server");
  });
});
