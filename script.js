
const productsData = [
  {id:1,name:"Sabonete Íntimo Suave",category:"Higiene Íntima",categoryId:"higiene",description:"Limpeza delicada para o cuidado diário.",price:24.90,type:"bottle",volume:"200ml"},
  {id:2,name:"Esfoliante Corporal",category:"Corpo e Banho",categoryId:"corpo",description:"Remove células mortas e deixa a pele macia.",price:32.90,type:"tube",volume:"150g"},
  {id:3,name:"Hidratante Facial",category:"Cuidados com a Pele",categoryId:"pele",description:"Hidrata e proporciona toque macio à pele.",price:39.90,type:"jar",volume:"50g"},
  {id:4,name:"Desodorante Antitranspirante",category:"Desodorantes",categoryId:"desodorante",description:"Proteção e frescor com fragrância suave.",price:16.90,type:"rollon",volume:"50ml"},
  {id:5,name:"Body Splash",category:"Corpo e Banho",categoryId:"corpo",description:"Fragrância leve para acompanhar seu dia.",price:29.90,type:"spray",volume:"150ml"},
  {id:6,name:"Shampoo Hidratante",category:"Cabelos",categoryId:"cabelos",description:"Limpa suavemente e realça o brilho dos fios.",price:32.90,type:"bottle",volume:"300ml"},
  {id:7,name:"Condicionador Reparador",category:"Cabelos",categoryId:"cabelos",description:"Desembaraça e deixa os fios macios.",price:34.90,type:"tube",volume:"250ml"},
  {id:8,name:"Máscara Capilar Nutritiva",category:"Cabelos",categoryId:"cabelos",description:"Tratamento para cabelos mais macios e saudáveis.",price:42.90,type:"jar",volume:"200g"},
  {id:9,name:"Sérum Capilar",category:"Cabelos",categoryId:"cabelos",description:"Ajuda a controlar o frizz e dar brilho.",price:36.90,type:"dropper",volume:"30ml"},
  {id:10,name:"Hidratante Corporal",category:"Corpo e Banho",categoryId:"corpo",description:"Nutre e deixa a pele macia e perfumada.",price:27.90,type:"bottle",volume:"250ml"},
  {id:11,name:"Lenços Íntimos",category:"Higiene Íntima",categoryId:"higiene",description:"Praticidade para a rotina diária.",price:12.90,type:"pouch",volume:"20 un"},
  {id:12,name:"Aparelho Depilatório",category:"Acessórios",categoryId:"acessorios",description:"Acessório prático para a rotina de cuidados.",price:19.90,type:"razor",volume:"1 un"},
  {id:13,name:"Algodão de Limpeza Facial",category:"Cuidados com a Pele",categoryId:"pele",description:"Maciez para a rotina de limpeza facial.",price:14.90,type:"pouch",volume:"80 un"},
  {id:14,name:"Hastes Flexíveis",category:"Acessórios",categoryId:"acessorios",description:"Hastes com pontas macias para o dia a dia.",price:9.90,type:"box",volume:"75 un"},
  {id:15,name:"Kit de Scrunchies",category:"Acessórios",categoryId:"acessorios",description:"Acessórios práticos para diferentes penteados.",price:14.90,type:"scrunchies",volume:"3 un"}
];

const categoriesData = [
  {id:"all",name:"Todos",icon:"fa-border-all"},
  {id:"higiene",name:"Higiene Íntima",icon:"fa-spa"},
  {id:"cabelos",name:"Cabelos",icon:"fa-pump-soap"},
  {id:"pele",name:"Cuidados com a Pele",icon:"fa-face-smile-beam"},
  {id:"desodorante",name:"Desodorantes",icon:"fa-spray-can"},
  {id:"corpo",name:"Corpo e Banho",icon:"fa-shower"},
  {id:"maquiagem",name:"Maquiagem",icon:"fa-wand-magic-sparkles"},
  {id:"acessorios",name:"Acessórios",icon:"fa-scissors"},
  {id:"kits",name:"Kits e Presentes",icon:"fa-gift"}
];

let cart = [];
let wishlist = [];
let currentCategory = "all";
let searchQuery = "";
let showingFavorites = false;
let toastTimer;

const $ = id => document.getElementById(id);

const formatBRL = value =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

