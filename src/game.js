class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.setCanvasSize();
        
        this.score = 0;
        this.scoreElement = document.getElementById('score');
        this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
        this.highScoreElement = document.getElementById('highScore');
        this.highScoreElement.textContent = `High Score: ${this.highScore}`;
        this.isGameOver = false;
        
        this.background = new Background(this.ctx);
        this.player = new Player(this.ctx);
        this.obstacleManager = new ObstacleManager(this.ctx);
        
        this.setupEventListeners();
        this.setupResizeHandler();
        this.gameLoop();
    }

    setCanvasSize() {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const isTablet = window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches;
        
        let baseWidth;
        if (isMobile) {
            baseWidth = 300;
        } else if (isTablet) {
            baseWidth = 600;
        } else {
            baseWidth = 800;
        }
        
        // Maintain original aspect ratio (800:300)
        const aspectRatio = 300/800;
        this.canvas.width = baseWidth;
        this.canvas.height = Math.floor(baseWidth * aspectRatio);
        
        // Update size-dependent constants
        const scale = baseWidth / 800; // Scale factor based on original width
        CANVAS_WIDTH = this.canvas.width;
        CANVAS_HEIGHT = this.canvas.height;
        GROUND_HEIGHT = Math.floor(30 * scale);
        GRAVITY = 0.5 * scale;
        JUMP_FORCE = -12 * scale;
        GAME_SPEED = 5 * scale;
    }

    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.setCanvasSize();
                this.background = new Background(this.ctx);
                this.obstacleManager.reset();
            }, 200);
        });
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

        // Touch controls
        this.canvas.addEventListener('touchstart', (event) => {
            if (this.isGameOver) {
                this.reset();
            } else {
                this.player.jump();
            }
            event.preventDefault();
        });

        // Mouse click controls
        this.canvas.addEventListener('click', (event) => {
            if (this.isGameOver) {
                this.reset();
            } else {
                this.player.jump();
            }
            event.preventDefault();
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
            this.ctx.fillText('Press Space or Click to Restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 40);
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
