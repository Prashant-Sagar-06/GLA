/* ===========================================================
  CULTURAL CLUB INTERACTIVE FUNCTIONALITY
  Enhanced JavaScript for Aikyam Club and all Cultural Clubs
=========================================================== */

// ===========================================================
// 1. ACCESSIBILITY & ZOOM CONTROLS
// ===========================================================
let zoomLevel = 1;
const body = document.body;

// Function to initialize zoom controls for any club page
function initializeZoomControls() {
  // Get zoom control elements (they have different IDs for each club)
  const zoomInBtn = document.querySelector('[id$="-zoom-in"]') || document.getElementById('zoom-in');
  const zoomOutBtn = document.querySelector('[id$="-zoom-out"]') || document.getElementById('zoom-out');
  const resetBtn = document.querySelector('[id$="-reset"]') || document.getElementById('reset');

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      zoomLevel += 0.1;
      zoomLevel = Math.min(zoomLevel, 2); // Max zoom 2x
      body.style.transform = `scale(${zoomLevel})`;
      body.style.transformOrigin = 'top left';
      body.style.transition = 'transform 0.3s ease';
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      zoomLevel = Math.max(0.5, zoomLevel - 0.1); // Min zoom 0.5x
      body.style.transform = `scale(${zoomLevel})`;
      body.style.transformOrigin = 'top left';
      body.style.transition = 'transform 0.3s ease';
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      zoomLevel = 1;
      body.style.transform = 'scale(1)';
      body.style.transition = 'transform 0.3s ease';
    });
  }
}

// ===========================================================
// 2. SMOOTH SCROLLING & ANIMATIONS
// ===========================================================
function initializeScrollAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.team-card, .mentor-card, .president-card, .event-item');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });
}

// ===========================================================
// 3. TEAM CARD INTERACTIONS
// ===========================================================
function initializeTeamCardEffects() {
  const teamCards = document.querySelectorAll('.team-card, .mentor-card, .president-card');
  
  teamCards.forEach(card => {
    // Add hover sound effect (optional)
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
      card.style.transition = 'transform 0.3s ease';
      card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
    });

    // Click effect for mobile
    card.addEventListener('click', () => {
      card.style.transform = 'scale(0.98)';
      setTimeout(() => {
        card.style.transform = 'translateY(-5px) scale(1.01)';
      }, 150);
    });
  });
}

// ===========================================================
// 4. GALLERY & MEDIA FUNCTIONALITY
// ===========================================================
function initializeGallery() {
  const eventItems = document.querySelectorAll('.event-item');
  const videos = document.querySelectorAll('video');

  // Event item click to expand/modal effect
  eventItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      // Add click animation
      item.style.transform = 'scale(1.05)';
      setTimeout(() => {
        item.style.transform = 'scale(1)';
      }, 200);
      
      // Could add modal functionality here
      console.log(`Event ${index + 1} clicked`);
    });
  });

  // Video lazy loading and controls
  videos.forEach(video => {
    video.addEventListener('loadstart', () => {
      console.log('Video loading started');
    });

    video.addEventListener('canplay', () => {
      video.style.opacity = '1';
      video.style.transition = 'opacity 0.5s ease';
    });
  });
}

// ===========================================================
// 5. DYNAMIC STATISTICS COUNTER
// ===========================================================
function initializeCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  const countUp = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString();
    }, 20);
  };

  // Intersection observer for counters
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        countUp(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

// ===========================================================
// 6. NAVIGATION & MENU ENHANCEMENTS
// ===========================================================
function initializeNavigation() {
  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Back to top functionality
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ===========================================================
// 7. SEARCH & FILTER FUNCTIONALITY
// ===========================================================
function initializeSearch() {
  // Add search functionality for team members
  const searchInput = document.getElementById('member-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const memberCards = document.querySelectorAll('.team-card');
      
      memberCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const role = card.querySelector('p').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || role.includes(searchTerm)) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
}

// ===========================================================
// 8. SOCIAL MEDIA INTEGRATION
// ===========================================================
function initializeSocialFeatures() {
  const socialLinks = document.querySelectorAll('.social-icons a');
  
  socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Add click tracking or analytics here
      console.log(`Social link clicked: ${link.getAttribute('href')}`);
      
      // Add visual feedback
      link.style.transform = 'scale(1.2)';
      setTimeout(() => {
        link.style.transform = 'scale(1)';
      }, 200);
    });
  });
}

// ===========================================================
// 9. TYPEWRITER EFFECT FOR CLUB DESCRIPTION
// ===========================================================
function initializeTypewriter() {
  const typewriterElement = document.querySelector('.club-description p');
  if (typewriterElement) {
    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    typewriterElement.style.borderRight = '2px solid #003366';
    
    let index = 0;
    const typeEffect = () => {
      if (index < text.length) {
        typewriterElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 50);
      } else {
        // Remove cursor after typing is complete
        setTimeout(() => {
          typewriterElement.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    // Start typewriter effect when element is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(typeEffect, 500);
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(typewriterElement);
  }
}

// ===========================================================
// 10. ERROR HANDLING & FALLBACKS
// ===========================================================
function handleImageErrors() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', () => {
      img.src = '../../images/demo.jpg'; // Fallback image
      img.alt = 'Image not available';
    });
  });
}

// ===========================================================
// 11. PERFORMANCE OPTIMIZATION
// ===========================================================
function optimizePerformance() {
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ===========================================================
// MAIN INITIALIZATION
// ===========================================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('Cultural Club Page Loaded');
  
  // Initialize all features
  initializeZoomControls();
  initializeScrollAnimations();
  initializeTeamCardEffects();
  initializeGallery();
  initializeCounters();
  initializeNavigation();
  initializeSearch();
  initializeSocialFeatures();
  initializeTypewriter();
  handleImageErrors();
  optimizePerformance();
  
  // Add loading animation
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 1000);
  }
  
  console.log('All features initialized successfully');
});

// ===========================================================
// UTILITY FUNCTIONS
// ===========================================================
// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Mobile detection
function isMobile() {
  return window.innerWidth <= 768;
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  .loading-animation {
    animation: pulse 2s infinite;
  }
`;
document.head.appendChild(style);
