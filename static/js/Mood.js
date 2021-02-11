function initMap() {
  var mapProp = {
    center: new google.maps.LatLng(22.591797597003268, 88.33830293795195),
    zoom: 15,
  };
  var map = new google.maps.Map(document.getElementById("map"), mapProp);
}
var mood1 = "";
function getMood() {
  return mood1;
}
function play_song(mood) {
  mood1 = mood;
  $.ajax({
    url: "/song",
    type: "POST",
    data: {
      mood: mood,
    },
    success: function (ans) {
      console.log(ans);
      var anss = ans.split("^");
      console.log(anss[1]);
      if (anss[2] == "True") anss[2] = "(Explicit)";
      else anss[2] = "";
      document.getElementById("song_name").innerHTML = anss[0] + anss[2];
      document.getElementById("song_artist").innerHTML = anss[3];
      document.getElementById("music_url").setAttribute("src", anss[1]);
      document.getElementById("music_url").load();
      document.getElementById("music_url").play();
    },
  });
}
function music(mood) {
  if (
    document.getElementById("music").style.display == "" ||
    document.getElementById("music").style.display == "none"
  ) {
    document.getElementById("music").style.display = "inline-block";
    document.getElementById("moods").style.display = "none";
    document.getElementById("services").style.display = "none";
    document.getElementById("buddies").style.display = "none";
    document.getElementById("history").style.display = "none";
    document.getElementById("servicesin").style.display = "none";
    document.getElementById("plus").style.display = "none";
    document.getElementById("souvenirs").style.display = "none";
    if (mood != "NA") play_song(mood);
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
