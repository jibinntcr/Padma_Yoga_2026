// 1. PRODUCT DATABASE
const products = [
    {
        id: 1,
        name: "Meditation / Contemplation Cards",
        price: 200,
        short: "Gentle companions offering a moment of clarity.",
        desc: "Meditation Cards act as gentle companions for professionals, students, and spiritual practitioners.",
        images: ["assets/images/shop/cards.jpeg", "assets/images/shop/cards2.jpeg"] 
    },
    {
        id: 2,
        name: "Natural Organic Vibhuti",
        price: 100,
        unit: "50g",
        short: "Sacred ash for purity and protection.",
        desc: "Vibhuti is a powerful yogic tool symbolizing purification.",
        images: ["assets/images/shop/vibhuti.jpeg"]
    },
    {
        id: 3,
        name: "Meditation Seat",
        price: 750,
        short: "Align your body and settle your mind.",
        desc: "A steady body leads to a steady mind.",
        images: ["assets/images/shop/seat.jpeg"]
    },
    {
        id: 4,
        name: "Rudraksha Japa Mala",
        price: 240,
        short: "A spiritual companion carrying ancient yogic wisdom.",
        desc: "Each bead holds a natural field that stabilizes the mind.",
        images: ["assets/images/shop/mala.jpeg"]
    },
    {
        id: 5,
        name: "Journaling Diary",
        price: 280,
        short: "A mirror for clarity, growth, and inner transformation.",
        desc: "Journaling creates a sacred pause to reflect and realign.",
        images: ["assets/images/shop/diary.jpeg", "assets/images/shop/diary2.jpeg"]
    },
    {
        id: 6,
        name: "Chakra Stones",
        price: 900,
        short: "Powerful tools for intuition and healing.",
        desc: "Enhance emotional stability and deepen meditation.",
        images: ["assets/images/shop/stones.jpeg"]
    },
    {
        id: 7,
        name: "Devi Mobile Pop Holder",
        price: 340,
        short: "Adorn your mobile with sacred presence.",
        desc: "Blends spiritual aesthetics with functionality.",
        images: ["assets/images/shop/mobile-holder.jpeg"]
    },
    {
        id: 8,
        name: "Short Stories of Wisdom",
        price: 200,
        short: "A collection of stories to ignite innocence.",
        desc: "Stories that came to the author in deep meditation.",
        images: ["assets/images/shop/book.jpeg", "assets/images/shop/book2.jpeg"]
    },
    {
        id: 9,
        name: "Guided Audio Practices",
        price: 1600,
        short: "Gentle offering from ancient spiritual lineages.",
        desc: "A guided relaxation and meditation practice.",
        images: ["assets/images/shop/audio.jpeg"]
    }
];

