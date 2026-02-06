/* ========================================================
   1. MASTER PRODUCT DATABASE (Global)
   ======================================================== */
const products = [
    {
        id: 1,
        name: "Meditation / Contemplation Cards",
        price: 200,
        short: "Gentle companions offering a moment of clarity.",
        desc: "Meditation Cards act as gentle companions for professionals, students, and spiritual practitioners—offering a moment of clarity amidst a busy day.<br><br>Each card carries a short quote, a mindful reminder, or a contemplative thought, designed to shift your awareness from stress to stillness, from reaction to reflection.<br><br>Meditation Cards are not just inspirational quotes—they are daily anchors for the mind, inviting you to pause, breathe, and return to your centre. A small message. A big shift in consciousness.",
        images: ["assets/images/shop/cards.jpeg", "assets/images/shop/cards2.jpeg"] 
    },
    {
        id: 2,
        name: "Natural Organic Vibhuti",
        price: 100,
        unit: "50g",
        short: "Sacred Ash for Purity and Protection.",
        desc: "Vibhuti, the sacred ash, is not just a ritual substance—it is a powerful yogic tool symbolizing purification, awareness, and surrender to the Divine. When it is made from natural, organic sources through traditional methods, its energetic quality becomes highly supportive for one’s spiritual and daily life.<br><br>• Purifies Aura & Space<br>• Reminder of Impermanence<br>• Enhances Spiritual Practice<br>• Traditional Ayurvedic Benefits<br>• Symbol of Devotion & Protection",
        images: ["assets/images/shop/vibhuti.jpeg"]
    },
    {
        id: 3,
        name: "Meditation Seat",
        price: 750,
        short: "Align Your Body, Settle Your Mind.",
        desc: "A steady body leads to a steady mind. The right meditation seat or cushion supports your posture, eases discomfort, and allows energy to flow naturally during your practice. Whether you are a beginner or a seasoned practitioner, having a proper seat creates a stable foundation for deeper stillness.<br><br>• Supports Natural Spine Alignment<br>• Enhances Comfort & Stability<br>• Improves Breath & Energy Flow<br>• Prevents Restlessness & Distraction<br>• Cultivates a Sacred Space",
        images: ["assets/images/shop/seat.jpeg"]
    },
    {
        id: 4,
        name: "Rudraksha Japa Mala",
        price: 240,
        short: "Spiritual companion carrying ancient yogic wisdom.",
        desc: "A Rudraksha Mala is not just a counting tool for mantra—it is a spiritual companion, carrying the vibrations of ancient yogic wisdom and the energy of Shiva. Each bead holds a natural electromagnetic field that stabilizes the mind and harmonizes the body’s bio-energy.<br><br>• Enhances Focus in Japa<br>• Holds and Amplifies Mantra Energy<br>• Balances Nervous System & Calms the Mind<br>• Symbol of Protection & Grace<br>• Creates a Meditative Rhythm<br><br>To hold a Rudraksha Mala is to carry a reminder—stay centered, stay connected, and let every breath become a mantra.",
        images: ["assets/images/shop/mala.jpeg"]
    },
    {
        id: 5,
        name: "Journaling Diary",
        price: 280,
        short: "A Mirror For Clarity, Growth & Inner Transformation.",
        desc: "In a fast-moving life, thoughts often stay cluttered in the mind. Journaling creates a sacred pause—a moment to reflect, release, and realign. Whether you are a student, a working professional, or a seeker on the spiritual path, a diary becomes more than pages—it becomes a space for self-awareness and conscious living.<br><br>• Becomes a personal Sadhana Journal to record insights, mantra experiences, and inner shifts.<br>• Deepens awareness by observing patterns of thoughts, triggers, and emotional reactions.<br>• Serves as a sacred companion on the inner journey—transforming every reflection into a step toward higher consciousness.",
        images: ["assets/images/shop/diary.jpeg", "assets/images/shop/diary2.jpeg"]
    },
    {
        id: 6,
        name: "Chakra Stones",
        price: 900,
        short: "Powerful tools for Intuition and Self-awareness.",
        desc: "Chakra stones are powerful tools for: Intuition, Self-awareness, Inner clarity, Connection to higher consciousness.<br><br>Wear them, meditate with them, keep them in your space, or use them for healing practices.<br><br>• Enhances emotional stability<br>• Deepens meditation & awareness<br>• Promotes physical well being<br>• Encourages positive energy flow<br>• Boosts confidence & creativity<br>• Strengthens relationships",
        images: ["assets/images/shop/stones.jpeg"]
    },
    {
        id: 7,
        name: "Devi Mobile Pop Holder",
        price: 340,
        short: "Adorn your mobile with sacred presence.",
        desc: "Adorn your mobile with the sacred presence of Devi and Divine energies.<br>This mobile pop-up blends spiritual aesthetics with everyday functionality, reminding you of higher awareness each time you hold your phone.<br><br>• Sacred Designs of Devi & Divinity<br>• Enhanced Grip & Safety<br>• A Gentle Reminder of Awareness<br>• Comfort & Convenience<br>• Elegant Spiritual Beauty",
        images: ["assets/images/shop/mobile-holder.jpeg"]
    },
    {
        id: 8,
        name: "Short Stories of Wisdom",
        price: 200,
        short: "A collection of stories to ignite innocence.",
        desc: "This is a collection of short stories that came to the author in his meditations. Each story may help the reader to taste a new dimension of innocence and quietness within. Regardless of age, gender or nationality anyone can dive into these little pearls of wisdom.<br><br>Children especially can access the supreme knowledge of meditation with the help of these short stories. In this collection each paragraph carries sacred sentences which can evoke and ignite an eye of innocence, a head of humbleness and a heart of humility.",
        images: ["assets/images/shop/book.jpeg", "assets/images/shop/book2.jpeg"]
    },
    {
        id: 9,
        name: "Guided Audio Practices",
        price: 1600,
        short: "Gentle offering from ancient spiritual lineages.",
        desc: "This guided relaxation and meditation is a gentle offering from ancient spiritual lineages, passed down through generations with one sacred intention — to help humanity live with clarity, peace, and awareness.<br><br>In today’s fast-moving world, daily challenges often burden the mind and emotions. This practice provides a safe inner space where the body can rest, the mind can settle, and awareness can return to its natural state of balance.",
        images: ["assets/images/shop/audio.jpeg"]
    }
];

