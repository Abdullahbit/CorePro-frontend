interface Rating {
    rate: number;
    count: number;
}

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    rating: Rating;
    image: string;
}

let allProducts: Product[] = [];

// DOM Elements
const productGrid = document.getElementById('product-grid') as HTMLDivElement;
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const categoryFilter = document.getElementById('category-filter') as HTMLSelectElement;
const loadingState = document.getElementById('loading-state') as HTMLDivElement;
const modal = document.getElementById('product-modal') as HTMLDivElement;
const modalDetails = document.getElementById('modal-details') as HTMLDivElement;
const closeBtn = document.querySelector('.close-btn') as HTMLSpanElement;

// Initialization
async function init() {
    restoreSearchTerm();
    await fetchProducts();
    setupEventListeners();
}

// Fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allProducts = await response.json();
        
        populateCategories();
        
        // Hide loading state and show grid
        loadingState.style.display = 'none';
        productGrid.style.display = 'grid';
        
        // Filter initially in case there's a stored search term
        filterAndRenderProducts();

    } catch (error) {
        console.error(error);
        loadingState.innerText = "Unable to load products. Please try again.";
    }
}

// Extract unique categories and populate select
function populateCategories() {
    const categories = Array.from(new Set(allProducts.map(p => p.category)));
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoryFilter.appendChild(option);
    });
}

// Render products to the grid
function renderProducts(products: Product[]) {
    productGrid.innerHTML = '';
    
    if (products.length === 0) {
        productGrid.innerHTML = '<p>No products found matching your criteria.</p>';
        return;
    }

    products.map(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p class="product-category">${product.category}</p>
            <p class="product-desc">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="view-details-btn" data-id="${product.id}">View Details</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Filter logic based on search and category
function filterAndRenderProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = allProducts.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    renderProducts(filtered);
}

// Event Listeners setup
function setupEventListeners() {
    // Search input listener
    searchInput.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        localStorage.setItem('searchTerm', target.value);
        filterAndRenderProducts();
    });

    // Category change listener
    categoryFilter.addEventListener('change', () => {
        filterAndRenderProducts();
    });

    // Event delegation for view details buttons
    productGrid.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('view-details-btn')) {
            const productId = parseInt(target.getAttribute('data-id') || '0');
            openModal(productId);
        }
    });

    // Close modal listeners
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Open modal with product details
function openModal(productId: number) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    modalDetails.innerHTML = `
        <div class="modal-details-flex">
            <h2>${product.title}</h2>
            <img src="${product.image}" alt="${product.title}">
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
            <p><strong>Rating:</strong> ${product.rating.rate} (${product.rating.count} reviews)</p>
            <p>${product.description}</p>
        </div>
    `;
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

// Restore search term from localStorage
function restoreSearchTerm() {
    const savedTerm = localStorage.getItem('searchTerm');
    if (savedTerm) {
        searchInput.value = savedTerm;
    }
}

// Start application
init();
