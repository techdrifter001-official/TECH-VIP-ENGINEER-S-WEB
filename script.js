/**
 * TECH VIP ENGINEER'S - Main JavaScript
 * Handles all interactive functionality
 */

(function() {
  'use strict';

  // ==========================================================================
  // Utility Functions
  // ==========================================================================
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  const throttle = (fn, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // ==========================================================================
  // State Management
  // ==========================================================================
  const state = {
    currentTestimonial: 0,
    testimonials: [],
    courses: [],
    filteredCourses: [],
    activeFilter: 'all',
    isMenuOpen: false,
    scrollY: 0
  };

  // ==========================================================================
  // Course Data
  // ==========================================================================
  const courseData = [
    {
      id: 1,
      title: 'Full-Stack Web Development Bootcamp',
      category: 'web',
      description: 'Master React, Node.js, TypeScript, and PostgreSQL. Build 5 production-ready projects for your portfolio.',
      duration: '16 weeks',
      level: 'Beginner to Advanced',
      students: 1240,
      rating: 4.9,
      price: '$2,499',
      image: 'web'
    },
    {
      id: 2,
      title: 'React Native Mobile App Development',
      category: 'app',
      description: 'Build cross-platform iOS & Android apps with React Native, Expo, and TypeScript. Publish to App Store & Play Store.',
      duration: '12 weeks',
      level: 'Intermediate',
      students: 890,
      rating: 4.8,
      price: '$1,999',
      image: 'app'
    },
    {
      id: 3,
      title: 'Digital Marketing Strategy & Execution',
      category: 'marketing',
      description: 'SEO, content marketing, paid ads, email automation, and analytics. Real campaigns with real budgets.',
      duration: '10 weeks',
      level: 'All Levels',
      students: 2100,
      rating: 4.7,
      price: '$1,499',
      image: 'marketing'
    },
    {
      id: 4,
      title: 'Advanced TypeScript & System Design',
      category: 'web',
      description: 'Deep dive into TypeScript internals, design patterns, and scalable architecture. For senior-level readiness.',
      duration: '8 weeks',
      level: 'Advanced',
      students: 560,
      rating: 4.9,
      price: '$1,799',
      image: 'web'
    },
    {
      id: 5,
      title: 'Flutter & Dart: Complete Developer Guide',
      category: 'app',
      description: 'Build beautiful, performant apps for mobile, web, and desktop from a single codebase.',
      duration: '14 weeks',
      level: 'Beginner to Advanced',
      students: 720,
      rating: 4.8,
      price: '$2,199',
      image: 'app'
    },
    {
      id: 6,
      title: 'Tech Career Accelerator Program',
      category: 'career',
      description: 'Resume building, interview prep, salary negotiation, personal branding. 90% placement rate within 3 months.',
      duration: '6 weeks',
      level: 'All Levels',
      students: 3400,
      rating: 4.9,
      price: '$999',
      image: 'career'
    },
    {
      id: 7,
      title: 'Growth Marketing & Analytics',
      category: 'marketing',
      description: 'A/B testing, funnel optimization, cohort analysis, SQL for marketers. Data-driven growth strategies.',
      duration: '8 weeks',
      level: 'Intermediate',
      students: 980,
      rating: 4.7,
      price: '$1,599',
      image: 'marketing'
    },
    {
      id: 8,
      title: 'DevOps & Cloud Engineering Fundamentals',
      category: 'web',
      description: 'Docker, Kubernetes, AWS/GCP, CI/CD pipelines, infrastructure as code. Deploy with confidence.',
      duration: '10 weeks',
      level: 'Intermediate',
      students: 650,
      rating: 4.8,
      price: '$1,899',
      image: 'web'
    },
    {
      id: 9,
      title: 'iOS Development with Swift & SwiftUI',
      category: 'app',
      description: 'Native iOS development from scratch. Build apps for iPhone, iPad, macOS, watchOS, and visionOS.',
      duration: '12 weeks',
      level: 'Beginner to Advanced',
      students: 480,
      rating: 4.9,
      price: '$2,299',
      image: 'app'
      },
      {
        id: 10,
        title: 'Cybersecurity Fundamentals & Ethical Hacking',
        category: 'cybersecurity',
        description: 'Learn penetration testing, vulnerability assessment, and security auditing. Prepare for CEH, OSCP, and CISSP certifications.',
        duration: '14 weeks',
        level: 'Beginner to Advanced',
        students: 1850,
        rating: 4.9,
        price: '$2,799',
        image: 'security'
      },
      {
        id: 11,
        title: 'Advanced Penetration Testing & Red Teaming',
        category: 'cybersecurity',
        description: 'Advanced exploitation techniques, post-exploitation, and red team operations. Real-world scenarios and labs.',
        duration: '10 weeks',
        level: 'Advanced',
        students: 720,
        rating: 4.8,
        price: '$3,299',
        image: 'security'
      },
      {
        id: 12,
        title: 'AI Engineering & Machine Learning Bootcamp',
        category: 'ai',
        description: 'Build production ML systems from scratch. Covering MLOps, LLMs, RAG, computer vision, and model deployment.',
        duration: '16 weeks',
        level: 'Intermediate to Advanced',
        students: 2100,
        rating: 4.9,
        price: '$3,499',
        image: 'ai'
      },
      {
        id: 13,
        title: 'Generative AI & LLM Application Development',
        category: 'ai',
        description: 'Build apps with GPT, Claude, and open-source LLMs. Fine-tuning, RAG, agents, and production deployment.',
        duration: '10 weeks',
        level: 'Intermediate',
        students: 1650,
        rating: 4.8,
        price: '$2,899',
        image: 'ai'
      },
      {
        id: 14,
        title: 'MLOps & Production ML Systems',
        category: 'ai',
        description: 'End-to-end ML pipelines, model monitoring, feature stores, and CI/CD for ML. Kubernetes, Kubeflow, MLflow.',
        duration: '8 weeks',
        level: 'Advanced',
        students: 580,
        rating: 4.9,
        price: '$2,499',
        image: 'ai'
      }
    ];

  // ==========================================================================
  // Navigation
  // ==========================================================================
  function initNavigation() {
    const navbar = $('#navbar');
    const navToggle = $('#navToggle');
    const navMenu = $('#navMenu');
    const navLinks = $$('.nav-link');

    // Scroll effect
    const handleScroll = throttle(() => {
      state.scrollY = window.scrollY;
      navbar.classList.toggle('scrolled', state.scrollY > 50);
      
      // Update active nav link based on scroll position
      updateActiveNavLink();
      
      // Back to top button
      $('#backToTop').hidden = state.scrollY < 300;
      if (!$('#backToTop').hidden) {
        $('#backToTop').classList.add('visible');
      } else {
        $('#backToTop').classList.remove('visible');
      }
    }, 50);

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
      state.isMenuOpen = !state.isMenuOpen;
      navMenu.classList.toggle('open', state.isMenuOpen);
      navToggle.setAttribute('aria-expanded', state.isMenuOpen);
      document.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (state.isMenuOpen) {
          state.isMenuOpen = false;
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });

    // Close menu on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.isMenuOpen) {
        state.isMenuOpen = false;
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Back to top
    $('#backToTop').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth scroll for anchor links
    $$('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        
        const target = $(targetId);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      });
    });
  }

  function updateActiveNavLink() {
    const sections = $$('section[id]');
    const navLinks = $$('.nav-link');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (state.scrollY >= sectionTop && state.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  // ==========================================================================
  // Hero Stats Counter Animation
  // ==========================================================================
  function initHeroStats() {
    const statNumbers = $$('.stat-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          animateNumber(el, target);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
  }

  function animateNumber(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.floor(start + (target - start) * eased);
      element.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    requestAnimationFrame(update);
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // ==========================================================================
  // About Stats Counter
  // ==========================================================================
  function initAboutStats() {
    const statNumbers = $$('.stat-large-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          animateNumber(el, target);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
  }

  // ==========================================================================
  // Courses
  // ==========================================================================
  function initCourses() {
    state.courses = courseData;
    state.filteredCourses = courseData;
    renderCourses();
    initCourseFilters();
  }

  function renderCourses() {
    const grid = $('#coursesGrid');
    if (!grid) return;

    grid.innerHTML = state.filteredCourses.map(course => `
      <article class="course-card reveal" data-category="${course.category}">
        <span class="course-badge">${formatCategory(course.category)}</span>
        <h3>${escapeHtml(course.title)}</h3>
        <p>${escapeHtml(course.description)}</p>
        <div class="course-meta">
          <span class="meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${course.duration}
          </span>
          <span class="meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            ${course.students.toLocaleString()} students
          </span>
          <span class="meta-item">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            ${course.rating}
          </span>
        </div>
        <a href="#contact" class="course-link">Enroll Now <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
      </article>
    `).join('');

    // Re-observe for animations
    observeRevealElements();
  }

  function formatCategory(category) {
    const labels = {
      web: 'Web Development',
      app: 'Mobile Development',
      marketing: 'Digital Marketing',
        career: 'Career Growth',
        cybersecurity: 'Cybersecurity',
        ai: 'AI Engineering'
      };
      return labels[category] || category;
    }

  function initCourseFilters() {
    const filterBtns = $$('.filter-btn');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        // Update active state
        filterBtns.forEach(b => {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-selected', b === btn);
        });
        
        state.activeFilter = filter;
        
        // Filter courses
        if (filter === 'all') {
          state.filteredCourses = state.courses;
        } else {
          state.filteredCourses = state.courses.filter(c => c.category === filter);
        }
        
        renderCourses();
      });
    });
  }

  // ==========================================================================
  // Testimonials Slider
  // ==========================================================================
  function initTestimonials() {
    state.testimonials = $$('.testimonial-card');
    const prevBtn = $('.slider-btn.prev');
    const nextBtn = $('.slider-btn.next');
    const dotsContainer = $('#sliderDots');
    
    // Create dots
    state.testimonials.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (index === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
      dot.addEventListener('click', () => goToTestimonial(index));
      dotsContainer.appendChild(dot);
    });
    
    const dots = $$('.slider-dot');
    
    function goToTestimonial(index) {
      state.currentTestimonial = index;
      const track = $('.testimonial-track');
      track.style.transform = `translateX(-${index * 100}%)`;
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === state.testimonials.length - 1;
    }
    
    prevBtn.addEventListener('click', () => {
      if (state.currentTestimonial > 0) {
        goToTestimonial(state.currentTestimonial - 1);
      }
    });
    
    nextBtn.addEventListener('click', () => {
      if (state.currentTestimonial < state.testimonials.length - 1) {
        goToTestimonial(state.currentTestimonial + 1);
      }
    });
    
    // Auto-advance
    let autoAdvance = setInterval(() => {
      const next = (state.currentTestimonial + 1) % state.testimonials.length;
      goToTestimonial(next);
    }, 5000);
    
    // Pause on hover
    const slider = $('.testimonials-slider');
    slider.addEventListener('mouseenter', () => clearInterval(autoAdvance));
    slider.addEventListener('mouseleave', () => {
      autoAdvance = setInterval(() => {
        const next = (state.currentTestimonial + 1) % state.testimonials.length;
        goToTestimonial(next);
      }, 5000);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        if (state.currentTestimonial > 0) goToTestimonial(state.currentTestimonial - 1);
      } else if (e.key === 'ArrowRight') {
        if (state.currentTestimonial < state.testimonials.length - 1) goToTestimonial(state.currentTestimonial + 1);
      }
    });
  }

  // ==========================================================================
  // Contact Form
  // ==========================================================================
  function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
    
      if (!validateForm(form)) return;
    
      const submitBtn = form.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
    
      // Show loading state
      submitBtn.disabled = true;
      btnText.hidden = true;
      btnLoading.hidden = false;
    
      try {
        // Submit to Formspree
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
      
        if (response.ok) {
          showToast('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        showToast('Failed to send message. Please try again or email us directly.', 'error');
      } finally {
        // Reset button
        submitBtn.disabled = false;
        btnText.hidden = false;
        btnLoading.hidden = true;
      }
    });

    // Real-time validation
    $$('input, select, textarea', form).forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
          validateField(field);
        }
      });
    });
  }

  function validateForm(form) {
      let isValid = true;
      // Select all required fields including those in wrappers
      const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
      requiredFields.forEach(field => {
        if (!validateField(field)) {
          isValid = false;
        }
      });
      return isValid;
    }

  function validateField(field) {
    const errorEl = field.parentElement.querySelector('.form-error');
    let isValid = true;
    let message = '';

    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      message = `${getFieldLabel(field)} is required`;
    } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
      isValid = false;
      message = 'Please enter a valid email address';
    }

    field.classList.toggle('error', !isValid);
    if (errorEl) errorEl.textContent = message;

    return isValid;
  }

  function getFieldLabel(field) {
    const label = field.parentElement.querySelector('label');
    return label ? label.textContent.replace('*', '').trim() : 'This field';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ==========================================================================
  // Toast Notifications
  // ==========================================================================
  function showToast(message, type = 'info') {
    // Remove existing toasts
    $$('.toast').forEach(t => t.remove());
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    
    const icons = {
      success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };
    
    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || icons.info}</div>
      <div class="toast-message">${escapeHtml(message)}</div>
      <button class="toast-close" aria-label="Dismiss"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
    `;
    
    // Add styles if not present
    if (!$('#toast-styles')) {
      const style = document.createElement('style');
      style.id = 'toast-styles';
      style.textContent = `
        .toast {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          z-index: var(--z-toast);
          animation: slideInRight 0.3s ease-out;
          max-width: 400px;
        }
        .toast-success { border-color: var(--color-success); }
        .toast-error { border-color: var(--color-error); }
        .toast-icon { width: 20px; height: 20px; flex-shrink: 0; }
        .toast-success .toast-icon { color: var(--color-success); }
        .toast-error .toast-icon { color: var(--color-error); }
        .toast-message { flex: 1; font-size: var(--text-sm); }
        .toast-close { width: 24px; height: 24px; border-radius: var(--radius-sm); color: var(--color-text-subtle); display: flex; align-items: center; justify-content: center; }
        .toast-close:hover { background: var(--color-bg-hover); color: var(--color-text); }
        .toast-close svg { width: 16px; height: 16px; }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(100%); }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.style.animation = 'slideOutRight 0.3s ease-in forwards';
      setTimeout(() => toast.remove(), 300);
    });
    
    // Auto dismiss
    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
      }
    }, 5000);
  }

  // ==========================================================================
  // Scroll Reveal Animations
  // ==========================================================================
  function initScrollReveal() {
    const revealElements = $$('.reveal, .service-card, .career-card, .course-card, .testimonial-card, .value, .stat-large, .process-step, .contact-method');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
  }

  function observeRevealElements() {
    const newElements = $$('.reveal:not(.visible)');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    newElements.forEach(el => observer.observe(el));
  }

  // ==========================================================================
  // Parallax Effect for Hero
  // ==========================================================================
  function initParallax() {
    const orbs = $$('.gradient-orb');
    const floatItems = $$('.float-item');
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const handleScroll = throttle(() => {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3;
      
      orbs.forEach((orb, index) => {
        const speed = index === 0 ? 0.15 : 0.1;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
      });
      
      floatItems.forEach((item, index) => {
        const speed = 0.05 + index * 0.02;
        item.style.transform = `translateY(${scrolled * speed}px)`;
      });
    }, 16);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // ==========================================================================
  // Service Card Hover Effects
  // ==========================================================================
  function initServiceCards() {
    const cards = $$('.service-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ==========================================================================
  // Career Card Featured Highlight
  // ==========================================================================
  function initCareerCards() {
    const cards = $$('.career-card');
  
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('featured')) {
          cards.forEach(c => c.classList.remove('featured'));
          card.classList.add('featured');
        }
      });
    });
  }

  // ==========================================================================
  // Work Approach Slider
  // ==========================================================================
  function initApproachSlider() {
    const track = $('#approachSliderTrack');
    const prevBtn = $('#approachPrev');
    const nextBtn = $('#approachNext');
    const dotsContainer = $('#approachSliderDots');
  
    if (!track) return;
  
    const slides = $$('.approach-slide', track);
    let currentSlide = 0;
    let isTransitioning = false;
  
    // Ensure first slide is active by default
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === 0);
    });
  
    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'approach-slider-dot' + (index === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to approach ${index + 1}`);
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  
    const dots = $$('.approach-slider-dot');
  
    function goToSlide(index) {
      if (isTransitioning || index === currentSlide) return;
      if (index < 0 || index >= slides.length) return;
    
      isTransitioning = true;
    
      // Fade out current slide
      slides[currentSlide].classList.remove('active');
    
      // Fade in new slide
      setTimeout(() => {
        currentSlide = index;
        slides[currentSlide].classList.add('active');
      
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
      
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === slides.length - 1;
      
        // Reset transitioning flag after animation
        setTimeout(() => {
          isTransitioning = false;
        }, 400);
      }, 50);
    }
  
    prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
      }
    });
  
    nextBtn.addEventListener('click', () => {
      if (currentSlide < slides.length - 1) {
        goToSlide(currentSlide + 1);
      }
    });
  
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        if (currentSlide > 0) goToSlide(currentSlide - 1);
      } else if (e.key === 'ArrowRight') {
        if (currentSlide < slides.length - 1) goToSlide(currentSlide + 1);
      }
    });
  
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
  
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
  
    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
    
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentSlide < slides.length - 1) {
          goToSlide(currentSlide + 1);
        } else if (diff < 0 && currentSlide > 0) {
          goToSlide(currentSlide - 1);
        }
      }
    }
  }

  // ==========================================================================
  // Escape HTML
  // ==========================================================================
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ==========================================================================
  // Initialize All
  // ==========================================================================
  function init() {
    // Wait for DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    initNavigation();
    initHeroStats();
    initAboutStats();
    initCourses();
    initTestimonials();
    initContactForm();
    initScrollReveal();
    initParallax();
    initServiceCards();
    initCareerCards();
    
    // Dynamic year
    const yearEl = $('#currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    
    // Initial scroll check
    state.scrollY = window.scrollY;
    $('#navbar').classList.toggle('scrolled', state.scrollY > 50);
    updateActiveNavLink();
    
    console.log('TECH VIP ENGINEER\'S website initialized');
  }

  // Start initialization
  init();

    // Initialize approach slider after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initApproachSlider);
    } else {
      initApproachSlider();
    }

  })();