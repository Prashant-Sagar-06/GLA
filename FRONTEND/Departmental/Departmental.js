// ----------------- Typewriter Effect -----------------
const text = "Welcome to GLA University Deaprtmental Clubs!";
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

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('/api/departmental-clubs');
        if (!res.ok) throw new Error('Failed to fetch departmental clubs');
        let clubs = await res.json();

        clubs = clubs.filter(club => club.name && club.name !== "undefined");

        document.getElementById('clubs-row').innerHTML = clubs.map(club => `
            <div class="card">
                <a href="D-Club/${club.link}"><img src="${club.image}" alt="${club.name}"></a>
                <h3>${club.name}</h3>
                <p>${club.description}</p>
            </div>
        `).join('');
    } catch (err) {
        document.getElementById('clubs-row').innerHTML = "<p>Unable to load departmental clubs. Please try again later.</p>";
        console.error(err);
    }
});