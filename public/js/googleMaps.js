
// set map options
var myLatLng = { lat: 40.416729, lng: -3.703339};
var mapOptions = { 
    center: myLatLng,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};




//create Map 

var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions)

var map = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoicDM3M3I2NzYiLCJhIjoiY2wwamFiMDh5MGFldTNscDZ1NHZwdHYweiJ9.k452tka8BWFplowQg1qGiQ'
// }).addTo(map);

