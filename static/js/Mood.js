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
      document.getElementById("song_image").setAttribute("src", anss[4]);
    },
  });
}
function music(mood) {
  if (
    document.getElementById("music").style.display == "" ||
    document.getElementById("music").style.display == "none"
  ) {
    console.log(city);
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

  var data_buddies = firebase.database().ref("Buddies").child(city);
  console.log(data_buddies);
  data_buddies.on("value", (snap) => {
    dictionary = snap.val();
    console.log(dictionary);
    document.getElementById("buddies").innerHTML = "";
    if (dictionary == null || Object.keys(dictionary).length <= 1) {
      //  console.log(Object.keys(dictionary).length);
      document.getElementById(
        "buddies"
      ).innerHTML = `<text class='bud_text' >No Buddies</text>`;
    } else {
      for (i = 0; i < Object.keys(dictionary).length; i++) {
        if (
          Object.keys(dictionary)[i] != "carno" &&
          getDistanceFromLatLonInKm(
            18.829491,
            73.258131,
            dictionary[Object.keys(dictionary)[i]]["lat"],
            dictionary[Object.keys(dictionary)[i]]["long"]
          ) < 60
        ) {
          document.getElementById("buddies").innerHTML +=
            `<div class='bud_cards'>
          <div class='bud_img'>
          <img src="/static/pics/bud.png">
          </div>
          <div class='bud_text'>
              <a>` +
            Object.keys(dictionary)[i] +
            `</a><br>
              <a>` +
            dictionary[Object.keys(dictionary)[i]]["phone"] +
            `</a>
              <br><br>
          </div>
        </div>`;
        }
      }
    }
  });
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
  var data_history = firebase.database().ref("History").child("WB012345");
  console.log(data_history);
  data_history.on("value", (snap) => {
    dictionary = snap.val();
    console.log(dictionary);
    document.getElementById("history").innerHTML = "";
    if (Object.keys(dictionary).length == 1) {
      document.getElementById(
        "history"
      ).innerHTML = `<text class='hist_text' >Not found</text>`;
    } else {
      console.log(Object.keys(dictionary).length);
      for (i = 0; i < Object.keys(dictionary).length; i++) {
        if (Object.keys(dictionary)[i] != "Place") {
          console.log(Object.keys(dictionary)[i].length);
          for (
            j = 0;
            j < Object.keys(dictionary[Object.keys(dictionary)[i]]).length;
            j++
          ) {
            console.log(i, j);
            document.getElementById("history").innerHTML +=
              `<div class='hist_cards'>
      <div class='hist_img'>
      <img src="/static/pics/bud.png">
      </div>
      <div class='hist_text'>
              <text>` +
              Object.keys(dictionary)[i] +
              `</text>
              <br>
              <text>` +
              Object.keys(dictionary[Object.keys(dictionary)[i]])[j] +
              `</text>
              <br>
              <text>` +
              dictionary[Object.keys(dictionary)[i]][
                Object.keys(dictionary[Object.keys(dictionary)[i]])[j]
              ]["Distance"] +
              `</text>
      </div>
    </div>`;
          }
        }
      }
    }
  });
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
  if (city != "") {
    var sov = prompt("Enter the new souvenir");

    if (sov != null) {
      console.log(sov);
      var database = firebase
        .database()
        .ref("Souvenir")
        .child(city)
        .child(sov)
        .set("");
    }
  } else window.alert("No city selected");
}
var city = "";
var souvenirs_list = [];
var souvenirs_list1 = [];
var flag = true;
$.ajax({
  url: "/get_location",
  type: "POST",
  data: {},
  success: function (ans) {
    console.log(ans);
    city = ans;
    firebase_();
  },
});

function firebase_() {
  console.log(city);
  var firebaseConfig = {
    apiKey: "AIzaSyAnbgtlUoEZtzhCrw0UxIlm9-h8dnHpSuo",
    authDomain: "good-trip-4e816.firebaseapp.com",
    databaseURL: "https://good-trip-4e816-default-rtdb.firebaseio.com/",
    projectId: "good-trip-4e816",
    storageBucket: "good-trip-4e816.appspot.com",
    messagingSenderId: "582498217447",
    appId: "1:582498217447:web:8df98a4346cad42107a142",
    measurementId: "G-RRRGR9FBN4",
  };
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database().ref("Souvenir");

  database.on("value", (snap) => {
    dict = snap.val();
    if (dict[city] == null) {
      if (city != "") scrape();
      else {
        const div = document.getElementById("souvenirs");
        div.innerHTML += ` <div class='souv_cards'><div class='souv_text'>
            <a>No destination entered
          </a>
        </div>
      </div>`;
      }
    } else if (flag) {
      var data_souvenir = database.child(city);
      data_souvenir.on("value", (snap1) => {
        dictionary = snap1.val();
        souvenirs_list = Object.keys(dictionary);
        console.log(souvenirs_list);
        flag = false;
        scrape();
      });
    }
  });
}

function scrape() {
  $.ajax({
    url: "/souvenir",
    type: "POST",
    success: function (souv) {
      souvenirs_list1 = souvenirs_list.concat(souv["a"]);
      console.log(souvenirs_list1);
      var k = document.getElementById("souvenirs");
      k.innerHTML = "";
      for (i = 0; i < souvenirs_list1.length; i++) {
        k.innerHTML +=
          ` <div class='souv_cards'>
                <div class='souv_text'>
                    <a>` +
          souvenirs_list1[i] +
          ` </a>
                </div>
            </div>`;
      }
      souvenirs_list1 = [];
      souvenirs_list = [];
    },
  });
}
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
