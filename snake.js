const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const tileCount = canvas.width / gridSize;
const loop = setInterval(gameLoop, 100);

let score = 0;
let food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };

let snake = [{ x: 10, y: 10 }];
let direction = 'right';


function spawnFood() {
  food.x = Math.floor(Math.random() * tileCount);
  food.y = Math.floor(Math.random() * tileCount);
}

function moveSnake() {
  let head = snake[0];
  let newHead = { x: head.x, y: head.y };

  if (direction === 'right') newHead.x++;
  if (direction === 'left') newHead.x--;
  if (direction === 'up') newHead.y--;
  if (direction === 'down') newHead.y++;

  snake.unshift(newHead);  //insert newHead at index[0]

  return newHead;  //used to check collision
}

function checkCollision(head) {
  // Mur
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    return true;
  }
  // Corps
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function eatFood(head) {
  if (head.x === food.x && head.y === food.y) {
    return true;
  }
  return false;
}

function gameLoop() {
  const newHead = moveSnake();

  if (checkCollision(newHead)) {
    alert('Game Over. Score : ' + score);
    clearInterval(loop);
    return;
  }

  if (eatFood(newHead)) {
    score++;
    spawnFood();
  } else {
    snake.pop(); //Removes the last element from an array and returns it
  }

  draw();
}

function draw() {
  // Fond noir
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Serpent vert (plus clair)
  ctx.fillStyle = '#8750f7';
  for (let segment of snake) {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  }

  // Pomme (carré inversé)
  ctx.fillStyle = '#8750f76e';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  // Texte score en pixel font
  ctx.fillStyle = '#8750f7';
  ctx.font = '12px monospace';
  ctx.fillText('Score: ' + score, 10, 20);
}


// Direction sécurisée (évite de se retourner sur soi-même)
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
  if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
  if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
  if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
});

