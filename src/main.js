import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false


//引入ElementUI样式
import ElementUI from 'element-ui';
//引入全部库样式
import 'element-ui/lib/theme-chalk/index.css';
import requestHelper from "@/utils/requestHelper";
//应用ElementUI
Vue.use(ElementUI)

Vue.prototype.$baseUrl=process.env.VUE_APP_BASE_URL;
Vue.prototype.$request=requestHelper

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')