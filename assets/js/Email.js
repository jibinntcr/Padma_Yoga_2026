

$(document).ready(function() {
    $("#submit-form").submit((e) => {
        e.preventDefault();

        // 1. Show "Sending..." animation on the button
        var submitButton = $("#started"); 
        var originalText = submitButton.html(); 
        submitButton.html('<b class="mx-3">Sending...</b>').prop("disabled", true);

        $.ajax({
            // ------------------------------------------------------------------
            // YOUR NEW URL IS INTEGRATED BELOW:
            // ------------------------------------------------------------------
            url: "https://script.google.com/macros/s/AKfycbz8ojFpzW0A1xpeQiYXECxDSCt54CVpbu9QKJgR4dpbvrMXUyOW7qLt1VJT6de_dcJh/exec", 
            
            data: $("#submit-form").serialize(),
            method: "POST",
            success: function(response) {
                // Google Script returns "result: success" if it worked
                if(response.result === "success") {
                    showToast("Email sent successfully! We will contact you soon.");
                    $("#submit-form")[0].reset(); // Clear the form fields
                } else {
                    showToast("Something went wrong. Please try again.", "error");
                    console.error("Script Error:", response.error);
                }
                // Reset button back to normal
                submitButton.html(originalText).prop("disabled", false);
            },
            error: function(err) {
                showToast("Connection failed. Check your internet.", "error");
                console.error("Network Error:", err);
                submitButton.html(originalText).prop("disabled", false);
            }
        });
    });

    // Helper function to show the popup message (Toast)
    function showToast(message, type = "success") {
        if ($("#toast-container").length === 0) {
            $("body").append('<div id="toast-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;"></div>');
        }
        
        const toast = document.createElement("div");
        toast.textContent = message;
        
        // Green for success, Red for error
        toast.style.background = type === "success" ? "#28a745" : "#dc3545"; 
        toast.style.color = "white";
        toast.style.padding = "12px 24px";
        toast.style.borderRadius = "4px";
        toast.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
        toast.style.fontSize = "14px";
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.3s ease-in";

        $("#toast-container").append(toast);

        // Fade in
        setTimeout(() => { toast.style.opacity = "1"; }, 10);

        // Remove after 5 seconds
        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => { toast.remove(); }, 300);
        }, 5000);
    }
});