/* ========================================================
   2. INITIALIZATION & UI UPDATES
   ======================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // 2.1 Render Shop Grid (Only if we are on shop.html)
    const grid = document.getElementById('product-grid');
    if (grid) {
        renderShopGrid(grid);
    }

    // 2.2 Always update Cart UI (Badge, Sticky Bar) on load
    updateCartUI();
});

// 2.3 Force Update when returning to tab
window.addEventListener("pageshow", function(event) {
    updateCartUI(); 
});

/* ========================================================
   3. RENDER FUNCTIONS
   ======================================================== */
function renderShopGrid(gridElement) {
    gridElement.innerHTML = products.map(p => {
        let thumbnailsHTML = '';
        if (p.images.length > 1) {
            thumbnailsHTML = `<div class="thumb-strip">` + 
                p.images.map((img, idx) => 
                    `<img src="${img}" class="thumb-img ${idx===0?'active':''}" onclick="changeProductImage(${p.id}, '${img}', this)">`
                ).join('') + 
            `</div>`;
        }

        return `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card product-card h-100">
                <div id="overlay-${p.id}" class="product-overlay">
                    <div class="overlay-content">
                        <span class="overlay-msg"><i class="fa fa-check-circle"></i> Added to Cart!</span>
                        <a href="cart.html" class="overlay-btn">View Cart</a>
                    </div>
                </div>
                <div class="img-wrapper">
                    <img src="${p.images[0]}" id="main-img-${p.id}" class="card-img-top" alt="${p.name}">
                </div>
                ${thumbnailsHTML}
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${p.name}</h5>
                    <p class="card-text small">${p.short}</p>
                    <h5 class="price-tag mt-2">₹${p.price} <span style="font-size:0.8rem;color:#999;font-weight:normal">${p.unit ? '/' + p.unit : ''}</span></h5>
                    <div class="mt-auto pt-3">
                        <div class="d-flex align-items-center mb-3">
                            <input type="number" id="qty-${p.id}" class="form-control form-control-qty me-2" value="1" min="1" style="width: 60px;">
                            <button class="btn btn-add-cart w-100" onclick="addToCartOverlay(${p.id})">Add to Cart</button>
                        </div>
                        <button class="btn btn-link text-decoration-none p-0" style="color:#888; font-size:13px" onclick="openModal(${p.id})">View Details</button>
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');
}

/* ========================================================
   4. CART ACTIONS
   ======================================================== */
function addToCartOverlay(id) {
    const qtyInput = document.getElementById(`qty-${id}`);
    let qty = parseInt(qtyInput.value) || 1;
    if (qty < 1) qty = 1;

    // LOCAL STORAGE: 'padmaCart'
    let cart = JSON.parse(sessionStorage.getItem('padmaCart')) || [];
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) existingItem.qty += qty;
    else cart.push({ id: id, qty: qty });
    
    sessionStorage.setItem('padmaCart', JSON.stringify(cart));

    // UI Feedback
    const overlay = document.getElementById(`overlay-${id}`);
    if(overlay) {
        overlay.classList.add('active');
        setTimeout(() => { overlay.classList.remove('active'); }, 3000);
    }
    
    // Animate Icon
    const cartIcon = document.querySelector('.cart-float-icon');
    if(cartIcon) {
        cartIcon.classList.remove('shake-animation');
        void cartIcon.offsetWidth; 
        cartIcon.classList.add('shake-animation');
    }

    updateCartUI();
}

function updateCartUI() {
    const cart = JSON.parse(sessionStorage.getItem('padmaCart')) || [];
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    
    // 1. Badge
    const countBadge = document.getElementById('cart-count');
    if (countBadge) {
        countBadge.innerText = totalQty;
        countBadge.style.display = totalQty > 0 ? 'flex' : 'none';
    }

    // 2. Sticky Bar (Mobile)
    const stickyBar = document.getElementById('sticky-cart-bar');
    const stickyImgsDiv = document.getElementById('sticky-images');
    
    if (stickyBar && stickyImgsDiv) {
        if (totalQty > 0) {
            stickyBar.classList.add('visible');
            let html = '';
            let shownCount = 0;
            const maxShow = 4;
            cart.forEach(item => {
                const p = products.find(x => x.id === item.id);
                if(p && shownCount < maxShow) {
                    html += `<img src="${p.images[0]}" class="sticky-thumb">`;
                    shownCount++;
                }
            });
            if (cart.length > maxShow) {
                html += `<div class="sticky-more">+${cart.length - maxShow}</div>`;
            }
            stickyImgsDiv.innerHTML = html;
        } else {
            stickyBar.classList.remove('visible');
        }
    }
}

/* ========================================================
   5. HELPERS (Image Swap, Modal)
   ======================================================== */
function changeProductImage(id, src, thumb) {
    const mainImg = document.getElementById(`main-img-${id}`);
    if(mainImg) {
        mainImg.style.opacity = 0;
        setTimeout(() => { mainImg.src = src; mainImg.style.opacity = 1; }, 150);
    }
    const siblings = thumb.parentNode.children;
    for (let sib of siblings) sib.classList.remove('active');
    thumb.classList.add('active');
}

function openModal(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    $('#modal-title').text(p.name);
    $('#modal-price').text('₹' + p.price);
    document.getElementById('modal-desc').innerHTML = p.desc;
    
    const imgContainer = document.getElementById('modal-img-container');
    if (imgContainer) {
        imgContainer.innerHTML = ''; 
        p.images.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.className = 'img-fluid mb-3 rounded';
            img.style.width = '100%';
            img.style.maxHeight = '300px';
            img.style.objectFit = 'contain';
            imgContainer.appendChild(img);
        });
    }
    $('#productModal').modal('show');
}