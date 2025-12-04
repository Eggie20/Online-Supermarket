/**
 * Wishlist Page - Functionality
 * Handles wishlist display, updates, and interactions
 */

class WishlistPageManager {
  constructor() {
    this.wishlist = window.wishlist;
    this.cart = window.cart;
    this.init();
  }

  init() {
    this.renderWishlist();
    this.setupEventListeners();
    
    // Listen for wishlist updates from other pages
    window.addEventListener('wishlistUpdated', () => {
      this.renderWishlist();
    });

    // Listen for cart updates
    window.addEventListener('cartUpdated', () => {
      this.renderWishlist();
    });
  }

  setupEventListeners() {
    // Event listeners are attached dynamically in renderWishlist
  }

  renderWishlist() {
    const items = this.wishlist.getItems();
    const container = document.getElementById('wishlistContainer');
    const emptyState = document.getElementById('emptyWishlistState');

    if (items.length === 0) {
      container.style.display = 'none';
      emptyState.style.display = 'block';
      return;
    }

    container.style.display = 'block';
    emptyState.style.display = 'none';

    container.innerHTML = `
      <div class="products-grid">
        ${items.map((item, index) => {
          const isInCart = this.cart.hasItem(item.id);
          return `
            <div class="product-card animate-fadeIn" style="animation-delay: ${index * 0.05}s;">
              <div class="product-image">
                <img src="${item.image}" alt="${item.name}" />
                <div class="product-badge featured">❤️ Saved</div>
              </div>

              <div class="product-info">
                <h3 class="product-name">${item.name}</h3>
                <p class="product-seller">${item.seller}</p>

                <div class="product-price">
                  <span class="price">${AppUtils.formatCurrency(item.price)}</span>
                </div>

                <div class="product-stock">
                  <span class="stock-badge ${item.stock > 10 ? 'in-stock' : item.stock > 0 ? 'low-stock' : 'out-of-stock'}">
                    ${item.stock > 10 ? '✓ In Stock' : item.stock > 0 ? '⚠ Low Stock (' + item.stock + ')' : '✗ Out of Stock'}
                  </span>
                </div>

                <div class="product-actions" style="display: flex; gap: var(--space-2);">
                  <button
                    class="btn btn-primary btn-sm add-to-cart-btn"
                    style="flex: 1;"
                    data-product-id="${item.id}"
                    ${item.stock === 0 ? 'disabled' : ''}
                  >
                    ${isInCart ? '✓ In Cart' : 'Add to Cart'}
                  </button>
                  <button
                    class="btn btn-outline btn-sm remove-from-wishlist-btn"
                    data-product-id="${item.id}"
                    style="color: var(--danger);"
                  >
                    Remove
                  </button>
                </div>

                <a href="product-detail.html?id=${item.id}" class="btn btn-ghost btn-sm btn-block" style="margin-top: var(--space-2);">
                  View Details
                </a>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Attach event listeners to dynamically created buttons
    this.attachWishlistItemListeners();
  }

  attachWishlistItemListeners() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.productId);
        this.addToCartFromWishlist(productId);
      });
    });

    // Remove from wishlist buttons
    document.querySelectorAll('.remove-from-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.productId);
        this.removeFromWishlist(productId);
      });
    });
  }

  addToCartFromWishlist(productId) {
    const item = this.wishlist.getItems().find(i => i.id === productId);
    
    if (!item) {
      AppUtils.toast.error('Product not found');
      return;
    }

    if (item.stock === 0) {
      AppUtils.toast.warning('This item is out of stock');
      return;
    }

    // Add to cart
    this.cart.addItem(item, 1);
    
    // Re-render to update button state
    this.renderWishlist();
  }

  removeFromWishlist(productId) {
    const item = this.wishlist.getItems().find(i => i.id === productId);
    
    if (item) {
      this.wishlist.removeItem(productId);
      this.renderWishlist();
    }
  }
}

// Initialize wishlist page when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new WishlistPageManager();
  
  // Update cart badge
  if (window.cart) {
    window.cart.updateCartBadge();
  }
});
