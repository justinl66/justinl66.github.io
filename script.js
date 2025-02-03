document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector("nav ul");
    const galleryImages = document.querySelectorAll(".gallery-wrapper img");
    const overlay = document.querySelector(".overlay");
    const overlayImage = document.querySelector(".overlay img");
    const closeOverlay = document.querySelector(".overlay .close");
    const galleryWrapper = document.querySelector(".gallery-wrapper");

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

    // Clone gallery items for infinite loop effect
    function cloneGalleryItems() {
        const images = Array.from(document.querySelectorAll(".gallery-wrapper img"));
        images.forEach(image => {
            let clone = image.cloneNode(true);
            galleryWrapper.appendChild(clone);
        });
    }

    // Function to add overlay functionality to images
    function enableOverlayForImages() {
        const galleryImages = document.querySelectorAll(".gallery-wrapper img");
        galleryImages.forEach(image => {
            image.addEventListener("click", () => {
                overlayImage.src = image.src;
                overlay.style.display = "flex";
            });
        });
    }

    // Clone gallery items for infinite loop effect and enable overlay on cloned images
    function cloneGalleryItems() {
        const images = Array.from(document.querySelectorAll(".gallery-wrapper img"));
        images.forEach(image => {
            let clone = image.cloneNode(true);
            galleryWrapper.appendChild(clone);
        });
        enableOverlayForImages(); // Re-enable overlay on new images
    }

    cloneGalleryItems();
    enableOverlayForImages();

    // Close overlay functionality
    closeOverlay.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.style.display = "none";
        }
    });
});