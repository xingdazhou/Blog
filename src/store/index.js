import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    homeShow:false,    //决定首页显示哪些组件
    toggle:false,       //切换收起
    is_night:false      //开关灯
  },
  mutations: {
    changeShow(state,flag){
      state.homeShow = flag
    },
    changeToggle(state,flag){
      state.toggle = flag
    },
    changeToNight(state){
      state.is_night = !state.is_night
    }
  },
  actions: {
    changeShow({commit},flag){
      commit('changeShow',flag)
    },
    changeToggle({commit},flag){
      commit('changeToggle',flag)
    },
    changeToNight({commit}){
      commit('changeToNight')
    }
  },
  modules: {
  }
})
