class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        
        this.score = 0;
        this.touchStartTime = 0;
        this.scoreElement = document.getElementById('score');
        this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
        this.highScoreElement = document.getElementById('highScore');
        this.highScoreElement.textContent = `High Score: ${this.highScore}`;
        this.isGameOver = false;
        
        this.background = new Background(this.ctx);
        this.player = new Player(this.ctx);
        this.obstacleManager = new ObstacleManager(this.ctx);
        
        this.setupEventListeners();
        this.gameLoop();
    }

    setupEventListeners() {
        // Keyboard controls
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

        // Touch and mouse controls with high/low jumps
        const handleTouchStart = (event) => {
            event.preventDefault();
            if (this.isGameOver) {
                this.reset();
            } else {
                this.touchStartTime = Date.now();
            }
        };

        const handleTouchEnd = (event) => {
            event.preventDefault();
            if (!this.isGameOver) {
                const touchDuration = Date.now() - this.touchStartTime;
                // Long press (>200ms) for high jump, short press for low jump
                const jumpForce = touchDuration > 200 ? JUMP_FORCE * 1.3 : JUMP_FORCE * 0.7;
                this.player.jump(jumpForce);
            }
        };

        // Touch events
        this.canvas.addEventListener('touchstart', handleTouchStart);
        this.canvas.addEventListener('touchend', handleTouchEnd);

        // Mouse events
        this.canvas.addEventListener('mousedown', handleTouchStart);
        this.canvas.addEventListener('mouseup', handleTouchEnd);
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
            this.ctx.font = `${Math.floor(CANVAS_WIDTH * 0.06)}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Game Over', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
            
            this.ctx.font = `${Math.floor(CANVAS_WIDTH * 0.03)}px Arial`;
            if (window.matchMedia('(max-width: 767px)').matches) {
                this.ctx.fillText('Tap to Restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + CANVAS_HEIGHT * 0.1);
                this.ctx.fillText('Quick tap = Low Jump', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + CANVAS_HEIGHT * 0.2);
                this.ctx.fillText('Long tap = High Jump', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + CANVAS_HEIGHT * 0.3);
            } else {
                this.ctx.fillText('Press Space or Click to Restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + CANVAS_HEIGHT * 0.1);
            }
        }
    }

    gameOver() {
        this.isGameOver = true;
        const finalScore = Math.floor(this.score / 10);
        if (finalScore > this.highScore) {
            this.highScore = finalScore;
            localStorage.setItem('highScore', this.highScore);
            this.highScoreElement.textContent = `High Score: ${this.highScore}`;
        }
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
