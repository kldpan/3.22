import router from './index.js';
// 导入cookie_js
// 并写一个getToken()来获取cookie中的token

import {
    getCookie,
    delCookie
} from '../util/util.js';




//全局的路由钩子函数
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.ele_login ? true : false;
    // if(to.path === '/login'){
    //   next();  
    // }else{
    //   // 判断是否在登录状态下
    //   isLogin ? next() : next('/login');
    // }
    if (to.path == "/") {
        if (params.userType === "index") {
            next({
                path: "/index"
            });
        } else if (params.userType === "order") {
            next({
                path: "/order"
            });
        } else if (params.userType === "login") {
            next({
                path: "/login"
            });
        } else {
            isLogin ? next() : next('/login');
            // next();
        }
    } else {
        next();
    }

    // if (to.matched.some(record => record.meta.showFooter)) {
    //     // this route requires auth, check if logged in
    //     // if not, redirect to login page.
    //     if (!auth.loggedIn()) {
    //         next({
    //             path: '/login',
    //             query: {
    //                 redirect: to.fullPath
    //             }
    //         })
    //     } else {
    //         next()
    //     }
    // } else {
    //     next() // 确保一定要调用 next()
    // }
});

//这个是请求页面路由的时候会验证token存不存在，不存在的话会到登录页
// router.beforeEach((to, from, next) => {

//     if (to.meta.requireAuth) {
//         fetch('m/is/login').then(res => {
//             if (res.errCode == 200) {
//                 next();
//             } else {
//                 if (getCookie('session')) {
//                     delCookie('session');
//                 }
//                 if (getCookie('u_uuid')) {
//                     delCookie('u_uuid');
//                 }
//                 next({
//                     path: '/'
//                 });
//             }
//         });
//     } else {
//         next();
//     }


//     if (to.path == "/") {
//         if (params.userType === "index") {
//             next({
//                 path: "/index"
//             });
//         } else if (params.userType === "order") {
//             next({
//                 path: "/order"
//             });
//         } else if (params.userType === "login") {
//             next({
//                 path: "/login"
//             });
//         } else {
//             isLogin ? next() : next('/login');
//             // next();
//         }
//     } else {
//         next();
//     }
// });

router.afterEach((to, from) => {
    console.log("路由跳转完毕");
});