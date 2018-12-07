import Vue from 'vue';

//加载路由组件
import VueRouter from "vue-router";

import routes from './router/router';
import store from './store/index';

import App from './App.vue';
// 引入手淘方案
import 'lib-flexible/flexible';

Vue.config.productionTip = false

// 通过vue.use()使用插件，它需要在你调用 new Vue() 启动应用之前完成
// Vue.use 会自动阻止多次注册相同插件，届时只会注册一次该插件
// 全局注册vue-router，若没有此方法，后面不能直接引用vue-router的组件或者方法
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

new Vue({
  router,
  store,
  template: "<App/>",
	components: { App: App }
}).$mount('#app')
