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





document.addEventListener('DOMContentLoaded', function() {
    var toggleBtn = document.getElementById('toggle-btn');
    var container = document.getElementById('whatsapp-container');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            container.classList.toggle('hidden');
            
            // എപ്പോഴും ആരോ ചിഹ്നം തന്നെ വരാൻ താഴെ കാണുന്ന രീതിയിൽ മാറ്റുക
            if (container.classList.contains('hidden')) {
                toggleBtn.innerHTML = '❮'; // ഹൈഡ് ആയിരിക്കുമ്പോൾ ഇടത്തോട്ട് (തുറക്കാൻ)
            } else {
                toggleBtn.innerHTML = '❯'; // തുറന്നിരിക്കുമ്പോൾ വലത്തോട്ട് (അടയ്ക്കാൻ)
            }
        });
    }
});