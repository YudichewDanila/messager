import './style.scss'
import { createApp, ref } from 'vue';
import App from './app.vue';
import router from './router';
import store from './store';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";


createApp(App).use(router).use(store).use(Toast).use(VueCropper).mount('#app');
