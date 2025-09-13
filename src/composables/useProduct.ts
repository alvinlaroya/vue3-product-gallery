import { ref } from 'vue';
import { type Product, fetchProducts } from '../fakeApi';

export function useProducts(options: {
    immediate?: boolean;
    shouldFail?: boolean;
} = {}) {
    const { immediate = true, shouldFail = false } = options;

    const data = ref<Product[] | null>(null);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const execute = async () => {
        try {
            loading.value = true;
            error.value = null;

            const products = await fetchProducts({
                fail: shouldFail,
            });

            data.value = products;
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : 'An error occurred';
            error.value = errorMessage;
            data.value = null;
        } finally {
            loading.value = false;
        }
    };

    const refresh = execute;

    const reset = () => {
        data.value = null;
        error.value = null;
        loading.value = false;
    };

    if (immediate) {
        execute();
    }

    return {
        data,
        loading,
        error,
        execute,
        refresh,
        reset,
    };
}
