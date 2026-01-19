async function openWhatsApp() {
  var name = document.getElementById("name").value;
  var location = document.getElementById("location").value;
  var phonenum = document.getElementById("phone").value;
  var emailaddrs = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  var formattedMessage = encodeURIComponent(
    "Name:" +
      name +
      "\nLocation:" +
      location +
      "\n Phone number:" +
      phonenum +
      "\n Email:" +
      emailaddrs +
      "\nMessage:" +
      message
  ); // New line using \n
  window.open(`https://wa.me/917034199217?text=${formattedMessage}`, "_blank");
  document.getElementById("message").value = "";
}
