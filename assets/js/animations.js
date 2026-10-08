/**
 * STACKLY TRAVEL & TOURISM - PREMIUM INTERACTION & ANIMATION ENGINE
 * Additive, Non-Breaking, 60fps Hardware-Accelerated Micro-Interactions
 */

(function () {
  'use strict';

  // Check if reduced motion is requested by user
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return; // Respect accessibility completely
  }

  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgressBar();
    init3DCardTilt();
    initStaggeredInViewCascades();
    initAnimatedMetricRollup();
  });

  /**
   * 1. Top Viewport Scroll Progress Bar
   */
  function initScrollProgressBar() {
    let bar = document.getElementById('scrollProgressBar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'scrollProgressBar';
      bar.setAttribute('aria-hidden', 'true');
      document.body.prepend(bar);
    }

    let ticking = false;
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight > 0) {
        const percent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        bar.style.width = percent + '%';
      }
      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateProgress);
          ticking = true;
        }
      },
      { passive: true }
    );

    updateProgress();
  }

  /**
   * 2. High-Performance 3D Card Perspective Tilt (Desktop Hover Only)
   */
  function init3DCardTilt() {
    // Only run on hover-capable pointer devices (avoid mobile touch interference)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    const tiltCards = document.querySelectorAll(
      '.dest-card, .tour-card, .category-card, .specialist-card, .pricing-card'
    );

    tiltCards.forEach(card => {
      let isHovered = false;
      let frameId = null;

      card.addEventListener(
        'mouseenter',
        () => {
          isHovered = true;
          card.style.transition = 'transform 0.15s ease-out, box-shadow 0.3s ease-out';
        },
        { passive: true }
      );

      card.addEventListener(
        'mousemove',
        e => {
          if (!isHovered) return;
          if (frameId) cancelAnimationFrame(frameId);

          frameId = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Maximum tilt angle of 4.5 degrees for premium subtle feel
            const maxTilt = 4.5;
            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -5px, 0)`;
          });
        },
        { passive: true }
      );

      card.addEventListener(
        'mouseleave',
        () => {
          isHovered = false;
          if (frameId) cancelAnimationFrame(frameId);
          card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
        },
        { passive: true }
      );
    });
  }

  /**
   * 3. Intersection Observer Staggered Grid In-View Reveal
   */
  function initStaggeredInViewCascades() {
    if (!('IntersectionObserver' in window)) return;

    const gridSelectors = [
      '.destinations-grid',
      '.tours-grid',
      '.categories-grid',
      '.specialists-grid',
      '.kpi-grid',
      '.pricing-grid',
      '.features-grid',
      '.testimonials-slider'
    ];

    const grids = document.querySelectorAll(gridSelectors.join(', '));
    if (!grids.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    };

    const gridObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const grid = entry.target;
          const items = grid.querySelectorAll('[data-anim-stagger]');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('in-view');
            }, index * 65); // 65ms staggered interval
          });
          observer.unobserve(grid);
        }
      });
    }, observerOptions);

    grids.forEach(grid => {
      // Find direct visual child items
      const children = Array.from(grid.children).filter(
        child => !child.classList.contains('visually-hidden')
      );

      children.forEach(child => {
        if (!child.hasAttribute('data-anim-stagger')) {
          child.setAttribute('data-anim-stagger', '');
        }
      });

      gridObserver.observe(grid);
    });
  }

  /**
   * 4. Animated Metric Roll-Up Counter (requestAnimationFrame)
   */
  function initAnimatedMetricRollup() {
    if (!('IntersectionObserver' in window)) return;

    const metricElements = document.querySelectorAll('.stat-number, .kpi-value, [data-counter]');
    if (!metricElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    metricElements.forEach(el => observer.observe(el));

    function animateCount(el) {
      const rawText = el.textContent.trim();
      const match = rawText.match(/([\D]*)([\d,]+(?:\.\d+)?)([\D]*)/);
      if (!match) return;

      const prefix = match[1] || '';
      const numStr = match[2].replace(/,/g, '');
      const suffix = match[3] || '';
      const targetVal = parseFloat(numStr);
      if (isNaN(targetVal) || targetVal === 0) return;

      const isDecimal = numStr.includes('.');
      const decimalPlaces = isDecimal ? numStr.split('.')[1].length : 0;
      const duration = 1200; // 1.2s smooth count
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const currentVal = targetVal * ease;

        const formattedNumber = isDecimal
          ? currentVal.toFixed(decimalPlaces)
          : Math.floor(currentVal).toLocaleString();

        el.textContent = `${prefix}${formattedNumber}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = rawText; // Exact final state preserved
        }
      }

      requestAnimationFrame(update);
    }
  }
})();

