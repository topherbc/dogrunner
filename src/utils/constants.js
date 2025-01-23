// Base values for desktop size (800x300)
const BASE_WIDTH = 800;
const BASE_HEIGHT = 300;

// Calculate responsive canvas size
let CANVAS_WIDTH = Math.min(window.innerWidth - 40, BASE_WIDTH);
let CANVAS_HEIGHT = Math.max(CANVAS_WIDTH * 0.375, 200); // Maintain aspect ratio with min height
let GROUND_HEIGHT = CANVAS_HEIGHT * 0.1; // 10% of height

// Scale physics based on canvas size
let scale = CANVAS_WIDTH / BASE_WIDTH;
let GRAVITY = 0.5 * scale;
let JUMP_FORCE = -12 * scale;
let GAME_SPEED = 8 * scale;

// Update dimensions on resize
window.addEventListener('resize', () => {
    CANVAS_WIDTH = Math.min(window.innerWidth - 40, BASE_WIDTH);
    CANVAS_HEIGHT = Math.max(CANVAS_WIDTH * 0.375, 200);
    GROUND_HEIGHT = CANVAS_HEIGHT * 0.1;
    scale = CANVAS_WIDTH / BASE_WIDTH;
    GRAVITY = 0.5 * scale;
    JUMP_FORCE = -12 * scale;
    GAME_SPEED = 8 * scale;
    
    // Update canvas size
    const canvas = document.getElementById('gameCanvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
});
