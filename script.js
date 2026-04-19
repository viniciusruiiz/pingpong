//controles
const keys = {
  right: false,
  left: false
};

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") keys.right = true;
  if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") keys.left = true;
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") keys.right = false;
  if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") keys.left = false;
});


//game
const game = () => {
  const canvas = document.querySelector("#game");
  const ctx = canvas.getContext("2d");

  const player1 = {
    speed: 5,
    width: 100,
    height: 6,
    x: 350,
    y: 590 - 6
  }

  const ball = {
    speed: 5,
    r: 5,
    x: 395,
    y: 295,
    degrees: 96 //entre 30 e 150
  }

  ball.degrees = Math.floor(Math.random() * 120) + 30;

  let direction = "DOWN"; // UP or DOWN

  const ballPosition = () => {
    const radians = ball.degrees * (Math.PI / 180);

    if(direction === "UP") {
      ball.x += Math.cos(radians) * ball.speed;
      ball.y -= Math.sin(radians) * ball.speed;
    } else {
      ball.x += Math.cos(radians) * ball.speed;
      ball.y += Math.sin(radians) * ball.speed;
    }
  }

  const ballCollision = () => {
    if (ball.x - ball.r < 0 || ball.x + ball.r > canvas.width) {
      ball.degrees = 180 - ball.degrees;
    }
    
    if (ball.y + ball.r > player1.y
      && ball.x > player1.x 
      && ball.x < player1.x + player1.width 
    ) {
      direction = "UP";
    }

    // LOGICA ENQUANTO AINDA É SO 1 PLAYER
    if (ball.y - ball.r < 0) {
      direction = "DOWN";
    }
  }

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
  }


  const tickDuration = 1_000 / 60; // 60 FPS

  let lastTime = performance.now();
  let delta = 0;

  function gameLoop() {
    const now = performance.now();
    delta += (now - lastTime) / tickDuration;
    lastTime = now;

    while (delta >= 1) {
      // console.log("tick");
      // console.log("render");
      if (keys.right && player1.x < canvas.width - player1.width - 10) player1.x += player1.speed;
      if (keys.left && player1.x > 10) player1.x -= player1.speed;

      ballPosition();
      ballCollision();

      render();

      delta--;
    }

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
}

game();

// controles
