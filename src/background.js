class Background {
    constructor(ctx) {
        this.ctx = ctx;
        this.layers = [
            { speed: 0.5, elements: [], color: '#6B8E23' },  // Far trees
            { speed: 1, elements: [], color: '#556B2F' }     // Near trees
        ];
        
        // Initialize background elements
        this.initializeElements();
    }

    initializeElements() {
        // Far trees
        for (let i = 0; i < 3; i++) {
            this.layers[0].elements.push({
                x: i * 400,
                width: 100,
                height: random(80, 120)
            });
        }
        
        // Near trees
        for (let i = 0; i < 4; i++) {
            this.layers[1].elements.push({
                x: i * 300,
                width: 80,
                height: random(100, 150)
            });
        }
    }

    update() {
        // Update each layer
        this.layers.forEach(layer => {
            // Move elements
            layer.elements.forEach(element => {
                element.x -= layer.speed;
                
                // If element moves off screen, move it to the end
                if (element.x + element.width < 0) {
                    const lastElement = layer.elements[layer.elements.length - 1];
                    element.x = lastElement.x + 300 + random(-50, 50);
                    element.height = random(80, 150);
                }
            });
        });
    }

    drawTree(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        
        // Tree trunk
        this.ctx.fillRect(x + width/3, y + height/2, width/3, height/2);
        
        // Tree crown
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + height/2);
        this.ctx.lineTo(x + width/2, y);
        this.ctx.lineTo(x + width, y + height/2);
        this.ctx.closePath();
        this.ctx.fill();
    }

    draw() {
        // Draw sky gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT - GROUND_HEIGHT);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#B0E0E6');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_HEIGHT);

        // Draw each layer
        this.layers.forEach(layer => {
            layer.elements.forEach(element => {
                this.drawTree(
                    element.x,
                    CANVAS_HEIGHT - GROUND_HEIGHT - element.height,
                    element.width,
                    element.height,
                    layer.color
                );
            });
        });
    }
}
