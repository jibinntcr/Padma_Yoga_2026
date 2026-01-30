async function openWhatsApp() {
  // 1. Get the form element
  var form = document.getElementById("submit-form");

  // 2. CHECK VALIDATION
  // If the form is NOT valid (empty fields), show errors and stop.
  if (!form.checkValidity()) {
    form.reportValidity(); // This triggers the browser's "Please fill out this field" bubble
    return; // Stop the function here so WhatsApp doesn't open
  }

  // 3. If valid, proceed with getting values
  var name = document.getElementById("name").value;
  var location = document.getElementById("location").value;
  var phonenum = document.getElementById("phone").value;
  var emailaddrs = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  var formattedMessage = encodeURIComponent(
    "Name: " + name +
    "\nLocation: " + location +
    "\nPhone number: " + phonenum +
    "\nEmail: " + emailaddrs +
    "\nMessage: " + message
  ); 

  // 4. Open WhatsApp
  window.open(`https://wa.me/917034199217?text=${formattedMessage}`, "_blank");
  
  // Optional: Clear the message field after sending, or clear form
  // document.getElementById("message").value = "";
}

// --- Toggle Button Logic (Kept exactly as you had it) ---
document.addEventListener('DOMContentLoaded', function() {
    var toggleBtn = document.getElementById('toggle-btn');
    var container = document.getElementById('whatsapp-container');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            container.classList.toggle('hidden');
            
            if (container.classList.contains('hidden')) {
                toggleBtn.innerHTML = '❮'; 
            } else {
                toggleBtn.innerHTML = '❯'; 
            }
        });
    }
});