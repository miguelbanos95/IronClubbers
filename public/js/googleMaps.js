
// set map options
var myLatLng = { lat: 40.416729, lng: -3.703339};
var mapOptions = { 
    center: myLatLng,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};




//create Map 

var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions)