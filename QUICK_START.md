# Quick Start Guide

## Cabadbaran City Online Supermarket System

### 🚀 Getting Started

#### Option 1: Using Python (Recommended)

```bash
# Navigate to the project directory
cd d:\cagmat\online-supermarket

# Start a local server
python -m http.server 8000

# Open in browser
# http://localhost:8000/buyer/
```

#### Option 2: Using Node.js

```bash
# Install serve globally (one time only)
npm install -g serve

# Navigate to project directory
cd d:\cagmat\online-supermarket

# Start server
serve -p 8000

# Open in browser
# http://localhost:8000/buyer/
```

#### Option 3: Using PHP

```bash
cd d:\cagmat\online-supermarket
php -S localhost:8000

# Open in browser
# http://localhost:8000/buyer/
```

#### Option 4: Using VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click on `buyer/index.html`
3. Select "Open with Live Server"

---

### 📂 Access Points

**Buyer Interface:**

- Homepage: `http://localhost:8000/buyer/index.html`
- Products: `http://localhost:8000/buyer/products.html`
- Cart: `http://localhost:8000/buyer/cart.html`
- Login: `http://localhost:8000/buyer/login.html`

**Seller Dashboard:** (Coming soon)

- `http://localhost:8000/seller/`

**Admin Panel:** (Coming soon)

- `http://localhost:8000/admin/`

---

### ✨ Features to Test

#### 1. **Homepage**

- ✅ Responsive navigation with mobile menu
- ✅ Hero section with gradient
- ✅ Featured products (8 items)
- ✅ Categories grid (9 categories)
- ✅ Trusted sellers showcase
- ✅ Smooth scroll animations

#### 2. **Products Page**

- ✅ Filter by category
- ✅ Filter by price range
- ✅ Filter by stock availability
- ✅ Filter by seller
- ✅ Search functionality
- ✅ Sort options (name, price, stock)
- ✅ Pagination
- ✅ Add to cart
- ✅ Add to wishlist

#### 3. **Shopping Cart**

- ✅ View cart items
- ✅ Update quantities
- ✅ Remove items
- ✅ Cart summary
- ✅ Empty state
- ✅ LocalStorage persistence

#### 4. **Login Page**

- ✅ Email/password form
- ✅ Password visibility toggle
- ✅ Form validation
- ✅ Remember me option
- ✅ Link to seller login

---

### 🎨 Design Features

**Animations:**

- Fade-in on scroll
- Product card hover effects
- Button hover states
- Toast notifications
- Modal animations
- Loading skeletons (ready to use)

**Responsive Design:**

- Mobile: 320-767px
- Tablet: 768-1023px
- Desktop: 1024px+

**Accessibility:**

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus states
- Reduced motion support

---

### 💾 LocalStorage Data

The application uses browser LocalStorage to persist:

- **shopping_cart**: Cart items
- **wishlist**: Wishlist items
- **user**: User session (after login)

**To view/clear:**

```javascript
// Open browser console (F12)

// View cart
console.log(localStorage.getItem("shopping_cart"));

// View wishlist
console.log(localStorage.getItem("wishlist"));

// Clear all data
localStorage.clear();
```

---

### 🧪 Testing Scenarios

#### Test 1: Add to Cart Flow

1. Go to Products page
2. Click "Add to Cart" on any product
3. See toast notification
4. Check cart badge (should show count)
5. Go to Cart page
6. Verify item is there
7. Update quantity
8. Remove item

#### Test 2: Wishlist Flow

1. Click heart icon on product card
2. Heart should turn red
3. Toast notification appears
4. Click again to remove
5. Heart turns white

#### Test 3: Filtering

1. Go to Products page
2. Select a category (e.g., "Vegetables")
3. Products filter instantly
4. Try price range filter
5. Combine multiple filters
6. Clear all filters

#### Test 4: Search

1. Type in search bar
2. Press Enter
3. Results filter in real-time
4. Try searching for "rice", "milk", etc.

#### Test 5: Mobile Responsive

1. Resize browser to mobile width
2. Click hamburger menu
3. Menu slides in from left
4. Click outside to close
5. Test all pages on mobile

---

### 🐛 Troubleshooting

**Problem: Images not loading**

- Solution: Make sure you're running a local server (not opening HTML files directly)
- Copy generated product images to `buyer/assets/img/products/` folder

**Problem: Cart not persisting**

- Solution: Check if LocalStorage is enabled in your browser
- Clear browser cache and try again

**Problem: Styles not applying**

- Solution: Hard refresh (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for CSS errors

**Problem: JavaScript errors**

- Solution: Open browser console (F12)
- Check for error messages
- Ensure all JS files are loaded in correct order

---

### 📝 Mock Data Available

**Products:** 20 items

- Vegetables: Onions, Carrots, Tomatoes, Cabbage, Corn
- Fruits: Bananas, Apples, Mangoes
- Dairy: Eggs, Milk
- Grains: Rice
- Meat: Chicken, Pork
- Seafood: Fish
- Pantry: Cooking Oil, Sugar
- Condiments: Soy Sauce
- Beverages: Coffee, Tea, Water

**Sellers:** 5 verified stores

- Cabadbaran Fresh Market
- Veggie Haven Supermarket
- Morning Glory Store
- Dairy Delights Mart
- Meat Masters Supermarket

---

### 🎯 Next Steps

1. **Test Current Features**

   - Browse products
   - Add items to cart
   - Test filters and search
   - Try mobile view

2. **Provide Feedback**

   - What works well?
   - What needs improvement?
   - Any bugs found?

3. **Request Additional Features**
   - Which pages to prioritize?
   - Seller dashboard?
   - Admin panel?
   - Additional buyer pages?

---

### 📞 Support

For issues or questions:

- Check browser console for errors
- Verify local server is running
- Ensure you're using a modern browser (Chrome, Firefox, Edge, Safari)

---

**Happy Testing! 🎉**
