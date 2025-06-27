// ----------------- DOMContentLoaded: All Main Logic -----------------
document.addEventListener("DOMContentLoaded", async () => {
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

  // Font size controls
  let fontSize = 16;
  document.getElementById("zoom-in").onclick = () => {
    fontSize += 2;
    document.body.style.fontSize = `${fontSize}px`;
  };
  document.getElementById("zoom-out").onclick = () => {
    if (fontSize > 6) {
      fontSize -= 2;
      document.body.style.fontSize = `${fontSize}px`;
    }
  };
  document.getElementById("reset").onclick = () => {
    fontSize = 16;
    document.body.style.fontSize = `${fontSize}px`;
  };

  // Sidebar popup toggle (three-dot icon)
 const menuToggle = document.getElementById("menu-toggle");
const popupSidebar = document.getElementById("popupSidebar");

menuToggle.onclick = (event) => {
  event.stopPropagation();
  popupSidebar.style.display =
    popupSidebar.style.display === "block" ? "none" : "block";
};

// Optional: Close popup when clicking outside
document.addEventListener("click", (event) => {
  if (
    !popupSidebar.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    popupSidebar.style.display = "none";
  }
});

  // Load content dynamically in main area
  function loadContent(section) {
    const mainContent = document.querySelector(".main-content");
    if (!mainContent) return;

    switch (section) {
      case "about":
        mainContent.innerHTML = `
          <h2>About</h2>
          <img src="./images/about-gla.jpg" alt="About Students Welfare" class="banner-img small-img">
          <p style="margin-top: 20px; text-align: justify; font-size: 1rem; line-height: 1.6;">
            Students Welfare at GLA University works to ensure students develop academically, professionally, and personally through a variety of programs. Join us in building a vibrant community!
          </p>`;
        break;

      case "newsletters":
        mainContent.innerHTML = `
          <h2>Newsletters</h2>
          <p>Explore our archive of newsletters showcasing campus events and student achievements.</p>`;
        break;

      case "studentActivity":
        mainContent.innerHTML = `
          <h2>Student Activity Centre</h2>
          <p>The hub for workshops, events, and co-curricular engagement.</p>`;
        break;

      case "ncc":
        mainContent.innerHTML = `
          <h2>NCC</h2>
          <p>National Cadet Corps – Empowering students through discipline and unity.</p>`;
        break;

      case "nss":
        mainContent.innerHTML = `
          <h2>NSS</h2>
          <p>National Service Scheme – Service before self.</p>`;
        break;

      default:
        mainContent.innerHTML = `<p>Section "${section}" is under construction.</p>`;
        break;
    }
  }

  // Swiper slider initialization
  try {
    const res = await fetch('/api/images');
    const images = await res.json();
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = images.map(img =>
      `<div class="swiper-slide"><img src="${img.url}" alt="${img.alt}"></div>`
    ).join('');
    new Swiper('.mySwiper', {
      loop: true,
      autoplay: { delay: 3000, disableOnInteraction: false },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    });
  } catch (err) {
    console.error('Failed to load slider images:', err);
  }

  // Dean profile
  try {
    const deanRes = await fetch('/api/dean');
    const dean = await deanRes.json();
    document.getElementById('dean-info').innerHTML = `
      <h2>${dean.title}</h2>
      <h3>${dean.subtitle}</h3>
      <h2>${dean.name}</h2>
      <p>${dean.description}</p>
    `;
    document.getElementById('dean-image').innerHTML = `
      <img src="${dean.image}" alt="${dean.name}" />
    `;
  } catch (err) {
    console.error('Failed to load dean info:', err);
  }

  // Council members
  try {
    const res = await fetch('/api/council-members');
    const members = await res.json();
    const container = document.getElementById('council-members-container');
    container.innerHTML = members.map(member => `
      <div class="council-member-box">
        <div class="member-image"><img src="${member.image}" alt="${member.name}" /></div>
        <div class="member-details">
          <h3>${member.name}</h3>
          <p>${member.role}</p>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('Failed to load council members:', err);
  }

  // Departmental Clubs (if section exists)
  try {
    const res = await fetch('/api/departmental-clubs');
    const clubs = await res.json();
    const container = document.getElementById('departmental-clubs-container');
    if (container) {
      container.innerHTML = clubs.map(club => `
        <div class="club-card">
          <div class="club-image"><img src="${club.image}" alt="${club.name}" /></div>
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

  // Toggle submenu
  const studentsClubsLink = document.querySelector('a[data-section="studentsClubs"]');
  const clubsSubmenu = document.getElementById('clubs-submenu');
  if (studentsClubsLink && clubsSubmenu) {
    studentsClubsLink.addEventListener('click', e => {
      e.preventDefault();
      clubsSubmenu.classList.toggle('active');
    });
  }

  // Council submenu
  const councilLink = document.querySelector('[data-section="council"]');
  if (councilLink) {
    councilLink.addEventListener('click', function (e) {
      e.preventDefault();
      const submenu = document.getElementById('council-submenu');
      if (submenu) submenu.classList.toggle('active');
    });
  }

  // Sub-menu button navigation
  document.querySelectorAll('.sub-menu-btn').forEach(button => {
    button.addEventListener('click', function () {
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

});
