import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

createApp(App).use(
    Vue3Toastify,
    {
        autoClose: 3000,
    } as ToastContainerOptions,
).mount('#app');
