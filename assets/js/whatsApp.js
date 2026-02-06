// ==========================================
// WHATSAPP.JS - WITH UNIFIED TOAST ALERTS
// ==========================================

function openWhatsApp() {
    // 1. Get Values
    // Using jQuery selector for consistency with your other files
    var name = $("#name").val().trim();
    var location = $("#location").val().trim();
    var phone = $("#phone").val().trim();
    var email = $("#email").val().trim();
    var message = $("#message").val().trim();

    // ==========================================
    // 2. STRICT VALIDATION LOGIC
    // ==========================================

    // --- Name Validation ---
    var nameRegex = /^[A-Za-z\s]+$/;
    if (name.length < 3 || !nameRegex.test(name)) {
        showToast("Invalid Name: Use letters only (no numbers).", "error");
        return; 
    }

    // --- Location Validation ---
    var locationRegex = /^[A-Za-z\s,.-]+$/;
    if (location.length < 3 || !locationRegex.test(location)) {
        showToast("Invalid Location: Please enter a City or Country.", "error");
        return; 
    }

    // --- Phone Validation ---
    var phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
        showToast("Invalid Phone: Enter 10-15 digits only.", "error");
        return; 
    }

    // --- Email Validation ---
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        showToast("Invalid Email address.", "error");
        return; 
    }

    // --- Message Validation ---
    if (message.length < 20) {
        showToast("Message too short: Please write at least 20 chars.", "error");
        return; 
    }

    // ==========================================
    // 3. OPEN WHATSAPP
    // ==========================================
    
    var myPhoneNumber = "917034199217"; 

    var formattedMessage = encodeURIComponent(
        "Name: " + name + "\n" +
        "Location: " + location + "\n" +
        "Phone: " + phone + "\n" +
        "Email: " + email + "\n" +
        "Message: " + message
    ); 

    window.open(`https://wa.me/${myPhoneNumber}?text=${formattedMessage}`, "_blank");
}

// ==========================================
// 4. HELPER FUNCTION: SHOW TOAST (Popup)
// ==========================================
function showToast(message, type = "success") {
    // Check if container exists, if not create it
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

// ==========================================
// 5. TOGGLE BUTTON LOGIC
// ==========================================
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