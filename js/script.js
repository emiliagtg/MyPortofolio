document.addEventListener('DOMContentLoaded', () => {
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

  function nextCertModal() {
    currentCertIndex = (currentCertIndex + 1) % certImages.length;
    updateCertModal();
  }

  function prevCertModal() {
    currentCertIndex = (currentCertIndex - 1 + certImages.length) % certImages.length;
    updateCertModal();
  }

  window.openCertModal = openCertModal;

  if (nextCertBtn && prevCertBtn && closeCertModal) {
    nextCertBtn.addEventListener('click', nextCertModal);
    prevCertBtn.addEventListener('click', prevCertModal);
    closeCertModal.addEventListener('click', closeModalCert);
  }

  certModal?.addEventListener('click', (e) => {
    if (e.target === certModal) closeModalCert();
  });

  // Scroll animations
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

  // Typing text effect
  const phrases = [
    '<span style="color:#6fa7ce;">I am an Information Technology Student</span>',
    '<span style="color:#6fa7ce;">I specialize in Artificial Intelligence</span>'
  ];

  const typedText = document.getElementById("typed-text");
  let phraseIndex = 0, charIndex = 0, isDeleting = false;

  function typeEffect() {
    const current = phrases[phraseIndex];
    const cleanText = current.replace(/<[^>]*>?/gm, '');

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

  // Scroll to top button
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

  // Contact form with emailjs
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

  // Skill item animation
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item, index) => {
    setTimeout(() => item.classList.add("show"), index * 150);
    item.addEventListener("click", () => {
      skillItems.forEach(el => el.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // Certificate slider
  const slides = document.querySelectorAll('.cert-slide');
  const dotsContainer = document.querySelector('.cert-dots');
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      if (dotsContainer.children[i]) {
        dotsContainer.children[i].classList.toggle('active', i === index);
      }
    });
  }

  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => showSlide(current = i));
    dotsContainer.appendChild(dot);
  });

  showSlide(current);
});

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
