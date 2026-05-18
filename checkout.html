let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: Number(price),
            image: image,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();

    alert(name + " has been added to your cart.");
}

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
        const name = this.dataset.name;
        const price = this.dataset.price;
        const image = this.dataset.image;

        addToCart(name, price, image);
    });
});

function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="alert alert-warning text-center">
                Your cart is empty.
            </div>
        `;

        if (cartTotal) cartTotal.textContent = "0.00";
        if (checkoutBtn) checkoutBtn.classList.add("disabled");

        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItemsContainer.innerHTML += `
            <div class="card mb-3 shadow-sm">
                <div class="row g-0 align-items-center">
                    <div class="col-md-2">
                        <img src="${item.image}" class="img-fluid rounded-start cart-img" alt="${item.name}">
                    </div>

                    <div class="col-md-4">
                        <div class="card-body">
                            <h5>${item.name}</h5>
                            <p>P${item.price.toFixed(2)}</p>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <input 
                            type="number" 
                            min="1" 
                            value="${item.quantity}" 
                            class="form-control quantity-input"
                            onchange="updateQuantity(${index}, this.value)">
                    </div>

                    <div class="col-md-2 text-center">
                        <strong>P${itemTotal.toFixed(2)}</strong>
                    </div>

                    <div class="col-md-1 text-center">
                        <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">X</button>
                    </div>
                </div>
            </div>
        `;
    });

    if (cartTotal) {
        cartTotal.textContent = total.toFixed(2);
    }
}

function updateQuantity(index, quantity) {
    cart[index].quantity = Number(quantity);

    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }

    saveCart();
    displayCartItems();
    updateCartCount();
}

function removeItem(index) {
    cart.splice(index, 1);

    saveCart();
    displayCartItems();
    displayCheckoutSummary();
    updateCartCount();
}

function displayCheckoutSummary() {
    const checkoutSummary = document.getElementById("checkout-summary");
    const checkoutTotal = document.getElementById("checkout-total");

    if (!checkoutSummary) return;

    checkoutSummary.innerHTML = "";

    if (cart.length === 0) {
        checkoutSummary.innerHTML = `
            <div class="alert alert-warning">
                No items in cart.
            </div>
        `;

        if (checkoutTotal) checkoutTotal.textContent = "0.00";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        checkoutSummary.innerHTML += `
            <div class="d-flex justify-content-between mb-2">
                <span>${item.name} x ${item.quantity}</span>
                <span>P${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });

    if (checkoutTotal) {
        checkoutTotal.textContent = total.toFixed(2);
    }
}

const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const order = {
            name: document.getElementById("customer-name").value,
            email: document.getElementById("customer-email").value,
            phone: document.getElementById("customer-phone").value,
            address: document.getElementById("customer-address").value,
            paymentMethod: document.getElementById("payment-method").value,
            items: cart,
            date: new Date().toLocaleString()
        };

        localStorage.setItem("lastOrder", JSON.stringify(order));

        cart = [];
        saveCart();

        document.getElementById("order-success").classList.remove("d-none");
        checkoutForm.reset();

        displayCheckoutSummary();
        updateCartCount();
    });
}

displayCartItems();
displayCheckoutSummary();
updateCartCount();
