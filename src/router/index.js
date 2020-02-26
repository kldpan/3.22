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
        path: "deliverydetails",
        name:"deliverydetails",
        component: () => import("@/components/delivery/deliverydetails.vue"),
        meta: {
          title: "运单详情",
        }
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
        path: "logout",
        name:"logout",
        component: () => import("@/components/mine/logout.vue"),
        meta: {
          title: "登录页",
        }
      },
      {
        path: "login",
        name:"login",
        component: () => import("@/components/login/index.vue"),
        meta: {
          title: "登录页",
        }
      },
      {
        path: "register",
        name:"register",
        component: () => import("@/components/register/index.vue"),
        meta: {
          title: "注册页",
        }
      },
      {
        path: "mine",
        name:"mine",
        component: () => import("@/components/mine/mine.vue"),
        meta: {
          title: "我的",
        }
      },
      {
        path: "mineinfos",
        name:"mineinfos",
        component: () => import("@/components/mine/mineinfos.vue"),
        meta: {
          title: "个人中心",
        }
      },
      {
        path: "setting",
        name:"setting",
        component: () => import("@/components/mine/setting.vue"),
        meta: {
          title: "设置",
        }
      },
      {
        path: "service",
        name:"service",
        component: () => import("@/components/service.vue"),
        meta: {
          title: "服务条款",
        }
      },
      {
        path: "privacy",
        name:"privacy",
        component: () => import("@/components/privacy.vue"),
        meta: {
          title: "隐私政策",
        }
      },
      {
        path: "loadmap",
        name:"loadmap",
        component: () => import("@/components/loadmap.vue"),
        meta: {
          title: "发货地址",
        }
      },
      {
        path: "unloadmap",
        name:"unloadmap",
        component: () => import("@/components/unloadmap.vue"),
        meta: {
          title: "卸货地址",
        }
      },
      {
        path: "canceldelivery",
        name:"canceldelivery",
        component: () => import("@/components/canceldelivery.vue"),
        meta: {
          title: "取消货源",
        }
      },
      {
        path: "noteinfos",
        name:"noteinfos",
        component: () => import("@/components/noteinfos.vue"),
        meta: {
          title: "备注信息",
        }
      },
      {
        path: "activitynews",
        name:"activitynews",
        component: () => import("@/components/activity/activitynews.vue"),
        meta: {
          title: "活动消息",
        }
      },
      {
        path: "activity",
        name:"activity",
        component: () => import("@/components/activity/activity.vue"),
        meta: {
          title: "活动拉新",
        }
      },
      {
        path: "message",
        name:"message",
        component: () => import("@/components/notice/message.vue"),
        meta: {
          title: "消息中心",
        }
      },
      {
        path: "settingnews",
        name:"settingnews",
        component: () => import("@/components/notice/settingnews.vue"),
        meta: {
          title: "消息设置",
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
    } else if (params.userType === "login") {
      next({
        path: "/login"
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