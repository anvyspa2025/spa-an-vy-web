// ===== LOADING SCREEN =====
window.addEventListener('load', function() {
  const loading = document.getElementById('loading');
  setTimeout(() => {
    loading.classList.add('hidden');
  }, 500);
});

// ===== SIDEBAR MENU =====
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

// Toggle sidebar
function toggleSidebar() {
  sidebar.classList.toggle('active');
  sidebarOverlay.classList.toggle('active');
}

// Open sidebar
if (sidebarToggle) {
  sidebarToggle.addEventListener('click', toggleSidebar);
}

// Close sidebar when clicking overlay
if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', toggleSidebar);
}

// Close sidebar when clicking a menu link
const sidebarLinks = document.querySelectorAll('.sidebar-content a');
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
  });
});

// ===== SMOOTH SCROLL FOR NAVIGATION =====
const navLinks = document.querySelectorAll('.main-nav a, .sidebar-content a');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Check if it's an internal link (starts with #)
    if (href && href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        // Calculate offset for sticky header
        const headerOffset = 120;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update active state
        updateActiveNav(this);
      }
    }
  });
});

// Update active navigation item
function updateActiveNav(activeLink) {
  // Remove active class from all nav links
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.classList.remove('active');
  });
  
  // Add active class to clicked link
  if (activeLink.classList.contains('main-nav')) {
    activeLink.classList.add('active');
  } else {
    // If clicked from sidebar, find corresponding main nav link
    const href = activeLink.getAttribute('href');
    const mainNavLink = document.querySelector(`.main-nav a[href="${href}"]`);
    if (mainNavLink) {
      mainNavLink.classList.add('active');
    }
  }
}

// ===== SCROLL SPY - HIGHLIGHT ACTIVE SECTION =====
const sections = document.querySelectorAll('section[id]');

function scrollSpy() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      // Remove active from all
      document.querySelectorAll('.main-nav a').forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active to current section link
      const activeLink = document.querySelector(`.main-nav a[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', scrollSpy);

// ===== FADE IN ANIMATION ON SCROLL =====
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1
});

fadeElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeInObserver.observe(element);
});

// ===== FORM VALIDATION =====
const bookingForm = document.getElementById('booking-form');

if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    const name = this.querySelector('input[name="name"]').value.trim();
    const email = this.querySelector('input[name="email"]').value.trim();
    const phone = this.querySelector('input[name="zalo"]').value.trim();
    const message = this.querySelector('textarea[name="message"]').value.trim();
    
    // Basic validation
    if (!name || !email || !phone || !message) {
      e.preventDefault();
      alert('Vui lòng điền đầy đủ thông tin!');
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      e.preventDefault();
      alert('Email không hợp lệ!');
      return false;
    }
    
    // Phone validation (10-11 digits)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phone)) {
      e.preventDefault();
      alert('Số điện thoại không hợp lệ! Vui lòng nhập 10-11 chữ số.');
      return false;
    }
    
    // If all validations pass, show success message
    // The form will submit normally to formsubmit.co
  });
}

// ===== LAZY LOADING IMAGES =====
const images = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.src; // Trigger loading
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ===== PREVENT ZOOM ON MOBILE =====
document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});

// ===== BACK TO TOP BUTTON (Optional - can add HTML for this) =====
// Create back to top button dynamically
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.style.cssText = `
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: none;
  z-index: 999;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
`;
backToTopBtn.setAttribute('aria-label', 'Lên đầu trang');
document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

// Scroll to top when clicked
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== HIGHLIGHT PHONE NUMBER ON CLICK =====
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
phoneLinks.forEach(link => {
  link.addEventListener('click', function() {
    this.style.background = '#fff3cd';
    setTimeout(() => {
      this.style.background = '';
    }, 1000);
  });
});

// ===== FAQ ACCORDION ENHANCEMENT =====
const detailsElements = document.querySelectorAll('details');
detailsElements.forEach(detail => {
  detail.addEventListener('toggle', function() {
    if (this.open) {
      // Close other details
      detailsElements.forEach(otherDetail => {
        if (otherDetail !== this && otherDetail.open) {
          otherDetail.open = false;
        }
      });
      
      // Scroll to opened detail
      setTimeout(() => {
        this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 300);
    }
  });
});

// ===== PREVENT RIGHT CLICK ON IMAGES (Optional - protect images) =====
// Uncomment if you want to protect images
/*
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });
});
*/

// ===== ADD LOADING CLASS TO EXTERNAL LINKS =====
const externalLinks = document.querySelectorAll('a[target="_blank"]');
externalLinks.forEach(link => {
  link.addEventListener('click', function() {
    this.style.opacity = '0.7';
    setTimeout(() => {
      this.style.opacity = '';
    }, 1000);
  });
});

// ===== ENHANCE CHAT BUTTONS WITH VIBRATION (if supported) =====
const chatButtons = document.querySelectorAll('.chat-btn');
chatButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    // Vibrate if supported
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    // Visual feedback
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = '';
    }, 200);
  });
});

// ===== CONSOLE MESSAGE =====
console.log('%c🌸 An Vy Spa Thủ Đức 🌸', 'color: #4caf50; font-size: 20px; font-weight: bold;');
console.log('%cWebsite được phát triển với ❤️', 'color: #666; font-size: 12px;');
console.log('%cĐặt lịch: 0778773226', 'color: #2c5f2d; font-size: 14px; font-weight: bold;');
