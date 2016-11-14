/**
 * Created by kendratate on 10/25/16.
 */

var players = [{playerName: "", playerTee: 0}];
var numberofholesfront = 9;
var numberofholesback = 9;
var numberofholes = 18;
var closeCourses;
var activeCourse;
var playerIndex = 1;
var position;


$(document).ready(function(){
   getGeoLocation();
});

function removePlayer(theID){
    $("#player" + theID).remove();
}

function addPlayer() {
    // var i = playerIndex;
    resetForm($('#addPlayerContainer'));
    // for (var i = 0; i < activeCourse.course.tee_types.length; i++) {
    //     $("#teeBoxes").append("<li id='" + i + "'><a class='teelist' onclick='teePicked(" + i + ")' href='#' value='" + i + " '>" + activeCourse.course.tee_types[i].tee_type + "</li>");
    // }

    // make form visible
    $("#addPlayerContainer").show();

    // add an object of name and tee to the players array
    players.push({playerName: "", playerTee: ""});

    $("addPlayeContainer").hide();
}

function teePicked(id){
    $('#pickedTee').text(activeCourse.course.tee_types[id].tee_type);
    // change the player's tee in the player array every time it is changed
    players[playerIndex].playerTee = id;
}

function teeUp(){
    //copy of the global variable that is tracking current player index
    var i = playerIndex;
    var enteredName = $('#nameBox').val();
    var teeIndex = players[i].playerTee == ''? 0 : players[i].playerTee;

    // once the "tee up" button is pressed, include their name in the players array
    players[playerIndex].playerName = enteredName;

// FRONT 9 TABLE
//     $(".front tbody").append("<tr class='parRow player" + i + "Par'>" + "<td id='player" + i + "par'>Par</td>" + "</tr>");
//     //create row of pars
//     for (var h = 0; h < activeCourse.course.hole_count / 2; h++) {
//         $(".front tbody tr:last-child").append("<td>" + activeCourse.course.holes[h].tee_boxes[teeIndex].par+ "</td>");
//         totalfrontpar += activeCourse.course.holes[h].tee_boxes[teeIndex].par;
//     }
//     $(".front tbody tr:last-child").append("<td>" + totalfrontpar + "</td>");

    // add player scores row
    var borderColor = activeCourse.course.holes[0].tee_boxes[teeIndex].tee_hex_color;
    $(".front tbody").append("<tr class='scoreRow player" + i + "ScoreRow'><td style = 'border-left: 3pt single " + borderColor+ "' id='player" + i + "'>" + enteredName + "</span></td></tr>");
    for (var h = 0; h < activeCourse.course.hole_count / 2; h++) {
        $(".front tbody tr:last-child").append("<td><input  class='scoreboxes' type='number' min='1' id='player" + playerIndex + "hole" + h + "' onkeyup='calculateFrontScore(" + playerIndex + ")'></td>");
    }
    $(".front tbody tr:last-child").append("<td id='totalfront" + i + "'></td>");


// BACK 9 TABLE
//     $(".back tbody").append("<tr class='parRow player" + i + "Par'>" + "<td id='player" + i + "par'>Par</td>" + "</tr>");
//     //create row of pars
//     for (var h = (Math.floor(activeCourse.course.hole_count / 2)); h < activeCourse.course.hole_count; h++) {
//         $(".back tbody tr:last-child").append("<td>" + activeCourse.course.holes[h].tee_boxes[teeIndex].par + "</td>");
//         totalbackpar += activeCourse.course.holes[h].tee_boxes[teeIndex].par;
//     }
//     $(".back tbody tr:last-child").append("<td>" + totalbackpar + "</td>");

    // add player scores row
    var borderColor = activeCourse.course.holes[0].tee_boxes[teeIndex].tee_hex_color;
    $(".back tbody").append("<tr class='scoreRow player" + i + "ScoreRow'><td style = 'border-left: 3pt single " + borderColor+ "' id='player" + i + "'>" + enteredName + "</span></td></tr>");
    for (var h = (Math.floor(activeCourse.course.hole_count / 2)); h < activeCourse.course.hole_count; h++) {
        $(".back tbody tr:last-child").append("<td><input class='scoreboxes' type='number'  min='1' id='player" + playerIndex + "hole" + h + "' onkeyup='calculateBackScore(" + playerIndex + ")'></td>");
    }
    $(".back tbody tr:last-child").append("<td class='total' id='totalback" + i + "'></td>");
    $(".back tbody tr:last-child").append("<td class='grandtotal' id='totalscore" + i + "'</td>");


    // increment player index counter
    playerIndex++;
    $('#addPlayerContainer').hide();

}

