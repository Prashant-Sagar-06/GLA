// ----------------- DOMContentLoaded: All Main Logic -----------------
document.addEventListener("DOMContentLoaded", async () => {

  // Check if we're on a Council page and skip certain initializations
  const isCouncilPage = window.location.pathname.includes('Council/');
  const isSimplePage = isCouncilPage; // Add other simple pages here if needed

  // Static mode detection - check if we're running without a backend server
  const isStaticMode = !window.location.href.includes('localhost') || window.location.protocol === 'file:';
  console.info(isStaticMode ? 'Running in static mode - API calls disabled' : 'Running with backend server');

  // Global flag for API errors
  let hasApiErrors = false;

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
  if (!isSimplePage) {
    try {
      if (!isStaticMode) {
        const res = await fetch('/api/images');
        if (res.ok) {
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
        } else {
          console.info('API endpoint /api/images not available, using static content');
          hasApiErrors = true;
        }
      } else {
        console.info('Static mode: Using static image content');
        hasApiErrors = true;
      }
    } catch (err) {
      console.info('API endpoint /api/images not available, using static content');
      hasApiErrors = true;
    }
  }

  // ----------------- Enhanced Dean Profile Section -----------------
  if (!isSimplePage) {
    try {
      // Initialize enhanced dean section with animations
      initializeDeanSection();
    
      // Try to load dean data from API, fallback to static content
      if (!isStaticMode) {
        try {
          const deanRes = await fetch('/api/dean');
          if (deanRes.ok) {
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
        } else {
          console.info('API endpoint /api/dean not available, using static content');
          hasApiErrors = true;
        }
        } catch (apiErr) {
          console.info('API endpoint /api/dean not available, using static content');
          hasApiErrors = true;
        }
      } else {
        console.info('Static mode: Using static dean content');
        hasApiErrors = true;
      }
    } catch (err) {
      console.error('Failed to initialize dean section:', err);
    }
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
  if (!isStaticMode) {
    try {
      const res = await fetch('/api/council-members');
      if (res.ok) {
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
    } else {
      console.info('API endpoint /api/council-members not available, using static content');
      hasApiErrors = true;
    }
    } catch (err) {
      console.info('API endpoint /api/council-members not available, using static content');
      hasApiErrors = true;
    }
  } else {
    console.info('Static mode: Using static council members content');
    hasApiErrors = true;
  }

  // ----------------- Departmental Clubs Section -----------------
  if (!isSimplePage) {
    if (!isStaticMode) {
      try {
        const res = await fetch('/api/departmental-clubs');
        if (res.ok) {
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
        } else {
          console.info('API endpoint /api/departmental-clubs not available, using static content');
          hasApiErrors = true;
        }
      } catch (err) {
        console.info('API endpoint /api/departmental-clubs not available, using static content');
        hasApiErrors = true;
      }
    } else {
      console.info('Static mode: Using static departmental clubs content');
      hasApiErrors = true;
    }
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
    button.addEventListener('click', function (e) {
      try {
        e.preventDefault(); // Prevent any default behavior
        
        const section = this.getAttribute('data-section');
        const url = this.getAttribute('data-url');
        
        console.log('Submenu clicked:', { section, url }); // Debug log
        
        if (url) {
          console.log('Navigating to:', url); // Debug log
          window.location.href = url;
        } else {
          // Fallback for sections without specific URLs
          let fallbackUrl = '';
          if (section === "cultural") {
            fallbackUrl = "Cultural/cultural_club.html";
          } else if (section === "departmental") {
            fallbackUrl = "Departmental/Departmental.html";
          } else if (section === "sports") {
            fallbackUrl = "Sports/Sports.html";
          } else if (section === "student-affairs") {
            fallbackUrl = "Council/student-affairs.html";
          } else if (section === "cultural-affairs") {
            fallbackUrl = "Council/cultural-affairs.html";
          } else if (section === "sports-council") {
            fallbackUrl = "Council/sports-council.html";
          }
          
          if (fallbackUrl) {
            console.log('Using fallback URL:', fallbackUrl); // Debug log
            window.location.href = fallbackUrl;
          } else {
            console.warn('No URL found for section:', section);
          }
        }
      } catch (error) {
        console.error('Error in submenu navigation:', error);
        showNotification('Navigation error. Please try again.', 'error');
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
      const href = this.getAttribute('href');
      
      // Skip if href is just "#" or empty
      if (!href || href === '#' || href.length <= 1) {
        e.preventDefault();
        return;
      }
      
      e.preventDefault();
      try {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      } catch (error) {
        console.warn('Invalid selector for smooth scroll:', href);
      }
    });
  });
  
  // Add error boundaries for better user experience
  window.addEventListener('error', (e) => {
    console.error('Global error caught:', e.error);
    console.error('Error details:', {
      message: e.message,
      filename: e.filename,
      lineno: e.lineno,
      colno: e.colno,
      error: e.error
    });
    
    // Only show notification for critical errors, not minor issues
    if (e.error && e.error.stack && !e.message.includes('Script error')) {
      showNotification('A minor issue occurred. The page should still work normally.', 'warning');
    }
  });
  
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    let backgroundColor = '#1e3c72'; // default info
    if (type === 'error') backgroundColor = '#ff4757';
    else if (type === 'warning') backgroundColor = '#ff9f43';
    else if (type === 'success') backgroundColor = '#2ed573';
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      background: ${backgroundColor};
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
      const href = this.getAttribute('href');
      
      // Skip if href is just "#" or empty
      if (!href || href === '#' || href.length <= 1) {
        e.preventDefault();
        return;
      }
      
      e.preventDefault();
      try {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      } catch (error) {
        console.warn('Invalid selector for smooth scroll:', href);
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

  // Add notification for static mode when APIs are not available
  function addStaticModeNotification() {
    const notification = document.createElement('div');
    notification.id = 'static-mode-notification';
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 10px;
        right: 10px;
        background: #4A90E2;
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        max-width: 300px;
      ">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span>ℹ️</span>
          <span>Website running in static mode</span>
          <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                  style="background: none; border: none; color: white; font-size: 16px; cursor: pointer; margin-left: auto;">×</button>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      const notificationElement = document.getElementById('static-mode-notification');
      if (notificationElement) {
        notificationElement.remove();
      }
    }, 10000);
  }

  // Track if any API calls failed
  
  // Show static mode notification if any API calls failed
  if (hasApiErrors) {
    addStaticModeNotification();
  }

  // Add lazy loading to all images that don't already have it
  function addLazyLoadingToImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Skip if already has loading attribute or is critical (like logo)
      if (!img.hasAttribute('loading') && !img.src.includes('logo.png')) {
        img.setAttribute('loading', 'lazy');
      }
    });
  }

  // Call immediately to add lazy loading to all images
  addLazyLoadingToImages();

  // Optimize video loading for better performance
  function optimizeVideoLoading() {
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
      // Add loading timeout - if video doesn't load in 3 seconds, show static background
      const videoTimeout = setTimeout(() => {
        if (heroVideo.readyState < 2) { // HAVE_CURRENT_DATA
          console.info('Video loading slowly, showing fallback image');
          heroVideo.style.display = 'none';
          const videoBanner = heroVideo.closest('.video-banner');
          if (videoBanner) {
            videoBanner.style.backgroundImage = 'url(./images/gla_banner.png)';
            videoBanner.style.backgroundSize = 'cover';
            videoBanner.style.backgroundPosition = 'center';
          }
        }
      }, 3000);

      // Clear timeout if video loads successfully
      heroVideo.addEventListener('loadeddata', () => {
        clearTimeout(videoTimeout);
        console.info('Video loaded successfully');
      });

      // Handle video error
      heroVideo.addEventListener('error', () => {
        clearTimeout(videoTimeout);
        console.info('Video failed to load, showing fallback');
        heroVideo.style.display = 'none';
      });
    }
  }

  // Call video optimization
  optimizeVideoLoading();

  // Performance monitoring
  function logPerformanceMetrics() {
    if (window.performance && window.performance.timing) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const timing = window.performance.timing;
          const loadTime = timing.loadEventEnd - timing.navigationStart;
          const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
          const firstPaint = timing.responseEnd - timing.navigationStart;
          
          console.log('🚀 Performance Metrics:');
          console.log(`📄 DOM Ready: ${domReady}ms`);
          console.log(`🎨 First Paint: ${firstPaint}ms`);
          console.log(`✅ Full Load: ${loadTime}ms`);
          
          // Show user-friendly notification for slow loading
          if (loadTime > 5000) {
            showNotification('Page loaded but images may still be loading. This is normal for first visit.', 'info');
          }
        }, 100);
      });
    }
  }

  // Start performance monitoring
  logPerformanceMetrics();

  // Ensure all loading overlays are hidden (final safety check)
  setTimeout(() => {
    const loadingElements = document.querySelectorAll('.loading, .loader, .loading-spinner, .loading-overlay, .swiper-lazy-preloader, .spinner, .page-loader');
    loadingElements.forEach(el => {
      el.style.display = 'none';
      el.style.opacity = '0';
      el.style.visibility = 'hidden';
    });
    
    // Mark body as page loaded
    document.body.classList.add('page-loaded');
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
    
    console.info('Page fully loaded and all loading states cleared');
  }, 1000);
});
