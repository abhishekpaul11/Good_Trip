function initMap() {
  var mapProp = {
    center: new google.maps.LatLng(22.591797597003268, 88.33830293795195),
    zoom: 15,
  };
  var map = new google.maps.Map(document.getElementById("map"), mapProp);
}

function add() {
  var sov = prompt("Enter the new souvenir");
  if (sov != null) {
    console.log(sov);
  }
  const div = document.getElementById("list");
  div.innerHTML +=
    ` <div class='cards'><div class='bud_text'>
      <a>` +
    sov +
    `</a>
  </div>
</div>`;
}
