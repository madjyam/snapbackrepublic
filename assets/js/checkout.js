(() => {
  const summary = document.getElementById('checkout-summary');
  const form = document.getElementById('checkout-form');
  if (summary) {
    const cart = window.SR.getCart();
    if (!cart.length) {
      summary.innerHTML = '<p>No items in cart.</p>';
    } else {
      const rows = cart.map(({id, qty}) => {
        const p = window.SR.PRODUCTS.find(x=>x.id===id);
        if (!p) return '';
        return `<div class="summary-row"><span>${p.name} × ${qty}</span><span>${window.SR.formatNaira(p.price*qty)}</span></div>`;
      }).join('');
      const total = cart.reduce((s,{id,qty})=>{
        const p = window.SR.PRODUCTS.find(x=>x.id===id); return s + (p? p.price*qty:0);
      },0);
      summary.innerHTML = rows + `<hr style="border-color:#1f1f1f"><div class="summary-row"><strong>Total</strong><strong>${window.SR.formatNaira(total)}</strong></div>`;
    }
  }
  form?.addEventListener('submit',(e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get('name')||'').trim();
    const email = String(fd.get('email')||'').trim();
    const receipt = fd.get('receipt');
    const emailOk = /.+@.+\..+/.test(email);
    if (name.length<2 || !emailOk || !receipt || (receipt instanceof File && receipt.size === 0)) {
      return alert('Please fill in all fields and attach the receipt.');
    }
    alert('Order placed! We will verify your transfer and contact you.');
    window.SR.setCart([]);
    location.href = 'index.html';
  });
})();

