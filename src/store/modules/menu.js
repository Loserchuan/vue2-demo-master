/**
 * 菜单模块的vuex
 */

const state = {
  collapsed: localStorage.getItem('collapsed') === 'true',
};

const mutations = {
  updateState(state, payload) {
    Object.keys(payload).forEach((key) => {
      state[key] = payload[key];
    });
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
