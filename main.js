document.addEventListener("DOMContentLoaded", function () {
  // HEADER dinamik yükleme
  fetch("header.html")
    .then(response => response.text())
    .then(data => {
      const headerDiv = document.getElementById("header");
      if (headerDiv) headerDiv.innerHTML = data;

      const menuToggle = document.querySelector(".menu-toggle");
      const nav = document.querySelector("nav");

      if (menuToggle && nav) {
        // Menü aç/kapa, hamburger çarpıya dönüşür
        menuToggle.addEventListener("click", () => {
          nav.classList.toggle("active");
          menuToggle.classList.toggle("open");
        });

        // Menü linklerine tıklanınca menüyü kapat
        document.querySelectorAll("nav ul.nav-list li a").forEach(link => {
          link.addEventListener("click", () => {
            nav.classList.remove("active");
            menuToggle.classList.remove("open");
          });
        });

        // Menü dışına tıklanırsa menüyü kapat
        document.addEventListener("click", (event) => {
          const isClickInsideMenu = nav.contains(event.target);
          const isClickOnToggle = menuToggle.contains(event.target);

          if (!isClickInsideMenu && !isClickOnToggle && nav.classList.contains("active")) {
            nav.classList.remove("active");
            menuToggle.classList.remove("open");
          }
        });
      }
    })
    .catch(error => console.error("Header yüklenemedi:", error));

  // FOOTER dinamik yükleme
  fetch("footer.html")
    .then(response => response.text())
    .then(data => {
      const footerDiv = document.getElementById("footer");
      if (footerDiv) footerDiv.innerHTML = data;
    })
    .catch(error => console.error("Footer yüklenemedi:", error));

  // Hover açıklamaları başlat
  initProcessBoxHover();
});

window.addEventListener('load', () => {
  initParticles();
  initAnimations();
  if (typeof loadProjects === "function") loadProjects();
  if (typeof initScrollAnimations === "function") initScrollAnimations();
  if (typeof scrollToHeroSection === "function") scrollToHeroSection();
  if (typeof initContactForm === "function") initContactForm();
});

// Animasyonlu metin başlatma
function initAnimations() {
  const animatedText = document.querySelector('.animated-text');
  if (!animatedText) return;

  animatedText.classList.add('active');
  const spans = animatedText.querySelectorAll('span');
  spans.forEach((span, i) => {
    span.style.animationDelay = `${i * 0.2}s`;
  });
}

// Particles.js başlatma
function initParticles() {
  if (!document.getElementById("particles-js")) return;

  particlesJS("particles-js", {
    particles: {
      number: { value: 100 },
      color: { value: "#75b73b" },
      
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 2 },
      move: { enable: true, speed: 1, random: true }
    },
    line_linked: {
      "color": "#75b73b"  // Çizgi rengi
    },
    interactivity: {
      events: { onhover: { enable: false }, onclick: { enable: false } }
    },
    retina_detect: true
  });
}

// Süreç kutuları hover açıklamaları
function initProcessBoxHover() {
  const processBoxes = document.querySelectorAll(".process-box");
  const descBox = document.getElementById("descBox");

  const defaultText = "Her başarılı sitenin bir süreci vardır. Adımlara göz atın.";
  const defaultBoxBg = "#1e1e1e";
  const defaultBoxColor = "#fff";
  const hoverBoxBg = "#fff";
  const hoverBoxColor = "#75b73b";
  const defaultDescBg = "#222";
  const defaultDescColor = "#fff";
  const hoverDescBg = "#fff";
  const hoverDescColor = "#75b73b";

  

  if (descBox) {
    descBox.textContent = defaultText;
    descBox.style.backgroundColor = defaultDescBg;
    descBox.style.color = defaultDescColor;
  }

  processBoxes.forEach(box => {
    box.style.backgroundColor = defaultBoxBg;
    box.style.color = defaultBoxColor;

    box.addEventListener("mouseenter", () => {
      const description = box.getAttribute("data-description");
      descBox.textContent = description;

      box.style.backgroundColor = hoverBoxBg;
      box.style.color = hoverBoxColor;

      descBox.style.backgroundColor = hoverDescBg;
      descBox.style.color = hoverDescColor;
    });

    box.addEventListener("mouseleave", () => {
      descBox.textContent = defaultText;

      box.style.backgroundColor = defaultBoxBg;
      box.style.color = defaultBoxColor;

      descBox.style.backgroundColor = defaultDescBg;
      descBox.style.color = defaultDescColor;
    });
  });
}

// Element görünürlük kontrolü
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight - 50 && rect.bottom >= 0;
}

// Scroll animasyonları başlat
function initScrollAnimations() {
  const benefitBoxes = document.querySelectorAll('.benefit-box');
  const processBoxes = document.querySelectorAll('.process-box');

  const checkVisibility = () => {
    benefitBoxes.forEach(box => {
      if (isInViewport(box)) box.classList.add('visible');
    });
    processBoxes.forEach(box => {
      if (isInViewport(box)) box.classList.add('visible');
    });
  };

  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('load', checkVisibility);
}
