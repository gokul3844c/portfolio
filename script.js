/**
 * GOKUL S — FULL STACK DEVELOPER PORTFOLIO
 * Bento Grid + Modern Minimal + Dark Developer UI Logic & Micro-Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCursorGlow();
  initThemeToggle();
  initMobileMenu();
  initScrollProgress();
  initNavHighlighting();
  initIdeTabs();
  initCopyButtons();
  initContactForm();
  initProjectModals();
  initScrollReveal();
  initBackToTop();
  initParticleCanvas();
  initCardSpotlightAndTilt();
  initMagneticButtons();
});

/* --------------------------------------------------------------------------
   1. Preloader Screen
   -------------------------------------------------------------------------- */
function initPreloader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  setTimeout(() => {
    loader.classList.add('loaded');
  }, 850);
}

/* --------------------------------------------------------------------------
   2. Soft Cursor Glow (Desktop Only)
   -------------------------------------------------------------------------- */
function initCursorGlow() {
  const cursorGlow = document.getElementById('cursor-glow');
  if (!cursorGlow || window.innerWidth <= 992) return;

  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}

/* --------------------------------------------------------------------------
   3. Theme Switching (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlTag = document.documentElement;

  const savedTheme = localStorage.getItem('gokul_portfolio_theme');
  if (savedTheme) {
    htmlTag.setAttribute('data-theme', savedTheme);
  } else {
    htmlTag.setAttribute('data-theme', 'dark');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlTag.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlTag.setAttribute('data-theme', newTheme);
    localStorage.setItem('gokul_portfolio_theme', newTheme);

    showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
  });
}

/* --------------------------------------------------------------------------
   4. Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------------------------------
   5. Scroll Progress Bar
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
  });
}

/* --------------------------------------------------------------------------
   6. Nav Link Section Indicator
   -------------------------------------------------------------------------- */
function initNavHighlighting() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   7. IDE Code Terminal Tabs
   -------------------------------------------------------------------------- */
function initIdeTabs() {
  const tabs = document.querySelectorAll('.ide-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetContent = document.getElementById(`tab-${targetTab}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. Copy to Clipboard Utility
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            showToast(`Copied to clipboard: ${textToCopy}`, 'success');
          })
          .catch(() => {
            showToast('Failed to copy text', 'info');
          });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. Contact Form Handling & Validation
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('form-submit-btn');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      showToast('Please fill in all required fields.', 'info');
      return;
    }

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      showToast(`Thank you, ${nameInput.value.trim()}! Your message has been sent successfully.`, 'success');
      form.reset();
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
   10. Interactive Project Modal Dialog
   -------------------------------------------------------------------------- */
