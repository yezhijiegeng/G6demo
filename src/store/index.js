import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  commonList: [], // 切换Tab(一级)前的对应所有数据
};
const mutations = {
  SET_COMMONLIST(state, val) {
    state.commonList = val || [];
  },
};

const store = new Vuex.Store({
  state,
  mutations,
  // state: {
  //   commonList: [], 
  // },
  // mutations: {
    // increment(state) {
    //   state.count++;
    // },
    // decrement(state) {
    //   state.count--;
    // }
  // },
  // actions: {
  //   // increment({ commit }) {
  //   //   commit('increment');
  //   // },
  //   // decrement({ commit }) {
  //   //   commit('decrement');
  //   // }
  // },
  getters: {
    // doubleCount(state) {
    //   return state.count * 2;
    // }
  }
});

export default store;