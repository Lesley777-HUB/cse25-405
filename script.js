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
    if (checkoutBtn) {
    checkoutBtn.classList.remove("disabled");
}
    if (checkoutBtn) {
        checkoutBtn.classList.remove("disabled");
    } 
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
/* WOMEN PAGE CATEGORY FILTER */
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {
    button.addEventListener("click", function () {
        const filter = this.dataset.filter;

        filterButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");

        productCards.forEach(card => {
            const category = card.dataset.category;

            if (filter === "all" || category === filter) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }
        });
    });
});
/* CONTACT PAGE FORM VALIDATION */
const contactForm = document.getElementById("contactForm");
const formAlert = document.getElementById("form-alert");
const clearFormBtn = document.getElementById("clearFormBtn");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const message = document.getElementById("message");

        let isValid = true;

        const fields = [firstName, lastName, email, phone, message];

        fields.forEach(field => {
            field.classList.remove("error", "success");

            if (field.value.trim() === "") {
                field.classList.add("error");
                isValid = false;
            } else {
                field.classList.add("success");
            }
        });

        if (!email.value.includes("@") || !email.value.includes(".")) {
            email.classList.add("error");
            email.classList.remove("success");
            isValid = false;
        }

        if (phone.value.trim().length < 7) {
            phone.classList.add("error");
            phone.classList.remove("success");
            isValid = false;
        }

        if (isValid) {
            formAlert.className = "alert alert-success";
            formAlert.textContent = "Thank you! Your message has been sent successfully.";

            contactForm.reset();

            fields.forEach(field => {
                field.classList.remove("error", "success");
            });
        } else {
            formAlert.className = "alert alert-danger";
            formAlert.textContent = "Please fill in all fields correctly before sending.";
        }
    });
}

if (clearFormBtn) {
    clearFormBtn.addEventListener("click", function () {
        contactForm.reset();

        document.querySelectorAll(".form-box input, .form-box textarea").forEach(field => {
            field.classList.remove("error", "success");
        });

        formAlert.className = "alert d-none";
        formAlert.textContent = "";
    });
}

/* FAQ ACCORDION */
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {
    question.addEventListener("click", function () {
        const faqItem = this.parentElement;
        faqItem.classList.toggle("active");
    });
});
/* CHECKOUT PAGE */
const checkoutItems = document.getElementById("checkout-items");
const checkoutSubtotal = document.getElementById("checkout-subtotal");
const checkoutDelivery = document.getElementById("checkout-delivery");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutAlert = document.getElementById("checkout-alert");

function displayCheckoutItems() {
    if (!checkoutItems) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    checkoutItems.innerHTML = "";

    if (cart.length === 0) {
        checkoutItems.innerHTML = `
            <p class="text-muted">Your cart is empty.</p>
            <a href="men.html" class="btn btn-dark w-100">Continue Shopping</a>
        `;

        if (checkoutSubtotal) checkoutSubtotal.textContent = "0.00";
        if (checkoutDelivery) checkoutDelivery.textContent = "P0.00";
        if (checkoutTotal) checkoutTotal.textContent = "0.00";
        return;
    }

    let subtotal = 0;

    cart.forEach(item => {
        let quantity = item.quantity || 1;
        let price = Number(item.price);
        subtotal += price * quantity;

        checkoutItems.innerHTML += `
            <div class="d-flex align-items-center justify-content-between mb-3">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>P${price.toFixed(2)} x ${quantity}</small>
                </div>
                <strong>P${(price * quantity).toFixed(2)}</strong>
            </div>
        `;
    });

    let delivery = subtotal >= 999 ? 0 : 60;
    let total = subtotal + delivery;

    checkoutSubtotal.textContent = subtotal.toFixed(2);
    checkoutDelivery.textContent = delivery === 0 ? "FREE" : "P" + delivery.toFixed(2);
    checkoutTotal.textContent = total.toFixed(2);
}

displayCheckoutItems();

if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
            checkoutAlert.className = "alert alert-danger";
            checkoutAlert.textContent = "Your cart is empty. Please add products before placing an order.";
            return;
        }

        const requiredFields = [
            document.getElementById("checkoutFirstName"),
            document.getElementById("checkoutLastName"),
            document.getElementById("checkoutEmail"),
            document.getElementById("checkoutPhone"),
            document.getElementById("checkoutAddress"),
            document.getElementById("checkoutCity"),
            document.getElementById("paymentMethod")
        ];

        let isValid = true;

        requiredFields.forEach(field => {
            field.classList.remove("is-invalid", "is-valid");

            if (field.value.trim() === "") {
                field.classList.add("is-invalid");
                isValid = false;
            } else {
                field.classList.add("is-valid");
            }
        });

        const email = document.getElementById("checkoutEmail");
        const phone = document.getElementById("checkoutPhone");

        if (!email.value.includes("@") || !email.value.includes(".")) {
            email.classList.add("is-invalid");
            email.classList.remove("is-valid");
            isValid = false;
        }

        if (phone.value.trim().length < 7) {
            phone.classList.add("is-invalid");
            phone.classList.remove("is-valid");
            isValid = false;
        }

        if (!isValid) {
            checkoutAlert.className = "alert alert-danger";
            checkoutAlert.textContent = "Please fill in all required checkout details correctly.";
            return;
        }

        checkoutAlert.className = "alert alert-success";
        checkoutAlert.innerHTML = `
            Order placed successfully! Thank you for shopping with Orthodox Cowboy Clothing.
            <br>Your payment method: <strong>${document.getElementById("paymentMethod").value}</strong>
        `;

        localStorage.removeItem("cart");
        checkoutForm.reset();

        requiredFields.forEach(field => {
            field.classList.remove("is-valid", "is-invalid");
        });

        displayCheckoutItems();

        if (typeof updateCartCount === "function") {
            updateCartCount();
        }
    });
}
