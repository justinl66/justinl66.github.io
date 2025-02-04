document.addEventListener("DOMContentLoaded", function () {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.getElementById("neural-network");

    // Set SVG to fill the hero section
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 800 600");

    const layers = [
        { x: 200, neurons: 5 },  // Input Layer
        { x: 400, neurons: 7 },  // Hidden Layer
        { x: 600, neurons: 4 }   // Output Layer
    ];

    let neurons = [];

    // Create Neurons
    function createNeurons() {
        layers.forEach((layer, layerIndex) => {
            let layerNeurons = [];
            for (let i = 0; i < layer.neurons; i++) {
                let y = (600 / (layer.neurons + 1)) * (i + 1);
                let neuron = document.createElementNS(svgNS, "circle");
                neuron.setAttribute("cx", layer.x);
                neuron.setAttribute("cy", y);
                neuron.setAttribute("r", 15);
                neuron.setAttribute("class", "neuron");
                svg.appendChild(neuron);
                layerNeurons.push({ x: layer.x, y, element: neuron });
            }
            neurons.push(layerNeurons);
        });
    }

    // Create Connections
    function createConnections() {
        for (let i = 0; i < neurons.length - 1; i++) {
            neurons[i].forEach(fromNeuron => {
                neurons[i + 1].forEach(toNeuron => {
                    let line = document.createElementNS(svgNS, "line");
                    line.setAttribute("x1", fromNeuron.x);
                    line.setAttribute("y1", fromNeuron.y);
                    line.setAttribute("x2", toNeuron.x);
                    line.setAttribute("y2", toNeuron.y);
                    line.setAttribute("class", "connection");
                    svg.appendChild(line);
                });
            });
        }
    }

    // Animate Neurons Lighting Up
    function animateNeurons() {
        neurons.forEach((layer, layerIndex) => {
            setTimeout(() => {
                layer.forEach((neuron, neuronIndex) => {
                    gsap.fromTo(
                        neuron.element,
                        { fill: "white" },
                        {
                            fill: "#ff6600",
                            duration: 1,
                            repeat: 1,
                            yoyo: true,
                            ease: "power2.inOut",
                            delay: neuronIndex * 0.5
                        }
                    );
                });
            }, layerIndex * 500);
        });
    }

    // Animate Connections Glowing
    function animateConnections() {
        const connections = document.querySelectorAll(".connection");
        connections.forEach((conn, index) => {
            gsap.fromTo(
                conn,
                { stroke: "rgba(255, 102, 0, 0.1)" },
                {
                    stroke: "rgba(255, 102, 0, 1)",
                    duration: 0.5,
                    repeat: 1,
                    yoyo: true,
                    ease: "power2.inOut",
                    delay: index * 0.15
                }
            );
        });
    }

    // Main animation loop
    function runAnimation() {
        animateConnections();
        animateNeurons();
        setTimeout(runAnimation, 3000);
    }

    // Initialize Neural Network
    function initNeuralNetwork() {
        createNeurons();
        createConnections();
        runAnimation();
    }

    initNeuralNetwork();
});
