/**
 * Afaq Ahmad Real Estate — Core Interactive Engine
 * Production-quality frontend architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeader();
  initPageLoader();
  initScrollProgress();
  initBackToTop();
  initMobileNav();
  initActiveNav();
  initSearchOverlay();
  initCounters();
  initImageReveal();
  initFAQ();
  initFavorites();
  initContactForm();
  initNewsletterForms();
  initAOS();
  initImageFallback();

  // Page-specific modules
  initPropertiesModule();
  initPropertyDetailModule();
});

/* ==========================================================================
   1. Theme Management (Dark Mode Default + Curated Light Mode)
   ========================================================================== */
function initTheme() {
  const toggleBtns = document.querySelectorAll('.theme-toggle');
  const savedTheme = localStorage.getItem('aa_theme') || 'dark';

  applyTheme(savedTheme);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem('aa_theme', next);
    });
  });
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme'); // default is dark
  }

  const toggleBtns = document.querySelectorAll('.theme-toggle');
  toggleBtns.forEach(btn => {
    const icon = btn.querySelector('i');
    if (icon) {
      if (theme === 'light') {
        icon.className = 'fas fa-moon';
        btn.setAttribute('aria-label', 'Switch to dark mode');
        btn.setAttribute('title', 'Switch to dark mode');
      } else {
        icon.className = 'fas fa-sun';
        btn.setAttribute('aria-label', 'Switch to light mode');
        btn.setAttribute('title', 'Switch to light mode');
      }
    }
  });
}

/* ==========================================================================
   2. Header & Sticky Scroll
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   3. Page Loader
   ========================================================================== */
function initPageLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;

  const hideLoader = () => {
    loader.classList.add('hidden');
    setTimeout(() => {
      if (loader.parentNode) loader.style.display = 'none';
    }, 600);
  };

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 600);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 600));
    // Safety fallback
    setTimeout(hideLoader, 2000);
  }
}

/* ==========================================================================
   4. Scroll Progress Indicator
   ========================================================================== */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress__bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(progress, 100)}%`;
  }, { passive: true });
}

/* ==========================================================================
   5. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 450);
  }, { passive: true });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   6. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!hamburger || !mobileNav) return;

  function toggleNav(open) {
    const isActive = open !== undefined ? open : !hamburger.classList.contains('active');
    hamburger.classList.toggle('active', isActive);
    mobileNav.classList.toggle('active', isActive);
    hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    document.body.style.overflow = isActive ? 'hidden' : '';
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleNav();
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleNav(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
      toggleNav(false);
    }
  });
}

/* ==========================================================================
   7. Active Navigation Link Sync
   ========================================================================== */
function initActiveNav() {
  const pathname = window.location.pathname;
  let currentPage = pathname.substring(pathname.lastIndexOf('/') + 1) || 'index.html';
  if (currentPage === '') currentPage = 'index.html';

  document.querySelectorAll('.site-nav__link, .mobile-nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && (href === './' || href === 'index.html'))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   8. Global Live Search & Modal
   ========================================================================== */
let globalPropertiesCache = null;

async function fetchProperties() {
  if (globalPropertiesCache) return globalPropertiesCache;
  try {
    const res = await fetch('data/properties.json');
    if (!res.ok) throw new Error('Failed to fetch properties');
    globalPropertiesCache = await res.json();
    return globalPropertiesCache;
  } catch (err) {
    console.error('Properties load error:', err);
    return [];
  }
}

function initSearchOverlay() {
  const openBtns = document.querySelectorAll('.search-toggle');
  const overlay = document.querySelector('.search-overlay');
  const closeBtn = document.querySelector('.search-overlay__close');
  const input = document.querySelector('.search-overlay__input');

  if (!overlay) return;

  // Create or select search results container
  let resultsContainer = overlay.querySelector('.search-results');
  if (!resultsContainer && overlay.querySelector('.search-overlay__inner')) {
    resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    resultsContainer.setAttribute('aria-live', 'polite');
    overlay.querySelector('.search-overlay__inner').appendChild(resultsContainer);
  }

  function openSearch() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input?.focus(), 250);
  }

  function closeSearch() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    if (input) input.value = '';
    if (resultsContainer) resultsContainer.innerHTML = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', openSearch));
  closeBtn?.addEventListener('click', closeSearch);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeSearch();
    }
  });

  // Live searching
  if (input) {
    let debounceTimer;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      const query = input.value.trim().toLowerCase();
      debounceTimer = setTimeout(async () => {
        if (!query) {
          resultsContainer.innerHTML = '';
          return;
        }

        const properties = await fetchProperties();
        const matches = properties.filter(p =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.description && p.description.toLowerCase().includes(query)) ||
          (p.features && p.features.some(f => f.toLowerCase().includes(query)))
        );

        if (matches.length === 0) {
          resultsContainer.innerHTML = `<div class="search-no-results">No properties found matching "${escapeHtml(input.value)}".</div>`;
          return;
        }

        resultsContainer.innerHTML = matches.slice(0, 6).map(p => `
          <a href="property-detail.html?slug=${p.slug}" class="search-result-item">
            <img class="search-result-item__thumb" src="${p.image}" alt="${p.title}" loading="lazy">
            <div class="search-result-item__info">
              <div class="search-result-item__title">${escapeHtml(p.title)}</div>
              <div class="search-result-item__meta">
                <span><i class="fas fa-map-marker-alt"></i> ${escapeHtml(p.location)}</span>
                <span class="search-result-item__price">${p.price}</span>
              </div>
            </div>
          </a>
        `).join('');
      }, 200);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const q = input.value.trim();
        if (q) {
          window.location.href = `properties.html?search=${encodeURIComponent(q)}`;
        }
      }
    });
  }
}

/* ==========================================================================
   9. Animated Statistics Counters
   ========================================================================== */
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
  }, { threshold: 0.3 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Cubic ease out
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = Math.floor(eased * target);
    el.textContent = `${val}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = `${target}${suffix}`;
    }
  }

  requestAnimationFrame(update);
}

