// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import Vuex from 'vuex'
import store from './store/index'
import MintUI from 'mint-ui';
import Qs from 'qs';
import { generaMenu } from './util' //动态路由添加
import FlowEngine from './lib/FlowEngine' //解析流文件xml
import { appointmentConfig, appointmentpost, appointmentget } from './service/config' //请求配置
import vconsole from './vconsole'

Vue.use(Vuex);
Vue.use(MintUI);

Vue.config.productionTip = false
Vue.prototype.$qs=Qs;
Vue.prototype.title= (title) => {
  document.title = title
  document.body.scrollTop = 0
}
Vue.prototype.appointmentInit = ()=>{
  const states = store.getters.flowXml
  Vue.prototype.flowEngine = FlowEngine.instance(states)
  store.state.flowRouters = states;
  store.state.flowRouters = !sessionStorage.getItem('flowRouters') ? store.state.flowRouters : JSON.parse(sessionStorage.getItem('flowRouters'))
  let routes = []
  generaMenu(routes, states)
  router.addRoutes(routes)


}

//console.log('赋值后的路由数据：', routes);
// console.log('赋值后路由：', store.state.flowRouters);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
