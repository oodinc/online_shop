function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayRandomProducts(products) {
    const randomProductsContainer = document.getElementById('randomProducts');
    shuffleArray(products);

    // Display up to 3 random products
    for (let i = 0; i < Math.min(4, products.length); i++) {
        const product = products[i];
        const productCard = `
            <div class="col-md-3 mb-4">
                <a href="${product.link}" class="text-decoration-none text-dark">
                    <div class="card h-100 text-center">
                        <img src="${product.image}" class="card-img-top" alt="Product Image">
                        <div class="card-body">
                            <h2 class="card-title" style="color: #15003b;">${product.name}</h2>
                            <p class="card-text">${product.price}</p>
                        </div>
                    </div>
                </a>
            </div>`;
        randomProductsContainer.innerHTML += productCard;
    }
}

fetch('../index.html')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const productCards = Array.from(doc.querySelectorAll('.card'));

        // Extract product information (image, name, price, link)
        const products = productCards.map(card => ({
            image: card.querySelector('.card-img-top').src,
            name: card.querySelector('.card-title').textContent,
            price: card.querySelector('.card-text').textContent,
            link: card.closest('a').href
        }));

        displayRandomProducts(products);
    })
    .catch(error => console.error('Error fetching random products:', error));

    function redirectToCheckout() {
        // Redirect to the checkout page
        window.location.href = '../checkout/checkout.html';
    }