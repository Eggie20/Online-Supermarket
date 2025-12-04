/**
 * Products Page JavaScript
 * Handles filtering, sorting, and pagination
 */

let currentProducts = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 12;

document.addEventListener('DOMContentLoaded', () => {
  initializeFilters();
  loadProducts();
  setupEventListeners();
  applyURLParameters();
});

/**
 * Initialize filter options
 */
function initializeFilters() {
  // Category filters
  const categoryContainer = document.getElementById('categoryFilters');
  if (categoryContainer) {
    const categoryHTML = CATEGORIES.map(cat => `
      <label class="form-check">
        <input type="checkbox" class="form-check-input category-filter" value="${cat.name}">
        <span class="form-check-label">${cat.icon} ${cat.name}</span>
      </label>
    `).join('');
    
    categoryContainer.innerHTML += categoryHTML;
  }

  // Seller filters
  const sellerContainer = document.getElementById('sellerFilters');
  if (sellerContainer) {
    sellerContainer.innerHTML = SELLERS.map(seller => `
      <label class="form-check">
        <input type="checkbox" class="form-check-input seller-filter" value="${seller.name}">
        <span class="form-check-label">${seller.name}</span>
      </label>
    `).join('');
  }
}

/**
 * Load and display products
 */
function loadProducts() {
  currentProducts = [...MOCK_PRODUCTS];
  applyFilters();
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', AppUtils.debounce(() => {
      applyFilters();
    }, 300));
  }

  // Sort select
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      applyFilters();
    });
  }

  // Category filters
  document.querySelectorAll('.category-filter').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
  });

  // Stock filters
  document.querySelectorAll('.stock-filter').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
  });

  // Seller filters
  document.querySelectorAll('.seller-filter').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
  });
}

/**
 * Apply all filters
 */
function applyFilters() {
  let products = [...currentProducts];

  // Search filter
  const searchQuery = document.getElementById('searchInput')?.value.toLowerCase();
  if (searchQuery) {
    products = products.filter(p =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery) ||
      p.seller.toLowerCase().includes(searchQuery)
    );
  }

  // Category filter
  const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked'))
    .map(cb => cb.value);
  if (selectedCategories.length > 0) {
    products = products.filter(p => selectedCategories.includes(p.category));
  }

  // Price filter
  const minPrice = parseFloat(document.getElementById('minPrice')?.value) || 0;
  const maxPrice = parseFloat(document.getElementById('maxPrice')?.value) || Infinity;
  products = products.filter(p => p.price >= minPrice && p.price <= maxPrice);

  // Stock filter
  const stockFilters = Array.from(document.querySelectorAll('.stock-filter:checked'))
    .map(cb => cb.value);
  if (stockFilters.length > 0) {
    products = products.filter(p => {
      if (stockFilters.includes('in-stock') && p.stock >= 20) return true;
      if (stockFilters.includes('low-stock') && p.stock > 0 && p.stock < 20) return true;
      if (stockFilters.includes('out-of-stock') && p.stock === 0) return true;
      return false;
    });
  }

  // Seller filter
  const selectedSellers = Array.from(document.querySelectorAll('.seller-filter:checked'))
    .map(cb => cb.value);
  if (selectedSellers.length > 0) {
    products = products.filter(p => selectedSellers.includes(p.seller));
  }

  // Sort products
  const sortBy = document.getElementById('sortSelect')?.value || 'featured';
  products = sortProducts(products, sortBy);

  filteredProducts = products;
  currentPage = 1;
  displayProducts();
  updateProductCount();
}

/**
 * Sort products
 */
function sortProducts(products, sortBy) {
  const sorted = [...products];

  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'stock-desc':
      return sorted.sort((a, b) => b.stock - a.stock);
    case 'featured':
    default:
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
}

/**
 * Display products
 */
