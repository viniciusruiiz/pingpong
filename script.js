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
    name: "",
    speed: 5,
    width: 100,
    height: 6,
    x: 350,
    y: 590 - 6
  }

  const ball = {

  }

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
  }


  const tickDuration = 1_000 / 60; // 60 FPS

  let lastTime  = performance.now();
  let delta = 0;

  function gameLoop() {
    const now = performance.now();
    delta += (now - lastTime) / tickDuration;
    lastTime = now;

    while (delta >= 1) {
      // console.log("tick");
      // console.log("render");
      if (keys.right) player1.x += player1.speed;
      if (keys.left) player1.x -= player1.speed;

      render();

      delta--;
    }

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
}

game();

// controles
