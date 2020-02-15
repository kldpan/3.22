import Vue from 'vue'
import AMap from 'vue-amap'
import VueTouch from 'vue-touch'

import App from './App.vue'
import router from './router'

import store from '@/core/store'

import 'lib-flexible/flexible.js'
import 'font-awesome/css/font-awesome.css'
import "mint-ui/lib/style.css"
import vueWechatTitle from "vue-wechat-title"
import coreConfig from "@/core/core.config.js"

Vue.use(vueWechatTitle);
Vue.use(coreConfig);//fn(){}

Vue.use(AMap);
AMap.initAMapApiLoader({
  key:'b04b292ba4b2140151e9c2bcd02bad0c',
  plugin:['AMap.Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.CitySearch']
});

Vue.use(VueTouch, {name:'v-touch'})
VueTouch.config.swipe = {
  threshold:100       //设置手指左右滑动距离
}

// Vue.use((Vue)=>{
//   // console.log("run11111")
//   console.dir(Vue);
// })
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
