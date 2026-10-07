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

// Helper: Search bar forms on Landing / Tours
function initSearchForms() {
  const searchForms = document.querySelectorAll('.search-form, #heroSearchForm');
  searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Per instructions, redirect action buttons to 404
      window.location.href = '404.html';
    });
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
  [nameInput, emailInput, countryCodeSelect, phoneInput, subjectInput, messageInput].forEach(field => {
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

    // 1. Validate Name: Required and MUST accept ONLY alphabets
    const nameVal = nameInput ? nameInput.value.trim() : '';
    const nameAlphaRegex = /^[A-Za-z\s]+$/;
    if (!nameVal || nameVal.length < 2 || !nameAlphaRegex.test(nameVal)) {
      if (nameInput) nameInput.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = nameInput;
    }

    // 2. Validate Email: Required standard format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput || !emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      if (emailInput) emailInput.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = emailInput;
    }

    // 3. Country Code Selector: Required
    if (countryCodeSelect && !countryCodeSelect.value) {
      countryCodeSelect.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = countryCodeSelect;
    }

    // 4. Validate Mobile Number: Fixed 10 digit length
    const phoneVal = phoneInput ? phoneInput.value.trim().replace(/\D/g, '') : '';
    if (!phoneInput || phoneVal.length !== 10) {
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
      }, 1500);
    }
  });
}

