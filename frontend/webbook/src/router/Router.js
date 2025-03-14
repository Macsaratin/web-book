import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home/Home.vue';
import Login from '../pages/account/Login.vue';
import Register from '@/pages/account/Register.vue';
import User from '@/pages/profile/user.vue';
import ProductDetail from '@/pages/product/ProductDetail.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/profile', component: User },
  { path: '/product/:id', component: ProductDetail }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