function buildTable(){
    var totalfrontyards = 0;
    var totalbackyards = 0;
    var totalbackpar = 0;
    var totalfrontpar = 0;

    $("#getCourseContainer").hide();
    $(".container").show();
    // create header row of table from number of holes from selected course
    $(".front").append('<thead/>');
    $(".front thead").append(" <tr><th>Out</th></tr>");
    for (var h = 1; h <= activeCourse.course.hole_count / 2; h++) {
        $(".front thead tr").append("<th>" + h + "</th>");
    }
    $(".front thead tr").append("<th>Out Total</th>");

    $(".back").append('<thead/>');
    $(".back thead").append(" <tr><th>In</th></tr>");
    for (var h2 = (Math.floor(activeCourse.course.hole_count / 2)+1); h2 <= activeCourse.course.hole_count; h2++) {
        $(".back thead tr").append("<th>" + h2 + "</th>");
    }
    $(".back thead tr").append("<th>In Total</th>");
    $(".back thead tr").append("<th>Grand Total</th>");

    //create rows for tees pulled from selected course
    $(".front").append("<tbody/>");
    for (var t=0; t < activeCourse.course.holes[0].tee_boxes.length-1; t++) {
        $(".front tbody").append("<tr></tr>");
        var bgColor = activeCourse.course.holes[0].tee_boxes[t].tee_hex_color;
        var fontColor = getColorbyBgColor(bgColor);
        $(".front tbody tr:last-child").append("<td style = 'background-color: " + bgColor + "; color: " + fontColor + ";'>" + activeCourse.course.holes[0].tee_boxes[t].tee_type + "</td>");
        for (var h = 0; h < Math.floor(activeCourse.course.hole_count / 2); h++) {
            $(".front tbody tr:last-child").append("<td>" + activeCourse.course.holes[h].tee_boxes[t].yards + "</td>");
            totalfrontyards += activeCourse.course.holes[h].tee_boxes[t].yards;
        }

    $(".front tbody tr:last-child").append("<td class='total'>" + activeCourse.course.tee_types[t].front_nine_yards + "</td>");
    totalfrontyards = 0;
    }

    $(".front tbody").append("<tr class='parRow'>" + "<td>Par</td>" + "</tr>");
    //create row of pars
    for (var h = 0; h < Math.floor(activeCourse.course.hole_count / 2); h++) {
        $(".front tbody tr:last-child").append("<td>" + activeCourse.course.holes[h].tee_boxes[0].par+ "</td>");
        totalfrontpar += activeCourse.course.holes[h].tee_boxes[0].par;
    }
    $(".front tbody tr:last-child").append("<td class='total'>" + activeCourse.course.tee_types[0].front_nine_par + "</td>");


    $(".back").append("<tbody/>");
    for (var t=0; t < activeCourse.course.holes[0].tee_boxes.length-1; t++) {
        $(".back tbody").append("<tr></tr>");
        var bgColor = activeCourse.course.holes[0].tee_boxes[t].tee_hex_color;
        var fontColor = getColorbyBgColor(bgColor);
        $(".back tbody tr:last-child").append("<td style = 'background-color: " + bgColor + "; color: " + fontColor + ";'>" + activeCourse.course.holes[0].tee_boxes[t].tee_type + "</td>");
        for (var h = (Math.floor(activeCourse.course.hole_count / 2)); h < activeCourse.course.hole_count; h++) {
            $(".back tbody tr:last-child").append("<td>" +  activeCourse.course.holes[h].tee_boxes[t].yards + "</td>");
            totalbackyards += activeCourse.course.holes[h].tee_boxes[t].yards;
        }
    $(".back tbody tr:last-child").append("<td class='total'>" + activeCourse.course.tee_types[t].back_nine_yards  + "</td>");
    $(".back tbody tr:last-child").append("<td class='grandtotal'>" + activeCourse.course.tee_types[t].yards + "</td>");
    totalbackyards = 0;
    }

    $(".back tbody").append("<tr class='parRow'>" + "<td>Par</td>" + "</tr>");
    //create row of pars
    for (var h = (Math.floor(activeCourse.course.hole_count / 2)); h < activeCourse.course.hole_count; h++) {
        $(".back tbody tr:last-child").append("<td>" + activeCourse.course.holes[h].tee_boxes[0].par+ "</td>");
        totalbackpar += activeCourse.course.holes[h].tee_boxes[0].par;
    }
    $(".back tbody tr:last-child").append("<td class='total'>" + activeCourse.course.tee_types[0].back_nine_par + "</td>");
    $(".back tbody tr:last-child").append("<td class='grandtotal'>" + activeCourse.course.tee_types[0].par + "</td>");

    //fill tee box selector in add player dialog
    var i = playerIndex;
    resetForm($('#addPlayerContainer'));
    for (var i = 0; i < activeCourse.course.tee_types.length; i++) {
        $("#teeBoxes").append("<li id='" + i + "'><a class='teelist' onclick='teePicked(" + i + ")' href='#' value='" + i + " '>" + activeCourse.course.tee_types[i].tee_type + "</li>");
    }
    $("#addButtonContainer").show();
}




