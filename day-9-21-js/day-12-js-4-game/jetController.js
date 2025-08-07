// Jet image
const jetImg = new Image();
let jetFlipped = false;        // true = upside down
let flipTarget = 1;            // Target scaleY (1 = normal, -1 = flipped)
let flipProgress = 1;          // Current scaleY, used for smooth animation
const flipSpeed = 0.1;         // Flip animation speed
let flipHandled = false;       // Prevent multiple flips while holding W

jetImg.src = "./assets/jet.png"; // Use your jet image URL

const jet = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 120,
  width: 140,
  height: 120,
  speed: 8,
  rotation: 0
};

// Keys
const keys = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
  Space: false,
  KeyW: false,
  FlipHandled: false // prevents repeat flipping while holding
};

// Bullets
const bullets = [];

class Bullet {
  constructor(x, y,direction) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.speed = 10;
    this.direction = direction;
  }

 update() {

  this.y -= this.speed * this.direction;
}



  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
  }
}

function shootBullet() {
  const direction = jetFlipped ? -1 : 1;
  const bulletX = jet.x + jet.width / 2;
  const bulletY = jetFlipped
    ? jet.y + jet.height    // Bottom when flipped
    : jet.y;                // Top when normal

  bullets.push(new Bullet(bulletX, bulletY, direction));
}


// Handle Input
document.addEventListener("keydown", (e) => {
  if (e.code in keys) {
    keys[e.code] = true;
  }

  // Flip jet with W key
  if (e.code === "KeyW" && !flipHandled) {
    jetFlipped = !jetFlipped;
    flipTarget = jetFlipped ? -1 : 1;
    flipHandled = true;
  }

  if (e.code === "Space") {
    shootBullet();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code in keys) {
    keys[e.code] = false;
  }

  if (e.code === "KeyW") {
    flipHandled = false;
  }
});


document.addEventListener("keyup", (e) => {
  if (e.code in keys) {
    keys[e.code] = false;
  }

  if (e.code === "KeyW") {
    keys.FlipHandled = false; // allow next flip
  }
});


// Draw Jet
function drawJet() {
  ctx.save();

  // Animate flip scaleY
  flipProgress += (flipTarget - flipProgress) * flipSpeed;

  // Shadow
  ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
  ctx.shadowBlur = 25;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;

  // Move to jet center, scale, rotate, draw
  ctx.translate(jet.x + jet.width / 2, jet.y + jet.height / 2);
  ctx.scale(1, flipProgress);  // Vertical flip animation
  ctx.rotate(jet.rotation);
  ctx.drawImage(jetImg, -jet.width / 2, -jet.height / 2, jet.width, jet.height);

  ctx.restore();
}

flipProgress += (flipTarget - flipProgress) * flipSpeed; // Smooth flip every frame

// Extend the main animation
externalAnimateExtension = function () {
  // Move Jet
  
// Move Jet (including up/down)
if (keys.ArrowLeft && jet.x > 0) jet.x -= jet.speed;
if (keys.ArrowRight && jet.x + jet.width < canvas.width) jet.x += jet.speed;
if (keys.ArrowUp && jet.y > 0) jet.y -= jet.speed;
if (keys.ArrowDown && jet.y + jet.height < canvas.height) jet.y += jet.speed;

// Rotation visual effect (optional)
if (keys.ArrowLeft) jet.rotation = -0.2;
else if (keys.ArrowRight) jet.rotation = 0.2;
else jet.rotation = 0;


  drawJet();

  bullets.forEach((b, i) => {
  b.update();
  b.draw();
  if (b.y < 0 || b.y > canvas.height) {
    bullets.splice(i, 1);
  }
});

};
