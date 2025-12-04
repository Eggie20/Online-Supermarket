/**
 * Mock Product Data
 * Sample products for Cabadbaran City Online Supermarket
 */

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Fresh Red Onions',
    category: 'Vegetables',
    price: 85.00,
    stock: 50,
    seller: 'Cabadbaran Fresh Market',
    sellerLocation: 'Poblacion, Cabadbaran City',
    image: 'assets/img/products/onion.jpg',
    description: 'Fresh locally-sourced red onions, perfect for cooking. High quality and affordable.',
    unit: 'per kg',
    featured: true,
    rating: 4.5,
    reviews: 23
  },
  {
    id: 2,
    name: 'Orange Carrots',
    category: 'Vegetables',
    price: 95.00,
    stock: 35,
    seller: 'Veggie Haven Supermarket',
    sellerLocation: 'Bayabas, Cabadbaran City',
    image: 'assets/img/products/carrot.jpg',
    description: 'Crisp and sweet orange carrots, rich in vitamins. Freshly harvested.',
    unit: 'per kg',
    featured: true,
    rating: 4.8,
    reviews: 18
  },
  {
    id: 3,
    name: 'Premium White Rice',
    category: 'Grains',
    price: 52.00,
    stock: 100,
    seller: 'Cabadbaran Fresh Market',
    sellerLocation: 'Poblacion, Cabadbaran City',
    image: 'assets/img/products/rice.jpg',
    description: 'High-quality white rice, perfect for daily meals. Clean and well-milled.',
    unit: 'per kg',
    featured: true,
    rating: 4.7,
    reviews: 45
  },
  {
    id: 4,
    name: 'Farm Fresh Eggs',
    category: 'Dairy',
    price: 8.50,
    stock: 120,
    seller: 'Morning Glory Store',
    sellerLocation: 'Kinda, Cabadbaran City',
    image: 'assets/img/products/eggs.jpg',
    description: 'Fresh eggs from local farms. Rich in protein and nutrients.',
    unit: 'per piece',
    featured: true,
    rating: 4.9,
    reviews: 67
  },
  {
    id: 5,
    name: 'Fresh Milk',
    category: 'Dairy',
    price: 95.00,
    stock: 25,
    seller: 'Dairy Delights Mart',
    sellerLocation: 'Poblacion, Cabadbaran City',
    image: 'assets/img/products/milk.jpg',
    description: 'Pure fresh milk, pasteurized and ready to drink. Rich and creamy.',
    unit: 'per liter',
    featured: false,
    rating: 4.6,
    reviews: 34
  },
  {
    id: 6,
    name: 'Chicken Breast',
    category: 'Meat',
    price: 210.00,
    stock: 15,
    seller: 'Meat Masters Supermarket',
    sellerLocation: 'Bayabas, Cabadbaran City',
    image: 'assets/img/products/chicken.jpg',
    description: 'Fresh chicken breast, perfect for grilling or frying. High quality meat.',
    unit: 'per kg',
    featured: true,
    rating: 4.7,
    reviews: 29
  },
  {
    id: 7,
    name: 'Fresh Tomatoes',
    category: 'Vegetables',
    price: 75.00,
    stock: 40,
    seller: 'Veggie Haven Supermarket',
    sellerLocation: 'Bayabas, Cabadbaran City',
    image: 'assets/img/products/tomato.jpg',
    description: 'Ripe and juicy tomatoes, perfect for salads and cooking.',
    unit: 'per kg',
    featured: false,
    rating: 4.4,
    reviews: 21
  },
  {
    id: 8,
    name: 'Green Cabbage',
    category: 'Vegetables',
    price: 65.00,
    stock: 30,
    seller: 'Cabadbaran Fresh Market',
    sellerLocation: 'Poblacion, Cabadbaran City',
    image: 'assets/img/products/cabbage.jpg',
    description: 'Fresh green cabbage, crisp and healthy. Great for salads.',
    unit: 'per kg',
    featured: false,
    rating: 4.3,
    reviews: 15
  },
  {
    id: 9,
    name: 'Sweet Corn',
    category: 'Vegetables',
    price: 45.00,
    stock: 55,
    seller: 'Morning Glory Store',
    sellerLocation: 'Kinda, Cabadbaran City',
    image: 'assets/img/products/corn.jpg',
    description: 'Sweet and tender corn, perfect for boiling or grilling.',
    unit: 'per piece',
    featured: false,
    rating: 4.6,
    reviews: 19
  },
  {
    id: 10,
    name: 'Fresh Bananas',
    category: 'Fruits',
    price: 55.00,
    stock: 80,
    seller: 'Fruit Paradise',
    sellerLocation: 'Poblacion, Cabadbaran City',
    image: 'assets/img/products/banana.jpg',
    description: 'Ripe bananas, sweet and nutritious. Perfect for snacking.',
    unit: 'per kg',
    featured: true,
    rating: 4.8,
    reviews: 52
  },
  {
    id: 11,
    name: 'Red Apples',
    category: 'Fruits',
    price: 180.00,
    stock: 20,
    seller: 'Fruit Paradise',
    sellerLocation: 'Poblacion, Cabadbaran City',
    image: 'assets/img/products/apple.jpg',
    description: 'Crisp and sweet red apples, imported quality.',
    unit: 'per kg',
    featured: false,
    rating: 4.7,
    reviews: 28
  },
  {
    id: 12,
    name: 'Fresh Mangoes',
    category: 'Fruits',
    price: 120.00,
    stock: 25,
    seller: 'Fruit Paradise',
    sellerLocation: 'Poblacion, Cabadbaran City',
    image: 'assets/img/products/mango.jpg',
    description: 'Sweet Philippine mangoes, perfectly ripe and delicious.',
    unit: 'per kg',
    featured: true,
    rating: 5.0,
    reviews: 89
  },
  {
    id: 13,
    name: 'Pork Chops',
    category: 'Meat',
    price: 280.00,
    stock: 12,
    seller: 'Meat Masters Supermarket',
    sellerLocation: 'Bayabas, Cabadbaran City',
    image: 'assets/img/products/pork.jpg',
    description: 'Premium pork chops, tender and flavorful.',
    unit: 'per kg',
    featured: false,
    rating: 4.6,
    reviews: 31
  },
  {
    id: 14,
    name: 'Fresh Fish',
    category: 'Seafood',
    price: 250.00,
    stock: 18,
    seller: 'Ocean Fresh Market',
    sellerLocation: 'Poblacion, Cabadbaran City',
    image: 'assets/img/products/fish.jpg',
    description: 'Fresh catch of the day, cleaned and ready to cook.',
    unit: 'per kg',
    featured: false,
    rating: 4.5,
    reviews: 24
  },
  {
    id: 15,
    name: 'Cooking Oil',
    category: 'Pantry',
    price: 145.00,
    stock: 45,
    seller: 'Daily Essentials Store',
    sellerLocation: 'Kinda, Cabadbaran City',
    image: 'assets/img/products/oil.jpg',
    description: 'Pure vegetable cooking oil, perfect for all your cooking needs.',
    unit: 'per liter',
    featured: false,
    rating: 4.4,
    reviews: 38
  },
  {
    id: 16,
    name: 'Brown Sugar',
    category: 'Pantry',
    price: 65.00,
    stock: 60,
    seller: 'Daily Essentials Store',
    sellerLocation: 'Kinda, Cabadbaran City',
    image: 'assets/img/products/sugar.jpg',
    description: 'Natural brown sugar, perfect for baking and sweetening.',
    unit: 'per kg',
    featured: false,
    rating: 4.3,
    reviews: 17
  },
  {
    id: 17,
    name: 'Soy Sauce',
    category: 'Condiments',
    price: 45.00,
    stock: 70,
    seller: 'Daily Essentials Store',
    sellerLocation: 'Kinda, Cabadbaran City',
    image: 'assets/img/products/soysauce.jpg',
    description: 'Premium soy sauce, adds flavor to any dish.',
    unit: 'per bottle',
    featured: false,
    rating: 4.5,
    reviews: 42
  },
  {
    id: 18,
    name: 'Instant Coffee',
    category: 'Beverages',
    price: 125.00,
    stock: 35,
    seller: 'Morning Glory Store',
    sellerLocation: 'Kinda, Cabadbaran City',
    image: 'assets/img/products/coffee.jpg',
    description: 'Rich and aromatic instant coffee, perfect for your morning brew.',
    unit: 'per pack',
    featured: false,
    rating: 4.7,
    reviews: 56
  },
  {
    id: 19,
    name: 'Green Tea',
    category: 'Beverages',
    price: 85.00,
    stock: 40,
    seller: 'Health Plus Mart',
    sellerLocation: 'Poblacion, Cabadbaran City',
    image: 'assets/img/products/tea.jpg',
    description: 'Premium green tea bags, healthy and refreshing.',
    unit: 'per box',
    featured: false,
    rating: 4.6,
    reviews: 33
  },
  {
    id: 20,
    name: 'Bottled Water',
    category: 'Beverages',
    price: 15.00,
    stock: 150,
    seller: 'Daily Essentials Store',
    sellerLocation: 'Kinda, Cabadbaran City',
    image: 'assets/img/products/water.jpg',
    description: 'Pure drinking water, purified and safe.',
    unit: 'per bottle',
    featured: false,
    rating: 4.8,
    reviews: 91
  }
];