const projectsData = {
  fixai: {
    number: "01",
    title: "FixAI",
    subtitle: "AI HARDWARE DAMAGE ASSISTANT",
    description: "An AI-powered system designed to help users identify damaged electronic components, understand their purpose, identify possible causes of damage and receive repair guidance.",
    img: "assets/images/fixai_thumbnail.png",
    tech: ["Python", "HTML", "CSS", "SQL", "AI"],
    problem: "Hardware diagnosis for electronic components often requires expert assistance or lengthy manual manual lookups.",
    solution: "FixAI uses computer vision and diagnostic decision models to instantly detect component damage, specify probable causes, and recommend repair steps.",
    features: [
      "Hardware Component Diagnostics via image & sensory inspection data.",
      "Root Cause Breakdown evaluating power surges, heat wear, and physical strain.",
      "Step-by-Step Repair Guidance & replacement recommendations.",
      "SQL Database Integration for logging service histories and diagnostic logs."
    ],
    github: "https://github.com/gokul3844c/Fixio",
    demo: "https://fixai-demo.example.com"
  },
  farmerai: {
    number: "02",
    title: "Farmer AI",
    subtitle: "SMART AGRICULTURAL ASSISTANT",
    description: "A smart agriculture application providing useful features such as crop disease detection, crop price information, weather-related guidance, irrigation support and an AI assistant.",
    img: "assets/images/farmerai_thumbnail.png",
    tech: ["Python", "Flutter", "SQL", "AI"],
    problem: "Farmers frequently face crop loss due to delayed disease identification, erratic weather patterns, and market price fluctuations.",
    solution: "Farmer AI aggregates real-time agricultural telemetry, crop disease visual classification, and pricing alerts into a unified mobile interface.",
    features: [
      "AI Crop Disease Detection with image scanning and treatment suggestions.",
      "Live Crop Market Price Feed for informed harvest trading decisions.",
      "Intelligent Weather & Irrigation Scheduler based on regional forecasts.",
      "Conversational Agricultural AI Assistant for rapid farming advice."
    ],
    github: "https://github.com/gokul3844c/farmer-ai",
    demo: "https://farmerai-demo.example.com"
  },
  genku: {
    number: "03",
    title: "Genku",
    subtitle: "AI VOICE ASSISTANT",
    description: "An intelligent voice assistant designed to understand user commands and provide conversational responses using AI and voice technologies.",
    img: "assets/images/genku_thumbnail.png",
    tech: ["Python", "AI", "Voice Processing"],
    problem: "Navigating complex desktop workflows or standard query engines manually can be slow for hands-free environments.",
    solution: "Genku executes voice command parsing, speech synthesis, and contextual conversational responses using Python speech modules.",
    features: [
      "Real-time Voice Command Parsing & Intent Recognition.",
      "Conversational Response Generation powered by AI models.",
      "Hands-Free Desktop Automation & Query Execution.",
      "Custom Natural Speech Synthesis with clean audio output."
    ],
    github: "https://github.com/gokul3844c/genku",
    demo: "https://genku-demo.example.com"
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const viewBtns = document.querySelectorAll('.view-project-btn');

  if (!modal || !modalBody || !modalClose) return;

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectsData[projKey];

      if (!data) return;

      modalBody.innerHTML = `
        <div class="modal-header" style="margin-bottom: 1rem;">
          <span class="project-category">${data.subtitle}</span>
          <h2 style="font-size: 2rem; margin-top: 0.2rem;">${data.title}</h2>
        </div>
        <img src="${data.img}" alt="${data.title}" class="modal-img" style="width:100%; height:250px; object-fit:cover; border-radius:14px; margin-bottom:1.25rem; border:1px solid var(--border-color);">
        
        <p class="project-summary" style="margin-bottom: 1.2rem; font-size:1.02rem;">${data.description}</p>
        
        <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); padding:1rem 1.2rem; border-radius:12px; margin-bottom:1.2rem;">
          <h4 style="color:var(--accent-cyan); font-size:0.9rem; margin-bottom:0.4rem;"><i class="fa-solid fa-triangle-exclamation"></i> Problem Statement:</h4>
          <p style="font-size:0.9rem; margin-bottom:0.8rem;">${data.problem}</p>
          <h4 style="color:var(--accent-emerald); font-size:0.9rem; margin-bottom:0.4rem;"><i class="fa-solid fa-lightbulb"></i> Solution:</h4>
          <p style="font-size:0.9rem;">${data.solution}</p>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <h4 style="font-size:0.95rem; margin-bottom:0.5rem;"><i class="fa-solid fa-list-check" style="color:var(--accent-primary);"></i> Key Features Breakdown:</h4>
          <ul style="font-size:0.9rem; line-height:1.7; color:var(--text-secondary);">
            ${data.features.map(f => `<li><i class="fa-solid fa-check" style="color: var(--accent-cyan);"></i> ${f}</li>`).join('')}
          </ul>
        </div>

        <div class="project-tech-pills" style="margin-bottom: 1.8rem;">
          ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <div style="display: flex; flex-wrap:wrap; gap: 0.8rem;">
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
            <i class="fa-brands fa-github"></i> Open Repository
          </a>
          <a href="${data.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <i class="fa-solid fa-up-right-from-square"></i> Launch Live Demo
          </a>
        </div>
      `;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* --------------------------------------------------------------------------
   11. Scroll Reveal Observer
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1
  });

  reveals.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   12. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   13. Interactive Background Particle Canvas
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 40;
  const maxDistance = 110;

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.6 + 1;
      this.color = Math.random() > 0.5 ? 'rgba(168, 85, 247, ' : 'rgba(236, 72, 153, ';
      this.alpha = Math.random() * 0.45 + 0.25;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const opacity = (1 - dist / maxDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   14. Card Spotlight & Subtle 3D Tilt Effect
   -------------------------------------------------------------------------- */
function initCardSpotlightAndTilt() {
  const cards = document.querySelectorAll('.bento-card');
  if (window.innerWidth <= 992) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      if (card.classList.contains('tilt-card')) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('tilt-card')) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   15. Magnetic Buttons Effect (Desktop Only)
   -------------------------------------------------------------------------- */
function initMagneticButtons() {
  const magBtns = document.querySelectorAll('.magnetic-btn');
  if (window.innerWidth <= 992) return;

  magBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* --------------------------------------------------------------------------
   16. Toast Utility
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
  toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
