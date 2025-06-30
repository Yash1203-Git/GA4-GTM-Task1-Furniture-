// shared.js - Contains common data and functions for the Aurora Furniture Store

// Array of products (mock data)
const products = [
    {
        id: 'prod001',
        name: 'Elegant Sofa',
        description: 'A luxurious and comfortable sofa, perfect for any living room. Made with premium fabric and sturdy wooden frame.',
        longDescription: 'Our Elegant Sofa is designed for ultimate comfort and style. Featuring high-density foam cushions, a solid hardwood frame, and a choice of exquisite upholstery fabrics, it’s the perfect centerpiece for your living space. Handcrafted with attention to detail and built to last.',
        price: 1299.99,
        originalPrice: 1599.99,
        imageUrl: 'https://placehold.co/600x400/94a3b8/ffffff?text=Elegant+Sofa',
        imageAlt: 'Elegant grey sofa',
        category: 'Living Room',
        dimensions: '80"W x 36"D x 30"H',
        material: 'Velvet, Oak Wood'
    },
    {
        id: 'prod002',
        name: 'Modern Dining Table',
        description: 'Sleek and sturdy dining table, seating up to 6 guests. Ideal for contemporary dining spaces.',
        longDescription: 'The Modern Dining Table combines minimalist design with robust construction. Its tempered glass top and polished stainless steel base create a striking focal point, while comfortably seating six. Perfect for family meals and entertaining guests.',
        price: 899.00,
        originalPrice: 1050.00,
        imageUrl: 'https://placehold.co/600x400/818cf8/ffffff?text=Modern+Dining+Table',
        imageAlt: 'Modern dining table with chairs',
        category: 'Dining Room',
        dimensions: '72"L x 36"W x 30"H',
        material: 'Tempered Glass, Stainless Steel'
    },
    {
        id: 'prod003',
        name: 'Cozy Armchair',
        description: 'An inviting armchair with plush cushioning, perfect for reading or relaxing.',
        longDescription: 'Sink into the Cozy Armchair after a long day. Its ergonomic design, soft linen upholstery, and generous padding provide unmatched comfort. A stylish addition to any bedroom or reading nook, offering a perfect blend of support and relaxation.',
        price: 349.50,
        originalPrice: 420.00,
        imageUrl: 'https://placehold.co/600x400/60a5fa/ffffff?text=Cozy+Armchair',
        imageAlt: 'Cozy blue armchair',
        category: 'Living Room',
        dimensions: '30"W x 32"D x 34"H',
        material: 'Linen, Pine Wood'
    },
    {
        id: 'prod004',
        name: 'Minimalist Bookshelf',
        description: 'Open-concept bookshelf, offering ample storage for books and decorative items.',
        longDescription: 'Organize your space with our Minimalist Bookshelf. Its open-back design and multiple tiers offer versatile storage for books, plants, and decor. Constructed from durable, sustainably sourced bamboo, it’s a stylish and eco-friendly choice for any room.',
        price: 199.00,
        originalPrice: 250.00,
        imageUrl: 'https://placehold.co/600x400/4c78a9/ffffff?text=Minimalist+Bookshelf',
        imageAlt: 'Minimalist wooden bookshelf',
        category: 'Storage',
        dimensions: '48"W x 12"D x 72"H',
        material: 'Bamboo'
    },
    {
        id: 'prod005',
        name: 'Queen Size Bed Frame',
        description: 'Sturdy and elegant queen size bed frame with a minimalist design. Mattress not included.',
        longDescription: 'Experience restful nights with our Queen Size Bed Frame. Crafted from solid pine wood with a sleek, low-profile design, it provides sturdy support for your mattress. Its timeless aesthetic complements various bedroom decors, ensuring both comfort and style.',
        price: 599.00,
        originalPrice: 700.00,
        imageUrl: 'https://placehold.co/600x400/7c3aed/ffffff?text=Queen+Size+Bed',
        imageAlt: 'Queen size bed frame',
        category: 'Bedroom',
        dimensions: '63"W x 83"L x 40"H',
        material: 'Solid Pine Wood'
    },
    {
        id: 'prod006',
        name: 'Outdoor Patio Set',
        description: 'Weather-resistant patio set including a table and four chairs, perfect for outdoor relaxation.',
        longDescription: 'Enjoy the outdoors with our durable Outdoor Patio Set. Made from weather-resistant rattan and a robust aluminum frame, it includes a glass-top table and four comfortable chairs. Perfect for garden parties, morning coffee, or relaxing with family.',
        price: 750.00,
        originalPrice: 900.00,
        imageUrl: 'https://placehold.co/600x400/fbbf24/ffffff?text=Outdoor+Patio+Set',
        imageAlt: 'Outdoor patio furniture set',
        category: 'Outdoor',
        dimensions: 'Table: 36" Dia x 28"H, Chair: 24"W x 24"D x 32"H',
        material: 'Synthetic Rattan, Aluminum'
    }
];

