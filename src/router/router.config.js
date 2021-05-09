export default [
  {
    path: '/home',
    name: '首页',
    component: () => import('../views/Home'),
    meta: { title: '首页' },
  },
];
