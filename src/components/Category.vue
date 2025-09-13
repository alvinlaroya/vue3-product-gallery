<script setup lang="ts">
import { categories } from '../fakeApi';

const category = defineModel<string>('category');
</script>

<template>
    <div class="flex space-x-3 my-5">
        <h2 class="text-sm font-semibold mt-0.5">Categories:</h2>
        <span v-for="cat in categories" :key="cat"
            class="inline-block px-2 py-1 rounded-full bg-base border text-gray-600 text-sm font-medium cursor-pointer hover:bg-gray-200"
            :class="{ 'bg-black text-white': category === cat }" @click="() => category = cat">
            {{ cat }}
        </span>
    </div>
</template>