window.addEventListener('load', () => {
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    splash.style.transition = 'opacity 0.6s ease';
    splash.style.opacity = '0';

    setTimeout(() => {
      splash.style.display = 'none';
    }, 700);

    window.scrollTo(0, 0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, {
      threshold: 0.15
    });

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight * 0.1) {
        navbar.classList.remove('hide-nav');
      } else {
        navbar.classList.add('hide-nav');
      }
    });

  }, 5000);
});

function expandGame(card) {
  const isExpanded = card.classList.contains('expanded');
  document.querySelectorAll('.game-card').forEach(c => c.classList.remove('expanded'));
  if (!isExpanded) {
    card.classList.add('expanded');
  }
}

document.addEventListener('click', (e) => {
  const isCard = e.target.closest('.game-card');
  if (!isCard) {
    document.querySelectorAll('.game-card.expanded').forEach(c => c.classList.remove('expanded'));
  }
});

function openModal(imageSrc, title, desc) {
  document.getElementById('modal-image').src = imageSrc;
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-desc').textContent = desc;
  document.getElementById('game-modal').classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('game-modal');
  const content = modal.querySelector('.modal-content');
  content.classList.add('closing');
  content.addEventListener('animationend', () => {
    modal.classList.remove('active');
    content.classList.remove('closing');
  }, { once: true });
}

document.getElementById('game-modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this;

  emailjs.sendForm("service_ytuwz4d", "template_id9qbbd", form)
    .then(() => {
      form.style.display = "none";
      document.getElementById("thank-you-message").style.display = "block";
    }, (error) => {
      alert("Gagal mengirim pesan: " + error.text);
      console.error("EmailJS error:", error);
    });
});
