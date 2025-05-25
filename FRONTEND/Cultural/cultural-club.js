// ----------------- Typewriter Effect -----------------
const typewriter = document.getElementById("typewriter");
const text = "Welcome to GLA University Cultural Clubs!";

let index = 0;
let isDeleting = false;

function typeEffect() {
    if (!typewriter) return; // Prevent error if element not found
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

if (typewriter) typeEffect();

// ----------------- Dynamic Club Cards -----------------
document.addEventListener('DOMContentLoaded', async () => {
    const res = await fetch('http://localhost:5000/api/cultural-clubs');
    let clubs = await res.json();

    // 1. Remove any club with undefined name
    clubs = clubs.filter(club => club.name && club.name !== "undefined");

    // 2. Move "GLA Media Scoop" to the first position
    const mediaScoopIndex = clubs.findIndex(club => club.name.trim().toLowerCase() === "gla media scoop");
    if (mediaScoopIndex > -1) {
        const [mediaScoop] = clubs.splice(mediaScoopIndex, 1);
        clubs.unshift(mediaScoop);
    }

    document.getElementById('clubs-row').innerHTML = clubs.map(club => `
        <div class="card">
            <a href="Cultural/C-Club/${club.link}"><img src="${club.image}" alt="${club.name}"></a>
            <h3>${club.name}</h3>
            <p>${club.description}</p>
        </div>
    `).join('');
});