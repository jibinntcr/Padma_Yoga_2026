$(document).ready(function() {
    $("#submit-form").submit((e) => {
        e.preventDefault();

        // ============================================
        // 1. GET VALUES & REMOVE EXTRA SPACES
        // ============================================
        var name = $("#name").val().trim();
        var location = $("#location").val().trim();
        var phone = $("#phone").val().trim();
        var email = $("#email").val().trim();
        var message = $("#message").val().trim();

        // ============================================
        // 2. STRICT VALIDATION RULES
        // ============================================

        // --- NAME VALIDATION ---
        // Rule: Must be 3+ characters. Letters and spaces ONLY. No numbers.
        // Good: "Padma", "John Doe" | Bad: "User123", "Jo"
        var nameRegex = /^[A-Za-z\s]+$/;
        if (name.length < 3 || !nameRegex.test(name)) {
            showToast("Invalid Name: Use letters only (no numbers) and at least 3 characters.", "error");
            return; // STOP
        }

        // --- LOCATION VALIDATION ---
        // Rule: Must be 3+ characters. Letters, spaces, commas, dashes, dots allowed.
        // We block numbers to prevent addresses like "123 Street" if you only want City/Country.
        // Good: "India", "New York, USA" | Bad: "12345", "NY"
        var locationRegex = /^[A-Za-z\s,.-]+$/;
        if (location.length < 3 || !locationRegex.test(location)) {
            showToast("Invalid Location: Please provide a valid City or Country (no numbers).", "error");
            return; // STOP
        }

        // --- PHONE VALIDATION ---
        // Rule: Must be purely digits. 10 to 15 numbers long.
        // Good: "9876543210" | Bad: "987-654", "Phone 123", "98"
        var phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(phone)) {
            showToast("Invalid Phone: Please enter 10-15 digits only (no spaces or dashes).", "error");
            return; // STOP
        }

        // --- EMAIL VALIDATION ---
        // Rule: Standard email format check.
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            showToast("Invalid Email: Please check your email address.", "error");
            return; // STOP
        }

        // --- MESSAGE VALIDATION ---
        // Rule: Must be meaningful (at least 20 characters).
        if (message.length < 20) {
            showToast("Message too short: Please write at least 20 characters.", "error");
            return; // STOP
        }

        // ============================================
        // 3. SEND DATA (Only if all checks pass)
        // ============================================
        
        var submitButton = $("#started"); 
        var originalText = submitButton.html(); 
        submitButton.html('<b class="mx-3">Sending...</b>').prop("disabled", true);

        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbz8ojFpzW0A1xpeQiYXECxDSCt54CVpbu9QKJgR4dpbvrMXUyOW7qLt1VJT6de_dcJh/exec", 
            data: $("#submit-form").serialize(),
            method: "POST",
            success: function(response) {
                if(response.result === "success") {
                    showToast("Email sent successfully! We will contact you soon.");
                    $("#submit-form")[0].reset(); // Clear form
                } else {
                    showToast("Something went wrong. Please try again.", "error");
                    console.error("Script Error:", response.error);
                }
                submitButton.html(originalText).prop("disabled", false);
            },
            error: function(err) {
                showToast("Connection failed. Check your internet.", "error");
                console.error("Network Error:", err);
                submitButton.html(originalText).prop("disabled", false);
            }
        });
    });

    // --- TOAST FUNCTION (Popup Message) ---
    function showToast(message, type = "success") {
        if ($("#toast-container").length === 0) {
            $("body").append('<div id="toast-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;"></div>');
        }
        
        const toast = document.createElement("div");
        toast.textContent = message;
        toast.style.background = type === "success" ? "#28a745" : "#dc3545"; 
        toast.style.color = "white";
        toast.style.padding = "12px 24px";
        toast.style.borderRadius = "4px";
        toast.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
        toast.style.fontSize = "14px";
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.3s ease-in";

        $("#toast-container").append(toast);
        setTimeout(() => { toast.style.opacity = "1"; }, 10);
        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => { toast.remove(); }, 300);
        }, 5000);
    }
});