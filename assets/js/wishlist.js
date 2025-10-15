(() => {
  const grid = document.getElementById('wishlist-grid');
  if (!grid) return;
  function render() {
    const ids = window.SR.getWishlist();
    if (!ids.length) { grid.innerHTML = '<p>No items in wishlist.</p>'; return; }
    const products = ids.map(id => window.SR.PRODUCTS.find(p => p.id === id)).filter(Boolean);
    grid.innerHTML = products.map(p => `
      <div class="product-card visible">
        <div class="product-media"><img src="${p.image}" alt="${p.name}"></div>
        <div class="product-body">
          <h3 class="product-name">${p.name}</h3>
          <p class="product-price">${window.SR.formatNaira(p.price)}</p>
          <div class="product-actions">
            <button class="btn btn-primary" data-move-cart="${p.id}">Move to Cart</button>
            <button class="btn" data-remove-wish="${p.id}">Remove</button>
          </div>
        </div>
      </div>
    `).join('');
  }
  render();
  grid.addEventListener('click', (e) => {
    const move = e.target.closest('[data-move-cart]');
    const remove = e.target.closest('[data-remove-wish]');
    if (move) {
      const id = Number(move.getAttribute('data-move-cart'));
      window.SR.addToCart(id, 1);
      window.SR.removeFromWishlist(id);
      render();
    } else if (remove) {
      const id = Number(remove.getAttribute('data-remove-wish'));
      window.SR.removeFromWishlist(id);
      render();
    }
  });
})();

