// 1. PRODUCT DATABASE
const products = [
    {
        id: 1,
        name: "Meditation / Contemplation Cards",
        price: 200,
        short: "Gentle companions offering a moment of clarity amidst a busy day.",
        desc: "Meditation Cards act as gentle companions for professionals, students, and spiritual practitioners. Each card carries a short quote or mindful reminder designed to shift your awareness from stress to stillness. They are daily anchors for the mind.",
        img: "assets/images/shop/cards.jpeg" 
    },
    {
        id: 2,
        name: "Natural Organic Vibhuti",
        price: 100,
        unit: "50g",
        short: "Sacred ash for purity, protection, and spiritual surrender.",
        desc: "Vibhuti is a powerful yogic tool symbolizing purification. Made from natural organic sources through traditional methods. Benefits: Purifies Aura, Reminder of Impermanence, Enhances Spiritual Practice.",
        img: "assets/images/shop/vibhuti.jpeg"
    },
    {
        id: 3,
        name: "Meditation Seat",
        price: 750,
        short: "Align your body and settle your mind with stable support.",
        desc: "A steady body leads to a steady mind. This seat supports your posture, eases discomfort, and allows energy to flow naturally. Ideally supports natural spine alignment and cultivates a sacred space.",
        img: "assets/images/shop/seat.jpeg"
    },
    {
        id: 4,
        name: "Rudraksha Japa Mala",
        price: 240,
        short: "A spiritual companion carrying ancient yogic wisdom.",
        desc: "Not just a counting tool, but a carrier of Shiva's energy. Each bead holds a natural field that stabilizes the mind. Enhances focus in Japa, balances the nervous system, and serves as a symbol of protection.",
        img: "assets/images/shop/mala.jpeg"
    },
    {
        id: 5,
        name: "Journaling Diary",
        price: 280,
        short: "A mirror for clarity, growth, and inner transformation.",
        desc: "Journaling creates a sacred pause to reflect and realign. Use this as a Sadhana Journal to record insights, mantra experiences, and observe patterns of thought.",
        img: "assets/images/shop/diary.jpeg"
    },
    {
        id: 6,
        name: "Chakra Stones",
        price: 900,
        short: "Powerful tools for intuition, self-awareness, and healing.",
        desc: "Enhance emotional stability and deepen meditation. These stones promote physical well-being, encourage positive energy flow, and boost confidence and creativity.",
        img: "assets/images/shop/stones.jpeg"
    },
    {
        id: 7,
        name: "Devi Mobile Pop Holder",
        price: 340,
        short: "Adorn your mobile with sacred presence and functionality.",
        desc: "Blends spiritual aesthetics with functionality. Reminds you of higher awareness every time you hold your phone. Features sacred designs of Devi & Divinity.",
        img: "assets/images/shop/mobile-holder.jpeg"
    },
    {
        id: 8,
        name: "Short Stories of Wisdom",
        price: 200,
        short: "A collection of stories to ignite innocence and humility.",
        desc: "Stories that came to the author in deep meditation. Suitable for all ages to taste a new dimension of quietness. Each paragraph carries sacred sentences to evoke humbleness.",
        img: "assets/images/shop/book.jpeg"
    },
    {
        id: 9,
        name: "Guided Audio Practices",
        price: 1600,
        short: "Gentle offering from ancient spiritual lineages for peace.",
        desc: "A guided relaxation and meditation practice to help you live with clarity. Provides a safe inner space where the body can rest and awareness can return to balance.",
        img: "assets/images/shop/audio.jpeg"
    }
];