function displayProducts() {
  const container = document.getElementById('productsGrid');
  const emptyState = document.getElementById('emptyState');
  
  if (!container) return;

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const pageProducts = filteredProducts.slice(startIndex, endIndex);

  if (pageProducts.length === 0) {
    container.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  container.style.display = 'grid';
  if (emptyState) emptyState.style.display = 'none';

  container.innerHTML = pageProducts.map(product => `
    <div class="product-card">
      <div class="product-image image-zoom">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/img/placeholder.jpg'">
        ${product.stock < 20 && product.stock > 0 ? '<span class="product-badge" style="background: var(--warning);">Low Stock</span>' : ''}
        ${product.stock === 0 ? '<span class="product-badge">Out of Stock</span>' : ''}
        ${product.featured ? '<span class="product-badge" style="background: var(--primary); top: auto; bottom: var(--space-3);">Featured</span>' : ''}
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

  displayPagination();
}

/**
 * Display pagination
 */
function displayPagination() {
  const container = document.getElementById('pagination');
  if (!container) return;

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let paginationHTML = '';

  // Previous button
  paginationHTML += `
    <button 
      class="pagination-item" 
      onclick="changePage(${currentPage - 1})"
      ${currentPage === 1 ? 'disabled' : ''}
    >
      ‹
    </button>
  `;

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      paginationHTML += `
        <button 
          class="pagination-item ${i === currentPage ? 'active' : ''}" 
          onclick="changePage(${i})"
        >
          ${i}
        </button>
      `;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      paginationHTML += `<span class="pagination-item" style="border: none; cursor: default;">...</span>`;
    }
  }

  // Next button
  paginationHTML += `
    <button 
      class="pagination-item" 
      onclick="changePage(${currentPage + 1})"
      ${currentPage === totalPages ? 'disabled' : ''}
    >
      ›
    </button>
  `;

  container.innerHTML = paginationHTML;
}

/**
 * Change page
 */
function changePage(page) {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  if (page < 1 || page > totalPages) return;
  
  currentPage = page;
  displayProducts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Update product count
 */
function updateProductCount() {
  const countElement = document.getElementById('productsCount');
  if (countElement) {
    countElement.textContent = `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`;
  }
}

/**
 * Clear all filters
 */
function clearFilters() {
  // Clear search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';

  // Uncheck all filters
  document.querySelectorAll('.category-filter, .seller-filter').forEach(cb => {
    cb.checked = false;
  });

  // Reset stock filters to default
  document.querySelectorAll('.stock-filter').forEach(cb => {
    cb.checked = cb.value !== 'out-of-stock';
  });

  // Clear price filters
  const minPrice = document.getElementById('minPrice');
  const maxPrice = document.getElementById('maxPrice');
  if (minPrice) minPrice.value = '';
  if (maxPrice) maxPrice.value = '';

  // Reset sort
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.value = 'featured';

  applyFilters();
}

/**
 * Apply URL parameters
 */
function applyURLParameters() {
  const params = new URLSearchParams(window.location.search);
  
  // Category from URL
  const category = params.get('category');
  if (category) {
    const checkbox = document.querySelector(`.category-filter[value="${category}"]`);
    if (checkbox) {
      checkbox.checked = true;
      applyFilters();
    }
  }

  // Search from URL
  const search = params.get('search');
  if (search) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.value = search;
      applyFilters();
    }
  }

  // Seller from URL
  const seller = params.get('seller');
  if (seller) {
    const checkbox = document.querySelector(`.seller-filter[value="${seller}"]`);
    if (checkbox) {
      checkbox.checked = true;
      applyFilters();
    }
  }
}

/**
 * Add to cart
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
 * Get stock class
 */
function getStockClass(stock) {
  if (stock === 0) return 'out-of-stock';
  if (stock < 20) return 'low-stock';
  return 'in-stock';
}

/**
 * Get stock text
 */
function getStockText(stock) {
  if (stock === 0) return 'Out of Stock';
  if (stock < 20) return `Only ${stock} left`;
  return 'In Stock';
}
