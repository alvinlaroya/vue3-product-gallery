import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { type Product } from '../fakeApi';

const FAVORITES_KEY = 'product-favorites';

const favorites = ref<Product[]>([]);

export function useFavorites() {
    function loadFavorites() {
        try {
            const data = localStorage.getItem(FAVORITES_KEY);
            if (data) {
                favorites.value = JSON.parse(data) as Product[];
            }
        } catch (error) {
            console.error('Error loading favorites', error);
        }
    }

    function persistFavorites() {
        try {
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.value));
        } catch (error) {
            console.error('Error persisting favorites', error);
        }
    }

    function isFavorite(id: string): boolean {
        return favorites.value.some((p) => p.id === id);
    }

    function addFavorite(product: Product) {
        if (!isFavorite(product.id)) {
            favorites.value.push(product);
            persistFavorites();
            toast(`${product.name} added to favorites!`, {
                theme: "auto",
                type: "default",
                dangerouslyHTMLString: true,
                autoClose: 700
            });
        }
    }

    function removeFavorite(id: string, name: string) {
        favorites.value = favorites.value.filter((p) => p.id !== id);
        persistFavorites();
        toast(`${name} removed from favorites.`, {
            theme: "auto",
            type: "default",
            dangerouslyHTMLString: true,
            autoClose: 700
        });
    }

    function toggleFavorite(product: Product) {
        if (isFavorite(product.id)) {
            removeFavorite(product.id, product.name);
        } else {
            addFavorite(product);
        }
    }

    function getFavoriteProducts(products: Product[]) {
        return products.filter((p) => isFavorite(p.id));
    }

    // ✅ New: Clear all favorites
    function clearAllFavorites() {
        favorites.value = [];
        persistFavorites();
        toast("All favorites cleared.", {
            theme: "auto",
            type: "default",
            dangerouslyHTMLString: true,
            autoClose: 700
        });
    }

    if (favorites.value.length === 0) {
        loadFavorites();
    }

    return {
        data: favorites,
        isFavorite,
        toggleFavorite,
        getFavoriteProducts,
        clearAllFavorites
    };
}
