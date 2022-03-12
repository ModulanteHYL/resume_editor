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
Vue.directive('border-tip', {
  inserted: function (el, bind) {
    if (bind.value) {
      el.classList.add('m-border-tip')
    }
  },
  update: function (el, bind) {
    if (bind.value) {
      el.classList.add('m-border-tip')
    } else {
      el.classList.remove('m-border-tip')
    }
  }
})
Vue.directive('delete-btn', {
  inserted: function (el, bind) {
    el.parentNode.style.position = 'relative'
    el.classList.add('m-delete-btn')
    el.innerText = 'X'
  }
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
