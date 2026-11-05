
// ==========================================
// WEBNEX STUDIO - JAVASCRIPT
// ==========================================

// Add your contact details here
const CONFIG = {
    email: "hardikrathi005@gmail.com",
    whatsapp: "91XXXXXXXXXX"
};


// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

}


// ==========================================
// SCROLL ANIMATION
// ==========================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("active");
    });

}


// ==========================================
// CURRENT YEAR
// ==========================================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// ==========================================
// CONTACT EMAIL
// ==========================================

const contactEmail = document.getElementById("contactEmail");

if (contactEmail && CONFIG.email !== "YOUR_EMAIL@example.com") {
    contactEmail.textContent = CONFIG.email;
}


// ==========================================
// CONTACT FORM
// ==========================================

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {

    enquiryForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !service || !message) {

            alert("Please fill in all the fields.");

            return;

        }

        if (CONFIG.email === "YOUR_EMAIL@example.com") {

            alert("Please configure your email address in script.js first.");

            return;

        }

        const subject = encodeURIComponent(
            "New Website Enquiry - " + service
        );

        const body = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\nService: " + service +
            "\n\nProject Details:\n" + message
        );

        const mailtoLink =
            "mailto:" + CONFIG.email +
            "?subject=" + subject +
            "&body=" + body;

       window.open(
    "https://mail.google.com/mail/?view=cm&fs=1&to=" +
    encodeURIComponent(CONFIG.email) +
    "&su=" + subject +
    "&body=" + body,
    "_blank"
);

    });

}


// ==========================================
// FLOATING WHATSAPP BUTTON
// ==========================================

const floatingContact = document.querySelector(".floating-contact");

if (floatingContact) {

    const validWhatsApp = /^91\d{10}$/.test(CONFIG.whatsapp);

    if (validWhatsApp) {

        floatingContact.href =
            "https://wa.me/" + CONFIG.whatsapp;

        floatingContact.target = "_blank";
        floatingContact.rel = "noopener noreferrer";

    } else {

        floatingContact.href = "#contact";

    }

}


// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log("WEBNEX STUDIO website loaded successfully!");
