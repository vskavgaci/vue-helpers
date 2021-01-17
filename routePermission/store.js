import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    hasPermission: false,
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    hasPermission: (state) => state.hasPermission,
  },
  mutations: {},
  actions: {
    refreshToken() {
      // some process...
    }
  },
});
