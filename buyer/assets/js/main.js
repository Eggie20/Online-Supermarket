/**
 * Main JavaScript - Utilities and Helpers
 * Cabadbaran City Online Supermarket System
 */

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Format currency to Philippine Peso
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}

/**
 * Format date to readable string
 */
function formatDate(date) {
  return new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

/**
 * Debounce function for search inputs
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Get data from localStorage
 */
function getLocalStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return defaultValue;
  }
}

/**
 * Set data to localStorage
 */
function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Error writing to localStorage:", error);
    return false;
  }
}

/**
 * Remove item from localStorage
 */
function removeLocalStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error removing from localStorage:", error);
    return false;
  }
}

// ===================================
// TOAST NOTIFICATIONS
// ===================================

class ToastNotification {
  constructor() {
    this.container = this.createContainer();
  }

  createContainer() {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }
    return container;
  }

  show(message, type = "info", duration = 3000) {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    const icon = this.getIcon(type);
    toast.innerHTML = `
      <span style="font-size: 1.25rem;">${icon}</span>
      <span style="flex: 1;">${message}</span>
      <button onclick="this.parentElement.remove()" style="background: none; border: none; cursor: pointer; color: inherit; font-size: 1.25rem;">&times;</button>
    `;

    this.container.appendChild(toast);

    // Auto remove after duration
    setTimeout(() => {
      toast.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  getIcon(type) {
    const icons = {
      success: "✓",
      error: "✕",
      warning: "⚠",
      info: "ℹ",
    };
    return icons[type] || icons.info;
  }

  success(message, duration) {
    this.show(message, "success", duration);
  }

  error(message, duration) {
    this.show(message, "danger", duration);
  }

  warning(message, duration) {
    this.show(message, "warning", duration);
  }

  info(message, duration) {
    this.show(message, "info", duration);
  }
}

// Create global toast instance
const toast = new ToastNotification();

// ===================================
// MODAL MANAGEMENT
// ===================================

class Modal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.backdrop = document.querySelector(".modal-backdrop");

    if (!this.backdrop) {
      this.backdrop = document.createElement("div");
      this.backdrop.className = "modal-backdrop";
      document.body.appendChild(this.backdrop);
    }

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Close on backdrop click
    this.backdrop.addEventListener("click", () => this.close());

    // Close on close button click
    const closeBtn = this.modal?.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    // Close on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen()) {
        this.close();
      }
    });
  }

  open() {
    if (this.modal) {
      this.modal.classList.add("active");
      this.backdrop.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove("active");
      this.backdrop.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  isOpen() {
    return this.modal?.classList.contains("active");
  }
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

function initScrollAnimations() {
  const elements = document.querySelectorAll(".scroll-fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((el) => {
    observer.observe(el);
    
    // Check if element is already in viewport on page load
    const rect = el.getBoundingClientRect();
    const isInViewport = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    
    if (isInViewport) {
      el.classList.add("visible");
    }
  });
}

// ===================================
// HEADER SCROLL EFFECT
// ===================================

function initHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// ===================================
// MOBILE MENU TOGGLE
// ===================================

function initMobileMenu() {
  const toggle = document.querySelector(".mobile-menu-toggle");
  const menu = document.querySelector(".navbar-actions");
  const backdrop = document.createElement("div");
  backdrop.className = "mobile-menu-backdrop";
  backdrop.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 999;
    display: none;
  `;
  document.body.appendChild(backdrop);

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
      menu.classList.toggle("active");
      backdrop.style.display = menu.classList.contains("active")
        ? "block"
        : "none";
      document.body.style.overflow = menu.classList.contains("active")
        ? "hidden"
        : "";
    });

    backdrop.addEventListener("click", () => {
      toggle.classList.remove("active");
      menu.classList.remove("active");
      backdrop.style.display = "none";
      document.body.style.overflow = "";
    });
  }
}

// ===================================
// NUMBER COUNTER ANIMATION
// ===================================

function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.round(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current);
    }
  }, 16);
}

// ===================================
// FORM VALIDATION
// ===================================

function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;

  const inputs = form.querySelectorAll(
    "input[required], textarea[required], select[required]"
  );
  let isValid = true;

  inputs.forEach((input) => {
    const errorElement = input.parentElement.querySelector(".form-error");

    if (!input.value.trim()) {
      isValid = false;
      input.classList.add("error");
      if (errorElement) {
        errorElement.textContent = "This field is required";
      }
    } else {
      input.classList.remove("error");
      if (errorElement) {
        errorElement.textContent = "";
      }
    }

    // Email validation
    if (input.type === "email" && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        isValid = false;
        input.classList.add("error");
        if (errorElement) {
          errorElement.textContent = "Please enter a valid email address";
        }
      }
    }
  });

  return isValid;
}

// ===================================
// INITIALIZE ON DOM READY
// ===================================

document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();
  initHeaderScroll();
  initMobileMenu();

  console.log("Cabadbaran City Online Supermarket System - Initialized");
});

// ===================================
// EXPORT FOR USE IN OTHER FILES
// ===================================

window.AppUtils = {
  formatCurrency,
  formatDate,
  debounce,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  toast,
  Modal,
  animateCounter,
  validateForm,
};
