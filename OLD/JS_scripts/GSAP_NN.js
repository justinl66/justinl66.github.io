document.addEventListener("DOMContentLoaded", function () {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.getElementById("neural-network");

    function resizeSVG() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    }

    resizeSVG();
    window.addEventListener("resize", resizeSVG);

    const layers = [
        { x: window.innerWidth * 0.2, neurons: 5 },  // Input Layer
        { x: window.innerWidth * 0.4, neurons: 6 },  // New Hidden Layer
        { x: window.innerWidth * 0.6, neurons: 7 },  // Existing Hidden Layer
        { x: window.innerWidth * 0.8, neurons: 4 }   // Output Layer
    ];

    let neurons = [];
    let connections = [];

    // Create Neurons and Connections with correct layering
    function createNeuralNetwork() {
        let connectionElements = []; // Store connections separately

        layers.forEach((layer, layerIndex) => {
            let layerNeurons = [];
            for (let i = 0; i < layer.neurons; i++) {
                let y = (window.innerHeight / (layer.neurons + 1)) * (i + 1);
                let neuron = document.createElementNS(svgNS, "circle");
                neuron.setAttribute("cx", layer.x);
                neuron.setAttribute("cy", y);
                neuron.setAttribute("r", 15);
                neuron.setAttribute("class", "neuron");
                neuron.style.fill = "rgba(255, 255, 255, 0)"; // Invisible initially
                neuron.style.stroke = "rgba(255, 102, 0, 0)";
                layerNeurons.push({ x: layer.x, y, element: neuron });
            }
            neurons.push(layerNeurons);
        });

        // Create connections and store them separately
        for (let i = 0; i < neurons.length - 1; i++) {
            let layerConnections = [];
            neurons[i].forEach(fromNeuron => {
                neurons[i + 1].forEach(toNeuron => {
                    let line = document.createElementNS(svgNS, "line");
                    line.setAttribute("x1", fromNeuron.x);
                    line.setAttribute("y1", fromNeuron.y);
                    line.setAttribute("x2", toNeuron.x);
                    line.setAttribute("y2", toNeuron.y);
                    line.setAttribute("class", "connection");
                    line.style.stroke = "rgba(255, 102, 0, 0)"; // Invisible initially
                    connectionElements.push(line); // Store the connection
                    layerConnections.push({ from: fromNeuron, to: toNeuron, element: line });
                });
            });
            connections.push(layerConnections);
        }

        // Append all connections first (so they render behind neurons)
        connectionElements.forEach(line => svg.appendChild(line));

        // Append all neurons after connections
        neurons.flat().forEach(n => svg.appendChild(n.element));
    }

    // Function to randomly select 1/4 of the connections in a layer
    function selectRandomConnections(layerConnections) {
        let total = layerConnections.length;
        let numToSelect = Math.ceil(total / 4); // Select about 1/4
        let shuffled = [...layerConnections].sort(() => Math.random() - 0.5); // Shuffle connections
        return shuffled.slice(0, numToSelect); // Pick first 1/4 of shuffled
    }

    // Reset all neuron and connection states before each cycle
    function resetNetwork() {
        neurons.flat().forEach(n => {
            n.element.style.fill = "rgba(255, 255, 255, 0)";
            n.element.style.stroke = "rgba(255, 102, 0, 0)";
        });

        connections.flat().forEach(c => {
            c.element.style.stroke = "rgba(255, 102, 0, 0)";
        });
    }

    // Animate the neural network signal propagation with random selection every cycle
    function animateSignal() {
        resetNetwork(); // Clear previous connections before starting a new cycle

        let animationTimeline = gsap.timeline({ repeatDelay: 1 });

        let activeNeurons = new Set(); // Store neurons that should light up
        let activeConnections = new Set(); // Store activated connections for final glow effect

        neurons.forEach((layer, layerIndex) => {
            let selectedConnections = [];

            if (layerIndex === 0) {
                // Ensure the input layer neurons always light up
                activeNeurons = new Set(layer);
            } else {
                // Select a new random set of connections each time
                selectedConnections = selectRandomConnections(connections[layerIndex - 1]);

                // Filter only connections that come from already lit neurons
                selectedConnections = selectedConnections.filter(conn => activeNeurons.has(conn.from));

                // Update active neurons based on selected connections
                activeNeurons = new Set(selectedConnections.map(c => c.to));

                // Store activated connections for the final glow effect
                activeConnections = new Set([...activeConnections, ...selectedConnections]);
            }

            // Animate neurons and their corresponding connections at the same time
            animationTimeline.to(
                [...activeNeurons].map(n => n.element).concat(selectedConnections.map(c => c.element)),
                {
                    fill: "#ffffff",
                    stroke: "#ff6600",
                    duration: 1, // Slower animation
                    yoyo: true
                }
            );
        });

        // Final Glow Effect: Highlight only the neurons and connections that were activated in white
        animationTimeline.to(
            [...activeNeurons].map(n => n.element).concat([...activeConnections].map(c => c.element)),
            {
                stroke: "#ffffff", // White glow
                duration: 2,
                ease: "power2.inOut"
            }
        );

        animationTimeline.play().eventCallback("onComplete", animateSignal); // Restart animation fresh
    }

    // Initialize everything
    function initNeuralNetwork() {
        createNeuralNetwork();
        setTimeout(animateSignal, 250); // Reduced delay
    }

    initNeuralNetwork();
});
