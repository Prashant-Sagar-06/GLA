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
  const sidebarBackdrop = document.getElementById("sidebarBackdrop");
  
  if (menuToggle && popupSidebar && sidebarBackdrop) {
    menuToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleSidebar();
    });
    
    sidebarBackdrop.addEventListener('click', () => {
      closeSidebar();
    });
    
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeSidebar();
      }
    });
  }
  
  function toggleSidebar() {
    if (popupSidebar.classList.contains('active')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }
  
  function openSidebar() {
    popupSidebar.style.display = 'block';
    sidebarBackdrop.classList.add('active');
    menuToggle.classList.add('active');
    
    // Force a reflow before adding active class for smooth animation
    popupSidebar.offsetHeight;
    popupSidebar.classList.add('active');
    
    // Prevent body scroll when sidebar is open
    document.body.style.overflow = 'hidden';
  }
  
  function closeSidebar() {
    popupSidebar.classList.remove('active');
    sidebarBackdrop.classList.remove('active');
    menuToggle.classList.remove('active');
    
    // Allow body scroll when sidebar is closed
    document.body.style.overflow = '';
    
    // Hide sidebar after animation completes
    setTimeout(() => {
      if (!popupSidebar.classList.contains('active')) {
        popupSidebar.style.display = 'none';
      }
    }, 400);
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

  // ----------------- Enhanced Dean Profile Section -----------------
  try {
    // Initialize enhanced dean section with animations
    initializeDeanSection();
    
    // Try to load dean data from API, fallback to static content
    try {
      const deanRes = await fetch('/api/dean');
      const dean = await deanRes.json();
      
      // Update dean info with API data
      const deanInfoElement = document.getElementById('dean-info');
      if (deanInfoElement) {
        deanInfoElement.querySelector('.dean-title-animated h2').textContent = dean.name || 'Dr. Himanshu Agarwal';
        deanInfoElement.querySelector('.dean-position').textContent = dean.position || 'Dean of Students Welfare';
        deanInfoElement.querySelector('.dean-description p').textContent = dean.description || 'With a passion for student development and academic excellence, Dr. Himanshu Agarwal leads our student welfare initiatives with vision and dedication.';
        
        // Update contact link
        const contactBtn = deanInfoElement.querySelector('.dean-contact-btn.primary');
        if (contactBtn && dean.email) {
          contactBtn.href = `mailto:${dean.email}`;
        }
      }
      
      // Update dean image
      const deanImageElement = document.getElementById('dean-image');
      if (deanImageElement && dean.image) {
        const img = deanImageElement.querySelector('img');
        if (img) {
          img.src = dean.image;
          img.alt = dean.name || 'Dean';
        }
      }
    } catch (apiErr) {
      // Using fallback dean content - static content is already in HTML
    }
    
  } catch (err) {
    console.error('Failed to initialize dean section:', err);
  }

  // Function to initialize dean section animations and interactions
  function initializeDeanSection() {
    // Animate statistics counter
    const statNumbers = document.querySelectorAll('.dean-stats .stat-number');
    
    const animateCounter = (element) => {
      const target = parseInt(element.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current);
      }, 16);
    };
    
    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumber = entry.target;
          if (!statNumber.classList.contains('animated')) {
            statNumber.classList.add('animated');
            animateCounter(statNumber);
          }
        }
      });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
      statsObserver.observe(stat);
    });
    
    // Add ripple effect to contact buttons
    const contactBtns = document.querySelectorAll('.dean-contact-btn');
    contactBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        const ripple = this.querySelector('.btn-ripple');
        if (ripple) {
          ripple.style.transform = 'scale(0)';
          setTimeout(() => {
            ripple.style.transform = 'scale(1)';
          }, 10);
          setTimeout(() => {
            ripple.style.transform = 'scale(0)';
          }, 600);
        }
      });
    });
    
    // Add hover effects to highlight items
    const highlightItems = document.querySelectorAll('.highlight-item');
    highlightItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.highlight-icon');
        if (icon) {
          icon.style.transform = 'scale(1.2) rotate(10deg)';
        }
      });
      
      item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.highlight-icon');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });
    
    // Add scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const slideUpObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
    
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.dean-title-group, .dean-image-section, .dean-info-section');
    animateElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px)';
      el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      slideUpObserver.observe(el);
    });
    
    // Add parallax effect to floating elements
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.floating-icon');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
    
    // Add dynamic background color change based on scroll
    window.addEventListener('scroll', () => {
      const deanSection = document.querySelector('.enhanced-dean-section');
      const sectionTop = deanSection.offsetTop;
      const sectionHeight = deanSection.offsetHeight;
      const scrollPosition = window.pageYOffset;
      
      if (scrollPosition >= sectionTop - window.innerHeight && 
          scrollPosition <= sectionTop + sectionHeight) {
        const progress = (scrollPosition - (sectionTop - window.innerHeight)) / 
                        (sectionHeight + window.innerHeight);
        const hue = 200 + (progress * 60); // Shift from blue to green
        deanSection.style.background = `linear-gradient(135deg, 
          hsl(${hue}, 20%, 98%) 0%, 
          hsl(${hue + 20}, 30%, 96%) 50%, 
          hsl(${hue + 40}, 25%, 97%) 100%)`;
      }
    });
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

  // ----------------- Sub-menu Button Navigation -----------------
  
  // Handle main menu item clicks to toggle submenus
  document.querySelectorAll('.main-menu-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.getAttribute('data-section');
      const submenu = document.getElementById(`${section}-submenu`);
      
      if (submenu) {
        // Close all other submenus and remove active class from other items
        document.querySelectorAll('.sub-menu').forEach(menu => {
          if (menu !== submenu) {
            menu.classList.remove('active');
          }
        });
        
        document.querySelectorAll('.main-menu-item').forEach(menuItem => {
          if (menuItem !== this) {
            menuItem.classList.remove('active');
          }
        });
        
        // Toggle current submenu and main menu item
        submenu.classList.toggle('active');
        this.classList.toggle('active');
      }
    });
  });

  // Handle submenu button clicks for navigation
  document.querySelectorAll('.sub-menu-btn').forEach(button => {
    button.addEventListener('click', function () {
      const section = this.getAttribute('data-section');
      const url = this.getAttribute('data-url');
      
      if (url) {
        window.location.href = url;
      } else {
        // Fallback for sections without specific URLs
        if (section === "cultural") {
          window.location.href = "/FRONTEND/Cultural/cultural_club.html";
        } else if (section === "departmental") {
          window.location.href = "/FRONTEND/Departmental/Departmental.html";
        } else if (section === "sports") {
          window.location.href = "/FRONTEND/Sports/Sports.html";
        } else if (section === "student-affairs") {
          window.location.href = "/FRONTEND/Council/student-affairs.html";
        } else if (section === "cultural-affairs") {
          window.location.href = "/FRONTEND/Council/cultural-affairs.html";
        } else if (section === "sports-council") {
          window.location.href = "/FRONTEND/Council/sports-council.html";
        }
      }
    });
  });

  // ----------------- Footer Animations and Functionality -----------------
  // Intersection Observer for footer animations
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animate', 'animated');
        
        // Animate footer stats if this is the footer stats section
        if (entry.target.classList.contains('footer-stats')) {
          const footerStatNumbers = entry.target.querySelectorAll('.stat-number[data-target]');
          footerStatNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            if (target) {
              animateCounter(stat, target);
              stat.removeAttribute('data-target'); // Prevent re-animation
            }
          });
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

  // ===========================================================
  // ENHANCED VIDEO BANNER & FACULTY CARDS FUNCTIONALITY
  // ===========================================================

  // Enhanced Video Controls with Error Handling and Mobile Optimization
  const playBtn = document.getElementById('playBtn');
  const heroVideo = document.getElementById('heroVideo');
  
  if (playBtn && heroVideo) {
    // Initialize video state
    let videoReady = false;
    
    // Video loading and error handling
    heroVideo.addEventListener('loadeddata', () => {
      videoReady = true;
      console.log('Video loaded successfully');
    });
    
    heroVideo.addEventListener('error', (e) => {
      console.error('Video loading error:', e);
      // Hide video controls if video fails to load
      if (playBtn) {
        playBtn.style.display = 'none';
      }
      // Add fallback background
      const videoBanner = document.querySelector('.video-banner');
      if (videoBanner) {
        videoBanner.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #4facfe 100%)';
      }
    });
    
    // Enhanced play/pause functionality
    playBtn.addEventListener('click', function() {
      if (!videoReady) {
        showNotification('Video is still loading, please wait...', 'warning');
        return;
      }
      
      try {
        if (heroVideo.paused) {
          heroVideo.play().then(() => {
            playBtn.innerHTML = '<span class="play-icon">⏸</span><span class="play-text">Pause Video</span>';
            playBtn.setAttribute('aria-label', 'Pause video');
          }).catch((error) => {
            console.error('Error playing video:', error);
            showNotification('Unable to play video', 'error');
          });
        } else {
          heroVideo.pause();
          playBtn.innerHTML = '<span class="play-icon">▶</span><span class="play-text">Play Video</span>';
          playBtn.setAttribute('aria-label', 'Play video');
        }
      } catch (error) {
        console.error('Video control error:', error);
        showNotification('Video control error', 'error');
      }
    });
    
    // Auto-hide controls on mobile after inactivity
    if (window.innerWidth <= 768) {
      let hideControlsTimeout;
      const videoBanner = document.querySelector('.video-banner');
      
      function resetHideControlsTimer() {
        clearTimeout(hideControlsTimeout);
        playBtn.style.opacity = '1';
        hideControlsTimeout = setTimeout(() => {
          if (!heroVideo.paused) {
            playBtn.style.opacity = '0.7';
          }
        }, 3000);
      }
      
      if (videoBanner) {
        videoBanner.addEventListener('touchstart', resetHideControlsTimer);
        videoBanner.addEventListener('click', resetHideControlsTimer);
      }
    }
    
    // Video ended event
    heroVideo.addEventListener('ended', () => {
      playBtn.innerHTML = '<span class="play-icon">▶</span><span class="play-text">Play Video</span>';
      playBtn.setAttribute('aria-label', 'Play video');
    });
    
    // Keyboard accessibility
    playBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playBtn.click();
      }
    });
    
    // Set initial aria-label
    playBtn.setAttribute('aria-label', 'Play video');
    playBtn.setAttribute('role', 'button');
    playBtn.setAttribute('tabindex', '0');
  }

  // Enhanced Faculty Card Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const facultyCards = document.querySelectorAll('.faculty-card');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(button => button.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      facultyCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          // Animate card appearance
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(-20px)';
          
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Add intersection observer for scroll animations
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.2 });

  facultyCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    cardObserver.observe(card);
  });

  // ===========================================================
  // END ENHANCED FUNCTIONALITY
  // ===========================================================

  // ----------------- Page Loading and Performance Optimizations -----------------
  // Add loading animation
  const loadingScreen = document.createElement('div');
  loadingScreen.className = 'loading-screen';
  loadingScreen.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p>Loading GLA University...</p>
    </div>
  `;
  document.body.appendChild(loadingScreen);
  
  // Remove loading screen when page is fully loaded
  window.addEventListener('load', () => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.remove();
    }, 500);
  });
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add error boundaries for better user experience
  window.addEventListener('error', (e) => {
    console.error('Global error caught:', e.error);
    // Show user-friendly error message
    showNotification('Something went wrong. Please refresh the page.', 'error');
  });
  
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      background: ${type === 'error' ? '#ff4757' : '#1e3c72'};
      color: white;
      border-radius: 8px;
      z-index: 10001;
      font-size: 14px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      transform: translateX(400px);
      transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  }

  // ----------------- DSW Section: Video Modal and Animations -----------------
  
  // Video Modal Functionality
  const videoModal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const closeModal = document.getElementById('closeModal');
  const playVideoBtns = document.querySelectorAll('.play-video-btn');

  // Video sources for different events
  const videoSources = {
    spandan: './videos/spandan-highlights.mp4',
    technavya: './videos/technavya-highlights.mp4',
    dandiya: './videos/dandiya-night-highlights.mp4'
  };

  // Open video modal
  playVideoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const videoType = btn.getAttribute('data-video');
      if (videoSources[videoType]) {
        modalVideo.src = videoSources[videoType];
        videoModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Handle video load error
        modalVideo.addEventListener('error', () => {
          alert('Video not available at the moment. Please try again later.');
          closeVideoModal();
        }, { once: true });
      }
    });
  });

  // Close video modal
  function closeVideoModal() {
    videoModal.style.display = 'none';
    modalVideo.pause();
    modalVideo.src = '';
    document.body.style.overflow = 'auto';
  }

  if (closeModal) {
    closeModal.addEventListener('click', closeVideoModal);
  }

  // Close modal when clicking outside
  videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeVideoModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal?.style.display === 'block') {
      closeVideoModal();
    }
  });

  // Animated Counter for DSW Stats
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);
      
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target; // Ensure final value is exact
      }
    }
    
    requestAnimationFrame(updateCounter);
  }

  // Intersection Observer for DSW animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const dswObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate stat numbers
        const statNumbers = entry.target.querySelectorAll('.stat-number[data-target]');
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'));
          if (target) {
            animateCounter(stat, target);
            stat.removeAttribute('data-target'); // Prevent re-animation
          }
        });

        // Add fade-in animation to event cards
        const eventCards = entry.target.querySelectorAll('.event-card');
        eventCards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 300);
        });
      }
    });
  }, observerOptions);

  // Auto-trigger counter animation for immediate visibility
  setTimeout(() => {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-target'));
      if (target) {
        animateCounter(stat, target);
        stat.removeAttribute('data-target');
      }
    });
  }, 1500);

  // Observe DSW section
  const dswSection = document.querySelector('.dsw-section');
  if (dswSection) {
    dswObserver.observe(dswSection);
    
    // Set initial state for event cards
    const eventCards = dswSection.querySelectorAll('.event-card');
    eventCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
  }

  // Observe Dean section for animations
  const deanSection = document.querySelector('.enhanced-dean-section');
  if (deanSection) {
    dswObserver.observe(deanSection);
  }

  // Smooth scroll to DSW section
  function scrollToDSW() {
    dswSection?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }

  // Add smooth scroll for all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Initialize all animations on page load
  function initializeAnimations() {
    // Trigger counter animations for visible elements
    const allStatNumbers = document.querySelectorAll('.stat-number[data-target]');
    allStatNumbers.forEach(stat => {
      const rect = stat.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const target = parseInt(stat.getAttribute('data-target'));
        if (target) {
          setTimeout(() => {
            animateCounter(stat, target);
            stat.removeAttribute('data-target');
          }, Math.random() * 1000 + 500); // Stagger animations
        }
      }
    });
  }

  // Initialize footer stats specifically
  function initializeFooterStats() {
    const footerStats = document.querySelector('.footer-stats');
    if (footerStats) {
      footerObserver.observe(footerStats);
      
      // Also trigger animation if footer is already visible
      const rect = footerStats.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const footerStatNumbers = footerStats.querySelectorAll('.stat-number[data-target]');
        footerStatNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'));
          if (target) {
            setTimeout(() => {
              animateCounter(stat, target);
              stat.removeAttribute('data-target');
            }, 2000); // Delayed start for footer
          }
        });
      }
    }
  }

  // Initialize on page load
  setTimeout(initializeAnimations, 1000);
  setTimeout(initializeFooterStats, 1500);
});
