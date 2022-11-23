import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: () => import('../pages/login/LoginPage.vue') },
    {
        path: '/main', component: () => import('../pages/main/MainPage.vue'),
        children: [
            { path: '', redirect: 'welcome' },
            { path: '/welcome', name: 'welcome', component: () => import('../pages/welcome/WelcomePage.vue') },
            { path: '/reservation', name: 'reservation', component: () => import('../pages/reservation/ReservationPage.vue') },
            { path: '/service', name: 'service', component: () => import('../pages/service/ServicePage.vue') },
            { path: '/category', name: 'category', component: () => import('../pages/category/CategoryPage.vue') },
            { path: '/post', name: 'post', component: () => import('../pages/forum/post/PostPage.vue') },
            { path: '/problem', name: 'problem', component: () => import('../pages/forum/problem/ProblemPage.vue') },
            { path: '/admin', name: 'admin', component: () => import('../pages/member/admin/AdminPage.vue') },
            { path: '/user', name: 'user', component: () => import('../pages/member/user/UserPage.vue') },
            
        ]
    },
];


const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

export default router;