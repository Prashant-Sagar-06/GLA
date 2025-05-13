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
                <p>Students Welfare at GLA University works to ensure that students develop academically, professionally, and personally through a variety of programs and support initiatives.</p>
                <img src="../images/about-gla.jpg" alt="About Students Welfare" class="banner-img small-img">
                <p style="margin-top: 20px; text-align: justify; font-size: 1rem; line-height: 1.6;">GLA University Students Welfare is committed to fostering a vibrant campus life by organizing events, providing support services, and creating opportunities for students to excel in all aspects of their lives. Join us in building a community of growth, learning, and success.</p>
            `;
            break;
        case "studentActivity":
            mainContent.innerHTML = `
                <h2>Student Activity Centre</h2>
                <p>The Student Activity Centre organizes exciting events, competitions, and workshops to enhance students' overall experience on campus.</p>
                <img src="activity_centre_banner.jpg" alt="Student Activities" class="banner-img">
            `;
            break;
            case "studentsClubs":
                const sidebar = document.querySelector(".sidebar");

                if (sidebar) {
                    const existingButtons = sidebar.querySelector(".club-buttons");

                    if (existingButtons) {
                        // If buttons already exist -> remove them
                        existingButtons.remove();
                    } else {
                        // If buttons not exist -> create them
                        const clubButtons = document.createElement("div");
                        clubButtons.classList.add("club-buttons");
                        clubButtons.style.display = "flex";
                        clubButtons.style.flexDirection = "column";
                        clubButtons.style.alignItems = "center"; // Center align buttons horizontally
                        clubButtons.style.marginTop = "10px"; // Add some spacing from the Students Clubs link

                        // Create Cultural link
                        const culturalLink = document.createElement("a");
                        culturalLink.textContent = "Cultural";
                        culturalLink.href = "../Cultural/cultural_club.html";
                        culturalLink.classList.add("sidebar-btn");
                        culturalLink.style.backgroundColor = "#2196F3"; // Change button color
                        culturalLink.style.color = "#fff"; // Change text color
                        culturalLink.style.padding = "10px 15px"; // Add padding
                        culturalLink.style.borderRadius = "5px"; // Add rounded corners
                        culturalLink.style.margin = "5px"; // Add margin

                        // Create Departmental link
                        const departmentalLink = document.createElement("a");
                        departmentalLink.textContent = "Departmental";
                        departmentalLink.href = "../Deparmental/Departmental.html";
                        departmentalLink.classList.add("sidebar-btn");
                        departmentalLink.style.backgroundColor = "#2196F3"; // Change button color
                        departmentalLink.style.color = "#fff"; // Change text color
                        departmentalLink.style.padding = "10px 15px"; // Add padding
                        departmentalLink.style.borderRadius = "5px"; // Add rounded corners
                        departmentalLink.style.margin = "5px"; // Add margin

                        // Create Sports link
                        const sportsLink = document.createElement("a");
                        sportsLink.textContent = "Sports";
                        sportsLink.href = "../Sports/Sports.html";
                        sportsLink.classList.add("sidebar-btn");
                        sportsLink.style.backgroundColor = "#2196F3"; // Change button color
                        sportsLink.style.color = "#fff"; // Change text color
                        sportsLink.style.padding = "10px 15px"; // Add padding
                        sportsLink.style.borderRadius = "5px"; // Add rounded corners
                        sportsLink.style.margin = "5px"; // Add margin

                        // Add links to container
                        clubButtons.appendChild(culturalLink);
                        clubButtons.appendChild(departmentalLink);
                        clubButtons.appendChild(sportsLink);

                        // Find Students Clubs link and insert buttons after it
                        const studentClubsLink = sidebar.querySelector('a[data-section="studentsClubs"]');
                        if (studentClubsLink) {
                            studentClubsLink.insertAdjacentElement("afterend", clubButtons);
                        }
                    }
                } else {
                    console.error("Sidebar element not found.");
                }
                break;
            
        case "ncc":
            mainContent.innerHTML = `
                <h2>NCC</h2>
                <p>GLA's NCC unit fosters leadership, discipline, and patriotism through various national-level programs and parades.</p>
                <img src="ncc_banner.jpg" alt="NCC Activities" class="banner-img">
            `;
            break;
        case "nss":
            mainContent.innerHTML = `
                <h2>NSS</h2>
                <p>National Service Scheme (NSS) volunteers at GLA serve the community and lead impactful social projects across the region.</p>
                <img src="nss_banner.jpg" alt="NSS Volunteers" class="banner-img">
            `;
            break;
        case "studentAffairs":
            mainContent.innerHTML = `
                <h2>Student Affairs Council</h2>
                <p>The Student Affairs Council represents the student body, organizing elections, leadership programs, and major student initiatives.</p>
                <img src="council_banner.jpg" alt="Student Council" class="banner-img">
            `;
            break;
        default:
            mainContent.innerHTML = `
                <h2>Welcome to Students Welfare</h2>
                <p>Explore the various clubs, events, and student opportunities at GLA University.</p>
                <img src="gla_banner.png" alt="GLA Students participating in activities" class="banner-img">
            `;
    }
}

// ----------------- Sidebar Link Click Handling -----------------
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.sidebar a');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const section = this.getAttribute('data-section');
            loadContent(section);
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
