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

function toggleDropshipperInputs() {
    const dropshipperInputs = document.getElementsByClassName('dropshipper-inputs');
    for (let i = 0; i < dropshipperInputs.length; i++) {
        dropshipperInputs[i].style.display = document.getElementById('dropshipper').checked ? '' : 'none';
    }
}

function validateAndLanjut() {
    var quantity = document.getElementById("quantity").value;

    if (quantity === "" || parseInt(quantity) <= 0) {
        alert("Silahkan masukkan jumlah pesanan.");
    } else {
        lanjutKeInformasiPembeli();
    }
}

function lanjutKeInformasiPembeli() {
    const productImage = document.querySelector('.product-image').innerHTML;
    const productName = document.querySelector('.product-title').innerText;
    const productPrice = document.querySelector('.product-price').innerText;
    const selectedSize = document.getElementById('size').value;
    const selectedQuantity = document.getElementById('quantity').value;

    const productInfo = {
        image: productImage,
        name: productName,
        price: productPrice,
        size: selectedSize,
        quantity: selectedQuantity
    };

    localStorage.setItem('selectedProduct', JSON.stringify(productInfo));

    window.location.href = '../checkout/informasiPembeli.html';
}

function lanjutKePengiriman() {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const province = document.getElementById('province').value;
    const city = document.getElementById('city').value;
    const address = document.getElementById('address').value;
    const postalCode = document.getElementById('postalCode').value;
    const telepon = document.getElementById('telepon').value;
    const isDropshipper = document.getElementById('dropshipper').checked;
    const dropshipperName = document.getElementById('dropshipperName').value;
    const shippingPhone = document.getElementById('shippingPhone').value;

    localStorage.setItem('customerInfo', JSON.stringify({
        email,
        name,
        province,
        city,
        address,
        postalCode,
        telepon,
        isDropshipper,
        dropshipperName,
        shippingPhone
    }));
    
    window.location.href = 'metodePengiriman.html';
}

function lanjutKeInvoice() {
    window.location.href = 'invoice.html';
}

function lanjutKePembayaran() {
    window.location.href = 'konfirmasiPembayaran.html';
}

function kembaliInformasiPembeli() {
    window.location.href = 'informasiPembeli.html';
}

