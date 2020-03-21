import axios from "axios";
import {
  getCookie
} from '../../util/util.js';

// instance即封装好的axios,全局注册后直接调用即可
var instance = axios.create({
  // baseURL: "http://consignor-api.manyi.oureway.com:8080/",
  baseURL: "/api",
  timeout: 10000,
  // transformRequest: [
  // function (data) {
  //   // 对 data 进行任意转换处理
  //   // 在请求发出之前 ajax 传入参数
  //   // JSON.stringify()


  //   return data;
  // }
  // ],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    function (data) {
      // 对 data 进行任意转换处理

      return data;
    }
  ],

  //设置返回数据类型
  responseType: 'json'
});

// 什么是拦截器  项目里面所有的请求发送前（通过该拦截器，将cookie传入后台）
// instance.interceptors.request.use(config => {
//     // 在发送请求之前做些什么
//     // 例如此时可以打开loading

//     // const token = getCookie('session'); //获取cookie
//     // // config.data = JSON.stringify(config.data);
//     // config.headers = {
//     //   // 'Content-Type': 'application/x-www-form-urlencoded' //设置跨域头部
//     // };
//     // if (token) {
//     //   config.params = {
//     //     'token': token
//     //   } //后台接收的参数
//     // }
//     // return config;
//   },
//   error => {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   });

// 添加响应拦截器
// instance.interceptors.response.use(response => {
//     // 对响应数据做点什么
//     // 例如此时可以关闭loading

//     //response.data.errCode是我接口返回的值，如果值为2，说明Cookie丢失
//     if (response.data.errCode == 2) {
//       router.push({
//         path: '/login',
//         query: {
//           redirect: router.currentRoute.fullPath
//         } //从哪个页面跳转
//       })
//     }
//     return response;
//   },
//   error => {
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   });

export default instance;


// instance.all([getUserAccount(), getUserPermissions()])
//   .then(axios.spread(function (acct, perms) {
//     // 两个请求现在都执行完成
//   }));



// fetch 请求方法
// @param url
// @param params
// @returns {Promise}

// export function fetch(url, params = {}) {
//   return new Promise((resolve, reject) => {
//     axios.get(url, {
//         params: params
//       })
//       .then(response => {
//         resolve(response.data);
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }

//  post 请求方法
//  @param url
//  @param data
//  @returns { Promise }

// export function post(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, data)
//       .then(response => {
//         resolve(response.data);
//       }, err => {
//         reject(err);
//       })
//   })
// }


// patch 方法封装
// @param url
// @param data
// @returns {Promise}

// export function patch(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.patch(url, data)
//       .then(response => {
//         resolve(response.data);
//       }, err => {
//         reject(err);
//       })
//   })
// }


// put 方法封装
// @param url
// @param data
// @returns {Promise}

// export function put(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.put(url, data)
//       .then(response => {
//         resolve(response.data);
//       }, err => {
//         reject(err);
//       })
//   })
// }