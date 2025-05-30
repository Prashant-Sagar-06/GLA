// ----------------- Typewriter Effect -----------------
const typewriter = document.getElementById("typewriter");
const text = "Welcome to GLA University Cultural Clubs!";

let index = 0;
let isDeleting = false;

function typeEffect() {
    if (!typewriter) return; // Prevent error if element not found
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

document.addEventListener("DOMContentLoaded", function() {
    new Swiper('.nccSwiper', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 30,
        slideShadows: false,
      },
    });
  });