/* ==========================================================================
   10. Image Reveal On Scroll
   ========================================================================== */
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
  }, { threshold: 0.15 });

  images.forEach(img => observer.observe(img));
}

/* ==========================================================================
   11. FAQ Accordion & Category Tabs
   ========================================================================== */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    if (!question) return;

    question.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');

    question.addEventListener('click', () => {
      const isCurrentlyActive = item.classList.contains('active');

      // Close sibling items
      items.forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-item__question')?.setAttribute('aria-expanded', 'false');
      });

      if (!isCurrentlyActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Filter tabs on FAQ page (if present)
  const faqTabs = document.querySelectorAll('.faq-tab');
  if (faqTabs.length) {
    faqTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        faqTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.faqFilter;

        items.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
}

/* ==========================================================================
   12. Favorites Storage & Toggle
   ========================================================================== */
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem('aa_favorites')) || [];
  } catch (e) {
    return [];
  }
}

function saveFavorites(favs) {
  localStorage.setItem('aa_favorites', JSON.stringify(favs));
}

function initFavorites() {
  const favs = getFavorites();

  document.querySelectorAll('.property-card__favorite').forEach(btn => {
    const card = btn.closest('.property-card');
    const slug = card ? card.dataset.slug : new URLSearchParams(window.location.search).get('slug');

    if (slug && favs.includes(slug)) {
      btn.classList.add('active');
      const icon = btn.querySelector('i');
      if (icon) icon.className = 'fas fa-heart';
    }

    // Attach click listener
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const currentSlug = card ? card.dataset.slug : new URLSearchParams(window.location.search).get('slug');
      if (!currentSlug) return;

      let stored = getFavorites();
      const isActive = btn.classList.contains('active');

      if (isActive) {
        stored = stored.filter(s => s !== currentSlug);
        btn.classList.remove('active');
        const icon = btn.querySelector('i');
        if (icon) icon.className = 'far fa-heart';
        showToast('Property removed from favorites');
      } else {
        if (!stored.includes(currentSlug)) stored.push(currentSlug);
        btn.classList.add('active');
        const icon = btn.querySelector('i');
        if (icon) icon.className = 'fas fa-heart';
        showToast('Property saved to favorites');
      }
      saveFavorites(stored);
    };
  });
}

