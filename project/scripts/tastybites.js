// DOM Elements
const cartCount = document.querySelector(".cart-count");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const mobileMenu = document.getElementById("mobileMenu");
const currentYear = document.getElementById("currentyear");

const menuData = [
  {
    id: 1,
    name: "Grilled Salmon",
    price: 22.99,
    description: "Fresh Atlantic salmon with lemon herbs",
    image: "images/grilled-salmon.webp",
    category: "main course",
    tags: ["main course"],
    todaysSpecial: true,
  },
  {
    id: 2,
    name: "Crispy Calamari",
    price: 14.99,
    description: "Fresh squid rings with marinara sauce and lemon aioli",
    image: "images/crispy-calamari.webp",
    category: "appetizer",
    tags: ["appetizer"],
  },
  {
    id: 3,
    name: "Buffalo Wings",
    price: 11.99,
    description: "Spicy buffalo wings with blue cheese dip and celery sticks",
    image: "images/buffalo-wings.webp",
    category: "appetizer",
    tags: ["appetizer"],
  },
  {
    id: 4,
    name: "Atlantic Grilled Salmon",
    price: 24.99,
    description:
      "Fresh salmon fillet with lemon herbs, roasted vegetables, and quinoa",
    image: "images/grilled-salmon.webp",
    category: "main course",
    tags: ["main course"],
  },
  {
    id: 5,
    name: "Beef Tenderloin",
    price: 32.99,
    description:
      "8oz prime cut with garlic mashed potatoes and red wine reduction",
    image: "images/beef-tenderloin.webp",
    category: "main course",
    tags: ["main course"],
    featured: true,
  },
  {
    id: 6,
    name: "Truffle Fettuccine",
    price: 28.99,
    description: "Homemade pasta with black truffle sauce and parmesan cheese",
    image: "images/truffle-fettucine.webp",
    category: "main course",
    tags: ["main course"],
    todaysSpecial: true,
  },
  {
    id: 7,
    name: "Seafood Risotto",
    price: 26.99,
    description: "Creamy risotto with prawns, scallops, and fresh herbs",
    image: "images/seafood-risoto.webp",
    category: "main course",
    tags: ["main course"],
  },
  {
    id: 8,
    name: "New York Cheesecake",
    price: 9.99,
    description: "Creamy cheesecake with fresh berry compote",
    image: "images/newyork-cheesecake.webp",
    category: "dessert",
    tags: ["dessert"],
  },
  {
    id: 9,
    name: "Chocolate Lava Cake",
    price: 12.99,
    description: "Warm chocolate cake with molten center and vanilla ice cream",
    image: "images/chocolate-cake-lava.webp",
    category: "dessert",
    tags: ["dessert", "main course"],
    todaysSpecial: true,
  },
  {
    id: 10,
    name: "Mediterranean Bowl",
    price: 22.99,
    description: "Quinoa, roasted vegetables, hummus, and tahini dressing",
    image: "images/seafood-risoto.webp",
    category: "main course",
    tags: ["main course"],
  },
  {
    id: 11,
    name: "Fresh Juices",
    price: 5.99,
    description: "Orange, apple, or mixed berry fresh-squeezed juice",
    image: "images/fruit-juice.webp",
    category: "drink",
    tags: ["drink", "dessert"],
  },
  {
    id: 12,
    name: "Signature Cocktails",
    price: 12.99,
    description: "Ask your server for our seasonal cocktail selection",
    image: "images/signature-cocktails.webp",
    category: "drink",
    tags: ["drink"],
  },
  {
    id: 13,
    name: "Duck Confit",
    price: 29.99,
    description: "Slow-cooked duck leg with cherry sauce and roasted potatoes",
    image: "images/duck-confit.webp",
    category: "main course",
    tags: ["main course", "appetizer"],
    featured: true,
  },
  {
    id: 14,
    name: "Vegetarian Delight",
    price: 19.99,
    description: "Grilled portobello mushroom with seasonal vegetables",
    image: "images/grilled-salmon.webp",
    category: "main course",
    tags: ["main course", "appetizer"],
    featured: true,
  },
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem("tastybites-cart")) || [];

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
  currentYear.innerHTML = new Date().getFullYear();

  // Load content based on current page
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  if (currentPage === "index.html" || currentPage === "") {
    loadHomepageContent();
  } else if (currentPage === "menu.html") {
    loadMenuContent();
    setupMenuFilters();
  } else if (currentPage === "order.html") {
    loadOrderPage();
  } else if (currentPage === "contact.html") {
    setupContactForm();
  }
});

