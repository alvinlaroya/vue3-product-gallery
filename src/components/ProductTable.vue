<script setup lang="ts">
import type { Product } from '../fakeApi'
import { useFavorites } from '../composables/useFavorite'

defineProps<{
    products: Product[]
}>()

const { isFavorite, toggleFavorite } = useFavorites();
</script>


<template>
    <table class="min-w-full border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Stock</th>
                <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Favorite</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
            <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 transition">
                <td class="px-4 py-3">
                    <span class="text-gray-900 font-medium">{{ product.name }}</span>
                </td>
                <td class="px-4 py-3 text-gray-600 text-sm">
                    {{ product.category }}
                </td>
                <td class="px-4 py-3 text-gray-800 text-sm font-medium">
                    ${{ product.price.toFixed(2) }}
                </td>
                <td class="px-4 py-3 text-center">
                    <span v-if="!product.inStock"
                        class="inline-block px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-medium">
                        Out of stock
                    </span>
                    <span v-else
                        class="inline-block px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                        In stock
                    </span>
                </td>
                <td class="px-4 py-3 text-center">
                    <button :aria-pressed="isFavorite(product.id)"
                        :aria-label="isFavorite(product.id) ? 'Unfavorite ' + product.name : 'Favorite ' + product.name"
                        @click="toggleFavorite({ id: product.id, name: product.name })"
                        class="p-2 rounded-full hover:bg-gray-100 transition" title="Toggle favorite">
                        <svg v-if="isFavorite(product.id)" xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 text-red-500 fill-red-500" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 
                 4.5 2.09C13.09 3.81 14.76 3 16.5 3 
                 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 text-gray-400 hover:text-red-500 transition" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 
                 4.5 2.09C13.09 3.81 14.76 3 16.5 3 
                 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>