// ----------------- Typewriter Effect -----------------
const typewriterText = "Welcome to GLA University Departmental Clubs!";
const typewriter = document.getElementById("typewriter");
let typeIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typewriter) return;

  if (!isDeleting) {
    typewriter.textContent = typewriterText.substring(0, typeIndex + 1);
    typeIndex++;
    if (typeIndex === typewriterText.length) {
      setTimeout(() => {
        isDeleting = true;
        typeEffect();
      }, 1000);
      return;
    }
  } else {
    typewriter.textContent = typewriterText.substring(0, typeIndex - 1);
    typeIndex--;
    if (typeIndex === 0) {
      isDeleting = false;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

// ----------------- Zoom Controls -----------------
let zoomLevel = 1;
const body = document.body;

document.getElementById('zoom-in')?.addEventListener('click', () => {
  zoomLevel += 0.1;
  body.style.transform = `scale(${zoomLevel})`;
  body.style.transformOrigin = 'top left';
});

document.getElementById('zoom-out')?.addEventListener('click', () => {
  zoomLevel = Math.max(0.5, zoomLevel - 0.1);
  body.style.transform = `scale(${zoomLevel})`;
  body.style.transformOrigin = 'top left';
});

document.getElementById('reset')?.addEventListener('click', () => {
  zoomLevel = 1;
  body.style.transform = 'scale(1)';
  body.style.transformOrigin = 'top left';
});
