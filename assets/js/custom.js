// Reading Progress Indicator
document.addEventListener('DOMContentLoaded', function() {
  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress';
  document.body.appendChild(progressBar);
  
  // Update progress on scroll
  window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height);
    progressBar.style.transform = `scaleX(${scrolled})`;
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add active state to current navigation item
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav__list a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.parentElement.classList.add('active');
    }
  });
  
  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
      }
    });
  }, observerOptions);
  
  // Observe main content sections
  document.querySelectorAll('h2, h3, blockquote, .feature-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
  
  // Add subtle parallax effect to hero section
  const hero = document.querySelector('.hero-section');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
  }
  
  // Add hover effect to cards
  document.querySelectorAll('[style*="background: rgba"]').forEach(card => {
    if (card.style.padding) {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 15px 40px rgba(120, 70, 255, 0.2)';
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
      });
    }
  });
});

// Add page transition effects
window.addEventListener('beforeunload', function() {
  document.body.style.opacity = '0';
});

window.addEventListener('load', function() {
  document.body.style.transition = 'opacity 0.3s ease-in';
  document.body.style.opacity = '1';
});