// Homepage content loading
function loadHomepageContent() {
  // Load Today's Special
  const todaysSpecialContainer = document.getElementById("todaysSpecial");
  if (todaysSpecialContainer) {
    const todaysSpecialItems = menuData
      .filter((item) => item.todaysSpecial)
      .slice(0, 6);
    todaysSpecialContainer.innerHTML = todaysSpecialItems
      .map((item) => createMenuItemHTML(item))
      .join("");
  }

  // Load Featured Dishes
  const featuredContainer = document.getElementById("featuredDishes");
  if (featuredContainer) {
    const featuredItems = menuData.filter((item) => item.featured).slice(0, 4);
    featuredContainer.innerHTML = featuredItems
      .map((item) => createMenuItemHTML(item))
      .join("");
  }
}

// Menu page content loading
function loadMenuContent() {
  const menuContainer = document.getElementById("menuItems");
  if (menuContainer) {
    displayMenuItems(menuData);
  }
}

// Create menu item HTML
function createMenuItemHTML(item) {
  return `
        <div class="menu-item" data-category="${item.category}">
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3>${item.name}</h3>
                    <span class="menu-item-price">$${item.price.toFixed(
                      2
                    )}</span>
                </div>
                <p>${item.description}</p>
                <div class="menu-item-tags">
                    ${item.tags
                      .map(
                        (tag) =>
                          `<span class="tag ${tag.replace(
                            " ",
                            "-"
                          )}">${tag}</span>`
                      )
                      .join("")}
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${
                  item.id
                })">Add to Cart</button>
            </div>
        </div>
    `;
}

// Display menu items
function displayMenuItems(items) {
  const menuContainer = document.getElementById("menuItems");
  if (menuContainer) {
    menuContainer.innerHTML = items
      .map((item) => createMenuItemHTML(item))
      .join("");
  }
}

// Menu filtering
function setupMenuFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const category = this.getAttribute("data-category");
      filterMenuItems(category);
    });
  });
}

function filterMenuItems(category) {
  let filteredItems;

  if (category === "all") {
    filteredItems = menuData;
  } else {
    filteredItems = menuData.filter((item) => item.category === category);
  }

  displayMenuItems(filteredItems);
}

// Cart functions
function addToCart(itemId) {
  const item = menuData.find((item) => item.id === itemId);
  if (!item) return;

  const existingItem = cart.find((cartItem) => cartItem.id === itemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...item,
      quantity: 1,
    });
  }

  saveCart();
  updateCartUI();

  // Show feedback
  showAddToCartFeedback();
}

function removeFromCart(itemId) {
  cart = cart.filter((item) => item.id !== itemId);
  saveCart();
  updateCartUI();
}

function updateQuantity(itemId, change) {
  const item = cart.find((cartItem) => cartItem.id === itemId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(itemId);
  } else {
    saveCart();
    updateCartUI();
  }
}

function saveCart() {
  localStorage.setItem("tastybites-cart", JSON.stringify(cart));
}

function updateCartUI() {
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) {
    cartCount.textContent = totalItems;
  }

  // Update cart items
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML =
        '<p class="empty-cart">Your cart is empty. <a href="menu.html">Browse our menu</a> to add items.</p>';
    } else {
      cartItems.innerHTML = cart
        .map(
          (item) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)} each</p>
                        <div class="cart-item-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${
                              item.id
                            }, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${
                              item.id
                            }, 1)">+</button>
                            <button class="remove-item" onclick="removeFromCart(${
                              item.id
                            })">Remove</button>
                        </div>
                    </div>
                </div>
            `
        )
        .join("");
    }
  }

  // Update cart total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (cartTotal) {
    cartTotal.textContent = total.toFixed(2);
  }

  // Update order page if present
  updateOrderSummary();
}

