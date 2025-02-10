document.addEventListener("DOMContentLoaded", function () {
    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        centeredSlides: true,
        slidesPerView: 'auto',
        watchSlidesProgress: true, // Ensure slide progress is tracked
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: false, // Disable looping to manage navigation buttons visibility
        preloadImages: true,          // Ensure all images load immediately
        lazy: { enabled: false },     // Disable Swiper lazy loading
        effect: 'coverflow', // Added coverflow effect
        coverflowEffect: {  // Coverflow parameters
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        on: {
            init: function () {
                updateNavigationButtons(this);
                this.updateSlidesProgress();
                this.emit('setTranslate'); // Ensure scaling is applied on load
            },
            slideChange: function () {
                updateNavigationButtons(this);
            },
            /* Remove or comment out the custom setTranslate callback:
            setTranslate: function() {
                for (let i = 0; i < this.slides.length; i++) {
                    this.slides[i].style.transform = '';
                }
            },
            */
            setTransition: function(duration) {
                for (let i = 0; i < this.slides.length; i++) {
                    this.slides[i].style.transitionDuration = duration + 'ms';
                }
            }
        },
    });
    
    // Add arrow key navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            swiper.slidePrev();
        } else if (e.key === 'ArrowRight') {
            swiper.slideNext();
        }
    });

    function updateNavigationButtons(swiper) {
        const nextButton = document.querySelector('.swiper-button-next');
        const prevButton = document.querySelector('.swiper-button-prev');

        nextButton.style.display = swiper.isEnd ? 'none' : 'flex';
        prevButton.style.display = swiper.isBeginning ? 'none' : 'flex';
    }
});
