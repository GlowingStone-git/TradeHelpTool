import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/Converter',
            component: () => import('./views/Converter.vue')
        },
        {
            path: '/Portfolio',
            component: () => import('./views/Portfolio.vue')
        }
    ]
})