/* Toast Notification */
function showToast(message) {
  let toast = document.querySelector('.aa-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'aa-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

/* ==========================================================================
   13. Contact Form Validation & Submission
   ========================================================================== */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let hasError = false;
    const firstName = form.querySelector('[name="firstName"]');
    const lastName = form.querySelector('[name="lastName"]');
    const email = form.querySelector('[name="email"]');
    const service = form.querySelector('[name="service"]');
    const message = form.querySelector('[name="message"]');
    const submitBtn = form.querySelector('[type="submit"]');

    // Simple robust validation
    const validateField = (field, condition, errorMsg) => {
      let errEl = field.parentNode.querySelector('.field-error');
      if (!condition) {
        hasError = true;
        field.style.borderBottomColor = '#E74C3C';
        if (!errEl) {
          errEl = document.createElement('span');
          errEl.className = 'field-error';
          errEl.style.cssText = 'color:#E74C3C; font-size:0.75rem; display:block; margin-top:0.25rem;';
          field.parentNode.appendChild(errEl);
        }
        errEl.textContent = errorMsg;
      } else {
        field.style.borderBottomColor = '';
        if (errEl) errEl.remove();
      }
    };

    if (firstName) validateField(firstName, firstName.value.trim().length >= 2, 'Please enter your first name.');
    if (lastName) validateField(lastName, lastName.value.trim().length >= 2, 'Please enter your last name.');
    if (email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      validateField(email, emailPattern.test(email.value.trim()), 'Please enter a valid email address.');
    }
    if (service) validateField(service, service.value !== '', 'Please select a service interest.');
    if (message) validateField(message, message.value.trim().length >= 10, 'Please enter a message (at least 10 characters).');

    if (hasError) return;

    // Loading State
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing Request...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      // Show confirmation modal
      showConsultationConfirmation(firstName ? firstName.value : 'Discerning Client');
    }, 1200);
  });
}

