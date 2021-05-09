import { getToken, logout, getUserInfo } from '@/api/loginApi';

const state = {
  token: null, // app token
  userInfo: null,
};

const mutations = {
  setToken: (state, token) => {
    window.localStorage.setItem('ACCESS_TOKEN', token);
    state.token = token;
  },
  setUserInfo: (state, userInfo) => {
    state.userInfo = userInfo;
  },
};

const actions = {
  // 登录
  Login({ commit }, params) {
    return new Promise((resolve, reject) => {
      getToken(params).then((response) => {
        const token = response.access_token;
        if (!token) reject(new Error(response.message || 'token 获取失败'));
        commit('setToken', token);
        resolve(true);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 登出
  Logout({ commit, state }) {
    return new Promise((resolve) => {
      logout(state.token).then(() => {
        resolve(true);
      }).catch(() => {
        resolve(true);
      }).finally(() => {
        window.localStorage.removeItem('ACCESS_TOKEN');
        commit('setToken', null);
        commit('setUserInfo', null);
        commit('screenSaver/UPDATE_STATE', {
          logon: false,
          login: false,
          isTime: false,
          autoPlay: false,
        }, { root: true });
      });
    });
  },
  // 获取用户信息
  FetchUserInfo({ commit, state }, token) {
    return new Promise((resolve, reject) => {
      getUserInfo(token).then((response) => {
        if (!response || !response.userId) {
          reject(new Error(response.message || '用户信息获取失败'));
        } else {
          commit('setUserInfo', response);
          resolve(response);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
