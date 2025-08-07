
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Cloud image
const cloudImg = new Image();
cloudImg.src = "./assets/cloud.png";

// Cloud object
class Cloud {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.speed = 0.5 + Math.random();
    this.size = 100 + Math.random() * 100;
  }

  update() {
    this.x -= this.speed;
    if (this.x + this.size < 0) {
      this.x = canvas.width;
      this.y = Math.random() * canvas.height;
    }
    ctx.drawImage(cloudImg, this.x, this.y, this.size, this.size * 0.6);
  }
}

const clouds = [];
for (let i = 0; i < 10; i++) {
  clouds.push(new Cloud());
}

function drawBackgroundGradient() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#001f3f");
  gradient.addColorStop(1, "#0074D9");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function drawLightingEffect() {
  const lighting = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 3,
    50,
    canvas.width / 2,
    canvas.height / 3,
    600
  );
  lighting.addColorStop(0, "rgba(255, 255, 255, 0.1)");
  lighting.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = lighting;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function baseAnimationStep() {
  drawBackgroundGradient();
  drawLightingEffect();
  clouds.forEach((cloud) => cloud.update());
}

// Allow jetController.js to override animation loop
let externalAnimateExtension = () => {};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  baseAnimationStep();
  externalAnimateExtension(); // call external logic like jet and bullets
  requestAnimationFrame(animate);
}

cloudImg.onload = () => {
  animate();
};
