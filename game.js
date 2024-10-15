const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player object
const player = {
  x: 50,
  y: canvas.height - 100,
  width: 50,
  height: 50,
  color: 'white',
  speed: 5,
  gravity: 0.8,
  jumpStrength: -15,
  velocityY: 0,
  jumping: false
};

// Floor object
const floor = {
  x: 0,
  y: canvas.height - 50,
  width: canvas.width,
  height: 50,
  color: 'green'
};

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw floor
  ctx.fillStyle = floor.color;
  ctx.fillRect(floor.x, floor.y, floor.width, floor.height);

  // Gravity and jumping mechanics
  if (player.y + player.height < floor.y) {
    player.velocityY += player.gravity;
    player.jumping = true;
  } else {
    player.velocityY = 0;
    player.jumping = false;
  }

  player.y += player.velocityY;

  // Move right
  player.x += player.speed;

  // Loop the player horizontally
  if (player.x > canvas.width) {
    player.x = 0 - player.width;
  }

  requestAnimationFrame(gameLoop);
}

// Jump function
function jump() {
  if (!player.jumping) {
    player.velocityY = player.jumpStrength;
    player.jumping = true;
  }
}

// Key event listeners
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    jump();
  }
});

// Start the game
gameLoop();
