function data(flag) {
  var firebaseConfig = {
    //add credentials
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
