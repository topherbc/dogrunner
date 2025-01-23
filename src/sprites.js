class DogSprite {
    constructor(ctx) {
        this.ctx = ctx;
    }

    draw(x, y, width, height, isJumping) {
        // Body (more compact and sturdy)
        this.ctx.fillStyle = '#1a1a2e'; // Dark navy/black color
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + height * 0.75); // Lower bottom line for better proportions
        this.ctx.lineTo(x + width * 0.9, y + height * 0.75); // Slightly shorter body
        this.ctx.lineTo(x + width * 0.9, y + height * 0.15); // Higher top line
        this.ctx.lineTo(x, y + height * 0.15);
        this.ctx.closePath();
        this.ctx.fill();

        // Wiry fur texture effect
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + height * 0.7);
        for(let i = 0; i <= width * 0.9; i += width/12) { // More frequent, smaller waves
            this.ctx.quadraticCurveTo(
                x + i + width/24, y + height * 0.85,
                x + i + width/12, y + height * 0.7
            );
        }
        this.ctx.fill();

        // Additional fur texture on top
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + height * 0.2);
        for(let i = 0; i <= width * 0.9; i += width/10) {
            this.ctx.quadraticCurveTo(
                x + i + width/20, y + height * 0.15,
                x + i + width/10, y + height * 0.2
            );
        }
        this.ctx.fill();
        
        // Head with shorter snout
        this.ctx.beginPath();
        this.ctx.moveTo(x + width * 0.6, y);
        this.ctx.lineTo(x + width * 1.0, y);
        this.ctx.lineTo(x + width * 1.0, y + height * 0.3);
        this.ctx.lineTo(x + width * 0.6, y + height * 0.3);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Long flowing beard
        this.ctx.beginPath();
        this.ctx.moveTo(x + width * 0.9, y + height * 0.05);  // Start at snout
        this.ctx.lineTo(x + width * 1.3, y + height * 0.05);  // Top
        this.ctx.lineTo(x + width * 1.4, y + height * 0.3);   // Forward point
        this.ctx.lineTo(x + width * 1.3, y + height * 0.5);   // Extended bottom
        this.ctx.lineTo(x + width * 0.9, y + height * 0.3);   // Back to face
        this.ctx.closePath();
        this.ctx.fill();

        // Extended beard texture details
        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        for(let i = 0; i < 4; i++) {
            this.ctx.moveTo(x + width * (1.0 + i * 0.1), y + height * 0.1);
            this.ctx.lineTo(x + width * (1.1 + i * 0.1), y + height * 0.4);
        }
        this.ctx.stroke();
        this.ctx.lineWidth = 1;
        
        // Small erect ears
        this.ctx.beginPath();
        this.ctx.moveTo(x + width * 0.65, y);
        this.ctx.lineTo(x + width * 0.7, y - height * 0.2); // Shorter ears
        this.ctx.lineTo(x + width * 0.75, y);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.moveTo(x + width * 0.8, y);
        this.ctx.lineTo(x + width * 0.85, y - height * 0.2);
        this.ctx.lineTo(x + width * 0.9, y);
        this.ctx.fill();
        
        // Red collar (slightly thinner)
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(x + width * 0.55, y + height * 0.15, width * 0.45, height * 0.08);
        
        // Thicker carrot-shaped upright tail
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + height * 0.15);
        this.ctx.lineTo(x - width * 0.15, y - height * 0.1); // Tail tip
        this.ctx.lineTo(x - width * 0.3, y + height * 0.15);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Legs animation
        this.ctx.fillStyle = '#1a1a2e';
        if (isJumping) {
            // Tucked legs for jump
            // Shorter, stockier legs for jumping
            this.ctx.fillRect(x + width * 0.1, y + height * 0.5, width * 0.2, height * 0.15);
            this.ctx.fillRect(x + width * 0.6, y + height * 0.5, width * 0.2, height * 0.15);
        } else {
            // Running legs animation based on time - both legs moving
            const time = Date.now() / 100;
            const frontLegOffset = Math.sin(time) * 10;
            const backLegOffset = Math.sin(time + Math.PI) * 10; // Opposite phase
            // Shorter, stockier legs for running
            this.ctx.fillRect(x + width * 0.1, y + height * 0.5 + backLegOffset, width * 0.2, height * 0.2);
            this.ctx.fillRect(x + width * 0.6, y + height * 0.5 + frontLegOffset, width * 0.2, height * 0.2);
        }
    }
}

class ObstacleSprite {
    constructor(ctx) {
        this.ctx = ctx;
    }

    drawBush(x, y, width, height) {
        this.ctx.fillStyle = '#2D5A27';
        
        // Main bush body
        this.ctx.beginPath();
        this.ctx.arc(x + width/2, y + height/2, width/2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Additional details
        this.ctx.fillStyle = '#1E3D1C';
        this.ctx.beginPath();
        this.ctx.arc(x + width/3, y + height/3, width/4, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(x + width*2/3, y + height/2, width/4, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawBird(x, y, width, height, time) {
        // Bird body
        this.ctx.fillStyle = '#4A4A4A';
        this.ctx.beginPath();
        this.ctx.ellipse(x + width/2, y + height/2, width/2, height/3, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Wings animation
        const wingOffset = Math.sin(time/100) * height/4;
        
        // Left wing
        this.ctx.beginPath();
        this.ctx.moveTo(x + width/3, y + height/2);
        this.ctx.lineTo(x - width/4, y + height/2 + wingOffset);
        this.ctx.lineTo(x + width/3, y + height/2 + height/4);
        this.ctx.closePath();
        this.ctx.fill();

        // Right wing
        this.ctx.beginPath();
        this.ctx.moveTo(x + width*2/3, y + height/2);
        this.ctx.lineTo(x + width*5/4, y + height/2 + wingOffset);
        this.ctx.lineTo(x + width*2/3, y + height/2 + height/4);
        this.ctx.closePath();
        this.ctx.fill();

        // Head and beak
        this.ctx.beginPath();
        this.ctx.arc(x + width*3/4, y + height/3, height/4, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.moveTo(x + width, y + height/3);
        this.ctx.lineTo(x + width*5/4, y + height/3);
        this.ctx.lineTo(x + width, y + height/2);
        this.ctx.closePath();
        this.ctx.fill();
    }
}
