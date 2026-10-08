/**
 * STACKLY TRAVEL & TOURISM - MAIN JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Page Loader removal
  const loader = document.getElementById('siteLoader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => loader.remove(), 500);
    }, 400);
  }

  // 2. Sticky Navbar scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 3. Highlight active nav link
  highlightActiveNav();

  // 4. Mobile Menu Navigation
  initMobileMenu();

  // 5. Dynamic Time-based Greeting
  applyDynamicGreeting();

  // 6. Contact Form Validation
  initContactForm();

  // 7. General Action Buttons Redirect to 404
  initActionButtons();

  // 8. Search / Tour filter forms
  initSearchForms();
  initToursFilterForm();

  // 9. Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }
});

// Helper: Active nav item based on current URL path
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const linkPath = href.split('/').pop();
      if (
        (currentPath === '' || currentPath === 'index.html') && (linkPath === 'index.html' || linkPath === './' || linkPath === '')
      ) {
        if (link.classList.contains('nav-link')) link.classList.add('active');
      } else if (currentPath === linkPath) {
        link.classList.add('active');
        // If inside a dropdown, highlight parent nav-link too
        const parentDropdown = link.closest('.nav-item');
        if (parentDropdown) {
          const parentLink = parentDropdown.querySelector('.nav-link');
          if (parentLink) parentLink.classList.add('active');
        }
      }
    }
  });
}

// Helper: Mobile Navigation
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const overlay = document.getElementById('mobileNavOverlay');
  const closeBtn = document.getElementById('mobileNavClose');

  if (!toggleBtn || !overlay) return;

  const openMenu = () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeMenu();
    }
  });

  // Mobile drawer dropdown toggle
  const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
  mobileDropdownBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('active');
      const item = btn.closest('.mobile-dropdown-item');
      if (item) {
        const subMenu = item.querySelector('.mobile-sub-menu');
        if (subMenu) {
          if (subMenu.style.display === 'none') {
            subMenu.style.display = 'flex';
          } else {
            subMenu.style.display = subMenu.style.display === 'flex' ? 'none' : 'flex';
          }
        }
      }
    });
  });
}

// Helper: Dynamic Time of Day Greeting
function applyDynamicGreeting() {
  const now = new Date();
  const hours = now.getHours();
  let greeting = 'Welcome';

  if (hours >= 4 && hours < 12) {
    greeting = 'Good morning';
  } else if (hours >= 12 && hours < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

  const greetingElements = document.querySelectorAll('.dynamic-greeting');
  greetingElements.forEach(el => {
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    el.textContent = `${prefix}${greeting}${suffix}`;
  });
}

// Helper: Redirect Action Buttons to 404 as requested
function initActionButtons() {
  // Select any element explicitly designated as an action button or with data-action="404"
  const actionTriggers = document.querySelectorAll('.btn-action, [data-action="404"], .social-btn, .tour-book-btn, .btn-explore-action');
  
  actionTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If it's not a direct navigation to a valid main page, redirect to 404
      e.preventDefault();
      window.location.href = '404.html';
    });
  });
}

// Precise validation for Hero Search Filter Form on index.html
function initSearchForms() {
  const form = document.getElementById('heroSearchForm');
  if (!form) return;

  const dest = document.getElementById('heroSearchDest');
  const style = document.getElementById('heroSearchStyle');
  const month = document.getElementById('heroSearchMonth');
  const alertBox = document.getElementById('heroSearchAlertBox');

  [dest, style, month].forEach(field => {
    if (field) {
      field.addEventListener('change', () => {
        field.classList.remove('is-invalid');
        const feedback = field.parentElement.querySelector('.invalid-feedback');
        if (feedback) feedback.style.display = 'none';
        if (alertBox) alertBox.style.display = 'none';
      });
      field.addEventListener('input', () => {
        field.classList.remove('is-invalid');
        const feedback = field.parentElement.querySelector('.invalid-feedback');
        if (feedback) feedback.style.display = 'none';
        if (alertBox) alertBox.style.display = 'none';
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstInvalid = null;

    if (!dest || !dest.value) {
      if (dest) dest.classList.add('is-invalid');
      const fb = dest?.parentElement.querySelector('.invalid-feedback');
      if (fb) fb.style.display = 'block';
      if (!firstInvalid) firstInvalid = dest;
    }
    if (!style || !style.value) {
      if (style) style.classList.add('is-invalid');
      const fb = style?.parentElement.querySelector('.invalid-feedback');
      if (fb) fb.style.display = 'block';
      if (!firstInvalid) firstInvalid = style;
    }
    if (!month || !month.value) {
      if (month) month.classList.add('is-invalid');
      const fb = month?.parentElement.querySelector('.invalid-feedback');
      if (fb) fb.style.display = 'block';
      if (!firstInvalid) firstInvalid = month;
    }

    if (firstInvalid) {
      firstInvalid.focus();
      if (alertBox) {
        alertBox.className = 'alert alert-error';
        alertBox.style.display = 'block';
        alertBox.style.backgroundColor = '#FDE8E8';
        alertBox.style.color = '#9B1C1C';
        alertBox.style.padding = '12px 16px';
        alertBox.style.borderRadius = '8px';
        alertBox.textContent = 'Please choose a destination, vacation style, and travel month.';
      }
      return;
    }

    if (alertBox) {
      alertBox.className = 'alert alert-success';
      alertBox.style.display = 'block';
      alertBox.style.backgroundColor = '#DEF7EC';
      alertBox.style.color = '#03543F';
      alertBox.style.padding = '12px 16px';
      alertBox.style.borderRadius = '8px';
      alertBox.textContent = '✓ Search filters verified! Finding best seasonal holiday matches...';
    }

    setTimeout(() => {
      window.location.href = '404.html';
    }, 700);
  });
}

// Precise validation for Tours & Destinations Holiday Filter Form
function initToursFilterForm() {
  const form = document.getElementById('toursFilterForm');
  if (!form) return;

  const continent = document.getElementById('filterContinent');
  const style = document.getElementById('filterStyle');
  const duration = document.getElementById('filterDuration');
  const budget = document.getElementById('filterBudget');
  const alertBox = document.getElementById('filterAlertBox');

  [continent, style, duration, budget].forEach(select => {
    if (select) {
      select.addEventListener('change', () => {
        select.classList.remove('is-invalid');
        const feedback = select.parentElement.querySelector('.invalid-feedback');
        if (feedback) feedback.style.display = 'none';
        if (alertBox) alertBox.style.display = 'none';
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstInvalid = null;

    [continent, style, duration, budget].forEach(s => {
      if (s) {
        if (!s.value || s.value === '') {
          s.classList.add('is-invalid');
          const feedback = s.parentElement.querySelector('.invalid-feedback');
          if (feedback) feedback.style.display = 'block';
          if (!firstInvalid) firstInvalid = s;
        } else {
          s.classList.remove('is-invalid');
          const feedback = s.parentElement.querySelector('.invalid-feedback');
          if (feedback) feedback.style.display = 'none';
        }
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      if (alertBox) {
        alertBox.className = 'alert alert-error';
        alertBox.style.display = 'block';
        alertBox.style.backgroundColor = '#FDE8E8';
        alertBox.style.color = '#9B1C1C';
        alertBox.style.padding = '12px 16px';
        alertBox.style.borderRadius = '8px';
        alertBox.textContent = 'Please choose options for all 4 filter categories before applying search.';
      }
      return;
    }

    if (alertBox) {
      alertBox.className = 'alert alert-success';
      alertBox.style.display = 'block';
      alertBox.style.backgroundColor = '#DEF7EC';
      alertBox.style.color = '#03543F';
      alertBox.style.padding = '12px 16px';
      alertBox.style.borderRadius = '8px';
      alertBox.textContent = '✓ Criteria validated! Filtering worldwide packages...';
    }

    setTimeout(() => {
      window.location.href = '404.html';
    }, 700);
  });
}

// Helper: Contact Form Validation
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const countryCodeSelect = document.getElementById('contactCountryCode');
  const phoneInput = document.getElementById('contactPhone');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');
  const charCount = document.getElementById('charCount');
  const alertBox = document.getElementById('formAlert');

  // Strict Name restriction: ONLY alphabets & spaces
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      nameInput.value = nameInput.value.replace(/[^A-Za-z\s]/g, '');
      nameInput.classList.remove('is-invalid');
    });
  }

  // Strict Mobile restriction: ONLY numeric digits & exactly 10 digits
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
      phoneInput.classList.remove('is-invalid');
    });
  }

  // Character counter for message field (Optional field)
  if (messageInput && charCount) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      charCount.textContent = `${len}/500`;
      if (len > 500) {
        charCount.style.color = 'var(--error)';
      } else {
        charCount.style.color = 'var(--text-muted)';
      }
    });
  }

  // Real-time input cleanup
  [emailInput, countryCodeSelect, subjectInput, messageInput].forEach(field => {
    if (field) {
      field.addEventListener('input', () => {
        field.classList.remove('is-invalid');
      });
      field.addEventListener('change', () => {
        field.classList.remove('is-invalid');
      });
    }
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstInvalid = null;

    // Reset validations
    [nameInput, emailInput, countryCodeSelect, phoneInput, subjectInput, messageInput].forEach(f => {
      if (f) f.classList.remove('is-invalid');
    });

    // 1. Validate Name: Required, ONLY alphabets, min 2 chars
    const nameVal = nameInput ? nameInput.value.trim() : '';
    const nameAlphaRegex = /^[A-Za-z\s]{2,}$/;
    if (!nameVal || !nameAlphaRegex.test(nameVal)) {
      if (nameInput) nameInput.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = nameInput;
    }

    // 2. Validate Email: Required standard RFC-compliant format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailInput || !emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      if (emailInput) emailInput.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = emailInput;
    }

    // 3. Country Code Selector: Required
    if (countryCodeSelect && !countryCodeSelect.value) {
      countryCodeSelect.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = countryCodeSelect;
    }

    // 4. Validate Mobile Number: EXACTLY 10 numeric digits
    const phoneVal = phoneInput ? phoneInput.value.trim().replace(/\D/g, '') : '';
    if (!phoneInput || phoneVal.length !== 10 || !/^\d{10}$/.test(phoneVal)) {
      if (phoneInput) phoneInput.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = phoneInput;
    }

    // 5. Validate Subject: Required
    if (!subjectInput || !subjectInput.value.trim()) {
      if (subjectInput) subjectInput.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = subjectInput;
    }

    // 6. Message is OPTIONAL per requirements. Validate only if exceeds 500
    if (messageInput && messageInput.value.length > 500) {
      messageInput.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = messageInput;
    }

    // Focus first invalid field
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // If valid, show success state & redirect action to 404
    if (alertBox) {
      alertBox.className = 'alert alert-success';
      alertBox.style.display = 'block';
      alertBox.style.backgroundColor = '#DEF7EC';
      alertBox.style.color = '#03543F';
      alertBox.style.padding = '14px 18px';
      alertBox.style.borderRadius = '8px';
      alertBox.style.marginBottom = '20px';
      alertBox.textContent = '✓ Thank you! Your travel inquiry has been received. Redirecting to confirmation...';
      
      contactForm.reset();
      if (charCount) charCount.textContent = '0/500';

      setTimeout(() => {
        window.location.href = '404.html';
      }, 1200);
    }
  });
}

// Global masking for name and mobile inputs across all forms
document.addEventListener('input', (e) => {
  const el = e.target;
  if (!el || !el.tagName || el.tagName.toLowerCase() !== 'input') return;

  // Strict digits-only and 10 digits max for mobile/phone
  if (el.type === 'tel' || /phone|mobile/i.test(el.id) || /phone|mobile/i.test(el.name)) {
    el.value = el.value.replace(/\D/g, '').slice(0, 10);
  }

  // Strict alphabets-only for human name fields (excluding email, username, file, etc.)
  if (/name/i.test(el.id) || /name/i.test(el.name)) {
    if (!/user|file|host|domain|email/i.test(el.id) && !/user|file|host|domain|email/i.test(el.name)) {
      el.value = el.value.replace(/[^A-Za-z\s]/g, '');
    }
  }
});

