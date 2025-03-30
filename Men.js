function displayProducts(containerId, products, limit = 9) {
    const container = document.querySelector(containerId);
    if (!container) {
        console.error(`Container with ID '${containerId}' not found.`);
        return;
    }

    container.innerHTML = ''; // Clear existing content
    const MenProducts = products.filter(product => product.gender === "Men");
    const displayProducts = MenProducts.slice(0, limit);

    displayProducts.forEach(product => {
        // const productName = JSON.stringify(product.productName);  // Escape special characters

        const productHTML = `
    <div class="con-box">
        <div class="box-img" style="background-image: url('${product.imgUrl}')">
            <button onclick="addToCart('${product._id}', '${product.productName.replace(/'/g, "\\'")}', ${product.productPrize}, '${product.imgUrl}')">
                Add to Cart
            </button>
        </div>
        <div class="box-content">
            <h2>${product.productName}</h2>
            <span class="amount">₹${product.productPrize.toFixed(2)}</span>
            <span class="star">
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </span>
        </div>
    </div>
`;

        container.innerHTML += productHTML;
    });
}

// Function to fetch products from the backend
async function fetchProducts() {

    const container = document.querySelector(".four-container");

    const loaderHTML = `<div class="loader"></div>`;
    container.innerHTML = loaderHTML;
    
    try {
        const response = await fetch('https://plashoe-0ysc.onrender.com/api/products/GetProducts', {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const products = await response.json();
        console.log(products);  // Check the products in the console
        displayProducts(".four-container", products); // Call display function
    } catch (error) {
        console.log("The error is:", error);
    }
}

// Cart functionality using localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId, productName, price, image) {
    let cart = getCart();
    const existingProduct = cart.find(item => item.productId === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            productId,
            productName,
            price,
            image,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartDisplay();
    updateCartCount();
    updateCartTotal();
    console.log("Product added to cart:", cart);
    alert(`The product is added to cart successfully`);
}

function updateCartCount() {
    const cart = getCart();
    const cartCount = document.getElementById('C-Count');
    cartCount.textContent = cart.length;
}

// Update cart display
function updateCartDisplay() {
    const cart = getCart();
    const cartNote = document.getElementById('Cart-note');
    const cartContainer = document.querySelector('.cart-two');

    // Check if elements exist to avoid null errors
    if (!cartNote || !cartContainer) {
        console.warn("Cart elements not found in the DOM!");
        return;
    }

    if (cart.length === 0) {
        cartNote.style.display = 'block';

        // Remove only cart items without clearing #Cart-note
        const cartItems = cartContainer.querySelectorAll('.cart-item');
        cartItems.forEach(item => item.remove());
        return;
    }

    cartNote.style.display = 'none';

    // Remove existing cart items before adding new ones
    const cartItems = cartContainer.querySelectorAll('.cart-item');
    cartItems.forEach(item => item.remove());

    // Add new items to the cart
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <div class="item-img">
                <img src="${item.image}" alt="${item.productName}">
            </div>
            <div class="item-info">
                <h3>${item.productName}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
            </div>
            <div class="item-counter">
                <button onclick="updateQuantity('${item.productId}', -1)">
                    <i class="fa-solid fa-minus"></i>
                </button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity('${item.productId}', 1)">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });
}



function checkProfileAccess() {
    console.log("Started checking the profile access...");
    const profileBtn = document.getElementById('profile-btn');

    if (!profileBtn) {
        console.error("Profile button not found. Make sure the button with ID 'profile-btn' exists.");
        return;
    }

    // Check access token
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.warn("No access token found. Redirecting to login...");
        profileBtn.setAttribute('href', '/login.html');
        return;
    }

    console.log("Access token found:", accessToken);

    // Verify token by fetching the profile
    fetch('https://plashoe-0ysc.onrender.com/api/user/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        if (response.ok) {
            console.log("Token is valid. Redirecting to profile...");
            profileBtn.setAttribute('href', '/profile.html');
        } else {
            console.warn("Invalid or expired token. Redirecting to login...");
            localStorage.removeItem('accessToken');
            profileBtn.setAttribute('href', '/login.html');
        }
    })
    .catch((error) => {
        console.error("Network error:", error);
        profileBtn.setAttribute('href', '/login.html');
    });
}

// Update item quantity in cart
function updateQuantity(productId, change) {
    let cart = getCart();
    const item = cart.find(item => item.productId === productId);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.productId !== productId);
        }
    }

    saveCart(cart);
    updateCartDisplay();
    updateCartCount();
    updateCartTotal();
}

// This function is used for updating cart total 
function updateCartTotal() {
    const cart = getCart();
    const cartTotal = document.getElementById('Cart-total');

    if (!cartTotal) return console.log('CartToal element not found');

    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartTotal.textContent = total.toFixed(2);
} 

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateCartDisplay();
    updateCartCount();
    checkProfileAccess();
    updateCartTotal();
});

