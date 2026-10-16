// ... código dos produtos e categorias mantidos igual ...

// Função do Carrinho corrigida
function updateCartUI() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  // Cálculo corrigido
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  $("cartCount").textContent = count;
  $("cartDrawerCount").textContent = count;
  $("cartSubtotal").textContent = formatBRL(subtotal);

  if (!cart.length) {
    $("cartItemsContainer").innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-bag-shopping text-3xl text-brand-300 mb-3"></i>
        <p>Seu carrinho está vazio.</p>
        <p class="mt-1">Adicione produtos para começar.</p>
      </div>
    `;
    return;
  }

  $("cartItemsContainer").innerHTML = cart.map(item => `
    <div class="cart-row">
      <div class="cart-thumb">${getProductSvg(item.type)}</div>
      <div>
        <div class="cart-product-name">${item.name}</div>
        <div class="cart-product-price">${formatBRL(item.price)}</div>
        <div class="quantity-controls">
          <button data-qty="${item.id}" data-delta="-1" aria-label="Diminuir">−</button>
          <span class="text-xs">${item.quantity}</span>
          <button data-qty="${item.id}" data-delta="1" aria-label="Aumentar">+</button>
        </div>
      </div>
      <button class="remove-item" data-remove="${item.id}" aria-label="Remover produto">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `).join("");

  $("cartItemsContainer").querySelectorAll("[data-qty]").forEach(button => {
    button.addEventListener("click", () => {
      updateQuantity(Number(button.dataset.qty), Number(button.dataset.delta));
    });
  });

  $("cartItemsContainer").querySelectorAll("[data-remove]").forEach(button => {
    button.addEventListener("click", () => {
      removeFromCart(Number(button.dataset.remove));
    });
  });
}

// Botão de perfil redirecionando para login caso deseje deslogar ou acessar conta
document.addEventListener("DOMContentLoaded", () => {
  // ... restanto da inicialização mantida ...

  $("profileBtn").addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
