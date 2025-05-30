// ----------------- Typewriter Effect -----------------
const text = "Welcome to GLA University Students Welfare!";
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

// ----------------- Zoom and Reset Font Size -----------------
const zoomInBtn = document.getElementById("zoom-in");
const zoomOutBtn = document.getElementById("zoom-out");
const resetBtn = document.getElementById("reset");

let fontSize = 16; // Default font size

zoomInBtn.addEventListener("click", () => {
    fontSize += 2;
    document.body.style.fontSize = `${fontSize}px`;
});

zoomOutBtn.addEventListener("click", () => {
    if (fontSize > 6) { // Minimum font size
        fontSize -= 2;
        document.body.style.fontSize = `${fontSize}px`;
    }
});

resetBtn.addEventListener("click", () => {
    fontSize = 16;
    document.body.style.fontSize = `${fontSize}px`;
});

// ----------------- Load Main Content Dynamically -----------------
function loadContent(section) {
    const mainContent = document.querySelector(".main-content");

    switch (section) {
        case "about":
            mainContent.style.background = "linear-gradient(to bottom right,rgba(44, 141, 232, 0.84),rgb(29, 35, 36))"; // Set gradient background
            mainContent.style.padding = "20px"; // Optional: Add padding for better spacing
            mainContent.style.borderRadius = "10px"; // Optional: Add rounded corners
            mainContent.style.color = "#fff"; // Optional: Change text color to white for better contrast
            mainContent.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // Optional: Add a shadow for better appearance
            mainContent.innerHTML = `
                <h2>About</h2>
                <img src="./images/about-gla.jpg" alt="About Students Welfare" class="banner-img small-img">
                <p style="margin-top: 20px; text-align: justify; font-size: 1rem; line-height: 1.6;">Students Welfare at GLA University works to ensure that students develop academically, professionally, and personally through a variety of programs and support initiatives.GLA University Students Welfare is committed to fostering a vibrant campus life by organizing events, providing support services, and creating opportunities for students to excel in all aspects of their lives. Join us in building a community of growth, learning, and success.GLA has been actively involved with social causes since its very inception and has drawn appreciation from one and all for its works in various facets of societal paradigms.At the heart of the Students Welfare Department lies a deep commitment to inclusivity and student engagement. It aims to nurture leadership qualities, encourage creative pursuits, and instill a sense of social responsibility among students.Through various student-led clubs, workshops, mentorship programs, and cultural festivals, the department ensures every student finds their niche and flourishes in a supportive environment.The vibrant campus culture is a testament to the University’s belief that holistic education goes beyond textbooks. Students are encouraged to take initiative, collaborate across disciplines, and become agents of positive change.With dedicated faculty mentors and enthusiastic student volunteers, GLA’s Students Welfare initiatives continue to set benchmarks in student development, making the university experience truly enriching and unforgettable.GLA University's Students Welfare Department is dedicated to fostering holistic student development by promoting academic excellence, leadership, creativity, inclusivity, and social responsibility through a wide range of cultural events, support services, mentorship programs, and student-led initiatives that enrich campus life and empower individuals to thrive in all aspects of their journey.</p>
            `;
    }
}

// ----------------- Sidebar Link Click Handling -----------------
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.sidebar a');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            const section = this.getAttribute('data-section');
            // Only load content for sections that are NOT council or studentsClubs
            if (section === "council" || section === "studentsClubs") {
                // Let the submenu toggle logic handle this
                event.preventDefault();
                // (No call to loadContent)
            } else {
                event.preventDefault();
                loadContent(section);
            }
        });
    });
});

