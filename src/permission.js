import router from './router';
import store from './store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import getPageTitle from './utils/get-page-title';
import message from 'ant-design-vue/es/message';
import config from './utils/config';

NProgress.configure({ showSpinner: false });

const whiteList = ['/500', '/400', '/404', '/401', '/login']; // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title);
  if (!config.isLogin) {
    next();
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      const token = window.localStorage.getItem('ACCESS_TOKEN');
      if (token) {
        store.commit('user/setToken', token);
        /* has token */
        if (!store.getters.userInfo) {
          store.dispatch('user/FetchUserInfo', token).then(() => {
            next({ ...to, replace: true });
          }).catch((error) => {
            console.info('用户信息异常', error.message);
            message.error('用户信息异常！');
            next({ path: '/login' });
          });
        } else {
          next();
        }
      } else {
        store.dispatch('user/Logout').finally(() => {
          next({ path: '/login' });
        });
      }
    }
  }
  NProgress.done();
});

router.afterEach(() => {
  NProgress.done();
});
