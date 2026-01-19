// async function sendEmail() {
//   var nameField = document.getElementById("name");
//   var locationField = document.getElementById("location");
//   var phonenumField = document.getElementById("phonenum");
//   var emailField = document.getElementById("emailaddrs");
//   var messageField = document.getElementById("message");

//   var name = nameField.value.trim();
//   var location = locationField.value.trim();
//   var phonenum = phonenumField.value.trim();
//   var emailaddrs = emailField.value.trim();
//   var message = messageField.value.trim();

//   // Check if any field is empty
//   if (!name || !location || !phonenum || !emailaddrs || !message) {
//     alert("Please fill in all fields before sending the email.");
//     return;
//   }

//   var subject = encodeURIComponent("New Inquiry from " + name);
//   var body = encodeURIComponent(
//     "Name: " +
//       name +
//       "\nLocation: " +
//       location +
//       "\nPhone Number: " +
//       phonenum +
//       "\nEmail: " +
//       emailaddrs +
//       "\n\nMessage:\n" +
//       message
//   );

//   window.open(
//     `mailto:someone@example.com?subject=${subject}&body=${body}`,
//     "_blank"
//   );

//   // Reset all input fields after sending
//   nameField.value = "";
//   locationField.value = "";
//   phonenumField.value = "";
//   emailField.value = "";
//   messageField.value = "";
// }
$(document).ready(function() {
  $("#submit-form").submit((e) => {
      e.preventDefault();
      
      $.ajax({
          url: "https://script.google.com/macros/s/AKfycbzglVPWii5gvmkazOUCtI_Iz_rewnh0K15DLpd2gYj3xBWLlEmFVMA4SFQpFyfGYJgZ/exec",
          data: $("#submit-form").serialize(),
          method: "post",
          success: function(response) {
            showToast("Form submitted successfully");
            $("#submit-form")[0].reset();
           
          },
          error: function(err) {
            alert("Failed to submit form. Please try again later.",err);
              showToast("Something went wrong!", "error");
              
          }
      });
  });

  function showToast(message, type = "success") {
      const toast = document.createElement("div");
      toast.className = `toast ${type}`;
      toast.textContent = message;
      document.body.appendChild(toast);

      // setTimeout(() => {
      //     toast.remove();
      // }, 5000);
  }
});