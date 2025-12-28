document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     1. CUỘN MƯỢT KHI CLICK MENU
     ========================= */
  document.querySelectorAll('.main-nav a, .sidebar-left a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  /* =========================
     2. FADE-IN KHI CUỘN
     ========================= */
  const faders = document.querySelectorAll('.fade-in');
  if (faders.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    faders.forEach(fader => observer.observe(fader));
  }

  /* =========================
     3. LIGHTBOX ẢNH
     ========================= */
  const galleryImgs = document.querySelectorAll('.gallery-vertical img, .slides img');
  if (galleryImgs.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.display = 'none';
    lightbox.innerHTML = '<img id="lightbox-img" src="" alt="Ảnh phóng to">';
    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById('lightbox-img');

    galleryImgs.forEach(img => {
      img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
      });
    });

    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    });
  }

  /* =========================
     4. GALLERY SLIDER (NẾU CÓ)
     ========================= */
  const slides = document.querySelector('.slides');
  const images = document.querySelectorAll('.slides img');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let index = 0;

  function showSlide(i) {
    if (!slides || images.length === 0) return;
    if (i < 0) index = images.length - 1;
    else if (i >= images.length) index = 0;
    else index = i;
    slides.style.transform = `translateX(${-index * 100}%)`;
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => showSlide(index - 1));
    nextBtn.addEventListener('click', () => showSlide(index + 1));
  }

  /* =========================
     5. LOADING SCREEN
     ========================= */
  window.addEventListener("load", () => {
    const loading = document.getElementById("loading");
    if (loading) loading.style.display = "none";
  });

  /* =========================
     6. FORM SUBMIT FEEDBACK
     ========================= */
  const form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', () => {
      setTimeout(() => {
        alert("🌸 Cảm ơn bạn đã đặt lịch tại Spa An Vy! Chúng tôi sẽ liên hệ sớm.");
      }, 200);
    });
  }

  /* =========================
     7. SIDEBAR TOGGLE (CHUẨN)
     ========================= */
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarLinks = document.querySelectorAll('.sidebar-left a');

  // Toggle sidebar
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('active');
      sidebarOverlay.classList.toggle('active');
    });
  }

  // Đóng khi click overlay
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      sidebarOverlay.classList.remove('active');
    });
  }

  // Đóng khi click link (mobile)
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
      }
    });
  });

  // Đóng khi click ngoài sidebar
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
      if (
        !sidebar.contains(e.target) &&
        sidebarToggle &&
        !sidebarToggle.contains(e.target)
      ) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
      }
    }
  });

  // Đóng khi resize lên desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      sidebar.classList.remove('active');
      sidebarOverlay.classList.remove('active');
    }
  });

});
