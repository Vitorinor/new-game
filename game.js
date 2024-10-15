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

// Obstacle array and spawn function
let obstacles = [];

function spawnObstacle() {
  const obstacle = {
    x: canvas.width, // Start just outside the canvas
    y: floor.y - 50, // On the floor
    width: 50,
    height: 50,
    color: 'red',
    speed: 7 // Move left at a constant speed
  };
  obstacles.push(obstacle);
}

// Update and draw obstacles
function updateObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];

    // Move the obstacle to the left
    obstacle.x -= obstacle.speed;

    // Draw the obstacle
    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    // Remove the obstacle if it moves off-screen
    if (obstacle.x + obstacle.width < 0) {
      obstacles.splice(i, 1); // Remove obstacle from array
      i--; // Adjust loop counter after removal
    }
  }
}

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

  // Move player right
  player.x += player.speed;

  // Loop player horizontally
  if (player.x > canvas.width) {
    player.x = 0 - player.width;
  }

  // Update obstacles
  updateObstacles();

  // Loop the game
  requestAnimationFrame(gameLoop);
}

// Jump function
function jump() {
  if (!player.jumping) {
    player.velocityY = player.jumpStrength;
    player.jumping = true;
  }
}

// Spawn obstacles every 2 seconds
setInterval(spawnObstacle, 2000);

// Key event listeners for jumping
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    jump();
  }
});

// Start the game
gameLoop();
