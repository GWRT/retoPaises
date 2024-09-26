import { createRouter, createWebHistory } from 'vue-router';
import Vista1 from '../Vista1.vue';
import Vista2 from '../Vista2.vue';

const routes = [
    { path: '/vista1', component: Vista1 },
    { path: '/vista2', component: Vista2 },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
