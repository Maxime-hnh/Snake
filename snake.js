const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const tileCount = canvas.width / gridSize;
const scoreDisplay = document.getElementById('score');
const startButton = document.querySelector('.start');
const modalContainer = document.querySelector('.modal_container');
const pauseButton = document.querySelector('.pause');
const newButton = document.querySelector('.new');
const logo = document.getElementById("logo");
let directionChanged = false;

let score = 0;
let loop = null;
let isPaused = false;

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
  directionChanged = false;
  const newHead = moveSnake();

  if (checkCollision(newHead)) {
    alert('Game Over. Score : ' + score);
    clearInterval(loop);
    return;
  }

  if (eatFood(newHead)) {
    score++
    scoreDisplay.textContent = 'Score : ' + score
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
  ctx.fillStyle = '#00FF00';
  for (let segment of snake) {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  }

  // Pomme (carré inversé)
  ctx.fillStyle = '#00ff005e';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

}

function pause() {
  if (loop !== null) {
    clearInterval(loop);
    loop = null;
    isPaused = true;
    console.log("Game paused");
  }
}
function start() {
  if (loop === null) {
    loop = setInterval(gameLoop, 100);
    isPaused = false;
  }
}

function newGame() {
  clearInterval(loop);
  score = 0;
  loop = null;
  isPaused = false;
  food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
  snake = [{ x: 10, y: 10 }];
  direction = 'right';
  start();
}


document.addEventListener('keydown', (e) => {
  if (directionChanged) return;

  if (e.key === 'ArrowRight' && direction !== 'left') {
    direction = 'right';
    directionChanged = true;
  }
  if (e.key === 'ArrowLeft' && direction !== 'right') {
    direction = 'left';
    directionChanged = true;
  }
  if (e.key === 'ArrowUp' && direction !== 'down') {
    direction = 'up';
    directionChanged = true;
  }
  if (e.key === 'ArrowDown' && direction !== 'up') {
    direction = 'down';
    directionChanged = true;
  }
  if (e.key === "p" || e.key === "P") !isPaused && pause();
  if (e.key === "s" || e.key === "S") isPaused && start();
});

startButton.addEventListener('click', () => {
  modalContainer.classList.remove('active')
  start();
});

newButton.addEventListener('click', () => {
  modalContainer.classList.remove('active')
  newGame();
})

pauseButton.addEventListener('click', () => {
  if (isPaused) {
    start();
    pauseButton.textContent = "Pause"
  } else {
    pause();
    pauseButton.textContent = "Start"
  }
})

logo.addEventListener('click', () => {
  window.open("https://maxime-huynh.vercel.app/fr", "_blank")
})