// 2. RENDER PRODUCTS ON SHOP PAGE
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('product-grid');
    if (grid) {
        grid.innerHTML = products.map(p => `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card product-card h-100">
                    <img src="${p.img}" class="card-img-top" alt="${p.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${p.name}</h5>
                        <p class="card-text text-muted small">${p.short}</p>
                        <h5 class="price-tag mb-3">₹${p.price} <span style="font-size:0.8rem;color:#777">${p.unit ? '/' + p.unit : ''}</span></h5>
                        
                        <div class="mt-auto">
                            <div class="d-flex align-items-center mb-3">
                                <input type="number" id="qty-${p.id}" class="form-control me-2" value="1" min="1" style="width: 70px;">
                                <button class="btn btn-outline-primary w-100" onclick="addToCart(${p.id})">Add to Cart</button>
                            </div>
                            <button class="btn btn-link text-decoration-none p-0" onclick="openModal(${p.id})">Read More &rarr;</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    updateCartCount();
    renderCartTable();
});

// 3. CART LOGIC (LOCAL STORAGE)
function addToCart(id) {
    const qtyInput = document.getElementById(`qty-${id}`);
    let qty = parseInt(qtyInput.value);
    
    // Validation: Ensure Quantity is at least 1
    if (isNaN(qty) || qty < 1) {
        qty = 1;
        qtyInput.value = 1;
    }

    let cart = JSON.parse(localStorage.getItem('padmaCart')) || [];
    
    // Check if item exists
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.qty += qty;
    } else {
        cart.push({ id: id, qty: qty });
    }
    
    localStorage.setItem('padmaCart', JSON.stringify(cart));
    alert("Item added to cart!");
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('padmaCart')) || [];
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const countBadge = document.getElementById('cart-count');
    if (countBadge) countBadge.innerText = totalQty;
}

// 4. MODAL LOGIC (Bootstrap 4 Compatible)
let currentModalId = null;

function openModal(id) {
    const p = products.find(x => x.id === id);
    
    // Fill data using jQuery for Bootstrap 4 compatibility
    $('#modal-title').text(p.name);
    $('#modal-price').text('₹' + p.price);
    $('#modal-desc').text(p.desc);
    $('#modal-img').attr('src', p.img);
    currentModalId = id;
    
    // Open Modal
    $('#productModal').modal('show');
}

function addToCartFromModal() {
    if(currentModalId) {
        let cart = JSON.parse(localStorage.getItem('padmaCart')) || [];
        const existingItem = cart.find(item => item.id === currentModalId);
        if (existingItem) existingItem.qty += 1;
        else cart.push({ id: currentModalId, qty: 1 });
        
        localStorage.setItem('padmaCart', JSON.stringify(cart));
        alert("Item added to cart!");
        updateCartCount();
        
        $('#productModal').modal('hide');
    }
}

// 5. RENDER CART PAGE
function renderCartTable() {
    const tbody = document.getElementById('cart-table-body');
    const grandTotalEl = document.getElementById('grand-total');
    if (!tbody) return; // We are not on cart page

    let cart = JSON.parse(localStorage.getItem('padmaCart')) || [];
    let html = '';
    let grandTotal = 0;

    if(cart.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">Your cart is empty. <a href="shop.html">Go to Shop</a></td></tr>';
        grandTotalEl.innerText = "₹0";
        return;
    }

    cart.forEach((item, index) => {
        const product = products.find(p => p.id === item.id);
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
    });

    tbody.innerHTML = html;
    grandTotalEl.innerText = "₹" + grandTotal;
}

function removeFromCart(index) {
    if(confirm("Are you sure you want to remove this item?")) {
        let cart = JSON.parse(localStorage.getItem('padmaCart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('padmaCart', JSON.stringify(cart));
        renderCartTable();
        updateCartCount();
    }
}

// 6. WHATSAPP SEND LOGIC (Updated for Form Submit Event)
function sendWhatsAppEnquiry(event) {
    // Prevent the form from reloading the page
    event.preventDefault();

    // Browser validation has ALREADY happened at this point.
    // If we are here, it means Name and Location are filled.

    // 1. Check Cart Status (Manual check required for non-input logic)
    let cart = JSON.parse(localStorage.getItem('padmaCart')) || [];
    if(cart.length === 0) {
        alert("Your Cart is empty! Please add products from the Shop.");
        return;
    }

    // 2. Get Input Values
    const name = document.getElementById('cust-name').value;
    const location = document.getElementById('cust-location').value;
    const contactMethod = document.getElementById('cust-contact-method').value;

    // 3. Build the message
    let message = `*New Enquiry from Website* %0a%0a`;
    message += `Namaste, I would like to enquire about the following products:%0a%0a`;
    
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
    message += `Preferred Contact: ${contactMethod}%0a`;

    // 4. Send Message
    const phoneNumber = "917034199217"; 
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}