// Ilustrações dos produtos
function getProductSvg(type) {
  const start = '<svg viewBox="0 0 200 200" aria-hidden="true">';
  const shadow = '<ellipse cx="100" cy="175" rx="42" ry="8" fill="#f8a5b5" opacity=".3"/>';
  const label = '<text x="100" y="120" font-family="serif" font-size="15" font-weight="bold" fill="#e63973" text-anchor="middle">cicly</text>';

  let shape = "";

  switch (type) {
    case "bottle":
      shape = `
        <rect x="70" y="65" width="60" height="100" rx="18" fill="#fff" stroke="#f3718e" stroke-width="2"/>
        <rect x="85" y="45" width="30" height="20" rx="4" fill="#ffe5ec" stroke="#f3718e"/>
        <path d="M100 45 V30 H85" stroke="#e63973" stroke-width="4" fill="none"/>
      `;
      break;

    case "tube":
      shape = `
        <path d="M65 50 H135 L125 150 H75 Z" fill="#ffe5ec" stroke="#f3718e" stroke-width="2"/>
        <rect x="75" y="150" width="50" height="20" rx="5" fill="#fff" stroke="#f3718e"/>
        <line x1="65" y1="50" x2="135" y2="50" stroke="#e63973" stroke-width="4"/>
      `;
      break;

    case "jar":
      shape = `
        <rect x="55" y="90" width="90" height="65" rx="15" fill="#fff" stroke="#f3718e" stroke-width="2"/>
        <rect x="52" y="72" width="96" height="22" rx="8" fill="#ffc2d1" stroke="#f3718e" stroke-width="2"/>
      `;
      break;

    case "dropper":
      shape = `
        <rect x="70" y="80" width="60" height="80" rx="15" fill="#fff" stroke="#f3718e" stroke-width="2"/>
        <rect x="82" y="60" width="36" height="20" fill="#ffe5ec" stroke="#f3718e"/>
        <path d="M100 60 V35 C92 35 92 20 100 20 C108 20 108 35 100 35Z" fill="#e63973"/>
      `;
      break;

    case "spray":
    case "rollon":
      shape = `
        <rect x="72" y="70" width="56" height="95" rx="18" fill="#ffe5ec" stroke="#f3718e" stroke-width="2"/>
        <rect x="80" y="40" width="40" height="30" rx="8" fill="#fff" stroke="#f3718e"/>
      `;
      break;

    case "pouch":
      shape = `
        <rect x="50" y="75" width="100" height="70" rx="12" fill="#ffe5ec" stroke="#f3718e" stroke-width="2"/>
        <ellipse cx="100" cy="110" rx="25" ry="15" fill="#fff" stroke="#f3718e"/>
      `;
      break;

    case "razor":
      shape = `
        <path d="M70 50 H130 L120 70 H80Z" fill="#f3718e"/>
        <rect x="94" y="70" width="12" height="90" rx="6" fill="#ffc2d1" stroke="#f3718e"/>
      `;
      break;

    case "box":
      shape = `
        <rect x="60" y="70" width="80" height="85" rx="10" fill="#fff" stroke="#f3718e" stroke-width="2"/>
        <rect x="65" y="80" width="70" height="25" rx="5" fill="#ffe5ec"/>
      `;
      break;

    case "scrunchies":
      return `
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="85" cy="95" r="35" fill="none" stroke="#ffc2d1" stroke-width="16" stroke-dasharray="10 5"/>
          <circle cx="115" cy="115" r="35" fill="none" stroke="#f3718e" stroke-width="16" stroke-dasharray="12 6"/>
        </svg>
      `;

    default:
      shape = '<rect x="60" y="60" width="80" height="90" rx="15" fill="#ffe5ec" stroke="#f3718e" stroke-width="2"/>';
  }

  return start + shadow + shape + label + "</svg>";
}

// Notificações
function showToast(message, icon = "fa-circle-check") {
  $("toastMsg").textContent = message;
  $("toastIcon").className = `fa-solid ${icon}`;

  $("toast").classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    $("toast").classList.remove("show");
  }, 2600);
}

// Categorias
function renderCategories() {
  $("categoriesRow").innerHTML = categoriesData.map(cat => `
    <button
      class="category-button ${currentCategory === cat.id && !showingFavorites ? "active" : ""}"
      data-category="${cat.id}"
    >
      <span class="category-circle">
        <i class="fa-solid ${cat.icon} text-lg"></i>
      </span>
      <span class="category-label">${cat.name}</span>
    </button>
  `).join("");

  $("categoriesRow").querySelectorAll("[data-category]").forEach(button => {
    button.addEventListener("click", () => {
      currentCategory = button.dataset.category;
      showingFavorites = false;
      renderCategories();
      renderProducts();
    });
  });
}

