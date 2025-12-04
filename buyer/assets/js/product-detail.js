/**
 * Product Detail Page - Functionality
 * Handles product display, quantity selection, and cart/wishlist operations
 */

class ProductDetailManager {
  constructor() {
    this.cart = window.cart;
    this.wishlist = window.wishlist;
    this.productId = this.getProductIdFromURL();
    this.product = null;
    this.init();
  }

  init() {
    this.renderProductDetail();
    this.setupEventListeners();
  }

  getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')) || 1;
  }

  getProduct() {
    return MOCK_PRODUCTS.find(p => p.id === this.productId);
  }

  setupEventListeners() {
    // Quantity decrease button
    const decreaseBtn = document.getElementById('decreaseBtn');
    if (decreaseBtn) {
      decreaseBtn.addEventListener('click', () => this.decreaseQuantity());
    }

    // Quantity increase button
    const increaseBtn = document.getElementById('increaseBtn');
    if (increaseBtn) {
      increaseBtn.addEventListener('click', () => this.increaseQuantity());
    }

    // Add to cart button
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => this.addProductToCart());
    }

    // Wishlist button
    const wishlistBtn = document.getElementById('wishlistBtn');
    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', () => this.toggleWishlist());
    }

    // Quantity input - allow direct input
    const quantityInput = document.getElementById('quantityInput');
    if (quantityInput) {
      quantityInput.addEventListener('change', (e) => {
        const value = parseInt(e.target.value);
        const max = parseInt(e.target.max);
        if (value > max) {
          e.target.value = max;
        } else if (value < 1) {
          e.target.value = 1;
        }
      });
    }
  }

  renderProductDetail() {
    this.product = this.getProduct();

    if (!this.product) {
      document.getElementById('productDetailContainer').innerHTML = `
        <div class="empty-state">
          <div style="font-size: 4rem; margin-bottom: var(--space-4);">❌</div>
          <h3 class="empty-state-title">Product not found</h3>
          <p class="empty-state-text">The product you're looking for doesn't exist</p>
          <a href="products.html" class="btn btn-primary">Back to Products</a>
        </div>
      `;
      return;
    }

    const isInWishlist = this.wishlist.hasItem(this.product.id);
    document.getElementById('breadcrumbProduct').textContent = this.product.name;

    document.getElementById('productDetailContainer').innerHTML = `
      <div class="grid grid-2" style="gap: var(--space-6);">
        <!-- Product Image -->
        <div class="animate-fadeIn">
          <div style="
            width: 100%;
            aspect-ratio: 1;
            background: var(--background);
            border-radius: var(--radius-lg);
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: var(--space-4);
          ">
            <img
              src="${this.product.image}"
              alt="${this.product.name}"
              style="width: 100%; height: 100%; object-fit: cover; cursor: zoom-in;"
              id="mainImage"
            />
          </div>

          <!-- Image Gallery -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-2);">
            <div style="
              aspect-ratio: 1;
              background: var(--background);
              border-radius: var(--radius-md);
              overflow: hidden;
              cursor: pointer;
              border: 2px solid var(--primary);
            ">
              <img src="${this.product.image}" alt="${this.product.name}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            ${[1, 2, 3].map(() => `
              <div style="
                aspect-ratio: 1;
                background: var(--background);
                border-radius: var(--radius-md);
                overflow: hidden;
                cursor: pointer;
                border: 2px solid var(--border);
              ">
                <img src="${this.product.image}" alt="${this.product.name}" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Product Info -->
        <div class="animate-fadeIn stagger-1">
          <!-- Category Badge -->
          <div style="margin-bottom: var(--space-3);">
            <span class="badge" style="background: var(--primary); color: white;">
              ${this.product.category}
            </span>
          </div>

          <!-- Title -->
          <h1 style="margin-bottom: var(--space-2);">${this.product.name}</h1>

          <!-- Rating -->
          <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-4);">
            <div style="color: #ffc107;">⭐ ${this.product.rating}</div>
            <span class="text-muted">(${this.product.reviews} reviews)</span>
          </div>

          <!-- Price -->
          <div style="margin-bottom: var(--space-4);">
            <div style="font-size: 2rem; font-weight: 700; color: var(--primary);">
              ${AppUtils.formatCurrency(this.product.price)}
            </div>
            <p class="text-muted">Price may vary by location</p>
          </div>

          <!-- Stock Status -->
          <div style="margin-bottom: var(--space-4);">
            <span class="stock-badge ${this.product.stock > 10 ? 'in-stock' : this.product.stock > 0 ? 'low-stock' : 'out-of-stock'}">
              ${this.product.stock > 10 ? '✓ In Stock' : this.product.stock > 0 ? '⚠ Low Stock (' + this.product.stock + ' left)' : '✗ Out of Stock'}
            </span>
          </div>

          <!-- Seller Info -->
          <div class="card" style="margin-bottom: var(--space-4);">
            <div class="card-body">
              <div style="display: flex; align-items: center; gap: var(--space-3);">
                <div style="
                  width: 50px;
                  height: 50px;
                  background: var(--gradient-primary);
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-weight: 700;
                ">
                  ${this.product.seller.charAt(0)}
                </div>
                <div>
                  <h4 style="margin-bottom: var(--space-1);">${this.product.seller}</h4>
                  <p class="text-muted">Verified Seller ✓</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quantity Selector -->
          <div style="margin-bottom: var(--space-4);">
            <label class="form-label">Quantity</label>
            <div style="display: flex; align-items: center; gap: var(--space-2);">
              <button class="btn btn-outline" id="decreaseBtn">−</button>
              <input
                type="number"
                id="quantityInput"
                class="form-input"
                value="1"
                min="1"
                max="${this.product.stock}"
                style="width: 80px; text-align: center;"
              />
              <button class="btn btn-outline" id="increaseBtn">+</button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="display: flex; gap: var(--space-3); margin-bottom: var(--space-4);">
            <button
              class="btn btn-primary btn-lg"
              style="flex: 1;"
              id="addToCartBtn"
              ${this.product.stock === 0 ? 'disabled' : ''}
            >
              🛒 Add to Cart
            </button>
            <button
              class="btn btn-outline btn-lg"
              id="wishlistBtn"
            >
              ${isInWishlist ? '❤️ Saved' : '🤍 Save'}
            </button>
          </div>

          <!-- Product Details -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Product Details</h3>
            </div>
            <div class="card-body">
              <div style="display: grid; gap: var(--space-3);">
                <div>
                  <strong>Category:</strong>
                  <p class="text-muted">${this.product.category}</p>
                </div>
                <div>
                  <strong>Seller:</strong>
                  <p class="text-muted">${this.product.seller}</p>
                </div>
                <div>
                  <strong>Stock Available:</strong>
                  <p class="text-muted">${this.product.stock} units</p>
                </div>
                <div>
                  <strong>Description:</strong>
                  <p class="text-muted">${this.product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.renderRelatedProducts();
    this.setupEventListeners();
  }

  renderRelatedProducts() {
    const related = MOCK_PRODUCTS
      .filter(p => p.category === this.product.category && p.id !== this.product.id)
      .slice(0, 4);

    const container = document.getElementById('relatedProductsContainer');
    container.innerHTML = related.map((product, index) => `
      <div class="product-card animate-fadeIn" style="animation-delay: ${index * 0.05}s;">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" />
          ${product.featured ? '<div class="product-badge featured">⭐ Featured</div>' : ''}
        </div>

        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-seller">${product.seller}</p>

          <div class="product-price">
            <span class="price">${AppUtils.formatCurrency(product.price)}</span>
          </div>

          <div class="product-stock">
            <span class="stock-badge ${product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock'}">
              ${product.stock > 10 ? '✓ In Stock' : product.stock > 0 ? '⚠ Low Stock' : '✗ Out of Stock'}
            </span>
          </div>

          <div class="product-actions">
            <button
              class="btn btn-primary btn-sm add-related-to-cart"
              style="flex: 1;"
              data-product-id="${product.id}"
              ${product.stock === 0 ? 'disabled' : ''}
            >
              Add to Cart
            </button>
          </div>

          <a href="product-detail.html?id=${product.id}" class="btn btn-ghost btn-sm btn-block" style="margin-top: var(--space-2);">
            View Details
          </a>
        </div>
      </div>
    `).join('');

    // Attach listeners to related product buttons
    document.querySelectorAll('.add-related-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.productId);
        const product = MOCK_PRODUCTS.find(p => p.id === productId);
        if (product) {
          this.cart.addItem(product, 1);
        }
      });
    });
  }

  increaseQuantity() {
    const input = document.getElementById('quantityInput');
    const max = parseInt(input.max);
    if (parseInt(input.value) < max) {
      input.value = parseInt(input.value) + 1;
    }
  }

  decreaseQuantity() {
    const input = document.getElementById('quantityInput');
    if (parseInt(input.value) > 1) {
      input.value = parseInt(input.value) - 1;
    }
  }

  addProductToCart() {
    if (!this.product || this.product.stock === 0) {
      AppUtils.toast.warning('This product is out of stock');
      return;
    }

    const quantity = parseInt(document.getElementById('quantityInput').value);
    this.cart.addItem(this.product, quantity);
  }

  toggleWishlist() {
    if (!this.product) return;

    const isAdded = this.wishlist.toggleItem(this.product);
    
    // Update button text
    const wishlistBtn = document.getElementById('wishlistBtn');
    if (wishlistBtn) {
      wishlistBtn.textContent = isAdded ? '❤️ Saved' : '🤍 Save';
    }
  }
}

// Initialize product detail page when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductDetailManager();
  
  // Update cart badge
  if (window.cart) {
    window.cart.updateCartBadge();
  }
});
