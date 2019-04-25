/**
 * Created by kendratate on 11/1/16.
 */
// var position;
function getGeoLocation(){
    return new Promise(function (resolve, reject){
        var options = {
            enableHighAccuracy: true,
            timeout: 5000
        };
        function success(pos) {
            position = pos.coords;

            //$("#position").text("Latitude: " + position.latitude + " Longitude: " + position.longitude);
            //var weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.latitude + '&lon=' + position.longitude + '&APPID=c7673cd4d9a958d58aa6f19d68718ea0'
            //$.getJSON(weatherURL,jsonSuccess);

            selectCourse();

            resolve(position);
        }

        function error(error){
            console.warn('ERROR(' + error.code + '): ' + error.message);
            reject(error);
        }

        function jsonSuccess(data){
            $("#weather").text(data.weather[0].description);
            $("#icon").text(data.weather[0].icon);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    })
}



function getMap(pos){
    var teeLat = 40.428;
    var teeLong = -111.90;

    var map = new google.maps.Map($("#map"),{
        zoom: 0,
        center: pos,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    var teemarker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: "images/teeImage"
    });

    var teeOffInfoWindow = new google.maps.InfoWindow({
        content:`
        <div>
            <h2>Hole 18</h2>
            <h3>Yards: 337</h3>
        `
    });

    teemarker.addListener('click', function(){
        teeOffInfowindow.open(map, teemarker);
    });

    var teemarker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: "images/teeImage"
});
}

// google two markers zoom google maps
