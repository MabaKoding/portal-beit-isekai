import Vue from 'vue'

import App from './App.vue'
import router from './router'
import './assets/main.css'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

import axios from 'axios'
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.config.devtools      = false
Vue.config.debug         = false
Vue.config.silent        = true
Vue.config.performance   = true

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
