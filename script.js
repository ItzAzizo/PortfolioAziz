// ============================================
// INITIALISATION AOS
// ============================================
AOS.init({
  duration: 400,
  offset: 50,
  once: true,
  disable: false
});

// ============================================
// SKILL BARS ANIMATION
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.skill-fill');
        if (bar) {
          bar.style.width = bar.getAttribute('data-percent');
        }
      }
    });
  });

  document.querySelectorAll('.skill-row').forEach(row => {
    observer.observe(row);
  });
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
}

// ============================================
// CURSOR PARTICLES (Canvas)
// ============================================
const canvas = document.getElementById('cursor-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  let mouse = { x: 0, y: 0 };

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    for (let i = 0; i < 3; i++) {
      particles.push({
        x: mouse.x,
        y: mouse.y,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        life: 1
      });
    }
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isLight = document.documentElement.classList.contains('light-mode');
    particles.forEach((p, index) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.life -= 0.02;
      if (p.life <= 0) {
        particles.splice(index, 1);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? `rgba(124, 58, 237, ${p.life * 0.5})`
          : `rgba(139, 92, 246, ${p.life})`;
        ctx.fill();
      }
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// ============================================
// DARK / LIGHT THEME TOGGLE
// with Sun/Moon Rise Animation
// ============================================
function toggleTheme() {
  const html = document.documentElement;
  const overlay = document.getElementById('theme-overlay');
  const celestial = document.getElementById('celestial-body');
  const isLight = html.classList.contains('light-mode');

  // Reset celestial body for fresh animation
  if (celestial) {
    celestial.style.animation = 'none';
    celestial.offsetHeight; // Force reflow
    celestial.style.animation = '';
  }

  // Set overlay direction
  overlay.classList.remove('to-light', 'to-dark');
  overlay.classList.add(isLight ? 'to-dark' : 'to-light');

  // Trigger animation — celestial body rises from bottom
  overlay.classList.add('active');
  
  // Switch theme when celestial body reaches midpoint
  setTimeout(() => {
    html.classList.toggle('light-mode');
    localStorage.setItem('theme', html.classList.contains('light-mode') ? 'light' : 'dark');
  }, 400);

  // Fade out overlay after celestial rise completes
  setTimeout(() => {
    overlay.classList.remove('active');
  }, 900);
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-mode');
  }
});

// ============================================
// PARALLAX ON SCROLL (Inverse direction)
// ============================================
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const shapes = document.querySelectorAll('.parallax-shape');
      
      shapes.forEach((shape, i) => {
        // Inverse parallax: shapes move OPPOSITE to scroll direction
        const speed = (i + 1) * 0.03;
        const direction = i % 2 === 0 ? 1 : -1;
        shape.style.transform = `translateY(${scrollY * speed * direction}px)`;
      });
      
      ticking = false;
    });
    ticking = true;
  }
});

// ============================================
// VEILLE CYBERSÉCURITÉ - 3 PILIERS IA
// ============================================

const veilleData = {
  offensive: [
    {
      title: "Prompt Injection : Menace #1 OWASP 2025",
      desc: "Technique permettant de manipuler les LLM pour extraire des données sensibles ou contourner leurs protections.",
      icon: "fa-terminal",
      date: "Fév 2026",
      url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
    },
    {
      title: "Malwares Polymorphes générés par IA",
      desc: "Code malveillant qui modifie sa signature à chaque exécution pour échapper aux antivirus et EDR.",
      icon: "fa-virus",
      date: "Fév 2026",
      url: "https://www.ncsc.gov.uk/report/impact-of-ai-on-cyber-threat"
    },
    {
      title: "Deepfakes Audio : Fraudes au virement",
      desc: "L'IA permet de cloner la voix d'un PDG pour orchestrer des fraudes. Plus de 8M deepfakes partagés en 2025.",
      icon: "fa-user-secret",
      date: "Jan 2026",
      url: "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/bonnes-pratiques"
    },
    {
      title: "Phishing hyper-personnalisé par GPT",
      desc: "Les LLM génèrent des campagnes de phishing ultra-ciblées en analysant les réseaux sociaux des victimes.",
      icon: "fa-fish",
      date: "Jan 2026",
      url: "https://www.cert.ssi.gouv.fr/"
    }
  ],

  defensive: [
    {
      title: "UEBA : Détection comportementale",
      desc: "User and Entity Behavior Analytics - L'IA repère les comportements anormaux des utilisateurs sur le réseau.",
      icon: "fa-user-shield",
      date: "Fév 2026",
      url: "https://www.ssi.gouv.fr/entreprise/guide/prestataires-de-services-de-securite/"
    },
    {
      title: "SOAR : Réponse automatisée aux incidents",
      desc: "Security Orchestration, Automation and Response - Automatisation de la détection et réponse aux menaces 24/7.",
      icon: "fa-robot",
      date: "Fév 2026",
      url: "https://www.microsoft.com/en-us/security/blog/"
    },
    {
      title: "Zero-Trust avec IA adaptative",
      desc: "L'architecture Zero-Trust s'enrichit de l'IA pour valider en continu l'identité de chaque accès.",
      icon: "fa-shield-halved",
      date: "Jan 2026",
      url: "https://www.cloudflare.com/fr-fr/learning/security/glossary/what-is-zero-trust/"
    },
    {
      title: "SOC augmenté par Machine Learning",
      desc: "Les Security Operations Centers intègrent le ML pour analyser des millions d'événements en temps réel.",
      icon: "fa-chart-line",
      date: "Jan 2026",
      url: "https://thehackernews.com/"
    }
  ],

  adversarial: [
    {
      title: "Empoisonnement des données d'entraînement",
      desc: "Les attaquants corrompent les datasets pour créer des backdoors dans les modèles IA de production.",
      icon: "fa-database",
      date: "Fév 2026",
      url: "https://owasp.org/www-project-machine-learning-security-top-10/"
    },
    {
      title: "Attaques adversariales sur les modèles",
      desc: "Manipulation subtile des entrées pour tromper les systèmes de classification IA.",
      icon: "fa-image",
      date: "Fév 2026",
      url: "https://genai.owasp.org/"
    },
    {
      title: "Model Extraction : Vol de modèles IA",
      desc: "Techniques pour reconstruire un modèle propriétaire en analysant ses réponses via des requêtes ciblées.",
      icon: "fa-copy",
      date: "Jan 2026",
      url: "https://www.zdnet.fr/actualites/cybersecurite/"
    },
    {
      title: "Jailbreaking des systèmes IA",
      desc: "Contournement des guardrails des LLM pour leur faire générer du contenu malveillant.",
      icon: "fa-unlock",
      date: "Jan 2026",
      url: "https://www.lemondeinformatique.fr/les-dossiers/lire-vulnerabilites-failles-et-cyberattaques-59.html"
    }
  ]
};

