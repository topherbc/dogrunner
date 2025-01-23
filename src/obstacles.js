class Obstacle {
    constructor(ctx, x) {
        this.ctx = ctx;
        this.width = 40;
        this.x = x;
        this.sprite = new ObstacleSprite(ctx);
    }

    update() {
        this.x -= GAME_SPEED;
    }

    getBounds() {
        // This should be implemented by child classes
        throw new Error('getBounds must be implemented by child classes');
    }

    isOffScreen() {
        return this.x + this.width < 0;
    }
}

class BushObstacle extends Obstacle {
    constructor(ctx, x) {
        super(ctx, x);
        this.height = random(40, 60);
        this.y = CANVAS_HEIGHT - GROUND_HEIGHT - this.height;
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
}

class BirdObstacle extends Obstacle {
    constructor(ctx, x) {
        super(ctx, x);
        this.width = 50;
        this.height = 30;
        this.y = random(CANVAS_HEIGHT/3, CANVAS_HEIGHT/2);
        this.startY = this.y;
        this.time = 0;
    }

    update() {
        super.update();
        this.time += 1;
        // Add slight vertical movement
        this.y = this.startY + Math.sin(this.time/30) * 15;
    }

    draw() {
        this.sprite.drawBird(this.x, this.y, this.width, this.height, this.time);
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
            // Randomly choose between bush and bird obstacles
            if (Math.random() < 0.7) { // 70% chance for bush
                this.obstacles.push(new BushObstacle(this.ctx, CANVAS_WIDTH));
            } else { // 30% chance for bird
                this.obstacles.push(new BirdObstacle(this.ctx, CANVAS_WIDTH));
            }
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
