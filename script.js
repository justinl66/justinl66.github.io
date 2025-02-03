document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector("nav ul");
    const galleryWrapper = document.querySelector(".gallery-wrapper");
    const overlay = document.querySelector(".overlay");
    const overlayImage = document.querySelector(".overlay img");
    const closeOverlay = document.querySelector(".overlay .close");
    let scrollSpeed = 1; // Adjust scrolling speed
    let lastScrollLeft = 0;
    let isTabActive = true;

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

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
        const images = document.querySelectorAll(".gallery-wrapper img");
        for (let i = 0; i < 3; i++) { // Clone images 3 times
            images.forEach(image => {
                let clone = image.cloneNode(true);
                document.querySelector(".gallery-wrapper").appendChild(clone);
            });
        }
    }

    cloneGalleryItems();
    enableOverlayForImages();

    // Infinite scrolling using requestAnimationFrame()\
    function scrollGallery() {
        if (isTabActive) {
            galleryWrapper.scrollLeft += scrollSpeed;
            lastScrollLeft = galleryWrapper.scrollLeft; // Store last position

            if (galleryWrapper.scrollLeft >= galleryWrapper.scrollWidth - galleryWrapper.clientWidth) {
                galleryWrapper.scrollLeft = 0; // Loop back to start
            }
        }
        requestAnimationFrame(scrollGallery);
    }

    // Detect when tab loses focus
    document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "visible") {
            isTabActive = true;
            galleryWrapper.scrollLeft = lastScrollLeft; // Instantly resume at the last position
            scrollGallery(); // Restart immediately
        } else {
            isTabActive = false;
        }
    });
    scrollGallery(); // Start scrolling
    

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
