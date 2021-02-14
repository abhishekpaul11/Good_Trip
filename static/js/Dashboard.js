function data(flag) {
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
  var d = new Date();
  var date = d.getDate();
  var month = d.getMonth();
  var year = d.getFullYear();
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var full_date = date + "-" + months[month] + "-" + year;

  var destination = document.getElementById("dest").value;
  if (flag == 0) {
    document.getElementById("dest").setAttribute("value", "NA");
  } else if (destination == "" || destination == null) {
    window.alert("Please enter a correct destination");
    document.getElementById("dest").setAttribute("value", "OOPS");
  } else {
    var push_data = firebase
      .database()
      .ref("History")
      .child("WB012345")
      .child(String(destination))
      .child(String(full_date))
      .child("Distance")
      .set("12 km");
  }

  document.getElementById("dest").style.color = "transparent";
}
