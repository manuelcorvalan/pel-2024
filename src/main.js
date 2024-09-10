import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import VueMobileDetection from "vue-mobile-detection";

createApp(App).use(VueMobileDetection).use(router).mount('#app')
