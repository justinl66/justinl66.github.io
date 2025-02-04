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
        { x: window.innerWidth * 0.15, neurons: 5 },  // Input Layer
        { x: window.innerWidth * 0.4, neurons: 6 },   // Hidden Layer
        { x: window.innerWidth * 0.6, neurons: 7 },   // Existing Hidden Layer
        { x: window.innerWidth * 0.85, neurons: 4 }   // Output Layer
    ];

    let neurons = [];
    let connections = [];
    let activatedNeurons = new Set();
    let activatedConnections = new Set();

    function createGlowFilter() {
        let defs = document.createElementNS(svgNS, "defs");
        let filter = document.createElementNS(svgNS, "filter");
        filter.setAttribute("id", "glow");
        filter.setAttribute("x", "-50%");
        filter.setAttribute("y", "-50%");
        filter.setAttribute("width", "200%");
        filter.setAttribute("height", "200%");

        let gaussianBlur = document.createElementNS(svgNS, "feGaussianBlur");
        gaussianBlur.setAttribute("stdDeviation", "4");
        gaussianBlur.setAttribute("result", "blur");

        let merge = document.createElementNS(svgNS, "feMerge");
        let mergeNode1 = document.createElementNS(svgNS, "feMergeNode");
        mergeNode1.setAttribute("in", "blur");
        let mergeNode2 = document.createElementNS(svgNS, "feMergeNode");
        mergeNode2.setAttribute("in", "SourceGraphic");

        merge.appendChild(mergeNode1);
        merge.appendChild(mergeNode2);
        filter.appendChild(gaussianBlur);
        filter.appendChild(merge);
        defs.appendChild(filter);
        svg.appendChild(defs);
    }

    function createNeuralNetwork() {
        createGlowFilter();

        layers.forEach((layer, layerIndex) => {
            let layerNeurons = [];
            for (let i = 0; i < layer.neurons; i++) {
                let y = (window.innerHeight / (layer.neurons + 1)) * (i + 1);
                let neuron = document.createElementNS(svgNS, "circle");
                neuron.setAttribute("cx", layer.x);
                neuron.setAttribute("cy", y);
                neuron.setAttribute("r", 15);
                neuron.setAttribute("class", "neuron");
                neuron.style.fill = "rgba(255, 255, 255, 0)";
                neuron.style.stroke = "rgba(255, 102, 0, 0)";
                neuron.style.filter = "url(#glow)";
                svg.appendChild(neuron);
                layerNeurons.push({ x: layer.x, y, element: neuron });
            }
            neurons.push(layerNeurons);
        });

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
                    line.style.stroke = "rgba(255, 102, 0, 0)";
                    line.style.strokeWidth = "2";
                    line.style.filter = "url(#glow)";
                    svg.appendChild(line);
                    layerConnections.push({ from: fromNeuron, to: toNeuron, element: line });
                });
            });
            connections.push(layerConnections);
        }
    }

    function selectRandomConnections(layerConnections) {
        let total = layerConnections.length;
        let numToSelect = Math.ceil(total / 4); // Select 1/4
        let shuffled = [...layerConnections].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, numToSelect);
    }

    function resetNetwork() {
        activatedNeurons.clear();
        activatedConnections.clear();

        neurons.flat().forEach(n => {
            n.element.style.fill = "rgba(255, 255, 255, 0)";
            n.element.style.stroke = "rgba(255, 102, 0, 0)";
        });

        connections.flat().forEach(c => {
            c.element.style.stroke = "rgba(255, 102, 0, 0)";
            c.element.style.strokeWidth = "2";
        });
    }

    function animateSignal() {
        resetNetwork();

        let animationTimeline = gsap.timeline();

        let activeNeurons = new Set();

        neurons.forEach((layer, layerIndex) => {
            let selectedConnections = [];

            if (layerIndex === 0) {
                activeNeurons = new Set(layer);
            } else {
                selectedConnections = selectRandomConnections(connections[layerIndex - 1]);
                selectedConnections = selectedConnections.filter(conn => activeNeurons.has(conn.from));
                activeNeurons = new Set(selectedConnections.map(c => c.to));
            }

            activatedNeurons = new Set([...activatedNeurons, ...activeNeurons]);
            activatedConnections = new Set([...activatedConnections, ...selectedConnections]);

            animationTimeline.to(
                [...activeNeurons].map(n => n.element).concat(selectedConnections.map(c => c.element)), 
                {
                    fill: "#ffffff",
                    stroke: "#ff6600",
                    strokeWidth: 4,
                    duration: 1.5,
                    ease: "power1.inOut"
                }
            );

            animationTimeline.to(
                [...activeNeurons].map(n => n.element).concat(selectedConnections.map(c => c.element)), 
                {
                    fill: "#ff6600",
                    stroke: "#ffffff",
                    strokeWidth: 5,
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1
                }, "-=1.0"
            );
        });

        // Final Glow & Fade Out Only for Activated Elements
        animationTimeline.to(
            [...activatedNeurons].map(n => n.element).concat([...activatedConnections].map(c => c.element)), 
            {
                fill: "#ffffff",
                stroke: "#ffffff",
                strokeWidth: 6,
                duration: 1.0
            }
        );

        animationTimeline.to(
            [...activatedNeurons].map(n => n.element).concat([...activatedConnections].map(c => c.element)), 
            {
                fill: "rgba(255, 255, 255, 0)",
                stroke: "rgba(255, 102, 0, 0)",
                strokeWidth: 2,
                duration: 1.5,
                ease: "power2.in"
            }
        );

        animationTimeline.play().eventCallback("onComplete", animateSignal);
    }

    function initNeuralNetwork() {
        createNeuralNetwork();
        setTimeout(animateSignal, 1000);
    }

    initNeuralNetwork();
});
