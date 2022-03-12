// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.directive('auto-focus', {
  inserted: function (el) {
    el.focus()
    console.log(el)
  }
})
Vue.directive('coms-pointer', {
  inserted: function (el) {
    el.classList.add('m-pointer')
  }
})
Vue.directive('text-center', {
  inserted: function (el) {
    el.classList.add('m-text-center')
  }
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
