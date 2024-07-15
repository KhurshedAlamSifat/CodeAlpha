const products = [
  {
    id: 1,
    name: "Product 1",
    price: 89.99,
    image: "p1.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 199.99,
    image: "p2.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 59.99,
    image: "p3.jpg",
  },
  {
    id: 4,
    name: "Product 4",
    price: 39.99,
    image: "p4.jpg",
  },
  {
    id: 5,
    name: "Product 5",
    price: 25.99,
    image: "p5.jpg",
  },
  {
    id: 6,
    name: "Portable Charger",
    price: 15.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    name: "USB-C Hub",
    price: 29.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    name: "Ergonomic Chair",
    price: 299.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 9,
    name: "HD Webcam",
    price: 49.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 10,
    name: "Mechanical Keyboard",
    price: 79.99,
    image: "https://via.placeholder.com/150",
  },
];

let cartCount = 0;
let cartItems = [];
let currentPage = 1;
const productsPerPage = 5; // Show 5 products per page

function displayProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Clear previous products
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

  updatePagination();
}

function updatePagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ""; // Clear previous pagination
  const totalPages = Math.ceil(products.length / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.onclick = () => {
      currentPage = i;
      displayProducts();
    };
    pagination.appendChild(pageButton);
  }
}

function addToCart(product) {
  cartCount++;
  document.getElementById("cart-count").textContent = cartCount;
  cartItems.push(product);
  alert(`${product.name} has been added to your cart!`); // Optional alert for feedback
}

function removeFromCart(product) {
  cartItems = cartItems.filter((item) => item.id !== product.id);
  cartCount--;
  document.getElementById("cart-count").textContent = cartCount;
  showModal(); // Refresh modal display
}

function showModal() {
  const modal = document.getElementById("cart-modal");
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = ""; // Clear previous items

  if (cartItems.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cartItems.forEach((item) => {
      cartItemsDiv.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${
        item.name
      }" style="width: 50px; height: auto; margin-right: 10px;">
                    <span>${item.name} - $${item.price.toFixed(2)}</span>
                    <button onclick='removeFromCart(${JSON.stringify(
                      item
                    )})' style="margin-left: 10px;">Remove</button>
                </div>
            `;
    });
  }

  modal.style.display = "block"; // Show modal
}

function closeModal() {
  document.getElementById("cart-modal").style.display = "none"; // Hide modal
}

function checkout() {
  alert("Proceeding to checkout!");
  closeModal();
}

document.addEventListener("DOMContentLoaded", displayProducts);