function toggleCart() {
  cartSidebar.classList.toggle("open");
  cartOverlay.classList.toggle("open");
  document.body.style.overflow = cartSidebar.classList.contains("open")
    ? "hidden"
    : "";
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  window.location.href = "order.html";
}

function showAddToCartFeedback() {
  // Simple feedback - could be enhanced with a toast notification
  const button = event.target;
  const originalText = button.textContent;
  button.textContent = "Added!";
  button.style.backgroundColor = "#28a745";

  setTimeout(() => {
    button.textContent = originalText;
    button.style.backgroundColor = "";
  }, 1000);
}

// Mobile menu toggle
function toggleMobileMenu() {
  mobileMenu.classList.toggle("open");
}

// Order page functionality
function loadOrderPage() {
  updateOrderSummary();
  setupOrderForm();
}

function updateOrderSummary() {
  const orderSummaryItems = document.getElementById("orderSummaryItems");
  const orderSubtotal = document.getElementById("orderSubtotal");
  const orderTax = document.getElementById("orderTax");
  const orderTotal = document.getElementById("orderTotal");
  const placeOrderBtn = document.querySelector(".place-order-btn");

  if (!orderSummaryItems) return;

  if (cart.length === 0) {
    orderSummaryItems.innerHTML =
      '<p class="empty-cart">Your cart is empty. <a href="menu.html">Browse our menu</a> to add items.</p>';
    if (placeOrderBtn) placeOrderBtn.disabled = true;
    return;
  }

  // Enable place order button
  if (placeOrderBtn) placeOrderBtn.disabled = false;

  // Display cart items
  orderSummaryItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
            </div>
            <div class="cart-item-total">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    `
    )
    .join("");

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const deliveryFee =
    document.querySelector('input[name="orderType"]:checked')?.value ===
    "delivery"
      ? 3.99
      : 0;
  const total = subtotal + tax + deliveryFee;

  if (orderSubtotal) orderSubtotal.textContent = subtotal.toFixed(2);
  if (orderTax) orderTax.textContent = tax.toFixed(2);
  if (orderTotal) orderTotal.textContent = total.toFixed(2);

  // Show/hide delivery fee
  const deliveryFeeElements = document.querySelectorAll(".delivery-fee");
  deliveryFeeElements.forEach((el) => {
    el.style.display = deliveryFee > 0 ? "flex" : "none";
  });
}

function setupOrderForm() {
  const orderTypeRadios = document.querySelectorAll('input[name="orderType"]');
  const deliveryOnlyFields = document.querySelectorAll(".delivery-only");

  orderTypeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      const isDelivery = this.value === "delivery";

      deliveryOnlyFields.forEach((field) => {
        field.style.display = isDelivery ? "block" : "none";
        const input = field.querySelector("textarea");
        if (input) {
          input.required = isDelivery;
        }
      });

      updateOrderSummary();
    });
  });
}

function placeOrder() {
  const form = document.getElementById("orderForm");
  const formData = new FormData(form);

  // Basic form validation
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Simulate order placement
  const orderData = {
    items: cart,
    customerInfo: Object.fromEntries(formData),
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    orderTime: new Date().toISOString(),
  };

  // In a real app, this would be sent to a server
  console.log("Order placed:", orderData);

  // Clear cart and show success message
  cart = [];
  saveCart();
  updateCartUI();

  alert(
    "Order placed successfully! We will contact you shortly with confirmation."
  );
  form.reset();
  updateOrderSummary();
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

// Contact form functionality
function setupContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const contactData = Object.fromEntries(formData);

      // In a real app, this would be sent to a server
      console.log("Contact form submitted:", contactData);

      alert("Thank you for your message! We will get back to you soon.");
      this.reset();
    });
  }
}

// Close mobile menu when clicking on a link
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("mobile-nav-link")) {
    mobileMenu.classList.remove("open");
  }
});

// Close cart when clicking outside
document.addEventListener("click", (e) => {
  if (!cartSidebar.contains(e.target) && !e.target.closest(".cart-icon")) {
    if (cartSidebar.classList.contains("open")) {
      toggleCart();
    }
  }
});
