import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import store from './store/index'
import ES6Promise from 'es6-promise'
ES6Promise.polyfill()

Vue.config.productionTip = false;

new Vue({
  store,
  render : h => h(App)
}).$mount('#app');