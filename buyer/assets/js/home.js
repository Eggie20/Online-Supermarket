/**
 * Homepage JavaScript
 * Loads featured products, categories, and sellers
 */

document.addEventListener('DOMContentLoaded', () => {
  loadFeaturedProducts();
  loadCategories();
  loadSellers();
  initSearch();
  
  // Re-initialize scroll animations after content is loaded
  // This ensures dynamically added elements are checked for visibility
  setTimeout(() => {
    if (typeof initScrollAnimations === 'function') {
      initScrollAnimations();
    }
  }, 100);
});

/**
 * Load featured products
 */
function loadFeaturedProducts() {
  const container = document.getElementById('featuredProducts');
  if (!container) return;
  
  const featuredProducts = getFeaturedProducts().slice(0, 8);
  
  container.innerHTML = featuredProducts.map(product => `
    <div class="product-card scroll-fade-in">
      <div class="product-image image-zoom">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/img/placeholder.jpg'">
        ${product.stock < 20 ? '<span class="product-badge" style="background: var(--warning);">Low Stock</span>' : ''}
        ${product.stock === 0 ? '<span class="product-badge">Out of Stock</span>' : ''}
        <button 
          class="product-wishlist ${wishlist.hasItem(product.id) ? 'active' : ''}" 
          onclick="toggleWishlist(${product.id})"
          aria-label="Add to wishlist"
        >
          ${wishlist.hasItem(product.id) ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="product-info">
        <div class="product-seller">${product.seller}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">${AppUtils.formatCurrency(product.price)}</div>
        <div class="product-stock">
          <span class="stock-indicator ${getStockClass(product.stock)}"></span>
          <span>${getStockText(product.stock)}</span>
        </div>
        <div class="product-actions">
          <button 
            class="btn btn-primary btn-sm btn-block" 
            onclick="addToCart(${product.id})"
            ${product.stock === 0 ? 'disabled' : ''}
          >
            ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
          <a href="product-detail.html?id=${product.id}" class="btn btn-outline btn-sm btn-block">
            View Details
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Load categories
 */
function loadCategories() {
  const container = document.getElementById('categoriesGrid');
  if (!container) return;
  
  container.innerHTML = CATEGORIES.map((category, index) => `
    <a 
      href="products.html?category=${encodeURIComponent(category.name)}" 
      class="card hover-lift text-center scroll-fade-in stagger-${(index % 6) + 1}"
      style="text-decoration: none; cursor: pointer;"
    >
      <div class="card-body">
        <div style="font-size: 3rem; margin-bottom: var(--space-3);">${category.icon}</div>
        <h3 class="card-title" style="margin-bottom: var(--space-2);">${category.name}</h3>
        <p class="text-muted">${category.count} products</p>
      </div>
    </a>
  `).join('');
}

/**
 * Load sellers
 */
function loadSellers() {
  const container = document.getElementById('sellersGrid');
  if (!container) return;
  
  const topSellers = SELLERS.slice(0, 3);
  
  container.innerHTML = topSellers.map((seller, index) => `
    <div class="card scroll-fade-in stagger-${index + 1}">
      <div class="card-body">
        <div class="d-flex align-center gap-3 mb-4">
          <div class="avatar avatar-lg" style="background: var(--gradient-primary);">
            ${seller.name.charAt(0)}
          </div>
          <div style="flex: 1;">
            <h3 class="card-title" style="margin-bottom: var(--space-1);">
              ${seller.name}
              ${seller.verified ? '<span style="color: var(--primary); margin-left: var(--space-2);">✓</span>' : ''}
            </h3>
            <p class="text-muted" style="margin: 0; font-size: var(--text-sm);">
              📍 ${seller.location}
            </p>
          </div>
        </div>
        
        <div class="d-flex align-center justify-between mb-4">
          <div>
            <div class="text-muted" style="font-size: var(--text-sm);">Rating</div>
            <div class="font-semibold" style="color: var(--warning);">
              ⭐ ${seller.rating.toFixed(1)}
            </div>
          </div>
          <div>
            <div class="text-muted" style="font-size: var(--text-sm);">Products</div>
            <div class="font-semibold">${seller.productsCount}</div>
          </div>
        </div>
        
        <div class="d-flex gap-2">
          <a href="products.html?seller=${encodeURIComponent(seller.name)}" class="btn btn-primary btn-sm btn-block">
            View Products
          </a>
          <a href="tel:${seller.contact}" class="btn btn-outline btn-sm btn-icon">
            📞
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Initialize search functionality
 */
function initSearch() {
  const searchInput = document.getElementById('headerSearch');
  if (!searchInput) return;
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
      }
    }
  });
}

/**
 * Add product to cart
 */
function addToCart(productId) {
  const product = getProductById(productId);
  if (product && product.stock > 0) {
    cart.addItem(product);
  }
}

/**
 * Toggle wishlist
 */
function toggleWishlist(productId) {
  const product = getProductById(productId);
  if (product) {
    const isAdded = wishlist.toggleItem(product);
    
    // Update UI
    const buttons = document.querySelectorAll(`[onclick="toggleWishlist(${productId})"]`);
    buttons.forEach(btn => {
      btn.textContent = isAdded ? '❤️' : '🤍';
      btn.classList.toggle('active', isAdded);
    });
  }
}

/**
 * Get stock status class
 */
function getStockClass(stock) {
  if (stock === 0) return 'out-of-stock';
  if (stock < 20) return 'low-stock';
  return 'in-stock';
}

/**
 * Get stock status text
 */
function getStockText(stock) {
  if (stock === 0) return 'Out of Stock';
  if (stock < 20) return `Only ${stock} left`;
  return 'In Stock';
}
