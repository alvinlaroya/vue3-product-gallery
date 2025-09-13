import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';

const FAVORITES_KEY = 'product-favorites';

const favorites = ref<Set<string>>(new Set());

export function useFavorites() {
    function loadFavorites() {
        try {
            const data = localStorage.getItem(FAVORITES_KEY);
            if (data) {
                const arr: string[] = JSON.parse(data);
                favorites.value = new Set(arr);
            }
        } catch (error) {
            console.error('Error load favorites', error)
        }
    }

    function persistFavorites() {
        try {
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites.value)));
        } catch (error) {
            console.error('Error persisting favorites', error)
        }
    }

    function isFavorite(id: string): boolean {
        return favorites.value.has(id);
    }

    function addFavorite(id: string, name: string) {
        favorites.value.add(id);
        favorites.value = new Set(favorites.value);
        persistFavorites();
        toast(`${name} added to favorites!`, {
            "theme": "auto",
            "type": "default",
            "dangerouslyHTMLString": true,
            autoClose: 700
        })
    }

    function removeFavorite(id: string, name: string) {
        favorites.value.delete(id);
        favorites.value = new Set(favorites.value);
        persistFavorites();
        toast(`${name} removed from favorites.`, {
            "theme": "auto",
            "type": "default",
            "dangerouslyHTMLString": true,
            autoClose: 700
        })
    }

    function toggleFavorite({ id, name }: { id: string, name: string }) {
        if (favorites.value.has(id)) {
            removeFavorite(id, name);
        } else {
            addFavorite(id, name);
        }
    }


    if (favorites.value.size === 0) {
        loadFavorites();
    }

    return {
        isFavorite,
        toggleFavorite,
    };
}