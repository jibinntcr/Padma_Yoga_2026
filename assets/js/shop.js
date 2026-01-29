/* ========================================================
   1. PRODUCT DATABASE
   Updated to support multiple images for specific products.
   ======================================================== */
const products = [
    {
        id: 1,
        name: "Meditation Cards",
        price: 200,
        short: "Gentle companions for clarity.",
        desc: "Meditation Cards act as gentle companions for professionals, students, and spiritual practitioners. Each card carries a short quote or mindful reminder designed to shift your awareness from stress to stillness.",
        images: ["assets/images/shop/cards.jpeg", "assets/images/shop/cards2.jpeg"] 
    },
    {
        id: 2,
        name: "Natural Organic Vibhuti",
        price: 100,
        unit: "50g",
        short: "Sacred ash for purity and protection.",
        desc: "Vibhuti is a powerful yogic tool symbolizing purification. Made from natural organic sources through traditional methods.",
        images: ["assets/images/shop/vibhuti.jpeg"]
    },
    {
        id: 3,
        name: "Meditation Seat",
        price: 750,
        short: "Align your body and settle your mind.",
        desc: "A steady body leads to a steady mind. This seat supports your posture, eases discomfort, and allows energy to flow naturally.",
        images: ["assets/images/shop/seat.jpeg"]
    },
    {
        id: 4,
        name: "Rudraksha Japa Mala",
        price: 240,
        short: "A spiritual companion for focus.",
        desc: "Not just a counting tool, but a carrier of energy. Each bead holds a natural field that stabilizes the mind.",
        images: ["assets/images/shop/mala.jpeg"]
    },
    {
        id: 5,
        name: "Journaling Diary",
        price: 280,
        short: "A mirror for clarity and growth.",
        desc: "Journaling creates a sacred pause to reflect and realign. Use this as a Sadhana Journal to record insights.",
        images: ["assets/images/shop/diary.jpeg", "assets/images/shop/diary2.jpeg"]
    },
    {
        id: 6,
        name: "Chakra Stones",
        price: 900,
        short: "Tools for intuition and healing.",
        desc: "Enhance emotional stability and deepen meditation. These stones promote physical well-being.",
        images: ["assets/images/shop/stones.jpeg"]
    },
    {
        id: 7,
        name: "Devi Mobile Pop Holder",
        price: 340,
        short: "Sacred presence on your device.",
        desc: "Features sacred designs of Devi & Divinity. Reminds you of higher awareness every time you hold your phone.",
        images: ["assets/images/shop/mobile-holder.jpeg"]
    },
    {
        id: 8,
        name: "Short Stories of Wisdom",
        price: 200,
        short: "Stories to ignite innocence.",
        desc: "Stories that came to the author in deep meditation. Suitable for all ages to taste a new dimension of quietness.",
        images: ["assets/images/shop/book.jpeg", "assets/images/shop/book2.jpeg"]
    },
    {
        id: 9,
        name: "Guided Audio Practices",
        price: 1600,
        short: "Ancient techniques for peace.",
        desc: "A guided relaxation and meditation practice to help you live with clarity.",
        images: ["assets/images/shop/audio.jpeg"]
    }
];

/* ========================================================
   2. INITIALIZATION & RENDERING
   ======================================================== */