function showConsultationConfirmation(name) {
  let modal = document.querySelector('.confirmation-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'confirmation-modal';
    modal.innerHTML = `
      <div class="confirmation-modal__backdrop"></div>
      <div class="confirmation-modal__box">
        <div class="confirmation-modal__icon"><i class="fas fa-check"></i></div>
        <h3 class="confirmation-modal__title">Consultation Requested</h3>
        <p class="confirmation-modal__desc">Thank you. An advisory partner will review your inquiry and connect with you within 24 hours.</p>
        <button class="btn btn--gold confirmation-modal__close">Close</button>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.confirmation-modal__close').addEventListener('click', () => {
      modal.classList.remove('active');
    });
    modal.querySelector('.confirmation-modal__backdrop').addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.classList.add('active');
}

/* ==========================================================================
   14. Newsletter Forms
   ========================================================================== */
function initNewsletterForms() {
  document.querySelectorAll('.newsletter-inline, .site-footer__newsletter').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button');

      if (!input || !input.value || !input.value.includes('@')) {
        showToast('Please enter a valid email address.');
        return;
      }

      const originalBtn = btn ? btn.innerHTML : '';
      if (btn) btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

      setTimeout(() => {
        input.value = '';
        if (btn) btn.innerHTML = '<i class="fas fa-check"></i>';
        showToast('Subscribed to private property briefings.');

        setTimeout(() => {
          if (btn) btn.innerHTML = originalBtn;
        }, 3000);
      }, 700);
    });
  });
}

/* ==========================================================================
   15. Properties Portfolio Engine (Grid, Category Pills, Search, Sort)
   ========================================================================== */
async function initPropertiesModule() {
  const container = document.querySelector('[data-properties-grid], [data-properties-masonry]');
  if (!container) return;

  const properties = await fetchProperties();
  const isHomepage = container.hasAttribute('data-properties-grid');
  const limit = container.dataset.limit ? parseInt(container.dataset.limit, 10) : properties.length;

  // Search input & sort dropdown on properties page
  const searchInput = document.getElementById('propertySearchInput');
  const sortSelect = document.getElementById('propertySortSelect');
  const filterPills = document.querySelectorAll('.filter-pill');

  // Check URL parameters for pre-selected filters
  const params = new URLSearchParams(window.location.search);
  const initialCategory = params.get('category') || 'all';
  const initialSearch = params.get('search') || '';

  let currentCategory = initialCategory;
  let currentSearch = initialSearch;
  let currentSort = 'default';

  if (searchInput && initialSearch) {
    searchInput.value = initialSearch;
  }

  if (filterPills.length) {
    filterPills.forEach(pill => {
      if (pill.dataset.filter === initialCategory) {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      }
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentCategory = pill.dataset.filter;
        renderFiltered();
      });
    });
  }

  if (searchInput) {
    let timer;
    searchInput.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        currentSearch = searchInput.value.trim().toLowerCase();
        renderFiltered();
      }, 200);
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      renderFiltered();
    });
  }

  function renderFiltered() {
    let filtered = properties.filter(p => {
      const matchesCategory = currentCategory === 'all' || p.category.toLowerCase() === currentCategory.toLowerCase();
      const matchesSearch = !currentSearch ||
        p.title.toLowerCase().includes(currentSearch) ||
        p.location.toLowerCase().includes(currentSearch) ||
        p.category.toLowerCase().includes(currentSearch);
      return matchesCategory && matchesSearch;
    });

    // Sorting
    if (currentSort === 'price-asc') {
      filtered.sort((a, b) => (a.priceNumeric || 0) - (b.priceNumeric || 0));
    } else if (currentSort === 'price-desc') {
      filtered.sort((a, b) => (b.priceNumeric || 0) - (a.priceNumeric || 0));
    } else if (currentSort === 'area-desc') {
      filtered.sort((a, b) => (b.areaNumeric || 0) - (a.areaNumeric || 0));
    }

    if (isHomepage) {
      filtered = filtered.slice(0, limit);
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <h3 style="font-family:var(--font-display); font-size:var(--text-2xl); margin-bottom:1rem;">No Properties Found</h3>
          <p style="color:var(--text-muted); margin-bottom:1.5rem;">No properties match the selected criteria. Try resetting your search or filters.</p>
          <button class="btn btn--outline" id="resetFiltersBtn">Reset All Filters</button>
        </div>
      `;
      document.getElementById('resetFiltersBtn')?.addEventListener('click', () => {
        currentCategory = 'all';
        currentSearch = '';
        if (searchInput) searchInput.value = '';
        filterPills.forEach(p => p.classList.toggle('active', p.dataset.filter === 'all'));
        renderFiltered();
      });
      return;
    }

    container.innerHTML = filtered.map(p => `
      <article class="property-card" data-slug="${p.slug}" data-category="${p.category}" data-aos="fade-up">
        <div class="property-card__image-wrap">
          <img class="property-card__image" src="${p.image}" alt="${escapeHtml(p.title)}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80';">
          <span class="property-card__tag">${escapeHtml(p.category)}</span>
          <button class="property-card__favorite" aria-label="Save ${escapeHtml(p.title)} to favorites">
            <i class="far fa-heart"></i>
          </button>
          <div class="property-card__overlay">
            <a href="property-detail.html?slug=${p.slug}" class="property-card__view">View Details →</a>
          </div>
        </div>
        <div class="property-card__body">
          <div class="property-card__price">${p.price}</div>
          <h3 class="property-card__title">
            <a href="property-detail.html?slug=${p.slug}">${escapeHtml(p.title)}</a>
          </h3>
          <div class="property-card__location">
            <i class="fas fa-map-marker-alt"></i> ${escapeHtml(p.location)}
          </div>
          <div class="property-card__meta">
            ${p.bedrooms ? `<span class="property-card__meta-item"><i class="fas fa-bed"></i> ${p.bedrooms} Beds</span>` : ''}
            ${p.bathrooms ? `<span class="property-card__meta-item"><i class="fas fa-bath"></i> ${p.bathrooms} Baths</span>` : ''}
            <span class="property-card__meta-item"><i class="fas fa-ruler-combined"></i> ${p.area}</span>
          </div>
        </div>
      </article>
    `).join('');

    initFavorites();
    if (typeof AOS !== 'undefined') AOS.refresh();
  }

  renderFiltered();
}

/* ==========================================================================
   16. Property Detail Page Engine & Lightbox Gallery
   ========================================================================== */
