// ===================================
// 1. FOOD DATA
// ===================================
const foods = [
    {
        id: 1,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 249,
        description: "Fresh cheese and tomato pizza",
        image: "img/1.jfif"
    },
    {
        id: 2,
        name: "Cheese Burger",
        category: "Burger",
        price: 149,
        description: "Juicy burger with cheese",
        image: "img/2.jfif"
    },
    {
        id: 3,
        name: "Chicken Biryani",
        category: "Biryani",
        price: 199,
        description: "Traditional spicy chicken biryani",
        image: "img/3.jfif"
    },
    {
        id: 4,
        name: "Pepperoni Pizza",
        category: "Pizza",
        price: 299,
        description: "Delicious pepperoni pizza",
        image: "img/4.jfif"
    },
    {
        id: 5,
        name: "Classic Burger",
        category: "Burger",
        price: 129,
        description: "Classic crispy burger",
        image: "img/5.jfif"
    },
    {
        id: 6,
        name: "Veg Biryani",
        category: "Biryani",
        price: 159,
        description: "Fresh vegetable biryani",
        image: "img/6.jfif"
    },
    {
        id: 7,
        name: "Cold Coffee",
        category: "Drinks",
        price: 99,
        description: "Refreshing chilled coffee",
        image: "img/7.jfif"
    },
    {
        id: 8,
        name: "Fresh Juice",
        category: "Drinks",
        price: 79,
        description: "Fresh and healthy fruit juice",
        image: "img/8.jfif"
    },
    {
        id: 9,
        name: "Double Cheese Burger",
        category: "Burger",
        price: 199,
        description: "Double cheese and crispy patty",
        image: "img/9.jfif"
    }
];
// ===================================
// 2. SELECT HTML ELEMENTS
// ===================================
const foodContainer = document.getElementById("foodContainer");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-btn");
const cartButton = document.getElementById("cartButton");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutForm = document.getElementById("checkoutForm");
// ===================================
// 3. CART DATA
// ===================================

let cart = [];

let selectedCategory = "All";


// ===================================
// 4. DISPLAY FOOD PRODUCTS
// ===================================

function displayFoods(products) {

    foodContainer.innerHTML = "";

    if (products.length === 0) {

        foodContainer.innerHTML =
            `<p class="no-results">No food items found!</p>`;

        return;
    }

    products.forEach(food => {

        const foodCard = document.createElement("div");

        foodCard.className = "food-card";

        foodCard.innerHTML = `
            <img src="${food.image}" alt="${food.name}">

            <div class="food-info">

                <h3>${food.name}</h3>

                <p>${food.description}</p>

                <div class="food-bottom">

                    <span class="food-price">
                        ₹${food.price}
                    </span>

                    <button class="add-btn"
                        data-id="${food.id}">
                        + Add
                    </button>

                </div>

            </div>
        `;

        foodContainer.appendChild(foodCard);

    });

}


// ===================================
// 5. CATEGORY FILTER
// ===================================

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterFoods();

    });

});


// ===================================
// 6. SEARCH FOOD
// ===================================

searchInput.addEventListener("input", filterFoods);


function filterFoods() {

    const searchText = searchInput.value.toLowerCase();

    const filteredFoods = foods.filter(food => {

        const matchesCategory =
            selectedCategory === "All" ||
            food.category === selectedCategory;

        const matchesSearch =
            food.name.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;

    });

    displayFoods(filteredFoods);

}


// ===================================
// 7. ADD TO CART
// ===================================

foodContainer.addEventListener("click", (event) => {

    const button = event.target.closest(".add-btn");

    if (!button) return;

    const foodId = Number(button.dataset.id);

    const selectedFood = foods.find(food => food.id === foodId);

    const existingItem = cart.find(item => item.id === foodId);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...selectedFood,
            quantity: 1
        });

    }

    updateCart();

});


// ===================================
// 8. UPDATE CART
// ===================================

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    let totalQuantity = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            `<p class="empty-cart">Your cart is empty!</p>`;

    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        totalQuantity += item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>₹${item.price * item.quantity}</p>

                <div class="quantity-controls">

                    <button data-action="decrease"
                        data-id="${item.id}">-</button>

                    <span>${item.quantity}</span>

                    <button data-action="increase"
                        data-id="${item.id}">+</button>

                </div>

            </div>

            <button class="remove-btn"
                data-action="remove"
                data-id="${item.id}">
                ✕
            </button>

        `;

        cartItems.appendChild(cartItem);

    });

    cartCount.textContent = totalQuantity;

    cartTotal.textContent = total;

    // Save cart data
    localStorage.setItem("foodieCart", JSON.stringify(cart));

}


// ===================================
// 9. CART QUANTITY CONTROLS
// ===================================

cartItems.addEventListener("click", (event) => {

    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const id = Number(button.dataset.id);

    const action = button.dataset.action;

    const item = cart.find(food => food.id === id);

    if (!item) return;

    if (action === "increase") {

        item.quantity++;

    }

    else if (action === "decrease") {

        item.quantity--;

        if (item.quantity <= 0) {

            cart = cart.filter(food => food.id !== id);

        }

    }

    else if (action === "remove") {

        cart = cart.filter(food => food.id !== id);

    }

    updateCart();

});


// ===================================
// 10. OPEN AND CLOSE CART
// ===================================

function openCart() {

    cartSidebar.classList.add("open");

    cartOverlay.classList.add("show");

}

function hideCart() {

    cartSidebar.classList.remove("open");

    cartOverlay.classList.remove("show");

}

cartButton.addEventListener("click", openCart);

closeCart.addEventListener("click", hideCart);

cartOverlay.addEventListener("click", hideCart);


// ===================================
// 11. CHECKOUT MODAL
// ===================================

checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Please add food items to your cart!");

        return;

    }

    hideCart();

    checkoutModal.classList.add("show");

});

closeCheckout.addEventListener("click", () => {

    checkoutModal.classList.remove("show");

});


// ===================================
// 12. PLACE ORDER
// ===================================

checkoutForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    const name = document.getElementById("customerName").value;

    const phone = document.getElementById("customerPhone").value;

    const address = document.getElementById("customerAddress").value;

    const orderTotal = cart.reduce((sum, item) => {

        return sum + item.price * item.quantity;

    }, 0);

    alert(
        `Thank you ${name}!\n\n` +
        `Your order has been placed successfully!\n\n` +
        `Phone: ${phone}\n` +
        `Address: ${address}\n` +
        `Total: ₹${orderTotal}\n\n` +
        `Thank you for ordering with Foodie!`
    );

    // Clear cart
    cart = [];

    updateCart();

    checkoutForm.reset();

    checkoutModal.classList.remove("show");

});


// ===================================
// 13. LOAD SAVED CART
// ===================================

try {

    const savedCart = JSON.parse(
        localStorage.getItem("foodieCart") || "[]"
    );

    if (Array.isArray(savedCart)) {

        cart = savedCart.filter(item => {

            const originalFood = foods.find(food => food.id === item.id);

            return originalFood &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0;

        }).map(item => {

            const originalFood = foods.find(food => food.id === item.id);

            return {
                ...originalFood,
                quantity: item.quantity
            };

        });

    }

} catch (error) {

    cart = [];

}


// ===================================
// 14. INITIALIZE WEBSITE
// ===================================

displayFoods(foods);

updateCart();