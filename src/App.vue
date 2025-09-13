<script setup>
import { ref, computed } from 'vue'
import Home from './pages/Home.vue'
import Favorite from './pages/Favorite.vue'

const routes = {
  '/': Home,
  '/favorite': Favorite
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <main class="max-w-[960px] mx-auto p-4 font-sans">
    <div class="flex space-x-5">
      <a href="#/" :class="{ 'text-blue-500 border-b border-blue-500': currentView.__name === 'Home' }">Home</a>
      <a href="#/favorite"
        :class="{ 'text-blue-500 border-b border-blue-500': currentView.__name === 'Favorite' }">Favorites</a>
    </div>
    <component :is="currentView" class="mt-4" />
  </main>
</template>