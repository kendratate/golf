/**
 * Created by kendratate on 10/25/16.
 */

var players = [];
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
    var i = playerIndex;
    for(var i=0; i< activeCourse.course.tee_types.length; i++){
        $("#teeBoxes").append("<li value='" + i + " '>" + activeCourse.course.tee_types[i].tee_type + "</ul>");
    }

    // make form visible
    $("#addPlayerContainer").modal();
    var teeIndex = $("#teeBoxes li").value();
    var teeInfo= activeCourse.course.tee_types[0];

    var playerlabel = "<tr class='playerrow'><td id='player" + (i) + "'> Player " + (i+1) + " <span class='glyphicon glyphicon-minus-sign' onclick='removePlayer(" +i+ ")'></span></tr></td>";
    $(".front tbody").append("<tr style = 'player" + i + "parRow'></tr>");
    $(".front tbody tr.last-child").append(playerlabel);
    playerIndex++;

    //create row of pars
    $(".front tbody tr:last-child").append("<td>" + activeCourse.course.tee_types[teeIndex].par + "</td>");
    for (var h = 1; h <= activeCourse.course.hole_count / 2; h++) {
        $(".front tbody tr:last-child").append("<td>" + teeInfo.yards + "</td>");
    }

    var playerlabel = "<tr class='playerrow'><td id='player" + (i) + "'> Player " + (i+1) + " <span class='glyphicon glyphicon-minus-sign' onclick='removePlayer(" +i+ ")'></span></tr></td>";
    $(".back tbody").append("<tr style = 'player" + i + "parRow'></tr>");
    $(".back tbody tr.last-child").append(playerlabel);
    $(".back tbody tr:last-child").append("<td>" + activeCourse.course.tee_types[teeIndex].par + "</td>");
    for (var h = (Math.floor(activeCourse.course.hole_count / 2)+1); h <= activeCourse.course.hole_count; h++) {
        $(".back tbody tr:last-child").append("<td>" +  teeInfo.yards + "</td>");
    }

}

function buildTable(){
    $("#getCourseContainer").hide();
    // create header row of table from number of holes from selected course
    $(".front").append('<thead/>');
    $(".front thead").append(" <tr><th>Front 9</th></tr>");
    for (var h = 1; h <= activeCourse.course.hole_count / 2; h++) {
        $(".front thead tr").append("<th>" + h + "</th>");
    }
    $(".front thead tr").append("<th>Out</th>");

    $(".back").append('<thead/>');
    $(".back thead").append(" <tr><th>Back 9</th></tr>");
    for (var h2 = (Math.floor(activeCourse.course.hole_count / 2)+1); h2 <= activeCourse.course.hole_count; h2++) {
        $(".back thead tr").append("<th>" + h2 + "</th>");
    }
    $(".back thead tr").append("<th>In</th>");

    //create rows for tees pulled from selected course
    $(".front").append("<tbody/>");
    for (var t=0; t < activeCourse.course.holes[0].tee_boxes.length; t++) {
        $(".front tbody").append("<tr style = 'border-style:solid; border-color: " + activeCourse.course.holes[0].tee_boxes[t].tee_hex_color + "color:" + activeCourse.course.holes[0].tee_boxes[t].tee_hex_color + "'></tr>");
        $(".front tbody tr:last-child").append("<td>" + activeCourse.course.holes[0].tee_boxes[t].tee_type + "</td>");
        for (var h = 1; h <= activeCourse.course.hole_count / 2; h++) {
            $(".front tbody tr:last-child").append("<td>" + activeCourse.course.holes[h].tee_boxes[t].yards + "</td>");
        }
    }
    $(".back").append("<tbody/>");
    for (var t=0; t < activeCourse.course.holes[0].tee_boxes.length; t++) {
        $(".back tbody").append("<tr style = 'border-style:solid; border-color: " + activeCourse.course.holes[0].tee_boxes[t].tee_hex_color + "color:" + activeCourse.course.holes[0].tee_boxes[t].tee_hex_color + "'></tr>");
        $(".back tbody tr:last-child").append("<td>" + activeCourse.course.holes[0].tee_boxes[t].tee_type + "</td>");
        for (var h = (Math.floor(activeCourse.course.hole_count / 2)+1); h <= activeCourse.course.hole_count; h++) {
            $(".back tbody tr:last-child").append("<td>" +  activeCourse.course.holes[0].tee_boxes[t].yards + "</td>");
        }
    }
    $("#addButtonContainer").show();
}




function selectCourse() {
    $.post("http://golf-courses-api.herokuapp.com/courses", position, function (data, status) {
        closeCourses = JSON.parse(data);
        $("#courseselect").append("<option disabled selected>Select a Golf Course</option>");
        for (var p in closeCourses.courses) {
            var selectInput = "<option value='" + closeCourses.courses[p].id + "'>" + closeCourses.courses[p].name + "</option>";
            $("#courseselect").append(selectInput);
        }
    });

}

function getCourse(courseID){
    $.get("http://golf-courses-api.herokuapp.com/courses/" + courseID, function(data,status) {
        activeCourse = JSON.parse(data);
    }).then(
        function(parseCourse){
            //check for undefined values from API
            var courseName = !activeCourse.course.name ? "" : activeCourse.course.name;
            var courseAddr = !activeCourse.course.addr_1  ? "" : activeCourse.course.addr_1 ;
            var courseCity = !activeCourse.course.city  ? "" : activeCourse.course.city ;
            var coursePhone = !activeCourse.course.phone ? "" : activeCourse.course.phone;
            var courseWebsite = !activeCourse.course.website ? "" : activeCourse.course.website;

            $(".page-header").html("<h2>" + courseName + " <small>" + courseAddr + ", " + courseCity + "</small><div id='phone'>" + coursePhone + "</div><span><a href='" +courseWebsite+"'>"+ courseWebsite + "</a></span>");

        }
    );
}
//called from onkeyup of input boxes <input
function calculateScore(playerid){ // pass in the player id
    var thetotal = 0;
    for(i=1; i <= numberofholesfront; i++){
        thetotal += Number("#player"+playerid + "hole" + i).val();
    }
    $("#totalfront" + playerid).html(thetotal);
}

// function teeUp(){
//     // add trimmed, to upper player name to players array
//     //var someName = $("input#formName").val().trim().toUpperCase();
//     //players.push(someName);
//     buildEmptyTable("Front9");
//     $("#addPlayerContainer").fadeOut();
// }
function validateForm(){
    var success1, success2 = true;
    alert("in addPlayer");

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