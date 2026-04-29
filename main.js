// ===== ORTHODOX WESTERN CLOTHING - Main JavaScript =====

// ===== CART STATE =====
let cart = JSON.parse(localStorage.getItem('owc-cart') || '[]');

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if (window.scrollY > 60) {
    navbar.style.boxShadow = '0 4px 30px rgba(44,26,14,0.5)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ===== HAMBURGER MENU =====
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.querySelectorAll('span')[0].style.transform = isOpen ? 'rotate(45deg) translate(5px,5px)' : '';
    hamburger.querySelectorAll('span')[1].style.opacity = isOpen ? '0' : '1';
    hamburger.querySelectorAll('span')[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
}

// ===== CART =====
function saveCart() {
  localStorage.setItem('owc-cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const badge = document.querySelector('.cart-count');
  if (!badge) return;
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = total;
  badge.style.display = total > 0 ? 'flex' : 'none';
}

function addToCart(name, price, emoji) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, emoji, qty: 1 });
  }
  saveCart();
  showToast(`${name} added to cart!`);
}

function renderCart() {
  const body = document.querySelector('.cart-body');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = '<p class="cart-empty">Your cart is empty.<br>Explore our collection and add some western flair!</p>';
    const totalEl = document.querySelector('.cart-total-amount');
    if (totalEl) totalEl.textContent = 'BWP 0.00';
    return;
  }

  body.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">BWP ${item.price.toFixed(2)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${idx}, -1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${idx}, 1)">+</button>
        </div>
        <button class="remove-item" onclick="removeItem(${idx})">✕ Remove</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalEl = document.querySelector('.cart-total-amount');
  if (totalEl) totalEl.textContent = `BWP ${total.toFixed(2)}`;
}

function changeQty(idx, delta) {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  saveCart();
}

function removeItem(idx) {
  cart.splice(idx, 1);
  saveCart();
}

function openCart() {
  document.querySelector('.cart-overlay')?.classList.add('open');
  document.querySelector('.cart-sidebar')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.querySelector('.cart-overlay')?.classList.remove('open');
  document.querySelector('.cart-sidebar')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== TOAST NOTIFICATION =====
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
      background: #2C1A0E; color: #F5ECD7; padding: 0.9rem 2rem;
      font-family: 'Cinzel', serif; font-size: 0.78rem; letter-spacing: 0.1em;
      border: 1px solid #C9952A; z-index: 9999; opacity: 0;
      transition: opacity 0.3s; white-space: nowrap; border-radius: 2px;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

// ===== FILTER TABS =====
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.product-card');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ===== CONTACT FORM VALIDATION =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const inputs = form.querySelectorAll('[required]');

    inputs.forEach(input => {
      input.style.borderColor = '';
      if (!input.value.trim()) {
        input.style.borderColor = '#8B3A1A';
        valid = false;
      }
    });

    const emailInput = form.querySelector('[type="email"]');
    if (emailInput && emailInput.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      emailInput.style.borderColor = '#8B3A1A';
      valid = false;
      showToast('Please enter a valid email address.');
      return;
    }

    if (!valid) {
      showToast('Please fill in all required fields.');
      return;
    }

    // Success
    const btn = form.querySelector('.submit-btn');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#5C3317';
    btn.disabled = true;
    showToast('Thank you! We will be in touch soon.');
    setTimeout(() => {
      form.reset();
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  });
}

// ===== COUNTDOWN TIMER (Sale Page) =====
function initCountdown() {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);

  function update() {
    const now = new Date();
    const diff = endDate - now;
    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const els = document.querySelectorAll('.countdown-number');
    if (els.length < 4) return;
    els[0].textContent = String(days).padStart(2, '0');
    els[1].textContent = String(hours).padStart(2, '0');
    els[2].textContent = String(mins).padStart(2, '0');
    els[3].textContent = String(secs).padStart(2, '0');
  }

  if (document.querySelector('.countdown-number')) {
    update();
    setInterval(update, 1000);
  }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .testimonial-card, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// ===== ACTIVE NAV LINK =====
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  updateCartCount();
  renderCart();
  initFilterTabs();
  initContactForm();
  initCountdown();
  initScrollAnimations();
  setActiveNav();

  // Cart events
  document.querySelector('.cart-trigger')?.addEventListener('click', openCart);
  document.querySelector('.cart-close')?.addEventListener('click', closeCart);
  document.querySelector('.cart-overlay')?.addEventListener('click', closeCart);
});
