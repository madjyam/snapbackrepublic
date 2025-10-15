// Navbar toggle
const navToggle = document.querySelector('.nav-toggle');
const navEl = document.querySelector('[data-nav]');
if (navToggle && navEl) {
  navToggle.addEventListener('click', () => {
    const isOpen = navEl.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Back to top
const toTop = document.getElementById('toTop');
if (toTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) toTop.classList.add('show');
    else toTop.classList.remove('show');
  });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Scroll reveal for product cards
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }
}, { threshold: 0.2 });

function observeCards(root = document) {
  root.querySelectorAll('.product-card').forEach(card => observer.observe(card));
}

// Currency formatter (Naira)
const formatNaira = (value) => `₦${value.toLocaleString('en-NG')}`;

// Storage helpers
const storage = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Global products definition (24 caps)
const PRODUCTS = Array.from({ length: 24 }, (_, i) => {
  const id = i + 1;
  const min = 15000, max = 20000;
  const price = Math.round((Math.random() * (max - min) + min) / 100) * 100;
  return {
    id,
    name: `Snapback ${id}`,
    price,
    image: `images/snapback${id}.jpeg`
  };
});

// Cart and Wishlist APIs
const CART_KEY = 'sr_cart';
const WISHLIST_KEY = 'sr_wishlist';

function getCart() { return storage.get(CART_KEY, []); }
function setCart(v) { storage.set(CART_KEY, v); }
function getWishlist() { return storage.get(WISHLIST_KEY, []); }
function setWishlist(v) { storage.set(WISHLIST_KEY, v); }

function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) item.qty += quantity; else cart.push({ id: productId, qty: quantity });
  setCart(cart);
}

function removeFromCart(productId) {
  setCart(getCart().filter(i => i.id !== productId));
}

function updateQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty = Math.max(1, qty);
    setCart(cart);
  }
}

function addToWishlist(productId) {
  const wl = new Set(getWishlist());
  wl.add(productId);
  setWishlist([...wl]);
}

function removeFromWishlist(productId) {
  setWishlist(getWishlist().filter(id => id !== productId));
}

// Expose helpers globally for page scripts
window.SR = {
  PRODUCTS,
  observeCards,
  formatNaira,
  addToCart,
  removeFromCart,
  updateQty,
  getCart,
  setCart,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  setWishlist
};

// Badges update
function updateBadges(){
  const cartCount = getCart().reduce((n,i)=>n+i.qty,0);
  const wishCount = getWishlist().length;
  document.querySelectorAll('#badge-cart').forEach(el=>el.textContent=String(cartCount));
  document.querySelectorAll('#badge-wishlist').forEach(el=>el.textContent=String(wishCount));
}
updateBadges();

// Patch add functions to also refresh badges
const _addToCart = addToCart; window.SR.addToCart = (id,q=1)=>{ _addToCart(id,q); updateBadges(); };
const _addToWishlist = addToWishlist; window.SR.addToWishlist = (id)=>{ _addToWishlist(id); updateBadges(); };
const _removeFromCart = removeFromCart; window.SR.removeFromCart = (id)=>{ _removeFromCart(id); updateBadges(); };
const _removeFromWishlist = removeFromWishlist; window.SR.removeFromWishlist = (id)=>{ _removeFromWishlist(id); updateBadges(); };
const _setCart = setCart; window.SR.setCart = (v)=>{ _setCart(v); updateBadges(); };

