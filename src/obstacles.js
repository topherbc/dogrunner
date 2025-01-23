class Obstacle {
    constructor(ctx, x) {
        this.ctx = ctx;
        this.width = 40;
        this.height = random(40, 60);
        this.x = x;
        this.y = CANVAS_HEIGHT - GROUND_HEIGHT - this.height;
        this.sprite = new ObstacleSprite(ctx);
    }

    update() {
        this.x -= GAME_SPEED;
    }

    draw() {
        this.sprite.drawBush(this.x, this.y, this.width, this.height);
    }

    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }

    isOffScreen() {
        return this.x + this.width < 0;
    }
}

class ObstacleManager {
    constructor(ctx) {
        this.ctx = ctx;
        this.obstacles = [];
        this.spawnTimer = 0;
        this.spawnInterval = 60;
    }

    update() {
        this.spawnTimer++;
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnTimer = 0;
            this.obstacles.push(new Obstacle(this.ctx, CANVAS_WIDTH));
        }

        this.obstacles.forEach(obstacle => obstacle.update());
        this.obstacles = this.obstacles.filter(obstacle => !obstacle.isOffScreen());
    }

    draw() {
        this.obstacles.forEach(obstacle => obstacle.draw());
    }

    checkCollision(player) {
        return this.obstacles.some(obstacle => 
            detectCollision(player.getBounds(), obstacle.getBounds())
        );
    }

    reset() {
        this.obstacles = [];
        this.spawnTimer = 0;
    }
}
