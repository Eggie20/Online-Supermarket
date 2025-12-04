/**
 * Filter Drawer Toggle Functionality
 * Handles collapsible filter sections with smooth animations
 */

class FilterDrawer {
  constructor() {
    this.filterSections = document.querySelectorAll('.filter-section');
    this.init();
  }

  init() {
    this.filterSections.forEach(section => {
      const title = section.querySelector('.filter-title');
      if (title) {
        title.addEventListener('click', (e) => this.toggleSection(e, section));
      }
    });
  }

  toggleSection(e, section) {
    // Prevent default if clicking on input elements
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
      return;
    }

    section.classList.toggle('collapsed');
    this.updateIcon(section);
  }

  updateIcon(section) {
    const icon = section.querySelector('.filter-toggle-icon');
    if (icon) {
      if (section.classList.contains('collapsed')) {
        icon.style.transform = 'rotate(-90deg)';
      } else {
        icon.style.transform = 'rotate(0deg)';
      }
    }
  }

  // Expand all sections
  expandAll() {
    this.filterSections.forEach(section => {
      section.classList.remove('collapsed');
      this.updateIcon(section);
    });
  }

  // Collapse all sections
  collapseAll() {
    this.filterSections.forEach(section => {
      section.classList.add('collapsed');
      this.updateIcon(section);
    });
  }

  // Toggle specific section by index
  toggleByIndex(index) {
    if (this.filterSections[index]) {
      this.filterSections[index].classList.toggle('collapsed');
      this.updateIcon(this.filterSections[index]);
    }
  }
}

// Initialize filter drawer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.filterDrawer = new FilterDrawer();
});
