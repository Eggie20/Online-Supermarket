/**
 * Cart Page - Functionality
 * Handles cart display and management (view only, no checkout)
 */

class CartPageManager {
  constructor() {
    this.cart = window.cart;
    this.init();
  }

  init() {
    this.renderCart();
    this.setupEventListeners();
    this.updateSummary();
    
    // Listen for cart updates from other pages
    window.addEventListener('cartUpdated', () => {
      this.renderCart();
      this.updateSummary();
    });
  }

  setupEventListeners() {
    // Clear cart button
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', () => this.clearCart());
    }
  }

  renderCart() {
    const items = this.cart.getItems();
    const container = document.getElementById('cartItemsContainer');
    const emptyState = document.getElementById('emptyCartState');

    if (items.length === 0) {
      container.style.display = 'none';
      emptyState.style.display = 'block';
      return;
    }

    container.style.display = 'block';
    emptyState.style.display = 'none';

    container.innerHTML = items.map((item, index) => `
      <div class="card animate-fadeIn" style="margin-bottom: var(--space-4);">
        <div class="card-body">
          <div style="display: grid; grid-template-columns: 100px 1fr auto; gap: var(--space-4); align-items: start;">
            <!-- Product Image -->
            <div style="
              width: 100px;
              height: 100px;
              background: var(--background);
              border-radius: var(--radius-md);
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <img
                src="${item.image}"
                alt="${item.name}"
                style="width: 100%; height: 100%; object-fit: cover;"
              />
            </div>

            <!-- Product Info -->
            <div>
              <h4 style="margin-bottom: var(--space-1);">
                <a href="product-detail.html?id=${item.id}" style="color: var(--text-dark); text-decoration: none;">
                  ${item.name}
                </a>
              </h4>
              <p class="text-muted" style="margin-bottom: var(--space-2);">
                ${item.seller}
              </p>
              <p style="font-weight: 600; color: var(--primary);">
                ${AppUtils.formatCurrency(item.price)}
              </p>
            </div>

            <!-- Quantity & Actions -->
            <div style="text-align: right;">
              <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-3); justify-content: flex-end;">
                <button
                  class="btn btn-sm btn-outline quantity-decrease"
                  data-product-id="${item.id}"
                  ${item.quantity <= 1 ? 'disabled' : ''}
                >
                  −
                </button>
                <span style="min-width: 30px; text-align: center; font-weight: 600;">${item.quantity}</span>
                <button
                  class="btn btn-sm btn-outline quantity-increase"
                  data-product-id="${item.id}"
                  ${item.quantity >= item.stock ? 'disabled' : ''}
                >
                  +
                </button>
              </div>
              <p style="font-weight: 600; margin-bottom: var(--space-2);">
                ${AppUtils.formatCurrency(item.price * item.quantity)}
              </p>
              <button
                class="btn btn-sm btn-outline remove-item"
                data-product-id="${item.id}"
                style="color: var(--danger);"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Attach event listeners to dynamically created buttons
    this.attachCartItemListeners();
  }

  attachCartItemListeners() {
    // Quantity decrease buttons
    document.querySelectorAll('.quantity-decrease').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.productId);
        const item = this.cart.getItem(productId);
        if (item) {
          this.cart.updateQuantity(productId, item.quantity - 1);
          this.renderCart();
          this.updateSummary();
        }
      });
    });

    // Quantity increase buttons
    document.querySelectorAll('.quantity-increase').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.productId);
        const item = this.cart.getItem(productId);
        if (item) {
          this.cart.updateQuantity(productId, item.quantity + 1);
          this.renderCart();
          this.updateSummary();
        }
      });
    });

    // Remove item buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.productId);
        this.cart.removeItem(productId);
        this.renderCart();
        this.updateSummary();
        AppUtils.toast.info('Item removed from cart');
      });
    });
  }

  updateSummary() {
    const items = this.cart.getItems();
    const subtotal = this.cart.getTotal();
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById('totalItems').textContent = totalItems;
    document.getElementById('subtotal').textContent = AppUtils.formatCurrency(subtotal);
    document.getElementById('total').textContent = AppUtils.formatCurrency(subtotal);

    // Update clear cart button state
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
      clearCartBtn.disabled = items.length === 0;
    }
  }

  clearCart() {
    if (this.cart.getItems().length === 0) {
      AppUtils.toast.warning('Your cart is already empty');
      return;
    }

    if (confirm('Are you sure you want to clear all items from your cart?')) {
      this.cart.clearCart();
      this.renderCart();
      this.updateSummary();
      AppUtils.toast.success('Cart cleared successfully');
    }
  }
}

// Initialize cart page when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CartPageManager();
  
  // Update cart badge
  if (window.cart) {
    window.cart.updateCartBadge();
  }
});
