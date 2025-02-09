document.addEventListener("DOMContentLoaded", function () {
    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: false, // Disable looping to manage navigation buttons visibility
        on: {
            init: function () {
                updateNavigationButtons(this);
            },
            slideChange: function () {
                updateNavigationButtons(this);
            },
        },
    });

    function updateNavigationButtons(swiper) {
        const nextButton = document.querySelector('.swiper-button-next');
        const prevButton = document.querySelector('.swiper-button-prev');

        if (swiper.isEnd) {
            nextButton.style.display = 'none';
        } else {
            nextButton.style.display = 'flex';
        }

        if (swiper.isBeginning) {
            prevButton.style.display = 'none';
        } else {
            prevButton.style.display = 'flex';
        }
    }
});
