function data() {
  var destination = document.getElementById("dest").value;
  console.log(destination);
  if (destination == "" || destination == null) {
    console.log("kfnknf");
    window.alert("Please enter a correct destination");
  }
}
