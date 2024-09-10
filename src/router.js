import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // { path: "/", component: Home, default: true },
  // { path: "/about", component: About },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;