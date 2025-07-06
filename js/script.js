// ------------------------
// CERTIFICATE MODAL
// ------------------------
document.addEventListener('DOMContentLoaded', () => {
  const certImages = document.querySelectorAll('.cert-img');
  const certEyes = document.querySelectorAll('.cert-eye');
  const certModal = document.getElementById('certModal');
  const certModalImg = document.getElementById('certModalImg');
  const prevCertBtn = document.getElementById('prevCertBtn');
  const nextCertBtn = document.getElementById('nextCertBtn');
  const closeCertModal = document.getElementById('closeCertModal');

  let currentCertIndex = 0;

  function updateCertModal() {
    certModalImg.src = certImages[currentCertIndex].src;
  }

  function showModalCert(index) {
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

  certImages.forEach((img, index) => {
    img.addEventListener('click', () => showModalCert(index));
  });

  certEyes.forEach((eye, index) => {
    eye.addEventListener('click', (e) => {
      e.stopPropagation();
      showModalCert(index);
    });
  });

  nextCertBtn.addEventListener('click', nextCert);
  prevCertBtn.addEventListener('click', prevCert);
  closeCertModal.addEventListener('click', closeModalCert);

  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) {
      closeModalCert();
    }
  });

  // ------------------------
  // AUTO SLIDER CERT CARD
  // ------------------------
  const certCards = document.querySelectorAll('.cert-card');
  let currentCert = 0;

  function showNextCertCard() {
    certCards.forEach((cert) => {
      cert.classList.remove('active');
      cert.style.display = 'none';
    });
    if (certCards.length > 0) {
      certCards[currentCert].classList.add('active');
      certCards[currentCert].style.display = 'block';
      currentCert = (currentCert + 1) % certCards.length;
    }
  }

  if (certCards.length > 0) {
    showNextCertCard();
    setInterval(showNextCertCard, 3000);
  }

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

  const activeItems = document.querySelectorAll('.skill-icon, .cert-card');
  activeItems.forEach(item => activeObserver.observe(item));

  const revealItems = document.querySelectorAll('.scroll-reveal, .skill-icon');
  revealItems.forEach(item => showObserver.observe(item));

  // ------------------------
  // TYPING TEXT EFFECT
  // ------------------------
  const phrases = [
    "I am an Information Technology Student",
    "I specialize in Artificial Intelligence"
  ];

  const typedText = document.getElementById("typed-text");
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedText.textContent = currentPhrase.substring(0, charIndex--);
    } else {
      typedText.textContent = currentPhrase.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    const speed = isDeleting ? 40 : 100;
    setTimeout(typeEffect, speed);
  }

  typeEffect();

  // ------------------------
  // SCROLL TO TOP BUTTON
  // ------------------------
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scrollToTop';
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.className = 'fixed bottom-6 right-6 bg-sky-600 hover:bg-sky-500 text-white p-3 rounded-full shadow-lg hidden z-50 transition-opacity duration-300';
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollBtn.classList.remove("hidden");
    } else {
      scrollBtn.classList.add("hidden");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ------------------------
  // CONTACT FORM WITH EMAILJS + TOAST
  // ------------------------
  emailjs.init("0mqWwG4ZnyNkJFqOc");

  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailField = this.email.value;
      if (!emailField.includes("@") || !emailField.includes(".")) {
        showToast("❗ Please enter a valid email address");
        return;
      }

      showToast("⏳ Sending message...");

      emailjs.sendForm("service_2d9ue3k", "template_fjizopm", this)
        .then(() => {
          showToast("✅ Message sent successfully!");
          this.reset();
        })
        .catch((error) => {
          console.error(error);
          showToast("❌ Failed to send message. Please try again.");
        });
    });
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toastMessage");
    toastMsg.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  // ------------------------
  // SKILL ITEM ANIMATION
  // ------------------------
  const skillItems = document.querySelectorAll(".skill-item");

  skillItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("show");
    }, index * 150);
  });

  skillItems.forEach(item => {
    item.addEventListener("click", () => {
      skillItems.forEach(el => el.classList.remove("active"));
      item.classList.add("active");
    });
  });
});

// ------------------------
// SPEECH FUNCTION
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
