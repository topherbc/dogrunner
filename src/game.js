class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        
        this.score = 0;
        this.scoreElement = document.getElementById('score');
        this.isGameOver = false;
        
        this.background = new Background(this.ctx);
        this.player = new Player(this.ctx);
        this.obstacleManager = new ObstacleManager(this.ctx);
        
        this.setupEventListeners();
        this.gameLoop();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                if (this.isGameOver) {
                    this.reset();
                } else {
                    this.player.jump();
                }
                event.preventDefault();
            }
        });
    }

    update() {
        if (this.isGameOver) return;

        this.background.update();
        this.player.update();
        this.obstacleManager.update();

        // Check for collision
        if (this.obstacleManager.checkCollision(this.player)) {
            this.gameOver();
        }

        // Update score
        this.score++;
        this.scoreElement.textContent = `Score: ${Math.floor(this.score / 10)}`;
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw background and ground
        this.background.draw();
        this.ctx.fillStyle = '#654321';
        this.ctx.fillRect(0, CANVAS_HEIGHT - GROUND_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT);

        // Draw game elements
        this.player.draw();
        this.obstacleManager.draw();

        // Draw game over text
        if (this.isGameOver) {
            this.ctx.fillStyle = 'black';
            this.ctx.font = '48px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Game Over', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
            this.ctx.font = '24px Arial';
            this.ctx.fillText('Press Space to Restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 40);
        }
    }

    gameOver() {
        this.isGameOver = true;
    }

    reset() {
        this.score = 0;
        this.isGameOver = false;
        this.background = new Background(this.ctx);
        this.player = new Player(this.ctx);
        this.obstacleManager.reset();
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Start the game when the page loads
window.addEventListener('load', () => {
    new Game();
});