// 2. RENDER PRODUCTS
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('product-grid');
    
    // Only run this if the grid exists (prevents errors on Cart page)
    if (grid) {
        grid.innerHTML = products.map(p => {
            let imageHTML = '';

            if (p.images.length > 1) {
                // Logic for Carousel (Multiple Images)
                let slides = p.images.map((img, idx) => `
                    <div class="carousel-item ${idx === 0 ? 'active' : ''}">
                        <div class="product-image-container">
                            <img src="${img}" class="card-carousel-img" alt="${p.name}">
                        </div>
                    </div>
                `).join('');

                imageHTML = `
                    <div id="carousel-card-${p.id}" class="carousel slide" data-ride="carousel" data-interval="false">
                        <div class="carousel-inner">${slides}</div>
                        <a class="carousel-control-prev" href="#carousel-card-${p.id}" role="button" data-slide="prev">
                            <div class="flipkart-arrow-circle"><i class="fa-solid fa-chevron-left"></i></div>
                        </a>
                        <a class="carousel-control-next" href="#carousel-card-${p.id}" role="button" data-slide="next">
                            <div class="flipkart-arrow-circle"><i class="fa-solid fa-chevron-right"></i></div>
                        </a>
                    </div>
                `;
            } else {
                // Logic for Single Image
                imageHTML = `
                    <div class="product-image-container">
                        <img src="${p.images[0]}" class="card-carousel-img" alt="${p.name}">
                    </div>
                `;
            }

            return `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card product-card h-100">
                    ${imageHTML}
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title mt-2">${p.name}</h5>
                        <p class="card-text text-muted small">${p.short}</p>
                        <h5 class="price-tag mb-3">₹${p.price} <span style="font-size:0.8rem;color:#777">${p.unit ? '/' + p.unit : ''}</span></h5>
                        <div class="mt-auto">
                            <div class="d-flex align-items-center mb-3">
                                <input type="number" id="qty-${p.id}" class="form-control me-2" value="1" min="1" style="width: 70px;">
                                <button class="btn btn-outline-primary w-100" onclick="addToCart(${p.id}, event)">Add to Cart</button>
                            </div>
                            <button class="btn btn-link text-decoration-none p-0" onclick="openModal(${p.id})">Read More &rarr;</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }).join('');
    }

    // Run startup functions
    updateCartCount();
    updateCartDashboard(); 
    if (typeof renderCartTable === "function") renderCartTable();
});

// 3. CART LOGIC (With Error Handling)
function addToCart(id, event) {
    const qtyInput = document.getElementById(`qty-${id}`);
    
    // Safety Check: Does the input exist?
    if (!qtyInput) { console.error("Qty Input missing"); return; }
    
    let qty = parseInt(qtyInput.value);
    if (isNaN(qty) || qty < 1) { qty = 1; qtyInput.value = 1; }

    let cart = JSON.parse(localStorage.getItem('padmaCart')) || [];
    
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) { existingItem.qty += qty; } 
    else { cart.push({ id: id, qty: qty }); }
    
    localStorage.setItem('padmaCart', JSON.stringify(cart));
    
    // --- ANIMATIONS ---
    if(event && event.target) {
        animateButtonFeedback(event.target);
    }
    triggerCartEffect();
    
    updateCartCount();
    updateCartDashboard();
}

function animateButtonFeedback(btn) {
    const originalText = btn.innerHTML;
    btn.classList.add('btn-success-feedback');
    btn.innerHTML = '<i class="fa fa-check"></i> Added';
    setTimeout(() => {
        btn.classList.remove('btn-success-feedback');
        btn.innerHTML = originalText;
    }, 2000);
}

function triggerCartEffect() {
    const icon = document.getElementById('floating-cart-btn');
    if(icon) {
        icon.classList.remove('cart-wobble');
        void icon.offsetWidth; 
        icon.classList.add('cart-wobble');
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('padmaCart')) || [];
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const countBadge = document.getElementById('cart-count');
    if (countBadge) countBadge.innerText = totalQty;
}

// 4. CART DASHBOARD (Sticky Bottom Bar)
function updateCartDashboard() {
    const container = document.getElementById('cart-dashboard-section');
    if (!container) return; // Stop if container is missing

    let cart = JSON.parse(localStorage.getItem('padmaCart')) || [];
    let html = '';

    if (cart.length > 0) {
        let thumbsHtml = '';
        const maxThumbs = 4;
        
        for(let i = 0; i < Math.min(cart.length, maxThumbs); i++) {
            const p = products.find(prod => prod.id === cart[i].id);
            if(p) {
                thumbsHtml += `<img src="${p.images[0]}" class="dash-thumb" alt="Item">`;
            }
        }
        if (cart.length > maxThumbs) {
            thumbsHtml += `<div class="dash-plus-badge">+${cart.length - maxThumbs}</div>`;
        }

        html = `
            <div class="cart-dashboard-container" data-aos="fade-up">
                <div class="cart-dash-text">
                    <h4>Your Selection</h4>
                    <p>${cart.length} item(s) selected.</p>
                </div>
                <div class="cart-dash-items">${thumbsHtml}</div>
                <div>
                    <a href="cart.html" class="dash-btn">Go to Cart <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        `;
    } else {
        html = `
            <div class="cart-dashboard-container" data-aos="fade-up">
                <div class="cart-dash-text">
                    <h4>Your Cart is Empty</h4>
                    <p>Select tools to support your inner journey.</p>
                </div>
                <div><a href="cart.html" class="dash-btn" style="background:#ddd;pointer-events:none;">Go to Cart</a></div>
            </div>
        `;
    }
    container.innerHTML = html;
}

// 5. MODAL LOGIC
function openModal(id) {
    const p = products.find(x => x.id === id);
    if(!p) return; 

    // Use jQuery safely if loaded, otherwise standard JS
    if (typeof $ !== 'undefined') {
        $('#modal-title').text(p.name);
        $('#modal-price').text('₹' + p.price);
        $('#modal-desc').text(p.desc);
        
        // Setup Carousel Indicators
        const indicators = document.getElementById('carousel-indicators');
        const inner = document.getElementById('carousel-inner');
        
        if(indicators && inner) {
            let indicatorsHtml = '';
            let innerHtml = '';

            p.images.forEach((img, index) => {
                indicatorsHtml += `<li data-target="#modalCarousel" data-slide-to="${index}" class="${index === 0 ? 'active' : ''}"></li>`;
                innerHtml += `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${img}" class="d-block w-100" style="height:300px; object-fit:contain;" alt="${p.name}">
                    </div>
                `;
            });
            indicators.innerHTML = indicatorsHtml;
            inner.innerHTML = innerHtml;
        }
        $('#productModal').modal('show');
    } else {
        console.error("jQuery is missing, cannot open modal.");
    }
}

// 6. CART TABLE (For cart.html)
function renderCartTable() {
    const tbody = document.getElementById('cart-table-body');
    const grandTotalEl = document.getElementById('grand-total');
    if (!tbody) return;

    let cart = JSON.parse(localStorage.getItem('padmaCart')) || [];
    let html = '';
    let grandTotal = 0;

    if(cart.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">Your cart is empty. <a href="shop.html">Go to Shop</a></td></tr>';
        if(grandTotalEl) grandTotalEl.innerText = "₹0";
        return;
    }

    cart.forEach((item, index) => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            const total = product.price * item.qty;
            grandTotal += total;
            html += `
                <tr>
                    <td>${product.name}</td>
                    <td>₹${product.price}</td>
                    <td>${item.qty}</td>
                    <td>₹${total}</td>
                    <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})"><i class="fa fa-trash"></i></button></td>
                </tr>
            `;
        }
    });

    tbody.innerHTML = html;
    if(grandTotalEl) grandTotalEl.innerText = "₹" + grandTotal;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('padmaCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('padmaCart', JSON.stringify(cart));
    renderCartTable();
    updateCartCount();
}