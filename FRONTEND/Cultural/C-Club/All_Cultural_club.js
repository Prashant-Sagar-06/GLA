// ----------------- Typewriter Effect -----------------
const text = "Welcome to GLA University Cultural Clubs!";
const typewriter = document.getElementById("typewriter");

let index = 0;
let isDeleting = false;

function typeEffect() {
    if (!typewriter) return;
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

// ----------------- Smooth Scrolling -----------------
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}

function plusSlides(n) {
    slideIndex += n - 1; // Reset auto cycle
    showSlides();
}

// ----------------- Fetch Club Details -----------------
document.addEventListener('DOMContentLoaded', async () => {
    const clubKey = document.body.getAttribute('data-club-key');
    if (!clubKey) return;

    try {
        const res = await fetch(`http://localhost:5000/api/cultural-club-details/${clubKey}`);
        if (!res.ok) throw new Error("Club not found");
        const club = await res.json();

        // Render president and mentor info
        document.getElementById('president-name').textContent = club.presidentName;
        document.getElementById('mentor-name').textContent = club.mentorName;
        document.getElementById('president-img').src = club.presidentImage;
        document.getElementById('mentor-img').src = club.mentorImage;
        document.getElementById('club-description').textContent = club.description;
        document.getElementById('club-title').textContent = club.clubName;
    } catch (err) {
        console.error(err);
        // Optionally show an error message in the UI
    }
});
