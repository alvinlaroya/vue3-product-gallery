<script setup lang="ts">
import type { Product } from '../fakeApi'
import { useFavorites } from '../composables/useFavorite'

defineProps<{
    products: Product[]
}>()

const { isFavorite, toggleFavorite } = useFavorites();
</script>
<template>
    <ul role="list" class="grid [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))] gap-3 p-0 list-none">
        <li v-for="product in products" :key="product.id"
            class="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col gap-3">
            <div class="flex justify-between items-start">
                <div class="flex flex-col">
                    <h3 class="text-lg font-semibold text-gray-900 leading-tight">
                        {{ product.name }}
                    </h3>
                    <div class="flex gap-2 items-center text-sm text-gray-500 mt-1">
                        <span>{{ product.category }}</span>
                        <span>•</span>
                        <span>${{ product.price.toFixed(2) }}</span>
                    </div>
                </div>
                <button :aria-pressed="isFavorite(product.id)"
                    :aria-label="isFavorite(product.id) ? 'Unfavorite ' + product.name : 'Favorite ' + product.name"
                    @click="toggleFavorite({ id: product.id, name: product.name })"
                    class="p-2 rounded-full hover:bg-gray-100 transition -mt-2 -mr-2" title="Toggle favorite">
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
            </div>
            <div v-if="!product.inStock">
                <span class="inline-block px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-medium">
                    Out of stock
                </span>
            </div>
        </li>
    </ul>
</template>