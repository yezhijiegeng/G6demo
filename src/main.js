import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "tailwindcss/tailwind.css";
import "@/assets/index.scss";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";
import store from './store';

Vue.use(ElementUI);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
