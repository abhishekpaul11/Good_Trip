function initMap() {
  var mapProp = {
    center: new google.maps.LatLng(22.591797597003268, 88.33830293795195),
    zoom: 15,
  };
  var map = new google.maps.Map(document.getElementById("map"), mapProp);
}
function music() {
  if (
    document.getElementById("music").style.display == "" ||
    document.getElementById("music").style.display == "none"
  ) {
    document.getElementById("plus").style.display = "none";
    document.getElementById("souvenirs").style.display = "none";
    document.getElementById("music").style.display = "inline-block";
    document.getElementById("moods").style.display = "none";
    document.getElementById("services").style.display = "none";
    document.getElementById("buddies").style.display = "none";
    document.getElementById("history").style.display = "none";
    document.getElementById("servicesin").style.display = "none";
  } else {
    document.getElementById("music").style.display = "none";
    document.getElementById("moods").style.display = "inline-block";
  }
}
function services() {
  if (
    document.getElementById("services").style.display == "" ||
    document.getElementById("services").style.display == "none"
  ) {
    document.getElementById("plus").style.display = "none";
    document.getElementById("souvenirs").style.display = "none";
    document.getElementById("services").style.display = "inline-block";
    document.getElementById("moods").style.display = "none";
    document.getElementById("music").style.display = "none";
    document.getElementById("buddies").style.display = "none";
    document.getElementById("history").style.display = "none";
    document.getElementById("servicesin").style.display = "none";
  }
}

function buddies() {
  console.log("fkjf");
  if (
    document.getElementById("buddies").style.display == "" ||
    document.getElementById("buddies").style.display == "none"
  ) {
    document.getElementById("plus").style.display = "none";
    document.getElementById("souvenirs").style.display = "none";
    document.getElementById("buddies").style.display = "block";
    document.getElementById("services").style.display = "none ";
    document.getElementById("moods").style.display = "none";
    document.getElementById("music").style.display = "none";
    document.getElementById("history").style.display = "none";
    document.getElementById("servicesin").style.display = "none";
  }
}
function souvenirs() {
  if (
    document.getElementById("souvenirs").style.display == "" ||
    document.getElementById("souvenirs").style.display == "none"
  ) {
    document.getElementById("plus").style.display = "block";
    document.getElementById("souvenirs").style.display = "block";
    document.getElementById("buddies").style.display = "none";
    document.getElementById("services").style.display = "none ";
    document.getElementById("moods").style.display = "none";
    document.getElementById("music").style.display = "none";
    document.getElementById("history").style.display = "none";
    document.getElementById("servicesin").style.display = "none";
  }
}
function hist() {
  if (
    document.getElementById("history").style.display == "" ||
    document.getElementById("history").style.display == "none"
  ) {
    document.getElementById("history").style.display = "block";
    document.getElementById("plus").style.display = "none";
    document.getElementById("souvenirs").style.display = "none";
    document.getElementById("buddies").style.display = "none";
    document.getElementById("services").style.display = "none ";
    document.getElementById("moods").style.display = "none";
    document.getElementById("music").style.display = "none";
    document.getElementById("servicesin").style.display = "none";
  }
}
function servicesin() {
  if (
    document.getElementById("servicesin").style.display == "" ||
    document.getElementById("servicesin").style.display == "none"
  ) {
    document.getElementById("servicesin").style.display = "block";
    document.getElementById("history").style.display = "none";
    document.getElementById("plus").style.display = "none";
    document.getElementById("souvenirs").style.display = "none";
    document.getElementById("buddies").style.display = "none";
    document.getElementById("services").style.display = "none ";
    document.getElementById("moods").style.display = "none";
    document.getElementById("music").style.display = "none";
  }
}
function add() {
  var sov = prompt("Enter the new souvenir");
  if (sov != null) {
    console.log(sov);
  }
  const div = document.getElementById("souvenirs");
  div.innerHTML +=
    ` <div class='souv_cards'><div class='souv_text'>
      <a>` +
    sov +
    `</a>
  </div>
</div>`;
}
