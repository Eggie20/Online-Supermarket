/**
 * Products Management JavaScript
 */

// Mock products data (expanded from dashboard)
const ALL_PRODUCTS = [
  { id: 1, name: 'Fresh Red Onions', category: 'Vegetables', price: 85, stock: 50, status: 'active', image: '../buyer/assets/img/products/onion.jpg', dateAdded: '2025-01-15' },
  { id: 2, name: 'Orange Carrots', category: 'Vegetables', price: 95, stock: 35, status: 'active', image: '../buyer/assets/img/products/carrot.jpg', dateAdded: '2025-01-14' },
  { id: 3, name: 'Premium White Rice', category: 'Grains', price: 52, stock: 100, status: 'active', image: '../buyer/assets/img/products/rice.jpg', dateAdded: '2025-01-13' },
  { id: 4, name: 'Farm Fresh Eggs', category: 'Dairy', price: 8.50, stock: 15, status: 'low-stock', image: '../buyer/assets/img/products/eggs.jpg', dateAdded: '2025-01-12' },
  { id: 5, name: 'Fresh Milk', category: 'Dairy', price: 95, stock: 5, status: 'low-stock', image: '../buyer/assets/img/products/milk.jpg', dateAdded: '2025-01-11' },
  { id: 6, name: 'Chicken Breast', category: 'Meat', price: 210, stock: 15, status: 'active', image: '../buyer/assets/img/products/chicken.jpg', dateAdded: '2025-01-10' },
  { id: 7, name: 'Fresh Tomatoes', category: 'Vegetables', price: 75, stock: 0, status: 'out-of-stock', image: '../buyer/assets/img/placeholder.jpg', dateAdded: '2025-01-09' },
  { id: 8, name: 'Green Cabbage', category: 'Vegetables', price: 65, stock: 30, status: 'active', image: '../buyer/assets/img/placeholder.jpg', dateAdded: '2025-01-08' },
];

let currentView = 'table';
let filteredProducts = [...ALL_PRODUCTS];
let selectedProducts = new Set();

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  setupFilters();
});

/**
 * Setup filter event listeners
 */
function setupFilters() {
  document.getElementById('searchInput')?.addEventListener('input', applyFilters);
  document.getElementById('categoryFilter')?.addEventListener('change', applyFilters);
  document.getElementById('statusFilter')?.addEventListener('change', applyFilters);
  document.getElementById('sortBy')?.addEventListener('change', applyFilters);
}

/**
 * Apply filters
 */
function applyFilters() {
  let products = [...ALL_PRODUCTS];

  // Search filter
  const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
  if (search) {
    products = products.filter(p => 
      p.name.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search)
    );
  }

  // Category filter
  const category = document.getElementById('categoryFilter')?.value;
  if (category) {
    products = products.filter(p => p.category === category);
  }

  // Status filter
  const status = document.getElementById('statusFilter')?.value;
  if (status) {
    products = products.filter(p => p.status === status);
  }

  // Sort
  const sortBy = document.getElementById('sortBy')?.value || 'name';
  products.sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'stock':
        return b.stock - a.stock;
      case 'date':
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  filteredProducts = products;
  loadProducts();
}

/**
 * Clear filters
 */
function clearFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('categoryFilter').value = '';
  document.getElementById('statusFilter').value = '';
  document.getElementById('sortBy').value = 'name';
  applyFilters();
}

/**
 * Load products
 */
function loadProducts() {
  updateProductCount();
  
  if (currentView === 'table') {
    loadTableView();
  } else {
    loadGridView();
  }
}

/**
 * Load table view
 */
