document.addEventListener('DOMContentLoaded', () => {
  // typing effect
  const typedText = document.getElementById('typed-text');
  const phrases = ["Software Developer", "Web Developer", "UI/UX Designer", "Student"];
  let phraseIndex = 0, charIndex = 0, isDeleting = false;

  function typeEffect() {
    if (!typedText) return;
    const current = phrases[phraseIndex];

    charIndex += isDeleting ? -1 : 1;
    typedText.textContent = current.substring(0, charIndex);

    let delay = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === current.length) { delay = 2000; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 500; }

    setTimeout(typeEffect, delay);
  }
  typeEffect();

  // mobile nav
  const hamburger = document.querySelector('.hamburger');
  const navWrapper = document.querySelector('.nav-wrapper');
  const overlay = document.querySelector('.overlay');
  const closeBtn = document.querySelector('.close-btn');

  function openMenu() {
    if (!navWrapper) return;
    navWrapper.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    if (!navWrapper) return;
    navWrapper.classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  hamburger && hamburger.addEventListener('click', openMenu);
  closeBtn && closeBtn.addEventListener('click', closeMenu);
  overlay && overlay.addEventListener('click', closeMenu);

  // main skills carousel (infinite scroll)
  const mainCarousel = document.querySelector('.skills-carousel');
  if (mainCarousel) {
    const mainContainer = mainCarousel.querySelector('.skills-container');
    const mainLeftBtn = mainCarousel.querySelector('.arrow.left');
    const mainRightBtn = mainCarousel.querySelector('.arrow.right');

    if (mainContainer) {
      const originals = Array.from(mainContainer.children);
      originals.forEach(item => {
        const clone = item.cloneNode(true);
        clone.classList.add('clone');
        mainContainer.appendChild(clone);
      });

      let scrollInterval;
      const scrollSpeed = 1;

      function startAutoScroll() {
        stopAutoScroll();
        scrollInterval = setInterval(() => {
          mainContainer.scrollLeft += scrollSpeed;
          if (mainContainer.scrollLeft >= mainContainer.scrollWidth / 2) {
            mainContainer.scrollLeft = 0;
          }
        }, 20);
      }
      function stopAutoScroll() {
        if (scrollInterval) clearInterval(scrollInterval);
      }

      mainLeftBtn && mainLeftBtn.addEventListener('click', () => {
        mainContainer.scrollBy({ left: -200, behavior: 'smooth' });
      });
      mainRightBtn && mainRightBtn.addEventListener('click', () => {
        mainContainer.scrollBy({ left: 200, behavior: 'smooth' });
      });

      mainCarousel.addEventListener('mouseenter', stopAutoScroll);
      mainCarousel.addEventListener('mouseleave', startAutoScroll);

      startAutoScroll();
    }
  }

  // smaller widget carousels (one item per view)
  document.querySelectorAll('.widget-carousel').forEach((carousel) => {
    const track = carousel.querySelector('.widget-track');
    const dotsWrap = carousel.nextElementSibling;
    const dots = dotsWrap ? dotsWrap.querySelectorAll('.dot') : [];
    if (!track) return;

    const widgets = track.children;
    let currentIndex = 0;
    let autoplayInterval;

    const scrollToIndex = (i) => {
      const w = carousel.offsetWidth;
      carousel.scrollTo({ left: w * i, behavior: 'smooth' });
      dots.forEach(d => d.classList.remove('active'));
      if (dots[i]) dots[i].classList.add('active');
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % widgets.length;
      scrollToIndex(currentIndex);
    };

    const startAutoplay = () => {
      stopAutoplay();
      autoplayInterval = setInterval(nextSlide, 5000);
    };
    const stopAutoplay = () => {
      if (autoplayInterval) clearInterval(autoplayInterval);
    };

    startAutoplay();
    carousel.addEventListener('touchstart', stopAutoplay);
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('touchend', startAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    carousel.addEventListener('scroll', () => {
      const idx = Math.round(carousel.scrollLeft / carousel.offsetWidth);
      currentIndex = idx;
      dots.forEach(d => d.classList.remove('active'));
      if (dots[idx]) dots[idx].classList.add('active');
    });
  });

  // projects segmented filter
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

    filterCards('proj'); // default
  })();

  // smooth scroll to contact
  document.querySelectorAll('a[href="#contact"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector('#contact');
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // contact form submit
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const statusEl = document.getElementById('formStatus');
      if (statusEl) statusEl.textContent = "Sending...";

      const formData = new FormData(e.target);
      try {
        const res = await fetch("https://formspree.io/f/mdkdbdkn", {
          method: "POST",
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          statusEl && (statusEl.textContent = "Thanks! Your message has been sent.");
          e.target.reset();
        } else {
          statusEl && (statusEl.textContent = "Oops! Something went wrong. Please try again.");
        }
      } catch {
        statusEl && (statusEl.textContent = "Network error. Please try later.");
      }
    });
  }

  // header theme switching from section data-theme
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section');
  if (header && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const theme = entry.target.getAttribute('data-theme');
        if (theme === 'dark') {
          header.classList.remove('light-text');
          header.classList.add('dark-text');
        } else {
          header.classList.remove('dark-text');
          header.classList.add('light-text');
        }
      });
    }, {
      threshold: 0.9
    });
    sections.forEach(section => observer.observe(section));
  }
});
