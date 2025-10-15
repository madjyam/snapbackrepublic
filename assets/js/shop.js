(() => {
  const grid = document.getElementById('shop-grid');
  if (!grid) return;
  const products = window.SR.PRODUCTS;
  grid.innerHTML = products.map(p => `
    <a class="product-card" href="product.html?id=${p.id}">
      <div class="product-media"><img src="${p.image}" alt="${p.name}"></div>
      <div class="product-body">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-price">${window.SR.formatNaira(p.price)}</p>
        <div class="product-actions">
          <button type="button" class="btn btn-primary" data-add-cart="${p.id}">Add to Cart</button>
          <button type="button" class="btn" data-add-wish="${p.id}">Wishlist</button>
        </div>
      </div>
    </a>
  `).join('');
  window.SR.observeCards(grid);
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add-cart],[data-add-wish]');
    if (!btn) return;
    const id = Number(btn.getAttribute('data-add-cart') || btn.getAttribute('data-add-wish'));
    if (btn.hasAttribute('data-add-cart')) window.SR.addToCart(id, 1);
    else window.SR.addToWishlist(id);
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 300);
    e.preventDefault(); // prevent navigating when pressing action buttons
  });
})();

