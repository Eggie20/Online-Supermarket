/**
 * Shopping Cart Page - Functionality
 * Handles cart display, updates, and checkout
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
    // Promo code button
    const applyPromoBtn = document.getElementById('applyPromoBtn');
    if (applyPromoBtn) {
      applyPromoBtn.addEventListener('click', () => this.applyPromoCode());
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.proceedToCheckout());
    }

    // Promo code input - allow Enter key
    const promoInput = document.getElementById('promoCode');
    if (promoInput) {
      promoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.applyPromoCode();
        }
      });
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
      });
    });
  }

  updateSummary() {
    const items = this.cart.getItems();
    const subtotal = this.cart.getTotal();
    const shipping = subtotal > 500 ? 0 : 50;
    const tax = subtotal * 0.12;
    const total = subtotal + shipping + tax;

    document.getElementById('subtotal').textContent = AppUtils.formatCurrency(subtotal);
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : AppUtils.formatCurrency(shipping);
    document.getElementById('tax').textContent = AppUtils.formatCurrency(tax);
    document.getElementById('total').textContent = AppUtils.formatCurrency(total);

    // Update checkout button state
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
      checkoutBtn.disabled = items.length === 0;
    }
  }

  applyPromoCode() {
    const code = document.getElementById('promoCode').value.toUpperCase().trim();
    
    if (!code) {
      AppUtils.toast.warning('Please enter a promo code');
      return;
    }

    const promoCodes = {
      'SAVE10': { discount: 0.10, label: '10% off' },
      'SAVE20': { discount: 0.20, label: '20% off' },
      'FREESHIP': { discount: 0, label: 'Free shipping' }
    };

    if (promoCodes[code]) {
      AppUtils.toast.success(`Promo code "${code}" applied! ${promoCodes[code].label}`);
      // In a real app, this would update the cart calculation
      document.getElementById('promoCode').disabled = true;
      document.getElementById('applyPromoBtn').disabled = true;
    } else {
      AppUtils.toast.error('Invalid promo code');
    }
  }

  proceedToCheckout() {
    const items = this.cart.getItems();
    
    if (items.length === 0) {
      AppUtils.toast.warning('Your cart is empty');
      return;
    }

    // Validate stock availability
    for (let item of items) {
      if (item.quantity > item.stock) {
        AppUtils.toast.error(`${item.name} has insufficient stock`);
        return;
      }
    }

    // Save checkout data
    const subtotal = this.cart.getTotal();
    const shipping = subtotal > 500 ? 0 : 50;
    const tax = subtotal * 0.12;
    const total = subtotal + shipping + tax;

    const checkoutData = {
      items: items,
      subtotal: subtotal,
      shipping: shipping,
      tax: tax,
      total: total,
      timestamp: new Date().toISOString(),
      orderId: 'ORD-' + Date.now()
    };

    AppUtils.setLocalStorage('checkout_data', checkoutData);

    // Show success message
    AppUtils.toast.success('Order placed successfully!');

    // Simulate order processing
    setTimeout(() => {
      // Clear cart after successful checkout
      this.cart.clearCart();
      
      // Show order confirmation
      alert(`Thank you for your order!\n\nOrder ID: ${checkoutData.orderId}\nTotal: ${AppUtils.formatCurrency(total)}\n\nThis is a demo - no payment processing.`);
      
      // Redirect to home
      window.location.href = 'index.html';
    }, 1500);
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
