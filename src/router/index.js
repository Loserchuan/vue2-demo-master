import Vue from 'vue';
import VueRouter from 'vue-router';
import NotFound from '../views/ErrorPage/NotFound';
import Unauthorized from '../views/ErrorPage/Unauthorized';
import InternetServerError from '../views/ErrorPage/InternetServerError';
import NotAccessed from '../views/ErrorPage/NotAccessed';
import BasicLayout from '../components/layout/BasicLayout';
import constantRouterMap from './router.config';

Vue.use(VueRouter);

const routes = [
  {
    path: '/500',
    name: 'InternetServerError',
    component: InternetServerError,
  },
  {
    path: '/400',
    name: 'NotAccessed',
    component: NotAccessed,
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/401',
    name: 'Unauthorized',
    component: Unauthorized,
  },
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    redirect: constantRouterMap[0] && constantRouterMap[0].path,
    children: constantRouterMap,
  },
  {
    path: '*',
    redirect: '/404',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
