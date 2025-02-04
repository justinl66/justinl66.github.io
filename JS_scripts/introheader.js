const tl = gsap.timeline({ delay: 1 });

// Function to animate both movement and color fade
function animateLetter(selector, animationProps, delay = "-=0.3") {
    tl.from(selector, {
        color: "#000000", // Starts as black
        ...animationProps
    }, delay);
    
    tl.to(selector, {
        color: "#ffffff", // Fades to white
        duration: animationProps.duration, // Matches animation length
        ease: "power1.out"
    }, "-=0.4"); // Slight overlap to keep it smooth
}

// H -> Slides in from the left
animateLetter(".slide-in", {
    x: -300,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out"
});

// i -> Pops into existence
animateLetter(".pop", {
    scale: 0,
    opacity: 0,
    duration: 0.3,
    ease: "back.out(3)"
}, "-=0.2");

// . -> Fades in quickly
animateLetter(".fade", {
    opacity: 0,
    duration: 0.4
}, "-=0.3");

// I -> Bounces in higher
animateLetter(".bounce", {
    y: -100,
    opacity: 0,
    duration: 0.5,
    ease: "bounce.out"
}, "-=0.2");

// 'm -> Rotates in with a big spin
animateLetter(".rotate", {
    rotation: 720,
    opacity: 0,
    duration: 0.6,
    ease: "elastic.out(1, 0.6)"
}, "-=0.3");

// J -> Drops in from above
animateLetter(".drop", {
    y: -300,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out"
}, "-=0.4");

// u -> Flies in from the top-left
animateLetter(".fly", {
    x: -400,
    y: -250,
    rotation: -50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    onComplete: function() {
        gsap.to(".fly", { rotation: 0, duration: 0.2 });
    }
}, "-=0.5");

// s -> Spins in dramatically
animateLetter(".spin", {
    rotation: 1440, // More spins
    opacity: 0,
    duration: 0.7,
    ease: "power2.out"
}, "-=0.5");

// t -> Grows from tiny to huge first, then settles
animateLetter(".grow", {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    ease: "back.out(3)"
}, "-=0.3");

// i -> Flips 720 for extra effect
animateLetter(".flip", {
    rotationY: 720,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out"
}, "-=0.3");

// n -> Scales up dramatically
animateLetter(".scale", {
    scale: 0.1,
    opacity: 0,
    duration: 0.6,
    ease: "elastic.out(1, 0.7)"
}, "-=0.3");

// . -> Appears with a stronger shake
animateLetter(".shake", {
    opacity: 0,
    duration: 0.3,
    ease: "power2.out",
    onComplete: function() {
        gsap.to(".shake", {
            x: 8,
            repeat: 6,
            yoyo: true,
            duration: 0.1
        });
    }
}, "-=0.3");
