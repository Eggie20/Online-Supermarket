/**
 * Admin Portal - Main JavaScript
 * Handles sidebar, mobile menu, and common functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initMobileMenu();
  console.log('Admin Portal - Initialized');
});

/**
 * Initialize sidebar functionality
 */
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  // Add active state to current page
  const currentPage = window.location.pathname.split('/').pop();
  const links = document.querySelectorAll('.sidebar-link');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (!toggle || !sidebar || !overlay) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    toggle.classList.remove('active');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  });
}
