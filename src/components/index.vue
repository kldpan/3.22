<template>
  <div class="home">
    <div v-wechat-title="$route.meta.title"></div>
    <!-- 第一层——顶栏 -->

    <!-- 有货主司机切换按钮 -->
    <!-- <div class="top clearfix">
    <div class="top_lt fl">
      <span class="select">货主</span>
      <span class="pullup"></span>
    </div>
    <div class="top_rt fr">
      <span class="news"></span>
      <span class="activity"></span>
    </div>
    </div>-->

    <!-- 第二层——切换栏 -->
    <div class="tab">
      <!-- 消息 -->
      <div class="news fl" @click="toPath('/message')"></div>

      <!-- 中间切换 -->
      <div class="tabbox fl">
        <v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight" tag="div">
          <span @click="selectDelivery()" :class="1 === num ? 'select' : ''">发布货源</span>
          <span @click="selectHistory()" :class="2 === num ? 'select' : ''">发货中</span>
          <span @click="selectPermanent()" :class="num === 3 ? 'select' : ''">常发货源</span>
          <router-view></router-view>
        </v-touch>
      </div>

      <!-- 活动 -->
      <div class="activity fr" @click="toPath('/activitynews')"></div>
    </div>
  </div>
</template>

<script>
// import tab from "@/components/layout/tab.vue";

import delivery from "@/components/delivery/delivery.vue";
import history from "@/components/delivery/history.vue";
import permanent from "@/components/delivery/permanent.vue";

export default {
  data() {
    return {
      bool: true,
      num: 1,
      testData: []
    };
  },
  mounted() {
    this.selectDelivery();

    // this.$apis.getTest01().then((res) => {
    //   console.log(res.data.data);
    //   let resData = res.data.data;
    //   for(let i=0; i<resData.length; i++){
    //     this.testData.push(resData[i]);
    //   }
    // });

    // this.$apis.getTest02().then((res) => {
    //   console.log(res.data.Tag.mainresult);
    // });
  },
  components: {
    // tab,
    delivery,
    history,
    permanent
  },
  methods: {
    toPath(obj) {
      this.$router.push(obj);
    },
    selectDelivery() {
      this.toPath({ path: "/index/delivery" });
      this.num = 1;
    },
    selectHistory() {
      this.toPath({ path: "/index/history" });
      this.num = 2;
    },
    selectPermanent() {
      this.toPath({ path: "/index/permanent" });
      this.num = 3;
    },
    onSwipeRight() {
      if (this.num === 2) {
        this.selectDelivery();
        this.num = 1;
      } else if (this.num === 3) {
        this.selectHistory();
        this.num = 2;
      }
    },
    onSwipeLeft() {
      if (this.num === 1) {
        this.selectHistory();
        this.num = 2;
      } else if (this.num === 2) {
        this.selectPermanent();
        this.num = 3;
      }
    }
  }
};
</script>


<style lang="scss" scoped>
// .top{
//   background: #fff;
//   .top_lt{
//     width:20%;
//     height:r(88);
//     position: relative;
//     .select{
//       font-size: r(30);
//       font-family: PingFang SC;
//       color:#333;
//       line-height: r(88);
//       display: inline-block;
//       vertical-align: middle;
//       font-weight: 500;
//       margin-left:r(30);
//     }
//     .pullup{
//       width:0;
//       height:0;
//       border:r(10) solid;
//       border-color: #666 transparent transparent transparent;
//       position: absolute;
//       top: 50%;
//       transform: translateY(-5%);
//       margin-left:r(10);
//     }
//   }
//   .top_rt{
//     width:16.8%;
//     height:r(88);
//     .news{
//       display: inline-block;
//       width:r(36);
//       height:r(36);
//       background:url(../assets/news.png) no-repeat 0 0;
//       background-size: r(36) r(36);
//       margin-top:r(26);
//     }
// .activity{
//   display: inline-block;
//   width:r(36);
//   height:r(36);
//   background:url(../assets/activity.png) no-repeat 0 0;
//   background-size: r(36) r(36);
//   margin:r(26) r(30) 0 r(24);
// }
//   }
// }
.home {
  // width: r(100);
  // height: r(1334);
  background: rgba(242, 246, 247, 1);
  .tab {
    width: 100%;
    height: r(90);
    background: #fff;
    .news {
      display: inline-block;
      width: r(36);
      height: r(36);
      background: url(../assets/news.png) no-repeat 0 0;
      background-size: r(36) r(36);
      margin: r(26) r(0) r(0) r(30);
    }
    .tabbox {
      width: r(540);
      height: r(60);
      background: #f2f6f9;
      margin: r(14) r(0) r(0) r(39);
      border-radius: r(50);
      position: relative;
      span {
        line-height: r(60);
        display: inline-block;
        width: 33.33333%;
        text-align: center;
        font-size: r(28);
        color: #333;
        font-family: PingFang SC;
      }
      .select {
        color: #fff;
        background: #0350a0;
        border-radius: r(50);
      }
    }
    .activity {
      display: inline-block;
      width: r(36);
      height: r(36);
      background: url(../assets/activity.png) no-repeat 0 0;
      background-size: r(36) r(36);
      margin: r(26) r(30) 0 r(0);
    }
  }
}
</style>