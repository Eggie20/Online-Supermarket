/**
 * Seller Dashboard Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  checkAuth();
});

/**
 * Initialize sidebar toggle
 */
function initSidebar() {
  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (toggle && sidebar && overlay) {
    // Toggle sidebar on button click
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
      toggle.classList.toggle('active');
    });

    // Close sidebar when overlay is clicked
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      toggle.classList.remove('active');
    });

    // Close sidebar when a link is clicked
    document.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', () => {
        // Only close on mobile
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('active');
          overlay.classList.remove('active');
          toggle.classList.remove('active');
        }
      });
    });

    // Close sidebar when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        toggle.classList.remove('active');
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        toggle.classList.remove('active');
      }
    });
  }

  // Set active link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.sidebar-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'dashboard.html')) {
      link.classList.add('active');
    }
  });
}

/**
 * Check authentication
 */
function checkAuth() {
  // In a real app, this would check for a valid session
  const seller = localStorage.getItem('seller');
  if (!seller) {
    // Uncomment to enforce login
    // window.location.href = 'seller-login.html';
  }
}

/**
 * Format currency
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(amount);
}

/**
 * Format date
 */
function formatDate(date) {
  return new Intl.DateTimeFormat('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
  // Create toast container if it doesn't exist
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };
  
  toast.innerHTML = `
    <span style="font-size: 1.25rem;">${icons[type] || icons.info}</span>
    <span style="flex: 1;">${message}</span>
    <button onclick="this.parentElement.remove()" style="background: none; border: none; cursor: pointer; color: inherit; font-size: 1.25rem;">&times;</button>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * Confirm dialog
 */
function confirmDialog(message) {
  return confirm(message);
}

// Make functions available globally
window.formatCurrency = formatCurrency;
window.formatDate = formatDate;
window.showToast = showToast;
window.confirmDialog = confirmDialog;
