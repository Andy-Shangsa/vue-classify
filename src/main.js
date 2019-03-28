import Vue from 'vue'
import App from './App.vue'
import "./assets/styles/public.scss";
import andyClassify from "./lib/index.js";
Vue.use(andyClassify);

new Vue({
  el: '#app',
  render: h => h(App)
})
