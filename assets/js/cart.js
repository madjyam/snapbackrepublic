(() => {
  const list = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('subtotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (!list) return;

  function render() {
    const cart = window.SR.getCart();
    if (!cart.length) { list.innerHTML = '<p>Your cart is empty.</p>'; subtotalEl.textContent = '₦0'; return; }
    list.innerHTML = cart.map(({ id, qty }) => {
      const p = window.SR.PRODUCTS.find(x => x.id === id);
      if (!p) return '';
      return `
      <div class="cart-item" data-id="${id}">
        <img src="${p.image}" alt="${p.name}">
        <div>
          <div style="font-weight:600">${p.name}</div>
          <div class="qty">
            <button data-dec>-</button>
            <span>${qty}</span>
            <button data-inc>+</button>
          </div>
        </div>
        <div>
          <div>${window.SR.formatNaira(p.price * qty)}</div>
          <button class="btn" data-remove>Remove</button>
        </div>
      </div>`;
    }).join('');
    const total = cart.reduce((sum, { id, qty }) => {
      const p = window.SR.PRODUCTS.find(x => x.id === id);
      return sum + (p ? p.price * qty : 0);
    }, 0);
    subtotalEl.textContent = window.SR.formatNaira(total);
  }

  render();

  list.addEventListener('click', (e) => {
    const itemEl = e.target.closest('.cart-item');
    if (!itemEl) return;
    const id = Number(itemEl.getAttribute('data-id'));
    if (e.target.matches('[data-inc]')) {
      const cart = window.SR.getCart();
      const item = cart.find(i => i.id === id);
      if (item) { item.qty += 1; window.SR.setCart(cart); render(); }
    } else if (e.target.matches('[data-dec]')) {
      const cart = window.SR.getCart();
      const item = cart.find(i => i.id === id);
      if (item) { item.qty = Math.max(1, item.qty - 1); window.SR.setCart(cart); render(); }
    } else if (e.target.matches('[data-remove]')) {
      window.SR.removeFromCart(id); render();
    }
  });

  // link goes to checkout.html now
})();

