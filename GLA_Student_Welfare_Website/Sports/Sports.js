// ----------------- Typewriter Effect -----------------
const text = "Welcome to GLA University Sports Clubs!";
const typewriter = document.getElementById("typewriter");

let index = 0;
let isDeleting = false;

function typeEffect() {
    if (!isDeleting) {
        typewriter.textContent = text.substring(0, index + 1);
        index++;
        if (index === text.length) {
            setTimeout(() => { isDeleting = true; }, 1000);
        }
    } else {
        typewriter.textContent = text.substring(0, index - 1);
        index--;
        if (index === 0) {
            isDeleting = false;
        }
    }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();