// Catálogo
function renderProducts() {
  const grid = $("productsGrid");

  const filtered = productsData.filter(product => {
    const matchesCategory =
      currentCategory === "all" ||
      product.categoryId === currentCategory;

    const matchesSearch = [
      product.name,
      product.description,
      product.category
    ].some(value =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const matchesFavorites =
      !showingFavorites || wishlist.includes(product.id);

    return matchesCategory && matchesSearch && matchesFavorites;
  });

  const category = categoriesData.find(
    item => item.id === currentCategory
  );

  if (showingFavorites) {
    $("activeCategoryText").textContent =
      `Seus favoritos (${filtered.length})`;
  } else if (currentCategory === "all") {
    $("activeCategoryText").textContent =
      `Exibindo todos os ${filtered.length} produtos`;
  } else {
    $("activeCategoryText").textContent =
      `Categoria: ${category.name} (${filtered.length})`;
  }

  $("emptyCatalog").classList.toggle("hidden", filtered.length > 0);

  grid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-image" data-view="${product.id}">
        <div class="w-full h-full">
          ${getProductSvg(product.type)}
        </div>

        <button
          class="wishlist-button ${wishlist.includes(product.id) ? "active" : ""}"
          data-wish="${product.id}"
          aria-label="Favoritar ${product.name}"
        >
          <i class="${wishlist.includes(product.id) ? "fa-solid" : "fa-regular"} fa-heart text-xs"></i>
        </button>
      </div>

      <div class="product-info">
        <div>
          <h3 class="product-name" data-view="${product.id}">
            ${product.name}
          </h3>
          <p class="product-description">${product.description}</p>
        </div>

        <div class="product-bottom">
          <div class="product-price">${formatBRL(product.price)}</div>
          <button class="add-cart" data-add="${product.id}">
            <i class="fa-solid fa-cart-shopping"></i>
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-view]").forEach(element => {
    element.addEventListener("click", () => {
      openQuickView(Number(element.dataset.view));
    });
  });

  grid.querySelectorAll("[data-wish]").forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();
      toggleWishlist(Number(button.dataset.wish));
    });
  });

  grid.querySelectorAll("[data-add]").forEach(button => {
    button.addEventListener("click", () => {
      addToCart(Number(button.dataset.add));
    });
  });
}

// Pesquisa e filtros
function filterSearch(value) {
  searchQuery = value;
  showingFavorites = false;
  renderCategories();
  renderProducts();
}

function resetFilters() {
  currentCategory = "all";
  searchQuery = "";
  showingFavorites = false;

  $("searchInput").value = "";
  $("searchInputMobile").value = "";

  renderCategories();
  renderProducts();
}

// Favoritos
function toggleWishlist(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(item => item !== id);
    showToast("Removido dos favoritos.");
  } else {
    wishlist.push(id);
    showToast("Adicionado aos seus favoritos!");
  }

  updateWishlistBadge();
  renderCategories();
  renderProducts();
}

function updateWishlistBadge() {
  $("wishlistCount").textContent = wishlist.length;
  $("wishlistCount").classList.toggle("hidden", wishlist.length === 0);
}

// Carrinho
function addToCart(id) {
  const product = productsData.find(item => item.id === id);
  const item = cart.find(item => item.id === id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }

  updateCartUI();
  showToast(`${product.name} adicionado ao carrinho!`);
}

function updateQuantity(id, delta) {
  const item = cart.find(product => product.id === id);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    cart = cart.filter(product => product.id !== id);
  }

  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(product => product.id !== id);
  updateCartUI();
  showToast("Produto removido do carrinho.");
}

function updateCartUI() {
  const count = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

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
      updateQuantity(
        Number(button.dataset.qty),
        Number(button.dataset.delta)
      );
    });
  });

  $("cartItemsContainer").querySelectorAll("[data-remove]").forEach(button => {
    button.addEventListener("click", () => {
      removeFromCart(Number(button.dataset.remove));
    });
  });
}

function openCart() {
  $("cartOverlay").classList.remove("hidden");
  requestAnimationFrame(() => $("cartOverlay").classList.add("open"));
  document.body.classList.add("overflow-hidden");
}