function loadTableView() {
  const tbody = document.getElementById('productsTableBody');
  if (!tbody) return;

  tbody.innerHTML = filteredProducts.map(product => `
    <tr>
      <td>
        <input type="checkbox" class="product-checkbox" data-id="${product.id}" 
          ${selectedProducts.has(product.id) ? 'checked' : ''}
          onchange="toggleProductSelection(${product.id})">
      </td>
      <td>
        <div class="table-product">
          <div class="table-product-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='../buyer/assets/img/placeholder.jpg'">
          </div>
          <div class="table-product-info">
            <div class="table-product-name">${product.name}</div>
            <div class="table-product-category">${product.category}</div>
          </div>
        </div>
      </td>
      <td>${product.category}</td>
      <td class="font-semibold">${formatCurrency(product.price)}</td>
      <td>
        <span class="${getStockClass(product.stock)} font-semibold">
          ${product.stock}
        </span>
      </td>
      <td>
        <span class="badge ${getStatusBadgeClass(product.status)}">
          ${getStatusText(product.status)}
        </span>
      </td>
      <td>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-ghost" onclick="editProduct(${product.id})" title="Edit">
            ✏️
          </button>
          <button class="btn btn-sm btn-ghost" onclick="duplicateProduct(${product.id})" title="Duplicate">
            📋
          </button>
          <button class="btn btn-sm btn-ghost" onclick="deleteProduct(${product.id})" title="Delete">
            🗑️
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

/**
 * Load grid view
 */
function loadGridView() {
  const grid = document.getElementById('productsGridView');
  if (!grid) return;

  grid.innerHTML = filteredProducts.map(product => `
    <div class="card">
      <div class="product-image" style="height: 200px; overflow: hidden;">
        <img src="${product.image}" alt="${product.name}" 
          style="width: 100%; height: 100%; object-fit: cover;"
          onerror="this.src='../buyer/assets/img/placeholder.jpg'">
      </div>
      <div class="card-body">
        <h3 class="card-title" style="font-size: var(--text-lg); margin-bottom: var(--space-2);">
          ${product.name}
        </h3>
        <p class="text-muted" style="font-size: var(--text-sm); margin-bottom: var(--space-3);">
          ${product.category}
        </p>
        <div class="d-flex justify-between align-center mb-3">
          <span class="font-bold text-primary">${formatCurrency(product.price)}</span>
          <span class="badge ${getStatusBadgeClass(product.status)}">
            ${getStatusText(product.status)}
          </span>
        </div>
        <div class="text-sm text-muted mb-4">
          Stock: <span class="${getStockClass(product.stock)} font-semibold">${product.stock}</span>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-primary btn-block" onclick="editProduct(${product.id})">
            Edit
          </button>
          <button class="btn btn-sm btn-outline" onclick="deleteProduct(${product.id})">
            Delete
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Toggle view
 */
function toggleView() {
  currentView = currentView === 'table' ? 'grid' : 'table';
  
  const tableView = document.getElementById('tableView');
  const gridView = document.getElementById('gridView');
  const viewIcon = document.getElementById('viewIcon');
  const viewText = document.getElementById('viewText');

  if (currentView === 'grid') {
    tableView.style.display = 'none';
    gridView.style.display = 'block';
    viewIcon.textContent = '📋';
    viewText.textContent = 'Table View';
  } else {
    tableView.style.display = 'block';
    gridView.style.display = 'none';
    viewIcon.textContent = '🔲';
    viewText.textContent = 'Grid View';
  }

  loadProducts();
}

/**
 * Toggle product selection
 */
function toggleProductSelection(id) {
  if (selectedProducts.has(id)) {
    selectedProducts.delete(id);
  } else {
    selectedProducts.add(id);
  }
}

/**
 * Toggle select all
 */
function toggleSelectAll() {
  const checkbox = document.getElementById('selectAll');
  const checkboxes = document.querySelectorAll('.product-checkbox');
  
  checkboxes.forEach(cb => {
    cb.checked = checkbox.checked;
    const id = parseInt(cb.dataset.id);
    if (checkbox.checked) {
      selectedProducts.add(id);
    } else {
      selectedProducts.delete(id);
    }
  });
}

/**
 * Update product count
 */
function updateProductCount() {
  const countElement = document.getElementById('productCount');
  if (countElement) {
    countElement.textContent = filteredProducts.length;
  }
}

/**
 * Get stock class
 */
function getStockClass(stock) {
  if (stock === 0) return 'text-danger';
  if (stock < 20) return 'text-warning';
  return 'text-success';
}

/**
 * Get status badge class
 */
function getStatusBadgeClass(status) {
  switch (status) {
    case 'active': return 'badge-success';
    case 'low-stock': return 'badge-warning';
    case 'out-of-stock': return 'badge-danger';
    default: return 'badge-info';
  }
}

/**
 * Get status text
 */
function getStatusText(status) {
  return status.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

/**
 * Edit product
 */
function editProduct(id) {
  window.location.href = `product-form.html?id=${id}`;
}

/**
 * Duplicate product
 */
function duplicateProduct(id) {
  showToast('Product duplicated successfully', 'success');
  // In real app, make API call to duplicate
}

/**
 * Delete product
 */
function deleteProduct(id) {
  if (confirmDialog('Are you sure you want to delete this product?')) {
    const index = ALL_PRODUCTS.findIndex(p => p.id === id);
    if (index > -1) {
      ALL_PRODUCTS.splice(index, 1);
      applyFilters();
      showToast('Product deleted successfully', 'success');
    }
  }
}

/**
 * Export products
 */
function exportProducts() {
  showToast('Exporting products...', 'info');
  // In real app, generate CSV/Excel file
  setTimeout(() => {
    showToast('Products exported successfully', 'success');
  }, 1000);
}
