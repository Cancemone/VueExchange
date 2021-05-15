import Vue from 'vue'
import store from "../vuex/store";
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