function showDropdown() {
    var jneDropdown = document.getElementById("jneDropdown");
    var jntDropdown = document.getElementById("jntDropdown");
    var ninjaDropdown = document.getElementById("ninjaDropdown");
    var sicepatDropdown = document.getElementById("sicepatDropdown");
    var anterajaDropdown = document.getElementById("anterajaDropdown");
    var idDropdown = document.getElementById("idDropdown");

    var jneRadio = document.querySelector('input[name="metodePengiriman"][value="JNE"]');
    var jntRadio = document.querySelector('input[name="metodePengiriman"][value="J&T"]');
    var ninjaRadio = document.querySelector('input[name="metodePengiriman"][value="NINJA XPRESS"]');
    var sicepatRadio = document.querySelector('input[name="metodePengiriman"][value="SICEPAT EKSPRES"]');
    var anterajaRadio = document.querySelector('input[name="metodePengiriman"][value="anteraja"]');
    var idRadio = document.querySelector('input[name="metodePengiriman"][value="ID EXPRESS"]');

    jneDropdown.style.display = jneRadio.checked ? "flex" : "none";
    jntDropdown.style.display = jntRadio.checked ? "flex" : "none";
    ninjaDropdown.style.display = ninjaRadio.checked ? "flex" : "none";
    sicepatDropdown.style.display = sicepatRadio.checked ? "flex" : "none";
    anterajaDropdown.style.display = anterajaRadio.checked ? "flex" : "none";
    idDropdown.style.display = idRadio.checked ? "flex" : "none";

    const jneOptions = document.querySelectorAll('input[name="jneOption"]');
    jneOptions.forEach((option) => {
        option.addEventListener('change', (event) => {
            const rate = event.target.value;
            const serviceName = event.target.getAttribute('data-service');
            updateShippingRate(rate, `JNE - ${serviceName}`);
        });
    });    

    const jntOptions = document.querySelectorAll('input[name="J&TOption"]');
    jntOptions.forEach((option) => {
            option.addEventListener('change', (event) => {
            const rate = event.target.value;
            const serviceName = event.target.getAttribute('data-service');
            updateShippingRate(rate, `J&T Express - ${serviceName}`);
        });
    });

    const ninjaOptions = document.querySelectorAll('input[name="ninjaOptions"]');
    ninjaOptions.forEach((option) => {
        option.addEventListener('change', (event) => {
            const rate = event.target.value;
            const serviceName = event.target.getAttribute('data-service');
            updateShippingRate(rate, `Ninja Xpress - ${serviceName}`);
        });
    });

    const sicepatOptions = document.querySelectorAll('input[name="sicepatOptions"]');
    sicepatOptions.forEach((option) => {
        option.addEventListener('change', (event) => {
            const rate = event.target.value;
            const serviceName = event.target.getAttribute('data-service');
            updateShippingRate(rate, `SiCepat Ekspres - ${serviceName}`);
        });
    });

    const anterajaOptions = document.querySelectorAll('input[name="anterajaOptions"]');
    anterajaOptions.forEach((option) => {
        option.addEventListener('change', (event) => {
            const rate = event.target.value;
            const serviceName = event.target.getAttribute('data-service');
            updateShippingRate(rate, `Anteraja - ${serviceName}`);
        });
    });

    const IDOptions = document.querySelectorAll('input[name="IDOptions"]');
    IDOptions.forEach((option) => {
        option.addEventListener('change', (event) => {
            const rate = event.target.value;
            const serviceName = event.target.getAttribute('data-service');
            updateShippingRate(rate, `ID Express - ${serviceName}`);
        });
    });
}

function updateShippingRate(rate, serviceName) {
    shippingCost = parseFloat(rate.replace(',', ''));
    document.getElementById('shippingRate').innerText = `Rp${rate}`;
    document.getElementById('shippingService').innerText = serviceName;
    updateTotalPrice();
}

function updateTotalPrice() {
    const selectedProductInfo = localStorage.getItem('selectedProduct');
    if (selectedProductInfo) {
        const parsedInfo = JSON.parse(selectedProductInfo);

        const subtotal = parseFloat(parsedInfo.price.replace('Rp', '').replace(',', '')) * parsedInfo.quantity;
        const total = subtotal + shippingCost;

        const formattedSubtotal = `Rp${subtotal.toLocaleString()}.000`;
        const formattedTotal = `Rp${total.toLocaleString()}.000`;

        document.getElementById('subTotalPrice').innerText = formattedSubtotal;
        document.getElementById('TotalPrice').innerText = formattedTotal;
    }
}

function updateOnLoad() {
    const selectedProductInfo = localStorage.getItem('selectedProduct');
    if (selectedProductInfo) {
        const parsedInfo = JSON.parse(selectedProductInfo);

        document.getElementById('productImage').innerHTML = parsedInfo.image;
        document.getElementById('productName').innerText = parsedInfo.name;
        document.getElementById('productPrice').innerText = parsedInfo.price;
        document.getElementById('productQuantity').innerText = parsedInfo.quantity;

        const subtotal = parseFloat(parsedInfo.price.replace('Rp', '').replace(',', '')) * parsedInfo.quantity;
        const formattedSubtotal = `Rp${subtotal.toLocaleString()}.000`;
        document.getElementById('subTotalPrice').innerText = formattedSubtotal;

        const total = subtotal;
        const formattedTotal = `Rp${total.toLocaleString()}.000`;

        document.getElementById('TotalPrice').innerText = formattedTotal;
    }
}

window.onload = updateOnLoad;