import Vue from 'vue'
import store from "../vuex/store";
import App from './App.vue'
import router from "./router/router"
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
