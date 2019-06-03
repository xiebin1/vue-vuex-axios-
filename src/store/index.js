import Vue from 'vue'
import Vuex from 'vuex'


import mine from './modules/mine'


Vue.use(Vuex)



export default new Vuex.Store({
  modules: {
    mine
  }
  
})













































/*
export default new Vuex.Store({
  state: {
      count:0
  },
  mutations: {
      increase(state) {
        state.count += 1;
      },
      reduction(state,n) {
        state.count -= n;
      }
  },
  actions: {
    asuncadd(context) {
      setTimeout(() => {
        context.commit('increase')
      }, 2000);
    },
    promiseAction({commit}){
      return new Promise((resolve,reject) => {
        setTimeout(() => {
          commit('reduction',10);
          resolve(true);
        }, 1000);
      })
    }
  }
})
*/