const typedText = document.getElementById("typed-text"); // declare the variable to hold the element from the HTML

const phrases = [
  "Software Developer",
  "Web Developer",
  "UI/UX Designer",
  "Student"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false; // flag to check if we are deleting characters or typing new ones

function typeEffect() 
{
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) 
 {
    charIndex--;
  } 
  else 
  {
    charIndex++;
  }

typedText.textContent = currentPhrase.substring(0, charIndex); // update the text content of the element

  let delay = isDeleting ? 50 : 100; // typing speed.. the question mark is used for getting the value of the variable.. 

  if (!isDeleting && charIndex === currentPhrase.length) // if the current phrase is fully typed
  {
    delay = 2000; // pause at end
    isDeleting = true;
  } 
  else if (isDeleting && charIndex === 0) // if we have deleted all characters of the current phrase
  {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length; // move to the next phrase.. modulus operator ensures we loop back to the first phrase
    delay = 500; // pause before typing new word
  }

  setTimeout(typeEffect, delay); // call the function again after the delay
}

const hamburger = document.querySelector('.hamburger');
const navWrapper = document.querySelector('.nav-wrapper');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');

hamburger.addEventListener('click', () => {
  navWrapper.classList.add('open');
  document.body.style.overflow = 'hidden';
});

function closeMenu() {
  navWrapper.classList.remove('open');
  document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);


  document.addEventListener('DOMContentLoaded', () => {
    const mainCarousel = document.querySelector('.skills-carousel');
    const mainContainer = mainCarousel.querySelector('.skills-container');
    const mainLeftBtn = mainCarousel.querySelector('.arrow.left');
    const mainRightBtn = mainCarousel.querySelector('.arrow.right');

    // Clone all children for seamless scroll
    const originalItems = Array.from(mainContainer.children);
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('clone');
      mainContainer.appendChild(clone);
    });

    let scrollInterval;
    let scrollSpeed = 1; // pixels per step

    function startAutoScroll() {
      scrollInterval = setInterval(() => {
        mainContainer.scrollLeft += scrollSpeed;

        const scrollWidth = mainContainer.scrollWidth;
        const visibleWidth = mainContainer.clientWidth;

        // When we scroll past the original content + some buffer, reset scroll
        if (mainContainer.scrollLeft >= scrollWidth / 2) {
          mainContainer.scrollLeft = 0;
        }
      }, 20);
    }

    function stopAutoScroll() {
      clearInterval(scrollInterval);
    }

    // Arrow buttons (manual control)
    mainLeftBtn.addEventListener('click', () => {
      mainContainer.scrollBy({ left: -200, behavior: 'smooth' });
    });

    mainRightBtn.addEventListener('click', () => {
      mainContainer.scrollBy({ left: 200, behavior: 'smooth' });
    });

    // Pause/resume on hover (entire carousel area including arrows)
    mainCarousel.addEventListener('mouseenter', stopAutoScroll);
    mainCarousel.addEventListener('mouseleave', startAutoScroll);

    startAutoScroll();
  });

  // Handle the two smaller carousels (one item visible at a time)
  // For each small carousel ("Tools" and "Other")

  document.querySelectorAll('.widget-carousel').forEach((carousel) => {
    const track = carousel.querySelector('.widget-track');
    const widgets = track.children;
    const dots = carousel.nextElementSibling.querySelectorAll('.dot');
    let currentIndex = 0;
    let autoplayInterval;

    const scrollToIndex = (index) => {
      const containerWidth = carousel.offsetWidth;
      carousel.scrollTo({
        left: containerWidth * index,
        behavior: 'smooth'
      });

      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % widgets.length;
      scrollToIndex(currentIndex);
    };

    const startAutoplay = () => {
      autoplayInterval = setInterval(nextSlide, 5000); // change every 5s
    };

    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
    };

    // Start autoplay
    startAutoplay();

    // Pause autoplay on user interaction
    carousel.addEventListener('touchstart', stopAutoplay);
    carousel.addEventListener('mouseenter', stopAutoplay);

    // Resume autoplay on end
    carousel.addEventListener('touchend', startAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Sync dot when user scrolls manually
    carousel.addEventListener('scroll', () => {
      const index = Math.round(carousel.scrollLeft / carousel.offsetWidth);
      currentIndex = index;
      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    });
  });
  
  (function () {
    const buttons = document.querySelectorAll('#projects .segmented .seg');
    const cards   = document.querySelectorAll('#projects .projects-grid .card');
  
    function setActive(btn) {
      buttons.forEach(b => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
    }
  
    function filterCards(category) {
      cards.forEach(card => {
        const matches = card.classList.contains(category);
        card.classList.toggle('is-hidden', !matches);
      });
    }
  
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.filter; 
        setActive(btn);
        filterCards(category);
      });
    });
  
    // Default view = projects
    filterCards('proj');
  })();
  
  document.querySelectorAll('a[href="#contact"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector('#contact');
      window.scrollTo({
        top: target.offsetTop, // exact top of section
        behavior: 'smooth'
      });
    });
  });

  document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const statusEl = document.getElementById('formStatus');
    statusEl.textContent = "Sending...";
  
    const formData = new FormData(e.target);
  
    try {
      const res = await fetch("https://formspree.io/f/mdkdbdkn", { // replace with your endpoint
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
  
      if (res.ok) {
        statusEl.textContent = "Thanks! Your message has been sent.";
        e.target.reset();
      } else {
        statusEl.textContent = "Oops! Something went wrong. Please try again.";
      }
    } catch (error) {
      statusEl.textContent = "Network error. Please try later.";
    }
  });
  
document.addEventListener("DOMContentLoaded", typeEffect); // start the typing effect when the DOM is fully loaded

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const theme = entry.target.getAttribute('data-theme');

        if (theme === 'dark') {
          header.classList.remove('light-text');
          header.classList.add('dark-text');
        } else {
          header.classList.remove('dark-text');
          header.classList.add('light-text');
        }
      }
    });
  }, {
    threshold: 0.90 // Trigger when 50% of the section is visible
  });

  sections.forEach(section => {
    observer.observe(section);
  });
});
