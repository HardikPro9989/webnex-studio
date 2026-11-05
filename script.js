
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
// ==========================================
// PORTFOLIO POPUP PREVIEW SYSTEM
// ==========================================

const portfolioCards = document.querySelectorAll(".portfolio-card");

const portfolioPreviews = {
    "Restaurant Website": {
        description: "A modern restaurant website concept designed to showcase food, menus and customer experiences.",
        features: [
            "Attractive food showcase",
            "Digital menu presentation",
            "Restaurant information",
            "Mobile-friendly layout"
        ]
    },

    "Coaching Website": {
        description: "A professional coaching website concept for presenting courses, learning programs and educational services.",
        features: [
            "Course information",
            "Learning program showcase",
            "Student-focused design",
            "Responsive layout"
        ]
    },

    "Automobile Website": {
        description: "A premium automobile website concept designed to present vehicles, products and automotive services.",
        features: [
            "Automotive product showcase",
            "Modern visual design",
            "Service information",
            "Responsive layout"
        ]
    }
};

if (portfolioCards.length) {

    const modal = document.createElement("div");
    modal.className = "portfolio-modal";

    modal.innerHTML = `
        <div class="portfolio-modal-content" role="dialog"
             aria-modal="true" aria-labelledby="portfolioModalTitle">

            <button class="portfolio-modal-close"
                    aria-label="Close preview">&times;</button>

            <span class="portfolio-modal-label">PROJECT PREVIEW</span>

            <h2 id="portfolioModalTitle"></h2>

            <p class="portfolio-modal-description"></p>

            <div class="portfolio-modal-preview"></div>

            <h3>Project Features</h3>

            <ul class="portfolio-modal-features"></ul>

            <p class="portfolio-modal-note">
                This is a concept preview, not a live client website.
            </p>

        </div>
    `;

    document.body.appendChild(modal);

    const closeButton = modal.querySelector(".portfolio-modal-close");
    const modalTitle = modal.querySelector("#portfolioModalTitle");
    const modalDescription = modal.querySelector(".portfolio-modal-description");
    const modalPreview = modal.querySelector(".portfolio-modal-preview");
    const modalFeatures = modal.querySelector(".portfolio-modal-features");

    let previousFocus = null;

    function openPortfolioPreview(card) {

        const title = card.querySelector(".portfolio-info h3")?.textContent.trim();

        const previewData = portfolioPreviews[title];

        if (!previewData) return;

        previousFocus = document.activeElement;

        modalTitle.textContent = title;
        modalDescription.textContent = previewData.description;

        modalPreview.replaceChildren();

        const visual = card.querySelector(".portfolio-image");

        if (visual) {
            modalPreview.appendChild(visual.cloneNode(true));
        }

        modalFeatures.replaceChildren();

        previewData.features.forEach(feature => {
            const item = document.createElement("li");
            item.textContent = feature;
            modalFeatures.appendChild(item);
        });

        modal.classList.add("active");
        document.body.classList.add("portfolio-modal-open");

        closeButton.focus();
    }

    function closePortfolioPreview() {

        modal.classList.remove("active");
        document.body.classList.remove("portfolio-modal-open");

        if (previousFocus) {
            previousFocus.focus();
        }
    }

    portfolioCards.forEach(card => {

        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-haspopup", "dialog");

        card.addEventListener("click", () => {
            openPortfolioPreview(card);
        });

        card.addEventListener("keydown", event => {

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openPortfolioPreview(card);
            }

        });

    });

    closeButton.addEventListener("click", closePortfolioPreview);

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            closePortfolioPreview();
        }

    });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape" && modal.classList.contains("active")) {
            closePortfolioPreview();
        }

    });

}