document.addEventListener('DOMContentLoaded', () => {
    
    // 2.1 Render Products (Only if on Shop Page)
    const grid = document.getElementById('product-grid');
    if (grid) {
        grid.innerHTML = products.map(p => {
            // Generate Carousel or Single Image
            let imageHTML = '';
            if (p.images.length > 1) {
                // Generate Indicators
                let indicators = p.images.map((_, idx) => 
                    `<li data-target="#carousel-${p.id}" data-slide-to="${idx}" class="${idx === 0 ? 'active' : ''}"></li>`
                ).join('');

                // Generate Slides
                let slides = p.images.map((img, idx) => 
                    `<div class="carousel-item ${idx === 0 ? 'active' : ''}">
                        <img src="${img}" class="d-block w-100" alt="${p.name}">
                     </div>`
                ).join('');

                imageHTML = `
                    <div id="carousel-${p.id}" class="carousel slide product-carousel" data-ride="carousel" data-interval="false">
                        <ol class="carousel-indicators">${indicators}</ol>
                        <div class="carousel-inner">${slides}</div>
                        <a class="carousel-control-prev" href="#carousel-${p.id}" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carousel-${p.id}" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                `;
            } else {
                // Single Image
                imageHTML = `<img src="${p.images[0]}" class="card-img-top" style="height:250px; object-fit:cover;" alt="${p.name}">`;
            }

            return `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card product-card h-100">
                    ${imageHTML}
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${p.name}</h5>
                        <p class="card-text text-muted small">${p.short}</p>
                        <h5 class="price-tag mb-3">₹${p.price} <span style="font-size:0.8rem;color:#777">${p.unit ? '/' + p.unit : ''}</span></h5>
                        
                        <div class="mt-auto">
                            <div class="d-flex align-items-center mb-3">
                                <input type="number" id="qty-${p.id}" class="form-control me-2" value="1" min="1" style="width: 70px;">
                                <button class="btn btn-primary w-100 text-white" style="background-color: #2389c4;" onclick="addToCart(${p.id})">Add to Cart</button>
                            </div>
                            <button class="btn btn-link text-decoration-none p-0" onclick="openModal(${p.id})">Read More &rarr;</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }).join('');
    }

    // 2.2 Global updates
    updateCartUI();
    renderCartTable();
});

/* ========================================================
   3. CART LOGIC
   ======================================================== */
function addToCart(id) {
    const qtyInput = document.getElementById(`qty-${id}`);
    let qty = parseInt(qtyInput.value);
    
    if (isNaN(qty) || qty < 1) qty = 1;

    let cart = JSON.parse(localStorage.getItem('padmaCart')) || [];
    
    // Check if item exists
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.qty += qty;
    } else {
        cart.push({ id: id, qty: qty });
    }
    
    localStorage.setItem('padmaCart', JSON.stringify(cart));
    
    // NO ALERT - Trigger Animations instead
    triggerCartAnimation();
    showToast("Item added to cart");
    updateCartUI();
}

function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem('padmaCart')) || [];
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const countBadge = document.getElementById('cart-count');
    const stickyBar = document.getElementById('sticky-cart-bar');
    const stickyText = document.getElementById('sticky-total-text');
    
    // Update Badge
    if (countBadge) {
        countBadge.innerText = totalQty;
        countBadge.style.display = totalQty > 0 ? 'flex' : 'none';
    }

    // Update Sticky Bar
    if (stickyBar && stickyText) {
        if (totalQty > 0) {
            stickyBar.classList.add('visible');
            stickyText.innerText = `${totalQty} Item(s) in Cart`;
        } else {
            stickyBar.classList.remove('visible');
        }
    }
}

// Helper: Shake Animation
function triggerCartAnimation() {
    const cartIcon = document.querySelector('.cart-float-icon');
    if (cartIcon) {
        cartIcon.classList.remove('shake-animation');
        void cartIcon.offsetWidth; // trigger reflow
        cartIcon.classList.add('shake-animation');
    }
}

// Helper: Custom Toast Notification
function showToast(message) {
    const toast = document.getElementById("custom-toast");
    if (toast) {
        toast.innerText = message;
        toast.className = "show";
        setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
    }
}

/* ========================================================
   4. MODAL LOGIC
   ======================================================== */
function openModal(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    $('#modal-title').text(p.name);
    $('#modal-price').text('₹' + p.price);
    $('#modal-desc').text(p.desc);
    
    // Use first image for modal
    $('#modal-img').attr('src', p.images[0]);
    
    // NOTE: Removed "Add to Cart" logic from modal as requested
    
    $('#productModal').modal('show');
}

/* ========================================================
   5. CART PAGE RENDERING
   ======================================================== */
function renderCartTable() {
    const tbody = document.getElementById('cart-table-body');
    const grandTotalEl = document.getElementById('grand-total');
    
    if (!tbody) return; 

    let cart = JSON.parse(localStorage.getItem('padmaCart')) || [];
    let html = '';
    let grandTotal = 0;

    if(cart.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-5">Your cart is empty.<br><br><a href="shop.html" class="btn btn-primary btn-sm text-white">Go to Shop</a></td></tr>';
        if(grandTotalEl) grandTotalEl.innerText = "₹0";
        return;
    }

    cart.forEach((item, index) => {
        const product = products.find(p => p.id === item.id);
        if(product) {
            const total = product.price * item.qty;
            grandTotal += total;

            html += `
                <tr>
                    <td style="vertical-align: middle;">
                        <img src="${product.images[0]}" style="width:40px; height:40px; object-fit:cover; margin-right:10px; border-radius:4px;">
                        ${product.name}
                    </td>
                    <td style="vertical-align: middle;">₹${product.price}</td>
                    
                    <td style="vertical-align: middle; min-width: 120px;">
                        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                        <span class="mx-2 font-weight-bold">${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                    </td>

                    <td style="vertical-align: middle;">₹${total}</td>
                    <td style="vertical-align: middle;">
                        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})" title="Remove">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }
    });

    tbody.innerHTML = html;
    if(grandTotalEl) grandTotalEl.innerText = "₹" + grandTotal;
}

function changeQty(id, change) {
    let cart = JSON.parse(localStorage.getItem('padmaCart')) || [];
    const item = cart.find(x => x.id === id);
    
    if (item) {
        item.qty += change;
        if (item.qty < 1) item.qty = 1; // Prevent going below 1
        localStorage.setItem('padmaCart', JSON.stringify(cart));
        renderCartTable();
        updateCartUI();
    }
}

function removeFromCart(index) {
    // Replaced Alert/Confirm with simple toast interaction logic or custom styling
    // But for delete, a browser confirm is still the safest standard UX. 
    // To stick to "no alerts" request, we just remove it instantly.
    
    let cart = JSON.parse(localStorage.getItem('padmaCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('padmaCart', JSON.stringify(cart));
    
    renderCartTable();
    updateCartUI();
    showToast("Item removed from cart");
}

/* ========================================================
   6. WHATSAPP SEND LOGIC
   ======================================================== */
function sendWhatsAppEnquiry(event) {
    event.preventDefault();

    let cart = JSON.parse(localStorage.getItem('padmaCart')) || [];
    if(cart.length === 0) {
        showToast("Your Cart is empty!");
        return;
    }

    const nameEl = document.getElementById('cust-name');
    const locEl = document.getElementById('cust-location');
    const contactEl = document.getElementById('cust-contact-method');

    const name = nameEl.value.trim();
    const location = locEl.value.trim();
    const contactMethod = contactEl.value;

    if(!name || !location) {
        showToast("Please fill in Name and Location");
        return;
    }

    // Build Message
    let message = `*New Order Enquiry from Website* %0a%0a`;
    message += `Namaste, I would like to order the following:%0a%0a`;
    
    let total = 0;

    cart.forEach((item, index) => {
        const p = products.find(x => x.id === item.id);
        if(p) {
            const lineTotal = p.price * item.qty;
            total += lineTotal;
            message += `${index + 1}. ${p.name} (x${item.qty}) - ₹${lineTotal}%0a`;
        }
    });

    message += `%0a*Total Estimate: ₹${total}*%0a`;
    message += `---------------------------------%0a`;
    message += `*Customer Details:*%0a`;
    message += `Name: ${name}%0a`;
    message += `Location: ${location}%0a`;
    message += `Contact Method: ${contactMethod}%0a`;

    // Send Message
    const phoneNumber = "917034199217"; 
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');

    // CLEAR CART & FIELDS (As requested)
    localStorage.removeItem('padmaCart');
    nameEl.value = "";
    locEl.value = "";
    
    // Render empty table
    renderCartTable();
    updateCartUI();
}