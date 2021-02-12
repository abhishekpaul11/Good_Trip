function data(flag) {
  var destination = document.getElementById("dest").value;
  console.log(destination);
  if (flag == 0) {
    document.getElementById("dest").setAttribute("value", "NA");
  } else if (destination == "" || destination == null) {
    window.alert("Please enter a correct destination");
    document.getElementById("dest").setAttribute("value", "OOPS");
  }
  document.getElementById("dest").style.color = "transparent";
}
localStorage.setItem("destination", document.getElementById("dest").value);
