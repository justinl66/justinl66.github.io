document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector("nav ul");
    const galleryImages = document.querySelectorAll(".gallery-wrapper img");
    const overlay = document.querySelector(".overlay");
    const overlayImage = document.querySelector(".overlay img");
    const closeOverlay = document.querySelector(".overlay .close");

    // Toggle mobile menu
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Open gallery overlay on image click
    galleryImages.forEach(image => {
        image.addEventListener("click", () => {
            overlay.style.display = "flex";
            overlayImage.src = image.src;
        });
    });

    // Close overlay when clicking close button
    closeOverlay.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    // Close overlay when clicking outside the image
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.style.display = "none";
        }
    });
});