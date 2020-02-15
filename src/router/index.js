import Vue from "vue";
import VueRouter from "vue-router";
import params from "@/core/api/params";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/components/index.vue"),
        children: [
          {
            path: "/index/delivery",
            name: "delivery",
            component: () => import("@/components/delivery/delivery.vue"),
            meta: {
              title: "发布货源"
            },
          },
          {
            path: "/index/history",
            name:"history",
            component:()=>import("@/components/delivery/history.vue")
          },
          {
            path: "/index/permanent",
            name:"permanent",
            component:()=>import("@/components/delivery/permanent.vue")
          },
        ],
        redirect: "index/delivery"
      },
      {
        path: "order",
        name:"order",
        component: () => import("@/components/order.vue"),
        meta: {
          title: "我的订单",
        }
      },
      {
        path: "mine",
        name:"mine",
        component: () => import("@/components/mine.vue"),
        meta: {
          title: "个人中心",
        }
      },
      // {
      //   path: "goodsInfo",
      //   name:"goodsInfo",
      //   component: () => import("@/components/goodsInfo.vue"),
      //   meta: {
      //     title: "货物信息",
      //   }
      // },
      {
        path: "map",
        name:"map",
        component: () => import("@/components/map.vue"),
        meta: {
          title: "定位",
        }
      },
    ],
    redirect: "/index"
  }
];
const router = new VueRouter({
  // mode:"history",
  routes
});
//全局的路由钩子函数
router.beforeEach((to, from, next) => {
  // console.log(params.userType)
  //from  从哪来
  //to    到哪去
  //next(); 是否到下一个路由
  // console.log(to.path);
  // if(to.path=="/"){
  //   next({path:"/index"})
  // }else{
  //   next();
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
    } else if (params.userType === "mine") {
      next({
        path: "/mine"
      });
    }else{
      next();
    }
  }else{
    next();
  } 
});

router.afterEach((to, from) => {
  // console.log("路由跳转完毕")
});

export default router;
