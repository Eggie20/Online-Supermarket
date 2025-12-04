/**
 * Shopping Cart Management
 * Handles cart operations using localStorage
 */

class ShoppingCart {
  constructor() {
    this.storageKey = 'shopping_cart';
    this.cart = this.loadCart();
    this.updateCartBadge();
  }

  /**
   * Load cart from localStorage
   */
  loadCart() {
    return AppUtils.getLocalStorage(this.storageKey, []);
  }

  /**
   * Save cart to localStorage
   */
  saveCart() {
    AppUtils.setLocalStorage(this.storageKey, this.cart);
    this.updateCartBadge();
    this.dispatchCartUpdate();
  }

  /**
   * Add item to cart
   */
  addItem(product, quantity = 1) {
    const existingItem = this.cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
      AppUtils.toast.success(`Updated ${product.name} quantity in cart`);
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        seller: product.seller,
        stock: product.stock,
        quantity: quantity
      });
      AppUtils.toast.success(`${product.name} added to cart`);
    }
    
    this.saveCart();
  }

  /**
   * Remove item from cart
   */
  removeItem(productId) {
    const item = this.cart.find(item => item.id === productId);
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
    
    if (item) {
      AppUtils.toast.info(`${item.name} removed from cart`);
    }
  }

  /**
   * Update item quantity
   */
  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else if (quantity > item.stock) {
        AppUtils.toast.warning(`Only ${item.stock} items available in stock`);
        item.quantity = item.stock;
      } else {
        item.quantity = quantity;
      }
      this.saveCart();
    }
  }

  /**
   * Get cart items
   */
  getItems() {
    return this.cart;
  }

  /**
   * Get cart item count
   */
  getItemCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Get cart total
   */
  getTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  /**
   * Clear cart
   */
  clearCart() {
    this.cart = [];
    this.saveCart();
    AppUtils.toast.info('Cart cleared');
  }

  /**
   * Check if product is in cart
   */
  hasItem(productId) {
    return this.cart.some(item => item.id === productId);
  }

  /**
   * Get specific item from cart
   */
  getItem(productId) {
    return this.cart.find(item => item.id === productId);
  }

  /**
   * Update cart badge in navigation
   */
  updateCartBadge() {
    const badge = document.querySelector('.navbar-badge');
    const count = this.getItemCount();
    
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  /**
   * Dispatch custom event when cart updates
   */
  dispatchCartUpdate() {
    const event = new CustomEvent('cartUpdated', {
      detail: {
        items: this.cart,
        count: this.getItemCount(),
        total: this.getTotal()
      }
    });
    window.dispatchEvent(event);
  }
}

// ===================================
// WISHLIST MANAGEMENT
// ===================================

class Wishlist {
  constructor() {
    this.storageKey = 'wishlist';
    this.wishlist = this.loadWishlist();
  }

  /**
   * Load wishlist from localStorage
   */
  loadWishlist() {
    return AppUtils.getLocalStorage(this.storageKey, []);
  }

  /**
   * Save wishlist to localStorage
   */
  saveWishlist() {
    AppUtils.setLocalStorage(this.storageKey, this.wishlist);
    this.dispatchWishlistUpdate();
  }

  /**
   * Add item to wishlist
   */
  addItem(product) {
    if (!this.hasItem(product.id)) {
      this.wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        seller: product.seller,
        stock: product.stock,
        addedAt: new Date().toISOString()
      });
      this.saveWishlist();
      AppUtils.toast.success(`${product.name} added to wishlist`);
      return true;
    }
    return false;
  }

  /**
   * Remove item from wishlist
   */
  removeItem(productId) {
    const item = this.wishlist.find(item => item.id === productId);
    this.wishlist = this.wishlist.filter(item => item.id !== productId);
    this.saveWishlist();
    
    if (item) {
      AppUtils.toast.info(`${item.name} removed from wishlist`);
    }
  }

  /**
   * Toggle item in wishlist
   */
  toggleItem(product) {
    if (this.hasItem(product.id)) {
      this.removeItem(product.id);
      return false;
    } else {
      this.addItem(product);
      return true;
    }
  }

  /**
   * Get wishlist items
   */
  getItems() {
    return this.wishlist;
  }

  /**
   * Check if product is in wishlist
   */
  hasItem(productId) {
    return this.wishlist.some(item => item.id === productId);
  }

  /**
   * Clear wishlist
   */
  clearWishlist() {
    this.wishlist = [];
    this.saveWishlist();
    AppUtils.toast.info('Wishlist cleared');
  }

  /**
   * Dispatch custom event when wishlist updates
   */
  dispatchWishlistUpdate() {
    const event = new CustomEvent('wishlistUpdated', {
      detail: {
        items: this.wishlist,
        count: this.wishlist.length
      }
    });
    window.dispatchEvent(event);
  }
}

// ===================================
// INITIALIZE CART AND WISHLIST
// ===================================

// Create global instances
const cart = new ShoppingCart();
const wishlist = new Wishlist();

// Make available globally
window.cart = cart;
window.wishlist = wishlist;

// Listen for cart updates
window.addEventListener('cartUpdated', (e) => {
  console.log('Cart updated:', e.detail);
});

// Listen for wishlist updates
window.addEventListener('wishlistUpdated', (e) => {
  console.log('Wishlist updated:', e.detail);
});
