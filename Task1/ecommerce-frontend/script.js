let currentPage = 1;
const productsPerPage = 5;
let cart = [];

// Fetch products from the backend
async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:5000/api/products");
    if (!response.ok) throw new Error("Network response was not ok");
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Display products on the page
async function displayProducts() {
  const products = await fetchProducts();
  if (!products || products.length === 0) {
    console.error("No products to display");
    return;
  }

  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const paginatedProducts = products.slice(start, end);

  paginatedProducts.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick='addToCart(${JSON.stringify(
              product
            )})'>Add to Cart</button>
        `;
    productList.appendChild(productDiv);
  });

  updatePagination(products.length);
}

// Update pagination controls
function updatePagination(totalProducts) {
  const pagination = document.getElementById("pagination");
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.onclick = () => {
      currentPage = i;
      displayProducts();
    };
    pagination.appendChild(pageButton);
  }
}

// Add product to cart and update count
function addToCart(product) {
  cart.push(product);
  alert(`${product.name} has been added to your cart!`);
  updateCartCount(); // Update the cart count display
}

// Update cart item count display
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  cartCountElement.innerText = cart.length; // Set the text to the number of items in the cart
}

// Open the cart modal
function openModal() {
  const modal = document.getElementById("cart-modal");
  modal.style.display = "block";
  displayCartItems(); // Display items in the cart
}

// Close the cart modal
function closeModal() {
  const modal = document.getElementById("cart-modal");
  modal.style.display = "none";
}

// Display items in the cart modal
function displayCartItems() {
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = "";
  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item"; // Add class for styling
    itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50">
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button class="remove-button" onclick="removeFromCart(${index})">Remove</button>
        `;
    cartItemsDiv.appendChild(itemDiv);
  });
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1); // Remove item from cart array
  updateCartCount(); // Update cart count display
  displayCartItems(); // Refresh cart display
}

// Handle checkout action
function checkout() {
  alert("Proceeding to checkout!");
  closeModal();
}

// Load products on page load
document.addEventListener("DOMContentLoaded", displayProducts);
