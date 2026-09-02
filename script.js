let cart = JSON.parse(localStorage.getItem("cart")) || [];



function addToCart(name, price) {

    const product = {
        name: name,
        price: Number(price)
    };

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    showSmallMessage(
        "☕ " + name + " додано до кошика!"
    );
}




function updateCartCount() {

    const count =
        document.getElementById("cart-count");

    if (count) {
        count.textContent = cart.length;
    }
}




function loadCart() {

    const cartItems =
        document.getElementById("cart-items");

    const totalElement =
        document.getElementById("total");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <h3>Ваш кошик порожній 🛒</h3>

                <p>
                    Додайте щось смачненьке
                    з нашого меню ☕
                </p>

            </div>
        `;

    } else {

     
        cart.forEach(function(item, index) {

            total += Number(item.price);

            cartItems.innerHTML += `

                <div class="cart-item">

                    <div>

                        <strong>
                            ${item.name}
                        </strong>

                        <span>
                            ${item.price} грн
                        </span>

                    </div>

                    <button
                        onclick="removeItem(${index})">

                        Видалити

                    </button>

                </div>

            `;

        });
    }


    if (totalElement) {

        totalElement.textContent =
            "Разом: " + total + " грн";

    }
}




function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    loadCart();
}


function clearCart() {

    cart = [];

    localStorage.removeItem("cart");

    updateCartCount();

    loadCart();
}

function placeOrder() {

    if (cart.length === 0) {

        showSmallMessage(
            "🛒 Спочатку додайте щось у кошик!"
        );

        return;
    }


    let total = 0;

    cart.forEach(function(item) {

        total += Number(item.price);

    });


    showOrderMessage(total);

    cart = [];

    localStorage.removeItem("cart");

    updateCartCount();

    loadCart();
}



function showSmallMessage(text) {

    const oldMessage =
        document.querySelector(".small-message");

    if (oldMessage) {
        oldMessage.remove();
    }


    const message =
        document.createElement("div");

    message.className =
        "small-message";


    message.innerHTML = `
        <span>${text}</span>
    `;


    document.body.appendChild(message);


    setTimeout(function() {

        message.classList.add("show");

    }, 10);


    setTimeout(function() {

        message.classList.remove("show");

        setTimeout(function() {

            message.remove();

        }, 400);

    }, 2500);
}



function showOrderMessage(total) {

    const oldMessage =
        document.querySelector(".order-message");

    if (oldMessage) {
        oldMessage.remove();
    }


    const message =
        document.createElement("div");

    message.className =
        "order-message";


    message.innerHTML = `

        <div class="order-icon">
            ☕
        </div>

        <div class="order-content">

            <h2>
                Дякуємо за ваше замовлення! 
            </h2>

            <p>
                Ваше замовлення вже готується!
            </p>

            <p>
                Очікуйте кур'єра —
                зовсім скоро він буде у вас ☕
            </p>

            <strong>
                Сума замовлення: ${total} грн
            </strong>

        </div>

        <button
            onclick="closeOrderMessage()">

            ×

        </button>

    `;


    document.body.appendChild(message);


    setTimeout(function() {

        message.classList.add("show");

    }, 10);

    setTimeout(function() {

        closeOrderMessage();

    }, 7000);
}


function closeOrderMessage() {

    const message =
        document.querySelector(".order-message");

    if (!message) {
        return;
    }


    message.classList.remove("show");


    setTimeout(function() {

        if (message) {
            message.remove();
        }

    }, 400);
}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        loadCart();

 const menuToggle =
            document.getElementById("menu-toggle");

        const navMenu =
            document.getElementById("nav-menu");

        if (menuToggle && navMenu) {

            menuToggle.addEventListener(
                "click",
                function() {

                    navMenu.classList.toggle("open");

                }
            );

        }

    }
);

