// ----------------- Typewriter Effect -----------------
const text = "Welcome to GLA University Students Welfare!";
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
typeEffect();

// ----------------- DOMContentLoaded: All Main Logic -----------------
document.addEventListener("DOMContentLoaded", async () => {
    // Font size controls
    let fontSize = 16;
    const zoomInBtn = document.getElementById("zoom-in");
    const zoomOutBtn = document.getElementById("zoom-out");
    const resetBtn = document.getElementById("reset");

    if (zoomInBtn) {
        zoomInBtn.addEventListener("click", () => {
            fontSize += 2;
            document.body.style.fontSize = `${fontSize}px`;
        });
    }
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener("click", () => {
            if (fontSize > 6) {
                fontSize -= 2;
                document.body.style.fontSize = `${fontSize}px`;
            }
        });
    }
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            fontSize = 16;
            document.body.style.fontSize = `${fontSize}px`;
        });
    }

    // ----------------- Sidebar Link Click Handling -----------------
    const links = document.querySelectorAll('.sidebar a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            const section = this.getAttribute('data-section');
            if (section === "council" || section === "studentsClubs") {
                event.preventDefault();
            } else {
                event.preventDefault();
                loadContent(section);
            }
        });
    });

    // ----------------- Load Main Content Dynamically -----------------
    function loadContent(section) {
        const mainContent = document.querySelector(".main-content");
        if (!mainContent) return;
        switch (section) {
            case "about":
                mainContent.style.background = "linear-gradient(to bottom right,rgba(44, 141, 232, 0.84),rgb(29, 35, 36))";
                mainContent.style.padding = "20px";
                mainContent.style.borderRadius = "10px";
                mainContent.style.color = "#fff";
                mainContent.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                mainContent.innerHTML = `
                    <h2>About</h2>
                    <img src="./images/about-gla.jpg" alt="About Students Welfare" class="banner-img small-img">
                    <p style="margin-top: 20px; text-align: justify; font-size: 1rem; line-height: 1.6;">
                        Students Welfare at GLA University works to ensure that students develop academically, professionally, and personally through a variety of programs and support initiatives. GLA University Students Welfare is committed to fostering a vibrant campus life by organizing events, providing support services, and creating opportunities for students to excel in all aspects of their lives. Join us in building a community of growth, learning, and success. GLA has been actively involved with social causes since its very inception and has drawn appreciation from one and all for its works in various facets of societal paradigms. At the heart of the Students Welfare Department lies a deep commitment to inclusivity and student engagement. It aims to nurture leadership qualities, encourage creative pursuits, and instill a sense of social responsibility among students. Through various student-led clubs, workshops, mentorship programs, and cultural festivals, the department ensures every student finds their niche and flourishes in a supportive environment. The vibrant campus culture is a testament to the University’s belief that holistic education goes beyond textbooks. Students are encouraged to take initiative, collaborate across disciplines, and become agents of positive change. With dedicated faculty mentors and enthusiastic student volunteers, GLA’s Students Welfare initiatives continue to set benchmarks in student development, making the university experience truly enriching and unforgettable. GLA University's Students Welfare Department is dedicated to fostering holistic student development by promoting academic excellence, leadership, creativity, inclusivity, and social responsibility through a wide range of cultural events, support services, mentorship programs, and student-led initiatives that enrich campus life and empower individuals to thrive in all aspects of their journey.
                    </p>
                `;
                break;
            default:
                mainContent.innerHTML = "";
                break;
        }
    }

    // ----------------- Swiper Slider -----------------
    try {
        const res = await fetch('/api/images');
        const images = await res.json();
        let swiperWrapper = document.querySelector('.swiper-wrapper');
        if (!swiperWrapper) {
            const swiperContainer = document.querySelector('.swiper.mySwiper');
            swiperWrapper = document.createElement('div');
            swiperWrapper.className = 'swiper-wrapper';
            swiperContainer.appendChild(swiperWrapper);
        }
        swiperWrapper.innerHTML = images.map(img =>
            `<div class="swiper-slide"><img src="${img.url}" alt="${img.alt}"></div>`
        ).join('');
        new Swiper('.mySwiper', {
            loop: true,
            autoplay: {
                delay: 3000,
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
    } catch (err) {
        console.error('Failed to load slider images:', err);
    }

    // ----------------- Fetch Dean's Message from Backend -----------------
    try {
        const deanRes = await fetch('/api/dean');
        const dean = await deanRes.json();
        const deanInfo = document.getElementById('dean-info');
        const deanImage = document.getElementById('dean-image');
        if (deanInfo && dean) {
            deanInfo.innerHTML = `
                <h2>${dean.title}</h2>
                <h3>${dean.subtitle}</h3>
                <h2>${dean.name}</h2>
                <p>${dean.description}</p>
            `;
        }
        if (deanImage && dean) {
            deanImage.innerHTML = `
                <img src="${dean.image}" alt="${dean.name}" />
            `;
        }
    } catch (err) {
        console.error('Failed to load dean info:', err);
    }

    // ----------------- Fetch and Render Council Members -----------------
    try {
        const res = await fetch('/api/council-members');
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

    // ----------------- Fetch and Render Departmental Clubs -----------------
    try {
        const res = await fetch('/api/departmental-clubs');
        const clubs = await res.json();
        const container = document.getElementById('departmental-clubs-container');
        if (container && Array.isArray(clubs)) {
            container.innerHTML = clubs.map(club => `
                <div class="club-card">
                    <div class="club-image">
                        <img src="${club.image}" alt="${club.name}" />
                    </div>
                    <div class="club-details">
                        <h3>${club.name}</h3>
                        <p>${club.description}</p>
                    </div>
                </div>
            `).join('');
        }
    } catch (err) {
        console.error('Failed to load departmental clubs:', err);
    }

    // ----------------- Students Clubs Submenu Toggle -----------------
    const studentsClubsLink = document.querySelector('a[data-section="studentsClubs"]');
    const clubsSubmenu = document.getElementById('clubs-submenu');
    if (studentsClubsLink && clubsSubmenu) {
        studentsClubsLink.addEventListener('click', function(event) {
            event.preventDefault();
            clubsSubmenu.classList.toggle('active');
        });
    }

    // ----------------- Council Button Handler -----------------
    const councilLink = document.querySelector('[data-section="council"]');
    if (councilLink) {
        councilLink.addEventListener('click', function(e) {
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
                if (councilLink && councilLink.parentNode) {
                    councilLink.parentNode.insertBefore(councilButtons, councilLink.nextSibling);
                }
            }
        });
    }

    // ----------------- Sub-menu Button Navigation -----------------
    document.querySelectorAll('.sub-menu-btn').forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            if (section === "cultural") {
                window.location.href = "/Cultural/cultural_club.html";
            } else if (section === "departmental") {
                window.location.href = "/Departmental/Departmental.html";
            } else if (section === "sports") {
                window.location.href = "/Sports/Sports.html";
            }
        });
    });

    // ----------------- Footer (Optional: Remove if static) -----------------
    try {
        const footerRes = await fetch('/api/footer');
        const footer = await footerRes.json();
        const footerContact = document.getElementById('footer-contact');
        const footerApps = document.getElementById('footer-apps');
        const footerSocial = document.getElementById('footer-social');
        if (footerContact && footer) {
            footerContact.innerHTML = `
                <p>${footer.address}</p>
                <p>${footer.phone}</p>
                <p>${footer.email}</p>
            `;
        }
        if (footerApps && footer.apps) {
            footerApps.innerHTML = footer.apps.map(app =>
                `<a href="${app.url}" target="_blank"><img src="/images/${app.img}" alt="${app.alt}"></a>`
            ).join('');
        }
        if (footerSocial && footer.social) {
            footerSocial.innerHTML = footer.social.map(s =>
                `<a href="${s.url}" target="_blank"><img src="/images/${s.img}" alt="${s.alt}"></a>`
            ).join('');
        }
    } catch (err) {
        // If your footer is static, you can remove this block
        // console.error('Failed to load footer:', err);
    }
});