const tl = gsap.timeline({ delay: 0.5 }); // Reduced delay

// Function to animate both movement and color fade
function animateLetter(selector, animationProps, delay = "-=0.2") { // Start 0.2 seconds after the previous animation
    tl.from(selector, {
        color: "#000000", // Starts as black
        ...animationProps
    }, delay);
    
    tl.to(selector, {
        color: "#ffffff", // Fades to white
        duration: animationProps.duration / 2, // Halve the duration
        ease: "power1.out"
    }, "-=0.1"); // Adjust overlap to keep it smooth
}

// H -> Slides in from the left
animateLetter(".slide-in", {
    x: -300,
    opacity: 0,
    duration: 0.3, // Halve the duration
    ease: "power3.out"
});

// i -> Pops into existence
animateLetter(".pop", {
    scale: 0,
    opacity: 0,
    duration: 0.15, // Halve the duration
    ease: "back.out(3)"
}, "-=0.2");

// . -> Fades in quickly
animateLetter(".fade", {
    opacity: 0,
    duration: 0.2 // Halve the duration
}, "-=0.2");

// I -> Bounces in higher
animateLetter(".bounce", {
    y: -100,
    opacity: 0,
    duration: 0.25, // Halve the duration
    ease: "bounce.out"
}, "-=0.2");

// 'm -> Rotates in with a big spin
animateLetter(".rotate", {
    rotation: 720,
    opacity: 0,
    duration: 0.3, // Halve the duration
    ease: "elastic.out(1, 0.6)"
}, "-=0.2");

// J -> Drops in from above
animateLetter(".drop", {
    y: -300,
    opacity: 0,
    duration: 0.25, // Halve the duration
    ease: "power2.out"
}, "-=0.2");

// u -> Flies in from the top-left
animateLetter(".fly", {
    x: -400,
    y: -250,
    rotation: -50,
    opacity: 0,
    duration: 0.4, // Halve the duration
    ease: "power2.out",
    onComplete: function() {
        gsap.to(".fly", { rotation: 0, duration: 0.1 });
    }
}, "-=0.2");

// s -> Spins in dramatically
animateLetter(".spin", {
    rotation: 1440, // More spins
    opacity: 0,
    duration: 0.35, // Halve the duration
    ease: "power2.out"
}, "-=0.2");

// t -> Grows from tiny to huge first, then settles
animateLetter(".grow", {
    scale: 0,
    opacity: 0,
    duration: 0.25, // Halve the duration
    ease: "back.out(3)"
}, "-=0.2");

// i -> Flips 720 for extra effect
animateLetter(".flip", {
    rotationY: 720,
    opacity: 0,
    duration: 0.25, // Halve the duration
    ease: "power2.out"
}, "-=0.2");

// n -> Scales up dramatically
animateLetter(".scale", {
    scale: 0.1,
    opacity: 0,
    duration: 0.3, // Halve the duration
    ease: "elastic.out(1, 0.7)"
}, "-=0.2");

// . -> Appears with a stronger shake
animateLetter(".shake", {
    opacity: 0,
    duration: 0.15, // Halve the duration
    ease: "power2.out",
    onComplete: function() {
        gsap.to(".shake", {
            x: 8,
            repeat: 6,
            yoyo: true,
            duration: 0.05 // Halve the duration
        });
    }
}, "-=0.2");
