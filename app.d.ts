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
declare let allProducts: Product[];
declare const productGrid: HTMLDivElement;
declare const searchInput: HTMLInputElement;
declare const categoryFilter: HTMLSelectElement;
declare const loadingState: HTMLDivElement;
declare const modal: HTMLDivElement;
declare const modalDetails: HTMLDivElement;
declare const closeBtn: HTMLSpanElement;
declare function init(): Promise<void>;
declare function fetchProducts(): Promise<void>;
declare function populateCategories(): void;
declare function renderProducts(products: Product[]): void;
declare function filterAndRenderProducts(): void;
declare function setupEventListeners(): void;
declare function openModal(productId: number): void;
declare function closeModal(): void;
declare function restoreSearchTerm(): void;
//# sourceMappingURL=app.d.ts.map