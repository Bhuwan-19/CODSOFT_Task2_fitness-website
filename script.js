// QuantumFit - Modern Fitness Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && window.innerWidth <= 992) {
      navLinks.style.display = 'none';
    }
  });
  
  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Back to top button
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  // Animation on scroll
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  fadeElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
        
        // Close mobile menu if open
        if (window.innerWidth <= 992) {
          navLinks.style.display = 'none';
        }
      }
    });
  });
  
  // Set active nav link based on scroll position
  function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', setActiveNavLink);
  
  // CTA Button Interactions
  const ctaButtons = document.querySelectorAll('.cta-button');
  ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Add click effect
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
      
      // If it's the "Start Free Trial" button
      if (this.textContent.includes('Start Free Trial')) {
        alert('Starting your free trial! Redirecting to signup...');
      }
      
      // If it's the "Launch Your Journey" button
      if (this.textContent.includes('Launch Your Journey')) {
        alert('Welcome to QuantumFit! Let\'s begin your fitness transformation.');
      }
    });
  });
  
  // Newsletter Form Submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('.newsletter-input');
      const email = emailInput.value;
      
      if (email && email.includes('@')) {
        alert(`Thank you for subscribing with ${email}! You'll receive updates soon.`);
        emailInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }
  
  // Update dashboard stats randomly (for demo purposes)
  function updateDashboardStats() {
    const statCards = document.querySelectorAll('.stat-card .stat-value');
    
    // Only update if user is on the page for more than 5 seconds (demo effect)
    setTimeout(() => {
      statCards.forEach(card => {
        const currentValue = parseInt(card.textContent);
        const randomChange = Math.floor(Math.random() * 20) - 10; // -10 to +10
        const newValue = Math.max(0, currentValue + randomChange);
        
        // Animate the change
        card.style.transform = 'scale(1.1)';
        setTimeout(() => {
          card.textContent = newValue;
          card.style.transform = 'scale(1)';
        }, 300);
      });
    }, 5000);
  }
  
  // Start dashboard updates
  updateDashboardStats();
  setInterval(updateDashboardStats, 10000); // Update every 10 seconds
  
  // Initialize mobile menu for responsive design
  function initMobileMenu() {
    if (window.innerWidth <= 992) {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
    }
  }
  
  // Call on load and resize
  initMobileMenu();
  window.addEventListener('resize', initMobileMenu);
  
  // Add hover effect to feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });
  
  // Add trainers slider functionality
  const trainersSlider = document.querySelector('.trainers-slider');
  if (trainersSlider) {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    trainersSlider.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - trainersSlider.offsetLeft;
      scrollLeft = trainersSlider.scrollLeft;
    });
    
    trainersSlider.addEventListener('mouseleave', () => {
      isDown = false;
    });
    
    trainersSlider.addEventListener('mouseup', () => {
      isDown = false;
    });
    
    trainersSlider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - trainersSlider.offsetLeft;
      const walk = (x - startX) * 2;
      trainersSlider.scrollLeft = scrollLeft - walk;
    });
  }
  
  // Add loading animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});