function selectCourse() {
    $.post("https://golf-courses-api.herokuapp.com/courses", position, function (data, status) {
        closeCourses = JSON.parse(data);
        $("#courseselect").append("<option disabled selected>Select a Golf Course</option>");
        for (var p in closeCourses.courses) {
            var selectInput = "<option value='" + closeCourses.courses[p].id + "'>" + closeCourses.courses[p].name + "</option>";
            $("#courseselect").append(selectInput);
        }

    });

}

function getCourse(courseID){
    $.get("https://golf-courses-api.herokuapp.com/courses/" + courseID, function(data,status) {
        activeCourse = JSON.parse(data);
    }).then(
        function(parseCourse){
            //check for undefined values from API
            var courseName = !activeCourse.course.name ? "" : activeCourse.course.name;
            var courseAddr = !activeCourse.course.addr_1  ? "" : activeCourse.course.addr_1 ;
            var courseCity = !activeCourse.course.city  ? "" : activeCourse.course.city ;
            var coursePhone = !activeCourse.course.phone ? "" : activeCourse.course.phone;
            var courseWebsite = !activeCourse.course.website ? "" : activeCourse.course.website;

            $(".container-fluid").html("<div class='courseInfo heading row'><div class='col-md-3'>" + courseName + "</div>");
            $(".container-fluid").append("<div class='col-md-3'>" + courseAddr + ", " + courseCity +  "</div>");
            $(".container-fluid").append("<div id='phone' class='col-md-3'><a href = '" + coursePhone + "'>" + coursePhone + "</a></div>");
            $(".container-fluid").append("<div id='website' class='col-md-3'><a href='" +courseWebsite+"'>"+ courseWebsite + "</a></div> </div>");
        }
    );
}


//called from onkeyup of input boxes <input
function calculateFrontScore(playerid){ // pass in the player id
    var thetotal = 0;
    for(i=0; i < numberofholesfront; i++){
        thetotal += Number($("#player"+playerid + "hole" + i).val());
    }
    $("#totalfront" + playerid).html(thetotal);
    $("#totalscore" + playerid).html($("#totalfront" + playerid).val() + $("#totalback" + playerid).val());
}

function calculateBackScore(playerid){ // pass in the player id
    var thetotal = 0;
    for(i=numberofholesfront; i < numberofholesback + numberofholesfront; i++){
        thetotal += Number($("#player"+playerid + "hole" + i).val());
    }
    $("#totalback" + playerid).html(thetotal);
    $("#totalscore" + playerid).html($("#totalfront" + playerid).val() + $("#totalback" + playerid).val());
}


function validateForm(){
    var success1 = true;
    var success2 = true;
    $('message').text("");

    if ($("input#nameBox").val().trim().length <= 0) {
        $('#message').text("** You must enter a name **");
        success1 = false;

        return false;
    };

    // check for duplicate name
    for (var i=0; i < players.length; i++) {
        if ($("input#nameBox").val().trim() === players[i].playerName) {
            $('#message').text("** Player name must be unique **");
            success2 = false;
        }
    };
    resetForm($('#addPlayerContainer'));
    return success1 && success2;

}

function resetForm($form){
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox')
        .removeAttr('checked').removeAttr('selected');
}

/** return black or white depending on background color passed in **/
function getColorbyBgColor(bgColor){
    if (!bgColor) { return '';}
    return(parseInt(bgColor.replace('#', ''),16) > 0xffffff / 2) ? '#000000' : '#ffffff';
}