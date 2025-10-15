(() => {
  const params = new URLSearchParams(location.search);
  const id = Number(params.get('id')) || 1;
  const p = window.SR.PRODUCTS.find(x => x.id === id);
  const root = document.getElementById('product-detail');
  if (!root || !p) return;
  root.innerHTML = `
    <div style="display:grid;gap:20px;grid-template-columns:1fr;align-items:start">
      <div class="product-media" style="border-radius:16px;overflow:hidden"><img src="${p.image}" alt="${p.name}"></div>
      <div>
        <h1 class="page-title" style="margin-top:0">${p.name}</h1>
        <p class="product-price" style="font-size:20px">${window.SR.formatNaira(p.price)}</p>
        <p style="color:#cfcfcf">Premium snapback with structured crown, flat brim, and adjustable closure. Streetwear-grade materials for everyday style.</p>
        <div class="product-actions" style="margin-top:12px">
          <button class="btn btn-primary" id="addCart">Add to Cart</button>
          <button class="btn" id="addWish">Add to Wishlist</button>
        </div>
      </div>
    </div>`;

  document.getElementById('addCart')?.addEventListener('click', () => { window.SR.addToCart(p.id, 1); });
  document.getElementById('addWish')?.addEventListener('click', () => { window.SR.addToWishlist(p.id); });
})();

