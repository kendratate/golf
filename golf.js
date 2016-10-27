/**
 * Created by kendratate on 10/25/16.
 */
var players = [];

function addPlayer() {
    // make form visible
    $("#addPlayerContainer").css("visibility", "visible");
}
function teeUp(){

    // add trimmed, to upper player name to players array
    var someName = $("input#formName").val().trim().toUpperCase();
    players.push(someName);
}

function validateForm(){
    var success1, success2 = true;
    alert("in addPlayer");



        // check for blank name field
        alert("in do");

        if ($("input#formName").val().trim().length <= 0) {
            $('#message').text("You must enter a name");
            alert("success1 is false");

        };

        // check for duplicate name
        for (var i=0; i < players.length; i++) {
            if (name.trim().toUpperCase() === players[i]) {
                $('#message').text("Player name must be unique");
                success2 = false;
                alert("success2 is false");

            }
         };



}
