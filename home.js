
document.addEventListener("DOMContentLoaded", () => {
    // Variáveis principais
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotalElement = document.querySelector(".cart-total");
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const checkoutButton = document.querySelector(".checkout-button");
    const reviewForm = document.querySelector(".review-form");

    // Estado do carrinho
    let cart = [];

    // Atualiza a interface do carrinho
    function updateCartUI() {
        cartItemsContainer.innerHTML = ""; // Limpa os itens existentes
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            // Cria o item do carrinho
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-quantity">Quantidade: ${item.quantity}</p>
                    <p class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button class="remove-item" data-index="${index}">Remover</button>
            `;

            cartItemsContainer.appendChild(cartItem);
        });

        // Atualiza o total
        cartTotalElement.textContent = `Total: R$ ${total.toFixed(2)}`;

        // Adiciona os eventos de remoção
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", removeItemFromCart);
        });
    }

    function showNotification(message) {
        const notification = document.createElement("div");
        notification.className = "notification";
        notification.textContent = message;
    
        // Adiciona a notificação ao corpo do documento
        document.body.appendChild(notification);
    
        // Remove a notificação após 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    // Adiciona um item ao carrinho
    function addToCart(event) {
        const button = event.target;
        const productName = button.getAttribute("data-product");
        const productPrice = parseFloat(button.getAttribute("data-price"));
        const productImage = button.parentElement.querySelector("img").getAttribute("src");

        // Verifica se o item já está no carrinho
        const existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1,
                image: productImage,
            });
        }
        
        // Atualiza o carrinho na interface
        updateCartUI();

        showNotification(`${productName} foi adicionado ao carrinho!`);
    }

    // Remove um item do carrinho
    function removeItemFromCart(event) {
        const button = event.target;
        const index = button.getAttribute("data-index");

        // Remove o item do array do carrinho
        cart.splice(index, 1);

        // Atualiza o carrinho na interface
        updateCartUI();
    }

    // Finaliza a compra
    function checkout() {
        if (cart.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        alert("Compra realizada com sucesso! Obrigado por escolher a Cupcake Express.");
        cart = []; // Limpa o carrinho
        updateCartUI();
    }

    // Submete a avaliação
    function submitReview(event) {
        event.preventDefault();

        const name = reviewForm.querySelector("#name").value;
        const rating = reviewForm.querySelector("#rating").value;
        const comment = reviewForm.querySelector("#comment").value;

        if (!name || !rating || !comment) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        // Exibe a avaliação como confirmação
        alert(`Obrigado por sua avaliação, ${name}!\nNota: ${rating} estrelas\nComentário: ${comment}`);

        // Limpa o formulário
        reviewForm.reset();
    }

    // Eventos principais
    addToCartButtons.forEach(button => {
        button.addEventListener("click", addToCart);
    });

    checkoutButton.addEventListener("click", checkout);

    reviewForm.addEventListener("submit", submitReview);
});

// Ativação do menu responsivo
const navbar = document.querySelector(".navbar");
const menuButton = document.querySelector(".menu-button");

menuButton.addEventListener("click", () => {
    navbar.classList.toggle("show-menu");
});
 

// Seleciona todos os links do menu
const menuLinks = document.querySelectorAll(".menu-item a");

// Adiciona o comportamento de rolagem suave
menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault(); // Evita o comportamento padrão
        const sectionId = link.getAttribute("href").substring(1); // Remove o "#" do href
        const section = document.getElementById(sectionId);

        if (section) {
            e.preventDefault();
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

const gallery = document.querySelector(".cols-3");
const cupcakes = gallery.querySelectorAll("img");

cupcakes.forEach(cupcake => {
    cupcake.addEventListener("click", () => {
        alert(`Você clicou em um cupcake!`);
        
    });
});

//  Aplica desconto de 10% em todos os produtos
const discountButton = document.createElement("button");
discountButton.innerText = "Ativar Promoção (10%)";
discountButton.style.cssText = `
    display: block;
    margin: 1rem auto;
    background-color: #ff69b4;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

document.querySelector(".pink-background").appendChild(discountButton);

discountButton.addEventListener("click", () => {
    const productPrices = document.querySelectorAll(".product-price");

    productPrices.forEach((priceElement) => {
        const currentPrice = parseFloat(priceElement.textContent.replace("R$", "").replace(",", "."));
        const discountedPrice = (currentPrice * 0.9).toFixed(2).replace(".", ",");
        priceElement.textContent = `R$ ${discountedPrice}`;
    });

    alert("Promoção de 10% aplicada em todos os produtos!");
});
function showNotification(message) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.padding = "1rem";
    notification.style.backgroundColor = "#ff69b4";
    notification.style.color = "#fff";
    notification.style.borderRadius = "5px";
    notification.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)";
    notification.style.zIndex = "1000";

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000); // Remove a notificação após 3 segundos
}

// Feedback visual ao adicionar ao carrinho
addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const productCard = e.target.closest(".product");
        productCard.style.transform = "scale(1.1)";
        productCard.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.3)";

        setTimeout(() => {
            productCard.style.transform = "scale(1)";
            productCard.style.boxShadow = "none";
        }, 300);
    });
});
const checkoutButton = document.querySelector(".checkout-button");

checkoutButton.addEventListener("click", async () => {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    try {
        const response = await fetch("/pedidos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ items: cart }),
        });

        if (!response.ok) throw new Error("Erro ao processar pedido");

        alert("Pedido realizado com sucesso!");
        cart = []; // Limpa o carrinho
        updateCartUI();
    } catch (error) {
        console.error("Erro ao realizar pedido:", error);
        alert("Não foi possível processar seu pedido. Tente novamente mais tarde.");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    // Se o usuário não estiver logado (não houver dados no localStorage), redirecione para a página de login
    if (!usuario) {
        window.location.href = "index.html";
        return;
    }

    // Exibe as informações do usuário na área de perfil
    document.getElementById("profileName").textContent = usuario.nome;
    document.getElementById("profileEmail").textContent = usuario.email;
    document.getElementById("profileAddress").textContent = usuario.endereco;

    // evento de logout
    document.getElementById("logoutButton").addEventListener("click", () => {
        // Limpa os dados do usuário no localStorage e redireciona para o login
        localStorage.removeItem("usuario");
        window.location.href = "index.html";
    });
});