async function initPropertyDetailModule() {
  const detailLayout = document.querySelector('.property-detail__layout');
  if (!detailLayout) return;

  const properties = await fetchProperties();
  if (!properties.length) return;

  const params = new URLSearchParams(window.location.search);
  let slug = params.get('slug');

  // Find requested property or default to first
  let property = properties.find(p => p.slug === slug);
  if (!property) property = properties[0];

  document.title = `${property.title} | Afaq Ahmad Real Estate`;

  const setText = (sel, text) => {
    document.querySelectorAll(sel).forEach(el => el.textContent = text);
  };

  setText('[data-property-title]', property.title);
  setText('[data-property-price]', property.price);
  setText('[data-property-location]', property.location);
  setText('[data-property-beds]', property.bedrooms || '—');
  setText('[data-property-baths]', property.bathrooms || '—');
  setText('[data-property-garage]', property.garage || '—');
  setText('[data-property-area]', property.area);
  setText('[data-property-desc]', property.description);

  // Features list
  const featuresEl = document.querySelector('[data-property-features]');
  if (featuresEl && property.features) {
    featuresEl.innerHTML = property.features.map(f =>
      `<div class="property-detail__feature"><i class="fas fa-check"></i> ${escapeHtml(f)}</div>`
    ).join('');
  }

  // Gallery images injection
  const swiperWrapper = document.querySelector('.property-detail__gallery .swiper-wrapper');
  const images = property.images && property.images.length ? property.images : [property.image];

  if (swiperWrapper) {
    swiperWrapper.innerHTML = images.map((img, idx) => `
      <div class="swiper-slide" data-index="${idx}">
        <img src="${img}" alt="${escapeHtml(property.title)} view ${idx + 1}" loading="${idx === 0 ? 'eager' : 'lazy'}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80';">
        <button class="gallery-expand-btn" aria-label="Open Fullscreen Lightbox" data-index="${idx}">
          <i class="fas fa-expand"></i> View Lightbox
        </button>
      </div>
    `).join('');
  }

  // Swiper initialization
  if (typeof Swiper !== 'undefined') {
    new Swiper('.property-detail__gallery', {
      loop: images.length > 1,
      speed: 600,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    });
  }

  // Fullscreen Lightbox Setup
  initLightbox(images, property.title);

  // WhatsApp Button Links with dynamic prefilled message
  const waBtns = document.querySelectorAll('a[href*="wa.me"]');
  waBtns.forEach(btn => {
    if (!btn.classList.contains('whatsapp-float') && !btn.closest('.site-footer')) {
      const text = encodeURIComponent(`Hello Afaq Ahmad, I am interested in scheduling a viewing or inquiring about: ${property.title} (${property.price}).`);
      btn.href = `https://wa.me/923189798577?text=${text}`;
    }
  });

  // Share button
  const shareBtn = document.querySelector('[data-share-property]');
  if (shareBtn) {
    shareBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        showToast('Property link copied to clipboard!');
      } else {
        showToast('URL: ' + window.location.href);
      }
    });
  }

  // Schedule Viewing modal triggers
  const scheduleBtns = document.querySelectorAll('[data-schedule-viewing]');
  scheduleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openScheduleModal(property.title);
    });
  });

  // Render Similar Properties
  renderSimilarProperties(properties, property);
}

