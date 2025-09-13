<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Product } from '../fakeApi';

/* components */
import Category from './Category.vue';
import RenderTab from './RenderTab.vue';
import ProductGrid from './ProductGrid.vue';
import ProductTable from '../components/ProductTable.vue';

/* composables */
import { useProducts } from '../composables/useProduct';
import { useFavorites } from '../composables/useFavorite';

const {
    data: products,
    loading: isLoading,
    error,
    refresh
} = useProducts({ shouldFail: false });
const errorMessage = computed(() => error.value || '');

const { data: favorites } = useFavorites();

const tab = ref<'grid' | 'table'>('grid');
const tabs = {
    'grid': ProductGrid,
    'table': ProductTable
}

type SortOrder = 'asc' | 'desc';
const filterText = ref<string>('');
const category = ref<string>('All');
const sortOrder = ref<SortOrder>('asc');
const showFavorites = ref<boolean>(false);

// client-side pagination
const currentPage = ref<number>(1);
const itemsPerPage = ref<number>(4);
watch(itemsPerPage, () => {
    currentPage.value = 1;
});

// filter and sort all products
const filteredProducts = computed<Product[]>(() => {
    const allProducts = showFavorites.value ? favorites : products;

    if (!allProducts.value) return [];

    const search = filterText.value.trim().toLowerCase();

    let list = allProducts.value
        .filter(p => p.name.toLowerCase().includes(search))
        .filter(p => !category.value || 'All' === category.value || p.category === category.value);

    list = list.slice().sort((a, b) =>
        sortOrder.value === 'asc' ? a.price - b.price : b.price - a.price
    );

    return list;
});
const visibleProducts = computed<Product[]>(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredProducts.value.slice(start, end);
});
const totalPages = computed(() =>
    Math.ceil(filteredProducts.value.length / itemsPerPage.value)
);

const hasNextPage = computed(() => currentPage.value < totalPages.value);
const hasPrevPage = computed(() => currentPage.value > 1);

// reset to page 1 when filters change
watch([filterText, category, sortOrder], () => {
    currentPage.value = 1;
});

function nextPage() {
    if (hasNextPage.value) {
        currentPage.value++;
    }
}

function prevPage() {
    if (hasPrevPage.value) {
        currentPage.value--;
    }
}

// Retry loading products
function retry() {
    refresh();
}

function toggleFavorite(value: boolean) {
    showFavorites.value = value;
    currentPage.value = 1;
}
</script>


<template>
    <section>
        <!-- Filters -->
        <div class="flex items-end  gap-4 flex-wrap mb-4">

            <div>
                <label for="filter" class="block font-semibold">Filter by name</label>
                <input id="filter" v-model="filterText" type="text" placeholder="Search products..."
                    class="px-2.5 py-2 border border-gray-300 rounded-md min-w-[220px]"
                    aria-label="Filter products by name" />
            </div>

            <div>
                <label for="sort" class="block font-semibold">Sort by price</label>
                <select id="sort" v-model="sortOrder" class="px-2.5 py-2 border border-gray-300 rounded-md"
                    aria-label="Sort products by price">
                    <option value="asc">Low - High</option>
                    <option value="desc">High - Low</option>
                </select>
            </div>

            <div class="inline-flex rounded-md h-10 shadow-sm border border-gray-300 overflow-hidden">
                <button @click="toggleFavorite(false)" :class="[
                    'px-3 py-1.5 text-sm font-medium transition',
                    !showFavorites
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                ]">
                    All Products
                </button>

                <button @click="toggleFavorite(true)" :class="[
                    'px-3 py-1.5 text-sm font-medium transition border-l border-gray-300',
                    showFavorites
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                ]">
                    Favorites
                </button>
            </div>
        </div>


        <div class="flex lg:justify-between flex-col lg:flex-row border-b pb-3">
            <!-- Category Filter -->
            <Category v-model:category="category" />

            <!-- Render Tab -->
            <RenderTab v-model:tab="tab" />
        </div>

        <div v-if="isLoading" role="status" aria-live="polite" class="text-center mt-5">Loading products…</div>

        <div v-else-if="errorMessage" class="text-red-700 text-center mt-5">
            <p>Failed to load products.</p>
            <button @click="retry" aria-label="Retry loading products"
                class="px-3 py-2 mt-3 border rounded-md">Retry</button>
        </div>

        <div v-else class="mt-5">
            <p v-if="visibleProducts.length === 0" aria-live="polite" class="text-center">No result found.</p>

            <!-- Grid/Table View -->
            <div v-else>
                <component :is="tabs[tab]" :products="visibleProducts" />
            </div>

            <!-- Pagination -->
            <div class="flex justify-between mt-5 border-t pt-3">
                <div>
                    <label for="limit" class="block text-sm">Items per page</label>
                    <select id="limit" v-model.number="itemsPerPage"
                        class="px-2.5 py-1 border border-gray-300 rounded-md">
                        <option :value="4">4</option>
                        <option :value="8">8</option>
                        <option :value="12">12</option>
                        <option :value="20">20</option>
                    </select>
                </div>
                <div v-if="filteredProducts.length > itemsPerPage" class="flex justify-center items-center gap-3 mt-6">
                    <button @click="prevPage" :disabled="!hasPrevPage"
                        class="px-3 py-1.5 text-sm rounded-lg border border-gray-300 shadow-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                        Previous
                    </button>
                    <span class="text-sm text-gray-600 font-medium">
                        Page {{ currentPage }} of {{ totalPages }} ({{ filteredProducts.length }} items)
                    </span>
                    <button @click="nextPage" :disabled="!hasNextPage"
                        class="px-3 py-1.5 text-sm rounded-lg border border-gray-300 shadow-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                        Next
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
