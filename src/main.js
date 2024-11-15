import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "tailwindcss/tailwind.css";
import "@/assets/index.scss";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
