/* ===========================================================
  HEADER & FOOTER JAVASCRIPT
  This file contains all JavaScript related to top bar, navbar, and footer functionality
=========================================================== */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // ============================================================
  // ACCESSIBILITY CONTROLS
  // ============================================================
  let currentFontSize = 16;
  const minFontSize = 12;
  const maxFontSize = 24;
  
  // Find accessibility controls with any ID that ends with the expected suffixes
  const zoomInBtn = document.querySelector('[id$="zoom-in"]');
  const zoomOutBtn = document.querySelector('[id$="zoom-out"]'); 
  const resetBtn = document.querySelector('[id$="reset"]');

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

  // ============================================================
  // MOBILE SIDEBAR FUNCTIONALITY
  // ============================================================
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
    console.log('Opening sidebar...');
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

  // ============================================================
  // NAVBAR FUNCTIONALITY
  // ============================================================
  
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
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch (error) {
        console.warn('Invalid selector for smooth scroll:', href);
      }
    });
  });

  // Navbar scroll effect
  let lastScrollTop = 0;
  const navbar = document.querySelector('.modern-navbar');
  if (navbar) {
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
  }

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

  // ============================================================
  // TOP BAR TYPEWRITER EFFECT
  // ============================================================
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
  
  // Start typewriter effect
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

  // ============================================================
  // FOOTER FUNCTIONALITY
  // ============================================================
  
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

  // Footer sections animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Observe footer sections for animation
  document.querySelectorAll('.footer-section, .footer-stats').forEach(section => {
    observer.observe(section);
  });

  // ============================================================
  // SUBMENU NAVIGATION FUNCTIONALITY - CLEAN VERSION
  // ============================================================
  
  // Handle main menu items that have submenus
  document.querySelectorAll('.main-menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const section = e.target.getAttribute('data-section');
      const submenu = document.getElementById(`${section}-submenu`);
      
      console.log(`Clicked on section: ${section}`);
      
      if (submenu) {
        // Check if this submenu is currently active
        const isCurrentlyActive = submenu.classList.contains('active');
        
        // Close all submenus first
        document.querySelectorAll('.sub-menu').forEach(menu => {
          menu.classList.remove('active');
        });
        
        // Remove active class from all main menu items
        document.querySelectorAll('.main-menu-item').forEach(menuItem => {
          menuItem.classList.remove('active');
          menuItem.setAttribute('aria-expanded', 'false');
        });
        
        // If the clicked submenu was NOT active, make it active
        if (!isCurrentlyActive) {
          submenu.classList.add('active');
          // Add debug class temporarily to test visibility
          submenu.classList.add('debug');
          item.classList.add('active');
          item.setAttribute('aria-expanded', 'true');
          console.log(`Activated submenu: ${section}`);
          
          // Remove debug class after 3 seconds
          setTimeout(() => {
            submenu.classList.remove('debug');
          }, 3000);
        }
        
        // Force a style recalculation
        submenu.offsetHeight;
        
        console.log(`Submenu ${section} is now: ${submenu.classList.contains('active') ? 'ACTIVE' : 'INACTIVE'}`);
      } else {
        console.warn(`Submenu not found for section: ${section}`);
      }
    });
  });
  
  // Handle submenu button clicks
  document.querySelectorAll('.sub-menu-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const url = e.target.getAttribute('data-url');
      
      if (url) {
        console.log(`Navigating to: ${url}`);
        
        // Add loading state
        e.target.style.opacity = '0.7';
        e.target.innerHTML += ' ⟳';
        
        // Navigate to the URL
        setTimeout(() => {
          window.location.href = url;
        }, 300);
      } else {
        console.warn('No URL found for submenu button:', e.target);
      }
    });
  });

  // ============================================================
  // UTILITY FUNCTIONS
  // ============================================================
  
  // Add CSS animation keyframes dynamically
  function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        animation: ripple-effect 0.6s linear;
        pointer-events: none;
      }
      
      @keyframes ripple-effect {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Initialize animation styles
  addAnimationStyles();

  // ============================================================
  // RESPONSIVE BEHAVIOR
  // ============================================================
  
  // Handle window resize
  window.addEventListener('resize', () => {
    // Reset mobile menu state on resize
    if (window.innerWidth > 768) {
      if (navbarNav) navbarNav.classList.remove('active');
      if (menuToggle) menuToggle.classList.remove('active');
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });

  // ============================================================
  // PERFORMANCE OPTIMIZATIONS
  // ============================================================
  
  // Throttle scroll events
  function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  // Apply throttling to scroll events (if needed)
  const throttledScrollHandler = throttle(() => {
    // Additional scroll handling can be added here
  }, 16); // ~60fps
  
  window.addEventListener('scroll', throttledScrollHandler);

  console.log('Header & Footer functionality initialized successfully');
});

// ============================================================
// EXPORT FUNCTIONS (if needed for module systems)
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    // Export any functions that might be needed elsewhere
  };
}

// ==================== FIX: Sidebar Submenu Toggle ====================
document.querySelectorAll('.main-menu-item').forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('aria-controls');
    const submenu = document.getElementById(targetId);
    if (submenu) {
      submenu.classList.toggle('active');
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
    }
  });
});

document.querySelectorAll('.sub-menu-btn').forEach(button => {
  button.addEventListener('click', function () {
    const url = this.getAttribute('data-url');
    if (url) {
      window.location.href = url;
    }
  });
});
// ==================== END FIX ====================