function closeCart() {
  $("cartOverlay").classList.remove("open");

  setTimeout(() => {
    $("cartOverlay").classList.add("hidden");
  }, 300);

  document.body.classList.remove("overflow-hidden");
}

// Visualização rápida
function openQuickView(id) {
  const product = productsData.find(item => item.id === id);
  if (!product) return;

  $("quickViewBody").innerHTML = `
    <div class="quick-art">${getProductSvg(product.type)}</div>

    <div class="quick-details">
      <span class="text-xs uppercase tracking-widest text-brand-600">
        ${product.category}
      </span>

      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p class="text-xs text-gray-500">Conteúdo: ${product.volume}</p>

      <div class="quick-price">${formatBRL(product.price)}</div>

      <button class="primary-button w-full" id="quickAddBtn">
        <i class="fa-solid fa-cart-shopping"></i>
        Adicionar ao carrinho
      </button>

      <button class="text-sm text-brand-600" id="quickWishBtn">
        <i class="${wishlist.includes(id) ? "fa-solid" : "fa-regular"} fa-heart mr-1"></i>
        ${wishlist.includes(id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      </button>
    </div>
  `;

  $("quickAddBtn").addEventListener("click", () => {
    addToCart(id);
    closeQuickView();
    openCart();
  });

  $("quickWishBtn").addEventListener("click", () => {
    toggleWishlist(id);
    openQuickView(id);
  });

  $("quickViewModal").classList.remove("hidden");
  requestAnimationFrame(() => {
    $("quickViewModal").classList.add("open");
  });

  document.body.classList.add("overflow-hidden");
}

function closeQuickView() {
  $("quickViewModal").classList.remove("open");

  setTimeout(() => {
    $("quickViewModal").classList.add("hidden");
  }, 250);

  document.body.classList.remove("overflow-hidden");
}

// Finalização demonstrativa do pedido
function checkout() {
  if (!cart.length) {
    showToast("Seu carrinho está vazio.", "fa-circle-exclamation");
    return;
  }

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  const lines = cart.map(item =>
    `${item.quantity}x ${item.name} — ${formatBRL(item.price * item.quantity)}`
  ).join("\n");

  alert(
    `Resumo do pedido Cicly\n\n${lines}\n\n` +
    `Subtotal: ${formatBRL(subtotal)}\n` +
    `${subtotal >= 149 ? "Frete grátis!" : "Frete calculado na próxima etapa."}\n\n` +
    "Esta é uma demonstração. O pagamento ainda não está integrado."
  );
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderProducts();
  updateCartUI();
  updateWishlistBadge();

  $("searchInput").addEventListener("input", event => {
    $("searchInputMobile").value = event.target.value;
    filterSearch(event.target.value);
  });

  $("searchInputMobile").addEventListener("input", event => {
    $("searchInput").value = event.target.value;
    filterSearch(event.target.value);
  });

  $("resetCategoryFilter").addEventListener("click", resetFilters);
  $("resetEmptyBtn").addEventListener("click", resetFilters);

  $("openCartBtn").addEventListener("click", openCart);
  $("closeCartBtn").addEventListener("click", closeCart);

  $("cartOverlay").addEventListener("click", event => {
    if (event.target === $("cartOverlay")) closeCart();
  });

  $("closeQuickView").addEventListener("click", closeQuickView);

  $("quickViewModal").addEventListener("click", event => {
    if (event.target === $("quickViewModal")) closeQuickView();
  });

  $("wishlistHeaderBtn").addEventListener("click", () => {
    showingFavorites = !showingFavorites;
    currentCategory = "all";
    searchQuery = "";

    $("searchInput").value = "";
    $("searchInputMobile").value = "";

    renderCategories();
    renderProducts();

    $("produtos").scrollIntoView({behavior: "smooth"});

    showToast(
      showingFavorites ? "Exibindo seus favoritos" : "Exibindo todos os produtos"
    );
  });

  $("checkoutBtn").addEventListener("click", checkout);

  $("profileBtn").addEventListener("click", () => {
    showToast("Área de perfil ainda não conectada.", "fa-circle-info");
  });

  $("newsletterForm").addEventListener("submit", event => {
    event.preventDefault();
    showToast("Inscrição registrada nesta demonstração!");
    $("newsletterForm").reset();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeCart();
      closeQuickView();
    }
  });
});