// Categories
const CATEGORIES = [
  { id: 1, name: 'Vegetables', icon: '🥕', count: 5 },
  { id: 2, name: 'Fruits', icon: '🍎', count: 3 },
  { id: 3, name: 'Dairy', icon: '🥛', count: 2 },
  { id: 4, name: 'Grains', icon: '🌾', count: 1 },
  { id: 5, name: 'Meat', icon: '🍖', count: 2 },
  { id: 6, name: 'Seafood', icon: '🐟', count: 1 },
  { id: 7, name: 'Pantry', icon: '🥫', count: 3 },
  { id: 8, name: 'Condiments', icon: '🧂', count: 1 },
  { id: 9, name: 'Beverages', icon: '☕', count: 3 }
];

// Sellers
const SELLERS = [
  {
    id: 1,
    name: 'Cabadbaran Fresh Market',
    location: 'Poblacion, Cabadbaran City',
    contact: '+63 912 345 6789',
    email: 'freshmarket@cabadbaran.com',
    rating: 4.7,
    productsCount: 45,
    verified: true
  },
  {
    id: 2,
    name: 'Veggie Haven Supermarket',
    location: 'Bayabas, Cabadbaran City',
    contact: '+63 923 456 7890',
    email: 'veggiehaven@gmail.com',
    rating: 4.8,
    productsCount: 32,
    verified: true
  },
  {
    id: 3,
    name: 'Morning Glory Store',
    location: 'Kinda, Cabadbaran City',
    contact: '+63 934 567 8901',
    email: 'morningglory@yahoo.com',
    rating: 4.6,
    productsCount: 28,
    verified: true
  },
  {
    id: 4,
    name: 'Dairy Delights Mart',
    location: 'Poblacion, Cabadbaran City',
    contact: '+63 945 678 9012',
    email: 'dairydelights@gmail.com',
    rating: 4.5,
    productsCount: 15,
    verified: true
  },
  {
    id: 5,
    name: 'Meat Masters Supermarket',
    location: 'Bayabas, Cabadbaran City',
    contact: '+63 956 789 0123',
    email: 'meatmasters@cabadbaran.com',
    rating: 4.7,
    productsCount: 22,
    verified: true
  }
];

// Export data
window.MOCK_PRODUCTS = MOCK_PRODUCTS;
window.CATEGORIES = CATEGORIES;
window.SELLERS = SELLERS;

// Helper functions
window.getProductById = (id) => {
  return MOCK_PRODUCTS.find(p => p.id === id);
};

window.getProductsByCategory = (category) => {
  return MOCK_PRODUCTS.filter(p => p.category === category);
};

window.getFeaturedProducts = () => {
  return MOCK_PRODUCTS.filter(p => p.featured);
};

window.searchProducts = (query) => {
  const lowerQuery = query.toLowerCase();
  return MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.seller.toLowerCase().includes(lowerQuery)
  );
};
