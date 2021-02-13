function initMap() {
  var mapProp = {
    center: new google.maps.LatLng(18.829491, 73.258131),
    zoom: 8,
  };
  map = new google.maps.Map(document.getElementById("map"), mapProp);
  (l = 18.829491), (i = 73.258131);
  map.setCenter(new google.maps.LatLng(l, i));
  marker = new google.maps.Marker({
    position: { lat: l, lng: i },

    icon: {
      url: "static/pics/car.svg", // url
      scaledSize: new google.maps.Size(40, 40),
    },
    map: map,
  });

  var infowindow = new google.maps.InfoWindow({
    content: "My Location",
  });
  google.maps.event.addListener(marker, "click", function () {
    infowindow.open(map, marker);
  });
}
var markers_buddies = [];
var markers_servicesin = [];
var marker = "";
var map = "";
var mood1 = "";
var services_list = {
  HOSPITALS: [
    {
      Name: "Jakhotia Nursing Home",
      Address:
        "General hospital · Mahaveer Garden, Nh 48, Shastrinagar, Sri Swami Samarth Nagar",
      Phone: "02192 265 675",
      Lat: 18.79748979731988,
      Long: 73.34095521999281,
    },

    {
      Name: "Trinity Healthcare",
      Address: "MG Rd, Hudco Colony, Lonavla, Maharashtra 410401",
      Phone: "02192 265 675",
      Lat: 18.77756847326304,
      Long: 73.40139565994387,
    },
  ],

  "POLICE STATION": [
    {
      Name: "Rasayani Police Station",
      Address: "Police department",
      Phone: "02192 250 133",
      Lat: 18.885690856203592,
      Long: 73.17340851297688,
    },

    {
      Name: "Khalapur Police Station",
      Address: "Khalapur, Maharashtra 410202",
      Phone: "02192 250 133",
      Lat: 18.837936524600135,
      Long: 73.28456456127245,
    },
  ],

  HOTELS: [
    {
      Name: "Hotel Marathi",
      Address: "Savroli - Kharpada Rd, Kharsundi, Maharashtra 410203",
      Lat: "18.824689011233865",
      Long: "73.25316409551579",
      Phone: "9831323596",
    },

    {
      Name: "Friends Chinese",
      Address:
        "Tal, maval, Dist-, Mumbai - Pune Hwy, Kamshet, Maharashtra 410405",
      Lat: 18.829075893978203,
      Long: 73.2627771318535,
      Phone: "1234566677",
    },
  ],

  "CAR REPAIR": [
    {
      Name: "Puncture Man Sanpada",
      Address:
        "Hotel Highway View, Mumbai Pune Road, Sanpada, Navi Mumbai, Sector 24, Turbhe, Mumbai, Maharashtra 400705",
      Long: 73.26276569903425,
      Lat: 18.828687937186427,
      Phone: "12345678",
    },

    {
      Name: "First Tunnel",
      Address: "Mumbai - Pune Expy, Ambivali T. Tungartan, Maharashtra 410220",
      Lat: 18.845422069092272,
      Long: 73.23718815592143,
      Phone: "123456789",
    },
  ],

  PHARMACY: [
    {
      Name: "Bhangale Medical Stores",
      Address:
        "Takai - Khopoli at, Takai - Adoshi Road, Takai, Khopoli, Maharashtra 410203",
      Phone: "02192 265 675",
      Lat: 18.80349991336459,
      Long: 73.29726921941086,
    },

    {
      Name: "VSI",
      Address: "151, 152, PALI ROAD, Umbare, Maharashtra",
      Phone: "02192 265 675",
      Lat: 18.839246054915783,
      Long: 73.28559624655573,
    },
  ],

  FUEL: [
    {
      Name: "Bharat Petroleum, Petrol Pump -Hemkunt Automobiles",
      Address: "KALOTE (NH 4), RAIGAD, Maharashtra 410203",
      Phone: "02192 265 675",
      Lat: 18.857192690909617,
      Long: 73.27564537509866,
    },

    {
      Name: "Essar Petrol Pump(Suvarnareshma)",
      Address: "Pen - Khopoli Rd, Tambati, Maharashtra 410203",
      Phone: "02192 265 675",
      Lat: 18.808264388034978,
      Long: 73.26570176746961,
    },
  ],
};

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
      var anss = ans.split("^");

      if (anss[2] == "True") anss[2] = "(Explicit)";
      else anss[2] = "";
      document.getElementById("song_name").innerHTML = anss[0] + anss[2];
      document.getElementById("song_artist").innerHTML = anss[3];
      document.getElementById("music_url").setAttribute("src", anss[1]);
      document.getElementById("music_url").load();
      document.getElementById("music_url").play();
      document.getElementById("song_image").setAttribute("src", anss[4]);
      document
        .getElementById("music_url")
        .addEventListener("ended", function () {
          play_song(getMood());
        });
    },
  });
}
function music(mood) {
  clearMap();
  if (
    document.getElementById("music").style.display == "" ||
    document.getElementById("music").style.display == "none"
  ) {
    document.getElementById("music").style.display = "inline-block";
    document.getElementById("moods").style.display = "none";
    document.getElementById("services").style.display = "none";
    document.getElementById("buddy").style.display = "none";
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
  clearMap();
  if (
    document.getElementById("services").style.display == "" ||
    document.getElementById("services").style.display == "none"
  ) {
    document.getElementById("plus").style.display = "none";
    document.getElementById("souvenirs").style.display = "none";
    document.getElementById("services").style.display = "inline-block";
    document.getElementById("moods").style.display = "none";
    document.getElementById("music").style.display = "none";
    document.getElementById("buddy").style.display = "none";
    document.getElementById("history").style.display = "none";
    document.getElementById("servicesin").style.display = "none";
  }
}

function buddies() {
  clearMap();
  if (
    document.getElementById("buddy").style.display == "" ||
    document.getElementById("buddy").style.display == "none"
  ) {
    document.getElementById("plus").style.display = "none";
    document.getElementById("souvenirs").style.display = "none";
    document.getElementById("buddy").style.display = "block";
    document.getElementById("services").style.display = "none ";
    document.getElementById("moods").style.display = "none";
    document.getElementById("music").style.display = "none";
    document.getElementById("history").style.display = "none";
    document.getElementById("servicesin").style.display = "none";
  }
  buddies_toggle();
}
var flag_toggle = false;
function buddies_toggle() {
  clearMap();
  var checkbox = document.getElementById("checkbox");
  if (checkbox.checked == true) {
    var set_data = firebase
      .database()
      .ref("Buddies")
      .child(city)
      .child("WB012345")
      .set({ lat: "22.23", long: "88.12", phone: "+91 9XXXXXX" });
    flag_toggle = true;
    var data_buddies = firebase.database().ref("Buddies").child(city);
    data_buddies.on("value", (snap) => {
      dictionary = snap.val();

      document.getElementById("buddies").innerHTML = "";
      if (Object.keys(dictionary).length == 1) {
        clearMap();

        document.getElementById("buddies").innerHTML = `No Buddies`;
      } else {
        for (i = 0; i < Object.keys(dictionary).length; i++) {
          if (
            getDistanceFromLatLonInKm(
              18.829491,
              73.258131,
              dictionary[Object.keys(dictionary)[i]]["lat"],
              dictionary[Object.keys(dictionary)[i]]["long"]
            ) < 60 &&
            Object.keys(dictionary)[i] != "WB012345"
          ) {
            if (checkbox.checked == true) {
              markers_buddies.push(
                markers(
                  dictionary[Object.keys(dictionary)[i]]["lat"],
                  dictionary[Object.keys(dictionary)[i]]["long"],
                  Object.keys(dictionary)[i],
                  dictionary[Object.keys(dictionary)[i]]["phone"]
                )
              );
            }
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
  } else if (flag_toggle) {
    firebase
      .database()
      .ref("Buddies")
      .child(String(city))
      .child("WB012345")
      .set(null);
    document.getElementById(
      "buddies"
    ).innerHTML = `Make yourself visible in order to check out your buddies`;
    clearMap();
  } else {
    clearMap();

    document.getElementById(
      "buddies"
    ).innerHTML = `Make yourself visible in order to check out your buddies`;
  }
}
function souvenirs() {
  clearMap();
  if (
    document.getElementById("souvenirs").style.display == "" ||
    document.getElementById("souvenirs").style.display == "none"
  ) {
    document.getElementById("plus").style.display = "block";
    document.getElementById("souvenirs").style.display = "block";
    document.getElementById("buddy").style.display = "none";
    document.getElementById("services").style.display = "none ";
    document.getElementById("moods").style.display = "none";
    document.getElementById("music").style.display = "none";
    document.getElementById("history").style.display = "none";
    document.getElementById("servicesin").style.display = "none";
  }
}
function hist() {
  clearMap();
  if (
    document.getElementById("history").style.display == "" ||
    document.getElementById("history").style.display == "none"
  ) {
    document.getElementById("history").style.display = "block";
    document.getElementById("plus").style.display = "none";
    document.getElementById("souvenirs").style.display = "none";
    document.getElementById("buddy").style.display = "none";
    document.getElementById("services").style.display = "none ";
    document.getElementById("moods").style.display = "none";
    document.getElementById("music").style.display = "none";
    document.getElementById("servicesin").style.display = "none";
  }
  var data_history = firebase.database().ref("History").child("WB012345");

  data_history.on("value", (snap) => {
    dictionary = snap.val();

    document.getElementById("history").innerHTML = "";
    if (Object.keys(dictionary).length == 1) {
      document.getElementById(
        "history"
      ).innerHTML = `<text class='hist_text' >Not found</text>`;
    } else {
      for (i = 0; i < Object.keys(dictionary).length; i++) {
        if (Object.keys(dictionary)[i] != "Place") {
          for (
            j = 0;
            j < Object.keys(dictionary[Object.keys(dictionary)[i]]).length;
            j++
          ) {
            document.getElementById("history").innerHTML +=
              `<div class='hist_cards'>
      <div class='hist_img'>
      <img src="/static/pics/bud.png">
      </div>
      <img onClick='remove("` +
              Object.keys(dictionary)[i] +
              `","` +
              Object.keys(dictionary[Object.keys(dictionary)[i]])[j] +
              `")'  src="static/pics/cross.svg" style="height:30%; width:30%; margin-left:75%" id="btt">
   
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
function servicesin(clickme) {
  clearMap();
  if (
    document.getElementById("servicesin").style.display == "" ||
    document.getElementById("servicesin").style.display == "none"
  ) {
    document.getElementById("servicesin").style.display = "block";
    document.getElementById("history").style.display = "none";
    document.getElementById("plus").style.display = "none";
    document.getElementById("souvenirs").style.display = "none";
    document.getElementById("buddy").style.display = "none";
    document.getElementById("services").style.display = "none ";
    document.getElementById("moods").style.display = "none";
    document.getElementById("music").style.display = "none";
  }
  services_in(clickme);
}
function add() {
  if (city != "") {
    var sov = prompt("Enter the new souvenir");

    if (sov != null) {
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
    city = ans;
    firebase_();
  },
});

function firebase_() {
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
function markers(l, i, carnum, ph) {
  var marker2 = new google.maps.Marker({
    position: { lat: l, lng: i },

    icon: {
      url: "static/pics/bud.png", // url
      scaledSize: new google.maps.Size(40, 40),
    },
    map: map,
  });
  var infowindow2 = new google.maps.InfoWindow({
    content: "<li>Car Number:" + carnum + "</li><li>Phone:" + ph + "</li>",
  });
  google.maps.event.addListener(marker2, "click", function () {
    infowindow2.open(map, marker2);
  });

  return marker2;
}

function services_in(service) {
  document.getElementById("servicesin").innerHTML =
    `<div class="services_upar">` +
    service +
    `</div>
  <div class="services_in_in" id="services_in_in"> </div>`;
  markers_servicesin = [];
  for (i = 0; i < services_list[service].length; i++) {
    markers_servicesin.push(
      servicein_marker(
        "static/pics/" + service + ".png",
        services_list[service][i]["Lat"],
        services_list[service][i]["Long"],
        services_list[service][i]["Name"],
        services_list[service][i]["Address"],
        services_list[service][i]["Phone"]
      )
    );
    document.getElementById("services_in_in").innerHTML +=
      `<div class='servicesin_cards'>
        <div class='servicesin_img'>
        <img src="static/pics/` +
      service +
      `.png" style="height:100%; width:auto; margin-top:2%">` +
      `</div>
        <div class='servicesin_text'>
                <text style="font-weight: bold; font-size: 20px">` +
      services_list[service][i]["Name"] +
      `</text>
                <br>
                <text>` +
      services_list[service][i]["Address"] +
      `</text>
                <br>
                <text style="font-weight:bold;"> Ph: ` +
      services_list[service][i]["Phone"] +
      `
                </text>
        </div>
        
    </div>`;
  }
}
function servicein_marker(url, l, i, name, add, ph) {
  var marker2 = new google.maps.Marker({
    position: { lat: Number(l), lng: Number(i) },

    icon: {
      url: url, // url
      scaledSize: new google.maps.Size(40, 40),
    },
    map: map,
  });
  var infowindow2 = new google.maps.InfoWindow({
    content:
      "<li>Name:" +
      name +
      "</li><li>Address:" +
      add +
      "</li><li>Phone:" +
      ph +
      "</li>",
  });
  google.maps.event.addListener(marker2, "click", function () {
    infowindow2.open(map, marker2);
  });
  return marker2;
}
function clearMap() {
  for (let i = 0; i < markers_buddies.length; i++) {
    markers_buddies[i].setMap(null);
  }
  for (let i = 0; i < markers_servicesin.length; i++) {
    markers_servicesin[i].setMap(null);
  }
  markers_servicesin = [];
  markers_buddies = [];
}
async function dynamic() {
  latt = 18.829491;
  longg = 73.258131;
  document.getElementById("servicesin").style.display = "block";
  document.getElementById("services").style.display = "none";
  document.getElementById("servicesin").innerHTML =
    `<div class="services_upar">` +
    "FUEL" +
    `</div>
<div class="services_in_in" id="services_in_in"> </div>`;
  document.getElementById("services_in_in").innerHTML +=
    `<div class='servicesin_cards'>
    <div class='servicesin_img'>
    <img src="static/pics/FUEL.png" style="height:100%; width:auto; margin-top:2%">` +
    `</div>
    <div class='servicesin_text'>
            <text style="font-weight: bold; font-size: 20px">` +
    services_list["FUEL"][0]["Name"] +
    `</text>
            <br>
            <text>` +
    services_list["FUEL"][0]["Address"] +
    `</text>
            <br>
            <text style="font-weight:bold;"> Ph: ` +
    services_list["FUEL"][0]["Phone"] +
    `
            </text>
    </div>
    
</div>`;
  markers_servicesin.push(
    servicein_marker(
      "static/pics/" + "FUEL" + ".png",
      services_list["FUEL"][0]["Lat"],
      services_list["FUEL"][0]["Long"],
      services_list["FUEL"][0]["Name"],
      services_list["FUEL"][0]["Address"],
      services_list["FUEL"][0]["Phone"]
    )
  );
  for (i = 0; i < 50; i++) {
    await new Promise((done) => setTimeout(() => done(), 500));
    if (i == 35) {
      clearMap();
      markers_servicesin.push(
        servicein_marker(
          "static/pics/" + "FUEL" + ".png",
          services_list["FUEL"][1]["Lat"],
          services_list["FUEL"][1]["Long"],
          services_list["FUEL"][1]["Name"],
          services_list["FUEL"][1]["Address"],
          services_list["FUEL"][1]["Phone"]
        )
      );
      document.getElementById("services_in_in").innerHTML =
        `<div class='servicesin_cards'>
        <div class='servicesin_img'>
        <img src="static/pics/FUEL.png" style="height:100%; width:auto; margin-top:2%">` +
        `</div>
        <div class='servicesin_text'>
                <text style="font-weight: bold; font-size: 20px">` +
        services_list["FUEL"][1]["Name"] +
        `</text>
                <br>
                <text>` +
        services_list["FUEL"][1]["Address"] +
        `</text>
                <br>
                <text style="font-weight:bold;"> Ph: ` +
        services_list["FUEL"][1]["Phone"] +
        `
                </text>
        </div>
        
    </div>`;
    }

    var fact = 0.00001 * i;
    latt -= fact;
    longg += fact;
    marker.setMap(null);
    marker = new google.maps.Marker({
      position: { lat: latt, lng: longg },

      icon: {
        url: "static/pics/car.svg", // url
        scaledSize: new google.maps.Size(40, 40),
      },
      map: map,
    });
  }
}
function remove(cityy, datee) {
  firebase
    .database()
    .ref("History")
    .child("WB012345")
    .child(cityy)
    .child(datee)
    .set(null);
}
