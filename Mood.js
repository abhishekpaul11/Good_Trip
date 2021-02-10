function initMap() {
  var mapProp = {
    center: new google.maps.LatLng(22.072, 88.0523),
    zoom: 5,
  };
  var map = new google.maps.Map(document.getElementById("map"), mapProp);
}
