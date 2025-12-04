/**
 * Dashboard Page JavaScript
 * Loads charts and recent products
 */

// Mock seller data
const SELLER_PRODUCTS = [
  { id: 1, name: 'Fresh Red Onions', category: 'Vegetables', price: 85, stock: 50, status: 'active', image: '../buyer/assets/img/products/onion.jpg' },
  { id: 2, name: 'Orange Carrots', category: 'Vegetables', price: 95, stock: 35, status: 'active', image: '../buyer/assets/img/products/carrot.jpg' },
  { id: 3, name: 'Premium White Rice', category: 'Grains', price: 52, stock: 100, status: 'active', image: '../buyer/assets/img/products/rice.jpg' },
  { id: 4, name: 'Farm Fresh Eggs', category: 'Dairy', price: 8.50, stock: 15, status: 'low-stock', image: '../buyer/assets/img/products/eggs.jpg' },
  { id: 5, name: 'Fresh Milk', category: 'Dairy', price: 95, stock: 5, status: 'low-stock', image: '../buyer/assets/img/products/milk.jpg' },
];

document.addEventListener('DOMContentLoaded', () => {
  loadRecentProducts();
  initSalesChart();
  initCategoryChart();
  animateStats();
});

/**
 * Load recent products table
 */
function loadRecentProducts() {
  const tbody = document.getElementById('productsTableBody');
  if (!tbody) return;

  tbody.innerHTML = SELLER_PRODUCTS.map(product => `
    <tr>
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
        <span class="${product.stock < 20 ? 'text-warning' : 'text-success'} font-semibold">
          ${product.stock}
        </span>
      </td>
      <td>
        <span class="badge ${product.status === 'active' ? 'badge-success' : 'badge-warning'}">
          ${product.status === 'active' ? 'Active' : 'Low Stock'}
        </span>
      </td>
      <td>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-ghost" onclick="editProduct(${product.id})" title="Edit">
            ✏️
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
 * Initialize sales chart
 */
function initSalesChart() {
  const ctx = document.getElementById('salesChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Sales (₱)',
        data: [12000, 19000, 15000, 25000, 22000, 24580],
        borderColor: '#5865F2',
        backgroundColor: 'rgba(88, 101, 242, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '₱' + value.toLocaleString();
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize category chart
 */
function initCategoryChart() {
  const ctx = document.getElementById('categoryChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Vegetables', 'Fruits', 'Dairy', 'Grains', 'Meat'],
      datasets: [{
        data: [15, 10, 8, 5, 7],
        backgroundColor: [
          '#43B581',
          '#FAA61A',
          '#5865F2',
          '#7289DA',
          '#F04747'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

/**
 * Animate stat numbers
 */
function animateStats() {
  const statElements = document.querySelectorAll('.stat-card-value');
  
  statElements.forEach(element => {
    const text = element.textContent;
    const number = parseInt(text.replace(/[^0-9]/g, ''));
    
    if (!isNaN(number)) {
      let current = 0;
      const increment = number / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
          element.textContent = text;
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current).toString();
        }
      }, 20);
    }
  });
}

/**
 * Edit product
 */
function editProduct(id) {
  window.location.href = `product-form.html?id=${id}`;
}

/**
 * Delete product
 */
function deleteProduct(id) {
  if (confirmDialog('Are you sure you want to delete this product?')) {
    showToast('Product deleted successfully', 'success');
    // In real app, make API call to delete
    setTimeout(() => {
      loadRecentProducts();
    }, 500);
  }
}