function displayVeillePiliers() {
  const containers = {
    offensive: document.getElementById('veille-offensive'),
    defensive: document.getElementById('veille-defensive'),
    adversarial: document.getElementById('veille-adversarial')
  };

  const colors = {
    offensive: { bg: 'bg-red-500/10', border: 'border-red-500/30', icon: 'text-red-400' },
    defensive: { bg: 'bg-green-500/10', border: 'border-green-500/30', icon: 'text-green-400' },
    adversarial: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', icon: 'text-purple-400' }
  };

  Object.keys(containers).forEach(pilier => {
    const container = containers[pilier];
    if (!container) return;

    const items = veilleData[pilier];
    const color = colors[pilier];

    container.innerHTML = items.map(item => `
      <a href="${item.url}" target="_blank" class="${color.bg} p-3 rounded-lg border ${color.border} hover:scale-[1.02] transition-transform cursor-pointer block">
        <div class="flex items-start gap-3">
          <i class="fas ${item.icon} ${color.icon} text-lg mt-1"></i>
          <div class="flex-grow">
            <h5 class="font-bold text-sm mb-1" style="color: var(--text-primary)">${item.title}</h5>
            <p class="text-xs leading-relaxed" style="color: var(--text-muted)">${item.desc}</p>
            <div class="flex items-center justify-between mt-2">
              <span class="text-xs" style="color: var(--text-muted)"><i class="fas fa-calendar-alt mr-1"></i>${item.date}</span>
              <span class="text-xs ${color.icon}"><i class="fas fa-external-link-alt mr-1"></i>Source</span>
            </div>
          </div>
        </div>
      </a>
    `).join('');
  });
}

function refreshVeille() {
  const allContainers = document.querySelectorAll('[id^="veille-"]');
  allContainers.forEach(container => {
    container.innerHTML = `
      <div class="bg-white/5 p-3 rounded-lg border border-white/10 animate-pulse">
        <div class="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div class="h-3 bg-gray-700 rounded w-1/2"></div>
      </div>
    `;
  });
  setTimeout(displayVeillePiliers, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(displayVeillePiliers, 800);
});

// ============================================
// TECH FILTER
// ============================================
function filterTech(category) {
  const icons = document.querySelectorAll('.tech-track .tech-icon');
  const buttons = document.querySelectorAll('.tech-filter');

  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === category) {
      btn.classList.add('active');
    }
  });

  icons.forEach(icon => {
    const iconCategory = icon.dataset.category;

    if (category === 'all' || iconCategory.includes(category)) {
      icon.style.opacity = '1';
      icon.style.transform = 'scale(1)';
    } else {
      icon.style.opacity = '0.15';
      icon.style.transform = 'scale(0.9)';
    }
  });
}

// ============================================
// TYPEWRITER EFFECT
// ============================================
const typewriterElement = document.getElementById('typewriter');
if (typewriterElement) {
  const words = ["Virtualisation", "Cybersécurité", "Active Directory", "Réseaux & Infrastructures"];
  let i = 0;
  let timer;

  function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
      if (word.length > 0) {
        typewriterElement.innerHTML += word.shift();
      } else {
        setTimeout(deletingEffect, 2000); // 2 second pause before deleting
        return false;
      };
      timer = setTimeout(loopTyping, 100); // Typing speed
    };
    loopTyping();
  }

  function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
      if (word.length > 0) {
        word.pop();
        typewriterElement.innerHTML = word.join("");
      } else {
        if (words.length > (i + 1)) {
          i++;
        } else {
          i = 0;
        }
        setTimeout(typingEffect, 500); // 0.5s pause before typing next word
        return false;
      }
      timer = setTimeout(loopDeleting, 50); // Deleting speed
    };
    loopDeleting();
  }

  // Start the typing effect
  setTimeout(typingEffect, 1000);
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

if (scrollToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