/* Lightbox Modal */
function initLightbox(images, propertyTitle) {
  let lightbox = document.querySelector('.aa-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'aa-lightbox';
    lightbox.innerHTML = `
      <div class="aa-lightbox__backdrop"></div>
      <button class="aa-lightbox__close" aria-label="Close lightbox"><i class="fas fa-times"></i></button>
      <button class="aa-lightbox__prev" aria-label="Previous image"><i class="fas fa-chevron-left"></i></button>
      <button class="aa-lightbox__next" aria-label="Next image"><i class="fas fa-chevron-right"></i></button>
      <div class="aa-lightbox__content">
        <img class="aa-lightbox__img" src="" alt="Property image">
        <div class="aa-lightbox__caption">
          <span class="aa-lightbox__title"></span>
          <span class="aa-lightbox__counter"></span>
        </div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  let currentIndex = 0;
  const imgEl = lightbox.querySelector('.aa-lightbox__img');
  const titleEl = lightbox.querySelector('.aa-lightbox__title');
  const counterEl = lightbox.querySelector('.aa-lightbox__counter');

  function updateLightbox(idx) {
    currentIndex = (idx + images.length) % images.length;
    imgEl.src = images[currentIndex];
    titleEl.textContent = propertyTitle;
    counterEl.textContent = `${currentIndex + 1} / ${images.length}`;
  }

  function openLightbox(idx) {
    updateLightbox(idx);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightbox.querySelector('.aa-lightbox__close').onclick = closeLightbox;
  lightbox.querySelector('.aa-lightbox__backdrop').onclick = closeLightbox;
  lightbox.querySelector('.aa-lightbox__prev').onclick = () => updateLightbox(currentIndex - 1);
  lightbox.querySelector('.aa-lightbox__next').onclick = () => updateLightbox(currentIndex + 1);

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLightbox(currentIndex - 1);
    if (e.key === 'ArrowRight') updateLightbox(currentIndex + 1);
  });

  // Attach to slide image clicks and expand buttons
  document.querySelectorAll('.property-detail__gallery .swiper-slide img, .gallery-expand-btn').forEach(el => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(el.dataset.index || el.closest('.swiper-slide')?.dataset.index || 0, 10);
      openLightbox(idx);
    });
  });
}

/* Schedule Viewing In-Page Modal */
function openScheduleModal(propTitle) {
  let modal = document.querySelector('.schedule-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'schedule-modal';
    modal.innerHTML = `
      <div class="schedule-modal__backdrop"></div>
      <div class="schedule-modal__box">
        <button class="schedule-modal__close" aria-label="Close modal"><i class="fas fa-times"></i></button>
        <span class="section-label">Private Viewing</span>
        <h3 class="schedule-modal__title">Schedule Consultation</h3>
        <p class="schedule-modal__desc">For: <strong class="schedule-modal__prop-name"></strong></p>
        <form class="schedule-modal__form">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" name="name" required placeholder="Alexander Vance">
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" name="email" required placeholder="alexander@vance.com">
          </div>
          <div class="form-group">
            <label>Phone / WhatsApp Number</label>
            <input type="tel" name="phone" required placeholder="+92 318 9798577">
          </div>
          <div class="form-group">
            <label>Preferred Viewing Date</label>
            <input type="date" name="date" required>
          </div>
          <button type="submit" class="btn btn--gold" style="width:100%; margin-top:1rem;">Confirm Viewing Request</button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.schedule-modal__close').onclick = () => modal.classList.remove('active');
    modal.querySelector('.schedule-modal__backdrop').onclick = () => modal.classList.remove('active');

    modal.querySelector('form').onsubmit = (e) => {
      e.preventDefault();
      modal.classList.remove('active');
      showConsultationConfirmation('Valued Client');
    };
  }

  modal.querySelector('.schedule-modal__prop-name').textContent = propTitle;
  modal.classList.add('active');
}

/* Render Similar Properties on Detail Page */
function renderSimilarProperties(allProps, currentProp) {
  const container = document.querySelector('[data-similar-properties]');
  if (!container) return;

  const similar = allProps
    .filter(p => p.slug !== currentProp.slug && (p.category === currentProp.category || true))
    .slice(0, 3);

  container.innerHTML = similar.map(p => `
    <article class="property-card" data-slug="${p.slug}" data-category="${p.category}">
      <div class="property-card__image-wrap">
        <img class="property-card__image" src="${p.image}" alt="${escapeHtml(p.title)}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80';">
        <span class="property-card__tag">${escapeHtml(p.category)}</span>
        <button class="property-card__favorite" aria-label="Save ${escapeHtml(p.title)} to favorites">
          <i class="far fa-heart"></i>
        </button>
        <div class="property-card__overlay">
          <a href="property-detail.html?slug=${p.slug}" class="property-card__view">View Details →</a>
        </div>
      </div>
      <div class="property-card__body">
        <div class="property-card__price">${p.price}</div>
        <h3 class="property-card__title">
          <a href="property-detail.html?slug=${p.slug}">${escapeHtml(p.title)}</a>
        </h3>
        <div class="property-card__location">
          <i class="fas fa-map-marker-alt"></i> ${escapeHtml(p.location)}
        </div>
      </div>
    </article>
  `).join('');

  initFavorites();
}

/* ==========================================================================
   17. AOS Animation Init
   ========================================================================== */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }
}

/* ==========================================================================
   18. Global Image Error Fallback Handler
   ========================================================================== */
function initImageFallback() {
  const fallbackUrl = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80';
  window.addEventListener('error', function(e) {
    if (e.target && e.target.tagName === 'IMG' && !e.target.dataset.fallbackApplied) {
      e.target.dataset.fallbackApplied = 'true';
      e.target.src = fallbackUrl;
    }
  }, true);
}

/* Helper: Escape HTML to avoid injection */
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

