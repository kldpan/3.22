import Vue from 'vue'
import AMap from 'vue-amap'
import VueTouch from 'vue-touch'

import App from './App.vue'
import router from './router'

import store from '@/core/store'

import http from '@/core/api/http.js'

import Axios from 'axios'

import 'lib-flexible/flexible.js'
import 'font-awesome/css/font-awesome.css'
import "mint-ui/lib/style.css"
import vueWechatTitle from "vue-wechat-title"
import coreConfig from "@/core/core.config.js"

import 'iview/dist/styles/iview.css'
import {Upload} from 'iview';
Vue.component('Upload', Upload);

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

// 将http(axios写入Vue原型中,全局组件即可调用)
Vue.prototype.$http = http;


// 上面的引入axios和下面的注册axios到原型中，即可通过this.$axios.get/post(url,data)等方式发数据，与脚手架中配置的core中的api下的http.js的引用一样，http.js中封装了axios函数
Vue.prototype.$axios = Axios;

// instance({
//   method:"get",
//   url:"http://192.168.0.116:8080/login/sendCode/18435103582/",
//   data
// }).then(res=>{
//   console.log(res);
// });

// 上面的instance是单独封装的axios
// this.$axios.get("http://192.168.0.116:8080/login/sendCode/18435103582/",data).then(res=>{
//   console.log(res);
// })

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
