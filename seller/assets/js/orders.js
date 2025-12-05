/**
 * Seller Orders Page - View Only
 * Displays orders for the seller to view (no action functions)
 */

// Sample orders data
const ordersData = [
  {
    id: 'ORD-001',
    customer: 'Juan Dela Cruz',
    items: 3,
    total: 1250,
    status: 'completed',
    date: '2025-12-04'
  },
  {
    id: 'ORD-002',
    customer: 'Maria Santos',
    items: 2,
    total: 850,
    status: 'processing',
    date: '2025-12-04'
  },
  {
    id: 'ORD-003',
    customer: 'Pedro Reyes',
    items: 5,
    total: 2100,
    status: 'pending',
    date: '2025-12-03'
  },
  {
    id: 'ORD-004',
    customer: 'Ana Garcia',
    items: 1,
    total: 450,
    status: 'completed',
    date: '2025-12-02'
  },
  {
    id: 'ORD-005',
    customer: 'Carlos Lopez',
    items: 4,
    total: 1800,
    status: 'cancelled',
    date: '2025-12-01'
  }
];

// Get status badge HTML
function getStatusBadge(status) {
  const colors = {
    pending: 'var(--info)',
    processing: 'var(--warning)',
    completed: 'var(--success)',
    cancelled: 'var(--danger)'
  };
  
  const labels = {
    pending: 'Pending',
    processing: 'Processing',
    completed: 'Completed',
    cancelled: 'Cancelled'
  };

  return `<span class="badge" style="background: ${colors[status]};">${labels[status]}</span>`;
}

// Format currency
function formatCurrency(amount) {
  return '₱' + amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Format date
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Render orders table
function renderOrders(filter = 'all') {
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;

  let filteredOrders = ordersData;
  if (filter !== 'all') {
    filteredOrders = ordersData.filter(order => order.status === filter);
  }

  if (filteredOrders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: var(--space-6);">
          <div style="color: var(--text-light);">
            <div style="font-size: 3rem; margin-bottom: var(--space-2);">📋</div>
            <p>No orders found</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filteredOrders.map(order => `
    <tr>
      <td><strong>${order.id}</strong></td>
      <td>${order.customer}</td>
      <td>${order.items} items</td>
      <td>${formatCurrency(order.total)}</td>
      <td>${getStatusBadge(order.status)}</td>
      <td>${formatDate(order.date)}</td>
      <td>
        <button class="btn btn-sm btn-outline" onclick="viewOrder('${order.id}')">View</button>
      </td>
    </tr>
  `).join('');
}

// View order details (view only - no action)
function viewOrder(orderId) {
  const order = ordersData.find(o => o.id === orderId);
  if (!order) return;

  alert(`Order Details\n\nOrder ID: ${order.id}\nCustomer: ${order.customer}\nItems: ${order.items}\nTotal: ${formatCurrency(order.total)}\nStatus: ${order.status.toUpperCase()}\nDate: ${formatDate(order.date)}`);
}

// Setup filter buttons
function setupFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline');
      });
      btn.classList.remove('btn-outline');
      btn.classList.add('btn-primary');

      // Filter orders
      const filter = btn.dataset.filter;
      renderOrders(filter);
    });
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderOrders();
  setupFilters();
});