// Initialize cart from localStorage or as an empty array
let cart = JSON.parse(localStorage.getItem('auroraCart')) || [];

// Function to update cart count in the header
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Function to add a product to the cart
function addToCart(productId) {
    const productToAdd = products.find(p => p.id === productId);
    if (productToAdd) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...productToAdd, quantity: 1 });
        }
        localStorage.setItem('auroraCart', JSON.stringify(cart)); // Persist cart
        updateCartCount();
        showMessageBox(`${productToAdd.name} added to cart!`, 'success');
    } else {
        showMessageBox('Error: Product not found!', 'error');
    }
}

// Function to update quantity of an item in the cart
function updateQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1); // Remove if quantity is 0 or less
        }
        localStorage.setItem('auroraCart', JSON.stringify(cart)); // Persist cart
        updateCartCount();
        // Re-render cart on the checkout page if it's currently open
        if (document.getElementById('checkoutPageContent')) { // Check for the specific content div for checkout
            // Calling renderCart only if it exists in the current scope (checkout.html)
            if (typeof renderCart === 'function') {
                renderCart();
            }
        }
    }
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('auroraCart', JSON.stringify(cart)); // Persist cart
    updateCartCount();
    // Re-render cart on the checkout page if it's currently open
    if (document.getElementById('checkoutPageContent')) { // Check for the specific content div for checkout
        if (typeof renderCart === 'function') {
            renderCart();
        }
    }
    showMessageBox('Item removed from cart.', 'info');
}

// Function to display a message box notification
function showMessageBox(message, type = 'success') {
    const messageBox = document.getElementById('messageBox');
    if (!messageBox) {
        // If messageBox doesn't exist (e.g., on Thank You page), log to console instead
        console.log(`Message: ${message} (Type: ${type})`);
        return;
    }
    messageBox.textContent = message;
    // Reset classes to ensure proper animation and color
    messageBox.className = 'fixed top-20 right-5 px-5 py-3 rounded-lg shadow-xl transition-all duration-300 transform z-[100]';
    if (type === 'success') {
        messageBox.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
        messageBox.classList.add('bg-red-500', 'text-white');
    } else { // info
        messageBox.classList.add('bg-blue-500', 'text-white');
    }

    // Animate in
    messageBox.classList.remove('translate-x-full', 'opacity-0');
    messageBox.classList.add('translate-x-0', 'opacity-100');

    // Animate out after 3 seconds
    setTimeout(() => {
        messageBox.classList.remove('translate-x-0', 'opacity-100');
        messageBox.classList.add('translate-x-full', 'opacity-0');
    }, 3000);
}

// Simulate "Begin Checkout" event (for analytics, etc.)
function beginCheckoutEvent() {
    console.log('Event: Begin Checkout Triggered');
    // In a real application, you would send this event to an analytics platform
}

// Simulate "Purchase" event (for analytics, etc.)
function purchaseEvent() {
    console.log('Event: Purchase Completed Triggered');
    // In a real application, you would send this event to an analytics platform
}

// Initialize cart count on page load for all pages that include shared.js
document.addEventListener('DOMContentLoaded', updateCartCount);
