// ----------------- DOMContentLoaded: All Main Logic -----------------
document.addEventListener("DOMContentLoaded", async () => {

  // ----------------- Accessibility: Font Size Controls -----------------
  let currentFontSize = 16;
  const minFontSize = 12;
  const maxFontSize = 24;
  const zoomInBtn = document.getElementById('zoom-in');
  const zoomOutBtn = document.getElementById('zoom-out');
  const resetBtn = document.getElementById('reset');

  function setFontSize(size) {
    document.body.style.fontSize = `${size}px`;
  }

  function showAccessibilityFeedback(message) {
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: #1e3c72;
      color: white;
      padding: 10px 15px;
      border-radius: 5px;
      font-size: 14px;
      z-index: 10000;
      animation: slideInRight 0.3s ease;
    `;
    document.body.appendChild(feedback);
    setTimeout(() => feedback.remove(), 2000);
  }

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      if (currentFontSize < maxFontSize) {
        currentFontSize += 2;
        setFontSize(currentFontSize);
        showAccessibilityFeedback('Font size increased');
      }
    });
  }
  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      if (currentFontSize > minFontSize) {
        currentFontSize -= 2;
        setFontSize(currentFontSize);
        showAccessibilityFeedback('Font size decreased');
      }
    });
  }
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentFontSize = 16;
      setFontSize(currentFontSize);
      showAccessibilityFeedback('Font size reset');
    });
  }

  // ----------------- Sidebar Popup Toggle -----------------
  const menuToggle = document.getElementById("menu-toggle");
  const popupSidebar = document.getElementById("popupSidebar");
  if (menuToggle && popupSidebar) {
    menuToggle.onclick = (event) => {
      event.stopPropagation();
      popupSidebar.style.display =
        popupSidebar.style.display === "block" ? "none" : "block";
    };
    document.addEventListener("click", (event) => {
      if (
        !popupSidebar.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        popupSidebar.style.display = "none";
      }
    });
  }

  // ----------------- Dynamic Main Content Loader -----------------
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

  // ----------------- Swiper Slider Initialization -----------------
  try {
    const res = await fetch('/api/images');
    const images = await res.json();
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    if (swiperWrapper) {
      swiperWrapper.innerHTML = images.map(img =>
        `<div class="swiper-slide"><img src="${img.url}" alt="${img.alt}"></div>`
      ).join('');
      new Swiper('.mySwiper', {
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        pagination: { el: ".swiper-pagination", clickable: true }
      });
    }
  } catch (err) {
    console.error('Failed to load slider images:', err);
  }

  // ----------------- Dean Profile Section -----------------
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

  // ----------------- Council Members Section -----------------
  try {
    const res = await fetch('/api/council-members');
    const members = await res.json();
    const container = document.getElementById('council-members-container');
    if (container) {
      container.innerHTML = members.map(member => `
        <div class="council-member-box">
          <div class="member-image"><img src="${member.image}" alt="${member.name}" /></div>
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

  // ----------------- Departmental Clubs Section -----------------
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

  // ----------------- Submenu Toggles -----------------
  // Students Clubs submenu
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

  // ----------------- Sub-menu Button Navigation -----------------
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

  // ----------------- Footer Animations and Functionality -----------------
  // Animated counter for statistics
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const count = +counter.innerText;
      const increment = target / 200;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounters(), 1);
      } else {
        counter.innerText = target.toLocaleString();
      }
    });
  }

  // Intersection Observer for footer animations
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        if (entry.target.classList.contains('footer-stats')) {
          animateCounters();
        }
      }
    });
  }, { threshold: 0.3 });

  // Observe footer elements for animation
  const footerElements = document.querySelectorAll('.footer-section, .footer-stats');
  footerElements.forEach(el => footerObserver.observe(el));

  // Newsletter form functionality
  const newsletterForm = document.querySelector('.newsletter-form');
  const newsletterInput = document.querySelector('.newsletter-input');
  const newsletterBtn = document.querySelector('.newsletter-btn');
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = newsletterInput.value.trim();
      if (email && isValidEmail(email)) {
        newsletterBtn.textContent = 'Subscribed!';
        newsletterBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
        newsletterInput.value = '';
        setTimeout(() => {
          newsletterBtn.textContent = 'Subscribe';
          newsletterBtn.style.background = 'linear-gradient(45deg, #4facfe, #00f2fe)';
        }, 3000);
      } else {
        newsletterInput.style.borderColor = '#dc3545';
        newsletterInput.style.boxShadow = '0 0 20px rgba(220, 53, 69, 0.3)';
        setTimeout(() => {
          newsletterInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          newsletterInput.style.boxShadow = 'none';
        }, 3000);
      }
    });
  }
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Back to top button functionality
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Social link hover effects
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-3px) scale(1.05)';
    });
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Footer link animations
  document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      const icon = link.querySelector('.link-icon');
      if (icon) icon.style.transform = 'translateX(8px) scale(1.2)';
    });
    link.addEventListener('mouseleave', () => {
      const icon = link.querySelector('.link-icon');
      if (icon) icon.style.transform = 'translateX(0) scale(1)';
    });
  });

  // Footer logo floating animation
  const footerLogo = document.querySelector('.footer-logo');
  if (footerLogo) {
    setInterval(() => {
      footerLogo.style.transform = 'translateY(-5px)';
      setTimeout(() => {
        footerLogo.style.transform = 'translateY(0)';
      }, 1000);
    }, 3000);
  }

  // Parallax effect for footer waves
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const footerWaves = document.querySelector('.footer-waves svg');
    if (footerWaves) {
      footerWaves.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  });

  // Ripple effect for contact items
  document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // App button click animations
  document.querySelectorAll('.app-button').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
        window.open(this.href, '_blank');
      }, 150);
    });
  });

  // ----------------- Modern Navbar Functionality -----------------
  // Mobile menu toggle
  const navbarNav = document.querySelector('.navbar-nav');
  if (menuToggle && navbarNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navbarNav.classList.toggle('active');
    });
  }

  // Dropdown menu handling for mobile
  document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = toggle.closest('.dropdown');
        dropdown.classList.toggle('active');
      }
    });
  });

  // Active navigation item highlighting
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    if (
      link.getAttribute('href') === currentPath ||
      (currentPath.includes('index.html') && link.getAttribute('href') === 'index.html') ||
      (currentPath === '/' && link.getAttribute('href') === 'index.html')
    ) {
      link.classList.add('active');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Navbar scroll effect
  let lastScrollTop = 0;
  const navbar = document.querySelector('.modern-navbar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    navbar.style.boxShadow = scrollTop > 0
      ? '0 4px 20px rgba(0, 0, 0, 0.15)'
      : '0 4px 20px rgba(0, 0, 0, 0.08)';
    lastScrollTop = scrollTop;
  });

  // ----------------- Top Bar Typewriter Effect -----------------
  const typewriterTexts = [
    "Welcome to GLA University Students Welfare! 🎓",
    "Empowering students through innovation and excellence! ⭐",
    "Join our vibrant campus community today! 🌟",
    "Discover endless opportunities for growth! 🚀"
  ];
  let currentTextIndex = 0;
  let currentCharIndex = 0;
  let isTypewriterDeleting = false;
  let typingSpeed = 100;

  function enhancedTypewriterEffect() {
    const typewriter = document.getElementById('typewriter');
    if (!typewriter) return;
    const currentText = typewriterTexts[currentTextIndex];
    if (!isTypewriterDeleting) {
      typewriter.textContent = currentText.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      if (currentCharIndex === currentText.length) {
        setTimeout(() => { isTypewriterDeleting = true; }, 2000);
      }
    } else {
      typewriter.textContent = currentText.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      if (currentCharIndex === 0) {
        isTypewriterDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
      }
    }
    typingSpeed = isTypewriterDeleting ? 50 : 100;
    setTimeout(enhancedTypewriterEffect, typingSpeed);
  }
  enhancedTypewriterEffect();

  // Top bar social icons hover effects
  document.querySelectorAll('.top-social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'translateY(-3px) scale(1.1) rotate(5deg)';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
  });

  // ----------------- Miscellaneous Enhancements -----------------
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && navbarNav && menuToggle) {
      const isClickInsideNav = navbarNav.contains(e.target);
      const isClickOnMenuBtn = menuToggle.contains(e.target);
      if (!isClickInsideNav && !isClickOnMenuBtn && navbarNav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navbarNav.classList.remove('active');
      }
    }
  });

  // Add loading animation to navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#' && !this.getAttribute('href').startsWith('#')) {
        this.style.position = 'relative';
        this.innerHTML += '<span class="nav-loading">⟳</span>';
        const loading = this.querySelector('.nav-loading');
        if (loading) {
          loading.style.cssText = `
            position: absolute;
            right: 5px;
            animation: spin 1s linear infinite;
          `;
        }
      }
    });
  });

});
