class Player {
    constructor(ctx) {
        this.ctx = ctx;
        // Scale player size based on canvas size
        const scale = CANVAS_WIDTH / 800;
        this.width = Math.floor(60 * scale);
        this.height = Math.floor(50 * scale);
        this.x = Math.floor(50 * scale);
        this.y = CANVAS_HEIGHT - GROUND_HEIGHT - this.height;
        this.velocityY = 0;
        this.isJumping = false;
        this.sprite = new DogSprite(ctx);
    }

    jump(customJumpForce) {
        if (!this.isJumping) {
            // Use custom jump force if provided, otherwise use default
            this.velocityY = customJumpForce || JUMP_FORCE;
            this.isJumping = true;
        }
    }

    update() {
        // Apply gravity
        this.velocityY += GRAVITY;
        this.y += this.velocityY;

        // Ground collision
        if (this.y > CANVAS_HEIGHT - GROUND_HEIGHT - this.height) {
            this.y = CANVAS_HEIGHT - GROUND_HEIGHT - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }
    }

    draw() {
        this.sprite.draw(this.x, this.y, this.width, this.height, this.isJumping);
    }

    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}
