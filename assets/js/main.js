/**
 * Afaq Ahmad Real Estate — Main JavaScript
 * Initializes all modules and global functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initScrollProgress();
  initBackToTop();
  initHeader();
  initThemeToggle();
  initSearchOverlay();
  initMobileNav();
  initCounters();
  initImageReveal();
  initFAQ();
  initFavorites();
  initActiveNav();
  initContactForm();
  initAOS();
});

/* Page Loader */
function initPageLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 1400);
  });
}

/* Scroll Progress Bar */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress__bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }, { passive: true });
}

/* Back to Top */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Header Scroll State */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
}

/* Dark Mode Toggle */
function initThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(toggle, saved);
  }

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(toggle, next);
  });
}

function updateThemeIcon(toggle, theme) {
  const icon = toggle.querySelector('i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

/* Search Overlay */
function initSearchOverlay() {
  const openBtn = document.querySelector('.search-toggle');
  const overlay = document.querySelector('.search-overlay');
  const closeBtn = document.querySelector('.search-overlay__close');
  const input = document.querySelector('.search-overlay__input');

  if (!openBtn || !overlay) return;

  openBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    setTimeout(() => input?.focus(), 300);
  });

  closeBtn?.addEventListener('click', () => overlay.classList.remove('active'));

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') overlay.classList.remove('active');
  });
}

/* Mobile Navigation */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* Animated Counters */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* Image Reveal on Scroll */
function initImageReveal() {
  const images = document.querySelectorAll('.reveal-image');
  if (!images.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  images.forEach(img => observer.observe(img));
}

/* FAQ Accordion */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    question?.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });
}

/* Favorite Toggle */
function initFavorites() {
  document.querySelectorAll('.property-card__favorite').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = btn.classList.contains('active') ? 'fas fa-heart' : 'far fa-heart';
      }
    });
  });
}

/* Active Navigation Link */
function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav__link, .mobile-nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* Contact Form */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Message Sent ✓';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

/* Newsletter Forms */
document.querySelectorAll('.newsletter-inline, .site-footer__newsletter').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const btn = form.querySelector('button');
    if (btn) btn.innerHTML = '<i class="fas fa-check"></i>';
    if (input) input.value = '';
    setTimeout(() => {
      if (btn) btn.innerHTML = '<i class="fas fa-arrow-right"></i>';
    }, 2000);
  });
});

/* AOS Init */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80
    });
  }
}

/* Property Filter */
function initPropertyFilter() {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('[data-category]');

  if (!pills.length || !cards.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Load Property Detail from URL */
async function loadPropertyDetail() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  if (!slug) return;

  try {
    const res = await fetch('data/properties.json');
    const properties = await res.json();
    const property = properties.find(p => p.slug === slug);
    if (!property) return;

    document.title = `${property.title} | Afaq Ahmad Real Estate`;

    const setText = (sel, text) => {
      const el = document.querySelector(sel);
      if (el) el.textContent = text;
    };

    setText('[data-property-title]', property.title);
    setText('[data-property-price]', property.price);
    setText('[data-property-location]', property.location);
    setText('[data-property-beds]', property.bedrooms);
    setText('[data-property-baths]', property.bathrooms);
    setText('[data-property-garage]', property.garage);
    setText('[data-property-area]', property.area);
    setText('[data-property-desc]', property.description);

    const featuresEl = document.querySelector('[data-property-features]');
    if (featuresEl && property.features) {
      featuresEl.innerHTML = property.features.map(f =>
        `<div class="property-detail__feature"><i class="fas fa-check"></i> ${f}</div>`
      ).join('');
    }

    const swiperWrapper = document.querySelector('.property-detail__gallery .swiper-wrapper');
    if (swiperWrapper && property.images) {
      swiperWrapper.innerHTML = property.images.map(img =>
        `<div class="swiper-slide"><img src="${img}" alt="${property.title}" loading="lazy"></div>`
      ).join('');
    }

    initPropertyGallerySwiper();
  } catch (err) {
    console.error('Failed to load property:', err);
  }
}

/* Property Detail Gallery Swiper */
function initPropertyGallerySwiper() {
  const gallery = document.querySelector('.property-detail__gallery');
  if (!gallery || typeof Swiper === 'undefined') return;

  if (gallery.swiper) gallery.swiper.destroy(true, true);

  new Swiper('.property-detail__gallery', {
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
  });
}

/* Render Properties Grid */
async function renderProperties(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  try {
    const res = await fetch('data/properties.json');
    const properties = await res.json();
    const limit = container.dataset.limit ? parseInt(container.dataset.limit) : properties.length;
    const items = properties.slice(0, limit);

    container.innerHTML = items.map(p => `
      <article class="property-card" data-category="${p.category}" data-aos="fade-up">
        <div class="property-card__image-wrap">
          <img class="property-card__image" src="${p.image}" alt="${p.title}" loading="lazy">
          <span class="property-card__tag">${p.category}</span>
          <button class="property-card__favorite" aria-label="Add to favorites"><i class="far fa-heart"></i></button>
          <div class="property-card__overlay">
            <a href="property-detail.html?slug=${p.slug}" class="property-card__view">View Details →</a>
          </div>
        </div>
        <div class="property-card__body">
          <div class="property-card__price">${p.price}</div>
          <h3 class="property-card__title"><a href="property-detail.html?slug=${p.slug}">${p.title}</a></h3>
          <div class="property-card__location"><i class="fas fa-map-marker-alt"></i> ${p.location}</div>
          <div class="property-card__meta">
            ${p.bedrooms ? `<span class="property-card__meta-item"><i class="fas fa-bed"></i> ${p.bedrooms} Beds</span>` : ''}
            ${p.bathrooms ? `<span class="property-card__meta-item"><i class="fas fa-bath"></i> ${p.bathrooms} Baths</span>` : ''}
            <span class="property-card__meta-item"><i class="fas fa-ruler-combined"></i> ${p.area}</span>
          </div>
        </div>
      </article>
    `).join('');

    initFavorites();
    initPropertyFilter();
    if (typeof AOS !== 'undefined') AOS.refresh();
  } catch (err) {
    console.error('Failed to load properties:', err);
  }
}

/* Auto-init page-specific modules */
document.addEventListener('DOMContentLoaded', () => {
  renderProperties('[data-properties-grid]');
  renderProperties('[data-properties-masonry]');
  loadPropertyDetail();

  /* Init swiper on property detail when no slug param (default content) */
  if (document.querySelector('.property-detail__gallery') && !new URLSearchParams(window.location.search).get('slug')) {
    initPropertyGallerySwiper();
  }
});
