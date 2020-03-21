import Vue from "vue";
import VueRouter from "vue-router";
import params from "@/core/api/params";
Vue.use(VueRouter);

const routes = [{
  path: "/",
  name: "home",
  component: () => import("@/views/Home.vue"),
  children: [{
      path: "index",
      name: "index",
      component: () => import("@/components/index.vue"),
      children: [{
          path: "/index/delivery",
          name: "delivery",
          component: () => import("@/components/delivery/delivery.vue"),
          showFooter: true,
          meta: {
            title: "发布货源",
            requireAuth: true //requireAuth用于钩子函数中验证用户是否存在
          },
        },
        {
          path: "/index/history",
          name: "history",
          component: () => import("@/components/delivery/history.vue")
        },
        {
          path: "/index/permanent",
          name: "permanent",
          component: () => import("@/components/delivery/permanent.vue")
        },
      ],
      redirect: "index/delivery"
    },
    {
      path: "deliverydetails",
      name: "deliverydetails",
      component: () => import("@/components/delivery/deliverydetails.vue"),
      meta: {
        title: "运单详情",
      }
    },
    {
      path: "waitfororders",
      name: "waitfororders",
      component: () => import("@/components/delivery/waitfororders.vue"),
      meta: {
        title: "等待接单",
      }
    },
    {
      path: "order",
      name: "order",
      component: () => import("@/components/order.vue"),
      meta: {
        title: "我的订单",
      }
    },
    {
      path: "order02",
      name: "order02",
      component: () => import("@/components/order02.vue"),
      meta: {
        title: "测试",
      }
    },
    {
      path: "one",
      name: "one",
      component: () => import("@/components/one.vue"),
      meta: {
        title: "测试",
      }
    },
    {
      path: "citypicker",
      name: "citypicker",
      component: () => import("@/components/common/citypicker.vue"),
      meta: {
        title: "测试",
      }
    },
    {
      path: "logout",
      name: "logout",
      component: () => import("@/components/mine/logout.vue"),
      meta: {
        title: "登录页",
      }
    },
    {
      path: "login",
      name: "login",
      component: () => import("@/components/login/index.vue"),
      meta: {
        title: "登录页",
      }
    },
    {
      path: "register",
      name: "register",
      component: () => import("@/components/register/index.vue"),
      meta: {
        title: "注册页",
      }
    },
    {
      path: "mine",
      name: "mine",
      component: () => import("@/components/mine/mine.vue"),
      meta: {
        title: "我的",
      }
    },
    {
      path: "mineinfos",
      name: "mineinfos",
      component: () => import("@/components/mine/mineinfos.vue"),
      meta: {
        title: "个人中心",
      }
    },
    {
      path: "setting",
      name: "setting",
      component: () => import("@/components/mine/setting.vue"),
      meta: {
        title: "设置",
      }
    },
    {
      path: "service",
      name: "service",
      component: () => import("@/components/service.vue"),
      meta: {
        title: "服务条款",
      }
    },
    {
      path: "privacy",
      name: "privacy",
      component: () => import("@/components/privacy.vue"),
      meta: {
        title: "隐私政策",
      }
    },
    {
      path: "loadmap",
      name: "loadmap",
      component: () => import("@/components/loadmap.vue"),
      meta: {
        title: "发货地址",
      }
    },
    {
      path: "unloadmap",
      name: "unloadmap",
      component: () => import("@/components/unloadmap.vue"),
      meta: {
        title: "卸货地址",
      }
    },
    {
      path: "canceldelivery",
      name: "canceldelivery",
      component: () => import("@/components/canceldelivery.vue"),
      meta: {
        title: "取消货源",
      }
    },
    {
      path: "noteinfos",
      name: "noteinfos",
      component: () => import("@/components/delivery/noteinfos.vue"),
      meta: {
        title: "备注信息",
      }
    },
    {
      path: "activitynews",
      name: "activitynews",
      component: () => import("@/components/activity/activitynews.vue"),
      meta: {
        title: "活动消息",
      }
    },
    {
      path: "activity",
      name: "activity",
      component: () => import("@/components/activity/activity.vue"),
      meta: {
        title: "活动拉新",
      }
    },
    {
      path: "message",
      name: "message",
      component: () => import("@/components/notice/message.vue"),
      meta: {
        title: "消息中心",
      }
    },
    {
      path: "settingnews",
      name: "settingnews",
      component: () => import("@/components/notice/settingnews.vue"),
      meta: {
        title: "消息设置",
      }
    },
    {
      path: "testloadmap",
      name: "testloadmap",
      component: () => import("@/components/testloadmap.vue"),
      meta: {
        title: "测试地图",
      }
    },
    {
      path: "map",
      name: "map",
      component: () => import("@/components/map.vue"),
      meta: {
        title: "定位",
      }
    },
  ],
  redirect: "/index"
}];

const router = new VueRouter({
  // mode:"history",
  routes
});

export default router;