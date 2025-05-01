// type Position = {
//   x: number;
//   y: number;
// }

// enum Direction {
//   UP = "up",
//   DOWN = "down",
//   RIGHT = "right",
//   LEFT = "left"
// }

// const canvas = document.getElementById('game') as HTMLCanvasElement;
// const ctx = canvas.getContext('2d')!;

// let score: number = 0;
// let food: Position = { x: 15, y: 15 };

// let snake: Position[] = [{ x: 10, y: 10 }];
// let direction: Direction = Direction.RIGHT;

// const gridSize: number = 20;
// const tileCount: number = canvas.width / gridSize;
// const loop: number = setInterval(gameLoop, 200);

// function spawnFood(): void {
//   food.x = Math.floor(Math.random() * tileCount);
//   food.y = Math.floor(Math.random() * tileCount);
// };

// function moveSnake(): Position {
//   let newHead = snake[0];

//   if (direction === Direction.RIGHT) newHead.x++;
//   if (direction === Direction.LEFT) newHead.x--;
//   if (direction === Direction.UP) newHead.y++;
//   if (direction === Direction.DOWN) newHead.y--;

//   snake.unshift(newHead) //insert newHead at index[0]
//   return newHead; //used to check collision
// }

// function eatFood(head: Position): boolean {
//   if (head.x === food.x && head.y === food.y) {
//     return true;
//   }
//   return false;
// }

// function checkCollision(newHead: Position): boolean {
//   //wall 
//   if (newHead.x < 0 || newHead.x >= tileCount && newHead.y < 0 || newHead.y >= tileCount) {
//     return true;
//   }
//   //snake body
//   for (let i = 1; i < snake.length; i++) {
//     if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
//       return true;
//     }
//   }
//   return false;
// }

// function gameLoop() {
//   const newHead = moveSnake();
//   if (eatFood(newHead)) {
//     score++;
//     spawnFood();
//   } else {
//     snake.pop(); //Removes the last element from an array and returns it
//   }

//   if (checkCollision(newHead)) {
//     alert('Game Over. Score : ' + score);
//     clearInterval(loop);
//     return;
//   }
//   draw()
// }

// function draw() {
//   // Fond noir
//   ctx.fillStyle = '#000000';
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

//   // Serpent vert (plus clair)
//   ctx.fillStyle = '#00FF00';
//   for (let segment of snake) {
//     ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
//   }

//   // Pomme (carré inversé)
//   ctx.fillStyle = '#004400';
//   ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

//   // Texte score en pixel font
//   ctx.fillStyle = '#00FF00';
//   ctx.font = '16px monospace';
//   ctx.fillText('Score: ' + score, 10, 20);
// }

// document.addEventListener('keydown', (event) => {
//   if (event.key === 'ArrowRight' && direction !== Direction.LEFT) direction = Direction.RIGHT;
//   if (event.key === 'ArrowLeft' && direction !== Direction.RIGHT) direction = Direction.LEFT;
//   if (event.key === 'ArrowUp' && direction !== Direction.DOWN) direction = Direction.UP;
//   if (event.key === 'ArrowDown' && direction !== Direction.UP) direction = Direction.DOWN;
// });
