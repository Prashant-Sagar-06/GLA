// Zoom Controls
let zoomLevel = 1;
const body = document.body;

document.getElementById('zoom-in').addEventListener('click', () => {
  zoomLevel += 0.1;
  body.style.transform = `scale(${zoomLevel})`;
  body.style.transformOrigin = 'top left';
});

document.getElementById('zoom-out').addEventListener('click', () => {
  zoomLevel = Math.max(0.5, zoomLevel - 0.1);
  body.style.transform = `scale(${zoomLevel})`;
  body.style.transformOrigin = 'top left';
});

document.getElementById('reset').addEventListener('click', () => {
  zoomLevel = 1;
  body.style.transform = 'scale(1)';
});

// Typewriter Effect
const text = "Welcome to GLA University Cultural Clubs!";
const typewriter = document.getElementById("typewriter");
let index = 0;

function typeEffect() {
  if (index < text.length) {
    typewriter.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, 100);
  }
}
typeEffect();
