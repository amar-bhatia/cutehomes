$(document).ready(function() {

    const giftData = [
        {
            id: 1,
            name: "Educational Building Blocks",
            category: "educational",
            price: 300,
            originalPrice: 300,
            image: "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.8,
            // badge: "Best Seller",
            description: "High-quality building blocks that enhance creativity and problem-solving skills.",
            detail_link: "https://www.facebook.com/share/162yRD4rWW"
        },
        {
            id: 2,
            name: "Super Hero Action Figure",
            category: "action",
            price: 24.99,
            originalPrice: null,
            image: "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.6,
            badge: "New",
            description: "Detailed action figure with multiple articulation points and accessories.",
            detail_link: "https://www.facebook.com/share/162yRD4rWW"
        },
        {
            id: 3,
            name: "Art & Craft Set",
            category: "creative",
            price: 19.99,
            originalPrice: 25.99,
            image: "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.7,
            badge: "Sale",
            description: "Complete art set with colors, brushes, and canvas for young artists.",
            detail_link: "https://www.facebook.com/share/162yRD4rWW"
        },
        {
            id: 4,
            name: "STEM Learning Kit",
            category: "educational",
            price: 49.99,
            originalPrice: 59.99,
            image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.9,
            badge: "Premium",
            description: "Interactive STEM kit with experiments and learning materials.",
            detail_link: "https://www.facebook.com/share/162yRD4rWW"
        },
        {
            id: 5,
            name: "Remote Control Car",
            category: "action",
            price: 34.99,
            originalPrice: null,
            image: "https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.5,
            badge: "Popular",
            description: "High-speed remote control car with LED lights and sound effects.",
            detail_link: "https://www.facebook.com/share/162yRD4rWW"
        },
        {
            id: 6,
            name: "Musical Instrument Set",
            category: "creative",
            price: 27.99,
            originalPrice: 35.99,
            image: "https://images.pexels.com/photos/4472142/pexels-photo-4472142.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.4,
            badge: "Sale",
            description: "Complete musical set with various instruments for music exploration.",
            detail_link: "https://www.facebook.com/share/162yRD4rWW"
        }
    ];

    let cart = [];
    let currentFilter = 'all';

    init();

    function init() {
        renderProducts();
        updateCartUI();
        initializeEventListeners();
    }

    function renderProducts() {
        renderGiftsGrid();
    }

    function renderGiftsGrid() {
        const filteredGifts = currentFilter === 'all' ? giftData : giftData.filter(article => article.category === currentFilter);
        const giftGrid = $('#giftGrid');
        giftGrid.empty();

        filteredGifts.forEach(article => {
            const productCard = createProductCard(article);
            giftGrid.append(productCard);
        });
    }

    function createProductCard(product) {
        const hasDiscount = product.originalPrice && product.originalPrice > product.price;
        const discountPercent = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

        return `
            <div class="col-lg-4 col-md-6 product-item" data-category="${product.category}">
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-actions">
                            <button class="action-btn" onclick="quickView(${product.id})" title="Quick View">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn" onclick="addToWishlist(${product.id})" title="Add to Wishlist">
                                <i class="far fa-heart"></i>
                            </button>
                        </div>
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h4 class="product-title">${product.name}</h4>
                        <div class="product-price">
                            <div>
                                <span class="price"><i class="fas fa-inr me-1"></i>${product.price}</span>
                                ${hasDiscount ? `<span class="original-price"><i class="fas fa-inr me-1"></i>${product.originalPrice}</span>` : ''}
                            </div>
                            <button class="add-to-cart" onclick="addToCart(${product.id})">
                                <i class="fas fa-cart-plus me-1"></i>Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function initializeEventListeners() {
        $('.filter-btn').click(function() {
            $('.filter-btn').removeClass('active');
            $(this).addClass('active');
            currentFilter = $(this).data('filter');
            renderGiftsGrid();
        });

        $('#searchInput').on('input', function() {
            const searchTerm = $(this).val().toLowerCase();
            filterProductsBySearch(searchTerm);
        });

        $('a[href^="#"]').click(function(e) {
            e.preventDefault();
            const target = $($(this).attr('href'));
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
            }
        });

        $('.category-card').click(function() {
            const category = $(this).find('h3').text().toLowerCase();
            if (category.includes('gifts')) {
                $('html, body').animate({
                    scrollTop: $('#gifts').offset().top - 80
                }, 1000);
            }
        });
    }

    function filterProductsBySearch(searchTerm) {
        $('.product-item').each(function() {
            const productName = $(this).find('.product-title').text().toLowerCase();
            const productCategory = $(this).find('.product-category').text().toLowerCase();

            if (productName.includes(searchTerm) || productCategory.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    window.addToCart = function(productId) {
        const product = giftData.find(p => p.id === productId);
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        updateCartUI();
        showNotification('Product added to cart!', 'success');
    };

    window.removeFromCart = function(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartUI();
        showNotification('Product removed from cart!', 'info');
    };

    window.updateQuantity = function(productId, newQuantity) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                updateCartUI();
            }
        }
    };

    window.quickView = function(productId) {
        const product = giftData.find(p => p.id === productId);
        const modalBody = $('#productModalBody');

        modalBody.html(`
            <div class="row">
                <div class="col-md-6">
                    <img src="${product.image}" alt="${product.name}" class="img-fluid rounded">
                </div>
                <div class="col-md-6">
                    <h4>${product.name}</h4>
                    <p class="text-muted">${product.description}</p>
                    <div class="mb-3">
                        <span class="h4 text-danger"><i class="fas fa-inr me-1"></i>${product.price}</span>
                        ${product.originalPrice ? `<span class="text-muted text-decoration-line-through ms-2"><i class="fas fa-inr me-1"></i>${product.originalPrice}</span>` : ''}
                    </div>
                    <button class="btn btn-primary" onclick="addToCart(${product.id}); $('#productModal').modal('hide');">
                        <i class="fas fa-cart-plus me-2"></i>Add to Cart
                    </button>
                    <a href="${product.detail_link}" class="btn btn-outline-teal" target="_blank">
                        <i class="fas fa-eye me-2"></i>See Details
                    </a>
                </div>
            </div>
        `);

        $('#productModalTitle').text(product.name);
        $('#productModal').modal('show');
    };

    window.addToWishlist = function(productId) {
        showNotification('Added to wishlist!', 'success');
    };

    function updateCartUI() {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

        $('.cart-count').text(cartCount);
        $('#cartTotal').text(cartTotal.toFixed(2));

        const cartItems = $('#cartItems');
        cartItems.empty();

        if (cart.length === 0) {
            cartItems.html(`
                <div class="empty-cart text-center py-4">
                    <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                    <p>Your cart is empty</p>
                </div>
            `);
        } else {
            cart.forEach(item => {
                cartItems.append(createCartItem(item));
            });
        }
    }

    function createCartItem(item) {
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h6 class="cart-item-title">${item.name}</h6>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="text-end">
                    <div class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="remove-item mt-2" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
    }

    function showNotification(message, type) {
        const notification = $(`
            <div class="alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show position-fixed" 
                 style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);

        $('body').append(notification);

        setTimeout(() => {
            notification.alert('close');
        }, 3000);
    }

    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.header-section').addClass('scrolled');
        } else {
            $('.header-section').removeClass('scrolled');
        }
    });

    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .header-section.scrolled {
                background: rgba(255, 255, 255, 0.95) !important;
                backdrop-filter: blur(10px);
            }
        `)
        .appendTo('head');
});
