class DogSprite {
    constructor(ctx) {
        this.ctx = ctx;
    }

    draw(x, y, width, height, isJumping) {
        // Body (more rectangular)
        this.ctx.fillStyle = '#1a1a2e'; // Dark navy/black color
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + height * 0.8);
        this.ctx.lineTo(x + width, y + height * 0.8);
        this.ctx.lineTo(x + width, y + height * 0.1);
        this.ctx.lineTo(x, y + height * 0.1);
        this.ctx.closePath();
        this.ctx.fill();

        // Enhanced wavy bottom fur effect
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + height * 0.8);
        for(let i = 0; i <= width; i += width/8) {
            this.ctx.quadraticCurveTo(
                x + i + width/16, y + height * 0.95,
                x + i + width/8, y + height * 0.8
            );
        }
        this.ctx.fill();
        
        // Head with extended snout
        this.ctx.beginPath();
        this.ctx.moveTo(x + width * 0.55, y - height * 0.1);
        this.ctx.lineTo(x + width * 1.1, y - height * 0.1);
        this.ctx.lineTo(x + width * 1.1, y + height * 0.2);
        this.ctx.lineTo(x + width * 0.55, y + height * 0.2);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Large prominent beard
        this.ctx.beginPath();
        // Main beard shape
        this.ctx.moveTo(x + width * 0.9, y - height * 0.05);  // Start at snout
        this.ctx.lineTo(x + width * 1.6, y - height * 0.05);  // Extended top
        this.ctx.lineTo(x + width * 1.8, y + height * 0.2);   // Far forward point
        this.ctx.lineTo(x + width * 1.6, y + height * 0.35);  // Extended bottom
        this.ctx.lineTo(x + width * 0.9, y + height * 0.25);  // Back to face
        this.ctx.closePath();
        this.ctx.fill();

        // Layered beard details for depth
        this.ctx.beginPath();
        this.ctx.moveTo(x + width * 1.2, y);
        this.ctx.lineTo(x + width * 1.5, y + height * 0.1);
        this.ctx.lineTo(x + width * 1.4, y + height * 0.25);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.moveTo(x + width * 1.3, y + height * 0.05);
        this.ctx.lineTo(x + width * 1.6, y + height * 0.15);
        this.ctx.lineTo(x + width * 1.5, y + height * 0.3);
        this.ctx.fill();
        
        // More prominent pointed ears
        this.ctx.beginPath();
        this.ctx.moveTo(x + width * 0.65, y - height * 0.1);
        this.ctx.lineTo(x + width * 0.75, y - height * 0.35);
        this.ctx.lineTo(x + width * 0.85, y - height * 0.1);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.moveTo(x + width * 0.85, y - height * 0.1);
        this.ctx.lineTo(x + width * 0.95, y - height * 0.35);
        this.ctx.lineTo(x + width * 1.05, y - height * 0.1);
        this.ctx.fill();
        
        // Red collar (slightly thinner)
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(x + width * 0.55, y + height * 0.15, width * 0.45, height * 0.08);
        
        // Upright tail (slightly thicker)
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(x - width * 0.12, y, width * 0.25, height * 0.5);
        
        // Legs animation
        this.ctx.fillStyle = '#1a1a2e';
        if (isJumping) {
            // Tucked legs for jump
            this.ctx.fillRect(x + width * 0.1, y + height * 0.5, width * 0.15, height * 0.2);
            this.ctx.fillRect(x + width * 0.7, y + height * 0.5, width * 0.15, height * 0.2);
        } else {
            // Running legs animation based on time - both legs moving
            const time = Date.now() / 100;
            const frontLegOffset = Math.sin(time) * 10;
            const backLegOffset = Math.sin(time + Math.PI) * 10; // Opposite phase
            this.ctx.fillRect(x + width * 0.1, y + height * 0.5 + backLegOffset, width * 0.15, height * 0.3);
            this.ctx.fillRect(x + width * 0.7, y + height * 0.5 + frontLegOffset, width * 0.15, height * 0.3);
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
}