const swiper = new Swiper(".mySwiper", {
    loop: true, // Infinite loop
    autoplay: {
      delay: 3000, // Auto-slide every 3 sec
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

// ----------------- Fetch Dean's Message from Backend -----------------
// This function fetches the dean's message and other data from the backend

document.addEventListener("DOMContentLoaded", async () => {
    // Fetch dean info
    const deanRes = await fetch('http://localhost:5000/api/dean');
    const dean = await deanRes.json();

    // Render dean info
    document.getElementById('dean-info').innerHTML = `
        <h2>${dean.title}</h2>
        <h3>${dean.subtitle}</h3>
        <h2>${dean.name}</h2>
        <p>${dean.description}</p>
    `;
    document.getElementById('dean-image').innerHTML = `
        <img src="${dean.image}" alt="${dean.name}" />
    `;

    // Fetch footer info
    const footerRes = await fetch('http://localhost:5000/api/footer');
    const footer = await footerRes.json();

    // Render footer info
    document.querySelector('.footer-col').innerHTML = `
        <h4>Contact Us</h4>
        <p>${footer.address}</p>
        <p>Phone: ${footer.phone}</p>
        <p>Email: <a href="mailto:${footer.email}">${footer.email}</a></p>
    `;

    document.querySelector('.app-links').innerHTML = footer.apps.map(app =>
        `<a href="${app.url}" target="_blank"><img class="app-icon" src="${app.img}" alt="${app.alt}"></a>`
    ).join('');

    document.querySelector('.social-icons').innerHTML = footer.social.map(s =>
        `<a href="${s.url}"><img src="${s.img}" alt="${s.alt}"></a>`
    ).join('');
});

// ----------------- Fetch Images for Swiper Slider -----------------
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch images from backend
    const res = await fetch('http://localhost:5000/api/images');
    const images = await res.json();

    // Find the swiper wrapper (create it if not present)
    let swiperWrapper = document.querySelector('.swiper-wrapper');
    if (!swiperWrapper) {
        // If not present, create and append it to the swiper container
        const swiperContainer = document.querySelector('.swiper.mySwiper');
        swiperWrapper = document.createElement('div');
        swiperWrapper.className = 'swiper-wrapper';
        swiperContainer.appendChild(swiperWrapper);
    }

    // Insert images into the slider
    swiperWrapper.innerHTML = images.map(img =>
        `<div class="swiper-slide"><img src="${img.url}" alt="${img.alt}"></div>`
    ).join('');

    // Initialize Swiper (if not already initialized)
    new Swiper('.mySwiper', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
    });
});

// Update the council click handler
document.querySelector('[data-section="council"]').addEventListener('click', function(e) {
    e.preventDefault();
    const sidebar = document.querySelector(".sidebar");
    const existingButtons = sidebar.querySelector(".council-buttons");
    
    if (existingButtons) {
        existingButtons.remove();
    } else {
        const councilButtons = document.createElement("div");
        councilButtons.classList.add("council-buttons");
        councilButtons.style.display = "flex";
        councilButtons.style.flexDirection = "column";
        councilButtons.style.width = "100%";
        councilButtons.style.padding = "10px";

        const buttons = [
            { text: "Student Affairs Council", section: "student-affairs" },
            { text: "Cultural Affairs Council", section: "cultural-affairs" }
        ];

        buttons.forEach(btn => {
            const button = document.createElement("button");
            button.textContent = btn.text;
            button.setAttribute('data-section', btn.section);
            button.style.backgroundColor = "#2196F3";
            button.style.color = "#fff";
            button.style.padding = "10px 15px";
            button.style.margin = "5px 0";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.style.width = "100%";
            councilButtons.appendChild(button);
        });

        const councilLink = sidebar.querySelector('a[data-section="council"]');
        if (councilLink && councilLink.parentNode) {
            councilLink.parentNode.insertBefore(councilButtons, councilLink.nextSibling);
        }
    }
});

// Handle sub-menu button clicks
document.querySelectorAll('.sub-menu-btn').forEach(button => {
    button.addEventListener('click', function() {
        const section = this.getAttribute('data-section');
        // Handle the specific council section display here
        // You can add your logic to show the respective council content
    });
});

// Handle sub-menu button clicks for Council and Students Clubs
document.querySelectorAll('.sub-menu-btn').forEach(button => {
    button.addEventListener('click', function() {
        const section = this.getAttribute('data-section');
        // Navigation logic for sub-menu buttons
        if (section === "cultural") {
            window.location.href = "Cultural/cultural_club.html";
        } else if (section === "departmental") {
            window.location.href = "Departmental/Departmental.html";
        } else if (section === "sports") {
            window.location.href = "Sports/Sports.html";
        } else if (section === "student-affairs") {
            alert("Student Affairs Council page coming soon!");
        } else if (section === "cultural-affairs") {
            alert("Cultural Affairs Council page coming soon!");
        } else if (section === "ncc") {
            window.location.href = "others/NCC.html";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const studentsClubsLink = document.querySelector('a[data-section="studentsClubs"]');
    const clubsSubmenu = document.getElementById('clubs-submenu');

    if (studentsClubsLink && clubsSubmenu) {
        studentsClubsLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            clubsSubmenu.classList.toggle('active'); // Toggle 'active' class
        });
    }
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch('http://localhost:5000/api/council-members');
    const members = await res.json();
    const container = document.getElementById('council-members-container');
    if (container && Array.isArray(members)) {
      container.innerHTML = members.map(member => `
        <div class="council-member-box">
          <div class="member-image">
            <img src="${member.image}" alt="${member.name}" />
          </div>
          <div class="member-details">
            <h3>${member.name}</h3>
            <p>${member.role}</p>
          </div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error('Failed to load council members:', err);
  }
});