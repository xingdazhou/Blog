import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/global.css'
import animated from 'animate.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css';

import marked from 'marked'
import axios from 'axios'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import scrollToTop from '@/components/plugin/scrollToTop'
Vue.use(ElementUI);
Vue.use(animated)

Vue.prototype.$axios = axios
Vue.prototype.$marked = marked


Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})



Vue.component("scrollToTop", scrollToTop)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    store.dispatch('changeShow', false)
  } else {
    store.dispatch('changeShow', true)
  }

  // if (to.path == '/ShowDetail') {
  //   store.dispatch('changeToggle', true)
  // } else {
  //   store.dispatch('changeToggle', false)
  // }
  // console.log(store.state.homeShow)
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')