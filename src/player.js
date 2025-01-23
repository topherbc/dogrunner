class Player {
    constructor(ctx) {
        this.ctx = ctx;
        this.width = 60;
        this.height = 50;
        this.x = 50;
        this.y = CANVAS_HEIGHT - GROUND_HEIGHT - this.height;
        this.velocityY = 0;
        this.isJumping = false;
        this.sprite = new DogSprite(ctx);
    }

    jump() {
        if (!this.isJumping) {
            this.velocityY = JUMP_FORCE;
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
