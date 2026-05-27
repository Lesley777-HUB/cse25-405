/* 
   CART SYSTEM
 */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* Update cart count in navbar */
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        let totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        cartCount.textContent = totalItems;
    }
}

/* Save cart to localStorage */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

/* Add products to cart */
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
        const name = this.getAttribute("data-name");
        const price = Number(this.getAttribute("data-price"));
        const image = this.getAttribute("data-image");

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }

        saveCart();

        this.textContent = "Added ✓";

        setTimeout(() => {
            this.textContent = "Add to Cart";
        }, 1000);
    });
});

updateCartCount();


/* 
   CART PAGE DISPLAY
 */

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function displayCartItems() {
    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="alert alert-info text-center">
                Your cart is empty.
            </div>
        `;

        if (cartTotal) {
            cartTotal.textContent = "0.00";
        }

        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        let quantity = item.quantity || 1;
        let itemTotal = item.price * quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="card mb-3 shadow-sm">
                <div class="row g-0 align-items-center">
                    <div class="col-md-2">
                        <img src="${item.image}" class="img-fluid rounded-start cart-img" alt="${item.name}">
                    </div>

                    <div class="col-md-4">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">P${item.price.toFixed(2)}</p>
                        </div>
                    </div>

                    <div class="col-md-3 text-center">
                        <p>Quantity: ${quantity}</p>
                    </div>

                    <div class="col-md-2 text-center">
                        <strong>P${itemTotal.toFixed(2)}</strong>
                    </div>

                    <div class="col-md-1 text-center">
                        <button class="btn btn-danger btn-sm remove-item" data-index="${index}">
                            X
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    if (cartTotal) {
        cartTotal.textContent = total.toFixed(2);
    }

    const removeButtons = document.querySelectorAll(".remove-item");

    removeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            cart.splice(index, 1);
            saveCart();
            displayCartItems();
            displayCheckoutItems();
        });
    });
}

displayCartItems();


/* ================================
   PRODUCT CATEGORY FILTERS
================================ */

const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {
    button.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter");

        filterButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");

        productCards.forEach(card => {
            const category = card.getAttribute("data-category");

            if (filter === "all" || category === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});


/* ================================
   CHECKOUT PAGE
================================ */

const checkoutItems = document.getElementById("checkout-items");
const checkoutSubtotal = document.getElementById("checkout-subtotal");
const checkoutDelivery = document.getElementById("checkout-delivery");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutAlert = document.getElementById("checkout-alert");

function displayCheckoutItems() {
    if (!checkoutItems) return;

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

    if (checkoutSubtotal) checkoutSubtotal.textContent = subtotal.toFixed(2);
    if (checkoutDelivery) checkoutDelivery.textContent = delivery === 0 ? "FREE" : "P" + delivery.toFixed(2);
    if (checkoutTotal) checkoutTotal.textContent = total.toFixed(2);
}

displayCheckoutItems();

if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
        e.preventDefault();

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
        cart = [];

        checkoutForm.reset();

        requiredFields.forEach(field => {
            field.classList.remove("is-valid", "is-invalid");
        });

        updateCartCount();
        displayCheckoutItems();
    });
}


/* ================================
   CONTACT PAGE FORM VALIDATION
================================ */

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


/* ================================
   FAQ ACCORDION
================================ */

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {
    question.addEventListener("click", function () {
        const faqItem = this.parentElement;
        faqItem.classList.toggle("active");
    });
});
