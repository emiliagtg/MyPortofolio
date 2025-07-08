document.addEventListener('DOMContentLoaded', () => {
  // ------------------------
  // CERTIFICATE MODAL (POPUP)
  // ------------------------
  const certImages = [
    'img/certificate_dicoding_java.jpeg',
    'img/dicertificate_dicoding_AIPraktis.jpg',
    'img/certificate_digitalent_AIBeginner.jpg',
    'img/certificate_digitalent_AI Intermediate.jpg',
    'img/certificate_digitalent.jpg',
    'img/certificate_digitalent_micro.jpeg'
  ];

  const certModal = document.getElementById('certModal');
  const certModalImg = document.getElementById('modalCertImg');
  const prevCertBtn = document.getElementById('prevCertBtn');
  const nextCertBtn = document.getElementById('nextCertBtn');
  const closeCertModal = document.getElementById('closeCertModal');
  let currentCertIndex = 0;

  function updateCertModal() {
    certModalImg.src = certImages[currentCertIndex];
  }

  function openCertModal(index) {
    currentCertIndex = index;
    updateCertModal();
    certModal.classList.add('show');
  }

  function closeModalCert() {
    certModal.classList.remove('show');
  }

  function nextCert() {
    currentCertIndex = (currentCertIndex + 1) % certImages.length;
    updateCertModal();
  }

  function prevCert() {
    currentCertIndex = (currentCertIndex - 1 + certImages.length) % certImages.length;
    updateCertModal();
  }

  window.openCertModal = openCertModal;

  if (nextCertBtn && prevCertBtn && closeCertModal) {
    nextCertBtn.addEventListener('click', nextCert);
    prevCertBtn.addEventListener('click', prevCert);
    closeCertModal.addEventListener('click', closeModalCert);
  }

  certModal?.addEventListener('click', (e) => {
    if (e.target === certModal) closeModalCert();
  });

  // ------------------------
  // SCROLL ANIMATIONS
  // ------------------------
  const observerOptions = { threshold: 0.1 };

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  const showObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.skill-icon').forEach(item => {
    activeObserver.observe(item);
  });

  document.querySelectorAll('.scroll-reveal, .skill-icon').forEach(item => {
    showObserver.observe(item);
  });

  // ------------------------
  // TYPING TEXT EFFECT
  // ------------------------
  const phrases = [
  '<span style="color:#6fa7ce;">I am an Information Technology Student</span>', // sky-400
  '<span style="color:#6fa7ce;">I specialize in Artificial Intelligence</span>'  // pink-400
];

const typedText = document.getElementById("typed-text");
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const current = phrases[phraseIndex];
  const cleanText = current.replace(/<[^>]*>?/gm, ''); // Strip tags to count only text

  const visible = isDeleting
    ? cleanText.substring(0, charIndex--)
    : cleanText.substring(0, charIndex++);

  const visibleHTML = current.replace(cleanText, visible);

  typedText.innerHTML = visibleHTML;

  if (!isDeleting && charIndex === cleanText.length) {
    setTimeout(() => isDeleting = true, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(typeEffect, isDeleting ? 40 : 100);
}

if (typedText) typeEffect();

  // ------------------------
  // SCROLL TO TOP BUTTON
  // ------------------------
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scrollToTop';
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.className = 'fixed bottom-6 right-6 bg-sky-600 hover:bg-sky-500 text-white p-3 rounded-full shadow-lg hidden z-50 transition-opacity duration-300';
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    scrollBtn.classList.toggle("hidden", window.scrollY <= 200);
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ------------------------
  // CONTACT FORM + EMAILJS
  // ------------------------
  emailjs.init("0mqWwG4ZnyNkJFqOc");

  const form = document.querySelector("form");

  function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toastMessage");
    if (toast && toastMsg) {
      toastMsg.textContent = message;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 3000);
    }
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = this.email.value;
      if (!email.includes("@") || !email.includes(".")) {
        showToast("❗ Please enter a valid email address");
        return;
      }

      showToast("⏳ Sending message...");

      emailjs.sendForm("service_2d9ue3k", "template_fjizopm", this)
        .then(() => {
          showToast("✅ Message sent successfully!");
          this.reset();
        })
        .catch(() => {
          showToast("❌ Failed to send message. Please try again.");
        });
    });
  }

  // ------------------------
  // SKILL ITEM ANIMATION
  // ------------------------
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item, index) => {
    setTimeout(() => item.classList.add("show"), index * 150);
    item.addEventListener("click", () => {
      skillItems.forEach(el => el.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // ==== CERTIFICATE SLIDER (HORIZONTAL) ====
dotsContainer.innerHTML = '';

const maxDots = 6;
for (let i = 0; i < Math.min(slides.length, maxDots); i++) {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => showSlide(current = i));
  dotsContainer?.appendChild(dot);
}


// ❗ Hapus semua dots lama sebelum buat baru
dotsContainer.innerHTML = '';

slides.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => showSlide(current = i));
  dotsContainer?.appendChild(dot);
});

showSlide(current);

});

// ------------------------
// SPEECH FUNCTION & MENU TOGGLE
// ------------------------
function speak(text) {
  if ('speechSynthesis' in window) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.pitch = 1;
    speech.rate = 1;
    speech.volume = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  } else {
    alert("Text-to-Speech not supported in this browser.");
  }
}

function toggleMenu() {
  document.querySelector('.nav-links')?.classList.toggle('active');
}
