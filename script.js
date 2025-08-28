let snake, food, dx, dy, score, gameLoop, speed;
let gamePassword = "";

fetch("password.txt")
  .then(response => response.text())
  .then(text => {
    gamePassword = text.trim();
    if (gamePassword === "") {
      document.getElementById("passwordScreen").style.display = "none";
      document.getElementById("difficultyScreen").style.display = "block";
    }
  });

function checkPassword() {
  let input = document.getElementById("passwordInput").value.trim();
  if (input === gamePassword) {
    document.getElementById("passwordScreen").style.display = "none";
    document.getElementById("difficultyScreen").style.display = "block";
  } else {
    document.getElementById("passwordError").innerText = "Incorrect!";
  }
}

function startGame(difficulty) {
  document.getElementById("difficultyScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  let canvas = document.getElementById("gameCanvas");
  let ctx = canvas.getContext("2d");

  snake = [{x: 200, y: 200}];
  food = {x: 100, y: 100};
  dx = 20; dy = 0;
  score = 0;
  document.getElementById("score").innerText = score;

  if (difficulty === "easy") speed = 200;
  if (difficulty === "medium") speed = 120;
  if (difficulty === "hard") speed = 80;

  if (gameLoop) clearInterval(gameLoop);
  gameLoop = setInterval(draw, speed);

  document.addEventListener("keydown", changeDirection);

  function draw() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "lime";
    snake.forEach(part => ctx.fillRect(part.x, part.y, 20, 20));

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 20, 20);

    let head = {x: snake[0].x + dx, y: snake[0].y + dy};
    if (head.x < 0) head.x = canvas.width - 20;
    else if (head.x >= canvas.width) head.x = 0;
    if (head.y < 0) head.y = canvas.height - 20;
    else if (head.y >= canvas.height) head.y = 0;

    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        gameOver();
        return;
      }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score++;
      document.getElementById("score").innerText = score;
      food = {
        x: Math.floor(Math.random() * canvas.width / 20) * 20,
        y: Math.floor(Math.random() * canvas.height / 20) * 20
      };
    } else {
      snake.pop();
    }
  }
}

function changeDirection(event) {
  if (event.key === "ArrowUp" && dy === 0) {dx = 0; dy = -20;}
  else if (event.key === "ArrowDown" && dy === 0) {dx = 0; dy = 20;}
  else if (event.key === "ArrowLeft" && dx === 0) {dx = -20; dy = 0;}
  else if (event.key === "ArrowRight" && dx === 0) {dx = 20; dy = 0;}
}

function gameOver() {
  clearInterval(gameLoop);
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("finalScore").innerText = score;
  document.getElementById("gameOverScreen").style.display = "block";
}

function goToDifficulty() {
  document.getElementById("gameOverScreen").style.display = "none";
  document.getElementById("difficultyScreen").style.display = "block";
}
