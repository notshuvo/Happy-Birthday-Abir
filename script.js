const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiCount = 150;
const confetti = [];

function randomColor() {
  const colors = ["#ff0a54", "#ff477e", "#ff7096", "#ff85a1", "#fbb1bd", "#ffe066", "#70e000"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function ConfettiPiece() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height - canvas.height;
  this.radius = Math.random() * 6 + 4;
  this.color = randomColor();
  this.speed = Math.random() * 3 + 2;
  this.swing = Math.random() * 2;
  this.angle = 0;

  this.update = function () {
    this.y += this.speed;
    this.angle += 0.01;
    this.x += Math.sin(this.angle) * this.swing;

    if (this.y > canvas.height) {
      this.y = -10;
      this.x = Math.random() * canvas.width;
    }
  };

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
}

for (let i = 0; i < confettiCount; i++) {
  confetti.push(new ConfettiPiece());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((c) => {
    c.update();
    c.draw();
  });
  requestAnimationFrame(animate);
}

animate();